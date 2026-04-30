"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

type AIModel = {
  id: string;
  name: string;
  niche: string;
  personality: string;
  style: string;
};

type SavedImage = {
  id: string;
  ai_model_name: string;
  prompt: string;
  image_url: string;
  created_at: string;
};

export default function ImageStudioPage() {
  const [models, setModels] = useState<AIModel[]>([]);
  const [savedImages, setSavedImages] = useState<SavedImage[]>([]);
  const [selectedModelId, setSelectedModelId] = useState("");
  const [scene, setScene] = useState("");
  const [outfit, setOutfit] = useState("");
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function loadModels() {
    const { data } = await supabase.from("ai_models").select("*");

    const cleanModels = (data || []).map((model) => ({
      id: String(model.id),
      name: String(model.name || ""),
      niche: String(model.niche || ""),
      personality: String(model.personality || ""),
      style: String(model.style || ""),
    }));

    setModels(cleanModels);

    if (cleanModels.length > 0) {
      setSelectedModelId(cleanModels[0].id);
    }
  }

  async function loadSavedImages() {
    const { data, error } = await supabase
      .from("generated_images")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setStatus("Error loading saved images: " + error.message);
      return;
    }

    setSavedImages(data || []);
  }

  function buildPrompt() {
    const model = models.find((item) => item.id === selectedModelId);

    if (!model) {
      return "No AI model selected.";
    }

    return `
Create an original AI-generated virtual influencer image.

Character name: ${model.name}
Niche: ${model.niche}
Personality: ${model.personality}
Style: ${model.style}

Scene: ${scene || "luxury modern background"}
Outfit: ${outfit || "premium influencer outfit"}

Make it realistic, premium, social-media ready, sharp, polished, and original.
Do not copy or impersonate a real person or celebrity.
`;
  }

  function createPrompt() {
    setPrompt(buildPrompt().trim());
  }

  async function generateAndSaveImage() {
    const model = models.find((item) => item.id === selectedModelId);
    const finalPrompt = (prompt || buildPrompt()).trim();

    if (!model) {
      setStatus("No AI model selected.");
      return;
    }

    setIsLoading(true);
    setStatus("Generating image...");
    setImageUrl("");

    try {
      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: finalPrompt,
        }),
      });

      const data = await response.json();

      if (data.error) {
        setStatus("Error: " + data.error);
        return;
      }

      const newImageUrl = data.imageUrl;
      setImageUrl(newImageUrl);

      const saveResponse = await supabase.from("generated_images").insert([
        {
          ai_model_name: model.name,
          prompt: finalPrompt,
          image_url: newImageUrl,
        },
      ]);

      if (saveResponse.error) {
        setStatus("Image generated, but save failed: " + saveResponse.error.message);
        return;
      }

      setStatus("Image generated and saved successfully.");
      await loadSavedImages();
    } catch {
      setStatus("Image generation failed.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadModels();
    loadSavedImages();
  }, []);

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <section className="mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold">Image Studio + Gallery</h1>

        <div className="mt-8 rounded-3xl border border-white/10 bg-zinc-900 p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <select
              value={selectedModelId}
              onChange={(e) => setSelectedModelId(e.target.value)}
              className="rounded-2xl bg-black px-4 py-3"
            >
              {models.map((model) => (
                <option key={model.id} value={model.id}>
                  {model.name} — {model.niche}
                </option>
              ))}
            </select>
          </div>

          <textarea
            value={scene}
            onChange={(e) => setScene(e.target.value)}
            className="mt-4 min-h-24 w-full rounded-2xl bg-black px-4 py-3"
            placeholder="Scene"
          />

          <textarea
            value={outfit}
            onChange={(e) => setOutfit(e.target.value)}
            className="mt-4 min-h-24 w-full rounded-2xl bg-black px-4 py-3"
            placeholder="Outfit"
          />

          <div className="mt-5 flex flex-wrap gap-3">
            <button onClick={createPrompt} className="rounded-2xl bg-zinc-700 px-6 py-3">
              Create Prompt
            </button>

            <button
              onClick={generateAndSaveImage}
              disabled={isLoading}
              className="rounded-2xl bg-blue-600 px-6 py-3 disabled:bg-zinc-700"
            >
              {isLoading ? "Generating..." : "Generate + Save Image"}
            </button>
          </div>

          {status && (
            <p className="mt-4 rounded-2xl bg-black p-4 text-sm text-zinc-300">
              {status}
            </p>
          )}
        </div>

        {imageUrl && (
          <div className="mt-8 rounded-3xl bg-zinc-900 p-6">
            <h2 className="text-2xl font-bold">Newest Image</h2>
            <img src={imageUrl} alt="Newest generated avatar" className="mt-5 rounded-2xl" />
          </div>
        )}

        <div className="mt-8 rounded-3xl bg-zinc-900 p-6">
          <h2 className="text-2xl font-bold">Saved Image Gallery</h2>

          <div className="mt-5 grid gap-5 md:grid-cols-3">
            {savedImages.map((item) => (
              <div key={item.id} className="rounded-2xl bg-black p-4">
                <img src={item.image_url} alt={item.ai_model_name} className="rounded-xl" />
                <p className="mt-3 text-sm text-zinc-300">{item.ai_model_name}</p>
              </div>
            ))}
          </div>

          {savedImages.length === 0 && (
            <p className="mt-5 text-zinc-400">No saved images yet.</p>
          )}
        </div>
      </section>
    </main>
  );
}