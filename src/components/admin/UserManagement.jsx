import { useEffect, useState } from "react";
import { FaTrash, FaUserPlus } from "react-icons/fa";
import axiosInstance from "../../utils/axiosInstance";
import defaultAvatar from "/profile-icon.jpg"; // Make sure this path is correct

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    bio: "",
    role: "customer",
    avatar: null,
  });
  const [avatarPreview, setAvatarPreview] = useState(null);

  // Fetch users
  const fetchUsers = async () => {
    try {
      setLoadingUsers(true);
      setError("");
      const res = await axiosInstance.get("/api/users");
      const data = res.data?.data ?? res.data ?? [];
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to load users.");
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (successMsg || error) {
      const timer = setTimeout(() => {
        setSuccessMsg("");
        setError("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMsg, error]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    setError("");
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((p) => ({ ...p, avatar: file }));
      setAvatarPreview(URL.createObjectURL(file));
    }
    setError("");
  };

  // Register new user
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password, confirmPassword, bio, role, avatar } =
      formData;

    if (!username || !email || !password || !confirmPassword) {
      return setError("Please fill all required fields.");
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return setError("Invalid email format.");
    }
    if (password.length < 8) {
      return setError("Password must be at least 8 characters long.");
    }
    if (password !== confirmPassword) {
      return setError("Passwords do not match.");
    }

    try {
      setLoadingSubmit(true);
      const fd = new FormData();
      fd.append("username", username);
      fd.append("email", email);
      fd.append("password", password);
      fd.append("bio", bio);
      fd.append("role", role);
      if (avatar) fd.append("avatar", avatar);

      const res = await axiosInstance.post("/api/auth/register", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSuccessMsg(res?.data?.message || "User registered successfully.");
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        bio: "",
        role: "customer",
        avatar: null,
      });
      setAvatarPreview(null);
      fetchUsers();
    } catch (err) {
      setError(err?.response?.data?.message || "Registration failed.");
    } finally {
      setLoadingSubmit(false);
    }
  };

  // Change role
  const handleRoleChange = async (userId, value) => {
    const isAdminValue = value === "admin";

    try {
      await axiosInstance.put(`/api/users/${userId}`, {
        isAdmin: isAdminValue,
      });

      setUsers((prev) =>
        prev.map((u) =>
          u._id === userId ? { ...u, isAdmin: isAdminValue } : u
        )
      );

      setSuccessMsg("Role Updated");
    } catch (err) {
      setError("Failed to update role.");
    }
  };

  // Delete user
  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axiosInstance.delete(`/api/users/${userId}`);
      setUsers((prev) => prev.filter((u) => u._id !== userId));
      setSuccessMsg("User deleted successfully.");
    } catch {
      setError("Failed to delete user.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto md:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
        <h2 className="text-2xl font-bold text-[#0c363c]">User Management</h2>
        <span className="text-sm text-gray-600">
          Manage users — create, update, delete
        </span>
      </div>

      {/* Form */}
      <div className="p-6 mb-6 rounded-lg bg-white shadow border border-gray-100">
        <h3 className="text-lg font-semibold mb-4 text-[#0c363c] flex items-center gap-2">
          <FaUserPlus /> Add New User
        </h3>
        {error && (
          <div className="mb-4 text-red-700 bg-red-50 p-3 rounded">{error}</div>
        )}
        {successMsg && (
          <div className="mb-4 text-green-800 bg-green-50 p-3 rounded">
            {successMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Inputs */}
            {[
              { label: "Username", name: "username", type: "text" },
              { label: "Email", name: "email", type: "email" },
              { label: "Password", name: "password", type: "password" },
              {
                label: "Confirm Password",
                name: "confirmPassword",
                type: "password",
              },
              { label: "Bio", name: "bio", type: "text" },
            ].map((f) => (
              <div key={f.name}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {f.label}
                </label>
                <input
                  type={f.type}
                  name={f.name}
                  value={formData[f.name]}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0c363c]"
                />
              </div>
            ))}

            {/* Avatar */}
            <div className="md:col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload Avatar
              </label>
              <div className="w-full flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-4 cursor-pointer hover:bg-gray-50 transition">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                  id="avatarUpload"
                />
                <label
                  htmlFor="avatarUpload"
                  className="w-full text-center text-gray-600 font-medium"
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
          </div>

          <div className="mt-4">
            <button
              type="submit"
              disabled={loadingSubmit}
              className={`bg-[#0c363c] text-white py-2 px-4 rounded hover:opacity-90 transition ${
                loadingSubmit && "opacity-70 cursor-wait"
              }`}
            >
              {loadingSubmit ? "Creating..." : "Add User"}
            </button>
          </div>
        </form>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto shadow border border-gray-100 rounded-lg bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-100 text-gray-700 uppercase">
            <tr>
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">User</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loadingUsers ? (
              <tr>
                <td colSpan={5} className="p-6 text-center">
                  Loading users...
                </td>
              </tr>
            ) : users.length > 0 ? (
              users.map((user, idx) => (
                <tr
                  key={user._id}
                  className={`${idx % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                >
                  <td className="p-4">{idx + 1}</td>
                  <td className="p-4 flex items-center gap-3">
                    <img
                      src={user.avatar || defaultAvatar}
                      alt={user.username}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <span>{user.username}</span>
                  </td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4">
                    <select
                      value={user.isAdmin ? "admin" : "customer"}
                      onChange={(e) =>
                        handleRoleChange(user._id, e.target.value)
                      }
                      className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0c363c]"
                    >
                      <option value="customer">Customer</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-full transition"
                    >
                      <FaTrash size={16} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-6 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
