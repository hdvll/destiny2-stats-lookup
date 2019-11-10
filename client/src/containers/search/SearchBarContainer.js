import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from '../../components/search/SearchBar';
import SearchResults from '../../components/search/SearchResults';
import PropTypes from 'prop-types';

const SearchBarContainer = ({ platformDisplayName }) => {
  // Set search box state
  const [searchTerm, setSearchTerm] = useState('');
  // Set search loading state
  const [searchLoading, setSearchLoading] = useState(false);
  // Set search results to state
  const [searchResults, setSearchResults] = useState(
    JSON.parse(sessionStorage.getItem('users'))
  );

  // Fetch search results and store in local storage
  const getSearchResults = searchTerm => {
    // Set search to loading in state
    setSearchLoading(true);

    axios
      .get(`/api/search/${searchTerm}`)
      .then(res => {
        // Remove any existing search results from local storage
        if (sessionStorage.getItem('users')) {
          sessionStorage.removeItem('users');
        }
        // Save results in local storage
        sessionStorage.setItem('users', JSON.stringify(res.data.Response));
        // Save results to state
        setSearchResults(res.data.Response);
        // Set search to completed in state
        setSearchLoading(false);
      })

      .catch(err => console.error(err));
  };

  // Clear search results from sessionStorage and state
  const clearSearchResults = () => {
    sessionStorage.removeItem('users');
    setSearchResults('');
    return;
  };

  const onSearchSubmit = e => {
    e.preventDefault();
    // console.log(searchTerm);
    getSearchResults(searchTerm);
  };

  return searchResults ? (
    <SearchResults
      searchResults={searchResults}
      clearSearchResults={clearSearchResults}
      platformDisplayName={platformDisplayName}
    />
  ) : (
    <SearchBar
      onSearchSubmit={onSearchSubmit}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      searchLoading={searchLoading}
    />
  );
};

SearchBarContainer.propTypes = {
  platformDisplayName: PropTypes.func.isRequired
};

export default SearchBarContainer;
