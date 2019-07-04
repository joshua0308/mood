import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';

import PublicContainer from './containers/PublicContainer';
import MainContainer from './containers/MainContainer';
import LoginContainer from './containers/LoginContainer';
import PrivateRoute from './containers/PrivateRoute';
import AuthButton from './containers/AuthButton';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fakeAuth: {
        isAuthenticated: false
      }
    };
    this.handleAuthenticate = this.handleAuthenticate.bind(this);
    this.handleSignout = this.handleSignout.bind(this);
  }

  handleAuthenticate(cb) {
    let fakeAuth = Object.assign({}, this.state.fakeAuth);
    fakeAuth.isAuthenticated = true;
    this.setState({ fakeAuth });
    console.log('App => handleAuthenticate');
    setTimeout(cb, 100);
  }

  handleSignout(cb) {
    let fakeAuth = Object.assign({}, this.state.fakeAuth);
    fakeAuth.isAuthenticated = false;
    this.setState({ fakeAuth });
    setTimeout(cb, 100);
  }

  render() {
    const { fakeAuth } = this.state;
    return (
      <Router>
        <div className='app'>
          <AuthButton fakeAuth={fakeAuth} handleSignout={this.handleSignout} />
          <ul>
            <li>
              <Link to='/public'>Public Page</Link>
            </li>
            <li>
              <Link to='/protected'>Protected Page</Link>
            </li>
          </ul>
          <Route path='/public' component={PublicContainer} />
          <Route
            path='/login'
            render={props => {
              return (
                <LoginContainer
                  {...props}
                  fakeAuth={fakeAuth}
                  handleAuthenticate={this.handleAuthenticate}
                  handleSignout={this.handleSignout}
                />
              );
            }}
          />
          <PrivateRoute
            path='/protected'
            fakeAuth={fakeAuth}
            component={MainContainer}
          />
        </div>
      </Router>
    );
  }
}

export default App;
