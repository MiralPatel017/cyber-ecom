import { useState } from "react";
import Lottie from "lottie-react";
import signupAnimation from "./signup-animation.json";
import "./SignupPage.css";
import { Link, useNavigate } from "react-router-dom";

function SignupPage() {
  // form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setLoading(false);
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong!");
      }

      console.log("✅ Success:", data);
      alert("Signup successful!");

      // redirect to login page
      navigate("/");
    } catch (err) {
      setError(err.message);
      console.error("❌ Error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        {/* Lottie animation */}
        <div className="animation-container">
          <Lottie animationData={signupAnimation} loop={true} />
        </div>

        {/* signup form */}
        <form className="signup-form" onSubmit={handleSubmit}>
          <h2>Create Account</h2>

          {/* name */}
          <div className="input-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* email */}
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* password */}
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* confirm password */}
          <div className="input-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          {/* error message */}
          {error && <p style={{ color: "red" }}>{error}</p>}

          {/* signup button */}
          <button type="submit" className="signup-btn" disabled={loading}>
            {loading ? "Signing up..." : "Sign Up"}
          </button>

          <p className="login-text">
            Already have an account? <Link to="/">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignupPage
;