import React, { useEffect, useState } from "react";
import { useFilter } from "../context/FilterContext";
import { useCart } from "../context/CartContext";

import SidebarFilter from "../components/Filters/SidebarFilter";
import FilterHeader from "../components/Filters/FilterHeader";
import { useSearch } from "../context/SearchContext";

export default function Womenaccessories() {
  const { isFilterOpen, setIsFilterOpen, setAllProducts, filteredProducts, setFilteredProducts } = useFilter();
  const { addItem } = useCart();
  const { setAllWebsiteProducts } = useSearch();

  // 🔥 WOMEN ACCESSORIES PRODUCTS
  const products = [
    {
      id: 1,
      title: "Elegant Gold Pendant",
      originalPrice: 1299,
      salePrice: 799,
      discount: "-38%",
      category: "Pendant",
      inStock: true,
      images: [
        "https://www.earthstore.in/cdn/shop/files/pendant_1_605x.jpg",
        "https://www.earthstore.in/cdn/shop/files/pendant_2_605x.jpg",
      ],
    },
    {
      id: 2,
      title: "Classic Silver Earrings",
      originalPrice: 899,
      salePrice: 499,
      discount: "-44%",
      category: "Earrings",
      inStock: true,
      images: [
        "https://www.earthstore.in/cdn/shop/files/earrings1_605x.jpg",
        "https://www.earthstore.in/cdn/shop/files/earrings2_605x.jpg",
      ],
    },
    {
      id: 3,
      title: "Handmade Bracelet",
      originalPrice: 699,
      salePrice: 399,
      discount: "-42%",
      category: "Bracelet",
      inStock: false,
      images: [
        "https://www.earthstore.in/cdn/shop/files/bracelet1_605x.jpg",
        "https://www.earthstore.in/cdn/shop/files/bracelet2_605x.jpg",
      ],
    },
  ];

  // ⭐ LOAD PRODUCTS INTO FILTER CONTEXT
  useEffect(() => {
    setAllProducts(products);
    setFilteredProducts(products);
    setAllWebsiteProducts(products);
  }, []);

  return (
    <div className="w-full relative">
      {/* SIDEBAR FILTER */}
      <SidebarFilter isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} />

      {/* FILTER HEADER */}
      <FilterHeader total={filteredProducts.length} />

      {/* PRODUCTS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-5 gap-8 mb-10 mt-10">
        {filteredProducts.map((p, index) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------- PRODUCT CARD ---------------------------------- */
function ProductCard({ product }) {
  const { addItem } = useCart();
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="group bg-white rounded-xl shadow hover:shadow-xl transition p-3 overflow-hidden">

      {/* PRODUCT IMAGE */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.images[currentIndex]}
          className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
          alt={product.title}
        />

        {/* DISCOUNT TAG */}
        <div className="absolute top-3 left-3">
          <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">
            {product.discount}
          </span>
        </div>

        {/* IMAGE DOTS */}
        {product.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
            {product.images.map((_, idx) => (
              <div
                key={idx}
                className={`w-3 h-3 rounded-full cursor-pointer ${
                  currentIndex === idx ? "bg-white" : "bg-white/50"
                }`}
                onClick={() => setCurrentIndex(idx)}
              />
            ))}
          </div>
        )}
      </div>

      {/* DETAILS */}
      <h3 className="text-lg font-semibold mt-3">{product.title}</h3>

      <div className="flex gap-2 items-center mt-1">
        <span className="text-xl font-bold">₹{product.salePrice}</span>
        <span className="line-through text-gray-500">₹{product.originalPrice}</span>
      </div>

      {/* ADD TO CART */}
      <button
        onClick={() =>
          addItem(product)
        }
        className="mt-3 w-full bg-teal-500 text-white py-2 rounded hover:bg-teal-600 flex items-center justify-center gap-2"
      >
        Add to Cart
      </button>
    </div>
  );
}
