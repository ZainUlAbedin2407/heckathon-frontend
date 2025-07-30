import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/authSlice";
import toast from "react-hot-toast";

const Login = () => {
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const res = await axiosInstance.post("/api/auth/login", userInfo);

      if (res.data?.success) {
        const userData = res.data.data;
        dispatch(setUser(userData));
        localStorage.setItem("user", JSON.stringify(userData));
        toast.success("User LoggedIn Successfully");
        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex md:m-10 bg-[#f1f6f6]">
      {/* Left Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white">
        <form className="w-full max-w-md space-y-5" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-semibold text-gray-800">Welcome Back</h2>
          <p className="text-sm text-gray-500">
            Please enter your login credentials
          </p>

          <button
            type="button"
            className="cursor-pointer flex items-center justify-center gap-2 w-full py-2 border rounded-md hover:bg-gray-100 border-gray-300"
          >
            <FcGoogle className="text-xl" />
            <span>Continue with Google</span>
          </button>

          <div className="text-center text-sm text-gray-400">OR</div>

          {/* Inputs */}
          <input
            type="text"
            name="username"
            value={userInfo.username}
            onChange={handleChange}
            placeholder="Username"
            className="w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0c363c] border-gray-300"
            required
          />

          <input
            type="password"
            name="password"
            value={userInfo.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0c363c] border-gray-300"
            required
          />

          {/* <p className="text-sm">
            <Link
              to="/forgot-password"
              className="text-blue-500 hover:underline"
            >
              Forgot your password?
            </Link>
          </p> */}

          {/* Show error message */}
          {errorMessage && (
            <p className="text-sm text-red-600">{errorMessage}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-[#0c363c] hover:bg-[#092a2f] text-white py-2 rounded-md transition ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-sm text-center text-gray-600">
            Don’t have an account?{" "}
            <a
              href="/register"
              className="text-[#0c363c] font-semibold hover:underline"
            >
              Sign up
            </a>
          </p>
        </form>
      </div>

      {/* Right Static Image Panel */}
      <div className="hidden md:flex w-1/2 bg-[#0c363c] text-white items-center justify-center p-10">
        <div className="text-center space-y-4 max-w-md">
          <h2 className="text-2xl font-bold">Welcome To CompileTab!</h2>
          <p className="text-gray-200 text-sm">
            Login and manage your project, collaborate with team, and explore
            features!
          </p>
          <img
            src="/random-image.jpeg"
            alt="Hackathon dashboard"
            className="rounded-lg shadow-lg mx-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
