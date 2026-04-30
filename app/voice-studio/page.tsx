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

export default function VoiceStudioPage() {
  const [models, setModels] = useState<AIModel[]>([]);
  const [selectedModelId, setSelectedModelId] = useState("");
  const [script, setScript] = useState("");
  const [voiceStyle, setVoiceStyle] = useState("Confident");
  const [speed, setSpeed] = useState("Normal");
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

  function prepareVoiceScript() {
    const model = models.find((item) => item.id === selectedModelId);

    if (!model) {
      setResult("No AI model selected.");
      return;
    }

    const finalScript = script || "Write or paste a script first.";

    const voiceReadyScript = `
${finalScript}

This message is from ${model.name}, an AI-generated virtual creator focused on ${model.niche}.
`;

    setResult(voiceReadyScript.trim());
  }

  function speakScript() {
    const textToSpeak = result || script;

    if (!textToSpeak) {
      setResult("Write or prepare a script first.");
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(textToSpeak);

    if (speed === "Slow") utterance.rate = 0.8;
    if (speed === "Normal") utterance.rate = 1;
    if (speed === "Fast") utterance.rate = 1.2;

    utterance.pitch = voiceStyle === "Energetic" ? 1.2 : 1;
    utterance.volume = 1;

    window.speechSynthesis.speak(utterance);
  }

  function stopSpeaking() {
    window.speechSynthesis.cancel();
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
          Voice Studio
        </p>

        <h1 className="mt-3 text-4xl font-bold">
          Make Your AI Model Talk
        </h1>

        <p className="mt-3 max-w-2xl text-zinc-400">
          Choose your AI model, paste a script, prepare it, then click Speak.
          This is the first real talking version.
        </p>

        <div className="mt-8 rounded-3xl border border-white/10 bg-zinc-900 p-6">
          <h2 className="text-2xl font-bold">Voice Setup</h2>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
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
              value={voiceStyle}
              onChange={(e) => setVoiceStyle(e.target.value)}
              className="rounded-2xl border border-white/10 bg-black px-4 py-3 text-white outline-none"
            >
              <option>Confident</option>
              <option>Friendly</option>
              <option>Luxury</option>
              <option>Motivational</option>
              <option>Calm</option>
              <option>Energetic</option>
            </select>

            <select
              value={speed}
              onChange={(e) => setSpeed(e.target.value)}
              className="rounded-2xl border border-white/10 bg-black px-4 py-3 text-white outline-none"
            >
              <option>Slow</option>
              <option>Normal</option>
              <option>Fast</option>
            </select>
          </div>

          <textarea
            value={script}
            onChange={(e) => setScript(e.target.value)}
            className="mt-4 min-h-40 w-full rounded-2xl border border-white/10 bg-black px-4 py-3 text-white outline-none"
            placeholder="Paste the script you want your AI model to say..."
          />

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              onClick={prepareVoiceScript}
              className="rounded-2xl bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-500"
            >
              Prepare Voice Script
            </button>

            <button
              onClick={speakScript}
              className="rounded-2xl bg-green-600 px-6 py-3 font-semibold hover:bg-green-500"
            >
              Speak
            </button>

            <button
              onClick={stopSpeaking}
              className="rounded-2xl bg-red-600 px-6 py-3 font-semibold hover:bg-red-500"
            >
              Stop
            </button>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-white/10 bg-zinc-900 p-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-bold">Voice Script</h2>

            <button
              onClick={copyResult}
              className="rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm hover:bg-white/15"
            >
              Copy
            </button>
          </div>

          <pre className="mt-5 whitespace-pre-wrap rounded-2xl bg-black p-5 text-sm text-zinc-300">
            {result || "Your voice script will appear here."}
          </pre>
        </div>
      </section>
    </main>
  );
}