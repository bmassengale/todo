import React, { Component } from 'react';
import TodoItem from './TodoItem/TodoItem';
import './TodoContainer.css';

class TodoContainer extends Component {
  constructor() {
    super();

    this.state = {
      isLoaded: false,
      items: [],
      error: null
    };
  }

  componentDidMount() {
    fetch("http://localhost:8080/todos")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { items } = this.state;
    if(this.state.error) { return <div>{this.state.error.message}</div>; }
    else if(!this.state.isLoaded) { return <div>Fetching todos..</div>; }
    else {
      return (
        <div className="TodoContainer">
          {items.map( (todo) => { 
              return (
                <TodoItem individualTodo = {todo} 
                  key={todo.todoid} />
              );
            }
          )}
        </div>
      );
    } 
  }
}

export default TodoContainer;