import { useState } from "react";
import { MdDelete, MdLockReset } from "react-icons/md";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, setUser } from "../redux/slices/authSlice";
import useApi from "../hooks/useApi";

const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  console.log(user);

  const [bio, setBio] = useState(user?.bio || "");
  const [editing, setEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // API hook
  const { callApi, loading } = useApi();

  const handleLogout = () => {
    dispatch(clearUser());
    toast.success("User logged out successfully");
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  const handleUpdateBio = async () => {
    const res = await callApi("put", `/api/users/${user._id}`, { bio });
    if (res?.data) {
      dispatch(setUser({ ...user, bio: res.data.bio }));
      toast.success("Bio updated successfully!");
      setEditing(false);
    }
  };

  const handleDelete = async () => {
    const res = await callApi("delete", `/api/users/${user._id}`);
    if (res) {
      toast.success("Account deleted successfully.");
      dispatch(clearUser());
      setTimeout(() => {
        navigate("/register");
      }, 1500);
    }
  };

  const handleChangePassword = async () => {
    const res = await callApi("patch", `/api/users/change-password`, {
      currentPassword,
      newPassword,
    });

    if (res) {
      toast.success("Password changed successfully.");
      setShowPasswordModal(false);
      setCurrentPassword("");
      setNewPassword("");
    }
  };

  return (
    <div className="py-10 px-4 bg-gray-50 min-h-screen">
      <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md p-6">
        {/* Profile header */}
        <div className="flex flex-col items-center space-y-2">
          <img
            src={user.avatar || "./profile-icon.jpg"}
            alt="User"
            className="w-24 h-24 rounded-full border-2 border-[#0c363c]"
          />
          <h2 className="text-xl font-bold text-[#0c363c]">My Profile</h2>
        </div>

        {/* Info */}
        <div className="mt-6 space-y-4">
          <div>
            <label className="text-gray-600">Username</label>
            <p className="text-[#0c363c] font-semibold">{user.username}</p>
          </div>

          <div>
            <label className="text-gray-600">Email</label>
            <p className="text-[#0c363c] font-semibold">{user.email}</p>
          </div>

          <div>
            <label className="text-gray-600">Bio</label>
            {editing ? (
              <textarea
                className="w-full border rounded px-3 py-2 mt-1"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            ) : (
              <p className="text-[#0c363c]">{bio || "No bio added."}</p>
            )}
          </div>

          <div className="flex gap-3">
            <button
              className="bg-[#0c363c] hover:bg-[#094244] text-white px-4 py-2 rounded cursor-pointer disabled:opacity-50"
              onClick={() => {
                if (editing) {
                  handleUpdateBio();
                } else {
                  setEditing(true);
                }
              }}
              disabled={loading}
            >
              {loading ? "Saving..." : editing ? "Save Bio" : "Edit Bio"}
            </button>

            <button
              onClick={handleLogout}
              className="bg-gray-200 text-[#0c363c] hover:bg-gray-300 px-4 py-2 rounded cursor-pointer"
            >
              Logout
            </button>
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center pt-4 border-t">
            <button
              className="flex items-center gap-0.5 cursor-pointer text-blue-600 text-sm hover:underline"
              onClick={() => setShowPasswordModal(true)}
            >
              <MdLockReset /> Change Password
            </button>

            <button
              className="flex items-center text-red-600 cursor-pointer text-sm hover:underline"
              onClick={() => setShowDeleteModal(true)}
            >
              <MdDelete /> Delete Account
            </button>
          </div>
        </div>
      </div>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50 p-5">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm">
            <h3 className="text-lg font-semibold mb-4 text-[#0c363c]">
              Change Password
            </h3>
            <input
              type="password"
              placeholder="Current Password"
              className="w-full border px-3 py-2 rounded mb-3"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="New Password"
              className="w-full border px-3 py-2 rounded mb-4"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowPasswordModal(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={handleChangePassword}
                className="px-4 py-2 bg-[#0c363c] text-white rounded hover:bg-[#094244] cursor-pointer disabled:opacity-50"
                disabled={loading}
              >
                {loading ? "Updating..." : "Update"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 p-5 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm">
            <h3 className="text-lg font-semibold mb-4 text-red-600">
              Confirm Account Deletion
            </h3>
            <p className="mb-4 text-sm text-gray-600">
              This action cannot be undone. Are you sure you want to delete your
              account?
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer disabled:opacity-50"
                disabled={loading}
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
