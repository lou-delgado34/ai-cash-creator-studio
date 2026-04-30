export default function SettingsPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <section className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
          Settings
        </p>

        <h1 className="mt-3 text-4xl font-bold">
          Account & Brand Settings
        </h1>

        <p className="mt-3 max-w-2xl text-zinc-400">
          Manage your creator studio profile, brand name, role, and default
          social media platform.
        </p>

        <div className="mt-8 rounded-3xl border border-white/10 bg-zinc-900 p-6">
          <h2 className="text-2xl font-bold">Your Profile</h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <input
              className="rounded-2xl border border-white/10 bg-black px-4 py-3 text-white outline-none"
              defaultValue="Luis Delgado"
              placeholder="Your Name"
            />

            <input
              className="rounded-2xl border border-white/10 bg-black px-4 py-3 text-white outline-none"
              defaultValue="admin@example.com"
              placeholder="Email"
            />

            <input
              className="rounded-2xl border border-white/10 bg-black px-4 py-3 text-white outline-none"
              defaultValue="Admin"
              placeholder="Role"
            />

            <input
              className="rounded-2xl border border-white/10 bg-black px-4 py-3 text-white outline-none"
              defaultValue="AI Cash Creator Studio"
              placeholder="Brand Name"
            />

            <select className="rounded-2xl border border-white/10 bg-black px-4 py-3 text-white outline-none">
              <option>Instagram</option>
              <option>TikTok</option>
              <option>Facebook</option>
              <option>YouTube Shorts</option>
              <option>LinkedIn</option>
            </select>

            <select className="rounded-2xl border border-white/10 bg-black px-4 py-3 text-white outline-none">
              <option>English</option>
              <option>Spanish</option>
              <option>English + Spanish</option>
            </select>
          </div>

          <button className="mt-5 rounded-2xl bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-500">
            Save Settings
          </button>

          <p className="mt-3 text-sm text-zinc-500">
            Note: Saving will be connected to Supabase in a later step.
          </p>
        </div>

        <div className="mt-8 rounded-3xl border border-green-500/30 bg-green-950/30 p-6">
          <h2 className="text-2xl font-bold text-green-300">
            Your Admin Access
          </h2>

          <p className="mt-3 text-zinc-300">
            Your account is set as admin. Inside this app, admin users have
            unlimited credits and full access to every tool.
          </p>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-black/40 p-4">
              <p className="text-sm text-zinc-400">Role</p>
              <p className="mt-1 text-2xl font-bold">Admin</p>
            </div>

            <div className="rounded-2xl bg-black/40 p-4">
              <p className="text-sm text-zinc-400">Credits</p>
              <p className="mt-1 text-2xl font-bold text-green-400">
                Unlimited
              </p>
            </div>

            <div className="rounded-2xl bg-black/40 p-4">
              <p className="text-sm text-zinc-400">Tools</p>
              <p className="mt-1 text-2xl font-bold">Unlocked</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}