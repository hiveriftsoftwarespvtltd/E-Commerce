// src/Decors/TableDecor.jsx
import { useFilter } from "../context/FilterContext";
import SidebarFilter from "../components/Filters/SidebarFilter";
import FilterHeader from "../components/Filters/FilterHeader";
import ResponsiveImage from "../TableDecorcontent/ResponsiveImage";
import { useState, useEffect } from "react";
import { useSearch } from "../context/SearchContext";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function TableDecor() {
  const {
    isFilterOpen,
    setIsFilterOpen,
    setAllProducts,
    filteredProducts,
    setFilteredProducts,
  } = useFilter();

  const { setAllWebsiteProducts } = useSearch();
  const { addItem } = useCart();

  const products = [
    {
      id: 301,
      title: "Modern Ceramic Vase",
      category: "decor",
      originalPrice: 1499,
      salePrice: 899,
      discount: "-40%",
      route: "/product/301",
      inStock: true,
      images: [
        "https://www.earthstore.in/cdn/shop/files/Gold_Harvester_Farmer_3_-_The_Earth_Store_-_-_-2300465_605x.progressive.jpg?v=1724153805",
        "https://www.earthstore.in/cdn/shop/files/Gold_Harvester_Farmer_3_-_The_Earth_Store_-_-_-2300468_605x.jpg?v=1724153805",
      ],
    },
    {
      id: 302,
      title: "Classic Glass Cup",
      category: "glass",
      originalPrice: 599,
      salePrice: 349,
      discount: "-42%",
      inStock: true,
      route: "/product/302",
      images: [
        "https://www.earthstore.in/cdn/shop/files/Gold_Harvester_Farmer_3_-_The_Earth_Store_-_-_-2300465_605x.progressive.jpg?v=1724153805",
        "https://www.earthstore.in/cdn/shop/files/Gold_Harvester_Farmer_3_-_The_Earth_Store_-_-_-2300468_605x.jpg?v=1724153805",
      ],
    },
    {
      id: 303,
      title: "Minimal Coffee Mug",
      category: "mug",
      originalPrice: 799,
      salePrice: 499,
      discount: "-38%",
      inStock: false,
      route: "/product/303",
      images: [
        "https://www.earthstore.in/cdn/shop/files/Gold_Harvester_Farmer_3_-_The_Earth_Store_-_-_-2300465_605x.progressive.jpg?v=1724153805",
        "https://www.earthstore.in/cdn/shop/files/Gold_Harvester_Farmer_3_-_The_Earth_Store_-_-_-2300468_605x.jpg?v=1724153805",
      ],
    },
  ];

  useEffect(() => {
    setAllProducts(products);
    setFilteredProducts(products);
    setAllWebsiteProducts(prev => [...prev, ...products]);
  }, []);

  const [imageIndex, setImageIndex] = useState(products.map(() => 0));

  const addToCart = (product) => {
    addItem(product);
  };

  return (
    <div className="px-4 py-6 md:px-0 md:py-0">
      <ResponsiveImage />

      <SidebarFilter
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />

      <div className="flex-1 min-h-screen">
        <FilterHeader total={filteredProducts.length} />

        <div className="mt-10 px-10 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, i) => (
            <div
              key={product.id}
              className="group relative bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300"
            >

              {/* IMAGE CLICK WILL OPEN DETAILS */}
              <Link to={product.route}>
                <div className="relative aspect-square bg-gray-100">
                  <img
                    src={product.images[imageIndex[i]]}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                  />
                </div>
              </Link>

              <div className="p-5">

                <Link to={product.route}>
                  <h3 className="text-lg font-medium text-gray-900 hover:text-teal-600 line-clamp-2 mb-3">
                    {product.title}
                  </h3>
                </Link>

                <div className="flex items-center gap-3 mb-4">
                  <span className="text-sm text-gray-500 line-through">
                    ₹{product.originalPrice}
                  </span>
                  <span className="text-2xl font-bold text-gray-900">
                    ₹{product.salePrice}
                  </span>
                </div>

                <button
                  onClick={() => addToCart(product)}
                  className="w-full bg-teal-500 hover:bg-teal-600 text-white font-medium py-3.5 rounded-lg flex justify-center gap-2"
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
