import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", data);
      localStorage.setItem("token", res.data.accessToken);
      toast.success("Login Successful!");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Welcome Back 👋
        </h2>

        {/* Email */}
        <input
          className="w-full border border-gray-300 p-2 rounded-lg mb-1 focus:ring-2 focus:ring-violet-500 outline-none"
          placeholder="Email"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && <p className="text-red-500 text-xs mb-2">{errors.email.message}</p>}

        {/* Password */}
        <input
          type="password"
          className="w-full border border-gray-300 p-2 rounded-lg mb-1 focus:ring-2 focus:ring-violet-500 outline-none"
          placeholder="Password"
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && <p className="text-red-500 text-xs mb-2">{errors.password.message}</p>}

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-violet-600 text-white py-2 rounded-lg mt-4 hover:bg-violet-700 transition"
        >
          Login
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          New organization?{" "}
          <Link to="/register-org" className="text-violet-600 hover:underline">
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
}
