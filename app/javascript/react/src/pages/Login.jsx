import React, { useState } from "react";
import { Image } from "react-bootstrap";
import axios from "axios";
import { LOGIN_URL } from "../services/APIService";
import { LoginValidations } from "../validations/LoginValidations";

import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState("");

  const handleLogin = async (e) => {
    setErrors({});
    setLoginError("");
    e.preventDefault();

    const formData = { email, password };
    try {
      // const axios = require('axios');
      await LoginValidations.validate(formData, { abortEarly: false });

      let data = JSON.stringify({
        email: email,
        password: password,
      });

      let config = {
        method: "post",
        url: LOGIN_URL,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          if (response.status === 200) {
            props.setLogged(true);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("loggedIn", "true"); // Store logged in state in localStorage
            navigate("/Home");
            console.log(JSON.stringify(response.data.token));
          } else {
            console.warn(`Unexpected response status: ${response.status}`);
          }
        })
        .catch((error) => {
          setLoginError("Invalid email or password");
          console.log(error);
        });
    } catch (err) {
      if (err.inner) {
        const newErrors = err.inner.reduce((acc, error) => {
          acc[error.path] = error.message;
          return acc;
        }, {});
        setErrors(newErrors);
      }
    }
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
              <form onSubmit={handleLogin}>
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Enter Email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}

                <label>Password</label>
                {/* <span class="red-asterisk">*</span> */}

                <input
                  type="password"
                  placeholder="Enter Password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && (
                  <p style={{ color: "red" }}>{errors.password}</p>
                )}
                <div className="buttonPart">
                  <p className="error"></p>
                </div>
                <button type="submit">Login</button>
                {loginError && (
                  <p style={{ color: "red", textAlign: "center" }}>
                    {loginError}
                  </p>
                )}
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
