import json
from klein import Klein
from words_analyzer.word_calculator import get_most_similar_words
from words_analyzer.words_separator import lyrics_to_strophes
from song_requests.azapi_requester import get_song_by_title
from song_requests.musixmatch_requester import get_song_snippet
from song_requests.spotify_requester import ( 
    get_song_features, 
    search_for_songs_with_input,
    get_track_artist_and_name,
    override_spotipy
)

class MusicalBackendServer(object):
    """
    Backend HTTP server
    """

    app = Klein()

    def start(self, port: int):
        """
        Starts the backend server in the given port

        :input port(int): The port that the server should be started
        """
        self.app.run("localhost", port)

    def _response(self, request, code:int=200, msg=""):
        request.setResponseCode(code)
        request.setHeader("Access-Control-Allow-Origin", "*")
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
        song_features = get_song_features(track_id=track_id)

        snippet = self._get_song_snippet(song_name, artist)
        lyrics = self._get_song_lyrics(song_name, artist)
        strophes = lyrics_to_strophes(lyrics)
        
        output = []
        for strophe in strophes:
            words = self._get_dalle_input_for_strophe(snippet, strophe)
            content = {
                'dalle_input': " ".join(words),
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


