// src/Tableware/DipsPlate.jsx
import React, { useState, useEffect } from "react";
import { useFilter } from "../context/FilterContext";
import { useCart } from "../context/CartContext";
import SidebarFilter from "../components/Filters/SidebarFilter";
import FilterHeader from "../components/Filters/FilterHeader";
import { useSearch } from "../context/SearchContext";

export default function DipsPlate() {
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
      id: 401,
      title: "Ceramic Dips & Snacks Plate",
      category: "dips",
      originalPrice: 1299,
      salePrice: 799,
      discount: "-38%",
      inStock: true,
      images: [
        "https://www.earthstore.in/cdn/shop/files/Peaceful_Buddha_-_The_Earth_Store_-_-_-2302726_605x.progressive.jpg?v=1723307155",
        "https://www.earthstore.in/cdn/shop/files/Peaceful_Buddha_-_The_Earth_Store_-_-_-2302729_605x.jpg?v=1723307155",
      ],
    },
    {
      id: 402,
      title: "Round Platter with Dip Bowl",
      category: "platters dips",
      originalPrice: 999,
      salePrice: 599,
      discount: "-40%",
      inStock: true,
      images: [
        "https://www.earthstore.in/cdn/shop/files/Peaceful_Buddha_-_The_Earth_Store_-_-_-2302726_605x.progressive.jpg?v=1723307155",
        "https://www.earthstore.in/cdn/shop/files/Peaceful_Buddha_-_The_Earth_Store_-_-_-2302729_605x.jpg?v=1723307155",
      ],
    },
    {
      id: 403,
      title: "Mini Dip Plate Set (Pack of 3)",
      category: "dip bowls",
      originalPrice: 699,
      salePrice: 399,
      discount: "-42%",
      inStock: false,
      images: [
        "https://www.earthstore.in/cdn/shop/files/Peaceful_Buddha_-_The_Earth_Store_-_-_-2302726_605x.progressive.jpg?v=1723307155",
        "https://www.earthstore.in/cdn/shop/files/Peaceful_Buddha_-_The_Earth_Store_-_-_-2302729_605x.jpg?v=1723307155",
      ],
    },
  ];

  // ⭐ LOAD INTO FILTER CONTEXT
  useEffect(() => {
    setAllProducts(products);
    setFilteredProducts(products);
    setAllWebsiteProducts(products);
  }, []);

  // ⭐ IMAGE INDEX MANAGEMENT
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
              {/* IMAGE */}
              <div className="relative aspect-square bg-gray-100">
                <img
                  src={product.images[imageIndex[i]]}
                  alt={product.title}
                  className="w-full h-full object-cover transition group-hover:scale-105"
                />

                {/* DISCOUNT */}
                <div className="absolute top-3 left-3">
                  <span className="bg-red-600 text-white text-xs px-3 py-1 rounded">
                    {product.discount}
                  </span>
                </div>

                {/* LEFT/RIGHT BUTTONS */}
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
                <h3 className="text-lg font-medium text-gray-900 mb-3 line-clamp-2">
                  {product.title}
                </h3>

                <div className="flex gap-3 items-center mb-4">
                  <span className="text-sm text-gray-500 line-through">
                    ₹{product.originalPrice}
                  </span>
                  <span className="text-2xl font-bold text-gray-900">
                    ₹{product.salePrice}
                  </span>
                </div>

                {/* ADD TO CART */}
                <button
                  onClick={() => addToCart(product)}
                  className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3.5 rounded-lg"
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
