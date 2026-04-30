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

export default function PromptStudioPage() {
  const [models, setModels] = useState<AIModel[]>([]);
  const [selectedModelId, setSelectedModelId] = useState("");
  const [contentType, setContentType] = useState("TikTok Script");
  const [topic, setTopic] = useState("");
  const [result, setResult] = useState("");
  const [saveStatus, setSaveStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function loadModels() {
    const { data, error } = await supabase.from("ai_models").select("*");

    if (error) {
      setSaveStatus("Error loading AI models: " + error.message);
      return;
    }

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

  async function generateContent() {
    const model = models.find((item) => item.id === selectedModelId);

    if (!model) {
      setSaveStatus("No AI model selected. Go to AI Models and save one first.");
      return;
    }

    setIsLoading(true);
    setSaveStatus("");
    setResult("Generating real AI content...");

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          modelData: model,
          contentType,
          topic,
        }),
      });

      const data = await response.json();

      if (data.error) {
        setResult("Error: " + data.error);
        setIsLoading(false);
        return;
      }

      const aiResult = data.result || "No result returned.";
      setResult(aiResult);

      const saveResponse = await supabase.from("generated_content").insert([
        {
          ai_model_id: null,
          ai_model_name: model.name,
          content_type: contentType,
          topic: topic || "",
          result: aiResult,
        },
      ]);

      if (saveResponse.error) {
        setSaveStatus(
          "AI generated, but save failed: " + saveResponse.error.message
        );
        return;
      }

      setSaveStatus("Saved to Supabase successfully.");
    } catch {
      setResult("Error generating content. Check your API key and server.");
    } finally {
      setIsLoading(false);
    }
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
          Real AI Generator
        </p>

        <h1 className="mt-3 text-4xl font-bold">
          AI Content Generator + Save
        </h1>

        <p className="mt-3 max-w-2xl text-zinc-400">
          Choose one of your saved AI models and generate real AI captions,
          scripts, hooks, photo prompts, and offer ideas.
        </p>

        <div className="mt-8 rounded-3xl border border-white/10 bg-zinc-900 p-6">
          <h2 className="text-2xl font-bold">Generate Content</h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <select
              value={selectedModelId}
              onChange={(e) => setSelectedModelId(e.target.value)}
              className="rounded-2xl border border-white/10 bg-black px-4 py-3 text-white outline-none"
            >
              {models.length === 0 && (
                <option value="">No AI models found</option>
              )}

              {models.map((model) => (
                <option key={model.id} value={model.id}>
                  {model.name} — {model.niche}
                </option>
              ))}
            </select>

            <select
              value={contentType}
              onChange={(e) => setContentType(e.target.value)}
              className="rounded-2xl border border-white/10 bg-black px-4 py-3 text-white outline-none"
            >
              <option>TikTok Script</option>
              <option>Instagram Caption</option>
              <option>Talking Avatar Script</option>
              <option>Photo Prompt</option>
              <option>Viral Hook</option>
              <option>Money Offer Idea</option>
            </select>
          </div>

          <textarea
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="mt-4 min-h-28 w-full rounded-2xl border border-white/10 bg-black px-4 py-3 text-white outline-none"
            placeholder="Topic: Example - recruiting for financial services"
          />

          <button
            onClick={generateContent}
            disabled={isLoading}
            className="mt-5 rounded-2xl bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-zinc-700"
          >
            {isLoading ? "Working..." : "Generate + Save"}
          </button>

          {saveStatus && (
            <p className="mt-4 rounded-2xl border border-white/10 bg-black p-4 text-sm text-zinc-300">
              {saveStatus}
            </p>
          )}
        </div>

        <div className="mt-8 rounded-3xl border border-white/10 bg-zinc-900 p-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-bold">Generated Result</h2>

            <button
              onClick={copyResult}
              className="rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm hover:bg-white/15"
            >
              Copy
            </button>
          </div>

          <pre className="mt-5 whitespace-pre-wrap rounded-2xl bg-black p-5 text-sm text-zinc-300">
            {result || "Your real AI-generated content will appear here."}
          </pre>
        </div>
      </section>
    </main>
  );
}