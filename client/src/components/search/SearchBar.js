import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const SearchBar = ({
  onSearchSubmit,
  searchTerm,
  setSearchTerm,
  searchLoading
}) => {
  return (
    <form className='searchForm' onSubmit={e => onSearchSubmit(e)}>
      <div className='searchbar-wrapper'>
        <div className='searchbar-wrapper__searchBar'>
          <input
            type='search'
            className='searchbar-wrapper__searchBar--input'
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder='Destiny 2 username'
            disabled={searchLoading}
          />
        </div>
        <div
          className='searchbar-wrapper__searchIcon'
          onClick={e => onSearchSubmit(e)}
        >
          {!searchLoading ? (
            <i className='fas fa-search' />
          ) : (
            <i className='fas fa-spinner spinner-animate' />
          )}
        </div>
      </div>
      <div className='aboutTheSite'>
        <Link to='/about' className='mainLink'>
          About the site
        </Link>
      </div>
    </form>
  );
};

SearchBar.propTypes = {
  onSearchSubmit: PropTypes.func.isRequired,
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired
};

export default SearchBar;
