export default function ImageStudio() {
  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <section className="mx-auto max-w-5xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
          Image Studio
        </p>

        <h1 className="mt-3 text-4xl font-bold">
          Create AI Images
        </h1>

        <p className="mt-4 max-w-2xl text-zinc-400">
          Your paid plan is active. Use this studio to create AI photos,
          product visuals, social posts, and creator content.
        </p>

        <div className="mt-8 rounded-3xl border border-white/10 bg-zinc-900 p-6">
          <h2 className="text-2xl font-bold">AI Image Generator</h2>

          <textarea
            className="mt-5 min-h-40 w-full rounded-2xl border border-white/10 bg-black p-4 text-white outline-none"
            placeholder="Describe the image you want to create..."
          />

          <button className="mt-5 rounded-2xl bg-blue-600 px-6 py-4 font-bold hover:bg-blue-500">
            Generate Image
          </button>
        </div>
      </section>
    </main>
  );
}