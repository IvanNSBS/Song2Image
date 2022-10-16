"""
Module responsible for declaring functions to fetch song info using the Azapi API
"""

import azapi

SONG_INFO = (str, str, str)
API = azapi.AZlyrics('Google')

def get_song_by_title(title: str, artist: str = "") -> SONG_INFO:
    """
    Gets a song info as a tuple of (title, artist, lyrics) given the song title
    """
    API.title = title
    API.artist = artist
    API.getLyrics(save=False, ext='lrc')

    return (API.title, API.artist, API.lyrics)
