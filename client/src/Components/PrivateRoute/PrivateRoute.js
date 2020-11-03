import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';

function PrivateRoute({ component, ...rest }) {
  const { user } = useAuth0();
  return (
    <Route render={(props) =>
      user ? < component /> : (
        <Redirect to={'/login'} />
      )
    }
    />
  );
}

export default PrivateRoute;