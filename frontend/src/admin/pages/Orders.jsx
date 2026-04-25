// src/admin/pages/Orders.jsx
import React, { useState, useEffect } from "react";
import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BASE from "../../config";

export default function Orders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchOrderNumber, setSearchOrderNumber] = useState("");

  // Status color mapping
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // API Search
  const searchOrders = async () => {
    const query = searchOrderNumber.trim();
    if (!query) return;

    try {
      const res = await fetch(
        `${BASE.PRODUCT_BASE}/orders/search?orderNumber=${query}`
      );
      const data = await res.json();

      if (Array.isArray(data.result) && data.result.length > 0) {
        setOrders(data.result);
      } else {
        setOrders([]);
      }
    } catch (error) {
      console.error("Search Error:", error);
      setOrders([]);
    }
  };

  // Fetch all orders
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BASE.PRODUCT_BASE}/orders`);
      const data = await res.json();

      if (res.ok && data.result) {
        setOrders(data.result);
      } else {
        setError(data.message || "Failed to load orders");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <main className="flex-1 p-6 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Orders</h2>
          <div className="bg-white rounded-2xl shadow-lg p-10 text-center">
            <div className="text-xl text-gray-600">Loading orders...</div>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex-1 p-6 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Orders</h2>
          <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-xl">
            {error}
          </div>
        </div>
      </main>
    );
  }

  // ⭐ LOCAL SEARCH FILTER (works in table instantly)
  const filteredOrders = orders.filter((order) =>
    order.orderNumber
      ?.toString()
      .toLowerCase()
      .includes(searchOrderNumber.toLowerCase())
  );

  return (
    <main className="flex-1 p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-4xl font-bold text-gray-900">Orders</h2>
            <p className="text-gray-600 mt-2">
              Manage and track all customer orders
            </p>
          </div>
          <div className="text-2xl font-bold text-gray-800">
            Total: <span className="text-black">{orders.length}</span> Orders
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white p-4 rounded-xl shadow border flex gap-3 mb-6">
          <input
            onKeyDown={(e) => e.key === "Enter" && searchOrders()}
            type="text"
            placeholder="Search by Order Number..."
            value={searchOrderNumber}
            onChange={(e) => setSearchOrderNumber(e.target.value)}
            className="border px-3 py-2 rounded-md w-full"
          />

          <button
            onClick={searchOrders}
            className="bg-black text-white px-4 py-2 rounded-md"
          >
            Search
          </button>

          <button
            onClick={() => {
              setSearchOrderNumber("");
              fetchOrders();
            }}
            className="bg-gray-300 text-black px-4 py-2 rounded-md"
          >
            Reset
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="text-left py-5 px-6 font-semibold text-gray-700">Order ID</th>
                  <th className="text-left py-5 px-6 font-semibold text-gray-700">Customer</th>
                  <th className="text-left py-5 px-6 font-semibold text-gray-700">Items</th>
                  <th className="text-left py-5 px-6 font-semibold text-gray-700">Amount</th>
                  <th className="text-left py-5 px-6 font-semibold text-gray-700">Payment</th>
                  <th className="text-left py-5 px-6 font-semibold text-gray-700">Status</th>
                  <th className="text-left py-5 px-6 font-semibold text-gray-700">Date</th>
                  <th className="text-left py-5 px-6 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center py-12 text-gray-500 text-lg">
                      No orders found
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr
                      key={order._id}
                      className="border-b hover:bg-gray-50 transition cursor-pointer"
                      onClick={() => navigate(`/admin/orders/${order._id}`)}
                    >
                      <td className="py-5 px-6 font-medium text-blue-600">
                        #{order.orderNumber}
                      </td>

                      <td className="py-5 px-6">
                        <div>
                          <div className="font-medium text-gray-900">
                            {order.customer?.name || "Unknown User"}
                          </div>
                          <div className="text-sm text-gray-500">
                            {order.customer?.email || "N/A"}
                          </div>
                        </div>
                      </td>

                      <td className="py-5 px-6">{order.itemsCount} items</td>

                      <td className="py-5 px-6 font-bold text-gray-900">
                        ₹{parseFloat(order.totalAmount).toFixed(2)}
                      </td>

                      <td className="py-5 px-6">{order.paymentMethod || "Unknown"}</td>

                      <td className="py-5 px-6">
                        <span
                          className={`px-4 py-2 rounded-full text-xs font-semibold ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </td>

                      <td className="py-5 px-6 text-gray-600">
                        {new Date(order.date).toLocaleDateString("en-IN")}
                      </td>

                      <td className="py-5 px-6">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/admin/orders/${order._id}`);
                          }}
                          className="p-3 hover:bg-gray-100 rounded-xl transition"
                        >
                          <Eye className="w-5 h-5 text-gray-600" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
            <div className="text-3xl font-bold text-gray-800">{orders.length}</div>
            <div className="text-gray-600">Total Orders</div>
          </div>

          <div className="bg-yellow-50 p-6 rounded-2xl shadow-lg border border-yellow-200">
            <div className="text-3xl font-bold text-yellow-700">
              {orders.filter((o) => o.status === "pending").length}
            </div>
            <div className="text-yellow-700">Pending</div>
          </div>

          <div className="bg-blue-50 p-6 rounded-2xl shadow-lg border border-blue-200">
            <div className="text-3xl font-bold text-blue-700">
              {orders.filter((o) => o.status === "processing").length}
            </div>
            <div className="text-blue-700">Processing</div>
          </div>

          <div className="bg-green-50 p-6 rounded-2xl shadow-lg border border-green-200">
            <div className="text-3xl font-bold text-green-700">
              {orders.filter((o) => o.status === "delivered").length}
            </div>
            <div className="text-green-700">Delivered</div>
          </div>
        </div>
      </div>
    </main>
  );
}
