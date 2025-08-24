// src/components/FolderList.jsx
// LIST subfolders for parentFolderId; supports search; click to open; actions: rename, move, trash
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function FolderList({ user, parentFolderId, onOpenFolder, search }) {
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFolders = async () => {
    if (!user) return;
    setLoading(true);
    let query = supabase
      .from("folders")
      .select("*")
      .eq("user_id", user.id)
      .eq("trashed", false)
      .is("parent_id", parentFolderId); // null or uuid

    if (search?.trim()) {
      query = query.ilike("name", `%${search.trim()}%`);
    }

    const { data, error } = await query.order("created_at", { ascending: false });

    if (error) {
      console.error("Fetch folders error:", error.message);
      setFolders([]);
    } else {
      setFolders(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchFolders();
    // optional: realtime on folders table (requires Realtime enabled)
    // const channel = supabase
    //   .channel("folders-changes")
    //   .on("postgres_changes",{ event:"*", schema:"public", table:"folders", filter:`user_id=eq.${user?.id}` }, fetchFolders)
    //   .subscribe();
    // return () => supabase.removeChannel(channel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, parentFolderId, search]);

  const rename = async (f) => {
    const name = prompt("New name", f.name);
    if (!name || name === f.name) return;
    const { error } = await supabase.from("folders").update({ name }).eq("id", f.id).eq("user_id", user.id);
    if (error) alert(error.message);
    else fetchFolders();
  };

  const move = async (f) => {
    const target = prompt("Target parent folder UUID (empty for root)", "");
    const parent_id = target?.trim() ? target.trim() : null;
    const { error } = await supabase.from("folders").update({ parent_id }).eq("id", f.id).eq("user_id", user.id);
    if (error) alert(error.message);
    else fetchFolders();
  };

  const trash = async (f) => {
    if (!confirm(`Move "${f.name}" to trash?`)) return;
    const { error } = await supabase.from("folders").update({ trashed: true }).eq("id", f.id).eq("user_id", user.id);
    if (error) alert(error.message);
    else fetchFolders();
  };

  if (loading) return <p className="mt-4">Loading folders...</p>;
  if (folders.length === 0) return null;

  return (
    <div className="mt-4 rounded-xl overflow-hidden border border-white/20">
      <div className="bg-white text-black font-semibold px-4 py-2">Folders</div>
      <ul className="bg-white text-black divide-y divide-gray-200">
        {folders.map((f) => (
          <li key={f.id} className="flex items-center justify-between px-4 py-2 hover:bg-gray-50">
            <button onClick={() => onOpenFolder(f)} className="text-left underline decoration-purple-300 hover:decoration-purple-700">
              📁 {f.name}
            </button>
            <div className="flex gap-2">
              <button onClick={() => rename(f)} className="text-sm underline">Rename</button>
              <button onClick={() => move(f)} className="text-sm underline">Move</button>
              <button onClick={() => trash(f)} className="text-sm underline text-red-600">Trash</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
