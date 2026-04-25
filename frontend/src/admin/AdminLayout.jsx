import React, { useState } from "react";
import Sidebar from "../admin/component/Sidebar.jsx";
import AdminHeader from "../admin/component/AdminHeader";
import { Outlet,useNavigate  } from "react-router-dom";

export default function AdminLayout({ title }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminRole");
    navigate("/admin/login");
  };
  
  return (
    <div className="flex h-screen overflow-hidden">

      {/* FIXED SIDEBAR */}
      <div className="flex-shrink-0">
        <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      </div>

      {/* RIGHT SIDE CONTENT */}
      <div className="flex flex-col flex-1 min-w-0">

        {/* HEADER (fixed height) */}
        <AdminHeader
          title={title}
          onMenuClick={() => setMobileOpen(true)}
        />

        {/* RIGHT CONTENT SCROLLS */}
        <main className="flex-1 overflow-y-auto bg-gray-100 p-4 lg:p-6">
          <Outlet />
        </main>
      </div>

    </div>
  );
}
