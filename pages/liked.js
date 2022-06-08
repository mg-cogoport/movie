import React, { useEffect, useState } from "react";
import axios from 'axios'
const Liked = () => {
  const [movieData, setMovieData] = useState([]);
  const getMovieRequest = async (resp) => {
    axios({
        method:'GET',
        url : `http://0.0.0.0:8000/lmovies`,
        headers:{
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin' : '*'
        },
    }).then((data)=>{
      console.log("thisis liked daata,,,,", data);
      setMovieData(data.data);
    })
    
  };
  const addMovie = (id) => {
    axios({
      method:'PUT',
      url : `http://0.0.0.0:8000/movies`,
      params: {imdbID: id, isliked: false},
      headers:{
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin' : '*'
      }
      
  }).then(()=>{
    getMovieRequest()
    console.log(data, "liked");
  }).catch(err=>console.log(err))
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
