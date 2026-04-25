import React, { useState, useEffect } from "react";
import BASE from "../../config";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch(`${BASE.PRODUCT_BASE}/dashboard`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch dashboard data");
        }

        const res = await response.json();
        setData(res.result); // <-- FIXED
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Loading State
  if (loading) {
    return (
      <main className="flex-1 overflow-y-auto p-6">
        <div className="space-y-6">
          <div className="animate-pulse">
            <div className="h-10 bg-gray-200 rounded w-64"></div>
            <div className="h-6 bg-gray-200 rounded w-96 mt-2"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-xl border p-6">
                <div className="h-20 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  // Error State
  if (error) {
    return (
      <main className="flex-1 overflow-y-auto p-6">
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
          <strong>Error:</strong> {error}
        </div>
      </main>
    );
  }

  // Destructure data
  const {
    totalProducts = 0,
    totalOrders = 0,
    todaysSales = 0,
    lowStockAlerts = 0,
    pendingOrders = 0,
    processingOrders = 0,
    completedOrders = 0,
    totalCustomers = 0,
    recentOrders = [],
  } = data || {};

  return (
    <main className="flex-1 overflow-y-auto p-6">
      <div className="space-y-6">
        {/* TOP HEADING */}
        <div>
          <h1 className="text-3xl font-semibold">Dashboard</h1>
          <p className="text-gray-600">
            Welcome back! Here's what's happening today.
          </p>
        </div>

        {/* 4 MAIN CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* TOTAL PRODUCTS */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Products</p>
                <p className="mt-2 text-3xl font-bold">{totalProducts}</p>
                <p className="text-sm text-green-600 mt-1">Updated just now</p>
              </div>
              <div className="bg-blue-500 p-3 rounded-full">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 7l-1-4H5L4 7m16 0v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7m16 0H4"></path>
                  <path d="M9 12h6"></path>
                </svg>
              </div>
            </div>
          </div>

          {/* TOTAL ORDERS */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Orders</p>
                <p className="mt-2 text-3xl font-bold">{totalOrders}</p>
              </div>
              <div className="bg-green-500 p-3 rounded-full">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
              </div>
            </div>
          </div>

          {/* TODAY'S SALES */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Today's Sales</p>
                <p className="mt-2 text-3xl font-bold">
                  ${todaysSales.toLocaleString()}
                </p>
              </div>
              <div className="bg-purple-500 p-3 rounded-full">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <line x1="12" y1="1" x2="12" y2="23"></line>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
              </div>
            </div>
          </div>

          {/* LOW STOCK ALERTS */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Low Stock Alerts</p>
                <p className="mt-2 text-3xl font-bold">{lowStockAlerts}</p>
              </div>
              <div className="bg-orange-500 p-3 rounded-full">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 9v4m0 4h.01m-6.94 4h13.88a2 2 0 0 0 1.94-2.48L13.5 3.5a2 2 0 0 0-3.88 0L1.12 18.52A2 2 0 0 0 3.06 21z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* STATUS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6 flex items-center gap-4">
            <div className="bg-yellow-100 p-3 rounded-full">
              <svg
                className="w-8 h-8 text-yellow-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600">Pending Orders</p>
              <p className="text-2xl font-bold">{pendingOrders}</p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <svg
                className="w-8 h-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M4 4h16v12H5.17L4 18.17V4z"></path>
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600">Processing</p>
              <p className="text-2xl font-bold">{processingOrders}</p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-full">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-2xl font-bold">{completedOrders}</p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 flex items-center gap-4">
            <div className="bg-purple-100 p-3 rounded-full">
              <svg
                className="w-8 h-8 text-purple-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M17 20h5v-2a3 3 0 00-5.36-1.84M7 20H2v-2a3 3 0 005.36-1.84M12 20v-6m0-8V4"></path>
                <circle cx="12" cy="10" r="4"></circle>
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Customers</p>
              <p className="text-2xl font-bold">{totalCustomers}</p>
            </div>
          </div>
        </div>

        {/* RECENT ORDERS TABLE */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="px-6 pt-6 border-b border-gray-200">
            <h4 className="text-lg font-semibold">Recent Orders</h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-6 text-gray-600 font-medium">
                    Order ID
                  </th>
                  <th className="text-left py-4 px-6 text-gray-600 font-medium">
                    Customer
                  </th>
                  <th className="text-left py-4 px-6 text-gray-600 font-medium">
                    Product
                  </th>
                  <th className="text-left py-4 px-6 text-gray-600 font-medium">
                    Amount
                  </th>
                  <th className="text-left py-4 px-6 text-gray-600 font-medium">
                    Status
                  </th>
                  <th className="text-left py-4 px-6 text-gray-600 font-medium">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-8 text-gray-500">
                      No recent orders found
                    </td>
                  </tr>
                ) : (
                  recentOrders.map((order, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      {/* ORDER ID */}
                      <td className="py-4 px-6">
                        {order.orderNumber || `#ORD-${order._id?.slice(-6)}`}
                      </td>

                      {/* CUSTOMER NAME (backend me nahi hai) */}
                      <td className="py-4 px-6">N/A</td>

                      {/* PRODUCT NAME (backend me nahi hai) */}
                      <td className="py-4 px-6">N/A</td>

                      {/* AMOUNT */}
                      <td className="py-4 px-6">
                        ₹{order.totalAmount?.toFixed(2) || "0.00"}
                      </td>

                      {/* STATUS */}
                      <td className="py-4 px-6">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            order.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : order.status === "processing"
                              ? "bg-blue-100 text-blue-800"
                              : order.status === "shipped"
                              ? "bg-purple-100 text-purple-800"
                              : order.status === "delivered"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {order.status?.charAt(0).toUpperCase() +
                            order.status?.slice(1)}
                        </span>
                      </td>

                      {/* DATE */}
                      <td className="py-4 px-6">
                        {new Date(order.createdAt).toLocaleDateString("en-GB")}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
