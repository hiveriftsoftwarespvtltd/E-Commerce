import React, { useEffect, useState } from "react";
import { useFilter } from "../context/FilterContext";
import { useCart } from "../context/CartContext";
import SidebarFilter from "../components/Filters/SidebarFilter";
import FilterHeader from "../components/Filters/FilterHeader";
import { useSearch } from "../context/SearchContext";

export default function Homeessentials() {
  const {
    isFilterOpen,
    setIsFilterOpen,
    setAllProducts,
    filteredProducts,
    setFilteredProducts,

  } = useFilter();

  const { addItem } = useCart();
  const { setAllWebsiteProducts } = useSearch();

  // ⭐ HOME ESSENTIALS PRODUCTS
  const products = [
    {
      id: 701,
      title: "Ceramic Kitchen Container",
      originalPrice: 1499,
      salePrice: 999,
      discount: "-33%",
      category: "Home Essentials",
      images: [
        "https://www.earthstore.in/cdn/shop/files/12_340x.png?v=1735294749",
        "https://www.earthstore.in/cdn/shop/files/category_images_5_340x.png?v=1735362242",
      ],
    },
    {
      id: 702,
      title: "Premium Cookware Bowl",
      originalPrice: 1999,
      salePrice: 1399,
      discount: "-30%",
      category: "Home Essentials",
      images: [
        "https://www.earthstore.in/cdn/shop/files/m_cookware_1170x.progressive.png.jpg?v=1735123030",
        "https://www.earthstore.in/cdn/shop/files/11_340x.png?v=1735294749",
      ],
    },
    {
      id: 703,
      title: "Kitchen Organizer Box",
      originalPrice: 1299,
      salePrice: 899,
      discount: "-31%",
      category: "Home Essentials",
      images: [
        "https://www.earthstore.in/cdn/shop/files/category_images_3_340x.png?v=1735296280",
        "https://www.earthstore.in/cdn/shop/files/2_cf4ebcb8-034f-4fc7-b3e7-b10eef24217f_570x.progressive.png.jpg?v=1735121464",
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

      {/* SIDEBAR FILTER */}
      <SidebarFilter
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />

      {/* FILTER HEADER */}
      <FilterHeader total={filteredProducts.length} />

      {/* PRODUCT GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-5 gap-8 mb-10 mt-10">
        {filteredProducts.map((p) => (
          <HomeCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}

/* ---------------- PRODUCT CARD ---------------- */
function HomeCard({ product }) {
  const { addItem } = useCart();
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="group bg-white rounded-xl shadow hover:shadow-xl transition p-3 overflow-hidden">

      {/* IMAGE */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.images[activeIndex]}
          alt={product.title}
          className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
        />

        {/* DISCOUNT */}
        <div className="absolute top-3 left-3">
          <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">
            {product.discount}
          </span>
        </div>

        {/* INDICATORS */}
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
        className="mt-3 w-full bg-teal-500 text-white py-2 rounded hover:bg-teal-600 transition"
      >
        Add to Cart
      </button>
    </div>
  );
}
