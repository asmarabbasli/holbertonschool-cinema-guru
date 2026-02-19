import React, { useState } from 'react';
import './movies.css';

const Tag = ({ genre, filter, genres, setGenres }) => {
  const [selected, setSelected] = useState(false);

  const handleTag = () => {
    if (filter) {
      if (selected) {
        // Seçilibsə, massivdən çıxar
        setGenres(genres.filter((g) => g !== genre));
        setSelected(false);
      } else {
        // Seçilməyibsə, massivə əlavə et
        setGenres([...genres, genre]);
        setSelected(true);
      }
    }
  };

  return (
    <li 
      className={`tag ${selected ? 'selected' : ''}`} 
      onClick={handleTag}
    >
      {genre}
    </li>
  );
};

export default Tag;