import React from "react";
import { useNavigate } from "react-router-dom";

const AppNavbar = (props) => {
  
  const navigate = useNavigate();

  const Logout = () => {
    debugger;
    props.setLogged(false);
    localStorage.removeItem("loggedIn"); // Remove logged in state from localStorage on logout
    navigate("/login");
  };

  return (
    <div className="navbar-style">
      <div className="d-flex justify-content-end w-100">
        <button
          className="btn btn-secondary"
          id="sidebarToggle"
          onClick={Logout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AppNavbar;
