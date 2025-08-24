// src/pages/Dashboard.jsx
// MAIN PAGE: breadcrumbs, folder list, file list, upload, create folder, search/sort
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { supabase } from "../lib/supabaseClient";
import Breadcrumbs from "../components/Breadcrumbs";
import CreateFolderButton from "../components/CreateFolderButton";
import FolderList from "../components/FolderList";
import FileList from "../components/FileList";
import UploadButton from "../components/UploadButton";
import SearchSortBar from "../components/SearchSortBar";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [currentFolder, setCurrentFolder] = useState(null); // null = root
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState({ by: "created_at", dir: "desc" }); // name|created_at|size

  // fetch logged-in user once
  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.auth.getUser();
      if (!error) setUser(data.user);
    })();
  }, []);

  // ensure a root folder exists; optional (we treat null as root)
  // if you want a real "root" row, create one and store it in state
  // Here we’ll keep `currentFolder = null` as root.

  // When a folder is clicked in FolderList, update current folder
  const handleOpenFolder = (folder) => setCurrentFolder(folder);

  // When breadcrumbs click a parent, navigate back
  const handleCrumbClick = (folder) => setCurrentFolder(folder);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="mx-auto max-w-6xl p-4">
        <div className="glass-card rounded-2xl p-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <h1 className="text-2xl font-bold">Google Drive Clone</h1>
            <div className="flex items-center gap-2">
              <CreateFolderButton
                user={user}
                parentFolder={currentFolder}
                onCreated={() => {}}
              />
              <UploadButton
                user={user}
                currentFolderId={currentFolder?.id || null}
                onUploaded={() => {
                  // FileList handles its own refresh via props changes; this is a no-op
                }}
              />
            </div>
          </div>

          <Breadcrumbs
            user={user}
            currentFolder={currentFolder}
            onCrumbClick={handleCrumbClick}
          />

          <SearchSortBar
            search={search}
            setSearch={setSearch}
            sort={sort}
            setSort={setSort}
          />

          <FolderList
            user={user}
            parentFolderId={currentFolder?.id || null}
            onOpenFolder={handleOpenFolder}
            search={search}
          />

          <FileList
            user={user}
            folderId={currentFolder?.id || null}
            search={search}
            sort={sort}
          />
        </div>
      </div>
    </div>
  );
}
