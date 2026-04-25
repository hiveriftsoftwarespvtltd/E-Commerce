import React, { useEffect, useState } from "react";
import productData from "../../products.json";
import UserProductCard from "../components/UserProductCard";
import WishlistSkeleton from "../components/WishlistSkeletonCard";
import { useSearch } from "@/context/SearchContext";

export default function Favourites() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const {allWebsiteProducts,setAllWebsiteProducts} = useSearch()

  useEffect(() => {
    setTimeout(() => {
      const wishlist = allWebsiteProducts?.filter(
        (item) => item.isFavourite,
      );
      setItems(wishlist);
      setLoading(false);
    }, 800);
  }, [items]);
  const handleWishlistChange = (id, updatedFav) => {
  // update global product list
  const updatedProducts = allWebsiteProducts.map((p) =>
    p._id === id ? { ...p, isFavourite: updatedFav } : p
  );

  
  setAllWebsiteProducts(updatedProducts);
};


  if (loading) return <WishlistSkeleton />;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">My Wishlist ❤️</h1>

      {items?.length === 0 ? (
        <p>No wishlist items</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {items?.map((item) => (
            <UserProductCard
              key={item.id}
              item={item}
              onWishlistChange={handleWishlistChange}
            />
          ))}
        </div>
      )}
    </div>
  );
}
