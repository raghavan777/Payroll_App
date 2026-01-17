// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
  const loadUser = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

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

    setLoading(false);
  };

  // 🔹 LOGOUT: Reset state only (no hard reload)
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  // 🔹 PERMISSION CHECKER
  const hasPermission = (perm) => {
    return user?.permissions?.includes(perm);
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
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
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
