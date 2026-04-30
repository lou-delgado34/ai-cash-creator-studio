import { getCreditsForPlan } from "../lib/credits";

const users = [
  {
    name: "Luis Delgado",
    email: "admin@example.com",
    role: "admin" as const,
  },
  {
    name: "Demo Free User",
    email: "free@example.com",
    role: "free" as const,
  },
  {
    name: "Demo Pro User",
    email: "pro@example.com",
    role: "pro" as const,
  },
  {
    name: "Demo Premium User",
    email: "premium@example.com",
    role: "premium" as const,
  },
];

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <section className="mx-auto max-w-6xl">

        <h1 className="text-4xl font-bold mb-6">
          Admin Panel (Unlimited Access)
        </h1>

        <div className="grid gap-5 md:grid-cols-4 mb-10">
          <div className="bg-black/40 p-4 rounded-2xl">
            <p className="text-sm text-zinc-400">Credits</p>
            <p className="text-2xl font-bold text-green-400">
              {getCreditsForPlan("admin")}
            </p>
          </div>

          <div className="bg-black/40 p-4 rounded-2xl">
            <p className="text-sm text-zinc-400">AI Models</p>
            <p className="text-2xl font-bold">Unlimited</p>
          </div>

          <div className="bg-black/40 p-4 rounded-2xl">
            <p className="text-sm text-zinc-400">Prompts</p>
            <p className="text-2xl font-bold">Unlimited</p>
          </div>

          <div className="bg-black/40 p-4 rounded-2xl">
            <p className="text-sm text-zinc-400">Tools</p>
            <p className="text-2xl font-bold">Unlocked</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-4">
          Users
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10 text-sm text-zinc-400">
                <th className="py-3">Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Credits</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user.email} className="border-b border-white/5">
                  <td className="py-3">{user.name}</td>
                  <td className="text-zinc-400">{user.email}</td>
                  <td>{user.role}</td>
                  <td className="text-green-400">
                    {getCreditsForPlan(user.role)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </section>
    </main>
  );
}                   