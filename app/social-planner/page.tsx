"use client";

import { useEffect, useState } from "react";

export default function SocialPlannerPage() {
  const [platform, setPlatform] = useState("Instagram Reels");
  const [language, setLanguage] = useState("English");
  const [goal, setGoal] = useState("Recruit new agents");
  const [topic, setTopic] = useState("");

  const [script, setScript] = useState("");
  const [loading, setLoading] = useState(false);

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

    const prompt = `
You are a viral social media expert.

Platform: ${platform}
Goal: ${goal}
Language: ${language}
Topic: ${topic}

Write a SHORT high-converting script (10-20 seconds).

Rules:
- Strong hook in first line
- Simple language
- Emotional trigger
- End with CTA (comment or message)

Output ONLY the script.
`;

    const res = await fetch("/api/generate-script", {
      method: "POST",
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    setScript(data.text);
    setLoading(false);
  }

  async function createVideo() {
    if (!script) return alert("Generate script first");

    setLoading(true);

    const res = await fetch("/api/generate-video", {
      method: "POST",
      body: JSON.stringify({
        script,
        avatar: "alex", // you can replace later with real avatar
      }),
    });

    const data = await res.json();

    // save to history
    const existing =
      JSON.parse(localStorage.getItem("video_history") || "[]");

    existing.unshift({
      id: Date.now(),
      script,
      videoUrl: data.url,
      createdAt: new Date().toISOString(),
    });

    localStorage.setItem("video_history", JSON.stringify(existing));

    setLoading(false);

    window.location.href = "/video-history";
  }

  async function autoCreateAll() {
    await generateScript();

    setTimeout(async () => {
      await createVideo();
    }, 1500);
  }

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <section className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold">Social Planner + AI Engine</h1>

        <div className="mt-6 space-y-4">
          <input
            value={platform}
            readOnly
            className="w-full rounded-xl bg-zinc-900 p-4"
          />
          <input
            value={language}
            readOnly
            className="w-full rounded-xl bg-zinc-900 p-4"
          />
          <input
            value={goal}
            readOnly
            className="w-full rounded-xl bg-zinc-900 p-4"
          />
          <input
            value={topic}
            readOnly
            className="w-full rounded-xl bg-zinc-900 p-4"
          />
        </div>

        <div className="mt-6 space-x-3">
          <button
            onClick={generateScript}
            className="rounded-xl bg-blue-600 px-6 py-3 font-bold"
          >
            Generate Script
          </button>

          <button
            onClick={createVideo}
            className="rounded-xl bg-green-600 px-6 py-3 font-bold"
          >
            Create Video
          </button>

          <button
            onClick={autoCreateAll}
            className="rounded-xl bg-purple-600 px-6 py-3 font-bold"
          >
            🚀 Auto Create (Script + Video)
          </button>
        </div>

        <div className="mt-6 rounded-xl bg-zinc-900 p-5">
          {loading ? (
            <p>Processing...</p>
          ) : (
            <p className="whitespace-pre-line">{script || "Your script will appear here..."}</p>
          )}
        </div>
      </section>
    </main>
  );
}