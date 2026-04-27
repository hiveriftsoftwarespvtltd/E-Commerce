import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import BASE from "../config/";
import fallbackImage from "../assets/accessories.png";
import { useAuth } from "@/context/UserContext";
import { api } from "@/utils/axios-interceptor";

export default function Checkout() {
  const navigate = useNavigate();
  const { cart,clearCart } = useCart();

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
    paymentMethod: "razorpay",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const {user} = useAuth()
  // ✅ VALIDATION
  const validateForm = () => {
    let newErrors = {};

    if (!form.email.trim()) newErrors.email = "Email is required";
    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!form.address.trim()) newErrors.address = "Address is required";
    if (!form.city.trim()) newErrors.city = "City is required";

    if (!form.pin.trim()) newErrors.pin = "PIN is required";
    else if (form.pin.length !== 6) newErrors.pin = "PIN must be 6 digits";

    if (!form.phone.trim()) newErrors.phone = "Phone is required";
    else if (form.phone.length !== 10)
      newErrors.phone = "Phone must be 10 digits";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ PRICE
  const subtotal = cart.reduce(
    (sum, item) => sum + (item.salesPrices || item.price) * item.quantity,
    0
  );
  const shipping = 0;
  const tax = 0;
  const total = subtotal + shipping + tax;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ MAIN FLOW
  const handlePayNow = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      

      // 🔹 1. FORMAT ITEMS (FIXED)
      const formattedItems = cart.map((item) => ({
        productId: item._id || item.id,
        productName: item.title,
        productImage: item.image,
        sku: item.sku || "N/A",
        quantity: item.quantity,
        price: item.price,
      }));

      // 🔹 2. CREATE ORDER PAYLOAD
      const orderPayload = {
        userId:user.id,
        items: formattedItems,
        subtotal,
        shipping,
        tax,
        totalAmount: total,
        paymentMethod:
          form.paymentMethod === "razorpay" ? "RAZORPAY" : "COD",
        shippingAddress: {
          street: form.address,
          apartment: form.apartment,
          city: form.city,
          state: form.state,
          zipCode: form.pin,
          country: form.country,
        },
        phone:form.phone,
        email:form.email,
        userLongitude: "0",
        userLatitude: "0",
      };

      // 🔹 3. CREATE ORDER
      const orderRes = await fetch(`${BASE.PRODUCT_BASE}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });

      const orderData = await orderRes.json();
      if (!orderRes.ok) throw new Error("Order creation failed");

      const order = orderData.result;

      // 🟢 COD FLOW
      if (form.paymentMethod === "cod") {
        clearCart()
        navigate("/order-success", {
          state: { orderData: order },
        });
        return;
      }

      // 🔹 4. CREATE PAYMENT
      const paymentResponse = await api.post("/transaction/create-payment",{
        userId:user.id,
            orderId: order._id,
            paymentMethod: "RAZORPAY",
      })
      // const paymentRes = await fetch(
      //   `${BASE.PRODUCT_BASE}/transaction/create-payment`,
      //   {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify({
      //       userId:user.id,
      //       orderId: order._id,
      //       paymentMethod: "RAZORPAY",
      //     }),
      //   }
      // );

      // const paymentData = await paymentRes.json();
      // if (!paymentRes.ok) throw new Error("Payment init failed");

      const { razorpayOrder } = paymentResponse.data.result;

      const loadRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

      // 🔹 5. OPEN RAZORPAY
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: razorpayOrder.amount,
        currency: "INR",
        order_id: razorpayOrder.id,
        name: "My Store",

        prefill: {
          name: `${form.firstName} ${form.lastName}`,
          email: form.email,
          contact: form.phone,
        },

        handler: async function (response) {
          // 🔹 6. VERIFY PAYMENT
          await fetch(`${BASE.PRODUCT_BASE}/transaction/verify-payment`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });
          clearCart()
          navigate("/order-success", {
            state: { orderData: order },
          });
        },
      };

      const isLoaded = await loadRazorpay();

if (!isLoaded) {
  alert("Razorpay SDK failed to load");
  return;
}


      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Checkout failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* LEFT */}
      <div className="p-6 border-r">
        <h2 className="text-xl font-semibold mb-4">Checkout</h2>

        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="border p-2 w-full mb-2 rounded-lg"
        />
        {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}

        <div className="grid grid-cols-2 gap-2">
          <input
            name="firstName"
            placeholder="First Name"
            value={form.firstName}
            onChange={handleChange}
            className="border p-2 rounded-lg"
          />
          <input
            name="lastName"
            placeholder="Last Name"
            value={form.lastName}
            onChange={handleChange}
            className="border p-2 rounded-lg "
          />
        </div>

        <input
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          className="border p-2 w-full mt-2 rounded-lg"
        />

        <input
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
          className="border p-2 w-full mt-2 rounded-lg"
        />

        <input
          name="pin"
          placeholder="PIN"
          value={form.pin}
          onChange={handleChange}
          className="border p-2 w-full mt-2 rounded-lg"
        />

        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          className="border p-2 w-full mt-2 rounded-lg"
        />
        {/* <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="border p-2 w-full mt-2"
        /> */}

        {/* PAYMENT */}
        <div className="mt-4">
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="razorpay"
              checked={form.paymentMethod === "razorpay"}
              onChange={handleChange}
            />
            Online Payment
          </label>

          <label className="ml-4">
            <input
              type="radio"
              name="paymentMethod"
              value="cod"
              checked={form.paymentMethod === "cod"}
              onChange={handleChange}
            />
            COD
          </label>
        </div>

        <button
          onClick={handlePayNow}
          disabled={loading}
          className="bg-blue-600 text-white w-full py-3 mt-6 rounded"
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </div>

      {/* RIGHT */}
      <div className="p-6 bg-gray-50">
        {cart.map((item) => (
          <div key={item._id} className="flex gap-3 mb-4">
            <img
              src={item.image || fallbackImage}
              onError={(e) => (e.target.src = fallbackImage)}
              className="w-16 h-16"
            />
            <div className="flex-1">
              <p>{item.title}</p>
              <p>₹{item.price} x {item.quantity}</p>
            </div>
            <p>₹{item.price * item.quantity}</p>
          </div>
        ))}

        <div className="border-t pt-4 mt-4 flex justify-between">
          {/* <p>Subtotal: ₹{subtotal}</p>
          <p>Total: ₹{total}</p> */}
          <span className="font-semibold text-xl ">SubTotal</span>
          <span className="font-semibold text-xl">₹{subtotal}</span>
        </div>
      </div>
    </div>
  );
}