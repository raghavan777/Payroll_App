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
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

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
                {isOpen && <span className="text-sm font-medium">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* LOGOUT */}
        <button
          onClick={logout}
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
    </div>
  );
}
