import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <form onSubmit={handleSearchSubmit}>
      <input type='text' placeholder={placeholder} value={searchQuery} onChange={handleSearchInputChange} />
      <button type='submit'>Search</button>
    </form>
  );
}

export default SearchBar;
