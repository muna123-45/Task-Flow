import { useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import api from "../services/api";

import {
ArrowRight,
CheckCircle2,
Eye,
EyeOff,
LockKeyhole,
Mail,
Sparkles,
} from "lucide-react";

function Login() {
const [showPassword, setShowPassword] = useState(false);

const [formData, setFormData] = useState({
email: "",
password: "",
});

const [rememberMe, setRememberMe] = useState(false);
const [error, setError] = useState("");
const [success, setSuccess] = useState("");
const navigate = useNavigate();

function handleChange(event) {
const { name, value } = event.target;

setFormData((previousData) => ({
  ...previousData,
  [name]: value,
}));

}

async function handleSubmit(e) {
  e.preventDefault();
  setError("");

  // Check required fields
  if (!formData.email.trim() || !formData.password) {
    setError("Please enter your email and password.");
    return;
  }

  try {
    // Send login credentials to the backend
    const response = await api.post("/auth/login", {
      email: formData.email.trim(),
      password: formData.password,
    });

    // Get the token from the backend response
    const token = response.data.token;

    // Store the token in the browser
    localStorage.setItem("token", token);
    navigate("/dashboard");

    alert("Login successful!");

    console.log("Logged-in user:", response.data.user);
  } catch (error) {
    const message =
      error.response?.data?.message ||
      "Login failed. Please check your credentials.";

    setError(message);
  }
}

return (
<div className="min-h-screen bg-slate-50 lg:grid lg:grid-cols-2">

  {/* LEFT SECTION */}
  <section className="relative hidden overflow-hidden bg-linear-to-br from-violet-700 via-purple-700 to-indigo-800 p-12 text-white lg:flex lg:flex-col lg:justify-between">

    {/* Background Decorations */}
    <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

    <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-violet-300/20 blur-3xl" />

    {/* Logo */}
    <Link
      to="/"
      className="relative z-10 flex items-center gap-3"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-violet-700 shadow-lg">
        <CheckCircle2 size={26} />
      </div>

      <span className="text-2xl font-bold tracking-tight">
        TaskFlow
      </span>
    </Link>

    {/* Welcome Content */}
    <div className="relative z-10 max-w-lg">

      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm">
        <Sparkles size={16} />
        Your productivity journey continues
      </div>

      <h1 className="text-4xl font-bold leading-tight xl:text-5xl">
        Welcome back!
        <br />
        Let's get things done.
      </h1>

      <p className="mt-6 text-lg leading-8 text-purple-100">
        Your tasks, goals, and progress are waiting for you.
        Sign in and continue making progress, one task at a time.
      </p>

      {/* Benefits */}
      <div className="mt-10 space-y-5">

        {[
          "Keep your tasks organized",
          "Focus on your priorities",
          "Track your daily progress",
        ].map((benefit) => (
          <div
            key={benefit}
            className="flex items-center gap-3"
          >
            <CheckCircle2
              size={21}
              className="shrink-0 text-purple-200"
            />

            <span className="text-purple-50">
              {benefit}
            </span>
          </div>
        ))}

      </div>
    </div>

    {/* Footer */}
    <p className="relative z-10 text-sm text-purple-200">
      © 2026 TaskFlow. Built for better productivity.
    </p>
  </section>

  {/* RIGHT SECTION */}
  <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-10 lg:px-12">

    <div className="w-full max-w-md">

      {/* Mobile Logo */}
      <Link
        to="/"
        className="mb-8 flex items-center justify-center gap-2 lg:hidden"
      >
        <CheckCircle2
          size={30}
          className="text-violet-700"
        />

        <span className="text-2xl font-bold text-slate-900">
          TaskFlow
        </span>
      </Link>

      {/* Heading */}
      <div className="mb-8">

        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-violet-700">
          WELCOME BACK
        </p>

        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Sign in to TaskFlow
        </h2>

        <p className="mt-3 text-sm leading-6 text-slate-500">
          Enter your details to access your account and manage
          your tasks.
        </p>

      </div>

      {/* LOGIN FORM */}
      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Email address
          </label>

          <div className="relative">

            <Mail
              size={19}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              autoComplete="email"
              className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
            />

          </div>
        </div>

        {/* Password */}
        <div>
          <div className="mb-2 flex items-center justify-between">

            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-700"
            >
              Password
            </label>

            <Link
              to="/forgot-password"
              className="text-sm font-semibold text-violet-700 hover:text-violet-900"
            >
              Forgot password?
            </Link>

          </div>

          <div className="relative">

            <LockKeyhole
              size={19}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              autoComplete="current-password"
              className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={
                showPassword ? "Hide password" : "Show password"
              }
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
            >
              {showPassword ? (
                <EyeOff size={19} />
              ) : (
                <Eye size={19} />
              )}
            </button>

          </div>
        </div>

        {/* Remember Me */}
        <label className="flex cursor-pointer items-center gap-3 text-sm text-slate-600">

          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(event) =>
              setRememberMe(event.target.checked)
            }
            className="h-4 w-4 accent-violet-600"
          />

          Remember me
        </label>

        {/* Error Message */}
        {error && (
          <p
            role="alert"
            className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600"
          >
            {error}
          </p>
        )}

        {/* Success Message */}
        {success && (
          <p
            role="status"
            className="rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700"
          >
            {success}
          </p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="group flex w-full items-center justify-center gap-2 rounded-xl bg-violet-700 px-5 py-3.5 font-semibold text-white shadow-lg shadow-violet-200 transition hover:bg-violet-800 active:scale-[0.99]"
        >
          Sign In

          <ArrowRight
            size={19}
            className="transition-transform group-hover:translate-x-1"
          />
        </button>

      </form>

      {/* Register Link */}
      <p className="mt-7 text-center text-sm text-slate-500">
        Don't have an account?{" "}

        <Link
          to="/register"
          className="font-semibold text-violet-700 hover:text-violet-900"
        >
          Create an account
        </Link>
      </p>

      {/* Footer */}
      <p className="mt-8 text-center text-xs text-slate-400">
        Your next productive day starts here.
      </p>

    </div>
  </section>

</div>

);
}

export default Login;