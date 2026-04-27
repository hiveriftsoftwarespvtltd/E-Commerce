import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import BASE from "../config";
import { useAuth } from "@/context/UserContext";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const {loggedInUser} = useAuth()

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null); // { type: "success" | "error", message: "" }

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(timer);
  }, [toast]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!form.email.trim() || !form.password.trim()) {
    setToast({
      type: "error",
      message: "Please enter both email and password",
    });
    return;
  }

  console.log("Sending.............:", form.email, form.password);

  setLoading(true);

  try {
    const response = await fetch(`${BASE.PRODUCT_BASE}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userEmail: form.email,       // 👈 SAME AS REGISTER
        userPassword: form.password, // 👈 SAME AS REGISTER
      }),
    });

    const data = await response.json();
    
    if (response.ok && data.statusCode === 200) {
      const { access_token } = data.data;
      const { id, email, role } = data.data.user;
      loggedInUser(data.data.user,data.data.access_token)
      localStorage.setItem("user",JSON.stringify(data.data.user))
      localStorage.setItem("token", access_token);
      // localStorage.setItem("access_token", access_token);
      // localStorage.setItem("userId", id);
      // localStorage.setItem("userEmail", email);
      // localStorage.setItem("userRole", role);
      // localStorage.setItem("isLoggedIn", "true");

      setToast({
        type: "success",
        message: "Login Successful! Redirecting...",
      });

      setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 1200);
    } 
    else if (data.statusCode === 401 || data.error === "Unauthorized") {
      setToast({
        type: "error",
        message: data.message || "Invalid credentials",
      });

      setForm((prev) => ({ ...prev, password: "" }));
    } 
    else {
      setToast({
        type: "error",
        message: data.message || "Something went wrong. Try again.",
      });
    }
  } catch (err) {
    console.error("Login failed:", err);
    setToast({ type: "error", message: "Something went wrong!" });
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-light-accent-1 px-4 py-12">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed top-6 right-6 z-50 px-6 py-4 rounded-xl shadow-2xl text-white font-semibold text-lg animate-bounce
            ${toast.type === "success" ? "bg-green-600" : "bg-red-600"}`}
        >
          {toast.message}
        </div>
      )}

      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
          <p className="text-gray-600 mt-2">Log in to continue shopping</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-accent focus:ring-4 focus:ring-light-accent-1 outline-none transition-all"
              placeholder="you@example.com"
              autoComplete="email"
              required
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:accent focus:ring-accent focus:bg-light-accent-3 outline-none transition-all pr-12"
              placeholder="Enter your password"
              autoComplete="current-password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-11 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 bg-accent hover:bg-bold-accent-1  rounded-lg text-white font-bold text-lg transition-all transform duration-200
              ${
                loading
                  ? "cursor-not-allowed"
                  : "active:scale-98 shadow-xl hover:shadow-2xl"
              } flex items-center justify-center gap-3`}
          >
            {loading ? (
              <>
                <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                Logging in...
              </>
            ) : (
              "Log In"
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-bold text-accent hover:text-bold-accent-1 underline underline-offset-4"
            >
              Sign up here
            </Link>
          </p>
        </div>

        {/* Optional: Forgot Password */}
        <div className="text-center mt-4">
          <Link
            to="/forgot-password"
            className="text-sm text-accent hover:underline"
          >
            Forgot your password?
          </Link>
        </div>
      </div>
    </div>
  );
}
