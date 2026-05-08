export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-10">

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">

        {/* LEFT SIDE */}
        <div>
          <p className="text-purple-400 mb-3 text-sm">
            AI VIRTUAL INFLUENCER BUSINESS SYSTEM
          </p>

          <h1 className="text-5xl font-bold leading-tight">
            Build AI models that <br />
            <span className="text-blue-400">create</span>,{" "}
            <span className="text-purple-400">speak</span>, and{" "}
            <span className="text-pink-400">sell</span>.
          </h1>

          <p className="text-gray-400 mt-4">
            Create virtual influencers, generate content, build avatars,
            prepare voice scripts, and launch talking videos — all in one dashboard.
          </p>

          {/* BUTTONS */}
          <div className="flex gap-4 mt-6 flex-wrap">
            <a
              href="/dashboard"
              className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 rounded-xl font-bold"
            >
              Open Dashboard
            </a>

            <a
              href="/ai-models"
              className="border border-gray-700 px-6 py-3 rounded-xl"
            >
              Create AI Model
            </a>

            <a
              href="/image-studio"
              className="border border-gray-700 px-6 py-3 rounded-xl"
            >
              Generate Image
            </a>
          </div>
        </div>

        {/* RIGHT SIDE IMAGE */}
        <div className="flex justify-center">
          <img
            src="/ai-hero.png"
            alt="AI"
            className="w-full max-w-md"
          />
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="max-w-7xl mx-auto mt-16 grid md:grid-cols-4 gap-6">

        {/* CARD 1 */}
        <div className="bg-zinc-900 p-6 rounded-2xl">
          <h2 className="text-3xl text-purple-400 font-bold">120+</h2>
          <p className="mt-2 font-semibold">Content Generated</p>
          <p className="text-gray-400 text-sm">
            Hooks, captions, scripts, offers
          </p>
          <a href="/social-planner" className="text-purple-400 mt-3 inline-block">
            Explore →
          </a>
        </div>

        {/* CARD 2 */}
        <div className="bg-zinc-900 p-6 rounded-2xl">
          <h2 className="text-3xl text-green-400 font-bold">85+</h2>
          <p className="mt-2 font-semibold">Bulk Posts</p>
          <p className="text-gray-400 text-sm">
            Generate multiple posts at once
          </p>
          <a href="/bulk-content" className="text-green-400 mt-3 inline-block">
            Explore →
          </a>
        </div>

        {/* CARD 3 */}
        <div className="bg-zinc-900 p-6 rounded-2xl">
          <h2 className="text-3xl text-orange-400 font-bold">60+</h2>
          <p className="mt-2 font-semibold">Voice Scripts</p>
          <p className="text-gray-400 text-sm">
            Talking avatar scripts ready
          </p>
          <a href="/voice-studio" className="text-orange-400 mt-3 inline-block">
            Explore →
          </a>
        </div>

        {/* CARD 4 */}
        <div className="bg-zinc-900 p-6 rounded-2xl">
          <h2 className="text-3xl text-blue-400 font-bold">45+</h2>
          <p className="mt-2 font-semibold">Videos</p>
          <p className="text-gray-400 text-sm">
            Talking videos generated
          </p>
          <a href="/talking-avatar" className="text-blue-400 mt-3 inline-block">
            Explore →
          </a>
        </div>

      </section>
    </main>
  );
}