/* eslint-disable no-useless-constructor */
import React, { Component } from 'react';
import './TodoItem.css';

class TodoItem extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
        <div className="TodoItem">
            <h4 >{this.props.individualTodo.title}</h4>
        </div>
    );
  }
}

export default TodoItem;