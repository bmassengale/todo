import React, { Component } from 'react';
import './AppContainer.css';

import TodoContainer from '../TodoContainer/TodoContainer';
import NewItemForm from '../NewItemForm/NewItemForm';
import ErrorFetching from '../ErrorFetching/ErrorFetching'
import Loading from '../Loading/Loading';

class AppContainer extends Component {
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
    // let token;
    // (async () => {8 
    //   token = await getAccessTokenSilently({
    //     audience: 'http://localhost',
    //     scope: 'read:todo',
    //   })});
    fetch("http://localhost:5000/todos",{
      headers: {
        Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlQxNHFrQkE2N2xseEFldF9FTm0weCJ9.eyJpc3MiOiJodHRwczovL2Rldi03YTc2Y3R5cy51cy5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMTQyMTkyMTQ2MTExMDYwMDU3MDQiLCJhdWQiOlsiaHR0cDovL2xvY2FsaG9zdCIsImh0dHBzOi8vZGV2LTdhNzZjdHlzLnVzLmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE2MDQwNjUxNjgsImV4cCI6MTYwNDE1MTU2OCwiYXpwIjoiQnFrN3VPZWdyNG1qeXRBamNzcm9IemlZdHRFUDFXSnYiLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIHJlYWQ6dG9kbyJ9.tyohesVB5cvaBRo0twcxeL6x7eBIPhRUtuJKTz5Tabov39zi9VsdP9daSeKvwOskT0WK29qjFC9WYG1If4ky-VETibt1CGeD6i79tiMEWXknp-YrP5YLKEx4nL8iD6Wft1PDugQQszFMQasdWuAruIwWrwoxEOX44cQjKNCXcIb7OiU2jM4m060XcydU93Xz5H_0zGmLRmMLFWfdB3VC-_zVW8HkkJAgGHu1gzo0pzPITksUjoKsEWn6ASUjafs8MO8ae0_Pz3RaQU4p62WCPANef8aZ_XzwjVbqO4lpCsLsp6JtOrfa1c_lLAiCqPpTU7LJouhRgD0Sj60zQkLwhQ`
      }
    })
      .then(res => res.json())
      .then(
        (result) => {
          console.log(localStorage.getItem('user_token'));
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
        <div className="AppContainer">
          <div className="Container">
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

export default AppContainer;
