import { useNavigate } from "react-router-dom";

const OrderCard = ({ order }) => {
  const navigate = useNavigate();

  if (!order) return null;

  const firstItem = order.items?.[0];
  const totalItems = order.items?.length || 0;

  // Status color mapping
  const statusStyles = {
    pending: "bg-yellow-100 text-yellow-700",
    processing: "bg-blue-100 text-blue-700",
    delivered: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
  };

  return (
    <div
      onClick={() => navigate(`/orders/${order._id}`)}
      className="flex gap-4 border rounded-xl p-4 cursor-pointer hover:shadow-md transition-all duration-200"
    >
      {/* Product Image */}
      <div className="w-20 h-20 flex-shrink-0">
        <img
          src={firstItem?.productImage}
          alt={firstItem?.productName || "product"}
          className="w-full h-full object-cover rounded-lg border"
        />
      </div>

      {/* Order Info */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <p className="text-sm font-semibold text-gray-800">
            {order.orderNumber}
          </p>

          <p className="text-xs text-gray-500">
            {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div className="mt-1 text-sm text-gray-600">
          {totalItems} item{totalItems > 1 ? "s" : ""}
        </div>

        <div className="font-semibold text-sm text-gray-900">
          ₹{order.totalAmount}
        </div>
      </div>

      {/* Status */}
      <div className="flex items-center">
        <span
          className={`text-xs px-3 py-1 rounded-full capitalize ${
            statusStyles[order.status] || "bg-gray-100 text-gray-600"
          }`}
        >
          {order.status}
        </span>
      </div>
    </div>
  );
};

export default OrderCard;