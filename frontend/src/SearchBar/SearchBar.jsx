import { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ setSearchQuery }) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const trimmedInput = searchInput.trim();
    if (trimmedInput) {
      setSearchQuery(searchInput);
    }

    setSearchInput(trimmedInput);
  };

  const handleClear = () => {
    setSearchInput('');
  };

  return (
    <form className="search-bar" onSubmit={handleSearchSubmit}>
      <input
        type="text"
        placeholder="Search by title or category"
        onChange={(e) => setSearchInput(e.target.value)}
        value={searchInput}
      />
      <button type="button" onClick={handleClear}>
        Clear
      </button>
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
