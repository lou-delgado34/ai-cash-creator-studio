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
      setMessage(data.error || "Video failed. D-ID credits may be needed.");
      setLoadingId("");
      return;
    }

    localStorage.setItem("latest_talk_id", data.id);
    localStorage.setItem("latest_talk_script", script);
    localStorage.setItem("latest_avatar_name", selectedAvatar.avatar_name);
    localStorage.setItem("latest_avatar_image", selectedAvatar.image_url);

    await updateStatus(item.id, "ready");

    setMessage("Video started. Open Talking Avatar and click Check Video after 30 seconds.");
    setLoadingId("");
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

        <div className="mt-6 rounded-3xl bg-zinc-900 p-5">
          <h2 className="text-2xl font-bold">Select Avatar for Videos</h2>

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
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm text-zinc-400">
                  {item.platform} · {item.language}
                </p>

                <span
                  className={`rounded-xl px-3 py-1 text-sm font-bold ${getColor(
                    item.status
                  )}`}
                >
                  {item.status || "draft"}
                </span>
              </div>

              <p className="mt-4 whitespace-pre-wrap">
                {item.script || item.caption}
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  onClick={() => updateStatus(item.id, "draft")}
                  className="rounded-xl bg-yellow-600 px-4 py-2 font-bold"
                >
                  Draft
                </button>

                <button
                  onClick={() => updateStatus(item.id, "ready")}
                  className="rounded-xl bg-blue-600 px-4 py-2 font-bold"
                >
                  Ready
                </button>

                <button
                  onClick={() => createVideo(item)}
                  disabled={loadingId === item.id}
                  className="rounded-xl bg-purple-600 px-4 py-2 font-bold disabled:opacity-50"
                >
                  {loadingId === item.id ? "Creating..." : "Create Video"}
                </button>

                <button
                  onClick={() => updateStatus(item.id, "posted")}
                  className="rounded-xl bg-green-600 px-4 py-2 font-bold"
                >
                  Posted
                </button>

                <a
                  href="/talking-avatar"
                  className="rounded-xl bg-zinc-700 px-4 py-2 font-bold"
                >
                  Check Video
                </a>
              </div>
            </div>
          ))}
        </div>

        {items.length === 0 && (
          <p className="mt-8 rounded-2xl bg-zinc-900 p-6 text-zinc-400">
            No content yet. Go to Social Planner or Bulk Content.
          </p>
        )}
      </section>
    </main>
  );
}