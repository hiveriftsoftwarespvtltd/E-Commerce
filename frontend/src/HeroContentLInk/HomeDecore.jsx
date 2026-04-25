import React, { useEffect, useState } from "react";
import { useFilter } from "../context/FilterContext";
import { useCart } from "../context/CartContext";
import SidebarFilter from "../components/Filters/SidebarFilter";
import FilterHeader from "../components/Filters/FilterHeader";
import { useSearch } from "../context/SearchContext";

export default function HomeDecore() {
  const {
    isFilterOpen,
    setIsFilterOpen,
    setAllProducts,
    filteredProducts,
    setFilteredProducts,
  } = useFilter();

  const { setAllWebsiteProducts } = useSearch();

  const { addItem } = useCart();

  // Home Decor Products
  const products = [
    {
      id: 701,
      title: "Luxury Table Decor Piece",
      originalPrice: 1899,
      salePrice: 1299,
      discount: "-32%",
      category: "Home Decor",
      images: [
        "https://www.earthstore.in/cdn/shop/files/2_8ab2343e-4cd4-4c81-b8af-ffc0a90b6c75_340x.png?v=1735294750",
        "https://www.earthstore.in/cdn/shop/files/category_images_5_340x.png?v=1735362242",
      ],
    },
    {
      id: 702,
      title: "Ceramic Art Decor",
      originalPrice: 999,
      salePrice: 699,
      discount: "-30%",
      category: "Home Decor",
      images: [
        "https://www.earthstore.in/cdn/shop/files/3_446e9ba8-2077-48d3-95dd-5a42d9c3d7b3_340x.png?v=1735294749",
        "https://www.earthstore.in/cdn/shop/files/2_cf4ebcb8-034f-4fc7-b3e7-b10eef24217f_570x.progressive.png.jpg?v=1735121464",
      ],
    },
    {
      id: 703,
      title: "Modern Home Decor Set",
      originalPrice: 1399,
      salePrice: 899,
      discount: "-35%",
      category: "Home Decor",
      images: [
        "https://www.earthstore.in/cdn/shop/files/11_340x.png?v=1735294749",
        "https://www.earthstore.in/cdn/shop/files/category_images_3_340x.png?v=1735296280",
      ],
    },
  ];

  // Load products
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

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-5 gap-8 mb-10 mt-10">
        {filteredProducts.map((product) => (
          <HomeDecorCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

/* ---------------- CARD -------------------- */
function HomeDecorCard({ product }) {
  const { addItem } = useCart();
  const [activeImg, setActiveImg] = useState(0);

  return (
    <div className="group bg-white rounded-xl shadow hover:shadow-xl transition p-3 overflow-hidden">

      {/* IMAGE BOX */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.images[activeImg]}
          alt={product.title}
          className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
        />

        {/* Discount */}
        <div className="absolute top-3 left-3">
          <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">
            {product.discount}
          </span>
        </div>

        {/* Slider dots */}
        {product.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
            {product.images.map((_, i) => (
              <div
                key={i}
                onClick={() => setActiveImg(i)}
                className={`w-3 h-3 rounded-full cursor-pointer ${
                  activeImg === i ? "bg-white" : "bg-white/50"
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
        className="mt-3 w-full bg-teal-500 text-white py-2 rounded hover:bg-teal-600 transition"
      >
        Add to Cart
      </button>
    </div>
  );
}
