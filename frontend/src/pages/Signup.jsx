import { useInput } from "../hooks/useInput.js";
import Input from "../components/Input";
import { isEmail, isNotEmpty, hasMinLength } from "../hooks/validation";
import axios from "axios";

const SignUp = () => {
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
  const {
    value: confrmPasswordValue,
    handleInputChange: handleconfrmPasswordChnage,
    handleInputBlur: handleconfrmPassowrdBlur,
    hasError: confrmpasswordHasError,
  } = useInput("", (value) => hasMinLength(value, 8));
  const {
    value: numberValue,
    handleInputChange: handleNumberChnage,
    handleInputBlur: handleNumberBlur,
    hasError: NumberHasError,
  } = useInput("", (value) => hasMinLength(value, 11));
  const {
    value: usernameValue,
    handleInputChange: handleUsernameChnage,
    handleInputBlur: handleUsernameBlur,
    hasError: usernameHasError,
  } = useInput("", (value) => hasMinLength(value, 8));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      email: emailValue,
      username: usernameValue,
      phoneNumber: numberValue,
      password: passwordValue,
      confirmPassword: confrmPasswordValue,
    };

    // Check if passwords match before sending the request
    if (passwordValue !== confrmPasswordValue) {
      console.error("Passwords do not match");
      alert("Passwords do not match");
      return; // Stop the submission
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signup",
        userData
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error signing up:", error.response.data);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
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
          </div>

          {/* Username */}
          <div>
            <Input
              label="Username"
              id="username"
              name="username"
              type="text"
              value={usernameValue}
              onChange={handleUsernameChnage}
              onBlur={handleUsernameBlur}
              error={
                usernameHasError && "Username must be alpahbet with number"
              }
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
              required
            />
          </div>

          {/* Number */}
          <div>
            <Input
              label="Phone Number"
              id="number"
              name="number"
              type="tel"
              value={numberValue}
              onChange={handleNumberChnage}
              onBlur={handleNumberBlur}
              error={NumberHasError && "phone number must be equal to 11"}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
              required
            />
          </div>

          {/* Password */}
          <div>
            <Input
              label="Password"
              id="password"
              type="password"
              value={passwordValue}
              onChange={handlePasswordChnage}
              onBlur={handlePassowrdBlur}
              error={passwordHasError && "Password must be greater then 8 "}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <Input
              label="Confirm Password"
              id="confirmPassword"
              type="password"
              value={confrmPasswordValue}
              onChange={handleconfrmPasswordChnage}
              onBlur={handleconfrmPassowrdBlur}
              error={
                confrmpasswordHasError && "Password must be greater then 8 "
              }
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
              required
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
