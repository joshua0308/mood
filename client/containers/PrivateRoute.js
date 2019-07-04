import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom';

class PrivateRoute extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { component: Component, ...rest } = this.props;
    console.log('PrivateRoute => render', rest.isAuthenticated);
    return (
      <Route
        {...rest}
        render={props =>
          rest.isAuthenticated === true ? (
            <Component {...props} />
          ) : (
            <Redirect to='/login' />
          )
        }
      />
    );
  }
}

export default PrivateRoute;
