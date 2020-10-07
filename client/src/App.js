import React, { Component } from 'react';
import './App.css';
import TodoContainer from './Components/TodoContainer/TodoContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <TodoContainer />
      </div>
    );
  }
}
export default App;
