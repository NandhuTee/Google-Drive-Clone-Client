// src/components/Navbar.jsx
// TOP NAV: home + trash + logout
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function Navbar() {
  const navigate = useNavigate();
  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/login");
  }

  return (
    <header className="sticky top-0 z-40 bg-[rgb(128,0,128)]/90 backdrop-blur">
      <nav className="mx-auto max-w-6xl">
        <div className="mt-4 mb-2 glass-card flex items-center justify-between px-4 py-3 rounded-2xl">
          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-white/20 grid place-items-center">
              <span className="text-xl font-black text-white">G</span>
            </div>
            <div>
              <h1 className="text-lg font-bold leading-5">Google Drive Clone</h1>
              <p className="text-xs text-white/70">Supabase + React</p>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <Link to="/dashboard" className="btn-primary bg-white/20 hover:bg-white/30">
              Home
            </Link>
            <Link to="/trash" className="btn-primary bg-white/20 hover:bg-white/30">
              Trash
            </Link>
            <button
              onClick={handleLogout}
              className="btn-primary bg-black/40 hover:bg-black/50"
              title="Logout"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
