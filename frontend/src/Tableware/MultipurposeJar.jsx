// src/Tableware/MultipurposeJar.jsx
import React, { useState, useEffect } from "react";
import { useFilter } from "../context/FilterContext";
import { useCart } from "../context/CartContext";
import SidebarFilter from "../components/Filters/SidebarFilter";
import FilterHeader from "../components/Filters/FilterHeader";
import { useSearch } from "../context/SearchContext";

export default function MultipurposeJar() {
  const {
    isFilterOpen,
    setIsFilterOpen,
    setAllProducts,
    filteredProducts,
    setFilteredProducts,
  } = useFilter();

  const { addItem } = useCart();
  const { setAllWebsiteProducts } = useSearch();

  // ⭐ PRODUCTS LIST
  const products = [
    {
      id: 301,
      title: "Air Tight Storage Jar",
      category: "jar",
      originalPrice: 999,
      salePrice: 599,
      discount: "-40%",
      inStock: true,
      images: [
        "https://www.earthstore.in/cdn/shop/files/Gold_Harvester_Farmer_3_-_The_Earth_Store_-_-_-2300465_605x.progressive.jpg?v=1724153805",
        "https://www.earthstore.in/cdn/shop/files/Gold_Harvester_Farmer_3_-_The_Earth_Store_-_-_-2300468_605x.jpg?v=1724153805",
      ],
    },
    {
      id: 302,
      title: "Glass Multipurpose Jar",
      category: "glass jar",
      originalPrice: 1299,
      salePrice: 799,
      discount: "-38%",
      inStock: true,
      images: [
        "https://www.earthstore.in/cdn/shop/files/Gold_Harvester_Farmer_3_-_The_Earth_Store_-_-_-2300465_605x.progressive.jpg?v=1724153805",
        "https://www.earthstore.in/cdn/shop/files/Gold_Harvester_Farmer_3_-_The_Earth_Store_-_-_-2300468_605x.jpg?v=1724153805",
      ],
    },
    {
      id: 303,
      title: "Modern Square Jar",
      category: "jar",
      originalPrice: 899,
      salePrice: 549,
      discount: "-39%",
      inStock: false,
      images: [
        "https://www.earthstore.in/cdn/shop/files/Gold_Harvester_Farmer_3_-_The_Earth_Store_-_-_-2300465_605x.progressive.jpg?v=1724153805",
        "https://www.earthstore.in/cdn/shop/files/Gold_Harvester_Farmer_3_-_The_Earth_Store_-_-_-2300468_605x.jpg?v=1724153805",
      ],
    },
  ];

  // ⭐ LOAD PRODUCTS TO FILTER CONTEXT
  useEffect(() => {
    setAllProducts(products);
    setFilteredProducts(products);
    setAllWebsiteProducts(products);
  }, []);

  // ⭐ IMAGE INDEX FOR EACH CARD
  const [imageIndex, setImageIndex] = useState(products.map(() => 0));

  const prevImage = (i, product) => {
    setImageIndex((old) => {
      const copy = [...old];
      copy[i] =
        copy[i] === 0 ? product.images.length - 1 : copy[i] - 1;
      return copy;
    });
  };

  const nextImage = (i, product) => {
    setImageIndex((old) => {
      const copy = [...old];
      copy[i] =
        copy[i] === product.images.length - 1 ? 0 : copy[i] + 1;
      return copy;
    });
  };

  // ⭐ ADD TO CART
  const addToCart = (product) => {
    addItem(product);
  };

  return (
    <div className="px-4 py-6 md:px-0 md:py-0">

      {/* FILTER SIDEBAR */}
      <SidebarFilter
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />

      <div className="flex-1 min-h-screen">
        {/* FILTER HEADER */}
        <FilterHeader total={filteredProducts.length} />

        {/* PRODUCT GRID */}
        <div className="mt-10 px-10 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, i) => (
            <div
              key={product.id}
              className="group relative bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300"
            >
              {/* PRODUCT IMAGE */}
              <div className="relative aspect-square bg-gray-100">
                <img
                  src={product.images[imageIndex[i]]}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                  alt={product.title}
                />

                {/* DISCOUNT LABEL */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded">
                    {product.discount}
                  </span>
                </div>

                {/* IMAGE SWITCH BUTTONS */}
                {product.images.length > 1 && (
                  <div className="absolute inset-x-0 bottom-4 flex justify-center opacity-0 group-hover:opacity-100 transition">
                    <div className="flex gap-3 bg-white/90 p-2 rounded-full shadow-xl">
                      <button
                        onClick={() => prevImage(i, product)}
                        className="p-2 hover:bg-gray-200 rounded-full"
                      >
                        ◀
                      </button>
                      <button
                        onClick={() => nextImage(i, product)}
                        className="p-2 hover:bg-gray-200 rounded-full"
                      >
                        ▶
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* DETAILS */}
              <div className="p-5">
                <h3 className="text-lg font-medium text-gray-900 line-clamp-2 mb-3">
                  {product.title}
                </h3>

                <div className="flex items-center gap-3 mb-4">
                  <span className="text-sm text-gray-500 line-through">
                    ₹{product.originalPrice}.00
                  </span>
                  <span className="text-2xl font-bold text-gray-900">
                    ₹{product.salePrice}.00
                  </span>
                </div>

                {/* ADD TO CART */}
                <button
                  onClick={() => addToCart(product)}
                  className="w-full bg-teal-500 hover:bg-teal-600 text-white font-medium py-3.5 rounded-lg flex justify-center"
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
