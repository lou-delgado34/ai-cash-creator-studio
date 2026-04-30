"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

type SavedContent = {
  id: string;
  ai_model_name: string;
  content_type: string;
  topic: string;
  result: string;
  created_at: string;
};

export default function HistoryPage() {
  const [items, setItems] = useState<SavedContent[]>([]);
  const [message, setMessage] = useState("");

  async function loadHistory() {
    const { data, error } = await supabase
      .from("generated_content")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setMessage("Error loading history: " + error.message);
      return;
    }

    setItems(data || []);
  }

  function copyText(text: string) {
    navigator.clipboard.writeText(text);
  }

  useEffect(() => {
    loadHistory();
  }, []);

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <section className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
          Content History
        </p>

        <h1 className="mt-3 text-4xl font-bold">Saved AI Content</h1>

        <p className="mt-3 max-w-2xl text-zinc-400">
          View your saved AI scripts, captions, hooks, prompts, and offer ideas.
        </p>

        {message && (
          <p className="mt-6 rounded-2xl border border-white/10 bg-zinc-900 p-4 text-sm text-zinc-300">
            {message}
          </p>
        )}

        <div className="mt-8 grid gap-5">
          {items.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl border border-white/10 bg-zinc-900 p-6"
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-bold">
                    {item.ai_model_name || "AI Model"}
                  </h2>

                  <p className="mt-2 text-sm text-blue-400">
                    {item.content_type}
                  </p>

                  <p className="mt-2 text-sm text-zinc-400">
                    Topic: {item.topic || "No topic"}
                  </p>
                </div>

                <button
                  onClick={() => copyText(item.result)}
                  className="rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm hover:bg-white/15"
                >
                  Copy
                </button>
              </div>

              <pre className="mt-5 max-h-80 overflow-auto whitespace-pre-wrap rounded-2xl bg-black p-5 text-sm text-zinc-300">
                {item.result}
              </pre>
            </div>
          ))}
        </div>

        {items.length === 0 && !message && (
          <p className="mt-8 rounded-2xl border border-white/10 bg-zinc-900 p-6 text-zinc-400">
            No saved content yet. Go to Prompt Studio and generate content first.
          </p>
        )}
      </section>
    </main>
  );
}