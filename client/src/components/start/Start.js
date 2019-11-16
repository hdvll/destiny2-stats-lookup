import React from 'react';
import SearchBarContainer from '../../containers/search/SearchBarContainer';
import Heading from '../heading/Heading';
import AuthButton from '../buttons/AuthButton';

const Start = ({
  getSearchResults,
  platformDisplayName,
  deleteSessionData
}) => {
  return (
    <>
      <div className='container'>
        <Heading />
        <SearchBarContainer
          platformDisplayName={platformDisplayName}
          getSearchResults={getSearchResults}
        />
        <div className='divider'>
          <span className='divider__line'></span>
          <span className='divider__text'>OR</span>
          <span className='divider__line'></span>
        </div>
        <AuthButton deleteSessionData={deleteSessionData} />
      </div>
    </>
  );
};

export default Start;
