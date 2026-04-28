import React, { useState, useEffect } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { api } from "@/utils/axios-interceptor";
import fallbackImage from "../assets/accessories.png";
import { useAuth } from "@/context/UserContext";
import AuthModal from "./AuthModal";

const UserProductCard = ({ item, onWishlistChange }) => {
  if (!item) return null;

  const [activeImg, setActiveImg] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isFav, setIsFav] = useState(item?.isFavourite || false);
  const {isLoggedIn} = useAuth()

  const navigate = useNavigate();
  const { addItem, decreaseItem, cartMap } = useCart();
  const [authModal,setAuthModal] = useState(false)

  // ✅ keep local state in sync with parent
  useEffect(() => {
    setIsFav(item?.isFavourite || false);
  }, [item?.isFavourite]);

  const cartItem = cartMap.get(item._id);
  const quantity = cartItem?.quantity || 0;

  const handleAddToCart = (product)=>{
    try {
      if(isLoggedIn){
        addItem(product)
      }else{
        setAuthModal(true)
      }
    } catch (error) {
      console.log("Add to Cart Error",error)
    }
  }

  // ✅ Toggle wishlist
  const toggleFavourite = async () => {
    try {
      setLoading(true);

      let response;

      if (isFav) {
        response = await api.delete(`/wishlist/${item._id}`);
      } else {
        response = await api.post(`/wishlist/${item._id}`);
      }

      if (response.data.success) {
        const updated = !isFav;

        setIsFav(updated);

        // notify parent
        onWishlistChange && onWishlistChange(item._id, updated);
      }
    } catch (error) {
      console.log("Wishlist Error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="group bg-white rounded-2xl border p-3 hover:shadow-xl transition-all duration-300 relative cursor-pointer"
      onClick={() => navigate(`/products/${item._id}`)}
    >
      {/* 🔄 Loading */}
      {loading && (
        <div className="absolute inset-0 bg-white/70 flex items-center justify-center rounded-2xl z-20">
          <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* ❤️ Favourite */}
      {"isFavourite" in item && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavourite();
          }}
          className="absolute top-3 left-3 z-20 bg-white/80 backdrop-blur p-2 rounded-full shadow hover:scale-110 transition"
        >
          <Heart
            size={18}
            className={
              isFav
                ? "fill-red-500 text-red-500"
                : "text-gray-400"
            }
          />
        </button>
      )}

      {/* 🖼️ Image */}
      <div className="overflow-hidden rounded-xl w-full aspect-square">
        <img
          src={
            item.images?.[activeImg] ||
            item.imageUrls?.[activeImg] ||
            fallbackImage
          }
          alt={item.title}
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* 🖼️ Thumbnails */}
      {(item.images || item.imageUrls)?.length > 1 && (
        <div className="flex gap-2 mt-3">
          {(item.images || item.imageUrls).map((img, i) => (
            <img
              key={i}
              src={img}
              onClick={(e) => {
                e.stopPropagation();
                setActiveImg(i);
              }}
              className={`w-10 h-10 object-cover rounded-md cursor-pointer border ${
                activeImg === i
                  ? "border-accent scale-105"
                  : "border-gray-200"
              }`}
            />
          ))}
        </div>
      )}

      {/* 📝 Details */}
      <div className="mt-3">
        <h3
          className="text-sm font-semibold text-gray-800 line-clamp-1"
          title={item.title || item.name}
        >
          {item.title || item.name}
        </h3>

        <div className="flex items-center gap-2 mt-1">
          <span className="text-lg font-bold text-accent">
            ₹{item.salePrice || item.salesPrice}
          </span>

          {(item.originalPrice || item.price) && (
            <span className="line-through text-gray-400 text-sm">
              ₹{item.originalPrice || item.price}
            </span>
          )}
        </div>
      </div>

      {/* 🛒 Cart Section */}
      <div className="mt-4">
        {quantity === 0 ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart(item)
            }}
            className="w-full bg-accent text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-accent/90 transition active:scale-95"
          >
            <ShoppingCart size={16} />
            Add to Cart
          </button>
        ) : (
          <div className="flex items-center justify-between bg-accent text-white rounded-lg px-3 py-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                decreaseItem(item);
              }}
              className="text-lg px-2 hover:scale-110"
            >
              −
            </button>

            <span className="font-semibold">{quantity}</span>

            <button
              onClick={(e) => {
                e.stopPropagation();
                addItem(item);
              }}
              className="text-lg px-2 hover:scale-110"
            >
              +
            </button>
          </div>
        )}
      </div>
      {authModal && (
        <AuthModal onClose={()=>setAuthModal(false)}/>
      )}
    </div>
  );
};

export default UserProductCard;