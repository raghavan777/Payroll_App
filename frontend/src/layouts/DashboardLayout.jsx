import { Link, Outlet, useNavigate } from "react-router-dom";
import { sidebarItems } from "../config/sidebarConfig";
import * as Icons from "react-icons/md";
import { useState, useEffect } from "react";

export default function DashboardLayout() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const [role, setRole] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const data = JSON.parse(atob(token.split(".")[1]));
      setRole(data.role);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const IconResolver = (name) => {
    const Icon = Icons[name];
    return <Icon size={20} />;
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      
      {/* SIDEBAR */}
      <div className={`${isOpen ? "w-64" : "w-20"} bg-gradient-to-b from-violet-600 to-indigo-600 text-white shadow-2xl transition-all duration-300`}>
        
        <div className="flex items-center justify-between p-4">
          {isOpen && <span className="font-semibold text-lg">Payroll</span>}
          <button onClick={() => setIsOpen(!isOpen)} className="p-1 hover:bg-violet-700 rounded">
            {isOpen ? <Icons.MdChevronLeft size={22}/> : <Icons.MdChevronRight size={22}/>}
          </button>
        </div>

        <nav className="mt-3 space-y-1 px-2">
          {(sidebarItems[role] || []).map((item, i) => (
            <Link
              key={i}
              to={item.path}
              className="flex items-center gap-3 px-3 py-3 hover:bg-violet-700/40 rounded-lg transition"
            >
              {IconResolver(item.icon)}
              {isOpen && <span className="text-sm font-medium">{item.label}</span>}
            </Link>
          ))}
        </nav>

        <button onClick={logout}
          className="flex items-center gap-3 px-3 py-3 mx-2 mb-4 text-red-200 hover:bg-red-500/20 rounded transition">
          <Icons.MdLogout size={22}/>
          {isOpen && "Logout"}
        </button>
      </div>

      {/* CONTENT */}
      <div className="flex-1 p-6">
        <Outlet/>
      </div>
    </div>
  );
}
