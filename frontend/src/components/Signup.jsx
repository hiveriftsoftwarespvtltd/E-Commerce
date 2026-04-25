import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import BASE from "../config";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    confirm: "",
    acceptTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [toast, setToast] = useState(null); // { type: 'success'|'error', message: '' }

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(id);
  }, [toast]);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function validate(values) {
    const e = {};

    if (!values.email.trim()) e.email = "Email is required";
    else if (!emailRegex.test(values.email)) e.email = "Enter a valid email";

    if (!values.password) e.password = "Password is required";
    else if (values.password.length < 6) e.password = "Password must be at least 6 characters";

    if (!values.confirm) e.confirm = "Please confirm your password";
    else if (values.confirm !== values.password) e.confirm = "Passwords do not match";

    if (!values.acceptTerms) e.acceptTerms = "You must accept the terms and conditions";

    return e;
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear error when user starts typing
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setToast({ type: "error", message: "Please fix the errors below" });
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(`${BASE.PRODUCT_BASE}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail: form.email.trim().toLowerCase(),    // ← Lowercase bhej rahe hain (backend behavior)
          userPassword: form.password,                   // ← Plain password bhejo, backend hash karega
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Success → 201 Created
        setToast({ type: "success", message: "Account created successfully! Redirecting..." });

        // Reset form
        setForm({ email: "", password: "", confirm: "", acceptTerms: false });

        // Redirect to login after 1.5 sec
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        // Backend errors (duplicate email, etc.)
        const msg = data.message || "Registration failed. Try again.";
        setToast({ type: "error", message: msg });

        // Agar email already exists → specific field error dikhao
        if (data.message?.toLowerCase().includes("email") || data.message?.toLowerCase().includes("already")) {
          setErrors((prev) => ({ ...prev, email: "This email is already registered" }));
        }
      }
    } catch (err) {
      console.error("Registration error:", err);
      setToast({ type: "error", message: "Something went wrong!." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed top-5 right-5 z-50 px-6 py-3 rounded-lg shadow-xl text-white font-medium animate-pulse
            ${toast.type === "success" ? "bg-green-600" : "bg-red-600"}`}
        >
          {toast.message}
        </div>
      )}

      <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
          <p className="text-sm text-gray-600 mt-2">Join us today</p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 rounded-lg border ${
                errors.email ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-amber-400"
              } focus:outline-none focus:ring-2 transition`}
              placeholder="you@example.com"
              autoComplete="email"
            />
            {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type={showPass ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 rounded-lg border pr-12 ${
                errors.password ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-amber-400"
              } focus:outline-none focus:ring-2 transition`}
              placeholder="Minimum 6 characters"
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
            >
              {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <input
              type={showConfirm ? "text" : "password"}
              name="confirm"
              value={form.confirm}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 rounded-lg border pr-12 ${
                errors.confirm ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-amber-400"
              } focus:outline-none focus:ring-2 transition`}
              placeholder="Repeat password"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
            >
              {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            {errors.confirm && <p className="mt-1 text-xs text-red-600">{errors.confirm}</p>}
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="terms"
              name="acceptTerms"
              checked={form.acceptTerms}
              onChange={handleChange}
              className="w-4 h-4 text-amber-600 rounded focus:ring-amber-500"
            />
            <label htmlFor="terms" className="text-sm text-gray-700">
              I agree to the{" "}
              <Link to="/terms" className="text-amber-600 hover:underline font-medium">
                Terms & Conditions
              </Link>
            </label>
          </div>
          {errors.acceptTerms && <p className="text-xs text-red-600 -mt-2">{errors.acceptTerms}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className={`w-full py-3 rounded-lg text-white font-semibold transition-all ${
              submitting
                ? "bg-amber-400 cursor-not-allowed"
                : "bg-amber-500 hover:bg-amber-600 shadow-lg hover:shadow-xl"
            }`}
          >
            {submitting ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-amber-600 hover:underline">
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
}