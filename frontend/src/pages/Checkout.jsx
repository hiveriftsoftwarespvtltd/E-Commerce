import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import fallbackImage from "../assets/accessories.png";
import { useAuth } from "@/context/UserContext";
import { api } from "@/utils/axios-interceptor";
import { toast } from "react-toastify";

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const { user } = useAuth();

  const [userAddress, setUserAddress] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddressModal, setShowAddressModal] = useState(false);

  const [form, setForm] = useState({
    email: user?.email || "",
    firstName: "",
    lastName: "",
    phone: "",
  });

  const [newAddress, setNewAddress] = useState({
    line1: "",
    line2: "",
    city: "",
    state: "",
    pincode: "",
    phone1: "",
    landmark: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // 🔄 Fetch address
  useEffect(() => {
    fetchAddress();
  }, []);

  const fetchAddress = async () => {
    try {
      const res = await api.get("/address");

      if (res.data.success) {
        const addresses = res.data.result;
        setUserAddress(addresses);

        if (addresses.length) {
          setSelectedAddress(addresses[0]);
          setForm((prev) => ({
            ...prev,
            phone: addresses[0].phone1 || "",
          }));
        }
      }
    } catch {
      toast.error("Failed to load addresses");
    }
  };

  // 👤 Name autofill
  useEffect(() => {
    if (user?.name) {
      const parts = user.name.split(" ");
      setForm((prev) => ({
        ...prev,
        firstName: parts[0] || "",
        lastName: parts.slice(1).join(" ") || "",
      }));
    }
  }, [user]);

  // ❌ Empty cart
  if (!cart.length) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md bg-white shadow-lg rounded-2xl p-8 border">
        
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center">
            <span className="text-4xl">🛒</span>
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Your cart is empty
        </h2>

        {/* Subtext */}
        <p className="text-gray-500 mb-6">
          Looks like you haven’t added anything yet. Start exploring our products and find something you’ll love.
        </p>

        {/* Button */}
        <button
          onClick={() => navigate("/products")}
          className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded-lg font-medium shadow-md"
        >
          Browse Products
        </button>
      </div>
    </div>
  );
}

  // 💰 Price
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const total = subtotal;

  // 🧠 Validation
  const validateForm = () => {
    let err = {};

    if (!form.firstName) err.firstName = "Required";
    if (!form.phone || form.phone.length !== 10)
      err.phone = "Invalid phone";
    if (!selectedAddress) err.address = "Select address";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  // 🚀 Order
  const handleOrder = async () => {
    if (!validateForm()) return;

    setLoading(true);

    try {
      const items = cart.map((item) => ({
        productId: item._id,
        productName: item.title,
        quantity: item.quantity,
        price: item.price,
        productImage: item.image || "", // ✅ FIX
      }));

      const payload = {
        userId: user.id,
        items,
        subtotal, // ✅ FIX
        totalAmount: total,
        paymentMethod: "COD",
        phone: form.phone,
        email: form.email,

        // ✅ FIX (fallback location)
        userLatitude: "0",
        userLongitude: "0",

        shippingAddress: {
          street: selectedAddress.line1,
          addressLine2: selectedAddress.line2,
          city: selectedAddress.city,
          state: selectedAddress.state,
          zipCode: selectedAddress.pincode,
          country: "India",
          landmark: selectedAddress.landmark,
        },
      };

      const res = await api.post("/orders", payload);

      if (res.data.success) {
        clearCart();
        navigate("/order-success", {
          state: { orderData: res.data.result },
        });
      }
    } catch {
      toast.error("Order failed");
    } finally {
      setLoading(false);
    }
  };

  // ➕ Add address
  const createAddress = async () => {
    if (
      !newAddress.line1 ||
      !newAddress.city ||
      !newAddress.state ||
      !newAddress.pincode ||
      newAddress.phone1.length !== 10
    ) {
      toast.error("Fill all fields correctly");
      return;
    }

    try {
      const res = await api.post("/address", newAddress);

      if (res.data.success) {
        toast.success("Address added");
        setShowAddressModal(false);
        fetchAddress();
      }
    } catch {
      toast.error("Failed to add address");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 grid lg:grid-cols-2 gap-6">

      {/* LEFT */}
      <div className="bg-white p-5 rounded shadow">
        <h2 className="text-xl mb-4">Checkout</h2>

        <input value={form.email} disabled className="input bg-gray-100" />

        <div className="grid grid-cols-2 gap-3 mt-3">
          <input
            name="firstName"
            value={form.firstName}
            onChange={(e)=>setForm({...form,firstName:e.target.value})}
            className="input"
          />
          <input
            name="lastName"
            value={form.lastName}
            onChange={(e)=>setForm({...form,lastName:e.target.value})}
            className="input"
          />
        </div>

        {/* ADDRESS */}
        <select
          className="input mt-4"
          value={selectedAddress?._id || ""}
          onChange={(e) => {
            const addr = userAddress.find(a => a._id === e.target.value);
            setSelectedAddress(addr);
            setForm((prev) => ({
              ...prev,
              phone: addr?.phone1 || "",
            }));
          }}
        >
          <option value="">Select Address</option>
          {userAddress.map(addr => (
            <option key={addr._id} value={addr._id}>
              {addr.line1}, {addr.city}
            </option>
          ))}
        </select>

        {!userAddress.length && (
          <button
            onClick={() => setShowAddressModal(true)}
            className="bg-green-600 text-white px-4 py-2 mt-3 rounded"
          >
            Add Address
          </button>
        )}

        {selectedAddress && (
          <div className="mt-3 text-sm">
            {selectedAddress.line1}, {selectedAddress.city}
          </div>
        )}

        <input
          name="phone"
          value={form.phone}
          onChange={(e)=>setForm({...form,phone:e.target.value})}
          className="input mt-3"
        />

        <button
          onClick={handleOrder}
          disabled={!userAddress.length || loading}
          className="w-full bg-blue-600 text-white py-3 mt-4 rounded disabled:bg-gray-400"
        >
          {loading ? "Processing..." : "Place Order"}
        </button>
      </div>

      {/* RIGHT */}
      <div className="bg-white p-5 rounded shadow">
        {cart.map(item => (
          <div key={item._id} className="flex gap-3 mb-3">
            <img src={item.image || fallbackImage} className="w-14 h-14" />
            <div className="flex-1">
              {item.title}
              <div>₹{item.price} × {item.quantity}</div>
            </div>
            ₹{item.price * item.quantity}
          </div>
        ))}
        <div className="font-bold">Total ₹{total}</div>
      </div>

      {/* MODAL */}
      {showAddressModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-4 rounded w-80">
            {Object.keys(newAddress).map((key) => (
              <input
                key={key}
                placeholder={key}
                className="input mb-2"
                value={newAddress[key]}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, [key]: e.target.value })
                }
              />
            ))}
            <button
              onClick={createAddress}
              className="bg-green-600 text-white w-full py-2 rounded"
            >
              Save
            </button>
          </div>
        </div>
      )}

      <style>{`
        .input {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 6px;
        }
      `}</style>
    </div>
  );
}