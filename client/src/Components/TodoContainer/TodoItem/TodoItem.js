/* eslint-disable no-useless-constructor */
import React, { Component } from 'react';
import './TodoItem.css';

class TodoItem extends Component {
  constructor(props){
    super(props);
  }

  render() {
    let classList = "titleContainer";
    if(this.props.individualTodo.iscomplete === false) { classList += " unfinished"; }
    return (
        <div className="TodoItem">
          <div className={classList}>
            <p>{this.props.individualTodo.title}</p>
            <button className="delete" onClick = {() => this.props.clicked(this.props.individualTodo.todoid)}>X</button>
          </div>
        </div>
    );
  }
}

export default TodoItem;