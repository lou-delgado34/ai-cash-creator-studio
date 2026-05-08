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
  const [loading, setLoading] = useState(true);

  async function loadContent() {
    setLoading(true);
    const res = await fetch("/api/list-social-content");
    const data = await res.json();
    setItems(data.content || []);
    setLoading(false);
  }

  async function deleteItem(id: string) {
    await fetch("/api/delete-social-content", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    loadContent();
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

        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold">Content Library</h1>

          <button
            onClick={loadContent}
            className="rounded-xl bg-blue-600 px-4 py-2 font-bold hover:bg-blue-500"
          >
            Refresh
          </button>
        </div>

        {loading && <p className="mt-6 text-zinc-400">Loading...</p>}

        <div className="mt-8 grid gap-6">
          {items.map((item) => (
            <div key={item.id} className="rounded-3xl bg-zinc-900 p-6">

              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-lg font-bold">
                  {item.platform} · {item.language}
                </h2>

                <span className="rounded-xl bg-purple-600 px-3 py-1 text-sm font-bold">
                  {item.status}
                </span>
              </div>

              <p className="mt-3 text-sm text-zinc-400">
                {new Date(item.created_at).toLocaleString()}
              </p>

              <p className="mt-4 text-blue-400 text-sm">HOOK</p>
              <p>{item.hook}</p>

              <p className="mt-4 text-purple-400 text-sm">CAPTION</p>
              <p className="whitespace-pre-wrap">{item.caption}</p>

              <p className="mt-4 text-green-400 text-sm">SCRIPT</p>
              <p className="whitespace-pre-wrap">{item.script}</p>

              <p className="mt-4 text-orange-400 text-sm">CTA</p>
              <p>{item.call_to_action}</p>

              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  onClick={() => copyText(item)}
                  className="rounded-xl bg-zinc-700 px-4 py-2 font-bold hover:bg-zinc-600"
                >
                  Copy
                </button>

                <a
                  href="/talking-avatar"
                  className="rounded-xl bg-green-600 px-4 py-2 font-bold hover:bg-green-500"
                >
                  Use for Video
                </a>

                <button
                  onClick={() => deleteItem(item.id)}
                  className="rounded-xl bg-red-600 px-4 py-2 font-bold hover:bg-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {items.length === 0 && !loading && (
          <p className="mt-8 text-zinc-400">
            No content yet. Go to Social Planner or Bulk Content.
          </p>
        )}

      </section>
    </main>
  );
}