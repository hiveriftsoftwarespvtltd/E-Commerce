import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedAdminRoute({ children }) {
  const token = localStorage.getItem("adminToken");

  // if not logged in → redirect to admin login
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
