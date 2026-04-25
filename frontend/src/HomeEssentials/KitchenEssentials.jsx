import React, { useEffect, useState } from "react";
import { useFilter } from "../context/FilterContext";
import { useCart } from "../context/CartContext";
import SidebarFilter from "../components/Filters/SidebarFilter";
import FilterHeader from "../components/Filters/FilterHeader";
import { useSearch } from "../context/SearchContext";

export default function KitchenEssentials() {
  const { isFilterOpen, setIsFilterOpen, setAllProducts, filteredProducts, setFilteredProducts } =
    useFilter();

  const { addItem } = useCart();
  const { setAllWebsiteProducts } = useSearch();

  // ⭐ Kitchen Essentials Products
  const products = [
    {
      id: 601,
      title: "Stainless Steel Spice Box",
      originalPrice: 1599,
      salePrice: 999,
      discount: "-38%",
      category: "Kitchen Essentials",
      images: [
        "https://images.unsplash.com/photo-1518136247453-74e7b5e78b39?w=600",
        "https://images.unsplash.com/photo-1518136247453-74e7b5e78b39?w=600&2",
      ],
      inStock: true,
    },
    {
      id: 602,
      title: "Oil Dispenser Glass Bottle",
      originalPrice: 499,
      salePrice: 299,
      discount: "-40%",
      category: "Kitchen Essentials",
      images: [
        "https://images.unsplash.com/photo-1523475488511-037f89d7f11f?w=600",
        "https://images.unsplash.com/photo-1523475488511-037f89d7f11f?w=600&2",
      ],
      inStock: true,
    },
    {
      id: 603,
      title: "Multipurpose Wooden Spoon Set",
      originalPrice: 799,
      salePrice: 499,
      discount: "-37%",
      category: "Kitchen Essentials",
      images: [
        "https://images.unsplash.com/photo-1514790193030-c89d266d5a9d?w=600",
        "https://images.unsplash.com/photo-1514790193030-c89d266d5a9d?w=600&2",
      ],
      inStock: false,
    },
  ];

  // ⭐ Load into filter context
  useEffect(() => {
    setAllProducts(products);
    setFilteredProducts(products);
    setAllWebsiteProducts(products);
  }, []);

  return (
    <div className="w-full relative">

      {/* Sidebar filter */}
      <SidebarFilter
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />

      {/* Filter Header */}
      <FilterHeader total={filteredProducts.length} />

      {/* Products Grid */}
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
  const { addItem } = useCart();
  const [imgIndex, setImgIndex] = useState(0);

  return (
    <div className="group bg-white rounded-xl shadow hover:shadow-xl transition p-3 overflow-hidden">

      {/* Image */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.images[imgIndex]}
          className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
          alt={product.title}
        />

        <div className="absolute top-3 left-3">
          <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">
            {product.discount}
          </span>
        </div>

        {/* Image indicators */}
        {product.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
            {product.images.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full cursor-pointer ${
                  imgIndex === index ? "bg-white" : "bg-white/50"
                }`}
                onClick={() => setImgIndex(index)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Details */}
      <h3 className="text-lg font-semibold mt-3">{product.title}</h3>

      <div className="flex gap-2 items-center mt-1">
        <span className="text-xl font-bold">₹{product.salePrice}</span>
        <span className="line-through text-gray-500">
          ₹{product.originalPrice}
        </span>
      </div>

      {/* Add To Cart */}
      <button
        onClick={() =>
          addItem(product)
        }
        className="w-full mt-3 bg-teal-500 text-white py-2 rounded hover:bg-teal-600"
      >
        Add to Cart
      </button>
    </div>
  );
}
