// src/components/Breadcrumbs.jsx
// SHOW path; click to go back to parent
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Breadcrumbs({ user, currentFolder, onCrumbClick }) {
  const [trail, setTrail] = useState([]);

  useEffect(() => {
    if (!user) return;
    if (!currentFolder) {
      setTrail([]); // root
      return;
    }

    const loadTrail = async () => {
      const stack = [];
      let cursor = currentFolder;
      while (cursor) {
        stack.push(cursor);
        if (!cursor.parent_id) break;
        const { data } = await supabase
          .from("folders")
          .select("*")
          .eq("id", cursor.parent_id)
          .eq("user_id", user.id)
          .eq("trashed", false)
          .single();
        cursor = data || null;
      }
      setTrail(stack.reverse());
    };
    loadTrail();
  }, [user, currentFolder]);

  return (
    <div className="mt-4 mb-2 text-sm">
      <div className="inline-flex flex-wrap items-center gap-1">
        <button
          onClick={() => onCrumbClick(null)}
          className="underline decoration-white/40 hover:decoration-white"
        >
          Root
        </button>
        {trail.map((f, i) => (
          <span key={f.id} className="inline-flex items-center gap-1">
            <span>›</span>
            <button
              onClick={() => onCrumbClick(f)}
              className="underline decoration-white/40 hover:decoration-white"
            >
              {f.name}
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
