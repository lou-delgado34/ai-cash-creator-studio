"use client";

import { useState } from "react";

const USER_EMAIL = "lou.delgado.pfs@gmail.com";

export default function AvatarBuilderPage() {
  const [avatarName, setAvatarName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [notes, setNotes] = useState("");
  const [message, setMessage] = useState("");

  async function saveAvatar() {
    setMessage("Saving...");

    const res = await fetch("/api/save-avatar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: USER_EMAIL,
        avatar_name: avatarName,
        image_url: imageUrl,
        character_notes: notes,
      }),
    });

    const data = await res.json();

    if (data.success) {
      setMessage("Avatar saved.");
      setAvatarName("");
      setImageUrl("");
      setNotes("");
    } else {
      setMessage(data.error || "Save failed.");
    }
  }

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <section className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold">AI Avatar Builder</h1>
        <p className="mt-3 text-zinc-400">
          Save your reusable AI person here.
        </p>

        <div className="mt-8 rounded-3xl border border-white/10 bg-zinc-900 p-6">
          <input
            value={avatarName}
            onChange={(e) => setAvatarName(e.target.value)}
            className="w-full rounded-2xl bg-black p-4 text-white"
            placeholder="Avatar name"
          />

          <input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="mt-4 w-full rounded-2xl bg-black p-4 text-white"
            placeholder="Face image URL"
          />

          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="mt-4 min-h-40 w-full rounded-2xl bg-black p-4 text-white"
            placeholder="Character notes: personality, age range, style, voice, brand..."
          />

          <button
            onClick={saveAvatar}
            disabled={!avatarName || !imageUrl}
            className="mt-5 rounded-2xl bg-blue-600 px-6 py-4 font-bold hover:bg-blue-500 disabled:opacity-50"
          >
            Save Avatar
          </button>

          {message && <p className="mt-4 text-yellow-400">{message}</p>}
        </div>
      </section>
    </main>
  );
}