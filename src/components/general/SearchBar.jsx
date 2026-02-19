import React from 'react';
import './general.css';

const SearchBar = ({ title, setTitle }) => {
  const handleInput = (e) => {
    setTitle(e.target.value);
  };

  return (
    <input
      className="search-bar"
      type="text"
      placeholder="Search movies..."
      value={title}
      onChange={handleInput}
    />
  );
};

export default SearchBar;