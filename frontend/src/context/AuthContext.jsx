<<<<<<< HEAD
import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"; // <-- FIXED HERE
=======
// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
>>>>>>> ef5b7a3be67d05549acb3cc4e113e2c20a71ccf9

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

<<<<<<< HEAD
  const login = (token) => {
    localStorage.setItem("token", token);
    const decoded = jwtDecode(token);

    setUser({
      token,
      name: decoded.name,
      role: decoded.role,
      permissions: decoded.permissions || []
    });

    setLoading(false);
  };

=======
  // 🔹 LOGIN: Save token + decode + update context
  const login = (token) => {
    localStorage.setItem("token", token);

    try {
      const decoded = jwtDecode(token);
      setUser({
        token,
        name: decoded.name ?? "User",
        role: decoded.role,
        userId: decoded.userId,
        permissions: decoded.permissions || []
      });
    } catch (err) {
      console.error("INVALID TOKEN:", err);
      logout();
    }
  };

  // 🔹 LOAD FROM LOCALSTORAGE (on refresh)
>>>>>>> ef5b7a3be67d05549acb3cc4e113e2c20a71ccf9
  const loadUser = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

<<<<<<< HEAD
    const decoded = jwtDecode(token);

    setUser({
      token,
      name: decoded.name,
      role: decoded.role,
      permissions: decoded.permissions || []
    });
=======
    try {
      const decoded = jwtDecode(token);
      setUser({
        token,
        name: decoded.name ?? "User",
        role: decoded.role,
        userId: decoded.userId,
        permissions: decoded.permissions || []
      });
    } catch (err) {
      console.warn("Invalid token, clearing...");
      localStorage.removeItem("token");
      setUser(null);
    }
>>>>>>> ef5b7a3be67d05549acb3cc4e113e2c20a71ccf9

    setLoading(false);
  };

<<<<<<< HEAD
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/login";
  };

  const hasPermission = (perm) => {
    return Array.isArray(user?.permissions) && user.permissions.includes(perm);
=======
  // 🔹 LOGOUT: Reset state only (no hard reload)
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  // 🔹 PERMISSION CHECKER
  const hasPermission = (perm) => {
    return user?.permissions?.includes(perm);
>>>>>>> ef5b7a3be67d05549acb3cc4e113e2c20a71ccf9
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
<<<<<<< HEAD
    <AuthContext.Provider value={{ user, role: user?.role, login, logout, hasPermission, loading }}>
=======
    <AuthContext.Provider
      value={{
        user,
        role: user?.role,
        loading,
        login,
        logout,
        hasPermission
      }}
    >
>>>>>>> ef5b7a3be67d05549acb3cc4e113e2c20a71ccf9
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
