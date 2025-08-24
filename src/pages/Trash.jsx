// src/pages/Trash.jsx
// TRASH for files & folders: restore or permanent delete
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { supabase } from "../lib/supabaseClient";

export default function Trash() {
  const [user, setUser] = useState(null);
  const [files, setFiles] = useState([]);
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    })();
  }, []);

  const fetchTrash = async () => {
    if (!user) return;
    setLoading(true);

    const [{ data: tf }, { data: tfd }] = await Promise.all([
      supabase.from("files").select("*").eq("user_id", user.id).eq("trashed", true).order("created_at", { ascending: false }),
      supabase.from("folders").select("*").eq("user_id", user.id).eq("trashed", true).order("created_at", { ascending: false }),
    ]);

    setFiles(tf || []);
    setFolders(tfd || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchTrash();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const restoreFile = async (f) => {
    const { error } = await supabase.from("files").update({ trashed: false }).eq("id", f.id).eq("user_id", user.id);
    if (error) alert(error.message);
    else fetchTrash();
  };

  const deleteFile = async (f) => {
    if (!confirm(`Delete "${f.name}" permanently? This cannot be undone.`)) return;
    const { error } = await supabase.from("files").delete().eq("id", f.id).eq("user_id", user.id);
    if (error) alert(error.message);
    else fetchTrash();
  };

  const restoreFolder = async (fo) => {
    const { error } = await supabase.from("folders").update({ trashed: false }).eq("id", fo.id).eq("user_id", user.id);
    if (error) alert(error.message);
    else fetchTrash();
  };

  const deleteFolder = async (fo) => {
    if (!confirm(`Delete folder "${fo.name}" permanently?`)) return;
    const { error } = await supabase.from("folders").delete().eq("id", fo.id).eq("user_id", user.id);
    if (error) alert(error.message);
    else fetchTrash();
  };

  return (
    <div>
      <Navbar />
      <div className="mx-auto max-w-6xl p-4">
        <div className="glass-card rounded-2xl p-4">
          <h1 className="text-2xl font-bold">Trash</h1>

          {loading ? (
            <p className="mt-4">Loading…</p>
          ) : (
            <>
              <section className="mt-6">
                <h2 className="font-semibold mb-2">Folders</h2>
                {folders.length === 0 ? (
                  <div className="bg-white text-black px-4 py-3 rounded-lg">No folders</div>
                ) : (
                  <ul className="bg-white text-black divide-y divide-gray-200 rounded-lg overflow-hidden">
                    {folders.map((fo) => (
                      <li key={fo.id} className="flex items-center justify-between px-4 py-2">
                        <span>📁 {fo.name}</span>
                        <div className="flex gap-2">
                          <button onClick={() => restoreFolder(fo)} className="underline">Restore</button>
                          <button onClick={() => deleteFolder(fo)} className="underline text-red-600">Delete forever</button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </section>

              <section className="mt-6">
                <h2 className="font-semibold mb-2">Files</h2>
                {files.length === 0 ? (
                  <div className="bg-white text-black px-4 py-3 rounded-lg">No files</div>
                ) : (
                  <table className="w-full bg-white text-black rounded-lg overflow-hidden">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2 text-left border-b">Name</th>
                        <th className="px-4 py-2 text-left border-b">Deleted</th>
                        <th className="px-4 py-2 text-right border-b">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {files.map((f) => (
                        <tr key={f.id} className="hover:bg-gray-50">
                          <td className="px-4 py-2 border-b">{f.name}</td>
                          <td className="px-4 py-2 border-b">{new Date(f.created_at).toLocaleString()}</td>
                          <td className="px-4 py-2 border-b">
                            <div className="flex justify-end gap-2">
                              <button onClick={() => restoreFile(f)} className="underline">Restore</button>
                              <button onClick={() => deleteFile(f)} className="underline text-red-600">Delete forever</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
