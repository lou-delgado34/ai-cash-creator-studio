"use client";

import { useState } from "react";

export default function PostPrepPage() {
  const [caption, setCaption] = useState("");
  const [hashtags, setHashtags] = useState("#ExtraIncome #FinancialEducation #BusinessOpportunity");
  const [cta, setCta] = useState("Comment INFO or send me a message.");

  function copyPost() {
    navigator.clipboard.writeText(`${caption}\n\n${cta}\n\n${hashtags}`);
  }

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <section className="mx-auto max-w-5xl">
        <h1 className="text-4xl font-bold">Post Prep</h1>
        <p className="mt-3 text-zinc-400">
          Prepare your caption, hashtags, and CTA before posting.
        </p>

        <textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="mt-8 min-h-40 w-full rounded-2xl bg-zinc-900 p-4 text-white"
          placeholder="Paste your caption..."
        />

        <input
          value={cta}
          onChange={(e) => setCta(e.target.value)}
          className="mt-4 w-full rounded-2xl bg-zinc-900 p-4 text-white"
          placeholder="Call to action"
        />

        <input
          value={hashtags}
          onChange={(e) => setHashtags(e.target.value)}
          className="mt-4 w-full rounded-2xl bg-zinc-900 p-4 text-white"
          placeholder="Hashtags"
        />

        <button
          onClick={copyPost}
          className="mt-5 rounded-xl bg-blue-600 px-6 py-3 font-bold hover:bg-blue-500"
        >
          Copy Post Text
        </button>
      </section>
    </main>
  );
}