import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { render, screen } from '@testing-library/react';

import TodoContainer from './TodoContainer';

describe('TodoContainer', () => {
  let container = null;
  let todos = null;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    todos = [
      {todoid: 50, title: "Test this code", iscompleted: false}, 
      {todoid: 51, title: "Also test this", iscompleted: false}, 
      {todoid: 52, title: "Don't test this one", iscompleted: false}
    ];
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
    todos = null;
  });

  it('can render on the page', () => {
    render(<TodoContainer dataSet = {todos} />)

    expect(document).toBeTruthy();
  });

  it('renders the the amount of todos passed down to it', () => {
    render(<TodoContainer dataSet = {todos} />)
    const TodoItems = screen.getAllByText('X');
    const numberOfTodoItems = TodoItems.length;

    expect(numberOfTodoItems).toEqual(todos.length);
  })
});