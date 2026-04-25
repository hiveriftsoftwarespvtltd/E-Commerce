import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useFilter } from "../context/FilterContext";
import SidebarFilter from "../components/Filters/SidebarFilter";
import FilterHeader from "../components/Filters/FilterHeader";
import { useSearch } from "../context/SearchContext";


const IMG1 =
  "https://www.earthstore.in/cdn/shop/files/Gold_Harvester_Farmer_3_-_The_Earth_Store_-_-_-2300465_605x.progressive.jpg?v=1724153805";

const IMG2 =
  "https://www.earthstore.in/cdn/shop/files/Gold_Harvester_Farmer_3_-_The_Earth_Store_-_-_-2300468_605x.jpg?v=1724153805";

const Bowl = () => {
  const {     isFilterOpen,
    setIsFilterOpen,
    setAllProducts,
    filteredProducts,
    setFilteredProducts, } =
    useFilter();
  const { addItem } = useCart();
  const { setAllWebsiteProducts } = useSearch();
  // ---- PRODUCTS LIST (Change for every page) ----
  const products = [
    {
      id: 1,
      title: "Premium Bowl Set",
      originalPrice: 1499,
      salePrice: 899,
      discount: "-40%",
      images: [IMG1, IMG2],
    },
    {
      id: 2,
      title: "Kitchen Serving Bowl",
      originalPrice: 1299,
      salePrice: 799,
      discount: "-38%",
      images: [IMG1, IMG2],
    },
    {
      id: 3,
      title: "Decorative Soup Bowl",
      originalPrice: 999,
      salePrice: 599,
      discount: "-45%",
      images: [IMG1, IMG2],
    },
  ];

  useEffect(() => {
    setFilteredProducts(products);
    setAllProducts(products);
    setAllWebsiteProducts(products);
  }, []);

  return (
    <div className="px-4 py-6">

      {/* Sidebar Filter */}
      <SidebarFilter isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} />

      {/* Filter Header */}
      <FilterHeader total={filteredProducts.length} />

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-5 gap-8 mt-10 mb-10">
        {filteredProducts.map((p) => (
          <ProductCard product={p} key={p.id} />
        ))}
      </div>
    </div>
  );
};


// ================= PRODUCT CARD =================
function ProductCard({ product }) {
  const { addItem } = useCart();
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="group bg-white rounded-xl shadow hover:shadow-xl transition p-3 overflow-hidden">

      {/* IMAGE */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.images[currentIndex]}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition"
        />

        <div className="absolute top-3 left-3 bg-red-600 text-white text-xs px-2 py-1 rounded">
          {product.discount}
        </div>

        {/* DOT INDICATORS */}
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

      {/* DETAILS */}
      <h3 className="text-lg font-semibold mt-3">{product.title}</h3>

      <div className="flex items-center gap-2 mt-1">
        <span className="text-xl font-bold">₹{product.salePrice}</span>
        <span className="text-gray-500 line-through">₹{product.originalPrice}</span>
      </div>

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

export default Bowl;
