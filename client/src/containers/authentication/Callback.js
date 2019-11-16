import { useEffect } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import qs from 'query-string';

const Callback = ({ location }) => {
  const cookies = new Cookies();
  const query = qs.parse(location.search);
  const oAuthState = sessionStorage.getItem('OAuthState');

  useEffect(() => {
    // Check that callback contains code and that state matches
    if (!(query.code && query.state)) {
      sessionStorage.setItem(
        'OAuthError',
        'Code or State is missing in callback!'
      );
      return window.location.replace('/');
    }

    if (oAuthState !== query.state) {
      sessionStorage.setItem('OAuthError', 'State does not match.');
      return window.location.replace('/');
    } else {
      sessionStorage.removeItem('OAuthState');
    }

    getAuthToken();
  }, [query.code, query.state, oAuthState]);

  const getAuthToken = () => {
    // Fetches the OAuth token from the server and stores it in session storage and state
    axios
      .get(`/api/oauth/getOAuthToken/${query.code}`)
      .then(result => {
        if (cookies.get('bungieAuth')) {
          return window.location.replace('/oauth');
        } else {
          sessionStorage.setItem('OAuthError', 'Authentication error.');
          cookies.remove('bungieAuth');
          return window.location.replace('/');
        }
      })
      .catch(err => {
        if (
          err.response.status === 400 &&
          err.response.data.msg.error === 'invalid_grant'
        ) {
          sessionStorage.setItem('OAuthError', 'Invalid OAuth.');
          sessionStorage.removeItem('OAuthState');
          cookies.remove('bungieAuth');
          return window.location.replace('/');
        }
        console.error(err.response);
      });
  };

  return null;
};

export default Callback;
