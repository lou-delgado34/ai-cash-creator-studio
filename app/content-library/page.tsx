"use client";

import { useEffect, useState } from "react";

export default function ContentLibraryPage() {
  const [items, setItems] = useState([]);
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

  function copyText(item: any) {
    navigator.clipboard.writeText(item.script || item.caption || "");
  }

  function useForVideo(item: any) {
    localStorage.setItem(
      "talking_avatar_script",
      item.script || item.caption || ""
    );
    window.location.href = "/talking-avatar";
  }

  useEffect(() => {
    loadContent();
  }, []);

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <section className="mx-auto max-w-6xl">

        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold">Content Library</h1>

          <button
            onClick={loadContent}
            className="bg-blue-600 px-4 py-2 rounded-xl font-bold"
          >
            Refresh
          </button>
        </div>

        {loading && <p className="mt-6 text-gray-400">Loading...</p>}

        <div className="mt-8 space-y-6">
          {items.map((item: any) => (
            <div key={item.id} className="bg-zinc-900 p-6 rounded-2xl">

              <p className="text-gray-400 text-sm">
                {item.platform} · {item.language}
              </p>

              <p className="mt-3 whitespace-pre-wrap">
                {item.script || item.caption}
              </p>

              <div className="mt-4 flex gap-3 flex-wrap">
                <button
                  onClick={() => copyText(item)}
                  className="bg-zinc-700 px-4 py-2 rounded-xl"
                >
                  Copy
                </button>

                <button
                  onClick={() => useForVideo(item)}
                  className="bg-green-600 px-4 py-2 rounded-xl"
                >
                  Use for Video
                </button>

                <button
                  onClick={() => deleteItem(item.id)}
                  className="bg-red-600 px-4 py-2 rounded-xl"
                >
                  Delete
                </button>
              </div>

            </div>
          ))}
        </div>

      </section>
    </main>
  );
}