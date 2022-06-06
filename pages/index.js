import React, { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import Head from "next/head";
import useMovie from "./useMovie";

export default function Home() {
  const [searchValue, setSearchValue] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const {loading, movie, error, hasMore} = useMovie(searchValue, pageNumber)
  const observer = useRef()
  const lastMovieRef = useCallback(node=>{
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(e=>{
        if (e[0].isIntersecting && hasMore) {
          console.log("visible");
          setPageNumber(pageNumber + 1)
        }
    })
    if (node) observer.current.observe(node)
    console.log("last");
  }, [loading, hasMore])
  function handleChange(e) {
    setSearchValue(e.target.value);
    setPageNumber(1);
  }
  // const [movies, setMovies] = useState([]);
  // const [searchValue, setSearchValue] = useState("");
  // const getMovieRequest = async (resp) => {
  //   const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=3392ffe5`;
  //   const response = await fetch(url);
  //   const responseJSON = await response.json();
  //   if (responseJSON.Search) {
  //     setMovies(responseJSON.Search);
  //   }
  // };
  // const setSearchValues = (val) => {
  //   setSearchValue(val);
  // };
  // useEffect(() => {
  //   getMovieRequest(searchValue);
  // }, [searchValue]);
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
              onChange={handleChange}
              value={searchValue}
              placeholder="Type to search..."
            ></input>
          </div>
        </div>
      </div>

      {movie.length > 0 ? (
        <div className="main">
          <ul className="cards">
            {
      movie.map((m,i)=>{
        if (movie.length === i + 1) {
          return  <div key={i} ref={lastMovieRef} className="cards_item" >
                  <div className="card">
                    <div className="card_image">
                      <img src={m.Poster} className="movieImg"></img>
                    </div>
                    <div className="card_content">
                      <h2 className="card_title" >{m.Title}</h2>
                      <br />
                      <button className="btn card_btn">
                        <Link
                          href={`/${m.imdbID}`}
                          style={{ textDecoration: "none" }}
                        >
                          Details
                        </Link>
                      </button>
                    </div>
                  </div>
                </div>
        
        } else {
          return <div key={i} className="cards_item">
                  <div className="card">
                    <div className="card_image">
                      <img src={m.Poster} className="movieImg"></img>
                    </div>
                    <div className="card_content">
                      <h2 className="card_title" >{m.Title}</h2>
                      <br />
                      <button className="btn card_btn">
                        <Link
                          href={`/${m.imdbID}`}
                          style={{ textDecoration: "none" }}
                        >
                          Details
                        </Link>
                      </button>
                    </div>
                  </div>
                </div>
        }
        
      })
    }
          </ul>
        </div>
      ) : (
        <h1>No movie found</h1>
      )}
    </>
  );
}
