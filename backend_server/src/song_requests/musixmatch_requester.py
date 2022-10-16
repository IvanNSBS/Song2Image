from musixmatch import Musixmatch
import os

API_KEY = os.getenv("MUSIX_MATCH_API_KEY")
musixmatch = Musixmatch(API_KEY)


def get_song_snippet(title: str, artist: str = "") -> str:
    """
    Gets the snippet that represents the entire song
    """
    page_size = 1
    page = 1
    s_track_rating = "desc"
    _format = 'json'

    song_search_result = musixmatch.track_search(
        q_track=title, q_artist=artist, page_size=page_size,
        page=page, s_track_rating=s_track_rating, _format=_format
    )

    track_id = song_search_result['message']['body']['track_list'][0]['track']['track_id']

    snippet_search_result = musixmatch.track_snippet_get(track_id)
    song_snippet = snippet_search_result['message']['body']['snippet']['snippet_body']

    return song_snippet
