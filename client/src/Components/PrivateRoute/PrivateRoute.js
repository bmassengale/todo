import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';

function PrivateRoute({ component: Component, ...rest }) {
  const { user, isLoading } = useAuth0();
  return (
    !isLoading && (
      <Route render={(props) =>
        user ? <Component /> : (
          <Redirect to={'/login'} />
        ) 
      }
      />
    )

  );
}

export default PrivateRoute;