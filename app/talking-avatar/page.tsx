"use client";

import { useEffect, useState } from "react";

type Avatar = {
  id: string;
  avatar_name: string;
  image_url: string;
  character_notes: string;
};

export default function TalkingAvatarPage() {
  const [avatars, setAvatars] = useState<Avatar[]>([]);
  const [selectedAvatar, setSelectedAvatar] = useState<Avatar | null>(null);
  const [script, setScript] = useState("");
  const [videoPrompt, setVideoPrompt] = useState("");

  async function loadAvatars() {
    const res = await fetch("/api/list-avatars");
    const data = await res.json();
    setAvatars(data.avatars || []);
  }

  useEffect(() => {
    loadAvatars();
  }, []);

  function buildVideoPrompt() {
    if (!selectedAvatar) {
      setVideoPrompt("Select an avatar first.");
      return;
    }

    const finalPrompt = `
TALKING AVATAR VIDEO REQUEST

Avatar Name:
${selectedAvatar.avatar_name}

Avatar Image:
${selectedAvatar.image_url}

Character Notes:
${selectedAvatar.character_notes}

Script:
${script || "Write the script this avatar should say."}

Video Style:
Vertical 9:16 social media video.
Natural face movement.
Clear mouth movement.
Confident eye contact.
Premium creator/influencer style.

Use this for HeyGen, D-ID, CapCut, or future API video generation.
`;

    setVideoPrompt(finalPrompt.trim());
  }

  function copyPrompt() {
    navigator.clipboard.writeText(videoPrompt);
  }

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <section className="mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold">Talking Avatar Studio</h1>

        <p className="mt-3 text-zinc-400">
          Pick a saved avatar, paste a script, and create a talking video prompt.
        </p>

        <div className="mt-8 rounded-3xl border border-white/10 bg-zinc-900 p-6">
          <h2 className="text-2xl font-bold">Select Avatar</h2>

          <div className="mt-4 flex gap-4 overflow-x-auto">
            {avatars.map((avatar) => (
              <div
                key={avatar.id}
                onClick={() => setSelectedAvatar(avatar)}
                className={`min-w-36 cursor-pointer rounded-2xl border p-3 ${
                  selectedAvatar?.id === avatar.id
                    ? "border-blue-500 bg-blue-500/10"
                    : "border-white/10 bg-black"
                }`}
              >
                <img
                  src={avatar.image_url}
                  alt={avatar.avatar_name}
                  className="h-28 w-full rounded-xl object-cover"
                />
                <p className="mt-2 text-center text-sm font-bold">
                  {avatar.avatar_name}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-white/10 bg-zinc-900 p-6">
          <h2 className="text-2xl font-bold">Script</h2>

          <textarea
            value={script}
            onChange={(e) => setScript(e.target.value)}
            className="mt-4 min-h-40 w-full rounded-2xl bg-black p-4 text-white"
            placeholder="Paste what your avatar should say..."
          />

          <button
            onClick={buildVideoPrompt}
            className="mt-5 rounded-2xl bg-blue-600 px-6 py-4 font-bold hover:bg-blue-500"
          >
            Build Talking Video Prompt
          </button>
        </div>

        {videoPrompt && (
          <div className="mt-8 rounded-3xl border border-white/10 bg-zinc-900 p-6">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-2xl font-bold">Video Prompt</h2>

              <button
                onClick={copyPrompt}
                className="rounded-xl bg-zinc-800 px-4 py-3 text-sm font-bold hover:bg-zinc-700"
              >
                Copy
              </button>
            </div>

            <pre className="mt-5 whitespace-pre-wrap rounded-2xl bg-black p-5 text-sm text-zinc-300">
              {videoPrompt}
            </pre>
          </div>
        )}
      </section>
    </main>
  );
}