import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './dashboard.css';
import MovieCard from '../../components/movies/MovieCard';
import Filter from '../../components/movies/Filter';
import Button from '../../components/general/Button';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [minYear, setMinYear] = useState(1970);
  const [maxYear, setMaxYear] = useState(2022);
  const [genres, setGenres] = useState([]);
  const [sort, setSort] = useState("");
  const [title, setTitle] = useState("");
  const [page, setPage] = useState(1);

  const loadMovies = (pageNumber) => {
    const token = localStorage.getItem('accessToken');
    const params = {
      page: pageNumber,
      minYear,
      maxYear,
      genres: genres.join(','), // Massivi string-ə çeviririk
      title,
      sort
    };

    axios.get('http://localhost:8000/api/titles/advancedsearch', {
      params,
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((res) => {
      if (pageNumber === 1) {
        setMovies(res.data.titles); // İlk səhifədirsə siyahını sıfırla
      } else {
        setMovies((prev) => [...prev, ...res.data.titles]); // Digər səhifələri əvvəlkinə əlavə et
      }
    })
    .catch(err => console.error(err));
  };

  // Filtr dəyişəndə səhifəni 1-ə qaytar və yenidən yüklə
  useEffect(() => {
    setPage(1);
    loadMovies(1);
  }, [minYear, maxYear, genres, sort, title]);

  return (
    <div className="home-page">
      <Filter 
        minYear={minYear} setMinYear={setMinYear}
        maxYear={maxYear} setMaxYear={setMaxYear}
        sort={sort} setSort={setSort}
        genres={genres} setGenres={setGenres}
        title={title} setTitle={setTitle}
      />
      <ul className="movie-list">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbId} movie={movie} />
        ))}
      </ul>
      <Button 
        label="Load More.." 
        onClick={() => {
          const nextPage = page + 1;
          setPage(nextPage);
          loadMovies(nextPage);
        }} 
      />
    </div>
  );
};

export default HomePage;