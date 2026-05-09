"use client";

import { useState } from "react";

const USER_EMAIL = "lou.delgado.pfs@gmail.com";

export default function SocialPlannerPage() {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [platform, setPlatform] = useState("Instagram Reels");
  const [language, setLanguage] = useState("English");
  const [goal, setGoal] = useState("Recruit new agents");
  const [audience, setAudience] = useState("People who want extra income");
  const [topic, setTopic] = useState("");

  async function generate() {
    setLoading(true);
    setMessage("");

    const res = await fetch("/api/generate-content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ platform, language, goal, audience, topic }),
    });

    const data = await res.json();
    setResult(data.content || "No content generated");
    setLoading(false);
  }

  async function saveDraft() {
    if (!result) {
      setMessage("Generate content first.");
      return;
    }

    const res = await fetch("/api/save-social-content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: USER_EMAIL,
        content_type: goal,
        platform,
        language,
        hook: "Generated Content",
        caption: result,
        script: result,
        call_to_action: "Message me for details.",
        status: "draft",
      }),
    });

    const data = await res.json();
    setMessage(data.success ? "Saved to Content Library." : data.error || "Save failed.");
  }

  function copyContent() {
    navigator.clipboard.writeText(result);
    setMessage("Copied.");
  }

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <section className="mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold">
          Social Planner + Recruiting Script Generator
        </h1>

        <p className="mt-3 text-zinc-400">
          Pick the platform, language, goal, audience, and topic. The AI will adjust the strategy.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="space-y-4 rounded-3xl bg-zinc-900 p-6">
            <label className="block">
              <span className="text-sm text-zinc-400">Platform</span>
              <select
                className="mt-2 w-full rounded-xl bg-black p-4 text-white"
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
              >
                <option>Instagram Reels</option>
                <option>TikTok</option>
                <option>Facebook</option>
                <option>YouTube Shorts</option>
                <option>LinkedIn</option>
              </select>
            </label>

            <label className="block">
              <span className="text-sm text-zinc-400">Language</span>
              <select
                className="mt-2 w-full rounded-xl bg-black p-4 text-white"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option>English</option>
                <option>Spanish</option>
              </select>
            </label>

            <label className="block">
              <span className="text-sm text-zinc-400">Goal</span>
              <select
                className="mt-2 w-full rounded-xl bg-black p-4 text-white"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
              >
                <option>Recruit new agents</option>
                <option>Book appointments</option>
                <option>Financial education</option>
                <option>Promote business opportunity</option>
                <option>Invite to Zoom or event</option>
                <option>Build personal brand</option>
              </select>
            </label>

            <label className="block">
              <span className="text-sm text-zinc-400">Audience</span>
              <select
                className="mt-2 w-full rounded-xl bg-black p-4 text-white"
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
              >
                <option>People who want extra income</option>
                <option>Parents who want financial protection</option>
                <option>People stuck at their job</option>
                <option>Entrepreneurs</option>
                <option>Spanish-speaking families</option>
                <option>Young adults learning money</option>
              </select>
            </label>

            <textarea
              className="min-h-32 w-full rounded-xl bg-black p-4 text-white"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Topic: extra income, life insurance, recruiting, family protection..."
            />

            <button
              onClick={generate}
              disabled={loading}
              className="rounded-xl bg-blue-600 px-6 py-3 font-bold disabled:opacity-50"
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
                <button onClick={copyContent} className="rounded-xl bg-zinc-700 px-5 py-3 font-bold">
                  Copy
                </button>

                <button onClick={saveDraft} className="rounded-xl bg-green-600 px-5 py-3 font-bold">
                  Save Draft
                </button>

                <a href="/content-library" className="rounded-xl bg-purple-600 px-5 py-3 font-bold">
                  Content Library
                </a>

                <a href="/talking-avatar" className="rounded-xl bg-blue-600 px-5 py-3 font-bold">
                  Talking Avatar
                </a>
              </div>
            )}

            {message && <p className="mt-5 text-yellow-400">{message}</p>}
          </div>
        </div>
      </section>
    </main>
  );
}