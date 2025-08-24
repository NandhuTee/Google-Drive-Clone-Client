import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import FileUpload from "../components/FileUpload";
import FolderList from "../components/FolderList";
import FileList from "../components/FileList";

export default function FileManager() {
  const [folders, setFolders] = useState([]);
  const [files, setFiles] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(null);

  // Load folders
  useEffect(() => {
    const fetchFolders = async () => {
      const { data, error } = await supabase.from("folders").select("*");
      if (!error) setFolders(data);
    };
    fetchFolders();
  }, []);

  // Load files when folder selected
  useEffect(() => {
    if (!selectedFolder) return;
    const fetchFiles = async () => {
      const { data, error } = await supabase
        .from("files")
        .select("*")
        .eq("folder_id", selectedFolder);
      if (!error) setFiles(data);
    };
    fetchFiles();
  }, [selectedFolder]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📁 File Manager</h1>

      <FolderList folders={folders} onSelect={setSelectedFolder} />

      {selectedFolder && (
        <>
          <FileUpload folderId={selectedFolder} onUpload={() => setSelectedFolder(selectedFolder)} />
          <FileList files={files} />
        </>
      )}
    </div>
  );
}
