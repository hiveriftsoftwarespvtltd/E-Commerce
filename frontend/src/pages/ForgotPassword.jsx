import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "@/utils/axios-interceptor";
import { toast } from "react-toastify";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      return setError("Email is required");
    }

    try {
      setLoading(true);
      setError("");

      const response = await api.post("/auth/forgot-password", { email });
      if(response.data.success){
        setSuccess(true);
      setEmail("");
    }else{
        toast.error(response.data.message)
    }

      
    } catch (err) {
        toast.error("Internal Server Error")
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Success View (hide form)
  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 text-center">
          <h2 className="text-2xl font-bold mb-4 text-green-600">
            Check Your Email
          </h2>

          <p className="text-gray-600 mb-6">
            We’ve sent a password reset link to your email. Please check your
            inbox and follow the instructions.
          </p>

          <button
            onClick={() => navigate("/login")}
            className="w-full bg-accent text-white py-2 rounded-lg hover:bg-accent-700 transition"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-4">
          Forgot Password
        </h2>

        <p className="text-sm text-gray-600 text-center mb-4">
          Enter your email and we’ll send you a reset link.
        </p>

        {error && (
          <div className="bg-red-100 text-red-600 p-2 rounded mb-3 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="Enter your email"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent text-white py-2 rounded-lg hover:bg-accent-700 transition disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
}
