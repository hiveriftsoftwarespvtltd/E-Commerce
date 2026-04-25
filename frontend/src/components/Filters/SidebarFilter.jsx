"use client";

import { useState, useEffect } from "react";
import { Disclosure } from "@headlessui/react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import {
  ChevronDownIcon,
  XMarkIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";

import BASE from "../../config"; // ⭐ add this
import { useFilter } from "../../context/FilterContext";

export default function SidebarFilter({ isOpen, onClose, subcategoryId }) {
  const [selected, setSelected] = useState([]); // selected subcategories
  const [priceRange, setPriceRange] = useState([0, 4000]);
  const [inStock, setInStock] = useState(false);

  const { allProducts, setFilteredProducts } = useFilter();

  // ⭐ Fetch Category + Subcategory (same as Navbar)
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    fetch(`${BASE.PRODUCT_BASE}/category/getAllCategory`)
      .then((res) => res.json())
      .then((data) => setCategories(data.result || []));
  }, []);

  useEffect(() => {
    fetch(`${BASE.PRODUCT_BASE}/subcategory/getAllSubCategory`)
      .then((res) => res.json())
      .then((data) => setSubcategories(data.result || []));
  }, []);

  // Disable body scroll when sidebar opens
  // useEffect(() => {
  //   document.body.style.overflow = isOpen ? "hidden" : "auto";
  // }, [isOpen]);

  // ⭐ Prevent Scroll Jump When Sidebar Opens
