import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class AuthButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { fakeAuth, handleSignout, history } = this.props;
    console.log('AuthButton => render', history);
    return fakeAuth.isAuthenticated === true ? (
      <p>
        Welcome
        <button
          onClick={() => {
            console.log('AuthButton => button onclick()');
            handleSignout(() => {
              history.push('/');
            });
          }}
        >
          Sign Out
        </button>
      </p>
    ) : (
      <p>You are not logged in.</p>
    );
  }
}

const AuthButtonWithRouter = withRouter(AuthButton);

export default AuthButtonWithRouter;
