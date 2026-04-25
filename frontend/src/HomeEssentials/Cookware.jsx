import React, { useEffect, useState } from "react";
import { useFilter } from "../context/FilterContext";
import { useCart } from "../context/CartContext";
import SidebarFilter from "../components/Filters/SidebarFilter";
import FilterHeader from "../components/Filters/FilterHeader";
import { useSearch } from "../context/SearchContext";


export default function Cookware() {
  const { isFilterOpen, setIsFilterOpen, setAllProducts, filteredProducts, setFilteredProducts } = useFilter();
  const { addItem } = useCart();
  const { setAllWebsiteProducts } = useSearch();
  // ⭐ COOKWARE PRODUCTS LIST
  const products = [
    {
      id: 501,
      title: "Non-Stick Deep Fry Pan",
      originalPrice: 1999,
      salePrice: 1499,
      discount: "-25%",
      category: "Cookware",
      images: [
        "https://images.unsplash.com/photo-1606857521015-7f589c0d30f9?w=600",
        "https://images.unsplash.com/photo-1606857521015-7f589c0d30f9?w=600&2",
      ],
      inStock: true,
    },
    {
      id: 502,
      title: "Premium Steel Kadhai",
      originalPrice: 2499,
      salePrice: 1699,
      discount: "-32%",
      category: "Cookware",
      images: [
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600",
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&2",
      ],
      inStock: true,
    },
    {
      id: 503,
      title: "Flat Non-Stick Tawa",
      originalPrice: 1499,
      salePrice: 899,
      discount: "-40%",
      category: "Cookware",
      images: [
        "https://images.unsplash.com/photo-1606857520997-abc3ef339a37?w=600",
        "https://images.unsplash.com/photo-1606857520997-abc3ef339a37?w=600&2",
      ],
      inStock: false,
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

      {/* Sidebar Filter */}
      <SidebarFilter
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />

      {/* Header */}
      <FilterHeader total={filteredProducts.length} />

      {/* PRODUCT LIST */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-5 gap-8 mb-10 mt-10">
        {filteredProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}

// ⭐ PRODUCT CARD COMPONENT
function ProductCard({ product }) {
  const { addItem } = useCart();
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="group bg-white rounded-xl shadow hover:shadow-xl transition p-3 overflow-hidden">

      {/* IMAGE */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.images[currentIndex]}
          className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
        />

        <div className="absolute top-3 left-3">
          <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">
            {product.discount}
          </span>
        </div>

        {/* small image selectors */}
        {product.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
            {product.images.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full cursor-pointer ${
                  currentIndex === index ? "bg-white" : "bg-white/50"
                }`}
                onClick={() => setCurrentIndex(index)}
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
