import React from "react";
import { Home, ShoppingBag, Heart, ShoppingCart, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "@/context/CartContext";

const MobileNavbar = ({ onCartOpen, isLoggedIn = true }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { totalQuantity } = useCart();

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
      onClick: () => (!isLoggedIn ? navigate("/login") : onCartOpen?.()),
    },
    {
      label: "Account",
      icon: User,
      url: !isLoggedIn ? "/login" : "/profile",
      onClick: () => (!isLoggedIn ? navigate("/login") : navigate("/profile")),
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t shadow-md lg:hidden z-50 rounded-t-md overflow-auto">
      <div className="flex justify-around items-center h-[65px]">
        {options.map((item, idx) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.url;

          return (
            <button
              key={idx}
              onClick={item.onClick}
              className="relative flex flex-col items-center justify-center text-xs"
            >
              <Icon
                size={22}
                className={`transition ${
                  isActive ? "text-accent" : "text-gray-500"
                }`}
              />
              <span
                className={`mt-1 ${
                  isActive ? "text-accent font-medium" : "text-gray-500"
                }`}
              >
                {item.label}
              </span>
              {item.label === "Cart" && totalQuantity > 0 && (
                <span
                  className="absolute -top-1 right-2 
    min-w-[16px] h-[16px] px-[4px] 
    flex items-center justify-center 
    text-[10px] font-semibold text-white 
    bg-red-500 rounded-full"
                >
                  {totalQuantity}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MobileNavbar;
