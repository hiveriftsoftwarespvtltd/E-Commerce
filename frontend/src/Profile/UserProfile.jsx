import React, { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/context/UserContext";
import { api } from "@/utils/axios-interceptor";
import OrdersTab from "@/components/OrderTab";
import OrderCard from "@/components/OrderCard";

export default function UserProfile() {
  const userEmail = localStorage.getItem("userEmail") || "guest@example.com";

  const [activeTab, setActiveTab] = useState("info");
  const [loading, setLoading] = useState(true);
  const {logoutUser,user} = useAuth()
  const [userProfileData,setUserProfileData] = useState(null)

  // Simulate API loading
  useEffect(() => {
    // const timer = setTimeout(() => setLoading(false), 1200);
    // return () => clearTimeout(timer);
    fetchProfile()
  }, []);

  const [profile, setProfile] = useState({
    name: "",
    phone: "",
  });

  const fetchProfile = async()=>{
    try {
      setLoading(true)
      const response = await api.get("/user/user-profile")
      if(response.data.success){
        const profileData = response.data.result
        setUserProfileData(profileData)
      }
    } catch (error) {
      setLoading(false)
      console.log("Fetch Profile Error",error)
      setUserProfileData(null)
    }finally{
      setLoading(false)
    }
  }

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
              {["info", "orders", "security"].map((tab) => (
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
                onClick={logoutUser}
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
                        value={userEmail || userProfileData?.user?.userEmail}
                        disabled
                        className="input"
                      />

                      <input
                        type="text"
                        value={profile.name || userProfileData?.user?.userName}
                        onChange={(e) =>
                          setProfile({ ...profile, name: e.target.value })
                        }
                        placeholder="Full Name"
                        className="input"
                      />

                      <input
                        type="number"
                        value={profile.phone || userProfileData?.user?.userPhone}
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
           {activeTab === "orders" && userProfileData?.orders && (
  <div className="bg-white shadow-lg p-6 rounded-2xl border">
    <h2 className="text-xl font-semibold mb-6">My Orders</h2>

    {userProfileData.orders.length === 0 ? (
      <p className="text-gray-500">Currently no orders</p>
    ) : (
      <div className="max-h-[500px] overflow-y-auto space-y-4">
        {userProfileData.orders.map((order) => (
          <OrderCard key={order._id} order={order} />
        ))}
      </div>
    )}
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