useEffect(() => {
  const isMobile = window.innerWidth < 768;

  if (!isMobile) {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  } else {
    document.body.style.overflow = "auto"; // mobile → never lock body scroll
  }
}, [isOpen]);


  // Toggle checkbox
  const toggle = (val) => {
    setSelected((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
    );
  };

  // ⭐ APPLY FILTERS
  const applyFilter = () => {
    let filtered = [...allProducts];

    // ⭐ Filter by selected subcategories (if selected)
    if (selected.length > 0) {
      filtered = filtered.filter((p) => {
        const subId =
          typeof p.subcategoryId === "object"
            ? p.subcategoryId._id
            : p.subcategoryId;
        return selected.includes(subId);
      });
    }

    // ⭐ PRICE FILTER (Main part)
    filtered = filtered.filter((p) => {
      const price = p.SalesPrice || p.Price;
      return price >= priceRange[0] && price <= priceRange[1];
    });

    setFilteredProducts(filtered);
    onClose();
  };

  // RESET FILTER
  const resetFilter = () => {
    setSelected([]);
    setPriceRange([0, 4000]);
    setInStock(false);

    // ⭐ Reset only subcategory products
    const filtered = allProducts.filter((p) => {
      const subId =
        typeof p.subcategoryId === "object"
          ? p.subcategoryId._id
          : p.subcategoryId;

      return subId === subcategoryId;
    });

    setFilteredProducts(filtered);
  };
  // Checkbox Component
  const CheckRow = ({ label, text }) => (
    <label className="flex items-center gap-2 text-sm cursor-pointer">
      <input
        type="checkbox"
        className="sr-only"
        checked={selected.includes(label)}
        onChange={() => toggle(label)}
      />

      <span
        className={`h-5 w-5 border flex items-center justify-center rounded ${
          selected.includes(label)
            ? "border-blue-600 bg-blue-50 scale-110"
            : "border-gray-400"
        }`}
      >
        {selected.includes(label) && (
          <CheckIcon className="h-4 w-4 text-blue-700" />
        )}
      </span>

      {text}
    </label>
  );

  // Expand/Collapse Section
  const Section = ({ title, children }) => (
    <Disclosure defaultOpen>
      {({ open }) => (
        <div className="border-b pb-4">
          <Disclosure.Button className="flex justify-between w-full font-medium py-2 hover:bg-gray-100 rounded">
            {title}
            <ChevronDownIcon
              className={`h-5 transition-transform duration-300 ${
                open ? "rotate-180" : ""
              }`}
            />
          </Disclosure.Button>

          <Disclosure.Panel className="mt-2 space-y-2">
            {children}
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );

  return (
    <>
      {/* BACKDROP */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}

      {/* SIDEBAR */}
  <aside 
  className={`absolute top-0 left-0 bg-white shadow-xl z-50 w-full max-w-xs p-5
  overflow-y-auto h-screen transition-all duration-500
  ${isOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"}`}
>

        {/* HEADER */}
        <div className="flex justify-between mb-5">
          <h2 className="text-lg font-semibold">Filters</h2>
          <button onClick={onClose} className="hover:rotate-90">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* RESET + APPLY */}
        <div className="flex gap-3 mb-4">
          <button
            onClick={resetFilter}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Reset
          </button>

          <button
            onClick={applyFilter}
            className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 active:scale-95"
          >
            Apply
          </button>
        </div>

        {/* ⭐ DYNAMIC CATEGORY → SUBCATEGORY MENU (Same as Navbar) */}
        {/* <div className="h-[calc(100vh-120px)] overflow-y-auto pr-2"> */}
        {categories.map((cat) => (
          <Section key={cat._id} title={cat.name}>
            {subcategories
              .filter((sc) => sc.categoryId === cat._id)
              .map((sc) => (
                <CheckRow key={sc._id} label={sc._id} text={sc.name} />
              ))}
          </Section>
        ))}

        {/* PRICE FILTER */}
        <Section title="Price">
          {/* Slider */}
          <Slider
            range
            min={0}
            max={4000}
            value={priceRange}
            onChange={setPriceRange}
          />

          {/* TWO INPUT BOXES LIKE EARTHSTORE */}
          <div className="flex items-center justify-between gap-4 mt-4">
            {/* MIN PRICE */}
            <div className="w-1/2">
              <label className="text-sm text-gray-600">Min Price</label>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={priceRange[0]}
                onChange={(e) => {
                  const minVal = Number(e.target.value);
                  setPriceRange([minVal, priceRange[1]]);
                }}
                className="w-full border px-3 py-2 rounded-md focus:outline-none"
              />
            </div>

            {/* MAX PRICE */}
            <div className="w-1/2">
              <label className="text-sm text-gray-600">Max Price</label>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={priceRange[1]}
                onChange={(e) => {
                  const maxVal = Number(e.target.value);
                  setPriceRange([priceRange[0], maxVal]);
                }}
                className="w-full border px-3 py-2 rounded-md focus:outline-none"
              />
            </div>
          </div>
        </Section>
        {/* </div> */}

        {/* STOCK FILTER */}
        {/* <Section title="Availability">
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              className="sr-only"
              checked={inStock}
              onChange={(e) => setInStock(e.target.checked)}
            />
            <span
              className={`h-5 w-5 border flex items-center justify-center rounded transition-all ${
                inStock
                  ? "border-blue-600 bg-blue-50 scale-110"
                  : "border-gray-400"
              }`}
            >
              {inStock && <CheckIcon className="h-4 w-4 text-blue-700" />}
            </span>
            In Stock
          </label>
        </Section> */}
      </aside>


       {/* ⭐ ADD THIS STYLE BLOCK HERE */}
    <style>
      {`
        .rc-slider-track {
          background-color: #2563eb !important;
          height: 4px !important;
        }

        .rc-slider-rail {
          background-color: #e5e7eb !important;
          height: 4px !important;
        }

        .rc-slider-handle {
          width: 14px !important;
          height: 14px !important;
          margin-top: -5px !important;
          background: white !important;
          border: 2px solid #2563eb !important;
          border-radius: 50% !important;
          box-shadow: 0 0 4px rgba(0,0,0,0.2) !important;
        }

        .rc-slider-handle:hover {
          transform: scale(1.1);
        }

        .rc-slider-handle:active {
          border-color: #1d4ed8 !important;
          transform: scale(1.2);
        }
      `}
    </style>
    </>
  );
}
