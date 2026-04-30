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

export default function BulkGeneratorPage() {
  const [models, setModels] = useState<AIModel[]>([]);
  const [selectedModelId, setSelectedModelId] = useState("");
  const [contentType, setContentType] = useState("TikTok Script");
  const [topic, setTopic] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function loadModels() {
    const { data, error } = await supabase.from("ai_models").select("*");

    if (error) {
      setStatus("Error loading models: " + error.message);
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

  async function generateBulkContent() {
    const model = models.find((item) => item.id === selectedModelId);

    if (!model) {
      setStatus("No AI model selected.");
      return;
    }

    setIsLoading(true);
    setStatus("Generating 5 pieces of content...");
    setResults([]);

    try {
      const generatedItems: string[] = [];

      for (let i = 1; i <= 5; i++) {
        const response = await fetch("/api/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            modelData: model,
            contentType,
            topic: `${topic || "daily content idea"} - version ${i}`,
          }),
        });

        const data = await response.json();

        if (data.error) {
          generatedItems.push("Error: " + data.error);
        } else {
          generatedItems.push(data.result || "No result returned.");
        }
      }

      setResults(generatedItems);

      const rowsToSave = generatedItems.map((item, index) => ({
        ai_model_id: null,
        ai_model_name: model.name,
        content_type: contentType,
        topic: `${topic || "bulk content"} - post ${index + 1}`,
        result: item,
      }));

      const saveResponse = await supabase
        .from("generated_content")
        .insert(rowsToSave);

      if (saveResponse.error) {
        setStatus("Generated, but save failed: " + saveResponse.error.message);
        return;
      }

      setStatus("Generated and saved 5 pieces of content successfully.");
    } catch {
      setStatus("Something went wrong. Check your API key and server.");
    } finally {
      setIsLoading(false);
    }
  }

  function copyText(text: string) {
    navigator.clipboard.writeText(text);
  }

  useEffect(() => {
    loadModels();
  }, []);

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <section className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
          Bulk Generator
        </p>

        <h1 className="mt-3 text-4xl font-bold">
          Generate 5 Posts at Once
        </h1>

        <p className="mt-3 max-w-2xl text-zinc-400">
          Choose your AI model, select the content type, enter one topic, and
          create multiple saved content pieces at the same time.
        </p>

        <div className="mt-8 rounded-3xl border border-white/10 bg-zinc-900 p-6">
          <h2 className="text-2xl font-bold">Bulk Content Setup</h2>

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
            onClick={generateBulkContent}
            disabled={isLoading}
            className="mt-5 rounded-2xl bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-zinc-700"
          >
            {isLoading ? "Generating..." : "Generate 5 + Save"}
          </button>

          {status && (
            <p className="mt-4 rounded-2xl border border-white/10 bg-black p-4 text-sm text-zinc-300">
              {status}
            </p>
          )}
        </div>

        <div className="mt-8 grid gap-5">
          {results.map((item, index) => (
            <div
              key={index}
              className="rounded-3xl border border-white/10 bg-zinc-900 p-6"
            >
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-2xl font-bold">Post {index + 1}</h2>

                <button
                  onClick={() => copyText(item)}
                  className="rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm hover:bg-white/15"
                >
                  Copy
                </button>
              </div>

              <pre className="mt-5 whitespace-pre-wrap rounded-2xl bg-black p-5 text-sm text-zinc-300">
                {item}
              </pre>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}