import React, { useState } from "react";
import Lottie from "lottie-react";
import signupAnimation from "./signup-animation.json"; 
import "./SignupPage.css";
import { Link, useNavigate } from "react-router-dom";

function SignupPage() {

    // form
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const navigate = useNavigate();

    // for imnput value
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // submit handler
    const handleSubmit = (e) => {
        e.preventDefault();

        // error if password not match
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        // alert(`Name: ${formData.name}\nEmail: ${formData.email}`);
        navigate('/')
    };

    return (
        <div className="signup-container">
            <div className="signup-box">

                {/* lotty animation */}
                <div className="animation-container">
                    <Lottie animationData={signupAnimation} loop={true} />
                </div>

                {/* create account form */}
                <form className="signup-form" onSubmit={handleSubmit}>
                    <h2>Create Account</h2>

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

                    <button type="submit" className="signup-btn">
                        Sign Up
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