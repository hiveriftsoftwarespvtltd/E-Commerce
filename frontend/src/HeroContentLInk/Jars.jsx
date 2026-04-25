import React, { useEffect, useState } from "react";
import { useFilter } from "../context/FilterContext";
import { useCart } from "../context/CartContext";
import SidebarFilter from "../components/Filters/SidebarFilter";
import FilterHeader from "../components/Filters/FilterHeader";
import { useSearch } from "../context/SearchContext";

export default function Jars() {
  const {
    isFilterOpen,
    setIsFilterOpen,
    setAllProducts,
    filteredProducts,
    setFilteredProducts,
  } = useFilter();

  const { addItem } = useCart();
  const { setAllWebsiteProducts } = useSearch();

  // ⭐ JARS PRODUCTS
  const products = [
    {
      id: 601,
      title: "Airtight Storage Jar",
      originalPrice: 799,
      salePrice: 499,
      discount: "-38%",
      category: "Jars",
      images: [
        "https://www.earthstore.in/cdn/shop/files/8_c792728e-19cd-47f4-a96a-facf1a5f2b43_340x.png?v=1735294749",
        "https://www.earthstore.in/cdn/shop/files/category_images_5_340x.png?v=1735362242",
      ],
    },
    {
      id: 602,
      title: "Glass Kitchen Jar",
      originalPrice: 999,
      salePrice: 649,
      discount: "-35%",
      category: "Jars",
      images: [
        "https://www.earthstore.in/cdn/shop/files/2_cf4ebcb8-034f-4fc7-b3e7-b10eef24217f_570x.progressive.png.jpg?v=1735121464",
        "https://www.earthstore.in/cdn/shop/files/8_c792728e-19cd-47f4-a96a-facf1a5f2b43_340x.png?v=1735294749",
      ],
    },
    {
      id: 603,
      title: "Ceramic Storage Jar",
      originalPrice: 1299,
      salePrice: 899,
      discount: "-31%",
      category: "Jars",
      images: [
        "https://www.earthstore.in/cdn/shop/files/category_images_3_340x.png?v=1735296280",
        "https://www.earthstore.in/cdn/shop/files/8_c792728e-19cd-47f4-a96a-facf1a5f2b43_340x.png?v=1735294749",
      ],
    },
  ];

  // ⭐ Load on mount
  useEffect(() => {
    setAllProducts(products);
    setFilteredProducts(products);
    setAllWebsiteProducts(products);
  }, []);

  return (
    <div className="w-full relative">

      {/* Sidebar */}
      <SidebarFilter
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />

      {/* Header */}
      <FilterHeader total={filteredProducts.length} />

      {/* Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-5 gap-8 mb-10 mt-10">
        {filteredProducts.map((p) => (
          <JarCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}

/* ---------------- CARD -------------------- */
function JarCard({ product }) {
  const { addItem } = useCart();
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="group bg-white rounded-xl shadow hover:shadow-xl transition p-3 overflow-hidden">

      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.images[activeIndex]}
          alt={product.title}
          className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
        />

        {/* Discount */}
        <div className="absolute top-3 left-3">
          <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">
            {product.discount}
          </span>
        </div>

        {/* Dots */}
        {product.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
            {product.images.map((_, i) => (
              <div
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`w-3 h-3 rounded-full cursor-pointer ${
                  activeIndex === i ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <h3 className="text-lg font-semibold mt-3">{product.title}</h3>

      <div className="flex gap-2 items-center mt-1">
        <span className="text-xl font-bold">₹{product.salePrice}</span>
        <span className="line-through text-gray-500">
          ₹{product.originalPrice}
        </span>
      </div>

      <button
        onClick={() =>
          addItem(product)
        }
        className="mt-3 w-full bg-teal-500 text-white py-2 rounded hover:bg-teal-600 transition"
      >
        Add to Cart
      </button>
    </div>
  );
}
