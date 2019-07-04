import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToReferrer: false
    };
    this.login = this.login.bind(this);
  }

  login() {
    this.props.handleAuthenticate(() => {});
    this.setState({ redirectToReferrer: true });
    console.log('LoginContainer => login()', this.state.redirectToReferrer);
  }

  render() {
    console.log('LoginContainer => render', this.props);
    const { redirectToReferrer } = this.state;
    const { from } = this.props.location.state || { from: { pathname: '/' } };

    if (redirectToReferrer === true) {
      console.log('LoginContainer => redirectToReferrer === true');
      return <Redirect to={from} />;
    }
    return (
      <div className='login-container'>
        <p>You must log in to view this page at {from.pathname}</p>
        <button onClick={this.login}>Log in</button>
      </div>
    );
  }
}

export default LoginContainer;
