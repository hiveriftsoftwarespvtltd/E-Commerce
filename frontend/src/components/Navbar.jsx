import React, { useState, useEffect } from "react";
import { MeiliSearch } from "meilisearch";
import { useRef } from "react";
import {
  ChevronDown,
  Menu,
  X,
  Search,
  User,
  Home,
  ShoppingBag,
  Grid,
  Heart,
  ShoppingCart,
  Package,
} from "lucide-react";
import productData from "../../products.json";
import fallbackImage from "../assets/accessories.png";

import logo from "../assets/logo11.png";
import { useCart } from "../context/CartContext";
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
  useResolvedPath,
} from "react-router-dom";
import { useSearch } from "../context/SearchContext";

import BASE from "../config";
import { useAuth } from "@/context/UserContext";

const Navbar = ({ onCartOpen }) => {
  const {user,token,isLoggedIn} = useAuth()
  console.log("Navbar",isLoggedIn,token,user)
  const profileRef = useRef(null);
  const navigate = useNavigate();
  const params = useLocation();
  const pathname = params.pathname;

  const { totalQuantity } = useCart();
  const { searchProducts } = useSearch();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);

  const [loginDropdown, setLoginDropdown] = useState(false);

  // ⭐ SEARCH STATES
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("User");
  const [products, setProducts] = useState(productData?.products);
  const [filteredProducts, setFilteredProducts] = useState([]);
  

  const options = [
    {
      label: "Home",
      icon: Home,
      url: "/",
      onClick: () => navigate("/"),
    },
    {
      label: "Shop",
      icon: ShoppingBag,
      url: "/products",
      onClick: () => navigate("/products"),
    },
    {
      label: "Wishlist",
      icon: Heart,
      url: !isLoggedIn ? "/login" : "/favourites",
      onClick: () =>
        !isLoggedIn ? navigate("/login") : navigate("/favourites"),
    },
    {
      label: "Cart",
      icon: ShoppingCart,
      url: !isLoggedIn ? "/login" : "/cart",
      onClick: () => (!isLoggedIn ? navigate("/login") : onCartOpen()),
    },
    {
      label: "Account",
      icon: User,
      url: !isLoggedIn ? "/login" : "/profile",
      onClick: () => (!isLoggedIn ? navigate("/login") : navigate("/profile")), // 👈 modal
    },
  ];
  const guestUserOptions = [
   {
      label: "Home",
      icon: Home,
      url: "/",
      onClick: () => navigate("/"),
    },
    {
      label: "Login",
      icon: User,
      url: "/login",
      onClick: () => navigate("/login"),
    },
  ];

  const loggedInUserOptions = [
    { label: "Home", url: "/", icon: Home },
    { label: "Shop", url: "/products", icon: ShoppingBag },
    { label: "Categories", url: "/categories", icon: Grid },
    { label: "Orders", url: "/orders", icon: Package },
    { label: "Wishlist", url: "/wishlist", icon: Heart },
    { label: "Cart", url: "/cart", icon: ShoppingCart },
    { label: "Account", url: "/account", icon: User },
  ];

  console.log(filteredProducts, "products");

  // profile close outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setLoginDropdown(false); // dropdown close
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch2 = (text) => {
    try {
      if (!text) {
        setFilteredProducts(products); // reset if empty
        setQuery("");
        setResults(products);
        return;
      }

      console.log(typeof products, Array.isArray(products), "Type of products");
      setQuery(text);

      const filtered = products?.filter((item) =>
        item.title.toLowerCase().includes(text.toLowerCase()),
      );

      setFilteredProducts(filtered);
      setResults(filtered);
    } catch (error) {
      console.log("Handle Search2 Error", error);
    }
  };

  // console.log("Filtered products ",filteredProducts)

  // Fetch Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${BASE.PRODUCT_BASE}/category/getAllCategory`);
        const data = await res.json();
        if (data.statusCode === 200) setCategories(data.result);
      } catch (error) {
        console.log("Category fetch error:", error);
      }
    };
    fetchCategories();
  }, []);

  // Fetch Subcategories
  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const res = await fetch(
          `${BASE.PRODUCT_BASE}/subcategory/getAllSubCategory`,
        );
        const data = await res.json();
        if (data.statusCode === 200) setSubcategories(data.result);
      } catch (error) {
        console.log("Subcategory fetch error:", error);
      }
    };
    fetchSubCategories();
  }, []);

  // ⭐ CHECK LOGIN
  useEffect(() => {
    const token =
      localStorage.getItem("token") || localStorage.getItem("accessToken");
    const email = localStorage.getItem("userEmail");

    if (token && email) {
      setLoggedIn(true);
      setUserEmail(email);
      const name = email.split("@")[0].replace(/[0-9]/g, "");
      setUserName(name.charAt(0).toUpperCase() + name.slice(1));
    }
  }, []);

  const logoutUser = () => {
    localStorage.clear();
    setLoggedIn(false);
    navigate("/");
  };

  // ⭐ LIVE SEARCH USING BACKEND API
  const handleSearch = async (value) => {
    console.log("Searching:", value);
    console.log(
      `${BASE.PRODUCT_BASE}/product-detail/searchProducts?search=${value}`,
    );

    setQuery(value);

    if (value.trim().length === 0) {
      setResults([]);
      return;
    }

    try {
      const response = await fetch(
        `${BASE.PRODUCT_BASE}/product-detail/searchProducts?search=${value}`,
      );

      const data = await response.json();

      console.log("API JSON RESPONSE:", data);

      if (data.success === true && Array.isArray(data.data)) {
        setResults(data.data);
      } else {
        setResults([]);
      }
    } catch (error) {
      console.log("Search API Error:", error);
      setResults([]);
    }
  };

  console.log("results", results);

  // console.log(query.length,"Query Length")
  return (
    <>
      <header className="w-full bg-light-accent-1 shadow-sm sticky top-0 z-50">
        <div className="mx-auto max-w-[1440px] px-4 py-3 flex items-center justify-between gap-6">
          {/* 🟡 LEFT: LOGO */}
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              alt="logo"
              className="w-[140px] md:w-[160px] lg:w-[180px] object-contain"
            />
          </Link>

          {/* 🔍 CENTER: SEARCH */}
          <div className="group flex-1 max-w-[500px] hidden md:flex relative">
            {/* Search Box */}
            <div
              className="w-full h-[42px] bg-white rounded-full relative flex items-center 
    shadow-sm border border-gray-200 
    transition-all duration-300 
    focus-within:shadow-md focus-within:border-accent focus-within:scale-[1.02]"
            >
              <input
                type="text"
                placeholder="Search for products, brands..."
                className="w-full h-full bg-transparent outline-none px-5 pr-12 text-sm"
                value={query}
                onChange={(e) => handleSearch2(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && query.trim() !== "") {
                    navigate(`/search?q=${query}`);
                    setSearchOpen(false);
                    setResults([]);
                  }
                }}
              />

              <Search
                className="absolute right-4 text-gray-400 transition-all duration-300 
      pointer-events-none 
      group-focus-within:text-li group-focus-within:scale-110"
              />
            </div>

            {/* Search Results Dropdown */}
            {query.length > 0 && (
              <div
                className="absolute top-[48px] left-0 w-full bg-white rounded-xl shadow-lg 
      max-h-[400px] overflow-y-auto z-50 border"
              >
                {results.length > 0 ? (
                  results.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        navigate(`/products/${item.id}`);
                        setSearchOpen(false);
                        setQuery("");
                      }}
                      className="flex items-center gap-4 p-3 border-b last:border-none 
                     hover:bg-gray-100 cursor-pointer transition"
                    >
                      <img
                        src={item.images?.[0] || fallbackImage}
                        alt={item.title}
                        className="w-14 h-14 object-cover rounded-md border"
                      />

                      <div className="flex flex-col">
                        <p className="font-medium text-gray-800">
                          {item.title || item.Name}
                        </p>

                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-amber-700 font-semibold">
                            ₹{item.salePrice}
                          </span>

                          {item.originalPrice && (
                            <span className="line-through text-gray-400 text-sm">
                              ₹{item.originalPrice}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center p-4 text-gray-500">
                    No products found
                  </p>
                )}
              </div>
            )}
          </div>

          

          

          {/* 🔵 RIGHT: NAV + ACTIONS */}
          <div className="flex items-center gap-6">
            {/* Navigation */}
            <div className="hidden lg:flex items-center gap-6">
              { (token ? options : guestUserOptions)?.map((item, index) => (
                <span
                  key={index}
                  onClick={item.onClick}
                  className={`relative cursor-pointer text-sm font-medium transition-all duration-300 
      hover:text-bold-accent-1
      ${pathname === item.url ? "text-bold-accent-1" : "text-accent"}`}
                >
                  {item.label}

                  {/* Animated underline */}
                  <span
                    className={`absolute left-0 -bottom-1 h-[2px] bg-bold-accent-1 transition-all duration-300 
        ${pathname === item.url ? "w-full" : "w-0 group-hover:w-full"}`}
                  />

                  {/* Cart Badge */}
                  {item.label === "Cart" && totalQuantity > 0 && (
                    <span
                      className="absolute -top-2 -right-3 
          min-w-[18px] h-[18px] px-[3px] 
          flex items-center justify-center 
          text-[10px] font-semibold text-white 
          bg-red-500 rounded-full 
          shadow-md"
                    >
                      {totalQuantity}
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="group flex-1 w-full md:hidden relative p-1">
            {/* Search Box */}
            <div
              className="w-full h-[32px] bg-white rounded-lg relative flex items-center 
    shadow-sm border border-gray-200 
    transition-all duration-300 
    focus-within:shadow-md focus-within:border-accent "
            >
              <input
                type="text"
                placeholder="Search for products, brands..."
                className="w-full h-full bg-transparent outline-none px-5 pr-12 text-sm"
                value={query}
                onChange={(e) => handleSearch2(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && query.trim() !== "") {
                    navigate(`/search?q=${query}`);
                    setSearchOpen(false);
                    setResults([]);
                  }
                }}
              />

              <Search
                className="w-4 h-4 absolute right-4 text-gray-400 transition-all duration-300 
      pointer-events-none 
      group-focus-within:text-li group-focus-within:scale-110"
              />
            </div>

            {/* Search Results Dropdown */}
            {query.length > 0 && (
              <div
                className="absolute top-[48px] left-0 w-full bg-white rounded-xl shadow-lg 
      max-h-[400px] overflow-y-auto z-50 border px-2"
              >
                {results.length > 0 ? (
                  results.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        navigate(`/products/${item.id}`);
                        setSearchOpen(false);
                        setQuery("");
                      }}
                      className="flex items-center gap-4 p-3 border-b last:border-none 
                     hover:bg-gray-100 cursor-pointer transition"
                    >
                      <img
                        src={item.images?.[0] || fallbackImage}
                        alt={item.title}
                        className="w-14 h-14 object-cover rounded-md border"
                      />

                      <div className="flex flex-col">
                        <p className="font-medium text-gray-800 text-sm">
                          {item.title || item.Name}
                        </p>

                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-amber-700 font-semibold">
                            ₹{item.salePrice}
                          </span>

                          {item.originalPrice && (
                            <span className="line-through text-gray-400 text-sm">
                              ₹{item.originalPrice}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center p-4 text-gray-500">
                    No products found
                  </p>
                )}
              </div>
            )}
          </div>
      </header>

      <div
        className={`fixed top-0 left-1/2 -translate-x-1/2 bg-white shadow-lg z-[999] transition-transform duration-500 rounded-b-lg ${
          searchOpen ? "translate-y-0" : "-translate-y-full "
        }`}
      >
        <div className="  p-4 relative flex items-center gap-4  bg-white rounded-b-lg">
          <input
            type="text"
            value={query}
            onChange={(e) => handleSearch2(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && query.trim() !== "") {
                navigate(`/search?q=${query}`);
                setSearchOpen(false);
                setResults([]);
              }
            }}
            className="flex-1 h-12 px-4 text-lg border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-amber-500 transition"
            placeholder="Search for products..."
          />

          <button
            className="h-12 px-5 flex items-center justify-center rounded-md text-white font-semibold shadow-sm transition bg-accent cursor-pointer"
            onClick={() => {
              if (!query.trim()) return;
              navigate(`/search?q=${query}`);
              setSearchOpen(false);
              setResults([]);
            }}
          >
            Search
          </button>

          <button
            className="p-2 rounded-md text-gray-600 hover:text-black cursor-pointer"
            onClick={() => {
              setSearchOpen(false);
              setQuery("");
              setResults([]);
            }}
          >
            <X size={26} />
          </button>
        </div>

        {query?.length > 0 && (
          <div className=" mx-auto bg-white  rounded-b-lg shadow-md max-h-[400px] overflow-y-auto slider">
            {results?.length > 0 ? (
              results?.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    navigate(`/products/${item.id}`);
                    setSearchOpen(false);
                  }}
                  className="flex items-center gap-4 p-3 border-b hover:bg-gray-100 cursor-pointer"
                >
                  <img
                    src={item.images[0] || fallbackImage}
                    alt={item.title}
                    className="w-14 h-14 object-cover rounded-md border"
                  />

                  <div className="flex flex-col">
                    <p className="font-medium text-gray-800">{item.Name}</p>

                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-amber-700 font-semibold">
                        ₹{item.salePrice}
                      </span>

                      {/* <span className="line-through text-gray-500 text-sm">
                        ₹{item.originalPrice}
                      </span> */}
                      <span>{item.title}</span>

                      {/* <span className="text-green-600 text-sm font-medium">
                        {Math.round(
                          ((item.originalPrice - item.salePrice) / item.originalPrice) * 100
                        )}
                        % OFF
                      </span> */}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center p-4 text-gray-500">No products found</p>
            )}
          </div>
        )}
      </div>

      {searchOpen && (
        <div
          className="fixed inset-0 backdrop-blur-sm z-[998]"
          onClick={() => {
            setSearchOpen(false);
            setQuery("");
            setResults([]);
          }}
        ></div>
      )}
    </>
  );
};

export default Navbar;
