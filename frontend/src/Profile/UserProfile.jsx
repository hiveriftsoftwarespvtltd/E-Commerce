import React, { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/context/UserContext";
import { api } from "@/utils/axios-interceptor";
import OrdersTab from "@/components/OrderTab";
import OrderCard from "@/components/OrderCard";
import { Phone, X } from "lucide-react";
import { toast } from "react-toastify";
import StatusModal from "@/components/StatusModal";

export default function UserProfile() {
  const userEmail = localStorage.getItem("userEmail") || "guest@example.com";

  const [activeTab, setActiveTab] = useState("info");
  const [loading, setLoading] = useState(true);
  const [open,setOpen] = useState(false);
  const [statusModalMessage,setStatusModalMessage] = useState("")
  const { logoutUser, user } = useAuth();
  const [userProfileData, setUserProfileData] = useState(null);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [viewAddressModal, setViewAddressModal] = useState(false);
  const [formErrors, setFormErrors] = useState({
    line1: "",
    line2: "",
    phone1: "",
    phone2: "",
    pincode: "",
    state: "",
    city: "",
    landmark: "",
  });
  const [passwords, setPasswords] = useState({
    current: "",
    newPass: "",
    confirm: "",
  });

  const [profile, setProfile] = useState({
    name: "",
    phone: "",
  });

  const [address, setAddress] = useState({
    line1: "",
    line2: "",
    phone1: "",
    phone2: "",
    pincode: "",
    state: "",
    city: "",
    landmark: "",
  });

  const validateForm = () => {
    const errors = {};

    // Required fields
    if (!address.line1?.trim()) {
      errors.line1 = "Address line 1 is required";
    }

    if (!address.phone1?.trim()) {
      errors.phone1 = "Phone number is required";
    } else if (address.phone1.length !== 10) {
      errors.phone1 = "Phone number must be 10 digits";
    }

    if (address.phone2 && address.phone2.length !== 10) {
      errors.phone2 = "Phone2 must be 10 digits";
    }

    if (!address.pincode?.trim()) {
      errors.pincode = "Pincode is required";
    }

    if (!address.city?.trim()) {
      errors.city = "City is required";
    }

    if (!address.state?.trim()) {
      errors.state = "State is required";
    }

    // set errors
    setFormErrors({
      line1: errors.line1 || "",
      line2: "",
      phone1: errors.phone1 || "",
      phone2: errors.phone2 || "",
      pincode: errors.pincode || "",
      state: errors.state || "",
      city: errors.city || "",
      landmark: "",
    });

    // return true if no errors
    
    return Object.keys(errors).length === 0;
  };
  // Simulate API loading
  useEffect(() => {
    fetchProfile();
  }, []);

//   useEffect(() => {
//   if (activeTab === "security") {
//     setPasswords({
//       current: "",
//       newPass: "",
//       confirm: "",
//     });
//   }
// }, [activeTab]);

  useEffect(() => {
    if (userProfileData?.user) {
      setProfile({
        name: userProfileData.user.userName || "",
        phone: userProfileData.user.userPhone || "",
      });
    }
  }, [userProfileData]);

  const getErrorMessage = (error) =>
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    "Something went wrong";

  const createAddress = async () => {
    try {
      if (!validateForm()) return;
      setFormLoading(true);

      const response = await api.post("/address", address);

      if (response.data.success) {
        setOpen(true)
        setStatusModalMessage("Address Added Successfully")
        // toast.success(response.data.message || "Address Created Successfully");
        setShowAddressModal(false);
        fetchProfile();
      } else {
        toast.error(response.data.message || "Something went wrong");
      }
    } catch (error) {
      console.log("Create Address Error", error);
      toast.error(getErrorMessage(error));
    } finally {
      setFormLoading(false);
    }
  };
  const updateAddress = async (addressId) => {
    try {
      if (!validateForm()) return;
      setFormLoading(true);

      const response = await api.patch(`/address/${addressId}`, address);

      if (response.data.success) {
        // toast.success(response.data.message || "Address Updated Successfully");
        setShowAddressModal(false);
         setOpen(true)
        setStatusModalMessage("Address Updated Successfully")
        fetchProfile();
      } else {
        toast.error(response.data.message || "Something went wrong");
      }
    } catch (error) {
      console.log("Update Address Error", error);
      toast.error(getErrorMessage(error));
    } finally {
      setFormLoading(false);
    }
  };

  const deleteAddress = async () => {
    try {
      setLoading(true);
      const response = await api.delete(`/address/${selectedAddressId}`);
      if (response.data.success) {
        // toast.success("Address Deleted Successfuly");
        setShowDeleteModal(false);
        setOpen(true)
        setStatusModalMessage("Address Deleted Successfully")
        fetchProfile();
      } else {
        toast.error(response.data.message || "Something went wrong");
      }
    } catch (error) {
      console.log("Delete Address Error", error);
      toast.error("Internal Server Error");
    } finally {
      setLoading(false);
    }
  };

  const updateUserProfile = async () => {
    try {
      if (!profile.phone || !profile.name) {
        toast.error("Phone and Name should not empty");
        return;
      }
      setFormLoading(true);
      const response = await api.put("/user/update-profile", {
        userName: profile.name,
        userPhone: profile.phone,
      });
      if (response.data.success) {
        // toast.success("User Profile Updated Success");
        setOpen(true)
        setStatusModalMessage("Profile Updated Successfully!")
      } else {
        toast.error(response.data.message || "Try Again Later");
      }
    } catch (error) {
      toast.error("Internal Server Error");
    } finally {
      setFormLoading(false);
    }
  };

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await api.get("/user/user-profile");
      if (response.data.success) {
        const profileData = response.data.result;
        setUserProfileData(profileData);
      }
    } catch (error) {
      setLoading(false);
      console.log("Fetch Profile Error", error);
      setUserProfileData(null);
    } finally {
      setLoading(false);
    }
  };

  const updatePassword = async () => {
    try {
      for (const [key, value] of Object.entries(passwords)) {
        if (!value.trim()) {
          toast.error(`${key} is required`);
          return;
        }
      }
      if (passwords.newPass !== passwords.confirm) {
        toast.error("New password and confirm password should be same");
        return;
      }
      setFormLoading(true);
      const response = await api.put("/auth/change-password", {
        oldPassword: passwords.current,
        newPassword: passwords.newPass,
      });
      if (response.data.success) {
        // toast.success("Password Updated Successfully");
        setOpen(true)
        setStatusModalMessage("User Password Updated Successfully!")

        setPasswords({
          current: "",
          newPass: "",
          confirm: "",
        });
      } else {
        toast.error(response.data.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.message?.slice(0, 100) ||
          "Internal Server Error",
      );
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-4 py-8 bg-gradient-to-br from-white to-gray-50">
      <div className="max-w-5xl mx-auto">
        {/* TITLE */}
        <h1 className="text-3xl font-bold text-accent mb-6">My Profile</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 🔹 SIDEBAR */}
          <div className="bg-white/70 backdrop-blur-md shadow-md p-5 rounded-2xl h-fit border">
            <h2 className="text-lg font-semibold mb-4 text-accent">Account</h2>

            <ul className="space-y-2">
              {["info", "orders", "addresses", "security"].map((tab) => (
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
                    : tab === "addresses"
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
                        className="input bg-gray-400"
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
                        value={
                          profile.phone || userProfileData?.user?.userPhone
                        }
                        onChange={(e) =>
                          setProfile({ ...profile, phone: e.target.value })
                        }
                        placeholder="Phone Number"
                        className="input"
                      />

                      <button
                        disabled={formLoading || loading}
                        className="btn-primary flex items-center justify-center gap-2 min-w-[150px]"
                        onClick={updateUserProfile}
                      >
                        {formLoading ? (
                          <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          "Save Changes"
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {/* ADDRESS */}
                {activeTab === "addresses" && (
                  <div className="bg-white shadow-lg p-6 rounded-2xl border">
                    {/* HEADER */}
                    <div className="flex flex-col md:flex-row gap-2  justify-between items-center mb-4">
                      <h2 className="text-xl font-semibold">Saved Address</h2>

                      <button
                        className="btn-primary"
                        onClick={() => {
                          setAddress({});
                          setShowAddressModal(true);
                        }}
                      >
                        + Add Address
                      </button>
                    </div>

                    {/* 🟢 ADDRESS LIST */}
                    <div className="space-y-4">
                      {userProfileData?.addresses?.length > 0 ? (
                        userProfileData.addresses.map((addr) => (
                          <div
                            key={addr._id}
                            className="border p-4 rounded-lg flex flex-col gap-1"
                          >
                            <p className="font-medium">{addr.line1}</p>
                            <p className="text-sm text-gray-600">
                              {addr.line2}
                            </p>
                            <p className="text-sm text-gray-600">
                              {addr.city}, {addr.state} - {addr.pincode}
                            </p>
                            <p className="text-sm flex justify-start items-center gap-2">
                              {" "}
                              <Phone size={10} /> <span>{addr.phone1}</span>
                            </p>

                            {addr.landmark && (
                              <p className="text-xs text-gray-500">
                                Landmark: {addr.landmark}
                              </p>
                            )}

                            {/* ACTIONS */}
                            <div className="flex gap-4 mt-2">
                              <button
                                className="text-blue-600 text-sm"
                                onClick={() => {
                                  setAddress(addr);
                                  setShowAddressModal(true);
                                }}
                              >
                                Edit
                              </button>

                              <button
                                className="text-blue-600 text-sm"
                                onClick={() => {
                                  setSelectedAddress(addr);
                                  setViewAddressModal(true);
                                }}
                              >
                                View
                              </button>

                              <button
                                className="text-red-500 text-sm"
                                onClick={() => {
                                  setSelectedAddressId(addr._id);
                                  setShowDeleteModal(true);
                                }}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500 text-sm">
                          No address saved
                        </p>
                      )}
                    </div>
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
                    <h2 className="text-xl font-semibold mb-4">Wishlist</h2>

                    <p className="text-gray-500">Your wishlist is empty.</p>
                  </div>
                )}

                {/* SECURITY */}
                {activeTab === "security" && (
                  <div className="bg-white shadow-lg p-6 rounded-2xl border">
                    <h2 className="text-xl font-semibold mb-4">
                      Change Password
                    </h2>

                    <div className="space-y-4">
                      {/* {Object.entries(passwords).map(([key, value]) => (
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
                      ))} */}
                      <input
  type="password"
  autoComplete="new-password"
  value={passwords.current}
  onChange={(e) =>
    setPasswords((prev) => ({ ...prev, current: e.target.value }))
  }
  placeholder="Current Password"
  className="input"
/>

<input
  type="password"
  autoComplete="new-password"
  value={passwords.newPass}
  onChange={(e) =>
    setPasswords((prev) => ({ ...prev, newPass: e.target.value }))
  }
  placeholder="New Password"
  className="input"
/>

<input
  type="password"
  autoComplete="new-password"
  value={passwords.confirm}
  onChange={(e) =>
    setPasswords((prev) => ({ ...prev, confirm: e.target.value }))
  }
  placeholder="Confirm Password"
  className="input"
/>
                      <button
                        disabled={formLoading || loading}
                        className="btn-primary flex items-center justify-center gap-2 min-w-[150px]"
                        onClick={updatePassword}
                      >
                        {formLoading ? (
                          <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          "Update Password"
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {showAddressModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 overflow-y-auto p-4">
          <div className="bg-white p-6 rounded-xl w-full max-w-2xl relative max-h-[80vh] overflow-y-auto">
            {/* CLOSE */}
            <button
              className="absolute top-3 right-3"
              onClick={() => setShowAddressModal(false)}
            >
              <X size={20} />
            </button>

            <h2 className="text-lg font-semibold mb-4">
              {address?._id ? "Edit Address" : "Add Address"}
            </h2>

            {/* FORM */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                value={address.line1 || ""}
                onChange={(e) =>
                  setAddress({ ...address, line1: e.target.value })
                }
                placeholder="Address Line 1"
                className="input"
              />
              {formErrors.line1 && (
                <p className="text-red-500 text-xs">{formErrors.line1}</p>
              )}

              <input
                value={address.line2 || ""}
                onChange={(e) =>
                  setAddress({ ...address, line2: e.target.value })
                }
                placeholder="Address Line 2"
                className="input"
              />

              <input
                value={address.city || ""}
                onChange={(e) =>
                  setAddress({ ...address, city: e.target.value })
                }
                placeholder="City"
                className="input"
              />
              {formErrors.city && (
                <p className="text-red-500 text-xs">{formErrors.city}</p>
              )}

              <input
                value={address.state || ""}
                onChange={(e) =>
                  setAddress({ ...address, state: e.target.value })
                }
                placeholder="State"
                className="input"
              />
              {formErrors.state && (
                <p className="text-red-500 text-xs">{formErrors.state}</p>
              )}

              <input
                value={address.pincode || ""}
                onChange={(e) =>
                  setAddress({ ...address, pincode: e.target.value })
                }
                placeholder="Pincode"
                className="input"
              />
              {formErrors.pincode && (
                <p className="text-red-500 text-xs">{formErrors.pincode}</p>
              )}

              <input
                value={address.phone1 || ""}
                onChange={(e) =>
                  setAddress({ ...address, phone1: e.target.value })
                }
                placeholder="Phone 1"
                className="input"
              />
              {formErrors.phone1 && (
                <p className="text-red-500 text-xs">{formErrors.phone1}</p>
              )}

              <input
                value={address.phone2 || ""}
                onChange={(e) =>
                  setAddress({ ...address, phone2: e.target.value })
                }
                placeholder="Phone 2"
                className="input"
              />

              <input
                value={address.landmark || ""}
                onChange={(e) =>
                  setAddress({ ...address, landmark: e.target.value })
                }
                placeholder="Landmark"
                className="input"
              />
            </div>

            {/* SAVE */}
            <button
              className="btn-primary mt-4 w-full"
              onClick={() =>
                address?._id ? updateAddress(address._id) : createAddress()
              }
            >
              {address?._id ? "Update Address" : "Save Address"}
            </button>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-lg">
            {/* TITLE */}
            <h2 className="text-lg font-semibold mb-2">Delete Address</h2>

            {/* MESSAGE */}
            <p className="text-sm text-gray-600 mb-4">
              Are you sure you want to delete this address? This action cannot
              be undone.
            </p>

            {/* ACTION BUTTONS */}
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 rounded-md border text-gray-600"
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedAddressId(null);
                }}
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 rounded-md bg-red-500 text-white"
                onClick={deleteAddress}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {viewAddressModal && selectedAddress && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 relative">
            {/* CLOSE BUTTON */}
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
              onClick={() => {
                setViewAddressModal(false);
                setSelectedAddress(null);
              }}
            >
              ✕
            </button>

            <h2 className="text-lg font-semibold mb-4">Address Details</h2>

            <div className="space-y-2 text-sm">
              <p>
                <span className="font-medium">Line 1:</span>{" "}
                {selectedAddress.line1}
              </p>

              <p>
                <span className="font-medium">Line 2:</span>{" "}
                {selectedAddress.line2}
              </p>

              <p>
                <span className="font-medium">Phone 1:</span>{" "}
                {selectedAddress.phone1}
              </p>

              {selectedAddress.landmark && (
                <p>
                  <span className="font-medium">Landmark:</span>{" "}
                  {selectedAddress.landmark}
                </p>
              )}

              <p>
                <span className="font-medium">City:</span>{" "}
                {selectedAddress.city}
              </p>

              <p>
                <span className="font-medium">State:</span>{" "}
                {selectedAddress.state}
              </p>

              <p>
                <span className="font-medium">Pincode:</span>{" "}
                {selectedAddress.pincode}
              </p>

              <div className="pt-2 border-t mt-2">
                <p className="font-medium">Location</p>
                <p className="text-gray-600">
                  Lat: {selectedAddress.location?.coordinates?.[1] || 0}, Lng:{" "}
                  {selectedAddress.location?.coordinates?.[0] || 0}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

     

<StatusModal
  open={open}
  message={statusModalMessage || "Action Completed Successfully!"}
  type="success"
  actionText="Continue"
  
  onClose={() => {
    setOpen(false)
    setStatusModalMessage("")
    }}
/>
    </div>
  );
}
