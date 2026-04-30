const weekPlan = [
  {
    day: "Monday",
    platform: "Instagram",
    hook: "Most people are not lazy. They just need a better system.",
    cta: "Follow for more daily motivation.",
    status: "Idea",
  },
  {
    day: "Tuesday",
    platform: "TikTok",
    hook: "Here is one habit that changed my whole routine.",
    cta: "Save this and try it tomorrow.",
    status: "Script Needed",
  },
  {
    day: "Wednesday",
    platform: "Instagram Reels",
    hook: "Your future self is watching what you do today.",
    cta: "Comment RESET if you are starting over.",
    status: "Ready",
  },
  {
    day: "Thursday",
    platform: "Facebook",
    hook: "You do not need a perfect life to start building better habits.",
    cta: "Share this with someone who needs it.",
    status: "Idea",
  },
  {
    day: "Friday",
    platform: "TikTok",
    hook: "The weekend is not for quitting. It is for resetting.",
    cta: "Follow for the next video.",
    status: "Idea",
  },
  {
    day: "Saturday",
    platform: "Instagram Story",
    hook: "Behind the scenes of my AI creator lifestyle.",
    cta: "Vote in the poll.",
    status: "Idea",
  },
  {
    day: "Sunday",
    platform: "Instagram",
    hook: "Plan your week before your week plans you.",
    cta: "Save this weekly reset.",
    status: "Ready",
  },
];

export default function CalendarPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <section className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
          Content Calendar
        </p>

        <h1 className="mt-3 text-4xl font-bold">
          Weekly Posting Plan
        </h1>

        <p className="mt-3 max-w-2xl text-zinc-400">
          Plan your AI virtual influencer content for Instagram, TikTok,
          Facebook, YouTube Shorts, and other platforms.
        </p>

        <div className="mt-8 rounded-3xl border border-white/10 bg-zinc-900 p-6">
          <h2 className="text-2xl font-bold">Create New Content Idea</h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <input
              className="rounded-2xl border border-white/10 bg-black px-4 py-3 text-white outline-none"
              placeholder="Day: Monday, Tuesday..."
            />

            <input
              className="rounded-2xl border border-white/10 bg-black px-4 py-3 text-white outline-none"
              placeholder="Platform: Instagram, TikTok..."
            />

            <input
              className="rounded-2xl border border-white/10 bg-black px-4 py-3 text-white outline-none"
              placeholder="Content Type: Reel, Story, Post..."
            />

            <input
              className="rounded-2xl border border-white/10 bg-black px-4 py-3 text-white outline-none"
              placeholder="Status: Idea, Created, Posted"
            />
          </div>

          <textarea
            className="mt-4 min-h-28 w-full rounded-2xl border border-white/10 bg-black px-4 py-3 text-white outline-none"
            placeholder="Hook: What is the first sentence that grabs attention?"
          />

          <textarea
            className="mt-4 min-h-28 w-full rounded-2xl border border-white/10 bg-black px-4 py-3 text-white outline-none"
            placeholder="Caption: What should the post say?"
          />

          <input
            className="mt-4 w-full rounded-2xl border border-white/10 bg-black px-4 py-3 text-white outline-none"
            placeholder="CTA: Example: Follow, comment, save, click link..."
          />

          <button className="mt-5 rounded-2xl bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-500">
            Save Content Idea
          </button>

          <p className="mt-3 text-sm text-zinc-500">
            Note: Saving will be connected to Supabase in a later step.
          </p>
        </div>

        <h2 className="mb-4 mt-8 text-2xl font-bold">
          Sample Weekly Plan
        </h2>

        <div className="grid gap-5 md:grid-cols-2">
          {weekPlan.map((item) => (
            <div
              key={item.day}
              className="rounded-3xl border border-white/10 bg-zinc-900 p-6"
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-2xl font-bold">{item.day}</h3>

                <span className="rounded-full bg-blue-600/20 px-3 py-1 text-sm text-blue-300">
                  {item.status}
                </span>
              </div>

              <p className="mt-3 text-sm text-zinc-400">
                Platform:{" "}
                <span className="text-zinc-200">{item.platform}</span>
              </p>

              <p className="mt-4 text-zinc-300">
                “{item.hook}”
              </p>

              <p className="mt-4 text-sm text-zinc-400">
                CTA: <span className="text-zinc-200">{item.cta}</span>
              </p>

              <button className="mt-5 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 font-semibold hover:bg-white/15">
                Use This Idea
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}