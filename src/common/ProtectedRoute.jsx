// ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useGetUserData } from "../hooks/useGetUserDetails";

const ProtectedRoute = ({ children }) => {
  const userDetails = useGetUserData();

  if (!userDetails) {
    return <div>Loading...</div>;
  }

  return userDetails ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
