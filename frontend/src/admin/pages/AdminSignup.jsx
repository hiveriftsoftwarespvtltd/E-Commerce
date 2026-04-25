import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BASE from "../../config";

export default function AdminSignup() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirm: "",
  });

  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirm) {
      setToast({ type: "error", message: "Passwords do not match" });
      return;
    }

    try {
      const res = await fetch(`${BASE.PRODUCT_BASE}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userEmail: form.email,
          userPassword: form.password
        
        }),
      });

      const data = await res.json();

      if (res.ok && data.statusCode === 201) {
        setToast({ type: "success", message: "Admin Created Successfully!" });

        setTimeout(() => {
          navigate("/admin/login");
        }, 1200);

        setForm({ email: "", password: "", confirm: "" });
      } else {
        setToast({ type: "error", message: data.message });
      }
    } catch (error) {
      setToast({ type: "error", message: "Server error" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {toast && (
        <div
          className={`fixed top-4 right-4 px-5 py-3 text-white rounded-lg shadow-md ${
            toast.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {toast.message}
        </div>
      )}

      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Admin Signup
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg"
              placeholder="admin@example.com"
            />
          </div>

          <div className="relative">
            <label>Password</label>
            <input
              type={showPass ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-9"
            >
              {showPass ? <EyeOff /> : <Eye />}
            </button>
          </div>

          <div className="relative">
            <label>Confirm Password</label>
            <input
              type={showConfirm ? "text" : "password"}
              name="confirm"
              value={form.confirm}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg pr-12"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-9"
              
            >
              {showConfirm ? <EyeOff /> : <Eye />}
            </button>
          </div>

          <button
           style={{ backgroundColor: "var(--color-teal-500)" }}
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
          >
            Create Admin
          </button>
        </form>
      </div>
    </div>
  );
}
