import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import AuthCard from "../../community/components/AuthCard";
import AuthHeader from "../../components/ui/AuthHeader";
import AuthInput from "../../community/components/AuthInput";
import AuthButton from "../../components/ui/Authbutton";

import {
  register,
  login,
} from "../../api/auth";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    password_confirm: "",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (form.password !== form.password_confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await register(form);

      const tokens = await login(
        form.username,
        form.password
      );

      localStorage.setItem(
        "access",
        tokens.access
      );

      localStorage.setItem(
        "refresh",
        tokens.refresh
      );

      navigate("/community", {
        replace: true,
      });
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const data = err.response?.data;

        if (typeof data === "string") {
          setError(data);
        } else if (data?.detail) {
          setError(data.detail);
        } else if (data) {
          const firstError = Object.values(data)
            .flat()
            .join(" ");

          setError(
            firstError ||
              "Unable to create your account."
          );
        } else {
          setError(
            "Unable to create your account."
          );
        }
      } else {
        setError("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard>
      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <AuthHeader
          title="Create your account"
          subtitle="አንድ የምኵራብ መለያ ብቻ በመጠቀም ወደ አገልግሎቶች መዳረስ ይችላሉ።"
        />

        {error && (
          <div
            className="
              rounded-xl
              border
              border-red-600
              bg-red-900/30
              px-4
              py-3
              text-sm
              text-red-300
            "
          >
            {error}
          </div>
        )}

        <AuthInput
          label="Username"
          name="username"
          autoComplete="username"
          placeholder="IyosI_Tes"
           className="placeholder:font-poppins"
          value={form.username}
          onChange={handleChange}
          disabled={loading}
          required
        />

        <AuthInput
          label="Email"
          name="email"
          type="email"
          placeholder="Iyosi@gmail.com"
           className="placeholder:font-poppins"
          autoComplete="email"
          value={form.email}
          onChange={handleChange}
          disabled={loading}
          required
        />

        <AuthInput
          label="Password"
          name="password"
          type="password"
          placeholder="********"
          autoComplete="new-password"
          value={form.password}
          onChange={handleChange}
          disabled={loading}
          required
        />

        <AuthInput
          label="Confirm Password"
          name="password_confirm"
          type="password"
          placeholder="********"
          autoComplete="new-password"
          value={form.password_confirm}
          onChange={handleChange}
          disabled={loading}
          required
        />

        <AuthButton loading={loading}>
          Create Account
        </AuthButton>

        <p className="text-center text-sm text-zinc-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="
              text-red-400
              hover:text-red-300
              transition
            "
          >
            Sign In
          </Link>
        </p>
      </form>
    </AuthCard>
  );
}