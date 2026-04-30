"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

type VideoProject = {
  id: string;
  ai_model_name: string;
  image_url: string;
  script: string;
  video_style: string;
  platform: string;
  workflow_result: string;
  status: string;
  created_at: string;
};

export default function VideoProjectsPage() {
  const [projects, setProjects] = useState<VideoProject[]>([]);
  const [message, setMessage] = useState("");

  async function loadProjects() {
    const { data, error } = await supabase
      .from("video_projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setMessage("Error loading video projects: " + error.message);
      return;
    }

    setProjects(data || []);
  }

  function copyText(text: string) {
    navigator.clipboard.writeText(text);
  }

  useEffect(() => {
    loadProjects();
  }, []);

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <section className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
          Video Projects
        </p>

        <h1 className="mt-3 text-4xl font-bold">
          Saved Talking Avatar Projects
        </h1>

        <p className="mt-3 max-w-2xl text-zinc-400">
          View your saved video workflows, scripts, avatar images, and platform plans.
        </p>

        {message && (
          <p className="mt-6 rounded-2xl border border-white/10 bg-zinc-900 p-4 text-sm text-zinc-300">
            {message}
          </p>
        )}

        <div className="mt-8 grid gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="grid gap-6 rounded-3xl border border-white/10 bg-zinc-900 p-6 lg:grid-cols-[260px_1fr]"
            >
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-black">
                {project.image_url ? (
                  <img
                    src={project.image_url}
                    alt={project.ai_model_name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex min-h-64 items-center justify-center p-6 text-center text-zinc-500">
                    No image saved
                  </div>
                )}
              </div>

              <div>
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">
                      {project.ai_model_name || "AI Model"}
                    </h2>

                    <p className="mt-2 text-sm text-blue-400">
                      {project.video_style} • {project.platform}
                    </p>

                    <p className="mt-2 text-sm text-zinc-400">
                      Status: {project.status || "draft"}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => copyText(project.script || "")}
                      className="rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm hover:bg-white/15"
                    >
                      Copy Script
                    </button>

                    <button
                      onClick={() => copyText(project.workflow_result || "")}
                      className="rounded-xl border border-white/10 bg-blue-600 px-4 py-2 text-sm hover:bg-blue-500"
                    >
                      Copy Workflow
                    </button>
                  </div>
                </div>

                <div className="mt-5 rounded-2xl bg-black p-4">
                  <p className="text-sm font-semibold text-zinc-300">
                    Script
                  </p>

                  <p className="mt-3 whitespace-pre-wrap text-sm text-zinc-400">
                    {project.script || "No script saved."}
                  </p>
                </div>

                <div className="mt-4 rounded-2xl bg-black p-4">
                  <p className="text-sm font-semibold text-zinc-300">
                    Workflow
                  </p>

                  <pre className="mt-3 max-h-72 overflow-auto whitespace-pre-wrap text-sm text-zinc-400">
                    {project.workflow_result || "No workflow saved."}
                  </pre>
                </div>
              </div>
            </div>
          ))}
        </div>

        {projects.length === 0 && !message && (
          <p className="mt-8 rounded-2xl border border-white/10 bg-zinc-900 p-6 text-zinc-400">
            No video projects saved yet. Go to Video Generator and save one.
          </p>
        )}
      </section>
    </main>
  );
}