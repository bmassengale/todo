import React from 'react';
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import "./Nav.css";

const Nav = () => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  let buttonArea;
  if (!isAuthenticated) {
    buttonArea = <div className="userInfo">
                    <button onClick={ () => loginWithRedirect()}> Log In </button>
                  </div>;
  } 
  else if (isAuthenticated) {
    buttonArea = <div className="userInfo">
                    <h3>Hello, {user.email}</h3> 
                    <button onClick={() => logout({ returnTo: window.location.origin })}> Log Out </button>
                  </div>;
  }

  return (
    <div className="Nav">
      <div className="HomeButton">
        <Link to="/"><button>Home</button></Link>
      </div>
      <div className="rightJustifyButtons">
        { buttonArea }
        <div className="ViewButton">
          <Link to="/todolist"><button>View Todo List</button></Link>
        </div>
      </div>

    </div>
  );
};

export default Nav;