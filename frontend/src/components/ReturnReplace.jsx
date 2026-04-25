// src/components/ReturnReplace.jsx
import React, { useState } from "react";

export default function ReturnReplace() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    orderId: "",
    reason: "",
    returnType: "Return",
  });

  const submitRequest = (e) => {
    e.preventDefault(); 
    // placeholder: integrate with actual API when available
    alert("Your request has been submitted successfully!");
    console.log("Return/Replace request:", formData);
  };

  return (
<div className="w-full bg-[#f7f3ee] flex justify-center px-4 py-12">
  <div className="w-full max-w-[16=800px] px-4 text-[#9c7d50] ">

        
   <form
  onSubmit={submitRequest}
  className="  p-8 rounded-2xl shadow-md border border-gray-200 max-w-4xl mx-auto"
>
  <h2 className="text-2xl font-semibold text-[#9c7d50] mb-6 text-center">

    Return / Replacement Request
  </h2>

  {/* GRID LAYOUT */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

    {/* Full Name */}
    <div className="flex flex-col">
      <label className="text-gray-700 font-medium mb-1">Full Name</label>
      <input
        type="text"
        placeholder="Full Name"
        required
        className="p-3 border rounded-lg focus:ring-2 focus:ring-[#9c7d50] focus:outline-none"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
    </div>

    {/* Email */}
    <div className="flex flex-col">
      <label className="text-gray-700 font-medium mb-1">Email Address</label>
      <input
        type="email"
        placeholder="Email Address"
        required
        className="p-3 border rounded-lg focus:ring-2 focus:ring-[#9c7d50] focus:outline-none"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
    </div>

    {/* Order ID */}
    <div className="flex flex-col">
      <label className="text-gray-700 font-medium mb-1">Order ID</label>
      <input
        type="text"
        placeholder="#12345"
        required
        className="p-3 border rounded-lg focus:ring-2 focus:ring-[#9c7d50] focus:outline-none"
        value={formData.orderId}
        onChange={(e) => setFormData({ ...formData, orderId: e.target.value })}
      />
    </div>

    {/* Return Type */}
    <div className="flex flex-col">
      <label className="text-gray-700 font-medium mb-1">Request Type</label>
      <select
        className="p-3 border rounded-lg focus:ring-2 focus:ring-[#9c7d50] focus:outline-none"
        value={formData.returnType}
        onChange={(e) => setFormData({ ...formData, returnType: e.target.value })}
      >
        <option>Return</option>
        <option>Replacement</option>
      </select>
    </div>

    {/* Reason - full width */}
    <div className="flex flex-col md:col-span-2">
      <label className="text-gray-700 font-medium mb-1">
        Reason for Return / Replacement
      </label>
      <textarea
        placeholder="Describe the issue…"
        required
        className="p-3 border rounded-lg h-32 focus:ring-2 focus:ring-[#9c7d50] focus:outline-none"
        value={formData.reason}
        onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
      />
    </div>

  </div>

  {/* Submit Button */}
  <button
    type="submit"
    className="mt-6 w-full bg-[#9c7d50] text-white py-3 rounded-xl text-lg font-semibold hover:bg-[#8b6f44] transition"
  >
    Submit Request
  </button>
</form>

    <div className="mt-12 ">

      <h1 className="text-3xl font-bold text-[#9c7d50] mb-6">
        Return & Replacement Policy
      </h1>

      <p className="text-gray-600 mb-4">
        We strive to provide the best quality products to our customers. If you
        receive a damaged, defective or different product, you may request a
        replacement or return within <b>7 days</b> of delivery.
      </p>

      <h2 className="text-xl font-semibold text-[#9c7d50] mt-6 mb-2">
        ✔ Conditions Eligible for Return/Replacement
      </h2>
      <ul className="list-disc ml-6 space-y-2 text-gray-700">
        <li>Product received is damaged or broken.</li>
        <li>Product received is different from the one ordered.</li>
        <li>Product has manufacturing defects.</li>
        <li>Wrong quantity, size or variation delivered.</li>
      </ul>

      <h2 className="text-xl font-semibold text-[#9c7d50] mt-6 mb-2">
        ❌ Items Not Eligible for Return
      </h2>
      <ul className="list-disc ml-6 space-y-2 text-gray-700">
        <li>Used products or unboxed items.</li>
        <li>Products damaged due to misuse.</li>
        <li>Items without original packaging or invoice.</li>
        <li>Custom-made products.</li>
      </ul>

      <h2 className="text-xl font-semibold text-[#9c7d50] mt-6 mb-2">
        💵 Refund Process
      </h2>
      <p className="text-gray-700">
        Refunds will be initiated to your original payment method (Bank/UPI/Wallet)
        within <b>3–7 working days</b> after product pickup verification.
      </p>


      <p className="mt-8 text-gray-600 text-sm">
        💡 For any assistance, contact our support team at
        <a href="mailto:support@yourwebsite.com" className="text-[#9c7d50]font-medium ml-1">
          support@yourwebsite.com
        </a>
      </p>









  </div>




  </div>
</div>
  );
}
