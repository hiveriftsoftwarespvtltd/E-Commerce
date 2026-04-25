import React from "react";

const ProductFilters = ({ config, filters, setFilters, onClear }) => {
  const handleChange = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-wrap gap-3 mb-6 p-3 rounded-2xl bg-white/70 backdrop-blur-md  ">

      {config.map((filter, idx) => {
        // 🔽 SELECT
        if (filter.type === "select") {
          return (
            <div key={idx} className="relative">
              <select
                value={filters[filter.name] || ""}
                onChange={(e) =>
                  handleChange(filter.name, e.target.value)
                }
                className="appearance-none px-4 py-2 pr-8 rounded-full text-sm 
                bg-white border border-gray-200 shadow-sm
                focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent
                hover:border-accent transition-all duration-200 cursor-pointer"
              >
                {filter.options.map((opt, i) => (
                  <option key={i} value={opt.value} className="rounded-lg">
                    {opt.label}
                  </option>
                ))}
              </select>

              {/* Custom arrow */}
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs pointer-events-none">
                ▼
              </span>
            </div>
          );
        }

        // 🔢 INPUT
        return (
          <input
            key={idx}
            type={filter.type}
            placeholder={filter.placeholder}
            value={filters[filter.name] || ""}
            onChange={(e) =>
              handleChange(
                filter.name,
                filter.type === "number"
                  ? Number(e.target.value)
                  : e.target.value
              )
            }
            className="px-4 py-2 rounded-full w-[130px] text-sm
            bg-white border border-gray-200 shadow-sm
            focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent
            hover:border-accent transition-all duration-200"
          />
        );
      })}

      {/* ❌ Clear Filters */}
      <button
        onClick={() => {
          setFilters({});
          onClear();
        }}
        className="px-4 py-2 rounded-full text-sm font-medium
        border border-gray-300 text-gray-600 
        hover:bg-red-50 hover:text-red-500 hover:border-red-300
        transition-all duration-200"
      >
        Clear
      </button>
    </div>
  );
};

export default ProductFilters;