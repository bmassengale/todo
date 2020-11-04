import React, { Component } from 'react';
import './NewItemForm.css';

class NewItemForm extends Component {
  constructor() {
    super();

    this.state = {
      newTodo: null
    }
  }

  parseTodoName(event) {
    if (event.target.value === null){
      return;
    }
    this.setState({ newTodo: event.target.value});
  }

  render() {
    return (
        <div className="NewItemForm" method="POST" action="/todos">
          <h3>Manage Todos</h3>
          <form onSubmit={(event) => { 
              this.props.submitEvent(event,this.state.newTodo);
              this.setState({newTodo:""});
            } 
          }>
            <input type="text"  onChange={(input) => this.parseTodoName(input)} value={this.state.newTodo}/>
            <input type="submit" value="Add Todo"/>
          </form>
        </div>
    );
  }
}

export default NewItemForm;