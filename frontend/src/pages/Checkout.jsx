import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import fallbackImage from "../assets/accessories.png";
import { useAuth } from "@/context/UserContext";
import { api } from "@/utils/axios-interceptor";
import BASE from "../config/";

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    country: "India",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    pin: "",
    phone: "",
    paymentMethod: "cod",
  });

  const [errors, setErrors] = useState({});

  // ✅ EMPTY CART
  if (!cart.length) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 text-center">
        <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
        <p className="text-gray-600 mb-6">
          Looks like you haven’t added anything yet.
        </p>

        <button
          onClick={() => navigate("/products")}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Browse Products
        </button>
      </div>
    );
  }

  // ✅ VALIDATION
  const validateForm = () => {
    let newErrors = {};

    if (!form.email) newErrors.email = "Email required";
    if (!form.firstName) newErrors.firstName = "First name required";
    if (!form.lastName) newErrors.lastName = "Last name required";
    if (!form.address) newErrors.address = "Address required";
    if (!form.city) newErrors.city = "City required";

    if (!form.pin || form.pin.length !== 6)
      newErrors.pin = "Valid PIN required";

    if (!form.phone || form.phone.length !== 10)
      newErrors.phone = "Valid phone required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ PRICE CALC
  const subtotal = cart.reduce(
    (sum, item) => sum + (item.salesPrice || item.price) * item.quantity,
    0
  );

  const total = subtotal;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ MAIN FLOW (same logic)
  const handlePayNow = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      const formattedItems = cart.map((item) => ({
        productId: item._id,
        productName: item.title,
        quantity: item.quantity,
        price: item.price,
      }));

      const orderPayload = {
        userId: user.id,
        items: formattedItems,
        totalAmount: total,
        paymentMethod: "COD",
        shippingAddress: {
          street: form.address,
          city: form.city,
          state: form.state,
          zipCode: form.pin,
          country: form.country,
        },
        phone: form.phone,
        email: form.email,
      };

      const res = await fetch(`${BASE.PRODUCT_BASE}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error();

      clearCart();

      navigate("/order-success", {
        state: { orderData: data.result },
      });
    } catch (err) {
      alert("Checkout failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-4 px-2 sm:px-4 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* LEFT - FORM */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Checkout</h2>

          {/* EMAIL */}
          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="input"
          />
          {errors.email && <p className="error">{errors.email}</p>}

          {/* NAME */}
          <div className="grid sm:grid-cols-2 gap-3 mt-2">
            <input
              name="firstName"
              placeholder="First Name"
              value={form.firstName}
              onChange={handleChange}
              className="input"
            />
            <input
              name="lastName"
              placeholder="Last Name"
              value={form.lastName}
              onChange={handleChange}
              className="input"
            />
          </div>

          {/* ADDRESS */}
          <input
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            className="input mt-2"
          />

          <input
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            className="input mt-2"
          />

          <div className="grid sm:grid-cols-2 gap-3 mt-2">
            <input
              name="pin"
              placeholder="PIN"
              value={form.pin}
              onChange={handleChange}
              className="input"
            />
            <input
              name="phone"
              placeholder="Phone"
              value={form.phone}
              onChange={handleChange}
              className="input"
            />
          </div>

          {/* PAYMENT */}
          <div className="mt-4 flex gap-4">
            <label className="flex gap-2 items-center">
              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                checked
                readOnly
              />
              COD
            </label>
          </div>

          {/* BUTTON */}
          <button
            onClick={handlePayNow}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 mt-6 rounded-lg hover:bg-blue-700"
          >
            {loading ? "Processing..." : "Place Order"}
          </button>
        </div>

        {/* RIGHT - SUMMARY */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow h-fit">
          <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

          {cart.map((item) => (
            <div key={item._id} className="flex gap-3 mb-4 items-center">
              <img
                src={item.image || fallbackImage}
                className="w-14 h-14 rounded-md object-cover"
              />

              <div className="flex-1">
                <p className="text-sm font-medium">{item.title}</p>
                <p className="text-xs text-gray-500">
                  ₹{item.price} × {item.quantity}
                </p>
              </div>

              <p className="font-semibold">
                ₹{item.price * item.quantity}
              </p>
            </div>
          ))}

          <div className="border-t pt-4 flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
        </div>
      </div>

      {/* 🔥 Tailwind helpers */}
      <style>
        {`
          .input {
            width: 100%;
            padding: 12px;
            border: 1px solid #ddd;
            border-radius: 8px;
            outline: none;
          }
          .input:focus {
            border-color: #2563eb;
            box-shadow: 0 0 0 2px rgba(37,99,235,0.2);
          }
          .error {
            color: red;
            font-size: 12px;
          }
        `}
      </style>
    </div>
  );
}