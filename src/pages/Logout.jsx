// src/components/Navbar.jsx
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/login");
  }

  return (
    <nav>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}
