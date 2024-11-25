// // // // import React, { useState } from "react";
// // // // import { useNavigate } from "react-router-dom";
// // // // // import { useAuth } from "../../Context/AuthContext";
// // // // import "./Login.css"; // Ensure this is imported

// // // // const Login = () => {
// // // //   const [email, setEmail] = useState("");
// // // //   const [password, setPassword] = useState("");
// // // //   // const { login } = useAuth();
// // // //   const navigate = useNavigate();

// // // //   const handleSubmit = (e) => {
// // // //     e.preventDefault();
// // // //     // Mock Authentication Logic
// // // //     if (email === "test@example.com" && password === "password") {
// // // //       // login({ email });
// // // //       navigate("/");
// // // //     } else {
// // // //       alert("Invalid credentials!");
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div className="auth-container">
// // // //       <h2>Login</h2>
// // // //       <form onSubmit={handleSubmit}>
// // // //         <input
// // // //           type="email"
// // // //           placeholder="Email"
// // // //           value={email}
// // // //           onChange={(e) => setEmail(e.target.value)}
// // // //           required
// // // //         />
// // // //         <input
// // // //           type="password"
// // // //           placeholder="Password"
// // // //           value={password}
// // // //           onChange={(e) => setPassword(e.target.value)}
// // // //           required
// // // //         />
// // // //         <button type="submit">Login</button>
// // // //       </form>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default Login;

// // // import React, { useState } from "react";
// // // import { useNavigate } from "react-router-dom";
// // // // import { useIndexedDB } from "../Hooks/useIndexedDB"; // IndexedDB custom hook
// // // // import { useInstantDB } from "../Hooks/useInstantDB"; // InstantDB custom hook
// // // import { useIndexedDB } from "../../Hooks/useIndexedDB";
// // // import {useInstantDB} from "../../Hooks/useInstantDB"
// // // import "./Login.css"; // Login styling

// // // const Login = () => {
// // //   const [email, setEmail] = useState("");
// // //   const [password, setPassword] = useState("");
// // //   const navigate = useNavigate();

// // //   const { getMessages } = useIndexedDB(); // Get all users from IndexedDB
// // //   const { getMessages: getUsersFromInstantDB } = useInstantDB(); // Get users from InstantDB

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();

// // //     try {
// // //       // Attempt to fetch users from InstantDB
// // //       const users = await getUsersFromInstantDB();
// // //       const user = users.find((u) => u.email === email && u.password === password);

// // //       if (user) {
// // //         alert("Login successful!");
// // //         navigate("/");
// // //         return;
// // //       }
// // //     } catch (error) {
// // //       console.error("Error fetching data from InstantDB:", error);
// // //     }

// // //     // Fallback to IndexedDB if InstantDB fails
// // //     const localUsers = await getMessages();
// // //     const localUser = localUsers.find((u) => u.email === email && u.password === password);

// // //     if (localUser) {
// // //       alert("Login successful (Offline Mode)!");
// // //       navigate("/");
// // //     } else {
// // //       alert("Invalid credentials!");
// // //     }
// // //   };

// // //   return (
// // //     <div className="auth-container">
// // //       <h2>Login</h2>
// // //       <form onSubmit={handleSubmit}>
// // //         <input
// // //           type="email"
// // //           placeholder="Email"
// // //           value={email}
// // //           onChange={(e) => setEmail(e.target.value)}
// // //           required
// // //         />
// // //         <input
// // //           type="password"
// // //           placeholder="Password"
// // //           value={password}
// // //           onChange={(e) => setPassword(e.target.value)}
// // //           required
// // //         />
// // //         <button type="submit">Login</button>
// // //       </form>
// // //     </div>
// // //   );
// // // };

// // // export default Login;


// // import React, { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // // import { useIndexedDB } from "../../Hooks/useIndexedDB";
// // // import { useInstantDB } from "../../Hooks/useInstantDB";
// // import "./Login.css";
// // import useIndexedDB from "../../Hooks/useIndexedDB";
// // import useInstantDB from "../../Hooks/useInstantDB";

// // const Login = () => {
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [errorMessage, setErrorMessage] = useState(""); // For displaying errors
// //   const navigate = useNavigate();

