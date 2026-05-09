"use client";

import { useEffect, useState } from "react";

const USER_EMAIL = "lou.delgado.pfs@gmail.com";

export default function SocialPlannerPage() {
  const [platform, setPlatform] = useState("Instagram Reels");
  const [language, setLanguage] = useState("English");
  const [goal, setGoal] = useState("Recruit new agents");
  const [topic, setTopic] = useState("");

  const [script, setScript] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const savedPlatform = localStorage.getItem("planner_platform");
    const savedLanguage = localStorage.getItem("planner_language");
    const savedGoal = localStorage.getItem("planner_goal");
    const savedTopic = localStorage.getItem("planner_topic");

    if (savedPlatform) setPlatform(savedPlatform);
    if (savedLanguage) setLanguage(savedLanguage);
    if (savedGoal) setGoal(savedGoal);
    if (savedTopic) setTopic(savedTopic);
  }, []);

  async function generateScript() {
    setLoading(true);
    setMessage("");

    const prompt = `
You are a viral social media strategist.

Platform: ${platform}
Goal: ${goal}
Language: ${language}
Topic: ${topic}

Create a short, high-converting social media script.

Rules:
- Match the platform strategy.
- TikTok = fast hook, curiosity, simple words.
- Instagram Reels = visual, emotional, short.
- Facebook = story-based and community-driven.
- LinkedIn = professional and credibility-based.
- Use the selected language only.
- Do NOT include hashtags.
- Do NOT include captions.
- Do NOT include extra explanation.
- Output only the spoken script.
`;

    const res = await fetch("/api/generate-script", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    setScript(data.text || "No script generated.");
    setLoading(false);
  }

  async function saveScript() {
    if (!script) {
      setMessage("Generate a script first.");
      return;
    }

    const res = await fetch("/api/save-social-content", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: USER_EMAIL,
        content_type: goal,
        platform,
        language,
        hook: "Generated script",
        caption: script,
        script,
        call_to_action: "Message me for details.",
        status: "draft",
      }),
    });

    const data = await res.json();

    setMessage(
      data.success
        ? "Script saved to Content Library. No video credits used."
        : data.error || "Save failed."
    );
  }

  function copyScript() {
    navigator.clipboard.writeText(script);
    setMessage("Script copied.");
  }

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <section className="mx-auto max-w-5xl">
        <h1 className="text-4xl font-bold">Social Planner + AI Script Engine</h1>

        <p className="mt-3 text-zinc-400">
          This page only creates and saves scripts. It does not use D-ID video credits.
        </p>

        <div className="mt-8 grid gap-4 rounded-3xl bg-zinc-900 p-6">
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="rounded-xl bg-black p-4 text-white"
          >
            <option>Instagram Reels</option>
            <option>TikTok</option>
            <option>Facebook</option>
            <option>YouTube Shorts</option>
            <option>LinkedIn</option>
          </select>

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="rounded-xl bg-black p-4 text-white"
          >
            <option>English</option>
            <option>Spanish</option>
          </select>

          <select
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="rounded-xl bg-black p-4 text-white"
          >
            <option>Recruit new agents</option>
            <option>Book appointments</option>
            <option>Financial education</option>
            <option>Promote business opportunity</option>
            <option>Invite to Zoom or event</option>
            <option>Build personal brand</option>
          </select>

          <textarea
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="min-h-28 rounded-xl bg-black p-4 text-white"
            placeholder="Topic..."
          />

          <button
            onClick={generateScript}
            disabled={loading}
            className="rounded-xl bg-blue-600 px-6 py-3 font-bold disabled:opacity-50"
          >
            {loading ? "Generating..." : "Generate Script"}
          </button>
        </div>

        <div className="mt-8 rounded-3xl bg-zinc-900 p-6">
          <h2 className="text-2xl font-bold">Generated Script</h2>

          <div className="mt-4 min-h-40 whitespace-pre-wrap rounded-2xl bg-black p-5 text-zinc-200">
            {script || "Your script will appear here..."}
          </div>

          {script && (
            <div className="mt-5 flex flex-wrap gap-3">
              <button
                onClick={copyScript}
                className="rounded-xl bg-zinc-700 px-5 py-3 font-bold"
              >
                Copy Script
              </button>

              <button
                onClick={saveScript}
                className="rounded-xl bg-green-600 px-5 py-3 font-bold"
              >
                Save Script to Library
              </button>

              <a
                href="/content-library"
                className="rounded-xl bg-purple-600 px-5 py-3 font-bold"
              >
                Open Content Library
              </a>
            </div>
          )}

          {message && <p className="mt-5 text-yellow-400">{message}</p>}
        </div>
      </section>
    </main>
  );
}