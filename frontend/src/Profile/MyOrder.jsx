import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BASE from "../config/";
import fallbackImage from "../assets/jars.png";

export default function MyOrder() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("userId");

  // Fetch user-specific orders
  const fetchOrders = async () => {
    if (!userId) {
      setTimeout(() => setLoading(false), 300);
      return;
    }

    try {
      // STEP 1: Get all orders
      const res = await fetch(`${BASE.PRODUCT_BASE}/orders`);
      const data = await res.json();

      if (data.result) {
        const allOrders = data.result;

        // STEP 2: Fetch all order details in PARALLEL (FAST)
        const orderDetails = await Promise.all(
          allOrders.map((order) =>
            fetch(`${BASE.PRODUCT_BASE}/orders/${order._id}`).then((res) =>
              res.json()
            )
          )
        );

        // STEP 3: Filter only logged-in user's orders
        const myOrders = orderDetails
          .filter((o) => o?.result?.userId?._id === userId)
          .map((o) => o.result);

        // SAVE orders
        setOrders(myOrders);
      }
    } catch (error) {
      console.error("Order load failed", error);
    } finally {
      // Smooth loading UX
      setTimeout(() => {
        setLoading(false);
      }, 300);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <h2 className="text-2xl font-bold mb-6 text-center">My Orders</h2>

      <div className="max-w-5xl mx-auto space-y-6">
        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : orders.length === 0 ? (
          <div className="bg-white p-10 rounded-xl shadow text-center">
            <h3 className="text-lg font-semibold mb-2">No Orders Yet</h3>
            <p className="text-gray-600 mb-4">
              Looks like you haven't placed any orders.
            </p>
            <Link
              to="/"
              className="bg-black text-white px-5 py-2 rounded-lg text-sm"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          orders.map((order) => (
            <div key={order._id} className="bg-white rounded-xl p-5 shadow-md">
              <h3 className="font-semibold text-gray-800 mb-2">
                Order Number: {order.orderNumber}
              </h3>

              <p className="text-sm text-gray-500 mb-4">
                {order.paymentMethod} • {order.paymentStatus}
              </p>

              {order.items?.map((item, idx) => (
                <div key={idx} className="flex gap-4 border-b py-3">
                  <img
                    src={item.productImage || fallbackImage}
                    onError={(e) => (e.target.src = fallbackImage)}
                    className="w-20 h-20 rounded-lg object-cover border"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium">{item.productName}</h4>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold">₹{item.price}</p>
                </div>
              ))}

              <p className="mt-4 font-bold text-lg">
                Total: ₹{order.totalAmount}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