// //   const { getUsersFromIndexedDB } = useIndexedDB(); // Updated method name for clarity
// //   const { getUsersFromInstantDB } = useInstantDB();

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     if (!email || !password) {
// //       setErrorMessage("Both fields are required.");
// //       return;
// //     }

// //     try {
// //       // Attempt to fetch users from InstantDB
// //       const users = await getUsersFromInstantDB();
// //       const user = users.find((u) => u.email === email && u.password === password);

// //       if (user) {
// //         alert("Login successful!");
// //         navigate("/");
// //         return;
// //       }
// //     } catch (error) {
// //       console.error("Error fetching data from InstantDB:", error);
// //     }

// //     // Fallback to IndexedDB if InstantDB fails
// //     const localUsers = await getUsersFromIndexedDB();
// //     const localUser = localUsers.find((u) => u.email === email && u.password === password);

// //     if (localUser) {
// //       alert("Login successful (Offline Mode)!");
// //       navigate("/");
// //     } else {
// //       setErrorMessage("Invalid credentials. Please try again.");
// //     }
// //   };

// //   return (
// //     <div className="auth-container">
// //       <h2>Login</h2>
// //       {errorMessage && <p className="error-message">{errorMessage}</p>}
// //       <form onSubmit={handleSubmit}>
// //         <input
// //           type="email"
// //           placeholder="Email"
// //           value={email}
// //           onChange={(e) => setEmail(e.target.value)}
// //           required
// //         />
// //         <input
// //           type="password"
// //           placeholder="Password"
// //           value={password}
// //           onChange={(e) => setPassword(e.target.value)}
// //           required
// //         />
// //         <button type="submit">Login</button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default Login;



// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Login.css";
// import useIndexedDB from "../../Hooks/useIndexedDB";
// import useInstantDB from "../../Hooks/useInstantDB";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState(""); // For displaying errors
//   const navigate = useNavigate();

//   const { getUsersFromIndexedDB } = useIndexedDB(); // Correct function name
//   const { getUsersFromInstantDB } = useInstantDB();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!email || !password) {
//       setErrorMessage("Both fields are required.");
//       return;
//     }

//     try {
//       // Attempt to fetch users from InstantDB
//       const users = await getUsersFromInstantDB();
//       const user = users.find((u) => u.email === email && u.password === password);

//       if (user) {
//         alert("Login successful!");
//         navigate("/");
//         return;
//       }
//     } catch (error) {
//       console.error("Error fetching data from InstantDB:", error);
//     }

//     // Fallback to IndexedDB if InstantDB fails
//     const localUsers = await getUsersFromIndexedDB();
//     const localUser = localUsers.find((u) => u.email === email && u.password === password);

//     if (localUser) {
//       alert("Login successful (Offline Mode)!");
//       navigate("/");
//     } else {
//       setErrorMessage("Invalid credentials. Please try again.");
//     }
//   };

//   return (
//     <div className="auth-container">
//       <h2>Login</h2>
//       {errorMessage && <p className="error-message">{errorMessage}</p>}
//       <form onSubmit={handleSubmit}>
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
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default Login;



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import useIndexedDB from "../../Hooks/useIndexedDB";
import useInstantDB from "../../Hooks/useInstantDB";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // For displaying errors
  const navigate = useNavigate();

  const { getUsersFromIndexedDB } = useIndexedDB(); // Correct function name
  const { getUsersFromInstantDB } = useInstantDB();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage("Both fields are required.");
      return;
    }

    try {
      // Attempt to fetch users from InstantDB
      const users = await getUsersFromInstantDB();
      const user = users.find((u) => u.email === email && u.password === password);

      if (user) {
        alert("Login successful!");
        navigate("/");
        return;
      }
    } catch (error) {
      console.error("Error fetching data from InstantDB:", error);
    }

    // Fallback to IndexedDB if InstantDB fails
    const localUsers = await getUsersFromIndexedDB();
    const localUser = localUsers.find((u) => u.email === email && u.password === password);

    if (localUser) {
      alert("Login successful (Offline Mode)!");
      navigate("/");
    } else {
      setErrorMessage("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
