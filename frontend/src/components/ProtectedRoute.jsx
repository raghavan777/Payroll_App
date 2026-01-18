<<<<<<< HEAD
import { Navigate } from "react-router-dom";
=======
import { Navigate, useLocation } from "react-router-dom";
>>>>>>> ef5b7a3be67d05549acb3cc4e113e2c20a71ccf9
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ permission, children }) {
  const { user, loading, hasPermission } = useAuth();
<<<<<<< HEAD

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;  
=======
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
>>>>>>> ef5b7a3be67d05549acb3cc4e113e2c20a71ccf9

  return children;
}
