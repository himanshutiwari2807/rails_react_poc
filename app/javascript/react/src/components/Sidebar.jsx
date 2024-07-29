import React from "react";
import { Image } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";


const Sidebar = () => {
  return (
    <div className="sidebar-wrapper border-end bg-white" id="sidebar-wrapper">
      <div className="list-group list-group-flush">
        <div className="vst-logo-wrapper">
        <Image
                    className="sidebar-logo"
                    src="../../assets/images/vitalsource_logo.svg"
                    alt="VST-logo"
                  />
        </div>
        <NavLink
          to="/Home"
          className={({ isActive }) =>
            isActive
              ? "list-group-item list-group-item-action list-group-item-light p-3 active"
              : "list-group-item list-group-item-action list-group-item-light p-3"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/Search"
          className={({ isActive }) =>
            isActive
              ? "list-group-item list-group-item-action list-group-item-light p-3 active"
              : "list-group-item list-group-item-action list-group-item-light p-3"
          }
        >
          Search
        </NavLink>
        <NavLink
          to="/My-library"
          className={({ isActive }) =>
            isActive
              ? "list-group-item list-group-item-action list-group-item-light p-3 active"
              : "list-group-item list-group-item-action list-group-item-light p-3"
          }
        >
         My Library
        </NavLink>
        <NavLink
          to="/Favorites"
          className={({ isActive }) =>
            isActive
              ? "list-group-item list-group-item-action list-group-item-light p-3 active"
              : "list-group-item list-group-item-action list-group-item-light p-3"
          }
        >
          Favorites
        </NavLink>
        <NavLink
          to="/Expired"
          className={({ isActive }) =>
            isActive
              ? "list-group-item list-group-item-action list-group-item-light p-3 active"
              : "list-group-item list-group-item-action list-group-item-light p-3"
          }
        >
          Expired
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;