import {
  FaBoxOpen,
  FaClipboardList,
  FaClosedCaptioning,
  FaCross,
  FaHome,
  FaSignOutAlt,
  FaStore,
  FaUser,
} from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { Link, NavLink, useNavigate } from "react-router-dom";

const AdminSidebar = ({ toggleSideBar }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between">
        <Link to="/admin" className="text-2xl font-medium">
          Tech Ture
        </Link>
        <button
          onClick={toggleSideBar}
          className="md:hidden text-2xl font-bold z-20"
        >
          <MdClose />
        </button>
      </div>
      <h2 className="text-xl font-medium mb-6 text-center">Admin Dashboard</h2>
      <nav className="flex flex-col space-y-2">
        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            isActive
              ? "bg-[#10444d] text-white py-3 px-4 rounded flex items-center space-x-2"
              : "text-gray-300 hover:bg-[#10444d] hover:text-white py-3 px-4 rounded flex items-center space-x-2"
          }
        >
          <FaUser />
          <span>Users</span>
        </NavLink>
        {/* <NavLink
          to="/admin/products"
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2"
              : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"
          }
        >
          <FaBoxOpen />
          <span>Products</span>
        </NavLink> */}
        {/* <NavLink
          to="/admin/orders"
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2"
              : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"
          }
        >
          <FaClipboardList />
          <span>Orders</span>
        </NavLink> */}
        {/* <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2"
              : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"
          }
        >
          <FaStore />
          <span>Shop</span>
        </NavLink> */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "bg-[#10444d] text-white py-3 px-4 rounded flex items-center space-x-2"
              : "text-gray-300 hover:bg-[#10444d] m hover:text-white py-3 px-4 rounded flex items-center space-x-2"
          }
        >
          <FaHome />
          <span>Home</span>
        </NavLink>
      </nav>
      <button
        onClick={handleLogout}
        className="cursor-pointer w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded flex items-center justify-center space-x-2 mt-2"
      >
        <FaSignOutAlt />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default AdminSidebar;
