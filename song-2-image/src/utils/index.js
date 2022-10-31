import axios from "axios";

export const redirectToSpotify = (
  AUTH_ENDPOINT,
  CLIENT_ID,
  REDIRECT_URI,
  RESPONSE_TYPE
) => {
  window.open(
    `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`,
    "_self"
  );
};

export const searchMusic = async (musicQuery) => {
  return axios.get(`http://localhost:9000/search_song/${musicQuery}/6`);
};

export const postSpotifyToken = async (spotifyToken) => {
  axios
    .post(`http://localhost:9000/spotify_token/${spotifyToken}`)
    .then((res) => {});
};

export const dropdownOptions = [
  { value: "digital art of", label: "Digital Art" },
  { value: "abstract art of", label: "Abstract" },
  { value: "oil art of", label: "Oil Painting" },
  { value: "gothic art of", label: "Gothic" },
  { value: "renaissance art of", label: "Renaissance" },
  { value: "futuristic art of", label: "Futuristic" },
  { value: "realistic art of", label: "Realism" },
  { value: "psychedelic art of", label: "Psychedelic" },
  { value: "surrealistic art of", label: "Surrealism" }
];

export const sortedDropdownOptions = dropdownOptions.sort((a,b)=> a.label.localeCompare(b.label));
