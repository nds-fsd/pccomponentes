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
      <span className={`material-symbols-rounded ${styles.icon}`} type='submit'>
        search
      </span>
      <input
        className={styles.input}
        type='text'
        placeholder={placeholder}
        value={searchQuery}
        onChange={handleSearchInputChange}
      />
    </form>
  );
}

export default SearchBar;
