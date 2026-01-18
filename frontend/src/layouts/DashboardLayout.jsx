<<<<<<< HEAD
// src/layouts/DashboardLayout.jsx
import { Link, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { sidebarItems } from "../config/sidebarConfig";
import * as Icons from "react-icons/md";
import { useState } from "react";

export default function DashboardLayout() {
  const { role, hasPermission, logout } = useAuth();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);

  const renderIcon = (name) => {
    const Icon = Icons[name];
    return Icon ? <Icon size={22} /> : null;
=======
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import * as Icons from "react-icons/md";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { sidebarItems } from "../config/sidebarConfig";

export default function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { role, logout } = useAuth(); // ⬅ Use AuthContext instead of manual decode
  const [isOpen, setIsOpen] = useState(true);

  const IconResolver = (iconName) => {
    const Icon = Icons[iconName];
    return Icon ? <Icon size={20} /> : null;
>>>>>>> ef5b7a3be67d05549acb3cc4e113e2c20a71ccf9
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
<<<<<<< HEAD
      
      {/* SIDEBAR */}
      <aside
        className={`${
          isOpen ? "w-64" : "w-20"
        } bg-gradient-to-b from-violet-600 to-indigo-600 text-white flex flex-col transition-all duration-300`}
      >
        <div className="flex items-center justify-between p-4">
          {isOpen && <span className="text-lg font-bold">Payroll SaaS</span>}

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 bg-white/10 hover:bg-white/20 rounded-md"
          >
            {isOpen ? <Icons.MdChevronLeft size={20} /> : <Icons.MdChevronRight size={20} />}
          </button>
        </div>

        {/* NAV MENU */}
        <nav className="flex-1 px-2 space-y-1">
          {(sidebarItems[role] || []).map((item, idx) => {

            const active = location.pathname.startsWith(item.path);

            return (
              <Link
                key={idx}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-3 rounded-md transition ${
                  active ? "bg-black/20" : "hover:bg-black/10"
                }`}
              >
                {renderIcon(item.icon)}
=======

      {/* SIDEBAR */}
      <div
        className={`${
          isOpen ? "w-64" : "w-20"
        } bg-gradient-to-b from-violet-600 to-indigo-600 text-white shadow-2xl transition-all duration-300 flex flex-col`}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between p-4">
          {isOpen && <span className="font-semibold text-lg">Payroll</span>}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 hover:bg-violet-700 rounded"
          >
            {isOpen ? (
              <Icons.MdChevronLeft size={22} />
            ) : (
              <Icons.MdChevronRight size={22} />
            )}
          </button>
        </div>

        {/* SIDEBAR MENU */}
        <nav className="mt-3 space-y-1 px-2 flex-1">
          {(sidebarItems[role] || []).map((item, index) => {
            const active = location.pathname.startsWith(item.path);
            return (
              <Link
                key={index}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg transition ${
                  active ? "bg-violet-900/50" : "hover:bg-violet-700/40"
                }`}
              >
                {IconResolver(item.icon)}
>>>>>>> ef5b7a3be67d05549acb3cc4e113e2c20a71ccf9
                {isOpen && <span className="text-sm font-medium">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* LOGOUT */}
        <button
          onClick={logout}
<<<<<<< HEAD
          className="flex items-center gap-3 px-3 py-3 text-red-200 hover:bg-red-500/20 transition mx-2 mb-3 rounded"
        >
          <Icons.MdLogout size={20} />
          {isOpen && "Logout"}
        </button>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
=======
          className="flex items-center gap-3 px-3 py-3 mx-2 mb-4 text-red-200 hover:bg-red-500/20 rounded transition"
        >
          <Icons.MdLogout size={22} />
          {isOpen && "Logout"}
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-6">
        <Outlet />
      </div>
>>>>>>> ef5b7a3be67d05549acb3cc4e113e2c20a71ccf9
    </div>
  );
}
