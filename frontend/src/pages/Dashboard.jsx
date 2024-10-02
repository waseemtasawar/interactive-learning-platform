import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode"; // Import jwt-decode
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const [userData, setUserData] = useState(null); // Define userData state

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const decodedToken = jwt_decode(auth?.token); // Decode the token
        const currentTime = Date.now() / 1000; // Current time in seconds

        if (decodedToken.exp < currentTime) {
          console.log("Session expired, please log in again.");
          setAuth(null); // Clear auth state
          localStorage.removeItem("token"); // Remove token from localStorage
          return;
        }

        const response = await axios.get(
          "http://localhost:5000/api/auth/dashboard",
          {
            headers: {
              Authorization: `Bearer ${auth?.token}`,
            },
          }
        );

        setUserData(response.data); // Set user data in state
        console.log("User Data:", response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (auth?.token) {
      fetchUserData();
    }
  }, [auth, setAuth]);

  const handleLogout = () => {
    setAuth(null);
    localStorage.removeItem("token");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-700 text-center mb-6">
          Dashboard
        </h2>
        {userData ? (
          <div>
            <p>Welcome, {userData.username}!</p>
            <p>Email: {userData.email}</p>
            <p>Phone: {userData.phoneNumber}</p>
            <button
              onClick={handleLogout}
              className="mt-4 w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-200"
            >
              Logout
            </button>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
