import React from "react";
import { CheckCircle } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import fallbackImage from "../assets/accessories.png";

export default function OrderSuccess() {
  const location = useLocation();
  const order = location.state?.orderData || {}; // full backend order data

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT SECTION */}
        <div className="lg:col-span-2 space-y-6">

          {/* HEADER */}
          <div className="bg-white p-6 rounded-xl shadow">
            <div className="flex items-center gap-3">
              <CheckCircle className="text-green-600" size={28} />
              <div>
                <h2 className="text-2xl font-bold">
                  Thank you, {order.name || "Customer"}!
                </h2>
                <p className="text-gray-500 text-sm">
                  Order #{order.orderNumber}
                </p>
              </div>
            </div>
          </div>

          {/* ORDER DETAILS */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-4">Order details</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Contact Info */}
              <div>
                <h4 className="font-semibold mb-2 text-gray-700">
                  Contact information
                </h4>
                <p className="text-gray-600 text-sm">{order.email}</p>
                <p className="text-gray-600 text-sm">{order.phone}</p>
              </div>

              {/* Payment Method */}
              <div>
                <h4 className="font-semibold mb-2 text-gray-700">
                  Payment method
                </h4>
                <p className="text-gray-600 text-sm">
                  {order.paymentMethod || "COD"} – ₹{order.total}
                </p>
              </div>

              {/* Shipping Address */}
              <div>
                <h4 className="font-semibold mb-2 text-gray-700">
                  Shipping address
                </h4>
                <p className="text-gray-600 text-sm">
                  {order.name} <br />
                  {order.address} <br />
                  {order.city}, {order.state} {order.pincode} <br />
                  {order.phone}
                </p>
              </div>

              {/* Billing Address */}
              <div>
                <h4 className="font-semibold mb-2 text-gray-700">
                  Billing address
                </h4>
                <p className="text-gray-600 text-sm">
                  {order.name} <br />
                  {order.address} <br />
                  {order.city}, {order.state} {order.pincode} <br />
                  {order.phone}
                </p>
              </div>

              {/* Shipping Method */}
              <div>
                <h4 className="font-semibold mb-2 text-gray-700">
                  Shipping method
                </h4>
                <p className="text-gray-600 text-sm">
                  {order.shippingMethod || "Free Shipping"}
                </p>
              </div>

            </div>
          </div>

          {/* CONTINUE SHOPPING BUTTON */}
          <div className="flex gap-4">
            <Link to="/">
              <button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-900">
                Continue shopping
              </button>
            </Link>
          </div>
        </div>

        {/* RIGHT SECTION – ORDER SUMMARY */}
        <div className="bg-white rounded-xl shadow p-6 h-fit">
          <h3 className="text-xl font-semibold mb-4">Order Summary</h3>

          {/* ITEM LIST */}
          {order.items?.map((item, index) => (
            <div key={index} className="flex gap-4 border-b pb-4 mb-4">
              <img
                src={item.image || item.productImage || fallbackImage}
                alt={item.name || item.productName}
                className="w-20 h-20 rounded-md object-cover border"
                onError={(e) => (e.target.src = fallbackImage)}
              />

              <div className="flex-1">
                <p className="font-medium text-gray-800">
                  {item.name || item.productName}
                </p>
                <p className="text-gray-500 text-sm">Qty: {item.qty || item.quantity}</p>
              </div>

              <p className="font-semibold text-gray-800">₹{item.price}</p>
            </div>
          ))}

          {/* TOTAL SUMMARY */}
          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between text-gray-600">
              <p>Subtotal</p>
              <p>₹{order.subtotal}</p>
            </div>

            <div className="flex justify-between text-gray-600">
              <p>Shipping</p>
              <p>FREE</p>
            </div>

            <div className="flex justify-between text-xl font-bold mt-4">
              <p>Total</p>
              <p>₹{order.total}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
