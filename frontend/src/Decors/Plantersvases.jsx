import { useFilter } from "../context/FilterContext";
import { useCart } from "../context/CartContext";
import SidebarFilter from "../components/Filters/SidebarFilter";
import FilterHeader from "../components/Filters/FilterHeader";
import { useState, useEffect } from "react";
import { useSearch } from "../context/SearchContext";
import { Link } from "react-router-dom"; // ⭐ IMPORTANT

export default function Plantersvases() {
  const {
    isFilterOpen,
    setIsFilterOpen,
    setAllProducts,
    filteredProducts,
    setFilteredProducts,
  } = useFilter();

  const { addItem } = useCart();
  const { setAllWebsiteProducts } = useSearch();

  // 🌱 PLANETS & VASES PRODUCTS (⭐ route & id are important)
  const products = [
    {
      id: 201,
      title: "Classic Ceramic Planter",
      originalPrice: 1299,
      salePrice: 899,
      discount: "-31%",
      category: "Planter",
      route: "/product/201",
      images: [
        "https://www.earthstore.in/cdn/shop/files/Gold_Harvester_Farmer_3_-_The_Earth_Store_-_-_-2300465_605x.progressive.jpg?v=1724153805",
        "https://www.earthstore.in/cdn/shop/files/Gold_Harvester_Farmer_3_-_The_Earth_Store_-_-_-2300468_605x.jpg?v=1724153805",
      ],
    },
    {
      id: 202,
      title: "Designer Flower Vase",
      originalPrice: 1599,
      salePrice: 1099,
      discount: "-31%",
      category: "Vase",
      route: "/product/202",
      images: [
        "https://www.earthstore.in/cdn/shop/files/Gold_Harvester_Farmer_3_-_The_Earth_Store_-_-_-2300465_605x.progressive.jpg?v=1724153805",
        "https://www.earthstore.in/cdn/shop/files/Gold_Harvester_Farmer_3_-_The_Earth_Store_-_-_-2300468_605x.jpg?v=1724153805",
      ],
    },
    {
      id: 203,
      title: "Wooden Indoor Planter",
      originalPrice: 1999,
      salePrice: 1499,
      discount: "-25%",
      category: "Wooden Planter",
      route: "/product/203",
      images: [
        "https://www.earthstore.in/cdn/shop/files/Gold_Harvester_Farmer_3_-_The_Earth_Store_-_-_-2300465_605x.progressive.jpg?v=1724153805",
        "https://www.earthstore.in/cdn/shop/files/Gold_Harvester_Farmer_3_-_The_Earth_Store_-_-_-2300468_605x.jpg?v=1724153805",
      ],
    },
  ];

  // ⭐ Load products into context
  useEffect(() => {
    setAllProducts(products);
    setFilteredProducts(products);
setAllWebsiteProducts(prev => [...prev, ...products]);
  }, []);

  return (
    <div className="w-full px-4 py-6 relative">

      {/* SIDEBAR FILTER */}
      <SidebarFilter isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} />

      {/* FILTER HEADER */}
      <FilterHeader total={filteredProducts.length} />

      {/* PRODUCT GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-5 gap-8 mb-10 mt-10">
        {filteredProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}

/* =================== PRODUCT CARD =================== */
function ProductCard({ product }) {
  const { addItem } = useCart();
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="group bg-white rounded-xl shadow hover:shadow-xl transition p-3 overflow-hidden">

      {/* IMAGE + LINK */}
      <Link to={product.route}>
        <div className="relative aspect-square bg-gray-100">
          <img
            src={product.images[currentIndex]}
            className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
            alt={product.title}
          />

          {/* DISCOUNT */}
          <span className="absolute top-3 left-3 bg-red-600 text-white text-xs px-2 py-1 rounded">
            {product.discount}
          </span>

          {/* DOTS SWITCH */}
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
      </Link>

      {/* TITLE + LINK */}
      <Link to={product.route}>
        <h3 className="text-lg font-semibold mt-3 hover:text-teal-600">
          {product.title}
        </h3>
      </Link>

      {/* PRICE */}
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
