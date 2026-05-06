"use client";

import { useEffect, useState } from "react";

const USER_EMAIL = "lou.delgado.pfs@gmail.com";

type Avatar = {
  id: string;
  avatar_name: string;
  image_url: string;
  character_notes: string;
};

export default function AvatarBuilderPage() {
  const [avatarName, setAvatarName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [notes, setNotes] = useState("");
  const [message, setMessage] = useState("");
  const [avatars, setAvatars] = useState<Avatar[]>([]);

  async function loadAvatars() {
    const res = await fetch("/api/list-avatars");
    const data = await res.json();
    setAvatars(data.avatars || []);
  }

  async function saveAvatar() {
    setMessage("Saving...");

    const res = await fetch("/api/save-avatar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
      loadAvatars();
    } else {
      setMessage(data.error || "Save failed.");
    }
  }

  async function deleteAvatar(id: string) {
    setMessage("Deleting...");

    const res = await fetch("/api/delete-avatar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    const data = await res.json();

    if (data.success) {
      setMessage("Avatar deleted.");
      loadAvatars();
    } else {
      setMessage(data.error || "Delete failed.");
    }
  }

  useEffect(() => {
    loadAvatars();
  }, []);

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <section className="mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold">AI Avatar Builder</h1>

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
            placeholder="Character notes..."
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

        <h2 className="mt-10 text-3xl font-bold">Saved Avatars</h2>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {avatars.map((avatar) => (
            <div key={avatar.id} className="rounded-3xl bg-zinc-900 p-4">
              <img
                src={avatar.image_url}
                alt={avatar.avatar_name}
                className="rounded-2xl"
              />

              <h3 className="mt-3 text-xl font-bold">{avatar.avatar_name}</h3>

              <p className="mt-2 text-sm text-zinc-400">
                {avatar.character_notes}
              </p>

              <button
                onClick={() => deleteAvatar(avatar.id)}
                className="mt-4 w-full rounded-xl bg-red-600 px-4 py-3 text-sm font-bold hover:bg-red-500"
              >
                Delete Avatar
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}