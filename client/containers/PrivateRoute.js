import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom';

import LoginContainer from './LoginContainer';
import { PropTypes } from 'prop-types';

class PrivateRoute extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { component: Component, ...rest } = this.props;
    console.log('PrivateRoute => render', rest.fakeAuth);
    return (
      <Route
        {...rest}
        render={props =>
          rest.fakeAuth.isAuthenticated === true ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  }
}

export default PrivateRoute;
