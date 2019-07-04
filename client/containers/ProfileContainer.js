import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class ProfileContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('ProfileContainer => render', this.props);
    const { isAuthenticated } = this.props;
    return isAuthenticated === false ? (
      <Redirect
        to={{ pathname: '/login', state: { from: this.props.location } }}
      />
    ) : (
      <div className='profile-container'>Profile Page</div>
    );
  }
}

export default ProfileContainer;
