import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ClearSearch from '../buttons/ClearSearch';

const SearchResults = ({
  searchResults,
  clearSearchResults,
  platformDisplayName
}) => {
  return (
    <>
      <div className='searchResults-wrapper'>
        <div className='searchResults-wrapper__count'>
          We found <span>{searchResults.length}</span> players matching that
          search
        </div>
        <div className='searchResults'>
          {searchResults.map((result, index) => (
            <Link
              to={`/stats/${result.membershipType}/${result.membershipId}`}
              key={index}
            >
              <div className='searchResults__resultBox'>
                <span className='searchResults__resultBox--userName'>
                  {result.displayName}
                </span>
                <i
                  className={`fab fa-${platformDisplayName(
                    result.membershipType
                  )} searchResults__resultBox--platform`}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
      <ClearSearch clearSearchResults={clearSearchResults} />
    </>
  );
};

SearchResults.propTypes = {
  searchResults: PropTypes.array.isRequired,
  clearSearchResults: PropTypes.func.isRequired,
  platformDisplayName: PropTypes.func.isRequired
};

export default SearchResults;
