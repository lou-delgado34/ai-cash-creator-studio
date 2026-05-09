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

  function copyScript(item: any) {
    navigator.clipboard.writeText(item.script || item.caption || "");
    setMessage("Script copied.");
  }

  function sendToTalkingAvatar(item: any) {
    localStorage.setItem("talking_avatar_script", item.script || item.caption || "");
    window.location.href = "/talking-avatar";
  }

  async function deleteItem(id: string) {
    await fetch("/api/delete-social-content", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    setMessage("Deleted.");
    loadContent();
  }

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <section className="mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold">Content Library</h1>

        <p className="mt-3 text-zinc-400">
          Saved scripts only. This page does not use D-ID video credits.
        </p>

        {message && <p className="mt-5 text-yellow-400">{message}</p>}

        <div className="mt-8 space-y-6">
          {items.map((item) => (
            <div key={item.id} className="rounded-3xl bg-zinc-900 p-6">
              <p className="text-sm text-zinc-400">
                {item.platform} · {item.language} · {item.status || "draft"}
              </p>

              <div className="mt-4 whitespace-pre-wrap rounded-2xl bg-black p-5">
                {item.script || item.caption}
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  onClick={() => copyScript(item)}
                  className="rounded-xl bg-zinc-700 px-5 py-3 font-bold"
                >
                  Copy Script
                </button>

                <button
                  onClick={() => sendToTalkingAvatar(item)}
                  className="rounded-xl bg-blue-600 px-5 py-3 font-bold"
                >
                  Send to Talking Avatar
                </button>

                <button
                  onClick={() => deleteItem(item.id)}
                  className="rounded-xl bg-red-600 px-5 py-3 font-bold"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {items.length === 0 && (
          <p className="mt-8 rounded-2xl bg-zinc-900 p-6 text-zinc-400">
            No scripts saved yet.
          </p>
        )}
      </section>
    </main>
  );
}