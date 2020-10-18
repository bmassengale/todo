import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import TodoItem from "./TodoItem";


describe('TodoItem', () => {
  let container = null;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it('can render on the page', () => {
    const todo = {todoid: 50, title: "Test this code", iscompleted: false};
    render(<TodoItem individualTodo={todo}/>, container);

    expect(document).toBeTruthy();
  });

  it("renders with todo title", () => {
    const todo = {todoid: 50, title: "Test this code", iscompleted: false};
    render(<TodoItem individualTodo={todo}/>, container);
    const textContent = screen.getByText("Test this code");
    expect(textContent).toBeInTheDocument();
  })

  it("to not have a 'mark complete' button if iscompleted property is true", () => {
    const todo = {todoid: 50, title: "Test this code", iscomplete: true};
    render(<TodoItem individualTodo={todo}/>, container);
    const completeButton = screen.getAllByRole('button')[0]

    expect(completeButton.className).toEqual("completeButton hidden");
  });

  it("to have a 'mark complete' button if iscompleted property is false", () => {
    const todo = {todoid: 50, title: "Test this code", iscompleted: false};
    render(<TodoItem individualTodo={todo}/>, container);
      const completeButton = screen.getAllByRole('button')[0]

    expect(completeButton.className).toEqual("completeButton");
  });

  it('calls the handleComplete method passed down when O button is clicked', () => {
    const handleCompleteMock = jest.fn();
    const todo = {todoid: 50, title: "Test this code", iscompleted: false};
    render(<TodoItem individualTodo={todo} handleComplete={handleCompleteMock}/>, container);
    const completeButton = screen.getAllByRole('button')[0];

    fireEvent.click(completeButton);

    expect(handleCompleteMock).toHaveBeenCalledWith(todo);
  });

  it('calls the handleRemove method passed down when X button is clicked', () => {
    const handleRemoveMock = jest.fn();
    const todo = {todoid: 50, title: "Test this code", iscompleted: false};
    render(<TodoItem individualTodo={todo} handleRemove={handleRemoveMock}/>, container);
    const removeButton = screen.getAllByRole('button')[1];

    fireEvent.click(removeButton);

    expect(handleRemoveMock).toHaveBeenCalledWith(todo.todoid);
  });
});