import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  setUsernameLoginActionCreator,
  setPasswordLoginActionCreator
} from '../actions/actions';

const mapStateToProps = store => {
  console.log('LoginContainer => mapStateToProps');
  const { usernameLogin, passwordLogin, loginErrorMessage } = store.auth;
  return { usernameLogin, passwordLogin, loginErrorMessage };
};

const mapDispatchToProps = dispatch => {
  return {
    setUsernameLogin: text => {
      console.log('LoginContainer => mapDispatchToProps => setUsername');
      return dispatch(setUsernameLoginActionCreator(text));
    },
    setPasswordLogin: text => {
      console.log('LoginContainer => mapDispatchToProps => setPassword');
      return dispatch(setPasswordLoginActionCreator(text));
    }
  };
};

class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToReferrer: false
    };
  }

  render() {
    const {
      redirectToReferrer,
      verifyUser,
      setUsernameLogin,
      setPasswordLogin,
      usernameLogin,
      passwordLogin,
      loginErrorMessage
    } = this.props;
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    if (redirectToReferrer) return <Redirect to={from} />;

    return (
      <div className='login-container'>
        <p>
          You must login to view the <b>{from.pathname.slice(1)}</b> page
        </p>
        <div className='login-form'>
          <input
            type='text'
            placeholder=' username'
            onChange={e => setUsernameLogin(e.target.value)}
          />
          <input
            type='password'
            placeholder=' password'
            onChange={e => setPasswordLogin(e.target.value)}
          />
          <button onClick={() => verifyUser(usernameLogin, passwordLogin)}>
            Log in
          </button>
          <p className='error-message'>{loginErrorMessage}</p>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginContainer);
