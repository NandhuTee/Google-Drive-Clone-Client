import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { Link } from "react-router-dom";

export default function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail]     = useState("");
  const [password, setPassword] = useState("");
  const [info, setInfo] = useState("");
  const [err, setErr] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setInfo("");
    setErr("");
const { data, error } = await supabase.auth.signUp({
  email,
  password,
  options: {
    data: {
      full_name: name,   // add name field in your form
      avatar_url: "",    // optional
    }
  }
});


if (!error && data.user) {
  await supabase.from("profiles").insert([
    { id: data.user.id, full_name: "", avatar_url: "" }
  ]);
}


    if (error) {
      setErr(error.message);
      return;
    }

    // Most projects keep email confirmation ON, so session is null here:
    setInfo("Signup successful. Please check your inbox to confirm your email, then log in.");
  };

  return (
    <div className="min-h-screen grid place-items-center">
      <div className="w-full max-w-md glass-card p-8">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-extrabold">Google Drive Clone</h1>
          <p className="text-white/80 mt-1">Create your account</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          {err && <p className="rounded-lg bg-red-500/20 px-3 py-2 text-sm">{err}</p>}
          {info && <p className="rounded-lg bg-emerald-500/20 px-3 py-2 text-sm">{info}</p>}

          <div>
            <label className="block text-sm mb-1">Full name</label>
            <input
              type="text"
              value={fullName}
              required
              onChange={(e) => setFullName(e.target.value)}
              className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
              placeholder="Jane Doe"
            />
          </div>

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
              minLength={6}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
              placeholder="At least 6 characters"
            />
          </div>

          <button type="submit" className="btn-primary w-full bg-white/90 text-purple-800 hover:bg-white">
            Create Account
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-white/80">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold underline hover:no-underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
