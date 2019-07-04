import React, { Component } from 'react';
import MasterContainer from './containers/MasterContainer';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='app'>
        <MasterContainer />
      </div>
    );
  }
}

export default App;
