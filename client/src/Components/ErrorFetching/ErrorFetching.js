/* eslint-disable no-useless-constructor */
import React, { Component } from 'react';
import './ErrorFetching.css';

class ErrorFetching extends Component {
  constructor(props) {
    super(props);
    };

  render() {
    return (
      <div className="Error">
        <p>Error</p>
      </div>
    );
  }
}

export default ErrorFetching;