import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function RunPayroll() {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post("http://localhost:5000/api/statutory/payroll", data, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast.success("Payroll Calculated!");

      console.log("Payroll Result:", res.data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to run payroll");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Run Payroll</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3 max-w-md bg-white p-4 rounded shadow">

        <input className="border p-2 rounded" placeholder="Employee ID" {...register("employeeId")} />
        <input className="border p-2 rounded" placeholder="Salary" type="number" {...register("salary")} />
        <input className="border p-2 rounded" placeholder="Country" {...register("country")} />
        <input className="border p-2 rounded" placeholder="State" {...register("state")} />

        <button className="bg-indigo-600 text-white p-2 rounded">Generate Payroll</button>
      </form>
    </div>
  );
}
