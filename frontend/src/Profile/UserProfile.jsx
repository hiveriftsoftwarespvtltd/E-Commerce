import React, { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function UserProfile() {
  const userEmail = localStorage.getItem("userEmail") || "guest@example.com";

  const [activeTab, setActiveTab] = useState("info");
  const [loading, setLoading] = useState(true);

  // Simulate API loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const [profile, setProfile] = useState({
    name: "",
    phone: "",
  });

  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    pincode: "",
    state: "",
    city: "",
    house: "",
    area: "",
  });

  const [passwords, setPasswords] = useState({
    current: "",
    newPass: "",
    confirm: "",
  });

  return (
    <div className="min-h-screen px-4 py-8 bg-gradient-to-br from-white to-gray-50">
      <div className="max-w-5xl mx-auto">

        {/* TITLE */}
        <h1 className="text-3xl font-bold text-accent mb-6">
          My Profile
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* 🔹 SIDEBAR */}
          <div className="bg-white/70 backdrop-blur-md shadow-md p-5 rounded-2xl h-fit border">
            <h2 className="text-lg font-semibold mb-4 text-accent">
              Account
            </h2>

            <ul className="space-y-2">
              {["info", "address", "orders", "wishlist", "security"].map((tab) => (
                <li
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-2 rounded-lg cursor-pointer capitalize transition-all duration-200
                    ${
                      activeTab === tab
                        ? "bg-accent text-white shadow"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                >
                  {tab === "info"
                    ? "Personal Info"
                    : tab === "address"
                    ? "Address Book"
                    : tab === "orders"
                    ? "My Orders"
                    : tab === "wishlist"
                    ? "Wishlist"
                    : "Security"}
                </li>
              ))}

              <li
                className="px-3 py-2 rounded-lg cursor-pointer text-red-500 hover:bg-red-50"
                onClick={() => {
                  localStorage.clear();
                  window.location.href = "/";
                }}
              >
                Logout
              </li>
            </ul>
          </div>

          {/* 🔹 RIGHT CONTENT */}
          <div className="md:col-span-2 space-y-6">

            {/* 🔹 SKELETON STATE */}
            {loading ? (
              <div className="bg-white p-6 rounded-2xl shadow space-y-4">
                <Skeleton className="h-6 w-1/3" />
                <Skeleton className="h-12 w-full rounded-lg" />
                <Skeleton className="h-12 w-full rounded-lg" />
                <Skeleton className="h-12 w-2/3 rounded-lg" />
              </div>
            ) : (
              <>
                {/* PERSONAL INFO */}
                {activeTab === "info" && (
                  <div className="bg-white shadow-lg p-6 rounded-2xl border">
                    <h2 className="text-xl font-semibold mb-4">
                      Personal Information
                    </h2>

                    <div className="space-y-4">

                      <input
                        type="text"
                        value={userEmail}
                        disabled
                        className="input"
                      />

                      <input
                        type="text"
                        value={profile.name}
                        onChange={(e) =>
                          setProfile({ ...profile, name: e.target.value })
                        }
                        placeholder="Full Name"
                        className="input"
                      />

                      <input
                        type="number"
                        value={profile.phone}
                        onChange={(e) =>
                          setProfile({ ...profile, phone: e.target.value })
                        }
                        placeholder="Phone Number"
                        className="input"
                      />

                      <button className="btn-primary">
                        Save Changes
                      </button>
                    </div>
                  </div>
                )}

                {/* ADDRESS */}
                {activeTab === "address" && (
                  <div className="bg-white shadow-lg p-6 rounded-2xl border">
                    <h2 className="text-xl font-semibold mb-4">
                      Address
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(address).map(([key, value]) => (
                        <input
                          key={key}
                          value={value}
                          onChange={(e) =>
                            setAddress({
                              ...address,
                              [key]: e.target.value,
                            })
                          }
                          placeholder={key}
                          className="input"
                        />
                      ))}
                    </div>

                    <button className="btn-primary mt-4">
                      Save Address
                    </button>
                  </div>
                )}

                {/* ORDERS */}
                {activeTab === "orders" && (
                  <div className="bg-white shadow-lg p-6 rounded-2xl border">
                    <h2 className="text-xl font-semibold mb-4">
                      My Orders
                    </h2>

                    <p className="text-gray-500 mb-3">
                      No orders found.
                    </p>

                    <button className="btn-primary">
                      Start Shopping
                    </button>
                  </div>
                )}

                {/* WISHLIST */}
                {activeTab === "wishlist" && (
                  <div className="bg-white shadow-lg p-6 rounded-2xl border">
                    <h2 className="text-xl font-semibold mb-4">
                      Wishlist
                    </h2>

                    <p className="text-gray-500">
                      Your wishlist is empty.
                    </p>
                  </div>
                )}

                {/* SECURITY */}
                {activeTab === "security" && (
                  <div className="bg-white shadow-lg p-6 rounded-2xl border">
                    <h2 className="text-xl font-semibold mb-4">
                      Change Password
                    </h2>

                    <div className="space-y-4">
                      {Object.entries(passwords).map(([key, value]) => (
                        <input
                          key={key}
                          type="password"
                          value={value}
                          onChange={(e) =>
                            setPasswords({
                              ...passwords,
                              [key]: e.target.value,
                            })
                          }
                          placeholder={key}
                          className="input"
                        />
                      ))}

                      <button className="btn-primary">
                        Update Password
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}