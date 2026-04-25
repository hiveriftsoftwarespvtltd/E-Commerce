import { Menu, Search, Bell, User, LogOut, Mail } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function AdminHeader({ title, onMenuClick }) {
  const [openDrop, setOpenDrop] = useState(false);

 const navigate = useNavigate();

  const userEmail = localStorage.getItem("adminEmail") || "admin@example.com";

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminRole");

    // redirect to admin login page
    navigate("/admin/login");
  };



  return (
    <header className="w-full bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-30 shadow-sm">
      
      {/* LEFT */}
      <div className="flex items-center gap-3">
        <button className="lg:hidden p-2 border rounded-md" onClick={onMenuClick}>
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-semibold text-gray-800">{title}</h1>
      </div>

      {/* RIGHT */}
      <div className="relative flex items-center gap-4">

        {/* Search */}
        <div className="hidden md:flex items-center relative">
          <Search className="w-4 h-4 absolute left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-3 py-1.5 bg-gray-100 rounded-md text-sm border border-gray-300 focus:border-black outline-none"
          />
        </div>

        {/* Bell Icon */}
        <button className="p-2 hover:bg-gray-100 rounded-md">
          <Bell className="w-5 h-5 text-gray-700" />
        </button>

        {/* User Icon */}
        <button
          className="p-2 hover:bg-gray-100 rounded-full"
          onClick={() => setOpenDrop(!openDrop)}
        >
          <User className="w-5 h-5 text-gray-700" />
        </button>

        {/* DROPDOWN */}
        {openDrop && (
          <div className="absolute right-0 top-12 w-52 bg-white shadow-lg border border-gray-200 rounded-md p-3 z-50 ">
            
            {/* Email Row */}
            <div className="flex items-center gap-2 text-gray-700 border-b pb-2 mb-2">
              <Mail className="w-4 h-4 text-gray-500" />
              <p className="text-sm">{userEmail}</p>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 w-full text-left px-2 py-2 rounded-md text-red-600 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
