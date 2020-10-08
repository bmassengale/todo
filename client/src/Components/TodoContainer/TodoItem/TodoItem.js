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
          <div className="titleContainer">
            <p>{this.props.individualTodo.title}</p>
          </div>
        </div>
    );
  }
}

export default TodoItem;