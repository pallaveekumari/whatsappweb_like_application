import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./Login/Login";
import Signup from "./Signup/Signup";
import { useAuth } from "../Context/AuthReducer";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

const AllRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected Routes */}
      {/* <Route
          path="/"
          element={
            <PrivateRoute>
              <ContactList />
            </PrivateRoute>
          }
        />
        <Route
          path="/chat/:contactId"
          element={
            <PrivateRoute>
              <ChatWindow />
            </PrivateRoute>
          }
        /> */}
    </Routes>
  );
};

export default AllRoutes;
