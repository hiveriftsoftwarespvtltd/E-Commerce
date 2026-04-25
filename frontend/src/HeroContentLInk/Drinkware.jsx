import React, { useEffect, useState } from "react";
import { useFilter } from "../context/FilterContext";
import { useCart } from "../context/CartContext";
import SidebarFilter from "../components/Filters/SidebarFilter";
import FilterHeader from "../components/Filters/FilterHeader";
import { useSearch } from "../context/SearchContext";

export default function Drinkware() {
  const {
    isFilterOpen,
    setIsFilterOpen,
    setAllProducts,
    filteredProducts,
    setFilteredProducts,
  } = useFilter();

  const { setAllWebsiteProducts } = useSearch();
  const { addItem } = useCart();

  // Drinkware Products
  const products = [
    {
      id: 401,
      title: "Premium Glass Set",
      originalPrice: 1299,
      salePrice: 799,
      discount: "-38%",
      category: "Drinkware",
      images: [
        "https://www.earthstore.in/cdn/shop/files/Glassware_-_Glass_Online_Drinking_Glasses_Drinkware_94975709-5c5e-4f5c-a9f8-1f6fac59744a_340x.png?v=1739525967",
        "https://www.earthstore.in/cdn/shop/files/category_images_3_340x.png?v=1735296280",
      ],
    },
    {
      id: 402,
      title: "Ceramic Coffee Mug",
      originalPrice: 599,
      salePrice: 349,
      discount: "-42%",
      category: "Drinkware",
      images: [
        "https://www.earthstore.in/cdn/shop/files/best_ceramic_mugs_340x.png?v=1736142272",
        "https://www.earthstore.in/cdn/shop/files/ceramic_tea_sups_340x.png?v=1736142207",
      ],
    },
    {
      id: 403,
      title: "Luxury Cup Set",
      originalPrice: 999,
      salePrice: 599,
      discount: "-40%",
      category: "Drinkware",
      images: [
        "https://www.earthstore.in/cdn/shop/files/5_93ed8b83-8b4c-46c5-b1b0-f9656fb95eb6_340x.png?v=1735294749",
        "https://www.earthstore.in/cdn/shop/files/category_images_5_340x.png?v=1735362242",
      ],
    },
  ];

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

      {/* Filter Header */}
      <FilterHeader total={filteredProducts.length} />

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-5 gap-8 mb-10 mt-10">
        {filteredProducts.map((product) => (
          <DrinkwareCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

/* -------------------- CARD -------------------- */
function DrinkwareCard({ product }) {
  const { addItem } = useCart();
  const [activeImg, setActiveImg] = useState(0);

  return (
    <div className="group bg-white rounded-xl shadow hover:shadow-xl transition p-3 overflow-hidden">

      {/* IMAGE */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.images[activeImg]}
          alt={product.title}
          className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
        />

        {/* DISCOUNT */}
        <div className="absolute top-3 left-3">
          <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">
            {product.discount}
          </span>
        </div>

        {/* DOT SWITCHER */}
        {product.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
            {product.images.map((_, index) => (
              <div
                key={index}
                onClick={() => setActiveImg(index)}
                className={`w-3 h-3 cursor-pointer rounded-full ${
                  activeImg === index ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* TITLE */}
      <h3 className="text-lg font-semibold mt-3">{product.title}</h3>

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
        className="mt-3 w-full bg-teal-500 text-white py-2 rounded hover:bg-teal-600 flex items-center justify-center"
      >
        Add to Cart
      </button>
    </div>
  );
}
