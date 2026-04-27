// src/components/CartDrawer.jsx
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { Minus, Plus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import fallbackImage from "../assets/jars.png";
export default function CartDrawer({ isOpen, onClose }) {
  const { cart, addItem, removeItem,decreaseItem } = useCart();
  const [coupon, setCoupon] = useState("");
  const [couponMsg, setCouponMsg] = useState("");
  const [checkoutWarning, setCheckoutWarning] = useState(false);
  const navigate = useNavigate()
  
  // ----- price helpers -----

  // const totalMRP = cart.reduce(
  //   (s, i) => s + (i.salePrice || i.originalPrice) * i.quantity,
  //   0
  // );
  // const discountMRP = cart.reduce(
  //   (s, i) => s + ((i.originalPrice || i.salePrice) - i.salePrice) * i.quantity,
  //   0
  // );

 const totalMRP = cart.reduce((sum, item) => {
  const price = item.price ?? item.salesPrice ?? 0;
  return sum + price * item.quantity;
}, 0);

const discountMRP = cart.reduce((sum, item) => {
  const original = item.price ?? item.salesPrice ?? 0;
  const sale = item.salesPrice ?? original;

  return sum + Math.max(original - sale, 0) * item.quantity;
}, 0);
  // const platformFee = 23;
  const couponDiscount = couponMsg?.type === "valid" ? 100 : 0;
  const totalAmount = totalMRP - discountMRP - couponDiscount;

  const applyCoupon = () => {
    if (!coupon.trim())
      return setCouponMsg({ type: "error", text: "Enter code" });
    if (coupon.toUpperCase() === "FIRST100") {
      setCouponMsg({ type: "valid", text: "₹100 OFF applied!" });
    } else {
      setCouponMsg({ type: "error", text: "Invalid coupon" });
    }
  };

  // ★ FIXED VERSION ★
  // const decrease = (item) => {
  //   decreaseItem({ id: item._id, quantity: -1 });
  // };

  // const increase = (item) => {
  //   addItem({ id: item._id, quantity: 1 });
  // };

  console.log("Cart in line 59",cart)

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`pb-[50px] md:pb-0 fixed top-0 right-0 h-screen w-full sm:w-96 bg-white shadow-xl transform transition-transform duration-300 z-50 flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <button onClick={onClose} className="text-gray-600 text-xl cursor-pointer">
            ×
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cart.length === 0 ? (
            <p className="text-center mt-20 text-gray-500">
              Your cart is empty
            </p>
          ) : (
            cart?.map((item) => (
              <div key={item._id} className="flex gap-3 border rounded-lg p-3 cursor-pointer" onClick={()=>navigate(`/product/${item.id}`)}>
                <img
                  src={item.image || fallbackImage}
                  onError={(e) => (e.target.src = fallbackImage)}
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded"
                />

                <div className="flex-1">
                  <h3 className="font-semibold text-sm line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm">₹{item.price}</p>

                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={(e) => {
                        console.log("Cart in line 112",item)
                        e.stopPropagation()
                        decreaseItem(item)}}
                      className="p-1 border rounded hover:bg-gray-100"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="px-2">{item.quantity}</span>
                    <button
                      onClick={(e) => {
                        
                        e.stopPropagation()
                        addItem(item)}}
                      className="p-1 border rounded hover:bg-gray-100"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    removeItem(item._id)}}
                  className="text-red-500 text-xs hover:underline"
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t space-y-4 bg-white">
          {/* Coupon */}
          {/* <div className="space-y-1">
            <p className="text-sm text-gray-700">
              Login to get up to ₹200 OFF on first order
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter coupon code"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                className="flex-1 border p-2 rounded text-sm"
              />
              <button
                onClick={applyCoupon}
                className="bg-black text-white px-4 py-2 rounded hover:bg-gray-900 text-sm"
              >
                Apply
              </button>
            </div>
            {couponMsg && (
              <p
                className={`text-xs ${
                  couponMsg.type === "valid" ? "text-green-600" : "text-red-600"
                }`}
              >
                {couponMsg.text}
              </p>
            )}
          </div> */}

          {/* Price Details */}
        {/* Footer */}


  {/* If cart is empty -> show only message */}
  {cart.length === 0 ? (
    <p className="text-center text-gray-500 text-lg py-6">
      Your shopping bag is empty.
    </p>
  ) : (
    <>
      {/* Price Details */}
      <div className="border-t pt-2 space-y-1 text-sm">
        <div className="flex justify-between">
          <span>Total MRP:</span>
          <span>₹{totalMRP}</span>
        </div>

        <div className="flex justify-between">
          <span>Discount on MRP:</span>
          <span className="text-green-600">-₹{discountMRP}</span>
        </div>

        <div className="flex justify-between">
          <span>Coupon Discount:</span>
          <span className="text-green-600">-₹{couponDiscount}</span>
        </div>

        <div className="flex justify-between font-semibold border-t pt-2 text-base">
          <span>Total Amount:</span>
          <span>₹{totalAmount}</span>
        </div>
      </div>

      {/* Checkout Button */}
      <button
        onClick={() => {
          onClose();
          navigate('/checkout');
        }}
        className="btn rounded-lg w-full"
      >
        PLACE ORDER
      </button>
    </>
  )}
</div>

      </div>
    </>
  );
}
