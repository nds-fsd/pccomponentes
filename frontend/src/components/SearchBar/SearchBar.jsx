import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SearchBar.module.css';

function SearchBar({ placeholder }) {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    navigate(`/results?query=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <form className={styles.searchForm} onSubmit={handleSearchSubmit}>
      <input
        className={styles.searchBar}
        type='text'
        placeholder={placeholder}
        value={searchQuery}
        onChange={handleSearchInputChange}
      />
      <span className='material-symbols-rounded' type='submit'>
        search
      </span>
    </form>
  );
}

export default SearchBar;
