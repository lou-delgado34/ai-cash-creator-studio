"use client";

import { useEffect, useState } from "react";

type ContentItem = {
  id: string;
  platform: string;
  language: string;
  content_type: string;
  hook: string;
  caption: string;
  script: string;
  call_to_action: string;
  status: string;
  created_at: string;
};

export default function ContentLibraryPage() {
  const [items, setItems] = useState<ContentItem[]>([]);

  async function loadContent() {
    const res = await fetch("/api/list-social-content");
    const data = await res.json();
    setItems(data.content || []);
  }

  function copyText(item: ContentItem) {
    navigator.clipboard.writeText(`
HOOK:
${item.hook || ""}

CAPTION:
${item.caption || ""}

SCRIPT:
${item.script || ""}

CTA:
${item.call_to_action || ""}
`);
  }

  useEffect(() => {
    loadContent();
  }, []);

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <section className="mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold">Content Library</h1>
        <p className="mt-3 text-zinc-400">
          Saved posts, captions, recruiting scripts, and avatar video scripts.
        </p>

        <div className="mt-8 grid gap-6">
          {items.map((item) => (
            <div key={item.id} className="rounded-3xl bg-zinc-900 p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-xl font-bold">
                  {item.platform || "Social Post"} · {item.language || "English"}
                </h2>

                <span className="rounded-xl bg-blue-600 px-3 py-1 text-sm font-bold">
                  {item.status || "draft"}
                </span>
              </div>

              <p className="mt-4 text-sm text-blue-400">HOOK</p>
              <p>{item.hook}</p>

              <p className="mt-4 text-sm text-purple-400">CAPTION</p>
              <p className="whitespace-pre-wrap text-zinc-300">{item.caption}</p>

              <p className="mt-4 text-sm text-green-400">SCRIPT</p>
              <p className="whitespace-pre-wrap text-zinc-300">{item.script}</p>

              <p className="mt-4 text-sm text-orange-400">CTA</p>
              <p>{item.call_to_action}</p>

              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  onClick={() => copyText(item)}
                  className="rounded-xl bg-zinc-700 px-5 py-3 font-bold hover:bg-zinc-600"
                >
                  Copy
                </button>

                <a
                  href="/talking-avatar"
                  className="rounded-xl bg-green-600 px-5 py-3 font-bold hover:bg-green-500"
                >
                  Use for Talking Avatar
                </a>
              </div>
            </div>
          ))}
        </div>

        {items.length === 0 && (
          <p className="mt-8 rounded-2xl bg-zinc-900 p-6 text-zinc-400">
            No saved content yet. Go to Social Planner and save drafts.
          </p>
        )}
      </section>
    </main>
  );
}