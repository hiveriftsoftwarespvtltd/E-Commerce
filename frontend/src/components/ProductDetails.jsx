import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import productData from "../../products.json";

import ProductImages from "../components/ProductImages";
import ProductReviews from "../components/ProductReviews";
import Suggestions from "./ProductSuggestions";
import ProductDetailsSkeleton from "./ProductDetailsSkeleton";
import { useSearch } from "@/context/SearchContext";

export default function ProductDetails() {
  const { id } = useParams();
  const { addItem, decreaseItem, cart,cartMap } = useCart();
  const {allWebsiteProducts} = useSearch()

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Find product
  console.log("All website products",allWebsiteProducts)
  useEffect(() => {
    if (!allWebsiteProducts?.length) return;
    setLoading(true);
    const found = allWebsiteProducts?.find(
      (item) => String(item._id) === String(id));
    setProduct(found || null);
    setLoading(false);
  }, [id,allWebsiteProducts]);

  // ✅ Derive quantity safely
  const cartItem = cartMap.get(id);
  const quantity = cartItem?.quantity || 0;


  if (loading) return <ProductDetailsSkeleton />;
  if (!product) return <div className="p-10">Product not found</div>;

  return (
    <div className="bg-gray-100 min-h-screen py-6 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* LEFT */}
        <div className="lg:col-span-4">
          <ProductImages images={product.imageUrls} />
        </div>

        {/* CENTER */}
        <div className="lg:col-span-5 bg-white p-6 rounded-lg shadow space-y-4 max-h-[460px] overflow-auto">
          <h1 className="text-xl font-semibold">{product.name}</h1>

          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold">₹{product.salesPrice}</span>
            <span className="line-through text-gray-500">
              ₹{product.price}
            </span>
            {/* <span className="text-green-600 font-semibold">
              {product.discount}
            </span> */}
          </div>

          <p className="text-green-600">
            {product.stock > 0 ? "In Stock" : "Out of Stock"}
          </p>

          <p className="text-gray-700 text-sm">{product.description}</p>

          <div className="text-sm text-gray-600">
            🚚 Delivery in {product.estimatedDeliveryDays || "7 days"} days
          </div>

          {/* <div className="text-sm">
            Shipping:{" "}
            {product.shipping.type === "free"
              ? "Free Delivery"
              : `₹${product.shipping.charge}`}
          </div> */}

          {/* <div className="text-sm">GST: {product.gstPercent}%</div> */}
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-3 bg-white p-6 shadow space-y-4 flex flex-col rounded-lg">
          <p className="text-2xl font-bold">₹{product.salesPrice}</p>

          <div className="flex items-center border rounded-lg overflow-hidden w-full max-w-[140px]">
            <button
              onClick={() => decreaseItem(product)}
              className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-lg font-bold cursor-pointer"
            >
              −
            </button>

            <span className="flex-1 text-center font-semibold text-lg">
              {quantity}
            </span>

            <button
              onClick={() => addItem(product)}
              className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-lg font-bold cursor-pointer"
            >
              +
            </button>
          </div>

          <button
            disabled={quantity !== 0}
            onClick={() => addItem(product)}
            className="w-full rounded-lg btn disabled:btn-disabled"
          >
            {quantity === 0 ? "Add to Cart" : "Added"}
          </button>

          <Link to="/checkout">
            <button className="w-full rounded-lg btn">Buy Now</button>
          </Link>
        </div>
      </div>

      {/* DESCRIPTION */}
      <div className="max-w-7xl mx-auto mt-6 bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-3">Description</h2>
        <p className="text-gray-700">{product.description}</p>
      </div>

      {/* REVIEWS */}
      <div className="max-w-7xl mx-auto mt-6 bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Customer Reviews</h2>
        <ProductReviews reviews={product.reviews} />
      </div>

      {/* SUGGESTIONS */}
      <div className="max-w-7xl mx-auto mt-6 bg-white p-6 rounded-lg shadow">
        <Suggestions items={allWebsiteProducts} />
      </div>
    </div>
  );
}