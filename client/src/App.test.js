import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { render, screen, cleanup } from '@testing-library/react';
import { act } from "react-dom/test-utils";

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

  it('can render on the page', async () => {
    await act(async () => {
      await render(<App />)
       }
     );

    expect(document).toBeTruthy();
  });

  it('can make an API GET request on startup', async () => {
    const fetchSpy = jest.spyOn(window, 'fetch');
    await act(async () => {
      await render(<App />)
       }
     );

    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });

  it('can render child components after startup', async () => {
    act(() => {
     render(<App />)
      }
    );


    expect(await screen.findByText('Finished:')).toBeTruthy();
  });
});