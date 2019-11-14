import { useEffect } from 'react';
import axios from 'axios';
import qs from 'query-string';

const Callback = ({ location }) => {
  const timeNow = Math.floor(Date.now() / 1000);
  const query = qs.parse(location.search);
  const state = sessionStorage.getItem('OAuthState');

  useEffect(() => {
    // Check that callback contains code and that state matches
    if (!(query.code && query.state)) {
      sessionStorage.setItem(
        'OAuthError',
        'Code or State is missing in callback!'
      );
      return window.location.replace('/');
    }

    if (state !== query.state) {
      sessionStorage.setItem('OAuthError', 'State does not match.');
      return window.location.replace('/');
    }

    getAuthToken();
  }, []);

  const getAuthToken = () => {
    // Fetches the OAuth token from the server and stores it in session storage and state
    axios
      .get(`/api/oauth/getOAuthToken/${query.code}`)
      .then(result => {
        sessionStorage.setItem('OAuthToken', JSON.stringify(result.data));
        sessionStorage.setItem(
          'OAuthExpiry',
          timeNow + parseInt(result.data.expires_in)
        );
        return window.location.replace('/oauth');
      })
      .catch(err => {
        if (
          err.response.status === 400 &&
          err.response.data.msg.error === 'invalid_grant'
        ) {
          sessionStorage.setItem('OAuthError', 'Invalid OAuth.');
          sessionStorage.removeItem('OAuthState');
          return window.location.replace('/');
        }
        console.error(err.response);
      });
  };

  return null;
};

export default Callback;
