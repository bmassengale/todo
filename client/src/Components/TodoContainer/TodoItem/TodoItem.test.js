import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
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
    const todo = {todoid: 50, title: "Test this code", iscomplete: false};
    render(<TodoItem individualTodo={todo}/>, container);

    expect(document).toBeTruthy();
  });

  it("renders with todo title", () => {
    const todo = {todoid: 50, title: "Test this code", iscomplete: false};
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
    const todo = {todoid: 50, title: "Test this code", iscomplete: false};
    render(<TodoItem individualTodo={todo}/>, container);
      const completeButton = screen.getAllByRole('button')[0]

    expect(completeButton.className).toEqual("completeButton");
  });

  it('calls the handleComplete method passed down when O button is clicked', () => {
    const handleCompleteMock = jest.fn();
    const todo = {todoid: 50, title: "Test this code", iscomplete: false};
    render(<TodoItem individualTodo={todo} handleComplete={handleCompleteMock}/>, container);
    const completeButton = screen.getAllByRole('button')[0];

    userEvent.click(completeButton);

    expect(handleCompleteMock).toHaveBeenCalledWith(todo);
  });

  it('calls the handleRemove method passed down when X button is clicked', () => {
    const handleRemoveMock = jest.fn();
    const todo = {todoid: 50, title: "Test this code", iscomplete: false};
    render(<TodoItem individualTodo={todo} handleRemove={handleRemoveMock}/>, container);
    const removeButton = screen.getAllByRole('button')[1];

    userEvent.click(removeButton);

    expect(handleRemoveMock).toHaveBeenCalledWith(todo.todoid);
  });

  it('calls the handleComplete method and removes the O button', () => {
    const todo = {todoid: 50, title: "Test this code", iscomplete: false};
    const handleCompleteMock = jest.fn().mockImplementation( todo => {todo.iscomplete = true} );
    const { unmount } = render(<TodoItem individualTodo={todo} handleComplete={handleCompleteMock}/>, container);
    let completeButton = screen.getAllByRole('button')[0];

    userEvent.click(completeButton);
    unmount();
    render(<TodoItem individualTodo={todo} handleComplete={handleCompleteMock}/>, container);
    completeButton = screen.getAllByRole('button')[0];

    expect(completeButton.className).toEqual("completeButton hidden");
  });

  it('calls the handleRemove method and removes the entire todo', () => {
    let todo = {todoid: 50, title: "Test this code", iscomplete: false};
    const handleRemoveMock = jest.fn().mockImplementation( () => {todo = null} );
    const { unmount } = render(<TodoItem individualTodo={todo} handleComplete={handleRemoveMock}/>, container);
    let removeButton = screen.getAllByRole('button')[0];

    userEvent.click(removeButton);
    unmount();
    render(<TodoItem individualTodo={todo} handleComplete={handleRemoveMock}/>, container);
    removeButton = screen.queryByRole('button');

    expect(removeButton).toBeFalsy();
  });
});