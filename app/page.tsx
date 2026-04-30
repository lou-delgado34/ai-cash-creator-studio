export default function Home() {
  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <section className="mx-auto max-w-6xl">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black p-8 shadow-2xl md:p-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
            AI Virtual Influencer Business System
          </p>

          <h1 className="mt-5 max-w-4xl text-5xl font-bold leading-tight md:text-7xl">
            Build AI models that create, speak, and sell.
          </h1>

          <p className="mt-6 max-w-3xl text-lg text-zinc-300">
            AI Cash Creator Studio helps you create virtual influencers,
            generate content, build avatar images, prepare voice scripts, and
            organize talking video projects from one dashboard.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="/dashboard"
              className="rounded-2xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-500"
            >
              Open Dashboard
            </a>

            <a
              href="/ai-models"
              className="rounded-2xl border border-white/15 bg-white/10 px-6 py-3 font-semibold text-white hover:bg-white/15"
            >
              Create AI Model
            </a>

            <a
              href="/image-studio"
              className="rounded-2xl border border-white/15 bg-white/10 px-6 py-3 font-semibold text-white hover:bg-white/15"
            >
              Generate Image
            </a>
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-4">
          <a
            href="/prompt-studio"
            className="rounded-3xl border border-white/10 bg-zinc-900 p-6 hover:bg-zinc-800"
          >
            <h2 className="text-xl font-bold">Content Generator</h2>
            <p className="mt-3 text-sm text-zinc-400">
              Create captions, hooks, scripts, and offers.
            </p>
          </a>

          <a
            href="/bulk-generator"
            className="rounded-3xl border border-white/10 bg-zinc-900 p-6 hover:bg-zinc-800"
          >
            <h2 className="text-xl font-bold">Bulk Generator</h2>
            <p className="mt-3 text-sm text-zinc-400">
              Create five posts at once and save them.
            </p>
          </a>

          <a
            href="/voice-studio"
            className="rounded-3xl border border-white/10 bg-zinc-900 p-6 hover:bg-zinc-800"
          >
            <h2 className="text-xl font-bold">Voice Studio</h2>
            <p className="mt-3 text-sm text-zinc-400">
              Prepare scripts and test talking voice.
            </p>
          </a>

          <a
            href="/video-generator"
            className="rounded-3xl border border-white/10 bg-zinc-900 p-6 hover:bg-zinc-800"
          >
            <h2 className="text-xl font-bold">Video Generator</h2>
            <p className="mt-3 text-sm text-zinc-400">
              Build free or paid API-ready video workflows.
            </p>
          </a>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <div className="rounded-3xl border border-green-500/30 bg-green-950/30 p-6">
            <h2 className="text-xl font-bold text-green-300">
              Admin Unlimited
            </h2>
            <p className="mt-3 text-sm text-zinc-300">
              Your admin account keeps unlimited access inside the app.
            </p>
          </div>

          <div className="rounded-3xl border border-blue-500/30 bg-blue-950/30 p-6">
            <h2 className="text-xl font-bold text-blue-300">
              Real AI Generation
            </h2>
            <p className="mt-3 text-sm text-zinc-300">
              Uses your OpenAI API key for content and avatar images.
            </p>
          </div>

          <div className="rounded-3xl border border-purple-500/30 bg-purple-950/30 p-6">
            <h2 className="text-xl font-bold text-purple-300">
              Video Ready
            </h2>
            <p className="mt-3 text-sm text-zinc-300">
              Prepared for HeyGen, D-ID, or other paid talking avatar APIs.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}