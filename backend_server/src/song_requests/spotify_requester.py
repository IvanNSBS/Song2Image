import os
import spotipy 
from spotipy.oauth2 import SpotifyClientCredentials

CLIENT_ID = os.getenv("CLIENT_ID")
CLIENT_SECRET = os.getenv("CLIENT_SECRET")

client_credentials_manager = SpotifyClientCredentials(client_id=CLIENT_ID, client_secret=CLIENT_SECRET)
sp = spotipy.Spotify(client_credentials_manager = client_credentials_manager)

def get_song_features(song_name: str):
    search_query = song_name # string to search
    limit_results = 1 # limit of results to be returned, min = 1, none = 10, max = 50
    offset = 0 # first item to be returned
    song_type =  "track" #type can be = track,playlist,show,episode,album; can be passed with comma multiple types.
    market = "US" # available markets to search with country code, separating by comma, None = all

    search_result = sp.search(search_query, limit_results, offset, song_type, market)
    track_id = search_result["tracks"]["items"][0]["id"]
    audio_features = sp.audio_features({track_id})

    return audio_features
