"use client";

import { useState } from "react";

const USER_EMAIL = "lou.delgado.pfs@gmail.com";

export default function ImageStudio() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function generateImage() {
    setLoading(true);
    setResult("");

    const res = await fetch("/api/generate-image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    const imageUrl = data.image || data.url || data.imageUrl || "";

    setResult(imageUrl || "Image generated, but no image URL returned.");

    if (imageUrl) {
      await fetch("/api/save-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: USER_EMAIL, prompt, image_url: imageUrl }),
      });
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <section className="mx-auto max-w-5xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
          Image Studio
        </p>

        <div className="mt-3 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h1 className="text-4xl font-bold">Create AI Images</h1>

          <div className="flex flex-wrap gap-3">
            <a
              href="/image-history"
              className="rounded-xl bg-zinc-800 px-4 py-3 text-sm font-bold text-white hover:bg-zinc-700"
            >
              View Image History
            </a>

            <a
              href="/avatar-builder"
              className="rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white hover:bg-blue-500"
            >
              Build Avatar
            </a>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-white/10 bg-zinc-900 p-6">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="min-h-40 w-full rounded-2xl border border-white/10 bg-black p-4 text-white outline-none"
            placeholder="Describe your image..."
          />

          <button
            onClick={generateImage}
            disabled={loading || !prompt.trim()}
            className="mt-5 rounded-2xl bg-blue-600 px-6 py-4 font-bold text-white hover:bg-blue-500 disabled:opacity-50"
          >
            {loading ? "Generating..." : "Generate Image"}
          </button>

          {result && (
            <div className="mt-6 rounded-2xl border border-white/10 bg-black p-4">
              <p className="text-sm text-zinc-400">Saved Result:</p>

              {result.startsWith("data:image") || result.startsWith("http") ? (
                <img src={result} alt="Generated AI image" className="mt-4 max-w-full rounded-2xl" />
              ) : (
                <p className="mt-2 break-all">{result}</p>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}