import Head from "next/head";
import React, { useEffect, useState } from "react";
import Button from "../components/Button/Button";
import Card from "../components/Card/Card";
import InputField from "../components/InputField/InputField";
import styles from "../styles/Home.module.css";
import axios from "axios";
import { CardsContainer, SearchContainer } from "./index.styles";

export default function Home() {
  const CLIENT_ID =  process.env.NEXT_PUBLIC_CLIENT_ID;
  const REDIRECT_URI = "http://localhost:3000/" //test without login
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"


  const [spotifyToken, setSpotifyToken] = useState("")

  const token = process.env.NEXT_PUBLIC_DALLE_TOKEN;
  const [musicQuery, setMusicQuery] = useState("");
  const [musicResults, setMusicResults] = useState([]);
  const [selectedMusic, setSelectedMusic] = useState(-1);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")

    if (!token && hash) {
        token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

        window.location.hash = ""
        window.localStorage.setItem("token", token)
    }

    setSpotifyToken(token)

  }, [])

   const logout = () => {
    setSpotifyToken("")
    window.localStorage.removeItem("token")
  } 

  const redirectToSpotify = () =>{
    window.open(`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`)
  }
  
  const searchMusic = () => {
    if(musicQuery != "") {
      axios.get(`http://localhost:9000/search_song/${musicQuery}/6`)
      .then((res) => {
        setMusicResults(res.data);
        console.log(musicResults);
      });
    }
  }

  const getDalle2 = () => {
    if(token != "" && query != "") {
      setError(false);
      setLoading(true);

      fetch(`/api/dalle2?k=${token}&q=${query}`, {
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
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Music to Image</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Music to Image
        </h1>
        
        {spotifyToken ?
          (<React.Fragment>
            <SearchContainer>
              <InputField 
                placeholder="Pesquise uma música..."
                onChange={(e) => setMusicQuery(e.target.value)}
              />
              <Button 
                disabled={musicQuery == ""}
                label="Pesquisar" 
                handleClick={()=> searchMusic()} 
              />
            </SearchContainer>
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
          </React.Fragment>)
          :
          (<div style={{display: "flex", direction: "row", marginTop: "40px", gap: "10px", height: "52px"}}>
          <Button 
            label="Login to spotify" 
            handleClick={ () => redirectToSpotify()} 
          />
        </div>)
        }
      </main>
    </div>
  )
}