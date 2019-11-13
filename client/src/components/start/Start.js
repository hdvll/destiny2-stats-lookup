import React from 'react';
import { Link } from 'react-router-dom';
import SearchBarContainer from '../../containers/search/SearchBarContainer';
import Heading from '../heading/Heading';
import AuthButton from '../authentication/Button';

const Start = ({ getSearchResults, platformDisplayName }) => {
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
        <AuthButton />
        <div className='aboutTheSite'>
          <Link to='/about' className='mainLink'>
            About the site
          </Link>
        </div>
      </div>
    </>
  );
};

export default Start;
