import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { render, screen, cleanup } from '@testing-library/react';

import App from './App';

describe('App', () => {
  let container = null;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
    cleanup();
  });

  it('can render on the page', () => {
    render(<App />);

    expect(document).toBeTruthy();
  });

  // it('will render null if user is not is authenticated', () => {
  //   render(<App />);
  //   const displayedComponent = screen.queryByText('Loading...');
    
  //   expect(displayedComponent).toEqual(null);
  // });

  // it('will render the todoContainer if user is authenticated', () => {
  //   render(<App isAuthentication={true}/>);
  //   const displayedComponent = screen.getByText('Loading...');
    
  //   expect(displayedComponent).toBeFalsy();
  // });
});