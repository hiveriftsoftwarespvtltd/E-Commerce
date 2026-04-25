import { useFilter } from "../context/FilterContext";

export default function ProductList() {
  const { filteredProducts, gridView } = useFilter();

  return (
    <div
      className={
        gridView
          ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          : "flex flex-col gap-4"
      }
    >
      {filteredProducts.map((p) => (
        <div
          key={p.id}
          className="border p-3 rounded shadow-sm flex gap-4"
        >
          <img
            src={p.image}
            className="w-32 h-32 object-cover rounded"
          />
          <div>
            <h3 className="font-semibold">{p.name}</h3>
            <p className="text-sm text-gray-600">₹{p.price}</p>
            {!gridView && <p className="text-xs mt-1">{p.description}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}
