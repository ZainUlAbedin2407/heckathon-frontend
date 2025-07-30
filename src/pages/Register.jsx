import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    bio: "",
    avatar: null,
  });

  const [avatarPreview, setAvatarPreview] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrorMessage(""); // clear error on change
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUserInfo((prev) => ({ ...prev, avatar: file }));
      setAvatarPreview(URL.createObjectURL(file));
    }
    setErrorMessage(""); // clear error
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password, confirmPassword, bio, avatar } =
      userInfo;

    // frontend validation
    if (!username || !email || !password || !confirmPassword) {
      return setErrorMessage("Please fill all required fields.");
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return setErrorMessage("Invalid email format.");
    }

    if (password.length < 8) {
      return setErrorMessage("Password must be at least 8 characters long.");
    }

    if (password !== confirmPassword) {
      return setErrorMessage("Passwords do not match.");
    }

    try {
      setLoading(true);
      setErrorMessage("");

      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("bio", bio);
      if (avatar) formData.append("avatar", avatar);

      const res = await axiosInstance.post("/api/auth/register", formData);

      const userEmail = res?.data?.data?.email;

      if (userEmail) {
        localStorage.setItem("email", userEmail);
        toast.success(
          "User registered successfully. Please verify your email."
        );
        setTimeout(() => {
          navigate("/verify-email");
        }, 1500);
      }
    } catch (err) {
      console.error(err);
      const backendMessage =
        err.response?.data?.message || "Registration failed. Please try again.";
      setErrorMessage(backendMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex md:m-10 bg-[#f1f6f6]">
      {/* Left Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white">
        <form className="w-full max-w-md space-y-5" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-semibold text-gray-800">
            Create Your Account
          </h2>
          <p className="text-sm text-gray-500">
            Welcome back! Please enter your details
          </p>

          <button
            type="button"
            className="cursor-pointer flex items-center justify-center gap-2 w-full py-2 border rounded-md hover:bg-gray-100 border-gray-300"
          >
            <FcGoogle className="text-xl" />
            <span>Sign up with Google</span>
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
            type="email"
            name="email"
            value={userInfo.email}
            onChange={handleChange}
            placeholder="Email"
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

          <input
            type="password"
            name="confirmPassword"
            value={userInfo.confirmPassword}
            onChange={handleChange}
            placeholder="Retype Password"
            className="w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0c363c] border-gray-300"
            required
          />

          <textarea
            name="bio"
            value={userInfo.bio}
            onChange={handleChange}
            placeholder="Short Bio (optional)"
            className="w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0c363c] border-gray-300"
            rows={2}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Avatar
            </label>
            <div className="w-full flex items-center justify-center border-2 border-dashed border-[#0c363c] rounded-md p-4 cursor-pointer hover:bg-gray-50 transition">
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
                id="avatarUpload"
              />
              <label
                htmlFor="avatarUpload"
                className="w-full text-center text-[#0c363c] font-medium"
              >
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt="Preview"
                    className="w-16 h-16 object-cover rounded-full mx-auto"
                  />
                ) : (
                  "+ Upload Avatar"
                )}
              </label>
            </div>
          </div>

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
            {loading ? "Signing up..." : "Sign Up"}
          </button>

          <p className="text-sm text-center text-gray-600">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-[#0c363c] font-semibold hover:underline"
            >
              Sign in
            </a>
          </p>
        </form>
      </div>

      {/* Right Static Image Panel */}
      <div className="hidden md:flex w-1/2 bg-[#0c363c] text-white items-center justify-center p-10">
        <div className="text-center space-y-4 max-w-md">
          <h2 className="text-2xl font-bold">Welcome To CompileTab!</h2>
          <p className="text-gray-200 text-sm">
            Join now to start building your project. Secure, fast, and seamless
            registration awaits!
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

export default Register;
