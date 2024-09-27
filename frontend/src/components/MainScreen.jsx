import { useNavigate } from "react-router-dom";

const MainScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-purple-400 via-blue-400 to-red-400">
      <div className="w-full max-w-2xl p-8 space-y-8 bg-white border-4 border-gray-300 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center text-gray-800 hover:text-red-600 transition duration-300 ease-in-out">
          Welcome to Interactive Learning Platform
        </h1>

        <div className="flex justify-center space-x-6">
          {/* Login Button */}
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-3 text-lg font-semibold text-white bg-green-500 border border-green-600 rounded-lg hover:bg-green-600 shadow-lg transition-transform transform hover:-translate-y-1"
          >
            Login
          </button>

          {/* Signup Button */}
          <button
            onClick={() => navigate("/signup")}
            className="px-6 py-3 text-lg font-semibold text-white bg-purple-500 border border-purple-600 rounded-lg hover:bg-purple-600 shadow-lg transition-transform transform hover:-translate-y-1"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainScreen;
