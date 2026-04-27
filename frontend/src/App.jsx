// src/App.jsx
import { useEffect, useState } from "react";

import { useLocation } from "react-router-dom";
import { Routes, Route, Outlet } from "react-router-dom";
import SubcategoryProductPage from "./pages/SubcategoryProductPage";
import Navbar from "./components/Navbar";
import CartDrawer from "./components/CartDrawer";
import Home from "./components/Home";
import Checkout from "./pages/Checkout";
import Footer from "./components/Footer";
import FooterTape from "./components/FooterTape";
import OrderSuccess from "./pages/OrderSuccess";

// Admin
import AdminLayout from "./admin/AdminLayout";
import ProtectedAdminRoute from "./admin/ProtectedAdminRoute";

import Dashboard from "./admin/pages/Dashboard";
// Admin Auth Pages
import AdminLogin from "./admin/pages/AdminLogin";
import AdminSignup from "./admin/pages/AdminSignup";

import Orders from "./admin/pages/Orders";
import OrderDetails from "./admin/pages/OrderDetails";
import Products from "./admin/pages/Products";
import Customers from "./admin/pages/Customers";
import Coupons from "./admin/pages/Coupons";
import Categories from "./admin/pages/Categories";
import SubCategories from "./admin/pages/SubCategories";
import Banners from "./admin/pages/Banners";
import WebsiteSettings from "./admin/pages/WebsiteSettings";
import Profile from "./admin/pages/Profile";


import Signup from "./components/Signup";
import Login from "./components/Login";
import MyOrder from "./Profile/MyOrder";
import UserProfile from "./Profile/UserProfile";

// CONTEXTS
import { FilterProvider } from "./context/FilterContext";
import { SearchProvider } from "./context/SearchContext";
import ShippingPolicy from "./components/ShippingPolicy";
import RefundPolicy from "./components/RefundPolicy";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsOfService from "./components/TermsOfService";
import ContactPage from "./components/ContactPage";
import FAQPage from "./components/FAQPage";
import BlogCard from "./components/BlogCard";
import ProductDetails from "./components/ProductDetails";
import UserOrderDetails from "./Profile/UserOrderDetails";
import ReturnReplace from "./components/ReturnReplace";
import SearchResults from "./pages/SearchResults";
import UserProducts from "./pages/UserProducts";
import Favourites from "./pages/Favourites";
import MobileNavbar from "./components/MobileNavbar";
import ScrollToTop from "./components/ScrollToTop";
import AuthRoute from "./wrapper/AuthRoute";

// Layout
function MainLayout({ cartOpen, onCartOpen, onCartClose }) {
  return (
    <>
      <ScrollToTop/>
      <Navbar onCartOpen={onCartOpen} />
      <CartDrawer isOpen={cartOpen} onClose={onCartClose} />

      <main className="min-h-screen">
        <Outlet />
      </main>

      <Footer />
      <FooterTape />
      <MobileNavbar onCartOpen={onCartOpen}/>
    </>
  );
}

export default function App() {
  const location = useLocation();
  const [cartOpen, setCartOpen] = useState(false);
  // ⭐ Whenever route changes → close cart
  useEffect(() => {
    setCartOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* ⭐ ONLY ONE WRAPPER — Correct */}
      <FilterProvider>
        <SearchProvider>
          <Routes>
            {/* PUBLIC ROUTES */}
            <Route
              element={
                <AuthRoute allowedRoles={["user","admin"]}>
                  <MainLayout
                  cartOpen={cartOpen}
                  onCartOpen={() => setCartOpen(true)}
                  onCartClose={() => setCartOpen(false)}
                />
                </AuthRoute>
                
              }
            >
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<UserProfile/>} />
               <Route path="/products" element={<UserProducts />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-success" element={<OrderSuccess />} />
              {/* ⭐ ADD THIS LINE HERE */}
              <Route path="/search" element={<SearchResults />} />
              <Route path="/favourites" element={<Favourites />} />
              <Route path="/orders/:orderId" element={<UserOrderDetails />} />

              {/* Decor Pages */}

              {/* DYNAMIC SUBCATEGORY PAGE */}
              {/* <Route path="/subcategory/:id" element={<TableDecor />} /> */}
              {/* <Route
                path="/subcategory/:id"
                element={<SubcategoryProductPage />}
              /> */}

              {/* <Route path="/TableDecor" element={<TableDecor />} /> */}
             
              {/* Auth */}
             
              <Route path="/MyOrder" element={<MyOrder />} />
              <Route path="/UserProfile" element={<UserProfile />} />
              <Route path="/ShippingPolicy" element={<ShippingPolicy />} />
              <Route path="/RefundPolicy" element={<RefundPolicy />} />
              <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
              <Route path="/TermsOfService" element={<TermsOfService />} />
              <Route path="/ContactPage" element={<ContactPage />} />
              <Route path="/FAQPage" element={<FAQPage />} />
              <Route path="/BlogCard" element={<BlogCard />} />
              <Route path="/product/:id" element={<ProductDetails />} />

              <Route path="/UserOrderDetails" element={<UserOrderDetails />} />
              <Route path="/order/:id" element={<UserOrderDetails />} />

              <Route path="/ReturnReplace" element={<ReturnReplace />} />
            </Route>
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />

            {/*      ADMIN AUTH ROUTES          */}
            {/* =============================== */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/signup" element={<AdminSignup />} />

            {/* ADMIN ROUTES */}
            {/* <Route path="/admin" element={<AdminLayout />}> */}
            
            <Route
              path="/admin"
              element={
                // <ProtectedAdminRoute>
                //   <AdminLayout />
                // </ProtectedAdminRoute>
                <AuthRoute allowedRoles={["admin"]}>
                  <AdminLayout />
                </AuthRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="orders" element={<Orders />} />
              <Route path="orders/:id" element={<OrderDetails />} />
              <Route path="products" element={<Products />} />
              <Route path="categories" element={<Categories />} />
              <Route path="subcategories" element={<SubCategories />} />
              <Route path="customers" element={<Customers />} />
              <Route path="coupons" element={<Coupons />} />
              <Route path="banners" element={<Banners />} />
              <Route path="WebsiteSettings" element={<WebsiteSettings />} />
              <Route path="/admin/profile" element={<Profile />} />
            </Route>

            {/* 404 */}
            <Route
              path="*"
              element={
                <div className="flex h-screen items-center justify-center text-2xl">
                  404 - Page Not Found
                </div>
              }
            />

            <Route
              path="unAuthorized"
              element={
                <div className="flex h-screen items-center justify-center text-2xl">
                  Your are not Authorized to get get this resource
                </div>
              }
            />
            
          </Routes>
        </SearchProvider>
      </FilterProvider>
    </>
  );
}
