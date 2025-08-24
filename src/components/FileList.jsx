// src/components/FileList.jsx
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function FileList({ user, folderId, search, sort }) {
  const [files, setFiles] = useState([]);
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch files
  const fetchFiles = async () => {
    if (!user) return;
    setLoading(true);

    let query = supabase
      .from("files")
      .select("*")
      .eq("user_id", user.id)
      .eq("trashed", false);

    if (folderId === null) query = query.is("folder_id", null);
    else query = query.eq("folder_id", folderId);

    if (search?.trim()) {
      query = query.ilike("name", `%${search.trim()}%`);
    }

    const sortCol =
      sort.by === "size"
        ? "size"
        : sort.by === "name"
        ? "name"
        : "created_at";

    const { data, error } = await query.order(sortCol, {
      ascending: sort.dir === "asc",
    });

    if (error) {
      console.error("Error fetching files:", error.message);
      setFiles([]);
    } else {
      setFiles(data || []);
    }
    setLoading(false);
  };

  // Fetch folders for move dropdown
  const fetchFolders = async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from("folders")
      .select("id, name")
      .eq("user_id", user.id);

    if (error) {
      console.error("Error fetching folders:", error.message);
      setFolders([]);
    } else {
      setFolders(data || []);
    }
  };

  useEffect(() => {
    fetchFiles();
    fetchFolders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, folderId, search, sort]);

  // ACTIONS
  const rename = async (f) => {
    const name = prompt("New name", f.name);
    if (!name || name === f.name) return;
    const { error } = await supabase
      .from("files")
      .update({ name })
      .eq("id", f.id)
      .eq("user_id", user.id);
    if (error) alert(error.message);
    else fetchFiles();
  };

  const trash = async (f) => {
    if (!confirm(`Move "${f.name}" to trash?`)) return;
    const { error } = await supabase
      .from("files")
      .update({ trashed: true })
      .eq("id", f.id)
      .eq("user_id", user.id);
    if (error) alert(error.message);
    else fetchFiles();
  };

  const download = (f) => {
    if (!f.url) {
      alert("No file URL found!");
      return;
    }
    window.open(f.url, "_blank");
  };

  // Loading state
  if (loading) return <p className="mt-4">Loading files...</p>;

  return (
    <div className="mt-4 rounded-xl overflow-hidden border border-gray-300 shadow">
      <div className="bg-gray-200 text-gray-900 font-semibold px-4 py-2">
        Files
      </div>

      {files.length === 0 ? (
        <div className="bg-white text-gray-700 px-4 py-6">No files</div>
      ) : (
        <table className="w-full bg-white text-gray-900 text-sm table-fixed">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left border-b w-2/5">Name</th>
              <th className="px-4 py-2 text-left border-b w-1/6">Size</th>
              <th className="px-4 py-2 text-left border-b w-1/6">Type</th>
              <th className="px-4 py-2 text-left border-b w-1/6">Uploaded</th>
              <th className="px-4 py-2 text-right border-b w-1/4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {files.map((f) => (
              <tr key={f.id} className="hover:bg-gray-50">
                {/* Truncated file name with tooltip */}
                <td
                  className="px-4 py-2 border-b truncate max-w-[200px] whitespace-nowrap"
                  title={f.name}
                >
                  {f.name}
                </td>
                <td className="px-4 py-2 border-b">
                  {f.size ? (f.size / 1024).toFixed(1) + " KB" : "-"}
                </td>
                <td className="px-4 py-2 border-b">{f.file_type || "Unknown"}</td>
                <td className="px-4 py-2 border-b">
                  {f.created_at ? new Date(f.created_at).toLocaleString() : "-"}
                </td>
                <td className="px-4 py-2 border-b">
                  <div className="flex flex-wrap justify-end gap-2 items-center">
                    <button
                      onClick={() => download(f)}
                      className="text-blue-600 hover:underline"
                    >
                      Download
                    </button>
                    <button
                      onClick={() => rename(f)}
                      className="text-green-600 hover:underline"
                    >
                      Rename
                    </button>
                    <select
                      value={f.folder_id || ""}
                      onChange={async (e) => {
                        const folder_id = e.target.value || null;
                        const { error } = await supabase
                          .from("files")
                          .update({ folder_id })
                          .eq("id", f.id)
                          .eq("user_id", user.id);
                        if (error) alert(error.message);
                        else fetchFiles();
                      }}
                      className="border rounded px-2 py-1 text-sm"
                    >
                      <option value="">Root</option>
                      {folders.map((fo) => (
                        <option key={fo.id} value={fo.id}>
                          {fo.name}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => trash(f)}
                      className="text-red-600 hover:underline"
                    >
                      Trash
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
