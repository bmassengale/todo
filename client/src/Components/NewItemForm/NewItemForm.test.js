import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import NewItemForm from './NewItemForm';

describe('NewItemForm', () => {
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

  it('Will render the NewItemFrom', () => {
    render(<NewItemForm />)

    expect(document).toBeTruthy();
  });

  it('calls submitEvent method when form is submitted', () => {
    const submitEventMock = jest.fn();
    render(<NewItemForm submitEvent={submitEventMock}/>);
    const submitButton = screen.getByText("Add Todo");

    fireEvent.submit(submitButton);

    expect(submitEventMock).toHaveBeenCalled();
  });

  it('calls parseTodoName method when form is changed', () => {
    const parseTodoNameMock = jest.fn();
    render(<NewItemForm parseTodoName={parseTodoNameMock("A")}/>);
    const inputBox = screen.getByRole('textbox');
    
    fireEvent.change(inputBox);

    expect(parseTodoNameMock).toHaveBeenCalledWith("A");
  });
});