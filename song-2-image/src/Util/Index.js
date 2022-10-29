const redirectToSpotify = (AUTH_ENDPOINT, CLIENT_ID, REDIRECT_URI, RESPONSE_TYPE) => {
    window.open(
      `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`,
      "_self"
    );
};

const searchMusic = (musicQuery) => {
    return axios.get(`http://localhost:9000/search_song/${musicQuery}/6`);
};

const postSpotifyToken = (spotifyToken) => {
    axios
      .post(`http://localhost:9000/spotify_token/${spotifyToken}`)
      .then((res) => {});
};