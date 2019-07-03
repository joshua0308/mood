import React, { Component } from 'react';
import NavBar from '../components/NavBar';
import FeedContainer from './FeedContainer';

class MainContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='main-container'>
        <NavBar />
        <FeedContainer />
      </div>
    );
  }
}

export default MainContainer;
