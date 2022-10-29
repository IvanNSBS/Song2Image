export const redirectToSpotify = (AUTH_ENDPOINT, CLIENT_ID, REDIRECT_URI, RESPONSE_TYPE) => {
    window.open(
      `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`,
      "_self"
    );
};

export const searchMusic = (musicQuery) => {
    return axios.get(`http://localhost:9000/search_song/${musicQuery}/6`);
};

export const postSpotifyToken = (spotifyToken) => {
    axios
      .post(`http://localhost:9000/spotify_token/${spotifyToken}`)
      .then((res) => {});
};

export const dropdownOptions = [
    { value: "digital art of", label: "Digital Art" },
    { value: "gothic painting of", label: "Gothic" },
    { value: "horror painting of", label: "Horror" },
    { value: "medieval painting of", label: "Medieval" },
    { value: "oil painting of", label: "Oil Painting" },
    { value: "renaissance painting of", label: "Renaissance" },
];