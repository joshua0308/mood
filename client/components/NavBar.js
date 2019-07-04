import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const NavBar = props => {
  const { isAuthenticated, logoutUser } = props;
  return (
    <div className='navbar'>
      <div className='navbar-logo'>MOOOD</div>
      <div className='navbar-icons'>
        <Link className='navbar-link' to='/'>
          Feed
        </Link>
        <Link className='navbar-link' to='/profile'>
          Profile
        </Link>
        {isAuthenticated === false ? (
          <Link className='navbar-link' to='/login'>
            Login
          </Link>
        ) : (
          <Link
            className='navbar-link'
            to='/login'
            onClick={() => {
              logoutUser();
              console.log('link clicked');
            }}
          >
            Sign out
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;
