import { useState } from "react";
import Lottie from "lottie-react";
import loginAnimation from "./login-animation.json"; // lotty file
import "./sellerLoginPage.css";
import { Link, useNavigate } from "react-router-dom";

const sellerLoginPage = () => {
  // email
  const [email, setEmail] = useState("");
  // password
  const [password, setPassword] = useState("");
  // error message
  const [error, setError] = useState("");
  // loading state
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:4000/seller/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed");
        setLoading(false);
        return;
      }

      // Login success -> navigate
      navigate("/seller/home");
    } catch (err) {
      setError("Something went wrong. Try again!");
    } finally {
      setLoading(false);
    }
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
          <h2>Welcome Back Seller</h2>

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

          {/* error message */}
          {error && <p className="error-message">{error}</p>}

          {/* submit button */}
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* if not account then signup */}
          <p className="register-text">
            Don’t have an account? <Link to="/seller/signup"> Signup </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default sellerLoginPage;