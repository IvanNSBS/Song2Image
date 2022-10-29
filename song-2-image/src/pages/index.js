import Head from "next/head";
import React, { useEffect, useState } from "react";
import Button from "../components/Button/Button";
import Card from "../components/Card/Card";
import InputField from "../components/InputField/InputField";
import styles from "../styles/Home.module.css";
import axios from "axios";
import {
  CardsContainer,
  LoginContainer,
  LogoutContainer,
  PageContainer,
  SearchContainer,
  StyledMain,
  StyledTitle,
  StyledSelectionLable,
} from "./index.styles";

const Home = () => {
  const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
  const dalleToken = process.env.NEXT_PUBLIC_DALLE_TOKEN;
  const REDIRECT_URI = "http://localhost:3000/"; //test without login
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  const [spotifyToken, setSpotifyToken] = useState("");
  const [musicQuery, setMusicQuery] = useState("");
  const [musicResults, setMusicResults] = useState([
    {
        "song_duration": 438120,
        "album": "Fear of the Dark (2015 - Remaster)",
        "album_icon_preview_url": "https://i.scdn.co/image/ab67616d0000b273c8783655136b2725c5c7f564",
        "song_name": "Fear of the Dark - 2015 Remaster",
        "artist": "Iron Maiden",
        "track_id": "0h4rVZcOiSaL9b5mT1A2gq"
    },
    {
        "song_duration": 461075,
        "album": "Rock in Rio (Live; 2015 Remastered Version)",
        "album_icon_preview_url": "https://i.scdn.co/image/ab67616d0000b27369d8c6b974bebcece6aaa6c8",
        "song_name": "Fear of the Dark - Live at Rock in Rio; 2015 Remastered Version",
        "artist": "Iron Maiden",
        "track_id": "4IJZy9joZpC7ToPRpSJ4mb"
    },
    {
        "song_duration": 429386,
        "album": "Hero",
        "album_icon_preview_url": "https://i.scdn.co/image/ab67616d0000b2738ce46c672e53a3b201b649a5",
        "song_name": "Fear of the Dark",
        "artist": "Van Canto",
        "track_id": "0dKtXWDvxOkxFjstDgQZmB"
    },
    {
        "song_duration": 223548,
        "album": "Fear of the Dark",
        "album_icon_preview_url": "https://i.scdn.co/image/ab67616d0000b2736de865292c98f577bedb4ca4",
        "song_name": "Fear of the Dark",
        "artist": "ConKi",
        "track_id": "6HRxngZoLiaEnf7Sh4UC6s"
    },
    {
        "song_duration": 245813,
        "album": "Hurt for Me",
        "album_icon_preview_url": "https://i.scdn.co/image/ab67616d0000b273ea0d1320e90292f7d2403122",
        "song_name": "Fear of the Water",
        "artist": "SYML",
        "track_id": "3jVniYVNCrwQvvWJpReosr"
    },
    {
        "song_duration": 205969,
        "album": "Amnesia",
        "album_icon_preview_url": "https://i.scdn.co/image/ab67616d0000b273d98e2ce4bd12c3072fe9e7e8",
        "song_name": "Daylight",
        "artist": "5 Seconds of Summer",
        "track_id": "0s8XyNiZlOjH2uerXGwV6P"
    }
]);
  const [selectedMusic, setSelectedMusic] = useState(-1);
  const [dalleQuery, setDalleQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }

    setSpotifyToken(token);
  }, []);

  useEffect(() => {
    if (spotifyToken) {
      postSpotifyToken();
    }
  }, [spotifyToken]);

  const logout = () => {
    setSpotifyToken("");
    window.localStorage.removeItem("token");
  };

  const redirectToSpotify = () => {
    window.open(
      `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`,
      "_self"
    );
  };

  const searchMusic = () => {
    if (musicQuery != "") {
      axios
        .get(`http://localhost:9000/search_song/${musicQuery}/6`)
        .then((res) => {
          setMusicResults(res.data);
        });
    }
  };

  const postSpotifyToken = () => {
    axios
      .post(`http://localhost:9000/spotify_token/${spotifyToken}`)
      .then((res) => {});
  };

  const getDalle2 = () => {
    if (dalleToken != "" && dalleQuery != "") {
      setError(false);
      setLoading(true);

      fetch(`/api/dalle2?k=${dalleToken}&q=${dalleQuery}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setResults(data.result);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          setError(true);
        });
    } else {
      setError(true);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Music to Image</title>
      </Head>
      <StyledMain>
        {spotifyToken && (
          <LogoutContainer>
            <Button label="Logout" handleClick={() => logout()} />
          </LogoutContainer>
        )}
        <PageContainer>
          <StyledTitle>Music to Image</StyledTitle>
          {spotifyToken ? (
            <React.Fragment>
              <SearchContainer>
                <InputField
                  placeholder="Pesquise uma música..."
                  onChange={(e) => setMusicQuery(e.target.value)}
                />
                <Button
                  disabled={musicQuery == ""}
                  label="Pesquisar"
                  handleClick={() => searchMusic()}
                />
              </SearchContainer>
              <StyledSelectionLable>
                Selecione a música desejada
              </StyledSelectionLable>
              <CardsContainer>
                {musicResults.map((music, index) => {
                  return (
                    <Card
                      key={music.song_name + music.artist}
                      image={music.album_icon_preview_url}
                      song={music.song_name}
                      artist={music.artist}
                      album={music.album}
                      handleClick={() => setSelectedMusic(index)}
                    />
                  );
                })}
              </CardsContainer>
            </React.Fragment>
          ) : (
            <LoginContainer>
              <Button
                label="Login to spotify"
                handleClick={() => redirectToSpotify()}
              />
            </LoginContainer>
          )}
        </PageContainer>
      </StyledMain>
    </div>
  );
};

export default Home;
