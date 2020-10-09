import React, { Component } from 'react';
import './NewItemForm.css';
import '../../ResponsiveDesign.css';

class NewItemForm extends Component {
  constructor() {
    super();

    this.state = {
      newTodo: null
    }
  }

  parseTodoName(event) {
    this.setState({ newTodo: event.target.value});
  }

  render() {
    return (
        <div className="NewItemForm">
          <h3>Manage Todos</h3>
          <form onSubmit={() => this.props.submitEvent(this.state.newTodo)}>
            <input type="text"
              onChange={(input) => this.parseTodoName(input)}/>
            <input type="submit" value="Add Todo"/>
          </form>
        </div>
    );
  }
}

export default NewItemForm;