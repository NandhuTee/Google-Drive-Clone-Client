import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

 async function handleLogin(e) {
  e.preventDefault();
  setErr("");

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    setErr(error.message);
    return;
  }

  console.log("Login success:", data.user); // ✅ use the data
  // Example: redirect after login
   navigate("/dashboard");
}

  return (
    <div className="min-h-screen grid place-items-center">
      <div className="w-full max-w-md glass-card p-8">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-extrabold">Google Drive Clone</h1>
          <p className="text-white/80 mt-1">Welcome back</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          {err && (
            <p className="rounded-lg bg-red-500/20 px-3 py-2 text-sm">
              {err}
            </p>
          )}
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
              placeholder="••••••••"
            />
          </div>
          <button type="submit" className="btn-primary w-full bg-white/90 text-purple-800 hover:bg-white">
            Log In
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-white/80">
          Don’t have an account?{" "}
          <Link to="/" className="font-semibold underline hover:no-underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
