import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './movies.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faClock } from '@fortawesome/free-solid-svg-icons';

const MovieCard = ({ movie }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isWatchLater, setIsWatchLater] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const headers = { Authorization: `Bearer ${token}` };

    // Favoritləri yoxla
    axios.get('http://localhost:8000/api/titles/favorite/', { headers })
      .then(res => setIsFavorite(res.data.some(m => m.imdbId === movie.imdbId)));

    // Sonra izlə siyahısını yoxla
    axios.get('http://localhost:8000/api/titles/watchlater/', { headers })
      .then(res => setIsWatchLater(res.data.some(m => m.imdbId === movie.imdbId)));
  }, [movie.imdbId]);

  const handleClick = (type) => {
    const token = localStorage.getItem('accessToken');
    const headers = { Authorization: `Bearer ${token}` };
    const url = `http://localhost:8000/api/titles/${type}/${movie.imdbId}`;

    if ((type === 'favorite' && isFavorite) || (type === 'watchlater' && isWatchLater)) {
      axios.delete(url, { headers }).then(() => {
        type === 'favorite' ? setIsFavorite(false) : setIsWatchLater(false);
      });
    } else {
      axios.post(url, {}, { headers }).then(() => {
        type === 'favorite' ? setIsFavorite(true) : setIsWatchLater(true);
      });
    }
  };

  return (
    <li className="movie-card">
      <div className="card-icons">
        <FontAwesomeIcon 
          icon={faHeart} 
          className={isFavorite ? 'active' : ''} 
          onClick={() => handleClick('favorite')} 
        />
        <FontAwesomeIcon 
          icon={faClock} 
          className={isWatchLater ? 'active' : ''} 
          onClick={() => handleClick('watchlater')} 
        />
      </div>
      <h3>{movie.title}</h3>
      <p>{movie.synopsis}</p>
      <div className="movie-genres">
        {movie.genres.map(g => <span key={g}>{g}</span>)}
      </div>
    </li>
  );
};

export default MovieCard; 