/* eslint-disable no-useless-constructor */
import React, { Component } from 'react';
import './TodoItem.css';

class TodoItem extends Component {
  constructor(props){
    super(props);
  }

  render() {
    let containerClassList = "titleContainer";
    let buttonClassList = "completeButton"
    if(this.props.individualTodo.iscomplete === false) { 
      containerClassList += " unfinished"; 
    } else if(this.props.individualTodo.iscomplete === true) {
      buttonClassList += " hidden";
    }

    return (
        <div className="TodoItem">
          <div className={containerClassList}>
            <p>{this.props.individualTodo.title}</p>
            <div className="buttonContainer">
              <button className={buttonClassList} onClick = {() => this.props.handleComplete(this.props.individualTodo)}>O</button>
              <button className="deleteButton" onClick = {() => this.props.handleRemove(this.props.individualTodo.todoid)}>X</button>
            </div>
          </div>
        </div>
    );
  }
}

export default TodoItem;