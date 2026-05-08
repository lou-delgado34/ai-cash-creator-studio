"use client";

import { useEffect, useState } from "react";

export default function ContentLibraryPage() {
  const [items, setItems] = useState<any[]>([]);
  const [avatars, setAvatars] = useState<any[]>([]);
  const [selectedAvatar, setSelectedAvatar] = useState<any>(null);
  const [message, setMessage] = useState("");
  const [loadingId, setLoadingId] = useState("");

  async function loadContent() {
    const res = await fetch("/api/list-social-content");
    const data = await res.json();
    setItems(data.content || []);
  }

  async function loadAvatars() {
    const res = await fetch("/api/list-avatars");
    const data = await res.json();
    setAvatars(data.avatars || []);
  }

  useEffect(() => {
    loadContent();
    loadAvatars();
  }, []);

  function copyText(item: any) {
    navigator.clipboard.writeText(item.script || item.caption || "");
    setMessage("Copied.");
  }

  async function createVideo(item: any) {
    if (!selectedAvatar) {
      setMessage("Select an avatar first.");
      return;
    }

    const script = item.script || item.caption || "";

    if (!script) {
      setMessage("This content has no script.");
      return;
    }

    setLoadingId(item.id);
    setMessage("Creating video...");

    const res = await fetch("/api/create-talk", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image_url: selectedAvatar.image_url,
        script,
      }),
    });

    const data = await res.json();

    if (!data.id) {
      setMessage(data.error || "Video creation failed.");
      setLoadingId("");
      return;
    }

    setMessage(
      "Video started. Go to Talking Avatar or Video History after 30 seconds."
    );

    localStorage.setItem("latest_talk_id", data.id);
    localStorage.setItem("latest_talk_script", script);
    localStorage.setItem("latest_avatar_name", selectedAvatar.avatar_name);
    localStorage.setItem("latest_avatar_image", selectedAvatar.image_url);

    setLoadingId("");
  }

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <section className="mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold">Content Library</h1>

        <div className="mt-6 rounded-3xl bg-zinc-900 p-5">
          <h2 className="text-2xl font-bold">Select Avatar for Video</h2>

          <div className="mt-4 flex gap-4 overflow-x-auto">
            {avatars.map((avatar) => (
              <div
                key={avatar.id}
                onClick={() => setSelectedAvatar(avatar)}
                className={`min-w-36 cursor-pointer rounded-2xl border p-3 ${
                  selectedAvatar?.id === avatar.id
                    ? "border-blue-500 bg-blue-600/20"
                    : "border-white/10 bg-black"
                }`}
              >
                <img
                  src={avatar.image_url}
                  className="h-28 w-full rounded-xl object-cover"
                />
                <p className="mt-2 text-center text-sm font-bold">
                  {avatar.avatar_name}
                </p>
              </div>
            ))}
          </div>
        </div>

        {message && <p className="mt-5 text-yellow-400">{message}</p>}

        <div className="mt-8 space-y-6">
          {items.map((item) => (
            <div key={item.id} className="rounded-3xl bg-zinc-900 p-6">
              <p className="text-sm text-zinc-400">
                {item.platform} · {item.language}
              </p>

              <p className="mt-4 whitespace-pre-wrap">
                {item.script || item.caption}
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  onClick={() => copyText(item)}
                  className="rounded-xl bg-zinc-700 px-4 py-2 font-bold hover:bg-zinc-600"
                >
                  Copy
                </button>

                <button
                  onClick={() => createVideo(item)}
                  disabled={loadingId === item.id}
                  className="rounded-xl bg-blue-600 px-4 py-2 font-bold hover:bg-blue-500 disabled:opacity-50"
                >
                  {loadingId === item.id ? "Creating..." : "Create Video"}
                </button>

                <a
                  href="/talking-avatar"
                  className="rounded-xl bg-green-600 px-4 py-2 font-bold hover:bg-green-500"
                >
                  Open Talking Avatar
                </a>

                <a
                  href="/talking-history"
                  className="rounded-xl bg-purple-600 px-4 py-2 font-bold hover:bg-purple-500"
                >
                  Video History
                </a>
              </div>
            </div>
          ))}
        </div>

        {items.length === 0 && (
          <p className="mt-8 rounded-2xl bg-zinc-900 p-6 text-zinc-400">
            No saved content yet.
          </p>
        )}
      </section>
    </main>
  );
}