import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../api/api";
import { toast } from "react-toastify";
import  { AxiosError } from "axios";
import { FaArrowLeft } from "react-icons/fa";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    phone_number: "",
    email: "",
    address: "",
    password: "",
    password_confirm: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      await api.post("/auth/register/", form);

      toast.success("Account created successfully");

      navigate("/login");
    } catch (error: unknown) {
         let message = "Resgistration failed";
    if (error instanceof AxiosError) {
    message =
      error.response?.data?.detail ||
      error.response?.data?.message ||
      message;
  }
   
  toast.error(message);
}
     finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
        <button
              onClick={() => navigate("/")}
              className="absolute top-4 left-4 flex items-center gap-2 text-gray-600 hover:text-black transition px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 shadow-sm z-50"
            >
              <FaArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-sm sm:text-base">Back</span>
            </button>
      <form
        onSubmit={handleSubmit}
        className=" w-full 
    max-w-sm 
    sm:max-w-md 
    lg:max-w-lg 
    bg-ivory
    shadow-md 
    rounded-xl 
    p-6 
    sm:p-8 
    space-y-4"
      >
        <h2 className="text-xl font-semibold text-center text-main">
          Create Account
        </h2>

        <input
          name="username"
          placeholder="Username"
          onChange={handleChange}
          required
          className="w-full border border-Hover bg-white rounded px-3 py-2"
        />

        <input
          name="phone_number"
          placeholder="Phone Number"
          onChange={handleChange}
          required
          className="w-full border border-Hover bg-white rounded px-3 py-2"
        />

         <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
          className="w-full border border-Hover bg-white rounded px-3 py-2"
        />

        <input
          name="address"
          placeholder="address"
          onChange={handleChange}
          required
          className="w-full border border-Hover bg-white rounded px-3 py-2"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
          className="w-full border border-Hover bg-white rounded px-3 py-2"
        />

        <input
          type="password"
          name="password_confirm"
          placeholder="Confirm Password"
          onChange={handleChange}
          required
          className="w-full border bg-white rounded border-main px-3 py-2"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-main text-white py-2 rounded hover:opacity-90"
        >
          {loading ? "Creating..." : "Create Account"}
        </button>

        <p className="text-sm text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;