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

  const generate = async () => {
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
    setResult(data.content);
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <h1 className="text-3xl font-bold mb-6">
        Social Media Planner + Recruiting Generator
      </h1>

      <div className="grid md:grid-cols-2 gap-6">

        <div className="space-y-4">
          <input
            className="w-full p-3 bg-zinc-900 rounded"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            placeholder="Platform"
          />

          <input
            className="w-full p-3 bg-zinc-900 rounded"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            placeholder="Language"
          />

          <input
            className="w-full p-3 bg-zinc-900 rounded"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="Goal"
          />

          <input
            className="w-full p-3 bg-zinc-900 rounded"
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
            placeholder="Audience"
          />

          <textarea
            className="w-full p-3 bg-zinc-900 rounded"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Topic"
          />

          <button
            onClick={generate}
            className="bg-blue-600 px-6 py-3 rounded font-bold"
          >
            {loading ? "Generating..." : "Generate Content"}
          </button>
        </div>

        <div className="bg-zinc-900 p-5 rounded whitespace-pre-wrap">
          {result || "Your content will appear here..."}
        </div>

      </div>
    </main>
  );
}