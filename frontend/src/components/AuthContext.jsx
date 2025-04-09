// src/context/AuthContext.js (adjust path as needed)
import React, { createContext, useContext } from "react";

// Create context
const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const role = localStorage.getItem("role"); // stored like: "admin", "donor", etc.
  const user = { role }; // Wrap it into a user object

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};

// useAuth custom hook
export const useAuth = () => useContext(AuthContext);
