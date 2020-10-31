//import React, { Component } from 'react';
import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './AppContainer.css';

import TodoContainer from '../TodoContainer/TodoContainer';
import NewItemForm from '../NewItemForm/NewItemForm';
import ErrorFetching from '../ErrorFetching/ErrorFetching'
import Loading from '../Loading/Loading';

// class AppContainer extends Component {
//   constructor() {
//     super();

//     this.state = {
//       isLoaded: false,
//       items: [],
//       error: null
//     };

//     this.postNewTodo = this.postNewTodo.bind(this);
//     this.removeTodo = this.removeTodo.bind(this);
//     this.completeTodo = this.completeTodo.bind(this);
//   }

//   componentDidMount() {
//     fetch("https://localhost:44310/todos/", {
//       headers: {
//         'Authorization': 'Bearer ACCESS_TOKEN',
//       }
//     })
//       .then(res => res.json())
//       .then(
//         (result) => {
//           this.setState({
//             isLoaded: true,
//             items: result
//           });
//         },
//         (error) => {
//           this.setState({
//             isLoaded: true,
//             error
//           });
//         }
//       )
//   }


//   componentWillUnmount = () => {
//   };

//   postNewTodo(userInput) {
//     const newTodo = {title: userInput, iscomplete: false};
//     fetch('http://localhost:8080/todos', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(newTodo),
//     })
//     .then(data => console.log(data));
//   }
  
//   removeTodo(id) {
//     fetch('http://localhost:8080/todos/' + id, {
//       method: 'DELETE'
//     })
//     .then( () => {
//       this.componentDidMount();
//       }
//     )
//   }

//   completeTodo(todoToMarkCompleted) {
//     const newTodo = {todoid: todoToMarkCompleted.todoid, title: todoToMarkCompleted.title, iscomplete: true};
//     fetch('http://localhost:8080/todos/' + todoToMarkCompleted.todoid, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(newTodo),
//     })
//     .then( () => {
//       this.componentDidMount();
//       }
//     )
//   }

//   render() {
//     const { items } = this.state;
//     if(this.state.error) { return <ErrorFetching message={this.state.error.message} />; }
//     else if(!this.state.isLoaded) { return <Loading />; }
//     else {
//       const completedItems = items.filter(todo => todo.iscomplete === true);
//       const unfinishedItems = items.filter(todo => todo.iscomplete === false);

//       return (
//         <div className="AppContainer">
//           <div className="Container">
//             <NewItemForm submitEvent={this.postNewTodo}/>
//             <h1>Unfinished:</h1>
//             <TodoContainer dataSet={unfinishedItems} 
//               handleRemove={this.removeTodo} 
//               handleComplete={this.completeTodo}/>
//             <h1>Finished:</h1>
//             <TodoContainer dataSet={completedItems} 
//                handleRemove={this.removeTodo}/>
//           </div>
//         </div>
//       );
//     }
//   }
// }





function AppContainer() {

  const { getAccessTokenSilently } = useAuth0();
  const [isLoaded,setIsLoaded] = useState(false);
  const [items,setItems] = useState([]);
  const [error,setError] = useState(null);

  useEffect(()=>{
    (async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await fetch('https://localhost:44310/todos/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setItems(await response.json());
        setIsLoaded(true);
      } 
      catch (error) {
        console.error(error);
        setError(error);
        setIsLoaded(true);
      }
    })();
  }, [getAccessTokenSilently]);

    const postNewTodo = (userInput) => {
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
  
  const removeTodo = (id) => {
    fetch('http://localhost:8080/todos/' + id, {
      method: 'DELETE'
    })
    .then( () => {
      this.componentDidMount();
      }
    )
  }

    const completeTodo = (todoToMarkCompleted) => {
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

  if(error) { return <ErrorFetching message={error.message} />; }
    else if(!isLoaded) { return <Loading />; }
    else {
      const completedItems = items.filter(todo => todo.iscomplete === true);
      const unfinishedItems = items.filter(todo => todo.iscomplete === false);

      return (
        <div className="AppContainer">
          <div className="Container">
            <NewItemForm submitEvent={postNewTodo}/>
            <h1>Unfinished:</h1>
            <TodoContainer dataSet={unfinishedItems} 
              handleRemove={removeTodo} 
              handleComplete={completeTodo}/>
            <h1>Finished:</h1>
            <TodoContainer dataSet={completedItems} 
               handleRemove={removeTodo}/>
          </div>
        </div>
      );
  }
}

export default AppContainer;
