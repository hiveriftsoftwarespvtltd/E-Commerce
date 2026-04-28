import { api } from "@/utils/axios-interceptor";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UserOrderDetails = () => {
  const { orderId } = useParams();
  const [orderDetails,setOrderDetails] = useState(null)

  const fetchOrderDetails = async()=>{
    try {
      const response = await api.get(`/orders/${orderId}`)
      if(response.data.success){
        setOrderDetails(response.data.result)
      }
    } catch (error) {
      console.error("Fetch Order Details Error",error)
    }
  }

  useEffect(()=>{
    if(orderId){
      fetchOrderDetails()
    }
    
  },[orderId])


  // const order = orders.find((o) => o._id === orderId);

  if (!orderDetails) return <p>Order not found</p>;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6 border-b pb-4">
        <h2 className="text-xl font-semibold">
          {orderDetails.orderNumber}
        </h2>
        <p className="text-gray-500 text-sm">
          {new Date(orderDetails.createdAt).toLocaleString()}
        </p>

        <div className="mt-2 flex gap-4 text-sm">
          <span>Status: {orderDetails.status}</span>
          <span>Payment: {orderDetails.paymentMethod}</span>
        </div>
      </div>

      {/* Items */}
      <div className="space-y-4">
        {orderDetails.items.map((item) => (
          <div
            key={item._id}
            className="flex gap-4 border rounded-lg p-3"
          >
            <img
              src={item.productImage}
              alt={item.productName}
              className="w-24 h-24 object-cover rounded-md"
            />

            <div className="flex-1">
              <p className="font-medium">
                {item.productName}
              </p>

              <p className="text-sm text-gray-500">
                SKU: {item.sku}
              </p>

              <p className="text-sm">
                Quantity: {item.quantity}
              </p>

              <p className="font-semibold">
                ₹{item.price}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-6 border-t pt-4 text-sm">
        <p>Subtotal: ₹{orderDetails.subtotal}</p>
        <p>Shipping: ₹{orderDetails.shipping}</p>
        <p>Tax: ₹{orderDetails.tax}</p>
        <p className="font-semibold text-lg">
          Total: ₹{orderDetails.totalAmount}
        </p>
      </div>

      {/* Address */}
      <div className="mt-6 text-sm">
        <h3 className="font-semibold mb-1">Shipping Address</h3>
        <p>{orderDetails.shippingAddress.street}</p>
        <p>{orderDetails.shippingAddress.city}</p>
        <p>{orderDetails.shippingAddress.country}</p>
      </div>
    </div>
  );
};

export default UserOrderDetails;