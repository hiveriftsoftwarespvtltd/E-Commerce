import products from "../data/products";
import { FilterProvider } from "../context/FilterContext";
import SidebarFilter from "../components/Filters/SidebarFilter";
import MobileFilter from "../components/Filters/MobileFilter";
import ProductList from "../components/ProductList";
import GridToggle from "../components/GridToggle";

export default function Shop() {
  return (
    <FilterProvider products={products}>
      <div className="flex">
        <SidebarFilter />

        <div className="flex-1 p-4">
          <MobileFilter />
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Products</h2>
            <GridToggle />
          </div>

          <ProductList />
        </div>
      </div>
    </FilterProvider>
  );
}
