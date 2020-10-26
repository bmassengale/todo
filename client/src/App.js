import React, { Component } from 'react';
import './App.css';

import AppContainer from './Components/AppContainer/AppContainer';

class App extends Component {
  constructor() {
    super();

    this.state = {
      isAuthenticatied: false
    }
  }

  render() {
    let componentToDisplay = (this.state.isAuthenticatied) ? <AppContainer /> : null //LoginArea

    return (
      <div className="App">
        {componentToDisplay}
      </div>
    );
  }
}

export default App;
