import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BASE from "../../config";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  if (toast) {
    setTimeout(() => setToast(null), 3000);
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email.trim() || !form.password.trim()) {
      setToast({ type: "error", message: "Email & Password required" });
      return;
    }

    setLoading(true);
    console.log("API URL:", `${BASE.PRODUCT_BASE}/auth/login`);

    try {
      const res = await fetch(`${BASE.PRODUCT_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userEmail: form.email,
          userPassword: form.password,
        }),
      });

      const data = await res.json();

      if (res.ok && data.statusCode === 200) {
        localStorage.setItem("adminToken", data.data.access_token);
        localStorage.setItem("adminRole", "admin");

        setToast({ type: "success", message: "Admin Login Successful!" });

        setTimeout(() => {
          navigate("/admin/");
        }, 1200);
      } else {
        setToast({
          type: "error",
          message: data.message || "Invalid credentials",
        });
      }
    } catch (error) {
      setToast({ type: "error", message: "Server error" });
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      {toast && (
        <div
          className={`fixed top-6 right-6 px-6 py-3 text-white rounded-lg shadow-lg ${
            toast.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {toast.message}
        </div>
      )}

      <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Admin Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-sm font-medium">Admin Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="admin@example.com"
              className="w-full mt-1 px-4 py-2.5 border rounded-lg"
            />
          </div>

          <div className="relative">
            <label className="text-sm font-medium">Password</label>

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full mt-1 px-4 py-2.5 border rounded-lg pr-12"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-10 text-gray-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

        <button
  type="submit"
  disabled={loading}
  style={{ backgroundColor: "var(--color-teal-500)" }}
  className={`w-full py-3 rounded-lg text-white font-semibold ${
    loading ? "cursor-not-allowed" : "hover:opacity-90"
  }`}
>
  {loading ? "Logging in..." : "Login"}
</button>

        </form>
      </div>
    </div>
  );
}
