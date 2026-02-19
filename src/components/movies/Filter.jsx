import React from 'react';
import './movies.css';
import SearchBar from '../general/SearchBar';
import Input from '../general/Input';
import SelectInput from '../general/SelectInput';
import Tag from './Tag';

const Filter = ({ minYear, setMinYear, maxYear, setMaxYear, sort, setSort, genres, setGenres, title, setTitle }) => {
  const genreList = ["action", "drama", "comedy", "biography", "romance", "thriller", "war", "history", "sport", "sci-fi", "documentary", "crime", "fantasy"];

  const sortOptions = [
    { value: 'latest', label: 'Latest' },
    { value: 'oldest', label: 'Oldest' },
    { value: 'highestrated', label: 'Highest Rated' },
    { value: 'lowestrated', label: 'Lowest Rated' }
  ];

  return (
    <div className="filter-container">
      <SearchBar title={title} setTitle={setTitle} />
      <div className="filter-inputs">
        <Input label="Min Year" type="number" value={minYear} setValue={setMinYear} />
        <Input label="Max Year" type="number" value={maxYear} setValue={setMaxYear} />
        <SelectInput label="Sort By" options={sortOptions} value={sort} setValue={setSort} />
      </div>
      <ul className="tag-list">
        {genreList.map((g) => (
          <Tag key={g} genre={g} filter={true} genres={genres} setGenres={setGenres} />
        ))}
      </ul>
    </div>
  );
};

export default Filter;