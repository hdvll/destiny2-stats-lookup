import React from 'react';

const Button = ({ location }) => {
  const goToAuth = () => {
    return window.location.replace('/oauth');
  };

  const membershipData = JSON.parse(
    sessionStorage.getItem('OAuthMemberShipData')
  );

  return (
    <button className='authButton' onClick={() => goToAuth()}>
      {!membershipData ? (
        <span>Authenticate with Bungie</span>
      ) : (
        <span>My stats ({membershipData.displayName})</span>
      )}
    </button>
  );
};

Button.propTypes = {};

export default Button;
