"use client";

import { useEffect, useState } from "react";

const USER_EMAIL = "lou.delgado.pfs@gmail.com";

type Avatar = {
  id: string;
  avatar_name: string;
  image_url: string;
  character_notes: string;
};

export default function ImageStudio() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [avatars, setAvatars] = useState<Avatar[]>([]);
  const [selectedAvatar, setSelectedAvatar] = useState<Avatar | null>(null);

  async function loadAvatars() {
    const res = await fetch("/api/list-avatars");
    const data = await res.json();
    setAvatars(data.avatars || []);
  }

  useEffect(() => {
    loadAvatars();
  }, []);

  async function generateImage() {
    setLoading(true);
    setResult("");

    let finalPrompt = prompt;

    if (selectedAvatar) {
      finalPrompt = `
      ${prompt}
      Character: ${selectedAvatar.avatar_name}
      Details: ${selectedAvatar.character_notes}
      Use this face reference: ${selectedAvatar.image_url}
      `;
    }

    const res = await fetch("/api/generate-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: finalPrompt }),
    });

    const data = await res.json();
    const imageUrl = data.image || data.url || "";

    setResult(imageUrl || "No image returned");

    if (imageUrl) {
      await fetch("/api/save-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: USER_EMAIL,
          prompt: finalPrompt,
          image_url: imageUrl,
        }),
      });
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <section className="mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold">Image Studio</h1>

        {/* Avatar Selector */}
        <div className="mt-6">
          <h2 className="text-xl font-bold">Select Avatar</h2>

          <div className="mt-4 flex gap-4 overflow-x-auto">
            {avatars.map((avatar) => (
              <div
                key={avatar.id}
                onClick={() => setSelectedAvatar(avatar)}
                className={`cursor-pointer rounded-2xl border p-2 ${
                  selectedAvatar?.id === avatar.id
                    ? "border-blue-500"
                    : "border-white/10"
                }`}
              >
                <img
                  src={avatar.image_url}
                  className="h-20 w-20 rounded-xl object-cover"
                />
                <p className="mt-2 text-sm text-center">
                  {avatar.avatar_name}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Prompt */}
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="mt-6 w-full rounded-2xl bg-zinc-900 p-4 text-white"
          placeholder="Describe your image..."
        />

        <button
          onClick={generateImage}
          disabled={!prompt || loading}
          className="mt-4 rounded-xl bg-blue-600 px-6 py-3 font-bold hover:bg-blue-500"
        >
          {loading ? "Generating..." : "Generate Image"}
        </button>

        {result && (
          <div className="mt-6">
            <img src={result} className="rounded-2xl" />
          </div>
        )}
      </section>
    </main>
  );
}