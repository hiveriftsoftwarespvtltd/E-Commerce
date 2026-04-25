import React from "react";
import { useFilter } from "../../context/FilterContext";

const ShopProducts = () => {
  const { products } = useFilter(); // <<< IMPORTANT

  if (!products || products.length === 0) {
    return <p>No products found.</p>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((item) => (
        <div key={item.id} className="border rounded p-2">
          <img src={item.image} alt={item.name} className="w-full rounded" />
          <h3 className="font-semibold mt-2">{item.name}</h3>
          <p className="text-gray-600">₹{item.price}</p>
        </div>
      ))}
    </div>
  );
};

export default ShopProducts;
