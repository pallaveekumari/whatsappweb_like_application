// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Signup.css"; // Import the CSS for the Signup page

// const Signup = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [mobilenumber, setMobileNumber] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Mock Signup Logic
//     alert("Account created successfully!");
//     navigate("/login"); // Redirect to login page after signup
//   };

//   return (
//     <div className="auth-container">
//       <h2>Signup</h2>
//       <form onSubmit={handleSubmit}>
//       <input
//           type="mobilenumber"
//           placeholder="Mobile Number"
//           value={mobilenumber}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button type="submit">Signup</button>
//       </form>
//     </div>
//   );
// };

// export default Signup;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useIndexedDB } from "../Hooks/useIndexedDB"; // Import custom IndexedDB hook
// import { useInstantDB } from "../Hooks/useInstantDB"; // Import custom InstantDB hook
import "./Signup.css";
import { useIndexedDB } from "../../Hooks/useIndexedDB";
import {useInstantDB} from "../../Hooks/useInstantDB"
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const navigate = useNavigate();

  const { saveMessage } = useIndexedDB(); // IndexedDB save method
  const { sendMessage } = useInstantDB(); // InstantDB save method

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      id: Date.now().toString(), // Unique ID
      email,
      password,
      mobileNumber,
    };

    try {
      // Save to InstantDB
      await sendMessage(newUser);
      alert("Account created successfully and synced to InstantDB!");
    } catch (error) {
      console.error("Error syncing to InstantDB:", error);
      // Save to IndexedDB as fallback
      saveMessage(newUser);
      alert("Account saved locally due to InstantDB error.");
    }

    // Redirect to login page
    navigate("/login");
  };

  return (
    <div className="auth-container">
      <h2>Signup</h2>
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
