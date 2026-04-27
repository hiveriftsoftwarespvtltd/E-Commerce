import { useNavigate } from "react-router-dom";

const OrdersTab = ({ userProfileData }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-lg p-6 rounded-2xl border">
      <h2 className="text-xl font-semibold mb-4">My Orders</h2>

      {userProfileData?.orders?.length === 0 ? (
        <p className="text-gray-500">No orders found</p>
      ) : (
        <div className="max-h-[500px] overflow-y-auto space-y-4 pr-2">
          {userProfileData.orders.map((order) => {
            const firstItem = order.items?.[0];

            return (
              <div
                key={order._id}
                onClick={() => navigate(`/orders/${order._id}`)}
                className="flex gap-4 border rounded-xl p-3 cursor-pointer hover:shadow-md transition"
              >
                {/* Product Image */}
                <img
                  src={firstItem?.productImage}
                  alt="product"
                  className="w-20 h-20 object-cover rounded-lg"
                />

                {/* Order Info */}
                <div className="flex-1">
                  <p className="text-sm font-semibold">
                    {order.orderNumber}
                  </p>

                  <p className="text-xs text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>

                  <p className="text-sm text-gray-600">
                    {order.items.length} items
                  </p>

                  <p className="font-semibold text-sm">
                    ₹{order.totalAmount}
                  </p>
                </div>

                {/* Status */}
                <div className="flex items-center">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      order.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : order.status === "processing"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OrdersTab;