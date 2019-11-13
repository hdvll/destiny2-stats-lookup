import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Start from './components/start/Start';
import StatsContainer from './containers/stats/StatsContainer';
import About from './components/about/About';
import OAuth from './containers/authentication/OAuth';

function App() {
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

  return (
    <Router>
      <Switch>
        <Route
          exact
          path='/'
          render={props => (
            <Start {...props} platformDisplayName={platformDisplayName} />
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
      </Switch>
    </Router>
  );
}

export default App;
