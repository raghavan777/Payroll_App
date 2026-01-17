import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/tailwind.css";
import { Toaster } from "react-hot-toast";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Public Pages
import Login from "./pages/Login";
import RegisterOrg from "./pages/RegisterOrg";
import VerifyOrgPage from "./pages/VerifyOrgPage";

// Protected Layout & Pages
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import UserManagement from "./pages/UserManagement";
import Payroll from "./pages/Payroll";
import AddEmployee from "./pages/AddEmployee";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <Toaster position="top-right" />

      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/login" element={<Login />} />
        <Route path="/register-org" element={<RegisterOrg />} />
        <Route path="/verify-org/:status" element={<VerifyOrgPage />} />

        {/* PROTECTED ROUTES WITH LAYOUT */}
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          {/* Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* User Management */}
          <Route
            path="/users"
            element={
              <ProtectedRoute permission="manage_users">
                <UserManagement />
              </ProtectedRoute>
            }
          />

          {/* Add Employee */}
          <Route
            path="/add-employee"
            element={
              <ProtectedRoute permission="manage_users">
                <AddEmployee />
              </ProtectedRoute>
            }
          />

          {/* Payroll */}
          <Route
            path="/payroll"
            element={
              <ProtectedRoute permission="run_payroll">
                <Payroll />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* DEFAULT FALLBACK */}
        <Route path="*" element={<Login />} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);
