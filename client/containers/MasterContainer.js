import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter,
  Switch
} from 'react-router-dom';

import ProfileContainer from './ProfileContainer';
import MainContainer from './MainContainer';
import LoginContainer from './LoginContainer';
import PrivateRoute from './PrivateRoute';
import NavBar from '../components/NavBar';
import {
  verifyUserActionCreator,
  logoutUserActionCreator,
  thunkVerifyUser
} from '../actions/actions';

const mapStateToProps = store => {
  console.log('MasterContainer => mapStateToProps => store.auth', store.auth);
  const { isAuthenticated, redirectToReferrer } = store.auth;
  return { isAuthenticated, redirectToReferrer };
};

const mapDispatchToProps = dispatch => {
  return {
    verifyUser: (username, password) => {
      console.log('MasterContainer => mapDispatchToProps => verifyUser');
      return dispatch(thunkVerifyUser(username, password));
    },
    logoutUser: cb => {
      console.log('MasterContainer => mapDispatchToProps => logoutUser');
      return dispatch(logoutUserActionCreator(cb));
    }
  };
};

class MasterContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      isAuthenticated,
      redirectToReferrer,
      verifyUser,
      logoutUser
    } = this.props;
    return (
      <div className='master-container'>
        <NavBar isAuthenticated={isAuthenticated} logoutUser={logoutUser} />
        <Switch>
          <Route
            path='/profile'
            render={props => (
              <ProfileContainer {...props} isAuthenticated={isAuthenticated} />
            )}
          />
          <Route
            path='/login'
            render={props => {
              return (
                <LoginContainer
                  {...props}
                  redirectToReferrer={redirectToReferrer}
                  verifyUser={verifyUser}
                />
              );
            }}
          />
          <PrivateRoute
            path='/'
            isAuthenticated={isAuthenticated}
            component={MainContainer}
          />
        </Switch>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MasterContainer);
