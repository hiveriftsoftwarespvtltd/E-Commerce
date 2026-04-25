import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  Percent,
  X,
  RectangleHorizontal,
  Settings,
  User,
} from "lucide-react";

export default function Sidebar({ mobileOpen, setMobileOpen }) {
  return (
    <>
      {/* MOBILE OVERLAY */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
    fixed top-0 left-0 z-50 h-screen lg:h-screen 
    w-64 bg-gray-900 text-white p-6
    transform transition-transform duration-300
    ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
    lg:translate-x-0 lg:static
    overflow-hidden   /* ← ADD THIS */
  `}
      >
        {/* Close Mobile */}
        <button
          className="lg:hidden absolute right-4 top-4 text-white"
          onClick={() => setMobileOpen(false)}
        >
          <X className="w-6 h-6" />
        </button>

        <h1 className="text-2xl font-bold mb-10 mt-8 lg:mt-0">Admin Panel</h1>

        <nav className="space-y-6">
          <SidebarLink
            to="/admin"
            icon={<LayoutDashboard />}
            label="Dashboard"
            onClick={setMobileOpen}
          />
          <SidebarLink
            to="/admin/orders"
            icon={<ShoppingCart />}
            label="Orders"
            onClick={setMobileOpen}
          />
          <SidebarLink
            to="/admin/products"
            icon={<Package />}
            label="Products"
            onClick={setMobileOpen}
          />
          <SidebarLink
            to="/admin/categories"
            icon={<Package />}
            label="Categories"
            onClick={setMobileOpen}
          />
          {/* <SidebarLink
            to="/admin/subcategories"
            icon={<Package />}
            label="SubCategories"
            onClick={setMobileOpen}
          /> */}
          <SidebarLink
            to="/admin/customers"
            icon={<Users />}
            label="Customers"
            onClick={setMobileOpen}
          />
          {/* <SidebarLink
            to="/admin/coupons"
            icon={<Percent />}
            label="Coupons"
            onClick={setMobileOpen}
          /> */}
          {/* <SidebarLink
            to="/admin/banners"
            icon={<RectangleHorizontal />}
            label="Banners"
            onClick={setMobileOpen}
          /> */}
          {/* <SidebarLink to="/admin/WebsiteSettings" icon={<Settings  />} label="Website Settings" onClick={setMobileOpen} /> */}
          <SidebarLink
            to="/admin/profile"
            icon={<User />}
            label="Profile"
            onClick={setMobileOpen}
          />
        </nav>
      </aside>
    </>
  );
}

function SidebarLink({ to, icon, label, onClick }) {
  return (
    <Link
      to={to}
      onClick={() => onClick(false)}
      className="flex items-center gap-3 text-gray-200 hover:text-white hover:bg-gray-800 p-2 rounded-lg transition"
    >
      {icon} {label}
    </Link>
  );
}
