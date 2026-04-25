// src/Combo/MugSet.jsx
import React, { useState, useEffect } from "react";
import { useFilter } from "../context/FilterContext";
import { useCart } from "../context/CartContext";
import { useSearch } from "../context/SearchContext";

import SidebarFilter from "../components/Filters/SidebarFilter";
import FilterHeader from "../components/Filters/FilterHeader";
import { Link } from "react-router-dom";

export default function MugSet() {
  const {
    isFilterOpen,
    setIsFilterOpen,
    setAllProducts,
    filteredProducts,
    setFilteredProducts,
  } = useFilter();

  const { addItem } = useCart();
  const { setAllWebsiteProducts } = useSearch();

  // ⭐ PRODUCT LIST
  const products = [
    {
      id: 701,
      title: "Premium Coffee Mug Set (Pack of 6)",
      originalPrice: 1999,
      salePrice: 1299,
      discount: "-35%",
      category: "mug set",
      route: "/product/701",
      images: [
        "https://www.earthstore.in/cdn/shop/files/Solid_Multicolor_Coffee_Mug_Set_of_6_-_The_Earth_Store_-_-_-2304533_605x.progressive.jpg?v=1723312614",
        "https://www.earthstore.in/cdn/shop/files/Peaceful_Buddha_-_The_Earth_Store_-_-_-2302729_605x.jpg?v=1723307155",
      ],
    },
    {
      id: 702,
      title: "Matte Ceramic Mug Set of 4",
      originalPrice: 1499,
      salePrice: 899,
      discount: "-40%",
      category: "mug set",
      route: "/product/702",
      images: [
        "https://www.earthstore.in/cdn/shop/files/Gold_Harvester_Farmer_3_-_The_Earth_Store_-_-_-2300465_605x.progressive.jpg?v=1724153805",
        "https://www.earthstore.in/cdn/shop/files/Gold_Harvester_Farmer_3_-_The_Earth_Store_-_-_-2300468_605x.jpg?v=1724153805",
      ],
    },
    {
      id: 703,
      title: "Designer Mug Set (Pack of 2)",
      originalPrice: 999,
      salePrice: 599,
      discount: "-45%",
      category: "mug set",
      route: "/product/703",
      images: [
        "https://www.earthstore.in/cdn/shop/files/Peaceful_Buddha_-_The_Earth_Store_-_-_-2302726_605x.progressive.jpg?v=1723307155",
        "https://www.earthstore.in/cdn/shop/files/Solid_Multicolor_Coffee_Mug_Set_of_6_-_The_Earth_Store_-_-_-2304533_605x.progressive.jpg?v=1723312614",
      ],
    },
  ];

  // ⭐ Load products to context
  useEffect(() => {
    setAllProducts(products);
    setFilteredProducts(products);
    setAllWebsiteProducts((prev) => [...prev, ...products]);
  }, []);

  return (
    <div className="w-full px-4 py-6 relative">
      {/* Sidebar */}
      <SidebarFilter
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />

      {/* Header */}
      <FilterHeader total={filteredProducts.length} />

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-5 gap-8 mb-10 mt-10">
        {filteredProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}

/* ================= PRODUCT CARD (Same as Planter file) ================= */
function ProductCard({ product }) {
  const { addItem } = useCart();
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="group bg-white rounded-xl shadow hover:shadow-xl transition p-3 overflow-hidden">

      {/* IMAGE + LINK */}
      <Link to={product.route}>
        <div className="relative aspect-square bg-gray-100">
          <img
            src={product.images[currentIndex]}
            className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
            alt={product.title}
          />

          {/* DISCOUNT */}
          <span className="absolute top-3 left-3 bg-red-600 text-white text-xs px-2 py-1 rounded">
            {product.discount}
          </span>

          {/* DOTS SWITCH */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
            {product.images.map((_, i) => (
              <div
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-3 h-3 rounded-full cursor-pointer ${
                  currentIndex === i ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </Link>

      {/* TITLE */}
      <Link to={product.route}>
        <h3 className="text-lg font-semibold mt-3 hover:text-teal-600">
          {product.title}
        </h3>
      </Link>

      {/* PRICE */}
      <div className="flex gap-2 items-center mt-1">
        <span className="text-xl font-bold">₹{product.salePrice}</span>
        <span className="line-through text-gray-500">
          ₹{product.originalPrice}
        </span>
      </div>

      {/* ADD TO CART */}
      <button
        onClick={() =>
          addItem(product)
        }
        className="mt-3 w-full bg-teal-500 text-white py-2 rounded hover:bg-teal-600"
      >
        Add to Cart
      </button>
    </div>
  );
}
