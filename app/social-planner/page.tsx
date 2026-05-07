"use client";

import { useState } from "react";

export default function SocialPlannerPage() {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const [platform, setPlatform] = useState("Instagram Reels");
  const [language, setLanguage] = useState("English");
  const [goal, setGoal] = useState("Recruit new agents");
  const [audience, setAudience] = useState("People who want extra income");
  const [topic, setTopic] = useState("");

  async function generate() {
    setLoading(true);

    const res = await fetch("/api/generate-content", {
      method: "POST",
      body: JSON.stringify({
        platform,
        language,
        goal,
        audience,
        topic,
      }),
    });

    const data = await res.json();
    setResult(data.content || "No content generated");
    setLoading(false);
  }

  function copyContent() {
    navigator.clipboard.writeText(result);
  }

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <section className="mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold">
          Social Planner + Recruiting Script Generator
        </h1>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="space-y-4 rounded-3xl bg-zinc-900 p-6">
            <input
              className="w-full rounded-xl bg-black p-4"
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              placeholder="Platform"
            />

            <input
              className="w-full rounded-xl bg-black p-4"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              placeholder="Language"
            />

            <input
              className="w-full rounded-xl bg-black p-4"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="Goal"
            />

            <input
              className="w-full rounded-xl bg-black p-4"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              placeholder="Audience"
            />

            <textarea
              className="min-h-32 w-full rounded-xl bg-black p-4"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Topic"
            />

            <button
              onClick={generate}
              disabled={loading}
              className="rounded-xl bg-blue-600 px-6 py-3 font-bold hover:bg-blue-500 disabled:opacity-50"
            >
              {loading ? "Generating..." : "Generate Content"}
            </button>
          </div>

          <div className="rounded-3xl bg-zinc-900 p-6">
            <h2 className="text-2xl font-bold">Generated Content</h2>

            <div className="mt-4 min-h-80 whitespace-pre-wrap rounded-xl bg-black p-5 text-zinc-200">
              {result || "Your content will appear here..."}
            </div>

            {result && (
              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  onClick={copyContent}
                  className="rounded-xl bg-zinc-700 px-5 py-3 font-bold hover:bg-zinc-600"
                >
                  Copy
                </button>

                <a
                  href="/talking-avatar"
                  className="rounded-xl bg-green-600 px-5 py-3 font-bold hover:bg-green-500"
                >
                  Open Talking Avatar
                </a>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}