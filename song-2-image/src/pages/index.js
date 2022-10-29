import Head from "next/head";
import React, { useEffect, useState } from "react";
import Button from "../components/Button/Button";
import Card from "../components/Card/Card";
import InputField from "../components/InputField/InputField";
import Select from "react-select";
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
  GenerationColumnContainer,
  GenerationRowContainer,
} from "./index.styles";

const Home = () => {
  const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
  const dalleToken = process.env.NEXT_PUBLIC_DALLE_TOKEN;
  const REDIRECT_URI = "http://localhost:3000/"; //test without login
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  const [spotifyToken, setSpotifyToken] = useState("");
  const [musicQuery, setMusicQuery] = useState("");
  const [musicResults, setMusicResults] = useState([]);
  const [selectedMusic, setSelectedMusic] = useState(-1);
  const [artStyle, setArtStyle] = useState("");
  const [ambience, setAmbience] = useState("");
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

  useEffect(() => {
    if (selectedMusic != -1) {
      axios
        .get(
          `http://localhost:9000/prepare_dalle/${musicResults[selectedMusic].track_id}`
        )
        .then((res) => {
          console.log(res);
        });
    }
  }, [selectedMusic]);

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

  const dropdownOptions = [
    { value: "digital art of", label: "Digital Art" },
    { value: "gothic painting of", label: "Gothic" },
    { value: "horror painting of", label: "Horror" },
    { value: "medieval painting of", label: "Medieval" },
    { value: "oil painting of", label: "Oil Painting" },
    { value: "renaissance painting of", label: "Renaissance" },
  ];

  const renderLogin = () => {
    return (
      <LoginContainer>
        <Button
          label="Login to spotify"
          handleClick={() => redirectToSpotify()}
        />
      </LoginContainer>
    );
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
            selectedMusic == -1 ? (
              <React.Fragment>
                <SearchContainer>
                  <InputField
                    placeholder="Pesquise uma música..."
                    onChange={(e) => setMusicQuery(e.target.value)}
                  />
                  <Button
                    disabled={!musicQuery}
                    label="Pesquisar"
                    handleClick={() => searchMusic()}
                  />
                </SearchContainer>
                {musicResults.length > 0 && (
                  <StyledSelectionLable>
                    Selecione a música desejada
                  </StyledSelectionLable>
                )}
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
              <GenerationColumnContainer>
                <GenerationRowContainer>
                  <Card
                    image={musicResults[selectedMusic].album_icon_preview_url}
                    song={musicResults[selectedMusic].song_name}
                    artist={musicResults[selectedMusic].artist}
                    album={musicResults[selectedMusic].album}
                  />
                  <GenerationColumnContainer>
                    <Button
                      disabled={!artStyle}
                      label="Gerar imagens"
                      handleClick={() => searchMusic()}
                    />
                    <Select
                      options={dropdownOptions}
                      placeholder="Estilo de arte"
                      onChange={(e) => setArtStyle(e.value)}
                    />
                  </GenerationColumnContainer>
                </GenerationRowContainer>
                <InputField
                  placeholder="Descreva o ambiente..."
                  onChange={(e) => setAmbience(e.target.value)}
                />
              </GenerationColumnContainer>
            )
          ) : (
            renderLogin()
          )}
        </PageContainer>
      </StyledMain>
    </div>
  );
};

export default Home;
