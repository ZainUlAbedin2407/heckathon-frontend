import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-800 px-4">
      <h1 className="text-[120px] font-extrabold text-[#0c363c] leading-none">404</h1>
      <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-center">Page Not Found</h2>
      <p className="text-gray-600 text-center mb-6 max-w-md">
        Oops! The page you are looking for does not exist or has been moved.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 bg-[#0c363c] hover:bg-[#105358] text-white px-5 py-2.5 rounded-full transition duration-200"
      >
        <BsArrowLeft size={18} /> Go back home
      </Link>
    </div>
  );
}
