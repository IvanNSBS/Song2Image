import Head from "next/head";
import { useState } from "react";
import Button from "../components/Button/Button";
import InputField from "../components/InputField/InputField";

import styles from "../styles/Home.module.css";

export default function Home() {
  const token = process.env.NEXT_PUBLIC_DALLE_TOKEN;
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  function getDalle2() {
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
        <div style={{display: "flex", direction: "row", marginTop: "40px", gap: "10px", height: "52px"}}>
        <InputField placeholder="Pesquise uma música..."/>
        <Button label="Pesquisar" handleClick={()=> console.log("Teste")} />
        </div>
        <p className={styles.description}>
          <input
            id="query"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Query"
            style={{width: "500px"}}
          />
          <button onClick={getDalle2} disabled={query == ""}>Get 4 Images</button>
        </p>
        {error ? (
          <div className={styles.error}>Something went wrong. Try again.</div>
        ) : (
          null
        )}
        {loading && <p>Loading...</p>}
        <div className={styles.grid}>
          {results.map((result) => {
            return (
              <div className={styles.card}>
                <img
                  className={styles.imgPreview}
                  src={result.generation.image_path}
                />
              </div>
            );
          })}
        </div>
      </main>
    </div>
  )
}