import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { isEmail, isNotEmpty, hasMinLength } from "../hooks/validation";
import { useInput } from "../hooks/useInput.js";
import { AuthContext } from "../context/AuthContext.jsx";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);

  const {
    value: emailValue,
    handleInputChange: handleEmailChnage,
    handleInputBlur: handleEmailBlur,
    hasError: emailHasError,
  } = useInput("", (value) => isEmail(value) && isNotEmpty(value));

  const {
    value: passwordValue,
    handleInputChange: handlePasswordChnage,
    handleInputBlur: handlePassowrdBlur,
    hasError: passwordHasError,
  } = useInput("", (value) => hasMinLength(value, 8));

  const handleLogin = async (e) => {
    e.preventDefault();
    if (emailHasError || passwordHasError) {
      return;
    }

    const loginData = {
      email: emailValue,
      password: passwordValue,
    };

    try {
      const response = await axios.post(
        "/api/auth/login",
        loginData,
        {
          withCredentials: true,
        }
      );

      const { token, msg } = response.data; // Extract token from response

      // Store token in localStorage and update AuthContext
      localStorage.setItem("token", token); // Save token to localStorage
      console.log("Token saved:", token);

      // Update AuthContext state directly
      setAuth({ token, user: null }); // Update the AuthContext with token

      alert(msg); // Optionally, show a success message

      // Navigate to the dashboard after login
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      alert(error.response?.data.msg || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Login
        </h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <Input
            label="Email"
            id="email"
            value={emailValue}
            onChange={handleEmailChnage}
            onBlur={handleEmailBlur}
            error={emailHasError && "Please enter a valid Email"}
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
            required
          />
          <Input
            label="Password"
            id="password"
            type="password"
            value={passwordValue}
            onChange={handlePasswordChnage}
            onBlur={handlePassowrdBlur}
            error={passwordHasError && "Password must be at least 8 characters"}
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
            required
          />

          <div className="flex flex-col">
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-200"
            >
              Login
            </button>
          </div>

          <div className="text-sm text-center text-gray-500">
            Don't have an account?
            <a href="/signup" className="text-indigo-600 hover:underline ml-1">
              Sign Up
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
