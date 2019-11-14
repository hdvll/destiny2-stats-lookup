import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ location }) => {
  const goToAuth = () => {
    return window.location.replace('/oauth');
  };

  const error = sessionStorage.getItem('OAuthError');

  const membershipData = JSON.parse(
    sessionStorage.getItem('OAuthMemberShipData')
  );

  return !error ? (
    <button className='authButton' onClick={() => goToAuth()}>
      {!membershipData ? (
        <span>Authenticate with Bungie</span>
      ) : (
        <span>My stats ({membershipData.displayName})</span>
      )}
    </button>
  ) : (
    <div style={{ fontStyle: 'italic', textAlign: 'center' }}>
      Error: {error}{' '}
      <Link
        onClick={() => sessionStorage.removeItem('OAuthError')}
        className='errorLink'
      >
        Try again
      </Link>
    </div>
  );
};

Button.propTypes = {};

export default Button;
