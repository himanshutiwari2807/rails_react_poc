import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Dashboard from "./Dashboard";
import Sidebar from "./Sidebar";
import AppNavbar from "./Navbar";
import Login from "../pages/Login";
import Home from "./Home";
import CourseDetails from "./CourseDetails";
import CoursePlayer from "../CoursePlayer/CoursePlayer";

const App = () => {
  const [logged, setLogged] = useState(false);
  const [onCourseStart, setCourseStart] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if the user was previously logged in
    const loggedIn = localStorage.getItem("loggedIn");
    if (loggedIn === "true") {
      setLogged(true);
    } else {
      // If not logged in and trying to access other routes, redirect to login
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    // Update course start status based on current path
    if (location.pathname === "/Course-dashboard") {
      setCourseStart(true);
    } else {
      setCourseStart(false);
    }
  }, [location.pathname]);

  return (
    <div>
      {logged ? (
        <>
          {!onCourseStart ? (
            <>
              <AppNavbar setLogged={setLogged} />
              <div className="screens-container">
                <Sidebar />
                <div className="screens-section-container">
                  <Routes>
                    <Route path="/Dashboard" element={<Dashboard />} />
                    <Route path="/Home" element={<Home />} />
                    <Route
                      path="/Course-details"
                      element={<CourseDetails setCourseStart={setCourseStart} />}
                    />
                  </Routes>
                </div>
              </div>
            </>
          ) : (
            <Routes>
              <Route path="/Course-dashboard" element={<CoursePlayer />} />
            </Routes>
          )}
        </>
      ) : (
        <Routes>
          <Route path="/login" element={<Login setLogged={setLogged} />} />
        </Routes>
      )}
    </div>
  );
};

export default App;
