"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

type AIModel = {
  id: string;
  name: string;
  niche: string;
  platform: string;
  personality: string;
  style: string;
  backstory: string;
};

export default function AvatarVideoPage() {
  const [models, setModels] = useState<AIModel[]>([]);
  const [selectedModelId, setSelectedModelId] = useState("");
  const [avatarLook, setAvatarLook] = useState("");
  const [script, setScript] = useState("");
  const [videoStyle, setVideoStyle] = useState("Talking Head");
  const [platform, setPlatform] = useState("TikTok / Reels");
  const [result, setResult] = useState("");

  async function loadModels() {
    const { data } = await supabase.from("ai_models").select("*");

    const cleanModels = (data || []).map((model) => ({
      id: String(model.id),
      name: String(model.name || ""),
      niche: String(model.niche || ""),
      platform: String(model.platform || ""),
      personality: String(model.personality || ""),
      style: String(model.style || ""),
      backstory: String(model.backstory || ""),
    }));

    setModels(cleanModels);

    if (cleanModels.length > 0) {
      setSelectedModelId(cleanModels[0].id);
    }
  }

  function generateVideoPrompt() {
    const model = models.find((item) => item.id === selectedModelId);

    if (!model) {
      setResult("No AI model selected.");
      return;
    }

    const finalAvatarLook =
      avatarLook ||
      "A realistic AI-generated virtual influencer with a premium social media look.";

    const finalScript =
      script ||
      "Write the script this AI avatar should say in the video.";

    const prompt = `
AVATAR VIDEO STUDIO PROMPT

AI MODEL:
${model.name}

NICHE:
${model.niche}

PERSONALITY:
${model.personality}

STYLE:
${model.style}

VIDEO STYLE:
${videoStyle}

PLATFORM:
${platform}

AVATAR LOOK:
${finalAvatarLook}

SCRIPT TO SAY:
${finalScript}

VIDEO DIRECTIONS:
Create a vertical 9:16 talking avatar video.
The avatar should look polished, realistic, and social-media ready.
Use clear eye contact, natural facial movement, and confident delivery.
The video should feel modern, premium, and made for ${platform}.

SAFETY NOTE:
This is an AI-generated virtual creator. Do not present this avatar as a real person.
Do not impersonate any real person or celebrity.
`;

    setResult(prompt.trim());
  }

  function copyResult() {
    navigator.clipboard.writeText(result);
  }

  useEffect(() => {
    loadModels();
  }, []);

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <section className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
          Avatar Video Studio
        </p>

        <h1 className="mt-3 text-4xl font-bold">
          Prepare Talking Avatar Videos
        </h1>

        <p className="mt-3 max-w-2xl text-zinc-400">
          Build the video prompt for your AI model. Later we can connect this to
          avatar video tools like HeyGen, D-ID, or other APIs.
        </p>

        <div className="mt-8 rounded-3xl border border-white/10 bg-zinc-900 p-6">
          <h2 className="text-2xl font-bold">Video Setup</h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <select
              value={selectedModelId}
              onChange={(e) => setSelectedModelId(e.target.value)}
              className="rounded-2xl border border-white/10 bg-black px-4 py-3 text-white outline-none"
            >
              {models.map((model) => (
                <option key={model.id} value={model.id}>
                  {model.name} — {model.niche}
                </option>
              ))}
            </select>

            <select
              value={videoStyle}
              onChange={(e) => setVideoStyle(e.target.value)}
              className="rounded-2xl border border-white/10 bg-black px-4 py-3 text-white outline-none"
            >
              <option>Talking Head</option>
              <option>Podcast Style</option>
              <option>Luxury Influencer</option>
              <option>Fitness Coach</option>
              <option>Financial Education</option>
              <option>Motivational Speaker</option>
            </select>

            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="rounded-2xl border border-white/10 bg-black px-4 py-3 text-white outline-none"
            >
              <option>TikTok / Reels</option>
              <option>YouTube Shorts</option>
              <option>Instagram Story</option>
              <option>Facebook Reels</option>
              <option>LinkedIn Video</option>
            </select>
          </div>

          <textarea
            value={avatarLook}
            onChange={(e) => setAvatarLook(e.target.value)}
            className="mt-4 min-h-32 w-full rounded-2xl border border-white/10 bg-black px-4 py-3 text-white outline-none"
            placeholder="Describe the avatar look: outfit, setting, camera angle, lighting..."
          />

          <textarea
            value={script}
            onChange={(e) => setScript(e.target.value)}
            className="mt-4 min-h-40 w-full rounded-2xl border border-white/10 bg-black px-4 py-3 text-white outline-none"
            placeholder="Paste the script your avatar should say..."
          />

          <button
            onClick={generateVideoPrompt}
            className="mt-5 rounded-2xl bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-500"
          >
            Generate Video Prompt
          </button>
        </div>

        <div className="mt-8 rounded-3xl border border-white/10 bg-zinc-900 p-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-bold">Video Prompt Result</h2>

            <button
              onClick={copyResult}
              className="rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm hover:bg-white/15"
            >
              Copy
            </button>
          </div>

          <pre className="mt-5 whitespace-pre-wrap rounded-2xl bg-black p-5 text-sm text-zinc-300">
            {result || "Your avatar video prompt will appear here."}
          </pre>
        </div>
      </section>
    </main>
  );
}