import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import AuthCard from "../../community/components/AuthCard";
import AuthHeader from "../../components/ui/AuthHeader";
import AuthInput from "../../community/components/AuthInput";
import AuthButton from "../../components/ui/Authbutton";

import { login } from "../../api/auth";

export default function LoginPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (!username.trim() || !password) {
      setError("Please enter your username and password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const tokens = await login(
        username.trim(),
        password
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
        } else {
          setError("Invalid username or password.");
        }
      } else {
        setError("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthCard>
      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <AuthHeader
          title="Welcome Back"
          subtitle="Sign in to your Mekwerab account."
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
          autoFocus
          label="Username"
          placeholder="IyosI Tes"
          className="placeholder:font-poppins"
          autoComplete="username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
          disabled={loading}
        />

        <AuthInput
          label="Password"
          type="password"
          placeholder="********"
          autoComplete="current-password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          disabled={loading}
        />

        <div className="flex justify-end">
          <Link
            to="/forgot-password"
            className="
            text-sm
            text-zinc-400
            hover:text-red-400
            transition
            "
          >
            Forgot password?
          </Link>
        </div>

        <AuthButton loading={loading}>
          Sign In
        </AuthButton>

        <p className="text-center text-sm text-zinc-400">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-red-400 hover:text-red-300"
          >
          Create one 
          </Link>
        </p>
      </form>
    </AuthCard>
  );
}