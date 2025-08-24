import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

export default function FolderTree({ onSelectFolder }) {
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFolders();
  }, []);

  async function fetchFolders() {
    setLoading(true);
    const { data, error } = await supabase
      .from("folders")
      .select("*")
      .order("created_at", { ascending: true });

    if (!error) setFolders(data);
    setLoading(false);
  }

  function renderTree(parentId = null) {
    return folders
      .filter(f => f.parent_id === parentId)
      .map(f => (
        <li key={f.id}>
          <button
            onClick={() => onSelectFolder(f)}
            className="hover:underline"
          >
            {f.name}
          </button>
          <ul className="ml-4">{renderTree(f.id)}</ul>
        </li>
      ));
  }

  if (loading) return <p>Loading folders...</p>;

  return <ul>{renderTree()}</ul>;
}
