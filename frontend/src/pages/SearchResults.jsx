import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import BASE from "../config";
import { useCart } from "../context/CartContext";
import fallbackImage from "../assets/Jars.png";

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const [products, setProducts] = useState([]);

  const { addItem } = useCart();
  const [addedStatus, setAddedStatus] = useState({});

  useEffect(() => {
    if (query) fetchProducts();
  }, [query]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        `${BASE.PRODUCT_BASE}/product-detail/searchProducts?search=${query}`
      );
      const data = await response.json();

      if (data.success && Array.isArray(data.data)) {
        setProducts(data.data);
      }
    } catch (error) {
      console.log("Search Results Error", error);
    }
  };

  return (
    <div className="max-w-[1250px] mx-auto p-4">
      <h2 className="text-xl font-semibold mb-6">
        Search results for:{" "}
        <span className="text-amber-700">{query}</span>
      </h2>

      {/* PRODUCT GRID — Same UI as Subcategory Page */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => {
          const rawImg = product.imageUrls?.[0];
          const imageUrl =
            rawImg && rawImg.trim() !== ""
              ? `${BASE.BASE_URL}/${rawImg}`
              : fallbackImage;

          return (
            <div
              key={product._id}
              className="bg-white rounded-xl shadow p-4"
            >
              {/* Product Link */}
              <Link to={`/products/${product._id}`}>
                <img
                  src={imageUrl}
                  onError={(e) => {
                    if (e.target.src !== fallbackImage) {
                      e.target.onerror = null;
                      e.target.src = fallbackImage;
                    }
                  }}
                  className="w-full h-72 object-cover rounded-lg"
                  alt={product.Name}
                />

                <h3 className="text-lg font-semibold mt-3">
                  {product.Name}
                </h3>
              </Link>

              <p className="text-gray-500 line-through">₹{product.Price}</p>
              <p className="text-xl font-bold text-teal-700">
                ₹{product.SalesPrice}
              </p>

              {/* Add to Cart Button */}
              <button
                onClick={() => {
                  addItem(product);

                  // mark added
                  setAddedStatus((prev) => ({
                    ...prev,
                    [product._id]: true,
                  }));

                  setTimeout(() => {
                    setAddedStatus((prev) => ({
                      ...prev,
                      [product._id]: false,
                    }));
                  }, 2000);
                }}
                className={`mt-3 w-full py-2 rounded-lg font-semibold text-white transition-all duration-500 
                  ${
                    addedStatus[product._id]
                      ? "bg-green-600 scale-105"
                      : "bg-teal-500 hover:bg-teal-600"
                  }
                `}
              >
                {addedStatus[product._id] ? "Added ✓" : "Add to Cart"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
