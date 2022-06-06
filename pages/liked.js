import React, { useEffect, useState } from "react";
const Liked = () => {
  const [movieData, setMovieData] = useState([]);
  const movieId = localStorage.getItem("likeds");
  movieId = JSON.parse(movieId);
  if (!movieId) movieId = [];
  const getMovieRequest = async (resp) => {
    const movies = [];
    console.log("Movie idddd", movieId);
    for (let i = 0; i < movieId.length; i++) {
      const url = `http://www.omdbapi.com/?i=${movieId[i]}&apikey=3392ffe5`;
      const response = await fetch(url);
      const responseJSON = await response.json();
      console.log(responseJSON);
      movies.push(responseJSON);
    }
    setMovieData(movies);
  };
  const setMovieRequest = async (movieId) => {
    const movies = [];
    console.log("Movie idddd", movieId);
    for (let i = 0; i < movieId.length; i++) {
      const url = `http://www.omdbapi.com/?i=${movieId[i]}&apikey=3392ffe5`;
      const response = await fetch(url);
      const responseJSON = await response.json();
      console.log(responseJSON);
      movies.push(responseJSON);
    }
    setMovieData(movies);
  };
  const addMovie = (id) => {
    const movieId = localStorage.getItem("likeds");
    movieId = JSON.parse(movieId);
    if (movieId.includes(id)) {
      movieId = movieId.filter((value) => value != id);
    }
    localStorage.setItem("likeds", JSON.stringify(movieId));
    movieId = localStorage.getItem("likeds");
    movieId = JSON.parse(movieId);
    console.log("chek", movieId);
    setMovieRequest(movieId);
  };
  useEffect(() => {
    getMovieRequest();
  }, []);
  return (
    <>
      {movieData.length > 0
        ? movieData.map((movie, ind) => {
            return (
              <div key={ind} className="movie_card" id="bright">
                <div className="info_section">
                  <div className="movie_header">
                    <img className="locandina" src={movie.Poster} />
                    <h1>{movie.Title}</h1>
                    <h4>
                      {movie.Year}, {movie.Director}
                    </h4>
                    <span className="minutes">{movie.Runtime}</span>
                    <p className="type">{movie.Genre}</p>
                  </div>
                  <div className="movie_desc">
                    <p className="text">{movie.Plot}</p>
                  </div>
                  <div className="movie_social">
                    <ul onClick={() => addMovie(movie.imdbID)}>
                      <li>
                        <i className="material-icons">Unlike &hearts;</i>
                      </li>
                    </ul>
                  </div>
                </div>
                <div
                  className="blur_back"
                  style={{ backgroundImage: `url(${movie.Poster})` }}
                ></div>
              </div>
            );
          })
        : "No Likded Movie"}
    </>
  );
};

export default Liked;
