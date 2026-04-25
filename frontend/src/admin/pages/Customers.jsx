import React, { useState } from "react";
import { Mail, Phone, Eye, X } from "lucide-react";

export default function Customers() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeCustomer, setActiveCustomer] = useState(null);

  // Dummy Customers
  const customers = [
    {
      name: "John Smith",
      email: "john@example.com",
      phone: "+1 234 567 8900",
      totalOrders: 8,
      totalSpent: 1245.0,
      joinDate: "2024-01-15",
      lastOrder: "2024-11-15",
    },
    {
      name: "Sarah Johnson",
      email: "sarah@example.com",
      phone: "+1 234 567 8901",
      totalOrders: 5,
      totalSpent: 892.5,
      joinDate: "2024-02-20",
      lastOrder: "2024-11-16",
    },
    {
      name: "Michael Brown",
      email: "michael@example.com",
      phone: "+1 234 567 8902",
      totalOrders: 12,
      totalSpent: 2340.0,
      joinDate: "2023-11-10",
      lastOrder: "2024-11-14",
    },
  ];

  return (
    <main className="flex-1 overflow-y-auto p-6">
      
      {/* ---------- HEADER ---------- */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold">Customers</h1>
        <p className="text-gray-600">Manage customer accounts and information</p>
      </div>

      {/* ---------- SEARCH CARD ---------- */}
      <div className="bg-white border border-gray-200 rounded-xl mb-6">
        <div className="p-6">
          <div className="relative">
            <svg
              className="absolute left-3 top-3 h-4 w-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>

            <input
              placeholder="Search customers by name, email or phone..."
              className="w-full border border-gray-300 rounded-md px-10 py-2 focus:ring-black focus:border-black"
            />
          </div>
        </div>

        {/* ---------- TABLE ---------- */}
        <div className="px-6 pb-6 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-3 px-4 text-left text-gray-600">Customer</th>
                <th className="py-3 px-4 text-left text-gray-600">Contact</th>
                <th className="py-3 px-4 text-left text-gray-600">Total Orders</th>
                <th className="py-3 px-4 text-left text-gray-600">Total Spent</th>
                <th className="py-3 px-4 text-left text-gray-600">Join Date</th>
                <th className="py-3 px-4 text-left text-gray-600">Status</th>
                <th className="py-3 px-4 text-left text-gray-600">Actions</th>
              </tr>
            </thead>

            <tbody>
              {customers.map((c, i) => (
                <tr key={i} className="border-b hover:bg-gray-50">
                  
                  {/* CUSTOMER */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center">
                        {c.name.charAt(0)}
                      </div>
                      <div>{c.name}</div>
                    </div>
                  </td>

                  {/* CONTACT */}
                  <td className="py-3 px-4">
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-2">
                        <Mail className="w-3 h-3 text-gray-400" />
                        {c.email}
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Phone className="w-3 h-3 text-gray-400" />
                        {c.phone}
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-4">{c.totalOrders}</td>
                  <td className="py-3 px-4">${c.totalSpent}</td>
                  <td className="py-3 px-4">{c.joinDate}</td>

                  <td className="py-3 px-4">
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                      Active
                    </span>
                  </td>

                  {/* ACTION */}
                  <td className="py-3 px-4">
                    <button
                      onClick={() => {
                        setActiveCustomer(c);
                        setModalOpen(true);
                      }}
                      className="p-2 rounded hover:bg-gray-200"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ───────────────────────────── */}
      {/*         CUSTOMER MODAL       */}
      {/* ───────────────────────────── */}
      {modalOpen && activeCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">

          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setModalOpen(false)}
          />

          {/* Modal Box */}
          <div className="bg-white max-w-xl w-full mx-4 rounded-lg shadow-lg p-6 relative z-50 animate-in fade-in zoom-in-95">

            {/* Close */}
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 opacity-70 hover:opacity-100"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <h2 className="text-lg font-semibold mb-1">Customer Profile</h2>
            <p className="text-sm text-gray-500 mb-6">
              Detailed customer information and order history
            </p>

            {/* Avatar */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-indigo-100 text-indigo-600 text-2xl rounded-full flex items-center justify-center">
                {activeCustomer.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-lg font-medium">{activeCustomer.name}</h3>
                <p className="text-gray-600">{activeCustomer.email}</p>
              </div>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Total Orders</p>
                <p className="mt-1">{activeCustomer.totalOrders}</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Total Spent</p>
                <p className="mt-1">${activeCustomer.totalSpent}</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Join Date</p>
                <p className="mt-1">{activeCustomer.joinDate}</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Last Order</p>
                <p className="mt-1">{activeCustomer.lastOrder}</p>
              </div>
            </div>

            {/* CONTACT */}
            <h4 className="font-medium mb-3">Contact Information</h4>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-400" />
                {activeCustomer.email}
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-400" />
                {activeCustomer.phone}
              </div>
            </div>

          </div>
        </div>
      )}
    </main>
  );
}
