import React, { Component } from 'react';
import './App.css';

import TodoContainer from './Components/TodoContainer/TodoContainer';
import NewItemForm from './Components/NewItemForm/NewItemForm';
import ErrorFetching from './Components/ErrorFetching/ErrorFetching'
import Loading from './Components/Loading/Loading';

class App extends Component {
  constructor() {
    super();

    this.state = {
      isLoaded: false,
      items: [],
      error: null
    };

    this.postNewTodo = this.postNewTodo.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
    this.completeTodo = this.completeTodo.bind(this);
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


  componentWillUnmount = () => {
  };

  postNewTodo(userInput) {
    const newTodo = {title: userInput, iscomplete: false};
    fetch('http://localhost:8080/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTodo),
    })
    .then(data => console.log(data));
  }
  
  removeTodo(id) {
    fetch('http://localhost:8080/todos/' + id, {
      method: 'DELETE'
    })
    .then( () => {
      this.componentDidMount();
      }
    )
  }

  completeTodo(todoToMarkCompleted) {
    const newTodo = {todoid: todoToMarkCompleted.todoid, title: todoToMarkCompleted.title, iscomplete: true};
    fetch('http://localhost:8080/todos/' + todoToMarkCompleted.todoid, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTodo),
    })
    .then( () => {
      this.componentDidMount();
      }
    )
  }

  render() {
    const { items } = this.state;
    if(this.state.error) { return <ErrorFetching message={this.state.error.message} />; }
    else if(!this.state.isLoaded) { return <Loading />; }
    else {
      const completedItems = items.filter(todo => todo.iscomplete === true);
      const unfinishedItems = items.filter(todo => todo.iscomplete === false);

      return (
        <div className="App">
          <div className="AppContainer">
            <NewItemForm submitEvent={this.postNewTodo}/>
            <h1>Unfinished:</h1>
            <TodoContainer dataSet={unfinishedItems} 
              handleRemove={this.removeTodo} 
              handleComplete={this.completeTodo}/>
            <h1>Finished:</h1>
            <TodoContainer dataSet={completedItems} 
               handleRemove={this.removeTodo}/>
          </div>
        </div>
      );
    }
  }
}

export default App;
