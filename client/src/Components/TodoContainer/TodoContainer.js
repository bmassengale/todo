import React, { Component } from 'react';
import TodoItem from './TodoItem/TodoItem';
import './TodoContainer.css';

class TodoContainer extends Component {
  render() {
    return (
      <div className="TodoContainer">
        {this.props.dataSet.map( (todo) => { 
          return (
            <TodoItem individualTodo = {todo}
              key = {todo.todoid} 
              handleRemove = {(id) => this.props.handleRemove(id)}
              handleComplete = { (todoToUpdate) => this.props.handleComplete(todoToUpdate)}/>
          );
        })}
      </div>
    );
  }
}

export default TodoContainer;