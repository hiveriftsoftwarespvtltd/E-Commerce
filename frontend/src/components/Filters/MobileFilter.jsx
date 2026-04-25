import { SlidersHorizontal } from "lucide-react";
import { useFilter } from "../../context/FilterContext";

const MobileFilter = () => {
  const { setFilterOpen } = useFilter();

  return (
    <button
      onClick={() => setFilterOpen(true)}
      className="lg:hidden w-full my-3 py-3 border rounded-md flex justify-center items-center gap-2 font-semibold"
    >
      <SlidersHorizontal size={20} />
      FILTERS
    </button>
  );
};

export default MobileFilter;
