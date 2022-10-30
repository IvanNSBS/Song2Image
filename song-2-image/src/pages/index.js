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
import {
  dropdownOptions,
  postSpotifyToken,
  redirectToSpotify,
  searchMusic,
} from "../utils";
import DalleResultsRenderer from "../components/DalleResultsRenderer/DalleResultsRenderer";

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
  const [prepareDalleRes, setPrepareDalleRes] = useState([]);
  const [currentDalleIndex, setDalleIndex] = useState(0);
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
      postSpotifyToken(spotifyToken);
    }
  }, [spotifyToken]);

  useEffect(() => {
    if (selectedMusic != -1) {
      axios
        .get(
          `http://localhost:9000/prepare_dalle/${musicResults[selectedMusic].track_id}`
        )
        .then((res) => {
          setPrepareDalleRes(res.data.dalle_data);
        });
    }
  }, [selectedMusic, artStyle, ambience]);

  useEffect(() => {
    if (prepareDalleRes.length > 0) {
      setDalleQuery(
        `${artStyle} ${prepareDalleRes[0].dalle_input} ${ambience}`
      );
    }
  }, [prepareDalleRes, artStyle, ambience]);

  const handleDalleGenarations = () => {
    setLoading(true);
    if (currentDalleIndex < prepareDalleRes.length) {
      const duplicateEntry = results.find(
        (e) => e.dalleInput === prepareDalleRes[currentDalleIndex].dalle_input
      );

      if (!duplicateEntry) {
        getDalle2(prepareDalleRes[currentDalleIndex].strophe);
      } else {
        const newEntry = {
          dalleResult: duplicateEntry.result,
          dalleInput: duplicateEntry.dalleInput,
          strophe: duplicateEntry.strophe,
        };
        setResults((oldArray) => [...oldArray, newEntry]);
      }

      setDalleIndex(currentDalleIndex + 1);
      setDalleQuery(
        `${artStyle} ${prepareDalleRes[currentDalleIndex].dalle_input} ${ambience}`
      );
    }
  };

  console.log(prepareDalleRes);
  console.log(dalleQuery);
  console.log(results);

  const logout = () => {
    setSpotifyToken("");
    window.localStorage.removeItem("token");
  };

  const getDalle2 = (strophe) => {
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
          const newEntry = {
            dalleResult: data.result,
            dalleInput: dalleQuery,
            strophe: strophe,
          };
          setResults((oldArray) => [...oldArray, newEntry]);
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

  const renderLogin = () => {
    return (
      <LoginContainer>
        <Button
          label="Login to spotify"
          handleClick={() =>
            redirectToSpotify(
              AUTH_ENDPOINT,
              CLIENT_ID,
              REDIRECT_URI,
              RESPONSE_TYPE
            )
          }
        />
      </LoginContainer>
    );
  };

  const renderMusicSearch = () => {
    return (
      <React.Fragment>
        <SearchContainer>
          <InputField
            placeholder="Pesquise uma música..."
            onChange={(e) => setMusicQuery(e.target.value)}
          />
          <Button
            disabled={!musicQuery}
            label="Pesquisar"
            handleClick={() =>
              searchMusic(musicQuery).then((res) => setMusicResults(res.data))
            }
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
    );
  };

  const renderGenerationSettings = () => {
    return (
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
              disabled={!artStyle || !dalleQuery || loading}
              label="Gerar imagens"
              onClick={handleDalleGenarations()}
            />
            <Select
              options={dropdownOptions}
              placeholder="Estilo de arte"
              onChange={(e) => setArtStyle(e.value)}
              isDisabled={loading}
            />
          </GenerationColumnContainer>
        </GenerationRowContainer>
        <InputField
          placeholder="Descreva o ambiente..."
          onChange={(e) => setAmbience(e.target.value)}
          disabled={loading}
        />
        {results.map((data) => (
          <DalleResultsRenderer
            isLoading={data.dalleResult.length < 1}
            dalleResults={data.dalleResult}
            strophe={data.strophe}
          />
        ))}
      </GenerationColumnContainer>
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
          {spotifyToken
            ? selectedMusic == -1
              ? renderMusicSearch()
              : renderGenerationSettings()
            : renderLogin()}
        </PageContainer>
      </StyledMain>
    </div>
  );
};

export default Home;
