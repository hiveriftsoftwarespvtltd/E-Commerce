// src/admin/pages/OrderDetails.jsx

import React, { useEffect, useState } from "react";
import { ArrowLeft, Package, MapPin, User, CreditCard } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import BASE from "../../config";
import fallbackImage from "../../assets/accessories.png"; // ⭐ fallback image

export default function OrderDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newStatus, setNewStatus] = useState("");

  // ⭐ FETCH ORDER DETAILS
  const fetchOrderDetails = async () => {
    try {
      const res = await fetch(`${BASE.PRODUCT_BASE}/orders/${id}`);
      const data = await res.json();

      if (data.result) {
        setOrder(data.result);
        setNewStatus(data.result.status); // Current status
      }
    } catch (error) {
      console.error("Error loading order:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, [id]);

  // ⭐ UPDATE ORDER STATUS
  const updateStatus = async () => {
    try {
      const res = await fetch(
        `${BASE.PRODUCT_BASE}/orders/${id}/status-update`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("Order status updated!");
        setOrder((prev) => ({ ...prev, status: newStatus }));
      } else {
        alert(data.message || "Status update failed");
      }
    } catch (error) {
      alert("Network Error");
    }
  };

  if (loading)
    return <p className="p-10 text-center text-gray-600">Loading Order...</p>;

  if (!order)
    return (
      <p className="p-10 text-center text-red-600">Order not found!</p>
    );

  return (
    <main className="flex-1 overflow-y-auto p-6">
      <div className="space-y-6">
        {/* BACK BUTTON */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <div>
            <h1 className="text-lg font-semibold">Order Details</h1>
            <p className="text-gray-600">{order.orderNumber}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT CONTENT */}
          <div className="lg:col-span-2 space-y-6">
            {/* ORDER ITEMS */}
            <div className="bg-white rounded-xl border border-gray-200">
              <div className="px-6 pt-6 pb-4 border-b">
                <h4 className="flex items-center gap-2 text-lg font-medium">
                  <Package className="w-5 h-5" /> Order Items
                </h4>
              </div>

              <div className="px-6 pb-6 space-y-4">
                {order.items.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center gap-4 pb-4 border-b last:border-b-0"
                  >
                    <img
                      src={item.productImage || fallbackImage}
                      onError={(e) => (e.target.src = fallbackImage)}
                      className="w-16 h-16 rounded object-cover border"
                      alt=""
                    />

                    <div className="flex-1">
                      <h3 className="text-sm">{item.productName}</h3>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      <p className="text-sm font-semibold">₹{item.price}</p>
                    </div>
                  </div>
                ))}

                {/* TOTALS */}
                <div className="pt-4 space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{order.subtotal}</span>
                  </div>

                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="text-green-600 font-medium">Free</span>
                  </div>

                  <div className="flex justify-between border-t pt-2 font-medium">
                    <span>Total</span>
                    <span>₹{order.totalAmount}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* SHIPPING ADDRESS */}
            <div className="bg-white rounded-xl border border-gray-200">
              <div className="px-6 pt-6 pb-4 border-b">
                <h4 className="flex items-center gap-2 text-lg font-medium">
                  <MapPin className="w-5 h-5" /> Shipping Address
                </h4>
              </div>

              <div className="px-6 pb-6 space-y-1">
                <p>{order.shippingAddress.street}</p>
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.state} -{" "}
                  {order.shippingAddress.zipCode}
                </p>
                <p>{order.shippingAddress.country}</p>
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="space-y-6">
            {/* CUSTOMER INFO */}
            <div className="bg-white rounded-xl border border-gray-200">
              <div className="px-6 pt-6 pb-4 border-b">
                <h4 className="flex items-center gap-2 text-lg font-medium">
                  <User className="w-5 h-5" /> Customer Info
                </h4>
              </div>

              <div className="px-6 pb-6 space-y-3">
                <div>
                  <p className="text-sm text-gray-600">User ID</p>
                  <p>{order.userId?._id}</p>
                </div>
              </div>
            </div>

            {/* PAYMENT INFO */}
            <div className="bg-white rounded-xl border border-gray-200">
              <div className="px-6 pt-6 pb-4 border-b">
                <h4 className="flex items-center gap-2 text-lg font-medium">
                  <CreditCard className="w-5 h-5" /> Payment Info
                </h4>
              </div>

              <div className="px-6 pb-6 space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Method</p>
                  <p>{order.paymentMethod}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                    {order.paymentStatus}
                  </span>
                </div>
              </div>
            </div>

            {/* UPDATE STATUS */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
              <h4 className="text-lg font-medium">Update Order Status</h4>

              <div className="space-y-2">
                <label className="text-sm">New Status</label>
                <select
                  className="border rounded-md px-3 py-2 w-full"
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <button
                onClick={updateStatus}
                className="w-full bg-black text-white rounded-md py-2 text-sm"
              >
                Update Status
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
