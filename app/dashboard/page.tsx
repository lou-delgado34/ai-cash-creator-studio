export default function DashboardPage() {
  const cards = [
    {
      title: "Social Planner",
      desc: "Create recruiting posts, captions, hooks, and scripts.",
      href: "/social-planner",
      button: "Create Content",
    },
    {
      title: "Bulk Content",
      desc: "Generate 10 posts at once for fast social media planning.",
      href: "/bulk-content",
      button: "Generate Bulk Posts",
    },
    {
      title: "Content Library",
      desc: "View saved scripts and turn content into videos.",
      href: "/content-library",
      button: "Open Library",
    },
    {
      title: "Image Studio",
      desc: "Create avatar images and AI visuals.",
      href: "/image-studio",
      button: "Create Image",
    },
    {
      title: "Avatar Builder",
      desc: "Save your digital twin and reusable avatar characters.",
      href: "/avatar-builder",
      button: "Build Avatar",
    },
    {
      title: "Talking Avatar",
      desc: "Turn scripts into talking avatar videos.",
      href: "/talking-avatar",
      button: "Create Video",
    },
    {
      title: "Video History",
      desc: "View saved talking avatar videos.",
      href: "/talking-history",
      button: "View Videos",
    },
    {
      title: "Pricing",
      desc: "Manage plan structure and upgrade flow.",
      href: "/pricing",
      button: "View Plans",
    },
  ];

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <section className="mx-auto max-w-7xl">
        <p className="text-sm font-bold uppercase tracking-widest text-blue-400">
          AI Cash Creator Studio
        </p>

        <h1 className="mt-3 text-5xl font-bold">
          Digital Twin Command Center
        </h1>

        <p className="mt-4 max-w-3xl text-zinc-400">
          Create content, build avatars, generate talking videos, save assets,
          and prepare social media posts from one dashboard.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <div
              key={card.title}
              className="rounded-3xl border border-white/10 bg-zinc-900 p-6"
            >
              <h2 className="text-xl font-bold">{card.title}</h2>

              <p className="mt-3 text-sm text-zinc-400">{card.desc}</p>

              <a
                href={card.href}
                className="mt-6 inline-block rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold hover:bg-blue-500"
              >
                {card.button}
              </a>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-3xl border border-blue-500/30 bg-blue-950/20 p-6">
          <h2 className="text-2xl font-bold">Recommended Workflow</h2>

          <p className="mt-3 text-zinc-300">
            1. Social Planner → 2. Content Library → 3. Avatar Builder → 4.
            Talking Avatar → 5. Video History → 6. Post to social media.
          </p>
        </div>
      </section>
    </main>
  );
}