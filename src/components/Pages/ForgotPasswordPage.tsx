import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import AuthCard from "../../community/components/AuthCard";
import AuthHeader from "../../components/ui/AuthHeader";
import AuthInput from "../../community/components/AuthInput";
import AuthButton from "../../components/ui/Authbutton";

import api from "../../api/api";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] =
    useState(false);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      await api.post(
        "/auth/forgot-password/",
        {
          email,
        }
      );

      setSuccess(true);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const data = err.response?.data;

        if (typeof data === "string") {
          setError(data);
        } else if (data?.detail) {
          setError(data.detail);
        } else {
          setError(
            "Unable to send reset link."
          );
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
      {success ? (
        <div className="space-y-6 text-center">
          <AuthHeader
            title="Check your email"
            subtitle="If an account exists for that email, we've sent a password reset link."
          />

          <Link
            to="/login"
            className="
            inline-block
            text-red-400
            hover:text-red-300
            transition
            "
          >
            Back to Sign In
          </Link>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <AuthHeader
            title="Forgot Password"
            subtitle="Enter your email and we'll send you a password reset link."
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
            label="Email"
            type="email"
            autoComplete="email"
            value={email}
            placeholder="Iyosi@gmail.com"
            onChange={(e) =>
              setEmail(e.target.value)
            }
            disabled={loading}
          />

          <AuthButton loading={loading}>
            Send Reset Link
          </AuthButton>

          <p className="text-center text-sm text-zinc-400">
            Remember your password?{" "}
            <Link
              to="/login"
              className="text-red-400 hover:text-red-300"
            >
              Sign In
            </Link>
          </p>
        </form>
      )}
    </AuthCard>
  );
}