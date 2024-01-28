"use client";
import { createContext, useContext, useState, ReactNode } from "react";

// Create the context
const NavContext = createContext(undefined);

// Create a provider component to wrap your app
export const NavProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState('');
  const [jobDetails, setJobDetails] = useState({});



  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  const closeNav = () => {
    setIsOpen(false);
  };

  return (
    <NavContext.Provider value={{ isOpen, toggleNav, closeNav, user, setUser, jobDetails, setJobDetails}}>
      {children}
    </NavContext.Provider>
  );
};

// Create a custom hook to access the navigation state
export const useNav = () => {
  const context = useContext(NavContext);
  if (context === undefined) {
    throw new Error("useNav must be used within a NavProvider");
  }
  return context;
};
