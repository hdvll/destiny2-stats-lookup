import React from 'react';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';

const Button = ({ location, deleteSessionData }) => {
  const cookies = new Cookies();

  const goToAuth = () => {
    return window.location.replace('/oauth');
  };

  const error = sessionStorage.getItem('OAuthError');

  const membershipData = JSON.parse(
    sessionStorage.getItem('OAuthMemberShipData')
  );

  const signedInToken = cookies.get('bungieAuth');

  return !error ? (
    !signedInToken ? (
      <button className='authButton' onClick={() => goToAuth()}>
        <span>Authenticate with Bungie</span>
      </button>
    ) : (
      <>
        <button className='authButton' onClick={() => goToAuth()}>
          <span>My stats ({membershipData.displayName})</span>
        </button>
      </>
    )
  ) : (
    <div style={{ fontStyle: 'italic', textAlign: 'center' }}>
      Error: {error}{' '}
      <Link onClick={() => deleteSessionData()} className='errorLink'>
        Try again
      </Link>
    </div>
  );
};

Button.propTypes = {};

export default Button;
