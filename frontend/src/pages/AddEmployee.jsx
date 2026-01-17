import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AddEmployee() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const updateField = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const createEmployee = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/users/create",
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Employee Created!");
      navigate("/users");

    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create employee");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Add Employee</h2>

      <div className="space-y-3 max-w-lg">
        <input
          name="name"
          value={form.name}
          onChange={updateField}
          placeholder="Employee Name"
          className="border p-2 rounded w-full"
        />
        <input
          name="email"
          value={form.email}
          onChange={updateField}
          placeholder="Email"
          className="border p-2 rounded w-full"
        />
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={updateField}
          placeholder="Password"
          className="border p-2 rounded w-full"
        />

        <button
          onClick={createEmployee}
          className="bg-violet-600 text-white px-4 py-2 rounded"
        >
          Create
        </button>
      </div>
    </div>
  );
}
