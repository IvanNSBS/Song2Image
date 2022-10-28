import os
import spotipy 
from spotipy.oauth2 import SpotifyClientCredentials

CLIENT_ID = os.getenv("CLIENT_ID")
CLIENT_SECRET = os.getenv("CLIENT_SECRET")

client_credentials_manager = SpotifyClientCredentials(client_id=CLIENT_ID, client_secret=CLIENT_SECRET)
sp = spotipy.Spotify(client_credentials_manager = client_credentials_manager)


def clamp(value:int, min_val: int, max_val:int):
    if value < min_val:
        return min_val
    elif value > max_val:
        value = max_val
    else:
        return value

def get_song_features(track_id: str):
    audio_features = sp.audio_features({track_id})
    return audio_features

def get_track_artist_and_name(track_id: str):
    track_info = sp.track(track_id)
    name = track_info['name']
    artist = track_info['artists'][0]['name']
    return name, artist

def search_for_songs_with_input(query: str, max_outputs=2):
    search_query = query # string to search
    limit_results = clamp(max_outputs, 1, 50) # limit of results to be returned, min = 1, none = 10, max = 50
    offset = 0 # first item to be returned
    song_type =  "track" #type can be = track,playlist,show,episode,album; can be passed with comma multiple types.
    market = "US" # available markets to search with country code, separating by comma, None = all

    search_result = sp.search(search_query, limit_results, offset, song_type, market)
    songs_found = search_result['tracks']['items']
    
    output = []
    for song in songs_found:
        content = {
            'song_duration': song['duration_ms'],
            'album': song['album']['name'],
            'album_icon_preview_url': song['album']['images'][0]['url'],
            'song_name': song['name'],
            'artist': song['artists'][0]['name'],
            'track_id': song['id'],
        }
        output.append(content)

    return output