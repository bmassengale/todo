import React, { useState, useEffect, useRef } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './AppContainer.css';

import TodoContainer from '../TodoContainer/TodoContainer';
import NewItemForm from '../NewItemForm/NewItemForm';
import ErrorFetching from '../ErrorFetching/ErrorFetching'
import Loading from '../Loading/Loading';

function AppContainer() {
  const { getAccessTokenSilently, user } = useAuth0();
  const [isLoaded,setIsLoaded] = useState(false);
  const [items,setItems] = useState([]);
  const [error,setError] = useState(null);
  let token = useRef("");
  
  useEffect(()=>{
    (async () => {
       await getTodos();
      console.log("Component Loaded");
    })()
  },([]));

  
  const getTodos = (async () => {
    try {
      token.current = await getAccessTokenSilently();
       var url = new URL(`https://localhost:44310/todos?username=${user.email}`);

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token.current}`,
          'Content-Type': 'application/json',
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
    }
  );

  const postNewTodo = async (userInput) => {
    const newTodo = {title: userInput, iscomplete: false, user: user.email};
    await fetch('https://localhost:44310/todos/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token.current}`
      },
      body: JSON.stringify(newTodo),
    })
    .then(await getTodos());
  }
  
  const removeTodo = async (id) => {
    await fetch('https://localhost:44310/todos/' + id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token.current}`
      },
    })
    .then(await getTodos());
  }

  const completeTodo = async (todoToMarkCompleted) => {
    const newTodo = {todoid: todoToMarkCompleted.todoid, title: todoToMarkCompleted.title, iscomplete: true, user: user.email};
    await fetch('https://localhost:44310/todos/' + todoToMarkCompleted.todoid, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token.current}`
      },
      body: JSON.stringify(newTodo),
    })
    .then(await getTodos());
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
