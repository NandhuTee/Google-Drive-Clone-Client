// src/components/UploadButton.jsx
// UPLOAD to storage bucket "files" then insert row into "files" table; call onUploaded()
import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function UploadButton({ user, currentFolderId, onUploaded }) {
  const [busy, setBusy] = useState(false);

  const handlePick = async (e) => {
    const file = e.target.files?.[0];
    if (!user || !file) return;

    try {
      setBusy(true);

      // 1) Upload to Storage (bucket "files")
      const storagePath = `${user.id}/${Date.now()}_${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from("files")
        .upload(storagePath, file);

      if (uploadError) throw uploadError;

      // 2) Get public URL
      const { data: urlData } = supabase.storage.from("files").getPublicUrl(storagePath);
      const fileUrl = urlData.publicUrl;

      // 3) Insert into DB
      const insert = {
        user_id: user.id,
        folder_id: currentFolderId || null,
        name: file.name,
        file_type: file.type,
        size: file.size,
        url: fileUrl,
        trashed: false,
      };

      const { error: dbError } = await supabase.from("files").insert([insert]);
      if (dbError) throw dbError;

      onUploaded?.(); // let parent refresh if needed
      alert("Uploaded!");
    } catch (err) {
      console.error("Upload failed:", err.message);
      alert("Upload failed: " + err.message);
    } finally {
      setBusy(false);
      e.target.value = ""; // reset input so same file can be chosen again
    }
  };

  return (
    <label className={`btn-primary ${busy ? "opacity-60 pointer-events-none" : ""}`}>
      {busy ? "Uploading..." : "Upload"}
      <input
        type="file"
        onChange={handlePick}
        className="hidden"
        disabled={busy}
      />
    </label>
  );
}
