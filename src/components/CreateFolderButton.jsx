// src/components/CreateFolderButton.jsx
// CREATE subfolder under parentFolder (or root if null)
import { supabase } from "../lib/supabaseClient";

export default function CreateFolderButton({ user, parentFolder, onCreated }) {
  const handleCreate = async () => {
    if (!user) return;
    const name = prompt("Folder name");
    if (!name) return;

    const { error } = await supabase.from("folders").insert([
      {
        user_id: user.id,
        name: name.trim(),
        parent_id: parentFolder?.id || null,
        trashed: false,
      },
    ]);

    if (error) {
      alert("Create failed: " + error.message);
    } else {
      onCreated?.();
      alert("Folder created");
    }
  };

  return (
    <button onClick={handleCreate} className="btn-primary bg-white/20 hover:bg-white/30">
      + Folder
    </button>
  );
}
