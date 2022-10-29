import Head from "next/head";
import { useState } from "react";
import Button from "../components/Button/Button";
import Card from "../components/Card/Card";
import InputField from "../components/InputField/InputField";
import styles from "../styles/Home.module.css";
import axios from "axios";
import { CardsContainer, SearchContainer } from "./index.styles";

export default function Home() {
  const token = process.env.NEXT_PUBLIC_DALLE_TOKEN;
  const [musicQuery, setMusicQuery] = useState("");
  const [musicResults, setMusicResults] = useState([]);
  const [selectedMusic, setSelectedMusic] = useState(-1);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  console.log(selectedMusic);

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
      </main>
    </div>
  )
}