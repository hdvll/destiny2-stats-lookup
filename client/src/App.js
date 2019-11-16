import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Start from './components/start/Start';
import StatsContainer from './containers/stats/StatsContainer';
import About from './components/about/About';
import OAuth from './containers/authentication/OAuth';
import Callback from './containers/authentication/Callback';
import Menu from './components/menu/Menu';

function App() {
  const cookies = new Cookies();

  const [authCookie, setAuthCookie] = useState(cookies.get('bungieAuth'));

  // Set display names for the various platforms
  const platformDisplayName = platformNum => {
    let platformName;
    if (platformNum === 1) {
      platformName = 'xbox';
    } else if (platformNum === 2) {
      platformName = 'playstation';
    } else if (platformNum === 3) {
      platformName = 'steam';
    } else if (platformNum === 4) {
      platformName = 'battle-net';
    } else if (platformNum === 5) {
      platformName = 'google';
    } else {
      platformName = 0;
    }
    return platformName;
  };

  // Deletes all OAuth data from sessionStorage
  const deleteSessionData = () => {
    if (authCookie) {
      cookies.remove('bungieAuth', { path: '/' });
      setAuthCookie(null);
    }
    sessionStorage.removeItem('OAuthToken');
    sessionStorage.removeItem('OAuthState');
    sessionStorage.removeItem('OAuthMemberShipData');
    sessionStorage.removeItem('OAuthExpiry');
    sessionStorage.removeItem('OAuthError');
    return window.location.replace('/');
  };

  return (
    <Router>
      <Menu deleteSessionData={deleteSessionData} />
      <Switch>
        <Route
          exact
          path='/'
          render={props => (
            <Start
              {...props}
              platformDisplayName={platformDisplayName}
              deleteSessionData={deleteSessionData}
            />
          )}
        />
        <Route
          exact
          path='/stats/:membershipType/:membershipId'
          render={props => (
            <StatsContainer
              {...props}
              platformDisplayName={platformDisplayName}
            />
          )}
        />
        <Route exact path='/about' component={About} />
        <Route exact path='/oauth' component={OAuth} />
        <Route exact path='/callback' component={Callback} />
      </Switch>
    </Router>
  );
}

export default App;
