import { Navigate } from "react-router-dom";

export default function AdminProtected({ children }) {
  const role = localStorage.getItem("userRole");
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  if (role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
}
