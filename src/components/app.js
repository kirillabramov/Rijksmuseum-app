import React from 'react';
import { Switch, Route, Link, withRouter } from 'react-router-dom';
import Details from './details';
import HomePage from './home-page';

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route path="/Rijksmuseum-app/" component={HomePage} exact />
        <Route
          path="/details/:id"
          render={({ match }) => {
            const { id } = match.params;
            return <Details id={id} />;
          }}
          exact
        />
        <Route
          render={() => {
            return (
              <div>
                <h1>Page not found</h1>
                <Link to="/Rijksmuseum-app/">Home</Link>
              </div>
            );
          }}
        />
      </Switch>
    </div>
  );
};

export default withRouter(App);
