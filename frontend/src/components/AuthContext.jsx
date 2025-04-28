import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedIN, SetisLoggedIn] = useState(false);
  const role = localStorage.getItem("role");
  const user = { role };

 
  useEffect(() => {
    if (user?.role) {
      SetisLoggedIn(true);
    } else {
      SetisLoggedIn(false);
    }
  }, [user?.role]);   

  return (
    <AuthContext.Provider value={{ user, loggedIN, SetisLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
