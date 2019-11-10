import React from 'react';
import SearchBarContainer from '../../containers/search/SearchBarContainer';
import Heading from '../heading/Heading';

const Start = ({ getSearchResults, platformDisplayName }) => {
  return (
    <div className='container'>
      <Heading />
      <SearchBarContainer
        platformDisplayName={platformDisplayName}
        getSearchResults={getSearchResults}
      />
    </div>
  );
};

export default Start;
