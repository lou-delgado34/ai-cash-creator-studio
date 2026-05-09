export default function DailyWorkflowPage() {
  const steps = [
    "Open Calendar and pick today’s content idea",
    "Send idea to Social Planner",
    "Generate script",
    "Save script to Content Library",
    "Send script to Talking Avatar",
    "Preview voice for free",
    "Only generate video when your personal avatar + D-ID credits are ready",
    "Use Video History to download finished video",
    "Use Post Prep to copy caption, CTA, and hashtags",
    "Post manually to Instagram, TikTok, Facebook, YouTube Shorts, or LinkedIn",
  ];

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <section className="mx-auto max-w-5xl">
        <p className="text-sm font-bold uppercase tracking-widest text-green-400">
          Daily System
        </p>

        <h1 className="mt-3 text-5xl font-bold">Daily Content Workflow</h1>

        <p className="mt-4 text-zinc-400">
          Use this workflow to create content fast without wasting D-ID credits.
        </p>

        <div className="mt-10 space-y-4">
          {steps.map((step, index) => (
            <div key={step} className="rounded-2xl bg-zinc-900 p-5">
              <p className="text-lg font-bold">
                {index + 1}. {step}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}