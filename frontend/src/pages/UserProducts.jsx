import React, { useState, useMemo, useEffect } from "react";
import UserProductCard from "../components/UserProductCard";

// dummy data (you can replace with API)
import productsData from "../../products.json"
import ProductFilters from "../components/ProductFilters";
import UserProductCardSkeleton from "../components/UserProductCardSkeleton";
import { useSearchParams } from "react-router-dom";
import { useSearch } from "@/context/SearchContext";
import { api } from "@/utils/axios-interceptor";

const UserProducts = () => {
   const [searchParams,setSearchParams] = useSearchParams()
    const [loading,setLoading] = useState(false)
    const {allWebsiteProducts,setAllWebsiteProducts} = useSearch()
    const [filters, setFilters] = useState({
    category: searchParams.get("category") ||"",
    min: searchParams.get("min") || "",
    max: searchParams.get("max") || "",
  });

  

  const filterConfig = [
  {
    type: "select",
    name: "category",
    placeholder: "All Categories",
    options: [
      { label: "All Categories", value: "" },
      { label: "Household", value: "Household" },
      { label: "Gadgets", value: "Gadgets" },
      { label: "Gifts", value: "Gifts" },
      { label: "Home Decor", value: "Home Decor" },
      { label: "Car Interior", value: "Car Interior" },
      { label: "Car Exterior", value: "Car Exterior" },
      { label: "Accessories", value: "Accessories" },
    ],
  },
  {
    type: "number",
    name: "min",
    placeholder: "Min Price",
  },
  {
    type: "number",
    name: "max",
    placeholder: "Max Price",
  },
];

// const fetchProducts = async()=>{
//   try {
//     const response = await api.get("/product-detail")
//     if(response.data.success){
//       setP
//     }
//   } catch (error) {
//     console.log("Fetch Products Error",error)
//   }
// }



useEffect(() => {
  setFilters({
    category: searchParams.get("category") || "",
    min: searchParams.get("min") || "",
    max: searchParams.get("max") || "",
  });
}, [searchParams]);


  const filteredProducts = useMemo(() => {
    return allWebsiteProducts?.filter((p) => {
      return (
        (!filters.category || p.category.description === filters.category) &&
        (!filters.min || p.salesPrice >= filters.min) &&
        (!filters.max || p.salesPrice <= filters.max)
      );
    });
  }, [filters,allWebsiteProducts]);

  const handleWishlistChange = (id, updatedFav) => {
  // update global product list
  const updatedProducts = allWebsiteProducts.map((p) =>
    p._id === id ? { ...p, isFavourite: updatedFav } : p
  );

  
  setAllWebsiteProducts(updatedProducts);
};


  return (
    <div className="max-w-[1440px] mx-auto p-4 min-h-screen">

      {/* 🔍 FILTERS */}
      <ProductFilters config={filterConfig} 
        filters={filters} 
        setFilters={setFilters}
        onClear={()=>setSearchParams({})}/>
      {/* 🛍️ PRODUCTS GRID */}
      {!loading && filteredProducts?.length === 0 ? (
        <main className="min-h-auto w-full flex justify-center items-center">
         <span className="text-accent font-semibold text-xl">No Product Found </span>
       </main>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:grid-cols-4">
        {loading
    ? Array.from({ length: 8 }).map((_, i) => (
        <UserProductCardSkeleton key={i} />
      )) : filteredProducts.map((item) => (
        <UserProductCard key={item.id} item={item} onWishlistChange={handleWishlistChange}/>
      ))}
      </div>
      )}
      
    </div>
  );
};

export default UserProducts;