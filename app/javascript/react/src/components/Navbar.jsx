import React from "react";
import { Container, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AppNavbar = (props) => {
  const navigate = useNavigate();

  const Logout = () => {
    props.setLogged(false);
    localStorage.removeItem("loggedIn"); // Remove logged in state from localStorage on logout
    navigate("/login");
  };

  return (
    <Navbar className="navbar" bg="dark" expand="lg" fixed="top" variant="dark">
      <div className="d-flex justify-content-end w-100">
        <button
          className="btn btn-secondary"
          id="sidebarToggle"
          onClick={Logout}
        >
          Logout
        </button>
      </div>
    </Navbar>
  );
};

export default AppNavbar;
