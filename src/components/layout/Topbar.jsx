import { TbBrandMeta } from "react-icons/tb";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";

const Topbar = () => {
  return (
    <div className="bg-[#0c363c] text-white text-sm ">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 md:px-6 py-2">
        {/* Left - Social Icons */}
        <div className="hidden md:flex items-center gap-3">
          <a href="#" className="hover:text-green-200 transition-colors">
            <TbBrandMeta className="w-5 h-5" />
          </a>
          <a href="#" className="hover:text-green-200 transition-colors">
            <IoLogoInstagram className="w-5 h-5" />
          </a>
          <a href="#" className="hover:text-green-200 transition-colors">
            <RiTwitterXLine className="w-4 h-4" />
          </a>
        </div>

        {/* Center - Message */}
        <div className="flex-grow text-center">
          <span>We ship worldwide — Fast and reliable shipping!</span>
        </div>

        {/* Right - Phone */}
        <div className="hidden md:block">
          <a href="tel:+923206001270" className="hover:text-green-200 transition-colors px-4 md:px-6">
            +92 (320) 600 1270
          </a>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
