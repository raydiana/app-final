// ThemeContext.js
import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState(''); 

  const setAuthentication = (isAuthenticated) => {
    setIsAuthenticated(isAuthenticated);
  };

  const setUser = (user) => {
    setUsername(user);
  };

  return (
    <ThemeContext.Provider value={{ isAuthenticated, setAuthentication, username, setUser }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
