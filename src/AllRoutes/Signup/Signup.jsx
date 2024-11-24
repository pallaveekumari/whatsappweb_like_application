import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css"; // Import the CSS for the Signup page

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobilenumber, setMobileNumber] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock Signup Logic
    alert("Account created successfully!");
    navigate("/login"); // Redirect to login page after signup
  };

  return (
    <div className="auth-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
      <input
          type="mobilenumber"
          placeholder="Mobile Number"
          value={mobilenumber}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
