import { Link } from "react-router-dom";
import { HiBars3BottomRight, HiOutlineUser } from "react-icons/hi2";
import { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import SearchBar from "./SearchBar";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);
  // const [user, setUser] = useState(null);
  const user = useSelector((state) => state.auth.user); 

  const toggleNavDrawer = () => {
    setNavDrawerOpen(!navDrawerOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setNavDrawerOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // useEffect(() => {
  //   const storedUser = localStorage.getItem("user");
  //   if (storedUser) {
  //     setUser(JSON.parse(storedUser));
  //   }
  // }, []);
  return (
    <>
      <nav className="container max-w-screen-xl  mx-auto flex items-center justify-between py-5 px-4 md:px-6">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-semibold tracking-wide text-[#0c363c]"
        >
          Tech Ture
        </Link>

        {/* Center Navigation */}
        <div className="hidden md:flex space-x-6">
          <Link
            to="/"
            className="text-[#0c363c] hover:text-[#092c31] text-sm font-medium uppercase"
          >
            Home
          </Link>
          <Link
            to="#"
            className="text-[#0c363c] hover:text-[#092c31] text-sm font-medium uppercase"
          >
            About
          </Link>
          <Link
            to="#"
            className="text-[#0c363c] hover:text-[#092c31] text-sm font-medium uppercase"
          >
            Shop
          </Link>
          <Link
            to="#"
            className="text-[#0c363c] hover:text-[#092c31] text-sm font-medium uppercase"
          >
            Contact
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="block=">
            <SearchBar />
          </div>
          {/* Profile */}
          <Link to="/profile" className="text-black">
            {user && user.avatar ? (
              <img
                src={user.avatar}
                alt="User Avatar"
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <HiOutlineUser className="h-6 w-6 text-gray-700" />
            )}
          </Link>

          {/* Login/Register Buttons */}
          <div className="hidden md:flex space-x-3">
            {!user && (
              <>
                <Link
                  to="/login"
                  className="px-4 py-1.5 border border-[#0c363c] text-[#0c363c] rounded hover:bg-[#0c363c] hover:text-white text-sm transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-1.5 bg-[#0c363c] text-white rounded hover:bg-[#092c31] text-sm transition"
                >
                  Register
                </Link>
              </>
            )}
            {user?.isAdmin && (
              <Link
                to="/admin"
                className="px-4 py-1.5 border border-[#0c363c] text-[#0c363c] rounded hover:bg-[#0c363c] hover:text-white text-sm transition"
              >
                Admin
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={toggleNavDrawer}>
            <HiBars3BottomRight className="h-6 w-6 text-[#0c363c] cursor-pointer" />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          navDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleNavDrawer}>
            <IoMdClose className="h-6 w-6 text-[#0c363c] cursor-pointer" />
          </button>
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4 text-[#0c363c]">Menu</h2>
          <nav className="space-y-4">
            <Link
              to="/"
              onClick={toggleNavDrawer}
              className="block text-[#0c363c] hover:text-[#092c31]"
            >
              Home
            </Link>
            <Link
              to="#"
              onClick={toggleNavDrawer}
              className="block text-[#0c363c] hover:text-[#092c31]"
            >
              Women
            </Link>
            <Link
              to="#"
              onClick={toggleNavDrawer}
              className="block text-[#0c363c] hover:text-[#092c31]"
            >
              Top Wear
            </Link>
            <Link
              to="#"
              onClick={toggleNavDrawer}
              className="block text-[#0c363c] hover:text-[#092c31]"
            >
              Bottom Wear
            </Link>
            {!user && (
              <>
                <Link
                  to="/login"
                  onClick={toggleNavDrawer}
                  className="block border  border-[#0c363c] text-[#0c363c] rounded hover:bg-[#0c363c]  px-3 py-1 hover:text-white transition text-sm max-w-max"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={toggleNavDrawer}
                  className="block bg-[#0c363c] text-white rounded hover:bg-[#092c31] px-3 py-1 max-w-max transition text-sm"
                >
                  Register
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
