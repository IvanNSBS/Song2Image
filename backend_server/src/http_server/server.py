from klein import Klein
from song_requests.azapi_requester import get_song_by_title
from song_requests.musixmatch_requester import get_song_snippet

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
        return msg

    @app.route('/song_info/<string:song_title>', methods=['GET'])
    def get_song_info(self, request, song_title):
        """
        Route that gets the song info, given the song title

        :input song_title(str): The title of the song that we want the info from
        """
        title, artist, lyrics = get_song_by_title("Fear of the Dark")
        return self._response(request, 200, f"Lyrics for {song_title}:\n{lyrics}")

    @app.route('/snippet/<string:song_title>/<string:artist>', methods=['GET'])
    def get_song_snippet(self, request, song_title, artist=""):
        snippet = get_song_snippet(song_title, artist)

        return self._response(request, 200, f"Song snippet: {snippet}")
