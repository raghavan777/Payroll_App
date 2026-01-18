import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/userManagement.css";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const USERS_PER_PAGE = 5;

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/users/org-users", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  };

  const updateRole = async (userId, newRole) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/users/update-role/${userId}`,
        { role: newRole },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchUsers();
    } catch (err) {
      console.error("Failed to update role:", err);
    }
  };

  // 🔍 === SEARCH LOGIC ===
  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  // 📄 === PAGINATION LOGIC ===
  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
  const indexOfLast = currentPage * USERS_PER_PAGE;
  const indexOfFirst = indexOfLast - USERS_PER_PAGE;
  const currentUsers = filteredUsers.slice(indexOfFirst, indexOfLast);

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="um-container">
      <div className="um-header">
        <h2>Organization Users</h2>
        <input
          className="um-search"
          placeholder="Search name or email"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {currentUsers.map(u => (
        <div className="um-card" key={u._id}>
          <div>
            <div className="um-name">{u.name}</div>
            <div className="um-email">{u.email}</div>
          </div>

          <select
            className="um-select"
            value={u.role}
            onChange={(e) => updateRole(u._id, e.target.value)}
          >
            <option value="SUPER_ADMIN">Super Admin</option>
            <option value="PAYROLL_ADMIN">Payroll Admin</option>
            <option value="HR_ADMIN">HR Admin</option>
            <option value="EMPLOYEE">Employee</option>
          </select>
        </div>
      ))}

      <div className="um-pagination">
        <button
          className="um-btn"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            className={`um-btn ${currentPage === i + 1 ? "active" : ""}`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <button
          className="um-btn"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
