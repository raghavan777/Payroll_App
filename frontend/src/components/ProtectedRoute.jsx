import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ permission, children }) {
  const { user, loading, hasPermission } = useAuth();
  const location = useLocation();

  // Wait for initialization
  if (loading) {
    return <div className="p-6 text-gray-600">Loading...</div>;
  }

  // Not logged in → redirect to login with return path
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Role-permission blocking
  if (permission && user.role === "SUPER_ADMIN") {
    return children; // always allow super admin
  }

  if (permission && !hasPermission(permission)) {
    return <div className="p-6 text-red-600 font-semibold">Access Denied</div>;
  }

  return children;
}
