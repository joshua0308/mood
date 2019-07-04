import React from 'react';
import { render } from 'react-dom';
import App from './App.js';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import styles from './css/styles.css';

render(
  <Provider store={store}>
    <Router>
      <Route path='/:filter?' component={App} />
    </Router>
  </Provider>,
  document.getElementById('root')
);
