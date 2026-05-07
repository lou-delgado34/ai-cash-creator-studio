"use client";

import { useState } from "react";

export default function BulkContentPage() {
  const [topic, setTopic] = useState("extra income, recruiting, financial education");
  const [language, setLanguage] = useState("English");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  async function generateBulk() {
    setLoading(true);
    setResult("");

    const res = await fetch("/api/generate-content", {
      method: "POST",
      body: JSON.stringify({
        platform: "Instagram Reels, TikTok, Facebook",
        language,
        goal: "Create 10 social media posts for recruiting and appointment booking",
        audience: "People who want extra income and financial education",
        topic,
      }),
    });

    const data = await res.json();
    setResult(data.content || "No content generated");
    setLoading(false);
  }

  function copyAll() {
    navigator.clipboard.writeText(result);
  }

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <section className="mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold">Bulk Content Generator</h1>

        <textarea
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="mt-8 min-h-32 w-full rounded-2xl bg-zinc-900 p-4 text-white"
          placeholder="Topic..."
        />

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="mt-4 w-full rounded-2xl bg-zinc-900 p-4 text-white"
        >
          <option>English</option>
          <option>Spanish</option>
        </select>

        <button
          onClick={generateBulk}
          disabled={loading}
          className="mt-5 rounded-xl bg-blue-600 px-6 py-3 font-bold hover:bg-blue-500 disabled:opacity-50"
        >
          {loading ? "Generating..." : "Generate 10 Posts"}
        </button>

        {result && (
          <div className="mt-8 rounded-3xl bg-zinc-900 p-6">
            <button
              onClick={copyAll}
              className="rounded-xl bg-green-600 px-5 py-3 font-bold hover:bg-green-500"
            >
              Copy All
            </button>

            <pre className="mt-5 whitespace-pre-wrap rounded-2xl bg-black p-5 text-sm">
              {result}
            </pre>
          </div>
        )}
      </section>
    </main>
  );
}