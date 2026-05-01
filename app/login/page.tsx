export default function LoginPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <section className="mx-auto max-w-md rounded-3xl border border-white/10 bg-zinc-900 p-6">
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
          Admin Login
        </p>

        <h1 className="mt-3 text-4xl font-bold">Sign in</h1>

        <p className="mt-3 text-zinc-400">
          Enter your admin email and password.
        </p>

        <form action="/api/admin-login" method="POST">
          <input
            name="email"
            defaultValue="lou.delgado.pfs@gmail.com"
            className="mt-6 w-full rounded-2xl border border-white/10 bg-black px-4 py-3 text-white outline-none"
            placeholder="Email"
          />

          <input
            name="password"
            type="password"
            className="mt-4 w-full rounded-2xl border border-white/10 bg-black px-4 py-3 text-white outline-none"
            placeholder="Password"
          />

          <button
            type="submit"
            className="mt-5 w-full rounded-2xl bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-500"
          >
            Login
          </button>
        </form>
      </section>
    </main>
  );
}