"use client";

import { useState } from "react";

const USER_EMAIL = "lou.delgado.pfs@gmail.com";

export default function SocialPlannerPage() {
  const [platform, setPlatform] = useState("Instagram Reels");
  const [language, setLanguage] = useState("English");
  const [goal, setGoal] = useState("Recruit new agents");
  const [audience, setAudience] = useState("People who want extra income");
  const [topic, setTopic] = useState("");
  const [result, setResult] = useState<any>(null);
  const [message, setMessage] = useState("");

  function generateContent() {
    const cleanTopic = topic || "extra income, financial education, and building a business";

    const hook =
      language === "Spanish"
        ? "¿Y si pudieras construir algo propio sin dejar lo que ya haces?"
        : "What if you could build something of your own without quitting what you already do?";

    const caption =
      language === "Spanish"
        ? `Muchas personas quieren más ingresos, pero no saben por dónde empezar. Este contenido habla sobre ${cleanTopic} y abre la conversación para personas interesadas en aprender.`
        : `A lot of people want more income, but they do not know where to start. This post talks about ${cleanTopic} and opens the conversation for people interested in learning.`;

    const script =
      language === "Spanish"
        ? `Mira, no todos están buscando otro trabajo. Muchos están buscando una oportunidad. Si eres una persona trabajadora, entrenable, y quieres aprender sobre dinero, protección familiar y crecimiento personal, puede que esto sea para ti. No necesitas saberlo todo hoy. Solo necesitas estar abierto a aprender.`
        : `Listen, not everyone is looking for another job. A lot of people are looking for an opportunity. If you are hardworking, coachable, and open to learning about money, family protection, and personal growth, this may be for you. You do not need to know everything today. You just need to be open to learning.`;

    const cta =
      language === "Spanish"
        ? "Comenta INFO o mándame un mensaje privado."
        : "Comment INFO or send me a private message.";

    setResult({
      hook,
      caption,
      script,
      call_to_action: cta,
    });

    setMessage("Content created.");
  }

  async function saveContent() {
    if (!result) {
      setMessage("Generate content first.");
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
        hook: result.hook,
        caption: result.caption,
        script: result.script,
        call_to_action: result.call_to_action,
        status: "draft",
      }),
    });

    const data = await res.json();

    if (data.success) {
      setMessage("Saved to content planner.");
    } else {
      setMessage(data.error || "Save failed.");
    }
  }

  function copyAll() {
    if (!result) return;

    navigator.clipboard.writeText(`
HOOK:
${result.hook}

CAPTION:
${result.caption}

SCRIPT:
${result.script}

CTA:
${result.call_to_action}
`);
    setMessage("Copied.");
  }

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <section className="mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold">
          Social Media Planner + Recruiting Script Generator
        </h1>

        <p className="mt-3 text-zinc-400">
          Create recruiting posts, captions, talking-video scripts, and calls to action.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-zinc-900 p-6">
            <h2 className="text-2xl font-bold">Content Setup</h2>

            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="mt-5 w-full rounded-2xl bg-black p-4 text-white"
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
              className="mt-4 w-full rounded-2xl bg-black p-4 text-white"
            >
              <option>English</option>
              <option>Spanish</option>
            </select>

            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="mt-4 w-full rounded-2xl bg-black p-4 text-white"
            >
              <option>Recruit new agents</option>
              <option>Book appointments</option>
              <option>Financial education</option>
              <option>Promote business opportunity</option>
              <option>Invite to Zoom / Event</option>
            </select>

            <input
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              className="mt-4 w-full rounded-2xl bg-black p-4 text-white"
              placeholder="Target audience"
            />

            <textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="mt-4 min-h-32 w-full rounded-2xl bg-black p-4 text-white"
              placeholder="Topic: extra income, family protection, financial education..."
            />

            <button
              onClick={generateContent}
              className="mt-5 rounded-2xl bg-blue-600 px-6 py-4 font-bold hover:bg-blue-500"
            >
              Generate Content
            </button>
          </div>

          <div className="rounded-3xl border border-white/10 bg-zinc-900 p-6">
            <h2 className="text-2xl font-bold">Generated Content</h2>

            {!result && (
              <p className="mt-5 text-zinc-400">
                Your hook, caption, script, and CTA will appear here.
              </p>
            )}

            {result && (
              <div className="mt-5 space-y-5">
                <div>
                  <p className="text-sm text-blue-400">HOOK</p>
                  <p className="mt-1">{result.hook}</p>
                </div>

                <div>
                  <p className="text-sm text-blue-400">CAPTION</p>
                  <p className="mt-1">{result.caption}</p>
                </div>

                <div>
                  <p className="text-sm text-blue-400">SCRIPT</p>
                  <p className="mt-1 whitespace-pre-wrap">{result.script}</p>
                </div>

                <div>
                  <p className="text-sm text-blue-400">CTA</p>
                  <p className="mt-1">{result.call_to_action}</p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={copyAll}
                    className="rounded-xl bg-zinc-800 px-4 py-3 font-bold hover:bg-zinc-700"
                  >
                    Copy All
                  </button>

                  <button
                    onClick={saveContent}
                    className="rounded-xl bg-green-600 px-4 py-3 font-bold hover:bg-green-500"
                  >
                    Save Draft
                  </button>

                  <a
                    href="/talking-avatar"
                    className="rounded-xl bg-blue-600 px-4 py-3 font-bold hover:bg-blue-500"
                  >
                    Use Script for Talking Avatar
                  </a>
                </div>
              </div>
            )}

            {message && <p className="mt-5 text-yellow-400">{message}</p>}
          </div>
        </div>
      </section>
    </main>
  );
}