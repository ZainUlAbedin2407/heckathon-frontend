import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";
import { TbBrandMeta } from "react-icons/tb";
import { FiPhoneCall } from "react-icons/fi";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#0c363c] text-white px-4 py-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4 lg:px-0">
        {/* Newsletter */}
        <div>
          <h3 className="text-lg mb-4">Newsletter</h3>
          <p className="text-sm text-gray-300 mb-4">
            Be the first to hear about new products, exclusive events, and
            online offers.
          </p>
          <p className="font-medium text-sm text-gray-300 mb-6">
            Sign up and get 10% off on your first order.
          </p>

          {/* Newsletter form */}
          <form className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-3 w-full text-sm  bg-white placeholder-gray-600 border-none rounded-l-md  text-black focus:outline-none focus:ring-2 focus:ring-[#0c363c]"
            />
            <button
              type="submit"
              className="bg-[#092c31] cursor-pointer shadow-md text-white px-6 py-3 text-sm rounded-r-md transition-all"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Shop Links */}
        <div>
          <h3 className="text-lg mb-4">Shop</h3>
          <ul className="space-y-2 text-gray-300">
            <li>
              <Link to="#" className="hover:text-green-200 transition-colors">
                Men's Top Wear
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-green-200 transition-colors">
                Women's Top Wear
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-green-200 transition-colors">
                Men's Bottom Wear
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-green-200 transition-colors">
                Women's Bottom Wear
              </Link>
            </li>
          </ul>
        </div>

        {/* Support Links */}
        <div>
          <h3 className="text-lg mb-4">Support</h3>
          <ul className="space-y-2 text-gray-300">
            <li>
              <Link to="#" className="hover:text-green-200 transition-colors">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-green-200 transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-green-200 transition-colors">
                FAQs
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-green-200 transition-colors">
                Features
              </Link>
            </li>
          </ul>
        </div>

        {/* Follow Us */}
        <div>
          <h3 className="text-lg mb-4">Follow Us</h3>
          <div className="flex items-center space-x-4 mb-6">
            <a href="#" className="hover:text-green-200 transition-colors">
              <TbBrandMeta className="h-5 w-5" />
            </a>
            <a href="#" className="hover:text-green-200 transition-colors">
              <IoLogoInstagram className="h-5 w-5" />
            </a>
            <a href="#" className="hover:text-green-200 transition-colors">
              <RiTwitterXLine className="h-4 w-4" />
            </a>
          </div>
          <p className="text-gray-300">Call Us</p>
          <p className="text-sm">
            <FiPhoneCall className="inline-block mr-2" />
            +92 (320) 600 1270
          </p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="container mx-auto mt-12 px-4 lg:px-0 border-t border-gray-700 pt-6">
        <p className="text-gray-400 text-sm tracking-tighter text-center">
          © 2025, CompileTab. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
