import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AppContainer from './Components/AppContainer/AppContainer';
import Home from './Components/Home/Home';
import Nav from './Components/Nav/Nav';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import Login from './Components/Login/Login';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Nav />
          <Switch>
           <Route path="/" exact component={Home} />
           
           <Route path="/todolist" component={AppContainer} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
 