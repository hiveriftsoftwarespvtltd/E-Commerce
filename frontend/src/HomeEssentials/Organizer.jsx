import React, { useEffect, useState } from "react";
import { useFilter } from "../context/FilterContext";
import { useCart } from "../context/CartContext";
import SidebarFilter from "../components/Filters/SidebarFilter";
import FilterHeader from "../components/Filters/FilterHeader";
import { useSearch } from "../context/SearchContext";

export default function Organizer() {
  const {
    isFilterOpen,
    setIsFilterOpen,
    setAllProducts,
    filteredProducts,
    setFilteredProducts,
  } = useFilter();

  const { addItem } = useCart();
  const { setAllWebsiteProducts } = useSearch();
  // ⭐ ORGANIZER PRODUCTS
  const products = [
    {
      id: 701,
      title: "3-Layer Multipurpose Shelf",
      originalPrice: 2499,
      salePrice: 1699,
      discount: "-32%",
      category: "Organizer",
      inStock: true,
      images: [
        "https://images.unsplash.com/photo-1589987599152-c8f801c53b45?w=600",
        "https://images.unsplash.com/photo-1589987599152-c8f801c53b45?w=600&2",
      ],
    },
    {
      id: 702,
      title: "Wooden Desk Organizer",
      originalPrice: 999,
      salePrice: 649,
      discount: "-35%",
      category: "Organizer",
      inStock: true,
      images: [
        "https://images.unsplash.com/photo-1556911220-e15b29be8c31?w=600",
        "https://images.unsplash.com/photo-1556911220-e15b29be8c31?w=600&2",
      ],
    },
    {
      id: 703,
      title: "Plastic Multipurpose Storage Box",
      originalPrice: 699,
      salePrice: 449,
      discount: "-36%",
      category: "Organizer",
      inStock: false,
      images: [
        "https://images.unsplash.com/photo-1593344489930-8d7b0e85dd54?w=600",
        "https://images.unsplash.com/photo-1593344489930-8d7b0e85dd54?w=600&2",
      ],
    },
  ];

  // ⭐ LOAD PRODUCTS INTO CONTEXT
  useEffect(() => {
    setAllProducts(products);
    setFilteredProducts(products);
    setAllWebsiteProducts(products);
  }, []);

  return (
    <div className="w-full relative">
      {/* FILTER SIDEBAR */}
      <SidebarFilter
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />

      {/* FILTER HEADER */}
      <FilterHeader total={filteredProducts.length} />

      {/* PRODUCT GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-5 gap-8 mb-10 mt-10">
        {filteredProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}

/* ---------------- PRODUCT CARD ---------------- */
function ProductCard({ product }) {
  const [currentImg, setCurrentImg] = useState(0);
  const { addItem } = useCart();

  return (
    <div className="group bg-white rounded-xl shadow hover:shadow-xl transition p-3 overflow-hidden">

      {/* IMAGE */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.images[currentImg]}
          alt={product.title}
          className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
        />

        <div className="absolute top-3 left-3">
          <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">
            {product.discount}
          </span>
        </div>

        {/* SWITCH INDICATORS */}
        {product.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
            {product.images.map((_, i) => (
              <div
                key={i}
                onClick={() => setCurrentImg(i)}
                className={`w-3 h-3 rounded-full cursor-pointer ${
                  currentImg === i ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* DETAILS */}
      <h3 className="text-lg font-semibold mt-3">{product.title}</h3>

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
