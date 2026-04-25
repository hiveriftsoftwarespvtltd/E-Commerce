import { useFilter } from "../context/FilterContext";

const GridToggle = () => {
  const { gridView, setGridView } = useFilter();

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => setGridView(true)}
        className={`px-3 py-1 border rounded ${gridView ? "bg-black text-white" : ""}`}
      >
        Grid
      </button>

      <button
        onClick={() => setGridView(false)}
        className={`px-3 py-1 border rounded ${!gridView ? "bg-black text-white" : ""}`}
      >
        List
      </button>
    </div>
  );
};

export default GridToggle;
