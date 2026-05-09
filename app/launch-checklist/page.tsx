export default function LaunchChecklistPage() {
  const items = [
    "Homepage opens",
    "Dashboard opens",
    "Social Planner creates script",
    "Bulk Content creates posts",
    "Content Library saves scripts",
    "Calendar creates weekly plan",
    "Avatar Builder saves avatar",
    "Talking Avatar previews voice",
    "Talking Avatar has D-ID credit safety lock",
    "Video History opens",
    "Post Prep opens",
    "Pricing opens",
  ];

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <section className="mx-auto max-w-5xl">
        <p className="text-sm font-bold uppercase tracking-widest text-green-400">
          1-Day Launch Plan
        </p>

        <h1 className="mt-3 text-5xl font-bold">Launch Readiness Checklist</h1>

        <p className="mt-4 text-zinc-400">
          Test these one by one. If all pass, you can start using the app for live social media content.
        </p>

        <div className="mt-10 space-y-4">
          {items.map((item) => (
            <div key={item} className="rounded-2xl bg-zinc-900 p-5">
              <p className="text-lg font-bold">⬜ {item}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-3xl border border-blue-500/30 bg-blue-950/20 p-6">
          <h2 className="text-2xl font-bold">Fast Launch Rule</h2>
          <p className="mt-3 text-zinc-300">
            Do not add new features until every checklist item works.
          </p>
        </div>
      </section>
    </main>
  );
}