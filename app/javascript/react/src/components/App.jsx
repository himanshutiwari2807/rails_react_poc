import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import Sidebar from "./Sidebar";
import AppNavbar from "./Navbar";
import Login from "../pages/Login";

const App = () => {
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    // Check if the user was previously logged in
    const loggedIn = localStorage.getItem("loggedIn");
    if (loggedIn === "true") {
      setLogged(true);
    }
  }, []);

  return (
    <div>
      {logged ? (
        <>
          <AppNavbar setLogged={setLogged} />
          <div className="screens-container">
            <Sidebar />
            <div className="screens-section-container">
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
              </Routes>
            </div>
          </div>
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
