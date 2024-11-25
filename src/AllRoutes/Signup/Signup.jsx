import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import useIndexedDB from "../../Hooks/useIndexedDB";
import useInstantDB from "../../Hooks/useInstantDB";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // For displaying validation errors
  const navigate = useNavigate();

  const { saveUserToIndexedDB } = useIndexedDB("MyAppDB", "users");
  const { saveUserToInstantDB } = useInstantDB();

  const validateInputs = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    const passwordMinLength = 6;

    if (!emailRegex.test(email)) return "Invalid email format.";
    if (!phoneRegex.test(mobileNumber)) return "Invalid mobile number. Must be 10 digits.";
    if (password.length < passwordMinLength) return "Password must be at least 6 characters.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateInputs();
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    const newUser = {
      id: Date.now().toString(),
      email,
      password,
      mobileNumber,
    };

    try {
      await saveUserToInstantDB(newUser);
      alert("Account created successfully and synced to InstantDB!");
    } catch (error) {
      console.error("Error syncing to InstantDB:", error);
      try {
        await saveUserToIndexedDB(newUser);
        alert("Account saved locally due to InstantDB error.");
      } catch (indexedDbError) {
        console.error("Error saving to IndexedDB:", indexedDbError);
        alert("Failed to save account locally.");
      }
    }

    navigate("/login");
  };

  return (
    <div className="auth-container">
      <h2>Signup</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Mobile Number"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
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
