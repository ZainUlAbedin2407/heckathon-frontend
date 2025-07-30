import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState(new Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  // Get email from localStorage on component mount
  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (!storedEmail) {
      toast.error("Email not found. Please register again.");
      navigate("/register"); 
    } else {
      setEmail(storedEmail);
    }
  }, [navigate]);

  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto focus next 
    
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalCode = code.join("");

    if (finalCode.length !== 6) {
      return toast.error("Enter full 6-digit code");
    }

    try {
      setLoading(true);
      const { data } = await axiosInstance.post("/api/verify/", {
        email,
        code: finalCode,
      });

      toast.success(data.message);
      localStorage.removeItem("email"); // Clean up after success
      navigate("/login");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    try {
      setResendLoading(true);
      const { data } = await axiosInstance.post("/api/verify/resend", {
        email,
      });
      toast.success(data.message);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to resend code");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-screen md:m-10 md:rounded bg-[#0C363C] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-2 text-[#0C363C]">
          Verify Your Email
        </h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          Enter the 6-digit code sent to <span className="font-semibold">{email}</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-center gap-2">
            {code.map((digit, index) => (
              <input
                key={index}
                id={`code-${index}`}
                type="text"
                maxLength="1"
                className="w-10 h-12 text-center border rounded-md focus:outline-none text-lg border-gray-300"
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0C363C] hover:bg-[#092b2f] text-white py-2 rounded-lg font-medium transition duration-200"
          >
            {loading ? "Verifying..." : "Verify Email"}
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Didn’t get the code?{" "}
            <button
              onClick={handleResendCode}
              className="text-[#0C363C] font-medium hover:underline"
              disabled={resendLoading}
            >
              {resendLoading ? "Resending..." : "Resend Code"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
