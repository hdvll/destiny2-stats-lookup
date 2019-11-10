import React from 'react';
import PropTypes from 'prop-types';

const ClearSearch = ({ clearSearchResults }) => {
  return (
    <div className='clearSearchResults'>
      <button
        className='clearSearchResults__button'
        onClick={() => clearSearchResults()}
      >
        Clear search
      </button>
    </div>
  );
};

ClearSearch.propTypes = {
  clearSearchResults: PropTypes.func.isRequired
};

export default ClearSearch;
