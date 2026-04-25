// src/context/FilterContext.jsx
import { createContext, useContext, useState } from "react";

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // All products of page
  const [allProducts, setAllProducts] = useState([]);

  // Filtered products
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Grid columns
  const [gridCols, setGridCols] = useState(4);

  // ⭐ Master APPLY Filter
  const applyFilters = ({ selected, priceRange, inStock }) => {
    let updated = [...allProducts];

    // Normalize fn
    const norm = (s) =>
      String(s).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

    const keywords = selected.map((s) => norm(s));

    updated = updated.filter((p) => {
      const price = Number(p.salePrice);
      if (price < priceRange[0] || price > priceRange[1]) return false;

      if (inStock && p.inStock === false) return false;

      if (keywords.length > 0) {
        const prod = `${norm(p.category)} ${norm(p.subcategory)} ${norm(p.title)}`;
        const match = keywords.some((k) => prod.includes(k));
        if (!match) return false;
      }

      return true;
    });

    setFilteredProducts(updated);
  };

  // Reset
  const resetFilters = () => {
    setFilteredProducts(allProducts);
  };

  return (
    <FilterContext.Provider
      value={{
        isFilterOpen,
        setIsFilterOpen,

        allProducts,
        setAllProducts,

        filteredProducts,
        setFilteredProducts,

        gridCols,
        setGridCols,

        applyFilters,
        resetFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => useContext(FilterContext);
