import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
import axios from 'axios';

const OAuth = ({ location }) => {
  const cookies = new Cookies();

  const [membershipData, setMembershipData] = useState(
    JSON.parse(sessionStorage.getItem('OAuthMemberShipData'))
  );
  const [oAuthToken, setOAuthToken] = useState(
    cookies.get('bungieAuth') ? cookies.get('bungieAuth') : null
  );
  const [OAuthError, setOAuthError] = useState(
    JSON.parse(sessionStorage.getItem('OAuthError'))
  );

  useEffect(() => {
    if (!oAuthToken) {
      redirectForAuth();
    } else {
      getD2MembershipData();
    }
  }, [oAuthToken, membershipData]); // Do not add getD2MembershipData. It will break the app.

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
      .catch(err => {
        console.error(err);
        sessionStorage.settItem('OAuthError', 'Authentication error.');
        setOAuthError('Authentication error.');
      });
  };

  // Fetches Destiny membership data based on the access token of the authentiated user
  const getD2MembershipData = token => {
    if (!membershipData) {
      axios
        .get('/api/oauth/getMemberShipData')
        .then(result => {
          sessionStorage.setItem(
            'OAuthMemberShipData',
            JSON.stringify(result.data)
          );
          setMembershipData(result.data);
        })
        .catch(err => {
          console.error(err);
          sessionStorage.settItem(
            'OAuthError',
            'Error getting membership data.'
          );
          setOAuthError('Error getting membership data.');
        });
    }
  };

  return (
    membershipData &&
    !OAuthError && (
      <Redirect
        to={`/stats/${membershipData.membershipType}/${membershipData.membershipId}`}
      />
    )
  );
};

OAuth.propTypes = {};

export default OAuth;
