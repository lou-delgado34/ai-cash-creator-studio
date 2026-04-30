"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

type AIModel = {
  id: string;
  name: string;
  age_range: string;
  niche: string;
  platform: string;
  personality: string;
  style: string;
  backstory: string;
  brand_notes: string;
};

export default function AIModelsPage() {
  const [models, setModels] = useState<AIModel[]>([]);
  const [name, setName] = useState("");
  const [ageRange, setAgeRange] = useState("");
  const [niche, setNiche] = useState("");
  const [platform, setPlatform] = useState("");
  const [personality, setPersonality] = useState("");
  const [style, setStyle] = useState("");
  const [backstory, setBackstory] = useState("");
  const [brandNotes, setBrandNotes] = useState("");
  const [message, setMessage] = useState("");

  async function loadModels() {
    const { data, error } = await supabase
      .from("ai_models")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      setMessage("Error loading models: " + error.message);
      return;
    }

    setModels(data || []);
  }

  async function saveModel() {
    setMessage("Saving...");

    const { error } = await supabase.from("ai_models").insert({
      name,
      age_range: ageRange,
      niche,
      platform,
      personality,
      style,
      backstory,
      brand_notes: brandNotes,
    });

    if (error) {
      setMessage("Error saving model: " + error.message);
      return;
    }

    setMessage("AI Model saved successfully!");

    setName("");
    setAgeRange("");
    setNiche("");
    setPlatform("");
    setPersonality("");
    setStyle("");
    setBackstory("");
    setBrandNotes("");

    loadModels();
  }

  useEffect(() => {
    loadModels();
  }, []);

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <section className="mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold">AI Models</h1>

        <p className="mt-3 max-w-2xl text-zinc-400">
          Create and view your saved AI virtual influencer profiles.
        </p>

        <div className="mt-8 rounded-3xl border border-white/10 bg-zinc-900 p-6">
          <h2 className="text-2xl font-bold">Create New AI Model</h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <input value={name} onChange={(e) => setName(e.target.value)} className="rounded-2xl bg-black px-4 py-3" placeholder="Model Name" />
            <input value={ageRange} onChange={(e) => setAgeRange(e.target.value)} className="rounded-2xl bg-black px-4 py-3" placeholder="Age Range" />
            <input value={niche} onChange={(e) => setNiche(e.target.value)} className="rounded-2xl bg-black px-4 py-3" placeholder="Niche" />
            <input value={platform} onChange={(e) => setPlatform(e.target.value)} className="rounded-2xl bg-black px-4 py-3" placeholder="Platform" />
            <input value={personality} onChange={(e) => setPersonality(e.target.value)} className="rounded-2xl bg-black px-4 py-3" placeholder="Personality" />
            <input value={style} onChange={(e) => setStyle(e.target.value)} className="rounded-2xl bg-black px-4 py-3" placeholder="Style" />
          </div>

          <textarea value={backstory} onChange={(e) => setBackstory(e.target.value)} className="mt-4 min-h-32 w-full rounded-2xl bg-black px-4 py-3" placeholder="Backstory" />

          <textarea value={brandNotes} onChange={(e) => setBrandNotes(e.target.value)} className="mt-4 min-h-24 w-full rounded-2xl bg-black px-4 py-3" placeholder="Brand Safety Notes" />

          <button onClick={saveModel} className="mt-5 rounded-2xl bg-blue-600 px-6 py-3 font-semibold">
            Save AI Model
          </button>

          {message && (
            <p className="mt-4 rounded-2xl bg-black p-4 text-sm text-zinc-300">
              {message}
            </p>
          )}
        </div>

        <h2 className="mt-10 text-2xl font-bold">Saved AI Models</h2>

        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {models.map((model) => (
            <div key={model.id} className="rounded-3xl border border-white/10 bg-zinc-900 p-6">
              <h3 className="text-2xl font-bold">{model.name}</h3>
              <p className="mt-2 text-blue-400">{model.niche}</p>
              <p className="mt-3 text-sm text-zinc-400">Age: {model.age_range}</p>
              <p className="mt-2 text-sm text-zinc-400">Platform: {model.platform}</p>
              <p className="mt-2 text-sm text-zinc-400">Personality: {model.personality}</p>
              <p className="mt-2 text-sm text-zinc-400">Style: {model.style}</p>
              <p className="mt-4 text-sm text-zinc-300">{model.backstory}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}