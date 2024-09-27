// src/pages/Dashboard.js
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      if (!auth.token) {
        setLoading(false); // Stop loading if no token
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:5000/api/dashboard",
          {
            headers: {
              Authorization: `Bearer ${auth.token}`, // Ensure this token is valid
            },
          }
        );
        setMessage(response.data.msg);
      } catch (error) {
        console.error("Error fetching dashboard:", error);
        if (error.response?.status === 401) {
          logout();
          navigate("/login");
        }
      } finally {
        setLoading(false); // Stop loading regardless of success or error
      }
    };

    fetchDashboard();
  }, [auth.token]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Dashboard
        </h2>
        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : (
          <p className="text-center text-gray-600 mb-4">{message}</p>
        )}
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
