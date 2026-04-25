import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import BASE from "../config/";
// import fallbackImage from "../assets/jars.png";
import fallbackImage from "../assets/accessories.png";
export default function Checkout() {
  const navigate = useNavigate();
  const { cart } = useCart();

  const [form, setForm] = useState({
    email: "",
    country: "India",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    state: "Delhi",
    pin: "",
    phone: "",
    saveInfo: false,
    paymentMethod: "razorpay",
  });

  const [errors, setErrors] = useState({});

  // ⭐ FORM VALIDATION
  const validateForm = () => {
    let newErrors = {};

    if (!form.email.trim()) newErrors.email = "Email is required";
    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!form.address.trim()) newErrors.address = "Address is required";
    if (!form.city.trim()) newErrors.city = "City is required";

    if (!form.pin.trim()) newErrors.pin = "PIN is required";
    else if (form.pin.length !== 6) newErrors.pin = "PIN must be 6 digits";

    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    else if (form.phone.length !== 10)
      newErrors.phone = "Phone must be 10 digits";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ⭐ PRICE CALCULATION
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const shipping = 0;
  const tax = 0;
  const total = subtotal + shipping + tax;

  // HANDLE INPUT
  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm({ ...form, [e.target.name]: value });
  };

  // ⭐ PAY NOW HANDLER
  const handlePayNow = async (e) => {
    e.preventDefault();
    console.log("Razorpay Key:", import.meta.env.VITE_RAZORPAY_KEY_ID);

    if (!validateForm()) return;

    // ⭐ 1. Format Cart Items
    const formattedItems = cart.map((item) => ({
      productName: item.title,
      productImage: item.image,
      sku: item.sku || "N/A",
      quantity: item.quantity,
      price: item.price,
    }));

    // ⭐ 2. Order Payload

    const userId = localStorage.getItem("userId") || "000000000000000000000000";

    const orderPayload = {
      userId,

      items: formattedItems,

      subtotal: subtotal, // number
      shipping: shipping, // number
      tax: tax, // number
      totalAmount: total, // number

      paymentMethod: form.paymentMethod === "razorpay" ? "Credit Card" : "COD",

      shippingAddress: {
        street: form.address,
        city: form.city,
        state: form.state,
        zipCode: form.pin,
        country: form.country,
      },

      userLongitude: "0",
      userLatitude: "0",
    };

    try {
      // ⭐ 3. Create Order API
      const res = await fetch(`${BASE.PRODUCT_BASE}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });
      console.log("STATUS............:", res.status);
      // If backend responded with no JSON (OPTIONS case)
      let data = {};
      try {
        data = await res.json();
      } catch (e) {
        console.warn("No JSON returned from server", e);
      }

      console.log("RAW RESPONSE:", data);
      console.log("Backend error message:", data.message);

      // Check actual success response
      if (!res.ok || !data.result) {
        throw new Error("Order creation failed");
      }

      const backendOrder = data.result;

      // ⭐ 4. Prepare Order Success Data to Send to Success Page
      const orderData = {
        orderId: backendOrder._id,
        orderNumber: backendOrder.orderNumber,
        subtotal: backendOrder.subtotal,
        total: backendOrder.totalAmount,
        paymentMethod: backendOrder.paymentMethod,
        shippingMethod: "Free Shipping",
        items: backendOrder.items, // ⭐ Backend से सही items आ रहे हैं
        name: form.firstName + " " + form.lastName,
        email: form.email,
        phone: form.phone,
        address: form.address,
        city: form.city,
        state: form.state,
        pincode: form.pin,
      };

      // ⭐ 5. COD FLOW
      if (form.paymentMethod === "cod") {
        await fetch(`${BASE.PRODUCT_BASE}/orders/confirm-payment`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            orderId: backendOrder.orderId,
            paymentId: "COD_PAYMENT",
            signature: "COD_SIGNATURE",
          }),
        });

        // ⭐ Redirect with order data
        navigate("/order-success", {
          state: { orderData },
        });

        return;
      }

      // ⭐ 6. Razorpay Payment Flow
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: backendOrder.totalAmount * 100,
        currency: "INR",
        name: "My Store",
        description: "Payment",

        prefill: {
          name: `${form.firstName} ${form.lastName}`,
          email: form.email,
          contact: form.phone,
        },

        handler: async function (response) {
          await fetch(`${BASE.PRODUCT_BASE}/orders/confirm-payment`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              orderId: backendOrder.orderId,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
            }),
          });

          // ⭐ Redirect to Success Page with details
          navigate("/order-success", {
            state: { orderData },
          });
        },
      };

      if (!window.Razorpay) {
        alert("Razorpay SDK failed to load.");
        return;
      }

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      alert("Payment Error: " + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2">
        {/* LEFT FORM SECTION */}
        <div className="px-6 py-8 lg:px-16 lg:py-12 border-r">
          <div className="mb-8">
            <div className="flex justify-between mb-3">
              <h2 className="text-lg font-semibold">Contact</h2>
              {/* <Link to="/signup" className="text-sm text-blue-600">
                Sign in
              </Link> */}
            </div>

            <input
              type="text"
              name="email"
              placeholder="Email or mobile number"
              value={form.email}
              onChange={handleChange}
              className={`w-full border rounded px-3 py-2.5 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email}</p>
            )}
          </div>

          {/* FORM FIELDS */}
          <div className="mb-8">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  value={form.firstName}
                  onChange={handleChange}
                  className={`border px-3 py-2.5 rounded w-full ${
                    errors.firstName ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs">{errors.firstName}</p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  value={form.lastName}
                  onChange={handleChange}
                  className={`border px-3 py-2.5 rounded w-full ${
                    errors.lastName ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-xs">{errors.lastName}</p>
                )}
              </div>
            </div>

            {/* ADDRESS */}
            <div className="mb-4">
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={form.address}
                onChange={handleChange}
                className={`w-full border rounded px-3 py-2.5 ${
                  errors.address ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.address && (
                <p className="text-red-500 text-xs">{errors.address}</p>
              )}
            </div>

            {/* OPTIONAL */}
            <input
              type="text"
              name="apartment"
              placeholder="Apartment (optional)"
              value={form.apartment}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2.5 mb-4"
            />

            {/* CITY - STATE - PIN */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={form.city}
                onChange={handleChange}
                className={`border px-3 py-2.5 rounded ${
                  errors.city ? "border-red-500" : "border-gray-300"
                }`}
              />

              <select
                name="state"
                value={form.state}
                onChange={handleChange}
                className="border px-3 py-2.5 rounded"
              >
                <option>Delhi</option>
                <option>Mumbai</option>
                <option>UP</option>
                <option>Bihar</option>
                <option>Goa</option>
              </select>

              <div>
                <input
                  type="text"
                  name="pin"
                  maxLength={6}
                  placeholder="PIN"
                  value={form.pin}
                  onChange={(e) =>
                    setForm({ ...form, pin: e.target.value.replace(/\D/g, "") })
                  }
                  className={`border px-3 py-2.5 rounded w-full ${
                    errors.pin ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.pin && (
                  <p className="text-red-500 text-xs">{errors.pin}</p>
                )}
              </div>
            </div>

            {/* PHONE */}
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={form.phone}
              onChange={handleChange}
              className={`w-full border rounded px-3 py-2.5 ${
                errors.phone ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.phone && (
              <p className="text-red-500 text-xs">{errors.phone}</p>
            )}
          </div>

          {/* PAYMENT METHOD */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Payment</h2>

            <label className="flex items-center gap-2 p-3 border rounded bg-blue-50">
              <input
                type="radio"
                name="paymentMethod"
                value="razorpay"
                checked={form.paymentMethod === "razorpay"}
                onChange={handleChange}
              />
              Online Payment
            </label>

            <label className="flex items-center gap-2 p-3 border rounded mt-2">
              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                checked={form.paymentMethod === "cod"}
                onChange={handleChange}
              />
              Cash on Delivery
            </label>
          </div>

          {/* PAY NOW BUTTON */}
          <button
            onClick={handlePayNow}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            Pay now
          </button>
        </div>

        {/* RIGHT SIDE CART SUMMARY */}
        <div className="px-4 py-6 bg-gray-50 lg:px-12">
          {cart.map((item) => (
            <div key={item.id} className="flex gap-4 mb-6">
              <div className="relative">
                <img
                  src={
                    item.image && item.image.trim() !== ""
                      ? item.image
                      : fallbackImage
                  }
                  onError={(e) => (e.target.src = fallbackImage)}
                  className="w-16 h-16 rounded border"
                />

                <span className="absolute -top-2 -right-2 bg-red-600 text-white w-5 h-5 text-xs flex items-center justify-center rounded-full">
                  {item.quantity}
                </span>
              </div>

              <div className="flex-1">
                <h3 className="text-sm font-medium">{item.title}</h3>
              </div>

              <div className="text-sm font-medium">
                ₹{item.price * item.quantity}
              </div>
            </div>
          ))}

          {/* PRICE SUMMARY */}
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span>₹{shipping}</span>
            </div>

            <div className="flex justify-between">
              <span>Tax</span>
              <span>₹{tax}</span>
            </div>
          </div>

          <div className="mt-4 border-t pt-4 flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
