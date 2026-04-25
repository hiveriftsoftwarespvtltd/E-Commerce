import { useFilter } from "../../context/FilterContext";
import { SlidersHorizontal, Grid, List } from "lucide-react";

export default function FilterHeader({ total = 29 }) {
  const { setIsFilterOpen, gridCols, setGridCols } = useFilter();

  return (
    <div className="flex justify-between items-center py-3 mb-5 border-b px-5">
      {/* Left - FILTER BUTTON */}
      <button
        onClick={() => {
          setIsFilterOpen(true);
        }}
        className="flex items-center gap-2 font-semibold"
      >
        <SlidersHorizontal size={20} />
        SHOW FILTER
        <span className="ml-2 text-gray-600">({total})</span>
      </button>

      {/* Middle - Product Count (desktop only) */}
      <div className="hidden lg:block text-gray-700 font-medium">
        Showing {total} products
      </div>

      {/* Right - Sort + Grid Buttons */}
      <div className="flex items-center gap-4">
        {/* SORT DROPDOWN */}
        <select className="hidden lg:block border px-3 py-1 rounded">
          <option>Featured</option>
          <option>Best Selling</option>
          <option>Alphabetically, A-Z</option>
          <option>Alphabetically, Z-A</option>
          <option>Price, low to high</option>
          <option>Price, high to low</option>
        </select>

        {/* GRID BUTTONS */}
        <div className="hidden lg:flex items-center gap-3">
          <Grid
            size={20}
            className={`cursor-pointer ${
              gridCols === 2 ? "text-black" : "text-gray-400"
            }`}
            onClick={() => setGridCols(2)}
          />
          <Grid
            size={20}
            className={`cursor-pointer ${
              gridCols === 3 ? "text-black" : "text-gray-400"
            }`}
            onClick={() => setGridCols(3)}
          />
          <Grid
            size={20}
            className={`cursor-pointer ${
              gridCols === 4 ? "text-black" : "text-gray-400"
            }`}
            onClick={() => setGridCols(4)}
          />
          <List
            size={20}
            className={`cursor-pointer ${
              gridCols === 1 ? "text-black" : "text-gray-400"
            }`}
            onClick={() => setGridCols(1)}
          />
        </div>
      </div>
    </div>
  );
}
