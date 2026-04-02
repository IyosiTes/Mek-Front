import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(username, password);
      navigate("/cart"); 
    } catch (err) {
      console.error(err);
      alert("invalid login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-white px-4 py-10">
      
      {/* 🔙 Back Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-4 left-4 flex items-center gap-2 text-gray-600 hover:text-black transition px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 shadow-sm z-50"
      >
        <FaArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className="text-sm sm:text-base">Back</span>
      </button>

      {/* Login Form */}
      <form 
        onSubmit={handleSubmit} 
        className="w-full max-w-sm sm:max-w-md lg:max-w-lg bg-ivory shadow-md rounded-xl p-6 sm:p-8 space-y-6"
      >
        <h2 className="text-2xl font-semibold text-gray-800 text-center">Login</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border rounded-md px-3 bg-white py-2 focus:outline-none focus:ring-2 focus:ring-black"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-black"
          required
        />

        <button
          type="submit"
          className="w-full bg-main text-white py-2.5 rounded-md hover:opacity-90 transition"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <p className="text-sm text-center mt-2">
  <Link to="/forgot-password" className="text-blue-600 hover:underline">
    Forgot Password?
  </Link>
</p>

        <p className="text-sm text-center mt-3">
          No account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}