# Google-Drive-Clone
## 📂 File Manager with Supabase

A full-stack file management system built with **React + Supabase**, featuring file uploads, folder navigation, search, sorting, trash bin, and restore functionality.

---

## 🚀 Features

- ✅ File Upload (instant update on list)  
- ✅ Folder Creation & Navigation  
- ✅ File Actions (delete, restore, download)  
- ✅ Trash Bin with Restore option  
- ✅ Search & Sorting  
- ✅ Supabase Database integration  
- ✅ Responsive UI  

---

## 🖥️ Demo

🔗 [Live Demo](https://google-drive-clone-client-one.vercel.app/)  

---


## ⚙️ Tech Stack

- **Frontend:** React, Tailwind CSS  
- **Backend & Database:** Supabase  
- **Deployment:** Vercel  

---

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/file-manager.git
   cd file-manager

2. Install dependencies:
   ```bash
   npm install
   
3. Set up Supabase:

- Create a project in Supabase
- Add your API keys in .env.local
  ```bash
  VITE_SUPABASE_URL=your-supabase-url
  VITE_SUPABASE_ANON_KEY=your-supabase-key
  
4. Run the project locally:
   ```bash
   npm run dev
## 📖 How It Works

- Users can upload files, which are instantly saved in Supabase storage and listed in real-time.

- Folder navigation allows organizing files.

- Deleted files move to the Trash Bin and can be restored.

- Search and sorting help users quickly find files.

## 💡 Challenges & Learnings

- Handling real-time sync of files after upload

- Managing folder hierarchy in Supabase

- Implementing trash & restore feature with soft delete

## 📝 Future Enhancements

- 🔒 Authentication & user-based file storage

- 📑 File sharing with links

- 📊 Storage usage analytics

## 🙏 Acknowledgements

- React for frontend services
- Supabase for backend services
- TailwindCSS for fast UI design
- Labmentix – Thanks for the support and guidance!
  