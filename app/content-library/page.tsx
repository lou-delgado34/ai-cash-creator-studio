"use client";

import { useEffect, useState } from "react";

function splitIntoPosts(text: string) {
  if (!text) return [];

  const parts = text
    .split(/### Post \d+|## Post \d+|Post \d+|### Publicación \d+|Publicación \d+/i)
    .map((p) => p.trim())
    .filter(Boolean);

  if (parts.length === 0) return [text];

  return parts;
}

function cleanForVideo(text: string) {
  let clean = text || "";

  const scriptMatch =
    clean.match(/SCRIPT:\s*([\s\S]*?)(CTA:|CALL TO ACTION:|CAPTION:|HOOK:|$)/i) ||
    clean.match(/GUION:\s*([\s\S]*?)(CTA:|LLAMADO A LA ACCIÓN:|CAPTION:|HOOK:|$)/i) ||
    clean.match(/GUIÓN:\s*([\s\S]*?)(CTA:|LLAMADO A LA ACCIÓN:|CAPTION:|HOOK:|$)/i);

  if (scriptMatch?.[1]) {
    clean = scriptMatch[1];
  }

  clean = clean
    .replace(/\*\*/g, "")
    .replace(/###/g, "")
    .replace(/HOOK:/gi, "")
    .replace(/CAPTION:/gi, "")
    .replace(/SCRIPT:/gi, "")
    .replace(/CTA:/gi, "")
    .replace(/CALL TO ACTION:/gi, "")
    .replace(/GUION:/gi, "")
    .replace(/GUIÓN:/gi, "")
    .replace(/LLAMADO A LA ACCIÓN:/gi, "")
    .replace(/["“”]/g, "")
    .trim();

  return clean.slice(0, 450);
}

export default function ContentLibraryPage() {
  const [items, setItems] = useState<any[]>([]);
  const [avatars, setAvatars] = useState<any[]>([]);
  const [selectedAvatar, setSelectedAvatar] = useState<any>(null);
  const [selectedScripts, setSelectedScripts] = useState<Record<string, string>>({});
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

  function copyScript(script: string) {
    navigator.clipboard.writeText(cleanForVideo(script));
    setMessage("Selected script copied.");
  }

  async function createVideo(item: any) {
    if (!selectedAvatar) {
      setMessage("Select an avatar first.");
      return;
    }

    const selectedScript =
      selectedScripts[item.id] || splitIntoPosts(item.script || item.caption || "")[0];

    const finalScript = cleanForVideo(selectedScript);

    if (!finalScript) {
      setMessage("Select a script first.");
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
        script: finalScript,
      }),
    });

    const data = await res.json();

    if (!data.id) {
      setMessage(JSON.stringify(data, null, 2));
      setLoadingId("");
      return;
    }

    localStorage.setItem("latest_talk_id", data.id);
    localStorage.setItem("latest_talk_script", finalScript);
    localStorage.setItem("latest_avatar_name", selectedAvatar.avatar_name);
    localStorage.setItem("latest_avatar_image", selectedAvatar.image_url);

    setMessage("Video started. Go to Talking Avatar and click Check Video after 30 seconds.");
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

        {message && (
          <pre className="mt-5 whitespace-pre-wrap rounded-2xl bg-red-950/40 p-4 text-yellow-300">
            {message}
          </pre>
        )}

        <div className="mt-8 space-y-6">
          {items.map((item) => {
            const posts = splitIntoPosts(item.script || item.caption || "");
            const selected = selectedScripts[item.id] || posts[0] || "";

            return (
              <div key={item.id} className="rounded-3xl bg-zinc-900 p-6">
                <p className="text-sm text-zinc-400">
                  {item.platform} · {item.language}
                </p>

                <h2 className="mt-4 text-xl font-bold">Choose which script to use</h2>

                <select
                  value={selected}
                  onChange={(e) =>
                    setSelectedScripts({
                      ...selectedScripts,
                      [item.id]: e.target.value,
                    })
                  }
                  className="mt-4 w-full rounded-xl bg-black p-4 text-white"
                >
                  {posts.map((post, index) => (
                    <option key={index} value={post}>
                      Script {index + 1}
                    </option>
                  ))}
                </select>

                <div className="mt-5 rounded-2xl bg-black p-5">
                  <p className="text-sm text-blue-400">SELECTED SCRIPT PREVIEW</p>
                  <p className="mt-3 whitespace-pre-wrap">{cleanForVideo(selected)}</p>
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  <button
                    onClick={() => copyScript(selected)}
                    className="rounded-xl bg-zinc-700 px-4 py-2 font-bold"
                  >
                    Copy Selected Script
                  </button>

                  <button
                    onClick={() => createVideo(item)}
                    disabled={loadingId === item.id}
                    className="rounded-xl bg-blue-600 px-4 py-2 font-bold disabled:opacity-50"
                  >
                    {loadingId === item.id ? "Creating..." : "Create Video from Selected Script"}
                  </button>

                  <a href="/talking-avatar" className="rounded-xl bg-green-600 px-4 py-2 font-bold">
                    Open Talking Avatar
                  </a>

                  <a href="/talking-history" className="rounded-xl bg-purple-600 px-4 py-2 font-bold">
                    Video History
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}