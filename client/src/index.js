import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-7a76ctys.us.auth0.com"
      clientId="Bqk7uOegr4mjytAjcsroHziYttEP1WJv"
      redirectUri="http://localhost:3000/todolist"
      audience="http://localhost"
      scope="read:todo" >
        <App />
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
