// src/context/SearchContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import BASE from "../config";
import { api } from "@/utils/axios-interceptor";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Saare products store karne ke liye
  const [allWebsiteProducts, setAllWebsiteProducts] = useState([]);

  // ⭐ Fetch all products from backend when app loads
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        // const res = await fetch(`${BASE.PRODUCT_BASE}/product-detail`);
        // const data = await res.json();
        const response = await api.get("/product-detail")

        // Store products globally
        setAllWebsiteProducts(response.data.result || []);
      } catch (err) {
        console.log("Product fetch error:", err);
      }
    };

    fetchAllProducts();
  }, []);

  // ⭐ Search Function
  const searchProducts = (query) => {
    setSearchQuery(query);

    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const lower = query.toLowerCase();

    // Backend fields = Name
    const filtered = allWebsiteProducts.filter((p) =>
      p.Name?.toLowerCase().includes(lower)
    );

    setSearchResults(filtered);
  };

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        searchResults,
        searchProducts,
        allWebsiteProducts,
        setAllWebsiteProducts,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
