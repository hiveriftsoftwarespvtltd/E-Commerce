import { useAuth } from "@/context/UserContext";
import { Navigate, useLocation } from "react-router-dom";

const AuthRoute = ({ children, allowedRoles = [], publicRoutes = [] }) => {
  const { isLoggedIn, user } = useAuth();
  const location = useLocation();

  const pathname = location.pathname;

  const isPublic = publicRoutes.some(route =>
    pathname.startsWith(route)
  );

  // If not logged in & route is not public
  if (!isLoggedIn && !isPublic) {
    return <Navigate to="/login" replace />;
  }

  // If logged in but role not allowed
  if (allowedRoles.length && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unAuthorized" replace />;
  }

  return children;
};

export default AuthRoute;