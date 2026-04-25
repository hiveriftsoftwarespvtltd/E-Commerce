import React from "react";
import { Truck, CheckCircle, Package, MapPin, Phone, CreditCard } from "lucide-react";

export default function UserOrderDetails() {
  const order = {
    id: "OD20250123356789",
    status: "Delivered",
    orderedDate: "13 Nov, 2025",
    deliveredDate: "17 Nov, 2025",
    payment: "UPI / Razorpay",
    total: 899,
    address: {
      name: "Shahbaz",
      phone: "+91 7860999955",
      full: "B-24, Main Market Street, Delhi, India - 110006",
    },
    product: {
      title: "Gold Harvester Farmer Statue 3",
      price: 649,
      qty: 1,
      image:
        "https://cdn.shopify.com/s/files/1/0260/5937/4685/files/Gold_Harvester_Farmer_3_-_The_Earth_Store_-_-_-2300465_64x64.jpg?v=1724153805",
    },
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8">

      {/* Order Heading */}
      <div className="bg-white shadow p-4 rounded-lg border mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Order Details</h2>
        <p className="text-sm text-gray-600 mt-1">
          Order ID: <span className="font-medium">{order.id}</span>
        </p>
      </div>

      {/* Order Timeline */}
      <div className="bg-white shadow p-4 rounded-lg border mb-6">
        <h3 className="text-lg font-semibold mb-4">Order Status</h3>

        <div className="flex items-center justify-between">
          <div className="flex flex-col items-center">
            <CheckCircle className="text-green-600 w-6 h-6" />
            <span className="text-xs mt-1 text-green-600 font-medium">Ordered</span>
            <span className="text-[10px] text-gray-500">{order.orderedDate}</span>
          </div>

          <div className="flex-1 border-t border-dashed mx-1"></div>

          <div className="flex flex-col items-center">
            <Package className="text-green-600 w-6 h-6" />
            <span className="text-xs mt-1 text-green-600 font-medium">Shipped</span>
          </div>

          <div className="flex-1 border-t border-dashed mx-1"></div>

          <div className="flex flex-col items-center">
            <Truck className="text-green-600 w-6 h-6" />
            <span className="text-xs mt-1 text-green-600 font-medium">Delivered</span>
            <span className="text-[10px] text-gray-500">{order.deliveredDate}</span>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="bg-white shadow p-4 rounded-lg border mb-6">
        <h3 className="text-lg font-semibold mb-4">Product Details</h3>

        <div className="flex items-center gap-4">
          <img
            src={order.product.image}
            alt={order.product.title}
            className="w-20 h-20 rounded-lg border"
          />
          <div>
            <h4 className="font-medium">{order.product.title}</h4>
            <p className="text-sm text-gray-600">
              Qty: <strong>{order.product.qty}</strong>
            </p>
            <p className="text-lg font-semibold text-gray-900 mt-1">₹{order.product.price}</p>
          </div>
        </div>
      </div>

      {/* Address & Payment */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

        {/* Delivery Address */}
        <div className="bg-white shadow p-4 rounded-lg border">
          <h3 className="text-lg font-semibold mb-3">Delivery Address</h3>

          <div className="flex items-start gap-2">
            <MapPin className="text-gray-700 mt-1" />
            <div>
              <p className="font-medium">{order.address.name}</p>
              <p className="text-sm text-gray-600">{order.address.full}</p>
              <div className="flex items-center gap-2 text-sm mt-1">
                <Phone className="w-4 h-4" />
                {order.address.phone}
              </div>
            </div>
          </div>
        </div>

        {/* Payment */}
        <div className="bg-white shadow p-4 rounded-lg border">
          <h3 className="text-lg font-semibold mb-3">Payment Info</h3>

          <div className="flex items-center gap-2">
            <CreditCard className="text-gray-700" />
            <span className="text-sm font-medium">{order.payment}</span>
          </div>
        </div>
      </div>

      {/* Price Summary */}
      <div className="bg-white shadow p-4 rounded-lg border mb-6">
        <h3 className="text-lg font-semibold mb-4">Price Summary</h3>

        <div className="flex justify-between text-sm mb-2">
          <span>Item Total</span>
          <span>₹{order.product.price}</span>
        </div>

        <div className="flex justify-between text-sm mb-2">
          <span>Delivery Fee</span>
          <span className="text-green-600 font-medium">Free</span>
        </div>

        <div className="flex justify-between font-semibold text-base border-t pt-2">
          <span>Paid Amount</span>
          <span>₹{order.total}</span>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="flex gap-3">
        <button className="border border-gray-400 px-4 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-100">
          Download Invoice
        </button>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">
          Need Help?
        </button>
      </div>
    </div>
  );
}
