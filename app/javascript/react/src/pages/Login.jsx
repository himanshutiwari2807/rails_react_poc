import React from "react";
import { Image } from "react-bootstrap";

import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    props.setLogged(true);
    localStorage.setItem("loggedIn", "true"); // Store logged in state in localStorage
    navigate("/Home");
  };

  return (
    <div className="login-page container">
      <div className="row align-items-center d-flex vh-100">
        <div className="col-6"></div>
        <div className="col-6 d-flex justify-content-end">
          <div className="login">

            <div className="heading">
              
                <h2 className="text-center">Professional Learning</h2>
              
              <h1>Login</h1>

              <form>
                <label>Email</label>
                <input type="email" placeholder="Enter Email" name="email" />
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Enter Password"
                  name="password"
                />

                <div className="buttonPart">
                  <p className="error"></p>
                </div>

                <button onClick={handleLogin}>Login</button>
              </form>

              <div className="switchPage">
                <a href="/signup">Sign up</a>
              </div>

              <div className="text-center d-flex align-items-center justify-content-center mt-3">
                <p className="d-flex align-items-center">
                  Powered by{" "}
                  <Image
                    className="logo-image"
                    src="../../assets/images/powered-by-graphic.svg"
                    alt="image"
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
