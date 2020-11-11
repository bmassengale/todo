import React, { useState, useEffect, useRef } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './AppContainer.css';

import TodoContainer from '../TodoContainer/TodoContainer';
import NewItemForm from '../NewItemForm/NewItemForm';
import ErrorFetching from '../ErrorFetching/ErrorFetching'
import Loading from '../Loading/Loading';

function AppContainer() {
  const { getAccessTokenSilently, user, isLoading } = useAuth0();
  
  const [isLoaded,setIsLoaded] = useState(false);
  const [items,setItems] = useState([]);
  const [error,setError] = useState(null);
  let token = useRef("");

  useEffect(()=>{
    (async () => {
      token.current = await getAccessTokenSilently();
      if(!isLoading) {
        await getTodos();
      }
    })()
  },([isLoaded, getAccessTokenSilently]));

  
  const getTodos = (async () => {
    try {
      var url = await new URL(`http://localhost:8080/todos?username=${user.email}`);
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token.current}`,
          'Content-Type': 'application/json',
        }
      });
      await setItems(await response.json());
      await setIsLoaded(true);
    } 
    catch (error) {
      console.error(error);
      await setError(error);
      await setIsLoaded(true);
    }
    }
  );

  const postNewTodo = async (event,userInput) => {
    event.preventDefault();
    const newTodo = {title: userInput, iscomplete: false, username: user.email};
    console.log(newTodo);
    await fetch('http://localhost:8080/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token.current}`
      },
      body: JSON.stringify(newTodo),
    })
    await getTodos();
  }
  
  const removeTodo = async (id) => {
    await fetch('http://localhost:8080/todos/' + id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token.current}`
      },
    })
    await getTodos();
  }

  const completeTodo = async (todoToMarkCompleted) => {
    const newTodo = {todoid: todoToMarkCompleted.todoid, title: todoToMarkCompleted.title, iscomplete: true, username: user.email};
    await fetch('http://localhost:8080/todos/' + todoToMarkCompleted.todoid, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token.current}`
      },
      body: JSON.stringify(newTodo),
    })
    await getTodos();
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
