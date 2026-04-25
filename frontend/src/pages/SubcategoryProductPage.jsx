"use client";

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import BASE from "../config";
import { useCart } from "../context/CartContext";
import { useFilter } from "../context/FilterContext";
import SidebarFilter from "../components/Filters/SidebarFilter";
import fallbackImage from "../assets/Jars.png";
// import bannerimg from "../assets/cupsets.png";
const GET_ALL_PRODUCTS = `${BASE.PRODUCT_BASE}/product-detail`;

export default function SubcategoryProductPage() {
  const { id } = useParams();
  const { addItem } = useCart();
  // const [subBanner, setSubBanner] = useState(null);
  const {
    isFilterOpen,
    setIsFilterOpen,
    allProducts,
    setAllProducts,
    filteredProducts,
    setFilteredProducts,
  } = useFilter();

  const [loading, setLoading] = useState(true);
  const [addedStatus, setAddedStatus] = useState({});
  // banner image
  // useEffect(() => {
  //     fetch(`${BASE.BASE_URL}/subcategory/getAllSubCategory`)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         const all = data.result || [];

  //         const match = all.find((sc) => sc._id === id);

  //         if (match && match.web_image?.length > 0) {
  //           setSubBanner(match.web_image[0]);
  //         }
  //       });
  //   }, [id]);

  // ⭐ LOAD PRODUCTS FROM BACKEND
  useEffect(() => {
    fetch(GET_ALL_PRODUCTS)
      .then((res) => res.json())
      .then((data) => {
        const all = data.data || [];

        // → store in global context
        setAllProducts(all);

        // FILTER PRODUCTS BY SUBCATEGORY ID
        const filtered = all.filter((p) => {
          const subId =
            typeof p.subcategoryId === "object"
              ? p.subcategoryId._id
              : p.subcategoryId;

          return subId === id;
        });

        setFilteredProducts(filtered);
        setLoading(false);
      });
  }, [id]);

  const products = filteredProducts;

  if (loading) return <p className="text-center py-10 text-lg">Loading...</p>;

  return (
    <div className="flex">
      {/* ⭐ SHOW FILTER BUTTON (For both mobile & desktop) */}
      {/* <button
        className="bg-black text-white px-4 py-2 rounded mb-4"
        onClick={() => setIsFilterOpen(true)}
      >
        Show Filters
      </button> */}

      {/* ⭐ SIDEBAR FILTER (Opens on click) */}
      <SidebarFilter
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        subcategoryId={id}
      />

      {/* ⭐ MOBILE FILTER OVERLAY */}
      <SidebarFilter
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />

      {/* ⭐ RIGHT SIDE – PRODUCTS */}
      <div className="flex-1 p-5">
        {/* MOBILE FILTER BUTTON */}
        <button
          className="md:hidden bg-black text-white px-4 py-2 rounded mb-4"
          onClick={() => setIsFilterOpen(true)}
        >
          Filters
        </button>

        <div className="flex items-center gap-4 mb-5">
          {/* FILTER BUTTON (Earthstore style) */}
          <button
            onClick={() => setIsFilterOpen(true)}
            className="border px-4 py-2 rounded-md text-sm flex items-center gap-2 shadow-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4h18M6 8h12M10 12h4"
              />
            </svg>
            FILTERS
          </button>
        </div>

        {/* SUBCATEGORY BANNER */}
        {/* {subBanner && (
          <div className="w-full mb-6">
            <img
              src={subBanner.replace(/ /g, "%20")}
              className="w-full h-64 object-cover rounded-lg"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = bannerimg; // your fallback banner
              }}
            />
          </div>
        )} */}

        {/* PRODUCT GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => {
            const rawImg = product.imageUrls?.[0];
            const imageUrl =
              rawImg && rawImg.trim() !== ""
                ? `${BASE.BASE_URL}/${rawImg}`
                : fallbackImage;

            return (
              <div key={product._id} className="bg-white rounded-xl shadow p-4">
                <Link to={`/product/${product._id}`}>
                  <img
                    src={imageUrl}
                    onError={(e) => {
                      if (e.target.src !== fallbackImage) {
                        e.target.onerror = null;
                        e.target.src = fallbackImage;
                      }
                    }}
                    className="w-full h-72 object-cover rounded-lg"
                    alt={product.Name}
                  />
                  <h3 className="text-lg font-semibold mt-3">{product.Name}</h3>
                </Link>

                <p className="text-gray-500 line-through">₹{product.Price}</p>

                <p className="text-xl font-bold">₹{product.SalesPrice}</p>
                <button
                  onClick={() => {
                    addItem(product);

                    // ⭐ Mark as added
                    setAddedStatus((prev) => ({
                      ...prev,
                      [product._id]: true,
                    }));

                    // ⭐ Remove after 2 seconds
                    setTimeout(() => {
                      setAddedStatus((prev) => ({
                        ...prev,
                        [product._id]: false,
                      }));
                    }, 2000);
                  }}
                  className={`
    mt-3 w-full py-2 rounded-lg font-semibold text-white transition-all duration-500 
    ${
      addedStatus[product._id]
        ? "bg-green-600 scale-105 opacity-100"
        : "bg-teal-500 hover:bg-teal-600 opacity-100"
    }
  `}
                >
                  {addedStatus[product._id] ? "Added ✓" : "Add to Cart"}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
