import React from 'react';
import { render } from 'react-dom';
import App from './App.jsx';
import { Provider } from 'react-redux';
import store from './store';

import styles from './css/styles.css';

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
