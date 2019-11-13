import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import qs from 'query-string';
import axios from 'axios';

const OAuth = ({ location }) => {
  const query = qs.parse(location.search);

  const [membershipData, setMembershipData] = useState(
    JSON.parse(sessionStorage.getItem('OAuthMemberShipData'))
  );
  const [oAuthToken, setOAuthToken] = useState(
    JSON.parse(sessionStorage.getItem('OAuthToken'))
  );
  const [OAuthExpiry, setOAuthExpiry] = useState(
    JSON.parse(sessionStorage.getItem('OAuthExpiry'))
  );

  useEffect(() => {
    if (!oAuthToken) {
      if (sessionStorage.getItem('OAuthState') && query.code) {
        // Get and store the access token
        getAuthToken();
      } else {
        redirectForAuth();
      }
    }
  }, [oAuthToken, setOAuthExpiry]);

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

  // Fetches the OAuth token from the server and stores it in session storage and state
  const getAuthToken = () => {
    axios
      .get(`/api/oauth/getOAuthToken/${query.code}`)
      .then(result => {
        sessionStorage.setItem('OAuthToken', JSON.stringify(result.data));
        sessionStorage.setItem(
          'OAuthExpiry',
          Math.floor(Date.now() / 1000) + parseInt(result.data.expires_in)
        );
        setOAuthToken(result.data);
        setOAuthExpiry(
          Math.floor(Date.now() / 1000) + parseInt(result.data.expires_in)
        );
        getD2MembershipData(result.data.access_token);
      })
      .catch(err => {
        if (
          err.response.status === 400 &&
          err.response.data.msg.error === 'invalid_grant'
        ) {
          sessionStorage.removeItem('OAuthState');
        }

        console.error(err);
      });
    return null;
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
