import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

const OAuth = ({ location }) => {
  const timeNow = Math.floor(Date.now() / 1000);

  const [membershipData, setMembershipData] = useState(
    JSON.parse(sessionStorage.getItem('OAuthMemberShipData'))
  );
  const [oAuthToken, setOAuthToken] = useState(
    JSON.parse(sessionStorage.getItem('OAuthToken'))
  );
  const [OAuthExpiry, setOAuthExpiry] = useState(
    JSON.parse(sessionStorage.getItem('OAuthExpiry'))
  );
  const [OAuthError, setOAuthError] = useState(
    JSON.parse(sessionStorage.getItem('OAuthError'))
  );

  useEffect(() => {
    if (!oAuthToken) {
      redirectForAuth();
    } else {
      if (OAuthExpiry < timeNow) {
        // Token is expired...
        console.log('Access token has expired.');
        sessionStorage.setItem('OAuthError', 'Access token has expired.');
        sessionStorage.removeItem('OAuthToken');
      } else {
        getD2MembershipData(oAuthToken.access_token);
      }
    }
  }, [oAuthToken, membershipData]);

  // Redirection to Bungie.net for authentication
  const redirectForAuth = () => {
    axios
      .get('/api/oauth')
      .then(res => {
        const { oAuthURI, clientId, responseType, state } = res.data;

        if (sessionStorage.getItem('OAuthState')) {
          sessionStorage.removeItem('OAuthState');
        } else {
          sessionStorage.setItem('OAuthState', state);
        }
        return window.location.replace(
          `${oAuthURI}?client_id=${clientId}&response_type=${responseType}&state=${state}`
        );
      })
      .catch(err => console.error(err));
  };

  // Fetches Destiny membership data based on the access token of the authentiated user
  const getD2MembershipData = access_token => {
    if (!membershipData) {
      // Create headers with access_token
      const config = {
        headers: {
          access_token
        }
      };

      axios
        .get('/api/oauth/getMemberShipData', config)
        .then(result => {
          sessionStorage.setItem(
            'OAuthMemberShipData',
            JSON.stringify(result.data)
          );
          setMembershipData(result.data);
        })
        .catch(err => console.error(err));
    }
  };

  return (
    membershipData && (
      <Redirect
        to={`/stats/${membershipData.membershipType}/${membershipData.membershipId}`}
      />
    )
  );
};

OAuth.propTypes = {};

export default OAuth;
