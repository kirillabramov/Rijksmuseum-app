import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import App from './components/app';
import ErrorBoundry from './components/error-boundry';

const store = createStore(reducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundry>
      <Router>
        <App />
      </Router>
    </ErrorBoundry>
  </Provider>,
  document.getElementById('root')
);
