"use client";

import { useState } from "react";

const USER_EMAIL = "lou.delgado.pfs@gmail.com";

export default function ImageStudio() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState("");
  const [avatarName, setAvatarName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function generateImage() {
    setLoading(true);
    setMessage("");
    setImage("");

    const res = await fetch("/api/generate-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();

    if (data.error) {
      setMessage(data.error);
      setLoading(false);
      return;
    }

    setImage(data.image);
    setMessage("Image created. Now name it and save as avatar.");
    setLoading(false);
  }

  async function saveAsAvatar() {
    if (!image) {
      setMessage("Generate an image first.");
      return;
    }

    if (!avatarName.trim()) {
      setMessage("Give your avatar a name.");
      return;
    }

    const res = await fetch("/api/save-generated-avatar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: USER_EMAIL,
        avatar_name: avatarName,
        image_url: image,
        character_notes: prompt,
      }),
    });

    const data = await res.json();

    if (data.success) {
      setMessage("Avatar saved. Go to Talking Avatar.");
    } else {
      setMessage(data.error || "Save failed.");
    }
  }

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <section className="mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold">Image Studio</h1>

        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="mt-8 min-h-32 w-full rounded-2xl bg-zinc-900 p-4 text-white"
          placeholder="Describe the avatar image..."
        />

        <button
          onClick={generateImage}
          disabled={loading || !prompt.trim()}
          className="mt-5 rounded-xl bg-blue-600 px-6 py-3 font-bold hover:bg-blue-500 disabled:opacity-50"
        >
          {loading ? "Generating..." : "Generate Image"}
        </button>

        {message && <p className="mt-4 text-yellow-400">{message}</p>}

        {image && (
          <div className="mt-8 rounded-3xl bg-zinc-900 p-5">
            <img src={image} alt="Generated avatar" className="max-w-md rounded-2xl" />

            <input
              value={avatarName}
              onChange={(e) => setAvatarName(e.target.value)}
              className="mt-5 w-full max-w-md rounded-xl bg-black p-4 text-white"
              placeholder="Avatar name"
            />

            <button
              onClick={saveAsAvatar}
              className="mt-4 rounded-xl bg-green-600 px-6 py-3 font-bold hover:bg-green-500"
            >
              Save as Avatar
            </button>
          </div>
        )}
      </section>
    </main>
  );
}