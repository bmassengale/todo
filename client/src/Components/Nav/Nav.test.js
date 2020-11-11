import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

import Nav from './Nav';
import App from '../../App';

describe('NavBar', () => {
  let container = null;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    window.location.pathname = '/';
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
    cleanup();
  });

  it('will change reroute to different page when button to view todo list is clicked and user is not logged in', async () => {
    render(<App />)
    const logoutButton = screen.getByText('View Todo List');

    await userEvent.click(logoutButton);
    let currentURL = window.location.pathname;

    expect(currentURL).toEqual('/login');
  });
});