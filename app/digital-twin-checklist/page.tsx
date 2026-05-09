export default function DigitalTwinChecklistPage() {
  const items = [
    ["Content Engine", "Social Planner creates platform-specific posts in English or Spanish."],
    ["Bulk Engine", "Bulk Content creates multiple posts fast."],
    ["Content Library", "Saved scripts can be reused for videos."],
    ["Avatar Builder", "Your AI avatar images can be saved."],
    ["Talking Avatar", "Scripts can turn into avatar videos once D-ID credits are added."],
    ["Voice Preview", "You can test voice before spending credits."],
    ["Video History", "Finished videos are saved and managed."],
    ["Post Prep", "Captions, CTAs, hashtags, and posting checklist are ready."],
  ];

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <section className="mx-auto max-w-5xl">
        <p className="text-sm font-bold uppercase tracking-widest text-purple-400">
          Digital Twin Launch System
        </p>

        <h1 className="mt-3 text-5xl font-bold">
          Digital Twin Readiness Checklist
        </h1>

        <p className="mt-4 text-zinc-400">
          Use this before spending D-ID credits or uploading your personal avatar.
        </p>

        <div className="mt-10 space-y-4">
          {items.map(([title, desc]) => (
            <div key={title} className="rounded-2xl bg-zinc-900 p-5">
              <h2 className="text-xl font-bold text-green-400">✅ {title}</h2>
              <p className="mt-2 text-zinc-300">{desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-3xl border border-yellow-500/30 bg-yellow-950/20 p-6">
          <h2 className="text-2xl font-bold text-yellow-400">
            Important Before Creating Your Real Twin
          </h2>
          <p className="mt-3 text-zinc-300">
            Do not use your one personal D-ID avatar slot until your lighting,
            camera angle, voice sample, and script are ready.
          </p>
        </div>
      </section>
    </main>
  );
}