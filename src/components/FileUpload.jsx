import React, { useState } from "react";
import { supabase } from "../supabaseClient";

export default function FileUpload({ folderId, onUpload }) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (event) => {
    let file = event.target.files[0];
    if (!file) return;

    setUploading(true);

    // Upload to Supabase storage
    const { data, error } = await supabase.storage
      .from("files-bucket") // 👈 make sure you created a storage bucket
      .upload(`uploads/${Date.now()}-${file.name}`, file);

    if (error) {
      alert("Upload failed: " + error.message);
      setUploading(false);
      return;
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from("files-bucket")
      .getPublicUrl(data.path);

    // Insert into files table
    await supabase.from("files").insert([
      {
        name: file.name,
        file_type: file.type,
        size: file.size,
        url: urlData.publicUrl,
        folder_id: folderId,
      },
    ]);

    setUploading(false);
    onUpload(); // refresh files
  };

  return (
    <div className="my-4">
      <label className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded">
        {uploading ? "Uploading..." : "Upload File"}
        <input type="file" className="hidden" onChange={handleUpload} />
      </label>
    </div>
  );
}
