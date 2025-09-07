import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminStore } from "../../../store/AdminStore";
import "./AdminPage.css";

const AdminPage = () => {
  const { state, loginAdmin, signupAdmin } = useAdminStore();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      await loginAdmin(formData.email, formData.password);
    } else {
      await signupAdmin(formData.name, formData.email, formData.password);
    }

    if (state.isAuthenticated) {
      navigate("/dashboard"); // redirect after login/signup
    }
  };

  return (
    <div className="admin-auth-container">
      <div className="auth-card">
        <h2>{isLogin ? "Admin Login" : "Admin Signup"}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} />
            </div>
          )}
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>

          <button type="submit" className="auth-btn" disabled={state.loading}>
            {state.loading ? "Loading..." : isLogin ? "Login" : "Signup"}
          </button>
        </form>

        {state.error && <p className="error-text">{state.error}</p>}

        <p className="toggle-text">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? " Signup" : " Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AdminPage;