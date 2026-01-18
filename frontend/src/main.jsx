import React from "react";
import ReactDOM from "react-dom/client";
<<<<<<< HEAD
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
=======
import { BrowserRouter, Routes, Route } from "react-router-dom";
>>>>>>> ef5b7a3be67d05549acb3cc4e113e2c20a71ccf9
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
<<<<<<< HEAD
import AddEmployee from "./pages/AddEmployee";
import Payroll from "./pages/Payroll";

// Module-2 Pages
import TaxSlab from "./pages/TaxSlab";
import StatutoryConfig from "./pages/StatutoryConfig";
import RunPayroll from "./pages/RunPayroll";
=======
import Payroll from "./pages/Payroll";
import AddEmployee from "./pages/AddEmployee";
>>>>>>> ef5b7a3be67d05549acb3cc4e113e2c20a71ccf9

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <Toaster position="top-right" />

      <Routes>
<<<<<<< HEAD

        {/* --- PUBLIC ROUTES --- */}
=======
        {/* PUBLIC ROUTES */}
>>>>>>> ef5b7a3be67d05549acb3cc4e113e2c20a71ccf9
        <Route path="/login" element={<Login />} />
        <Route path="/register-org" element={<RegisterOrg />} />
        <Route path="/verify-org/:status" element={<VerifyOrgPage />} />

<<<<<<< HEAD
        {/* --- ROOT REDIRECT --- */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* --- PROTECTED ROUTES WITH SIDEBAR LAYOUT --- */}
=======
        {/* PROTECTED ROUTES WITH LAYOUT */}
>>>>>>> ef5b7a3be67d05549acb3cc4e113e2c20a71ccf9
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
<<<<<<< HEAD

          {/* Module-1 */}
          <Route path="/dashboard" element={<Dashboard />} />

=======
          {/* Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* User Management */}
>>>>>>> ef5b7a3be67d05549acb3cc4e113e2c20a71ccf9
          <Route
            path="/users"
            element={
              <ProtectedRoute permission="manage_users">
                <UserManagement />
              </ProtectedRoute>
            }
          />

<<<<<<< HEAD
=======
          {/* Add Employee */}
>>>>>>> ef5b7a3be67d05549acb3cc4e113e2c20a71ccf9
          <Route
            path="/add-employee"
            element={
              <ProtectedRoute permission="manage_users">
                <AddEmployee />
              </ProtectedRoute>
            }
          />

<<<<<<< HEAD
=======
          {/* Payroll */}
>>>>>>> ef5b7a3be67d05549acb3cc4e113e2c20a71ccf9
          <Route
            path="/payroll"
            element={
              <ProtectedRoute permission="run_payroll">
                <Payroll />
              </ProtectedRoute>
            }
          />
<<<<<<< HEAD

          {/* Module-2 */}
          <Route
            path="/tax-slab"
            element={
              <ProtectedRoute permission="manage_statutory">
                <TaxSlab />
              </ProtectedRoute>
            }
          />

          <Route
            path="/statutory"
            element={
              <ProtectedRoute permission="manage_statutory">
                <StatutoryConfig />
              </ProtectedRoute>
            }
          />

          <Route
            path="/run-payroll"
            element={
              <ProtectedRoute permission="run_payroll">
                <RunPayroll />
              </ProtectedRoute>
            }
          />

        </Route>

        {/* --- CATCH ALL UNKNOWN ROUTES --- */}
        <Route path="*" element={<Navigate to="/login" replace />} />

=======
        </Route>

        {/* DEFAULT FALLBACK */}
        <Route path="*" element={<Login />} />
>>>>>>> ef5b7a3be67d05549acb3cc4e113e2c20a71ccf9
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);
