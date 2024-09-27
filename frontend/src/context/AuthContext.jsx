import React, { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode"; // Import correctly

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem("token"),
    user: null,
  });

  // Logout function to clear auth and token
  const logout = () => {
    setAuth({ token: null, user: null }); // Clear token and user data
    localStorage.removeItem("token"); // Remove token from localStorage
  };

  // Use useEffect to decode the token if it's available
  useEffect(() => {
    if (auth.token) {
      try {
        const decoded = jwt_decode(auth.token); // Decode the JWT token
        setAuth((prev) => ({ ...prev, user: decoded.user })); // Set the decoded user
      } catch (error) {
        console.error("Invalid token");
        setAuth({ token: null, user: null }); // Clear auth on invalid token
        localStorage.removeItem("token"); // Remove invalid token
      }
    }
  }, [auth.token]);

  return (
    <AuthContext.Provider value={{ auth, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
