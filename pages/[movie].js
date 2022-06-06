import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
const Movie = () => {
  const router = useRouter();
  const [movieData, setMovieData] = useState(null);
  const [liked, setLiked] = useState(false);
  const { movie } = router.query;
  const getMovieRequest = async (resp) => {
    const url = `http://www.omdbapi.com/?i=${movie}&apikey=3392ffe5`;
    const response = await fetch(url);
    const responseJSON = await response.json();
    console.log(responseJSON);
    if (responseJSON) {
      setMovieData(responseJSON);
    }
  };
  const addMovie = (id) => {
    const movieId = localStorage.getItem("likeds");
    movieId = JSON.parse(movieId);
    // if (movieId.includes(id))
    if (movieId.includes(id)) {
      movieId = movieId.filter((value) => value != id);
      setLiked(false);
    } else {
      if (movieId) {
        // movieId = JSON.parse(movieId);
        movieId.push(id);
        setLiked(true);
      } else movieId = [id];
    }
    localStorage.setItem("likeds", JSON.stringify(movieId));
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("This will run after 1 second!");
      getMovieRequest(movie);
      console.log(movieData, "dddd");
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      {movieData ? (
        <div className="movie_card" id="bright">
          <div className="info_section">
            <div className="movie_header">
              <img className="locandina" src={movieData.Poster} />
              <h1>{movieData.Title}</h1>
              <h4>
                {movieData.Year}, {movieData.Director}
              </h4>
              <span className="minutes">{movieData.Runtime}</span>
              <p className="type">{movieData.Genre}</p>
            </div>
            <div className="movie_desc">
              <p className="text">{movieData.Plot}</p>
            </div>
            <div className="movie_social">
              <ul
                onClick={() => {
                  addMovie(movieData.imdbID);
                }}
              >
                <li>
                  <i className="material-icons">
                    {" "}
                    {liked ? "Unlike" : "Like"} &hearts;
                  </i>
                </li>
              </ul>
            </div>
          </div>
          <div
            className="blur_back"
            style={{ backgroundImage: `url(${movieData.Poster})` }}
          ></div>
        </div>
      ) : (
        "Loading..."
      )}
    </>
  );
};

export default Movie;
