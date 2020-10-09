/* eslint-disable no-useless-constructor */
import React, { Component } from 'react';
import './Loading.css';

class Loading extends Component {
  constructor(props) {
    super(props);
    };

  render() {
    return (
      <div className="Loading">
        <p>Loading...</p>
      </div>
    );
  }
}

export default Loading;