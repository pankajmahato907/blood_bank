import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";


const AdminRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user || !user.role) {
    return <Navigate to="/login" />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminRoute;