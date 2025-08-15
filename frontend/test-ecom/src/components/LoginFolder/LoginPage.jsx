import React, { useState } from "react";
import Lottie from "lottie-react";
import loginAnimation from "./login-animation.json"; // lotty file
import "./LoginPage.css";
import { Link, Outlet, useNavigate } from "react-router-dom";
// import HomePage from "../HomePage";
import SignupPage from "../SignupFolder/SignupPage";

const LoginPage = () => {

  // email
  const [email, setEmail] = useState("");
  // password
  const [password, setPassword] = useState("");
  // navigate
  const navigate = useNavigate()


  // submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    // alert(`Email: ${email}\nPassword: ${password}`);
    navigate('/home')
  };

  return (

    <div className="login-container">
      <div className="login-box">

        {/* lotty animation */}
        <div className="animation-container">
          <Lottie animationData={loginAnimation} loop={true} />
        </div>

        {/* login form */}
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Welcome Back</h2>

          {/* email */}
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* password */}
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* submit button */}
          <button type="submit" className="login-btn">
            Login
          </button>

          {/* if not account then signup */}
          <p className="register-text">
            Don’t have an account? <Link to='/signup'> Signup </Link>
          </p>
        </form>
      </div>
      {/* <Outlet /> */}
    </div>

  );
}

export default LoginPage