import glob
import json
import math
import os
import requests
import tempfile
import cv2
from klein import Klein
from words_analyzer.word_calculator import get_most_similar_words
from words_analyzer.words_separator import lyrics_to_strophes
from song_requests.azapi_requester import get_song_by_title
from song_requests.musixmatch_requester import get_song_snippet
from song_requests.spotify_requester import ( 
    get_song_features, 
    search_for_songs_with_input,
    get_track_artist_and_name,
    override_spotipy,
    get_track_duration,
    get_adjective_from_valence
)

class MusicalBackendServer(object):
    """
    Backend HTTP server
    """

    app = Klein()
    SONG_VIDEO_FOLDER = './video'
    SONG_VIDEO_NAME = 'song.mp4'

    def start(self, port: int):
        """
        Starts the backend server in the given port

        :input port(int): The port that the server should be started
        """
        self.app.run("localhost", port)

    @property
    def song_video_path(self):
        if not (os.path.exists(self.SONG_VIDEO_FOLDER)):
            os.mkdir(self.SONG_VIDEO_FOLDER)
        return os.path.join(self.SONG_VIDEO_FOLDER, self.SONG_VIDEO_NAME)

    def _response(self, request, code:int=200, msg=""):
        request.setResponseCode(code)
        request.setHeader("Access-Control-Allow-Origin", "*")
        request.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, HEAD, OPTIONS")
        request.setHeader("Referrer-Policy", 'no-referrer')
        request.setHeader("Access-Control-Allow-Credentials", "true")
        request.setHeader("Access-Control-Allow-Headers", "X-Requested-With, origin, content-type, accept")
     
        return msg

    def _get_song_lyrics(self, title, artist=""):
        """
        Route that gets the song info, given the song title

        :input song_title(str): The title of the song that we want the info from
        """
        _, _, lyrics = get_song_by_title(title, artist)
        return lyrics

    def _get_dalle_input_for_strophe(self, snippet, strophe):
        words = get_most_similar_words(musixmatch_phrase=snippet, song_verse=strophe, max_words=5)
        return words

    def _get_song_snippet(self, song_title, artist=""):
        snippet = get_song_snippet(song_title, artist)
        return snippet

    def __download_image(self, url: str, folder_path: str, file_name: str):
        response = requests.get(url)
        f = open(os.path.join(folder_path, file_name), 'wb')
        f.write(response.content)
        f.close()

    def __generate_video_from_webp_images(self, images_folder_path: str, image_count:int, song_duration_ms:int):
        fps = 24
        frame_size = (1024, 1024)
        target_files = os.path.join(images_folder_path, "*.webp")

        fourcc = cv2.VideoWriter_fourcc('F','M','P','4')
        out = cv2.VideoWriter(self.song_video_path, fourcc, fps, frame_size)

        song_duration_seconds = song_duration_ms/1000
        total_frames = song_duration_seconds * fps
        image_duration_in_frames = math.ceil(total_frames / image_count)
        for file in glob.glob(target_files):
            img = cv2.imread(file)

            for _ in range(image_duration_in_frames):
                out.write(img)

        out.release()
        return self.song_video_path

    @app.route('/dalle_images/', methods=['POST', 'OPTIONS'])
    def receive_dalle_images(self, request):
        content = request.content.read()
        if content == b'':
            return self._response(request, 200, "")

        body = content.decode('utf-8')
        content = json.loads(body)
        track_id = content['track_id']
        images_urls = content['images']
        track_duration_ms = get_track_duration(track_id)

        with tempfile.TemporaryDirectory() as download_folder:
            i = 0
            for url in images_urls:
                self.__download_image(url, download_folder, f"{i}.webp")
                i = i + 1

            video_path = self.__generate_video_from_webp_images(
                download_folder, len(images_urls), track_duration_ms
            )

        return self._response(request, 200, "Video created successfully")

    @app.route('/get_last_video', methods=['GET'])
    def get_last_video(self, request):
        pass

    @app.route('/search_song/<string:search_query>', methods=['GET'])
    def search_song_with_spotify(self, request, search_query):
        songs_found = search_for_songs_with_input(search_query)

        return self._response(request, 200, json.dumps(songs_found, indent=4))

    @app.route('/search_song/<string:search_query>/<int:max_output>', methods=['GET'])
    def search_song_with_spotify_with_max_output(self, request, search_query, max_output):
        songs_found = search_for_songs_with_input(search_query, max_output)

        return self._response(request, 200, json.dumps(songs_found, indent=4))

    @app.route('/prepare_dalle/<string:track_id>', methods=['GET'])
    def get_song_snippet_and_strophes(self, request, track_id):
        msg = dict()
        song_name, artist = get_track_artist_and_name(track_id=track_id)
        adjective = get_adjective_from_valence(track_id=track_id)

        snippet = self._get_song_snippet(song_name, artist)
        lyrics = self._get_song_lyrics(song_name, artist)
        strophes = lyrics_to_strophes(lyrics)
        output = []
        for strophe in strophes:
            words = self._get_dalle_input_for_strophe(snippet, strophe)
            content = {
                'dalle_input': f'{adjective} {" ".join(words)}',
                'strophe': strophe
            }
            output.append(content)

        msg['snippet'] = snippet
        msg['dalle_data'] = output
        return self._response(request, 200, json.dumps(msg, indent=4))

    @app.route('/spotify_token/<string:spotify_token>', methods=['POST'])
    def set_spotifyToken(self, request, spotify_token):
        override_spotipy(spotify_token)
        return self._response(request, 200, "overriding sucessfully")

    @app.route('/api/<string:auth_token>', methods=['POST', 'OPTIONS'])
    def mock_get_image(self, request, auth_token):
        nguentomais = json.dumps({
            'data': {
                'result': {
                    'id': "generation-90HVzHcQ7u9akdoS83Z9xVaQ",
                    'object': "generation",
                    'created': 1667142142,
                    'generation_type': "ImageGeneration",
                    'generation': {
                        'image_path': "localhost:9001/0.webp"
                    },
                    'task_id': "task-5NnGRQwjePyZUzEEE0OsL8iD",
                    'prompt_id': "prompt-xsmVMCmyzOUWUTiOxPzVMKoG",
                    'is_public': False,
                }
            }
        })
        
        return self._response(request, 200, nguentomais)

