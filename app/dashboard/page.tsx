"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function DashboardPage() {
  const [aiModels, setAiModels] = useState(0);
  const [generatedContent, setGeneratedContent] = useState(0);
  const [generatedImages, setGeneratedImages] = useState(0);
  const [videoProjects, setVideoProjects] = useState(0);
  const [message, setMessage] = useState("");

  async function loadDashboardStats() {
    const aiModelsResult = await supabase
      .from("ai_models")
      .select("*", { count: "exact", head: true });

    const contentResult = await supabase
      .from("generated_content")
      .select("*", { count: "exact", head: true });

    const imagesResult = await supabase
      .from("generated_images")
      .select("*", { count: "exact", head: true });

    const videosResult = await supabase
      .from("video_projects")
      .select("*", { count: "exact", head: true });

    if (
      aiModelsResult.error ||
      contentResult.error ||
      imagesResult.error ||
      videosResult.error
    ) {
      setMessage("Some dashboard numbers could not load.");
      return;
    }

    setAiModels(aiModelsResult.count || 0);
    setGeneratedContent(contentResult.count || 0);
    setGeneratedImages(imagesResult.count || 0);
    setVideoProjects(videosResult.count || 0);
  }

  useEffect(() => {
    loadDashboardStats();
  }, []);

  const stats = [
    {
      title: "AI Models",
      value: aiModels,
      description: "Saved virtual influencer profiles",
    },
    {
      title: "Generated Content",
      value: generatedContent,
      description: "Saved captions, scripts, hooks, and prompts",
    },
    {
      title: "Generated Images",
      value: generatedImages,
      description: "Saved AI avatar images",
    },
    {
      title: "Video Projects",
      value: videoProjects,
      description: "Saved talking avatar workflows",
    },
  ];

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <section className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
          Production Dashboard
        </p>

        <h1 className="mt-3 text-4xl font-bold">
          AI Cash Creator Studio
        </h1>

        <p className="mt-3 max-w-2xl text-zinc-400">
          Track your full AI creator system: models, content, images, and video
          projects.
        </p>

        {message && (
          <p className="mt-6 rounded-2xl border border-white/10 bg-zinc-900 p-4 text-sm text-zinc-300">
            {message}
          </p>
        )}

        <div className="mt-8 rounded-3xl border border-green-500/30 bg-green-950/30 p-6">
          <h2 className="text-2xl font-bold text-green-300">
            Admin Unlimited Access
          </h2>

          <p className="mt-3 text-zinc-300">
            Your admin account keeps unlimited in-app access. External services
            like OpenAI, Supabase, HeyGen, or D-ID can still have their own
            usage limits.
          </p>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <div className="rounded-2xl bg-black/40 p-4">
              <p className="text-sm text-zinc-400">Credits</p>
              <p className="mt-1 text-2xl font-bold text-green-400">
                Unlimited
              </p>
            </div>

            <div className="rounded-2xl bg-black/40 p-4">
              <p className="text-sm text-zinc-400">Tools</p>
              <p className="mt-1 text-2xl font-bold">Unlocked</p>
            </div>

            <div className="rounded-2xl bg-black/40 p-4">
              <p className="text-sm text-zinc-400">Access</p>
              <p className="mt-1 text-2xl font-bold">Admin</p>
            </div>

            <div className="rounded-2xl bg-black/40 p-4">
              <p className="text-sm text-zinc-400">Status</p>
              <p className="mt-1 text-2xl font-bold">Active</p>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-white/10 bg-zinc-900 p-6"
            >
              <p className="text-sm text-zinc-400">{item.title}</p>
              <p className="mt-3 text-4xl font-bold">{item.value}</p>
              <p className="mt-3 text-sm text-zinc-500">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <a
            href="/ai-models"
            className="rounded-3xl border border-white/10 bg-zinc-900 p-6 hover:bg-zinc-800"
          >
            <h2 className="text-xl font-bold">Create AI Model</h2>
            <p className="mt-3 text-zinc-400">
              Build a new virtual influencer profile.
            </p>
          </a>

          <a
            href="/prompt-studio"
            className="rounded-3xl border border-white/10 bg-zinc-900 p-6 hover:bg-zinc-800"
          >
            <h2 className="text-xl font-bold">Generate Content</h2>
            <p className="mt-3 text-zinc-400">
              Create scripts, captions, hooks, and prompts.
            </p>
          </a>

          <a
            href="/image-studio"
            className="rounded-3xl border border-white/10 bg-zinc-900 p-6 hover:bg-zinc-800"
          >
            <h2 className="text-xl font-bold">Create Avatar Image</h2>
            <p className="mt-3 text-zinc-400">
              Generate and save AI avatar images.
            </p>
          </a>
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-3">
          <a
            href="/voice-studio"
            className="rounded-3xl border border-white/10 bg-zinc-900 p-6 hover:bg-zinc-800"
          >
            <h2 className="text-xl font-bold">Make It Talk</h2>
            <p className="mt-3 text-zinc-400">
              Use the browser voice version to test scripts.
            </p>
          </a>

          <a
            href="/video-generator"
            className="rounded-3xl border border-white/10 bg-zinc-900 p-6 hover:bg-zinc-800"
          >
            <h2 className="text-xl font-bold">Build Video Project</h2>
            <p className="mt-3 text-zinc-400">
              Prepare free workflow or paid API-ready video projects.
            </p>
          </a>

          <a
            href="/video-projects"
            className="rounded-3xl border border-white/10 bg-zinc-900 p-6 hover:bg-zinc-800"
          >
            <h2 className="text-xl font-bold">View Video Projects</h2>
            <p className="mt-3 text-zinc-400">
              See your saved video pipeline.
            </p>
          </a>
        </div>
      </section>
    </main>
  );
}