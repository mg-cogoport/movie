import React, { useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const getMovieRequest = async (resp) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=3392ffe5`;
    const response = await fetch(url);
    const responseJSON = await response.json();
    if (responseJSON.Search) {
      setMovies(responseJSON.Search);
    }
  };
  const setSearchValues = (val) => {
    setSearchValue(val);
  };
  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <h1>Movie Search Engine</h1>
      <div>
        <button className="btn">
          <Link href="/liked" style={{ textDecoration: "none" }}>
            Liked Movies
          </Link>
        </button>
      </div>

      <div className="container-fluid movie-app">
        <div className="row d-flex align-items-center mt-4 mb-4">
          <div className="col col-sm-4">
            <input
              className="form-control search"
              onChange={(event) => setSearchValues(event.target.value)}
              value={searchValue}
              placeholder="Type to search..."
            ></input>
          </div>
        </div>
      </div>

      {movies.length > 0 ? (
        <div className="main">
          <ul className="cards">
            {movies.map((movie, index) => (
              <>
                <li className="cards_item">
                  <div className="card">
                    <div className="card_image">
                      <img src={movie.Poster} className="movieImg"></img>
                    </div>
                    <div className="card_content">
                      <h2 className="card_title">{movie.Title}</h2>
                      <br />
                      <button className="btn card_btn">
                        <Link
                          href={`/${movie.imdbID}`}
                          style={{ textDecoration: "none" }}
                        >
                          Details
                        </Link>
                      </button>
                    </div>
                  </div>
                </li>
              </>
            ))}
          </ul>
        </div>
      ) : (
        <h1>No movie found</h1>
      )}
    </>
  );
}
