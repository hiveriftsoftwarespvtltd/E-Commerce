// src/Decors/TableDecor.jsx
import { useFilter } from "../context/FilterContext";
import SidebarFilter from "../components/Filters/SidebarFilter";
import FilterHeader from "../components/Filters/FilterHeader";
import ResponsiveImage from "../TableDecorcontent/ResponsiveImage";
import { useState, useEffect } from "react";
import { useSearch } from "../context/SearchContext";
import { useCart } from "../context/CartContext";
import { Link, useParams } from "react-router-dom";

import BASE from "../config";

const GET_ALL_PRODUCTS = `${BASE.PRODUCT_BASE}/product-detail`;

export default function TableDecor() {
  const { id } = useParams(); // ⭐ subcategoryId from URL

  const {
    isFilterOpen,
    setIsFilterOpen,
    setAllProducts,
    filteredProducts,
    setFilteredProducts,
  } = useFilter();

  const { setAllWebsiteProducts } = useSearch();
  const { addItem } = useCart();

  const [imageIndex, setImageIndex] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(GET_ALL_PRODUCTS);
        const data = await res.json();

        if (Array.isArray(data.data)) {
          // ⭐ FILTER PRODUCTS BY SUBCATEGORY ID
          const filtered = data.data.filter(
            (p) => p.subcategoryId === id
          );

          setAllProducts(filtered);
          setFilteredProducts(filtered);
          setAllWebsiteProducts((prev) => [...prev, ...filtered]);

          setImageIndex(filtered.map(() => 0));
        }
      } catch (err) {
        console.log("Product fetch error:", err);
      }
    };

    fetchProducts();
  }, [id]);

  const addToCartHandler = (product) => {
    addItem(product);
  };

  return (
    <div className="px-4 py-6 md:px-0 md:py-0">
      <ResponsiveImage />

      <SidebarFilter
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />

      <div className="flex-1 min-h-screen">
        <FilterHeader total={filteredProducts.length} />

        <div className="mt-10 px-10 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {filteredProducts.map((product, i) => (
            <div
              key={product._id}
              className="group relative bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300"
            >

              {/* IMAGE CLICK WILL OPEN DETAILS */}
              <Link to={`/product/${product._id}`}>
                <div className="relative aspect-square bg-gray-100">
                  <img
                    src={product.imageUrls?.[imageIndex[i]]}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                    alt={product.Name}
                  />
                </div>
              </Link>

              <div className="p-5">

                <Link to={`/product/${product._id}`}>
                  <h3 className="text-lg font-medium text-gray-900 hover:text-teal-600 line-clamp-2 mb-3">
                    {product.Name}
                  </h3>
                </Link>

                <div className="flex items-center gap-3 mb-4">
                  <span className="text-sm text-gray-500 line-through">
                    ₹{product.Price}
                  </span>
                  <span className="text-2xl font-bold text-gray-900">
                    ₹{product.SalesPrice}
                  </span>
                </div>

                <button
                  onClick={() => addToCartHandler(product)}
                  className="w-full bg-teal-500 hover:bg-teal-600 text-white font-medium py-3.5 rounded-lg flex justify-center gap-2"
                >
                  ADD TO CART
                </button>

              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}
