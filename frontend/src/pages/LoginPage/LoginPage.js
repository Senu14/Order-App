import React, { useState, useRef } from "react";
import "./LoginPage.scss";
import AuthService from "../../services/auth.service";
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  let navigate = useNavigate();
  const form = useRef();
  const checkBtn = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setUsernameError("");
    setPasswordError("");

    if (username === "") {
      setUsernameError("The username is required");
    }

    if (password === "") {
      setPasswordError("The password is required.");
    }

    // console.log("username: ", username);
    // console.log("password: ", password);

    setMessage("");
    setLoading(true);

    // if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(username, password).then(
        () => {
          navigate("/HomePage");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );
    // } else {
    //   setLoading(false);
    // }
  };


  return (
    <>
      <style>{'body {  background-color: #F4E9D6 }'}</style>
      <h1 className="logintext" style={{ textAlign: "center" }} >
        You are welcome!
      </h1>
      <img src="/images/logo.png" alt="Logo" className="img" />
      <form onSubmit={handleSubmit} className="form-login">
        <div className="input-wrapper">
          <input
            className="log-input"
            placeholder="Username"
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          {usernameError && <span className="error">{usernameError}</span>}
        </div>

        <div className="input-wrapper">
          <input
            className="log-input"
            placeholder="Password"
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          {passwordError && <span className="error">{passwordError}</span>}
        </div>

        <button className="login-button" type="submit">
          Login
        </button>

        <p className="register-txt">I do not have account</p>
        <button className="register-button" type="submit"onClick={() => navigate('/CreateAccount')}>
          Register
        </button>
      </form>
    </>
  );
};

export default LoginPage;
