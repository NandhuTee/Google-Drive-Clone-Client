import Navbar from "../components/Navbar";

export default function Dashboard() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4">
        <section className="mt-8 glass-card p-8 text-white">
          <h2 className="text-2xl font-bold">Welcome to your Dashboard 🚀</h2>
          <p className="mt-2 text-white/80">
            Here you’ll manage folders, files, shares, and more — just like Google Drive.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="glass-card p-5">
              <h3 className="font-semibold">Folders</h3>
              <p className="text-sm text-white/80 mt-1">
                Create, rename, move. Tree & breadcrumbs.
              </p>
            </div>
            <div className="glass-card p-5">
              <h3 className="font-semibold">Uploads</h3>
              <p className="text-sm text-white/80 mt-1">
                Multipart upload with progress.
              </p>
            </div>
            <div className="glass-card p-5">
              <h3 className="font-semibold">Sharing</h3>
              <p className="text-sm text-white/80 mt-1">
                ACL + public links with expiry/password.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
