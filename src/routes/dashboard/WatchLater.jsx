import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './dashboard.css';
import MovieCard from '../../components/movies/MovieCard';

const WatchLater = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    axios.get('http://localhost:8000/api/titles/watchlater/', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setMovies(res.data))
    .catch(err => console.error(err));
  }, []);

  return (
    <div className="watch-later-page">
      <h1>Movies you like</h1>
      <ul className="movie-list">
        {movies.map(movie => <MovieCard key={movie.imdbId} movie={movie} />)}
      </ul>
    </div>
  );
};

export default WatchLater;