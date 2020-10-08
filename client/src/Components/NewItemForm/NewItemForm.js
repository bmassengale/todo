import React, { Component } from 'react';
import './NewItemForm.css';
import '../../ResponsiveDesign.css';

class NewItemForm extends Component {
  render() {
    return (
        <div className="NewItemForm">
          <h3>Manage Todos</h3>
          <input></input>
          <button type="submit">Add Todo</button>
        </div>
    );
  }
}

export default NewItemForm;