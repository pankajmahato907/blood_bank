import React, { createContext, useState, useEffect } from 'react';

export const DonorContext = createContext();

export const DonorProvider = ({ children }) => {
  const [bloodGroup, setBloodGroup] = useState(localStorage.getItem("bloodGroup") || null);

  // Update localStorage when bloodGroup changes
  useEffect(() => {
    if (bloodGroup) {
      localStorage.setItem("bloodGroup", bloodGroup);
    } else {
      localStorage.removeItem("bloodGroup");
    }
  }, [bloodGroup]);

  return (
    <DonorContext.Provider value={{ bloodGroup, setBloodGroup }}>
      {children}
    </DonorContext.Provider>
  );
};
