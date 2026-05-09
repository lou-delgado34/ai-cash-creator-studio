"use client";

import { useEffect, useState } from "react";

export default function ContentLibraryPage() {
  const [items, setItems] = useState<any[]>([]);
  const [message, setMessage] = useState("");

  async function loadContent() {
    const res = await fetch("/api/list-social-content");
    const data = await res.json();
    setItems(data.content || []);
  }

  useEffect(() => {
    loadContent();
  }, []);

  async function updateStatus(id: string, status: string) {
    await fetch("/api/update-content-status", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, status }),
    });

    setMessage(`Status updated to ${status}`);
    loadContent();
  }

  function getColor(status: string) {
    if (status === "draft") return "bg-yellow-600";
    if (status === "ready") return "bg-blue-600";
    if (status === "posted") return "bg-green-600";
    return "bg-zinc-700";
  }

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <section className="mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold">Content Queue</h1>

        {message && <p className="mt-4 text-yellow-400">{message}</p>}

        <div className="mt-8 space-y-6">
          {items.map((item) => (
            <div key={item.id} className="rounded-3xl bg-zinc-900 p-6">
              <div className="flex justify-between items-center">
                <p className="text-sm text-zinc-400">
                  {item.platform} · {item.language}
                </p>

                <span
                  className={`px-3 py-1 rounded-xl text-sm font-bold ${getColor(
                    item.status
                  )}`}
                >
                  {item.status}
                </span>
              </div>

              <p className="mt-4 whitespace-pre-wrap">
                {item.script || item.caption}
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  onClick={() => updateStatus(item.id, "draft")}
                  className="bg-yellow-600 px-4 py-2 rounded-xl font-bold"
                >
                  Draft
                </button>

                <button
                  onClick={() => updateStatus(item.id, "ready")}
                  className="bg-blue-600 px-4 py-2 rounded-xl font-bold"
                >
                  Ready
                </button>

                <button
                  onClick={() => updateStatus(item.id, "posted")}
                  className="bg-green-600 px-4 py-2 rounded-xl font-bold"
                >
                  Posted
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}