import { useFilter } from "../context/FilterContext";
import { useCart } from "../context/CartContext";
import SidebarFilter from "../components/Filters/SidebarFilter";
import FilterHeader from "../components/Filters/FilterHeader";
import { useEffect, useState } from "react";
import { useSearch } from "../context/SearchContext";

export default function Tray() {
  const {
       isFilterOpen,
    setIsFilterOpen,
    setAllProducts,
    filteredProducts,
    setFilteredProducts,
  } = useFilter();

  const { addItem } = useCart();
  const { setAllWebsiteProducts } = useSearch();

  /* -----------------------------------------
     🔥 EVERY PRODUCT HAS ITS OWN IMAGES
  ------------------------------------------- */
  const products = [
    {
      id: 501,
      title: "Wooden Serving Tray",
      originalPrice: 1599,
      salePrice: 899,
      discount: "-44%",
      category: "Tray",
      images: [
         "https://www.earthstore.in/cdn/shop/files/Gold_Harvester_Farmer_3_-_The_Earth_Store_-_-_-2300465_605x.progressive.jpg?v=1724153805",
    "https://www.earthstore.in/cdn/shop/files/Gold_Harvester_Farmer_3_-_The_Earth_Store_-_-_-2300468_605x.jpg?v=1724153805",
      ],
    },
    {
      id: 502,
      title: "Premium Decorative Tray",
      originalPrice: 1999,
      salePrice: 1299,
      discount: "-35%",
      category: "Tray",
      images: [
         "https://www.earthstore.in/cdn/shop/files/Gold_Harvester_Farmer_3_-_The_Earth_Store_-_-_-2300465_605x.progressive.jpg?v=1724153805",
    "https://www.earthstore.in/cdn/shop/files/Gold_Harvester_Farmer_3_-_The_Earth_Store_-_-_-2300468_605x.jpg?v=1724153805",
      ],
    },
    {
      id: 503,
      title: "Metal Vintage Tray",
      originalPrice: 2299,
      salePrice: 1499,
      discount: "-34%",
      category: "Tray",
      images: [
           "https://www.earthstore.in/cdn/shop/files/Gold_Harvester_Farmer_3_-_The_Earth_Store_-_-_-2300465_605x.progressive.jpg?v=1724153805",
    "https://www.earthstore.in/cdn/shop/files/Gold_Harvester_Farmer_3_-_The_Earth_Store_-_-_-2300468_605x.jpg?v=1724153805",
      ],
    },
  ];

  // Load products
  useEffect(() => {
    setFilteredProducts(products);
    setAllProducts(products);
    setAllWebsiteProducts(products);
  }, []);

  return (
    <div className="w-full px-4 py-6 relative">

      {/* Banner */}
      <div className="hidden sm:block">
        <img
          src="https://www.earthstore.in/cdn/shop/files/The_Earth_Store_Tray_1905x.jpg?v=173998"
          className="w-full object-cover"
          alt="Tray Banner"
        />
      </div>

      <div className="sm:hidden">
        <img
          src="https://www.earthstore.in/cdn/shop/files/The_Earth_Store_Tray_550x.jpg?v=173998"
          className="w-full object-cover"
          alt="Tray Mobile Banner"
        />
      </div>

      {/* Sidebar */}
      <SidebarFilter
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />

      {/* Header */}
      <FilterHeader total={filteredProducts.length} />

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-5 gap-8 mt-10 mb-10">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

/* -----------------------------------------------------
   PRODUCT CARD
------------------------------------------------------ */
function ProductCard({ product }) {
  const { addItem } = useCart();
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="group bg-white rounded-xl shadow hover:shadow-xl transition p-3 overflow-hidden">

      {/* IMAGE SECTION */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.images[currentIndex]}
          alt={product.title}
          className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
        />

        <span className="absolute top-3 left-3 bg-red-600 text-white text-xs px-2 py-1 rounded">
          {product.discount}
        </span>

        {/* Dot Switcher */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
          {product.images.map((_, i) => (
            <div
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-3 h-3 cursor-pointer rounded-full ${
                currentIndex === i ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
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
        className="mt-3 w-full bg-teal-500 text-white py-2 rounded hover:bg-teal-600"
      >
        Add to Cart
      </button>
    </div>
  );
}
