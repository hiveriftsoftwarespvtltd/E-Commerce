import { useFilter } from "../context/FilterContext";
import { useCart } from "../context/CartContext";
import SidebarFilter from "../components/Filters/SidebarFilter";
import FilterHeader from "../components/Filters/FilterHeader";
import { useEffect, useState } from "react";
import { useSearch } from "../context/SearchContext";

export default function Mugs() {
  const {
    isFilterOpen,
    setIsFilterOpen,
    filteredProducts,
    setFilteredProducts,
    setAllProducts
  } = useFilter();
  const { setAllWebsiteProducts } = useSearch();

  const { addItem } = useCart();

  // Fixed images you told
  const productImages = [
    "https://www.earthstore.in/cdn/shop/files/Gold_Harvester_Farmer_3_-_The_Earth_Store_-_-_-2300465_605x.progressive.jpg?v=1724153805",
    "https://www.earthstore.in/cdn/shop/files/Gold_Harvester_Farmer_3_-_The_Earth_Store_-_-_-2300468_605x.jpg?v=1724153805",
  ];

  // Mugs products
  const products = [
    {
      id: 401,
      title: "Classic Coffee Mug",
      originalPrice: 699,
      salePrice: 399,
      discount: "-43%",
      category: "Mugs",
      images: productImages,
    },
    {
      id: 402,
      title: "Designer Ceramic Mug",
      originalPrice: 899,
      salePrice: 549,
      discount: "-39%",
      category: "Mugs",
      images: productImages,
    },
    {
      id: 403,
      title: "Premium Tea Mug",
      originalPrice: 999,
      salePrice: 649,
      discount: "-35%",
      category: "Mugs",
      images: productImages,
    },
  ];

  // Load products initially
  useEffect(() => {
    setFilteredProducts(products);
    setAllProducts(products);        //
    setAllWebsiteProducts(products);
  }, []);

  return (
    <div className="w-full px-4 py-6 relative">

      {/* Banner */}
      <div className="hidden sm:block">
        <img
          src="https://www.earthstore.in/cdn/shop/files/The_Earth_Store_Mugs_1905x.jpg?v=173998"
          className="w-full h-auto object-cover"
          alt="Mugs Banner"
        />
      </div>

      <div className="block sm:hidden">
        <img
          src="https://www.earthstore.in/cdn/shop/files/The_Earth_Store_Mugs_mobile_550x.jpg?v=173998"
          className="w-full h-auto object-cover"
          alt="Mugs Mobile Banner"
        />
      </div>

      {/* Sidebar Filter */}
      <SidebarFilter isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} />

      {/* Filter Header */}
      <FilterHeader total={filteredProducts.length} />

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-5 gap-8 mt-10 mb-10">
        {filteredProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}

/* -------------- PRODUCT CARD -------------- */
function ProductCard({ product }) {
  const { addItem } = useCart();
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="group bg-white rounded-xl shadow hover:shadow-xl transition p-3 overflow-hidden">

      {/* Image */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.images[currentIndex]}
          alt={product.title}
          className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
        />

        <span className="absolute top-3 left-3 bg-red-600 text-white text-xs px-2 py-1 rounded">
          {product.discount}
        </span>

        {/* Dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
          {product.images.map((_, i) => (
            <div
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-3 h-3 rounded-full cursor-pointer ${currentIndex === i ? "bg-white" : "bg-white/50"
                }`}
            />
          ))}
        </div>
      </div>

      {/* Details */}
      <h3 className="text-lg font-semibold mt-3">{product.title}</h3>

      <div className="flex items-center gap-2 mt-1">
        <span className="text-xl font-bold">₹{product.salePrice}</span>
        <span className="line-through text-gray-500">₹{product.originalPrice}</span>
      </div>

      {/* Add to Cart */}
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
