/* eslint-disable no-useless-constructor */
import React, { Component } from 'react';
import TodoItem from './TodoItem/TodoItem';
import './TodoContainer.css';
import '../../ResponsiveDesign.css';

class TodoContainer extends Component {
  constructor(props) {
    super(props);
    };

  render() {
    return (
      <div className="TodoContainer">
        {this.props.dataSet.map( (todo) => { 
          return (
            <TodoItem individualTodo = {todo}
              key={todo.todoid} />
          );
        })}
      </div>
    );
  }
}

export default TodoContainer;