import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../../api/api";
import { toast } from "react-toastify";
import { FaArrowLeft } from "react-icons/fa";

export default function ResetPasswordPage() {
  const [params] = useSearchParams();
  const token = params.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      await api.post("/auth/reset-password/", {
        token,
        password,
      });

      toast.success("Password reset successful");

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err: unknown) {
        console.error(err)
      toast.error("Invalid or expired token");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-white px-4">
      
      {/* 🔙 Back */}
      <button
        onClick={() => navigate("/login")}
        className="absolute top-4 left-4 flex items-center gap-2 text-gray-600 hover:text-black transition px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 shadow-sm"
      >
        <FaArrowLeft />
        Back
      </button>

      {/* Card */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm sm:max-w-md bg-ivory shadow-md rounded-xl p-6 sm:p-8 space-y-5"
      >
        <h2 className="text-xl font-semibold text-center text-main">
          Reset Password
        </h2>

        <p className="text-sm text-gray-500 text-center">
          Enter your new password below
        </p>

        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full border border-Hover bg-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-main"
        />

        <input
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="w-full border border-Hover bg-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-main"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-main text-white py-2 rounded hover:opacity-90 transition"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
}