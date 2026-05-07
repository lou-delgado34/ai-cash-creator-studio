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
  const [message, setMessage] = useState("");
  const [talkId, setTalkId] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setLoading] = useState(false);

  async function loadAvatars() {
    const res = await fetch("/api/list-avatars");
    const data = await res.json();
    setAvatars(data.avatars || []);
  }

  useEffect(() => {
    loadAvatars();
  }, []);

  async function createTalkingVideo() {
    if (!selectedAvatar) {
      setMessage("Select an avatar first.");
      return;
    }

    if (!script.trim()) {
      setMessage("Write a script first.");
      return;
    }

    setLoading(true);
    setMessage("Creating realistic voice and talking video...");
    setVideoUrl("");
    setTalkId("");

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

    if (data.error || !data.id) {
      setMessage(data.error || "Talking video failed.");
      setLoading(false);
      return;
    }

    setTalkId(data.id);
    setMessage("Video started. Wait 20 seconds, then click Check Video.");
    setLoading(false);
  }

  async function checkVideo() {
    if (!talkId) {
      setMessage("Generate a video first.");
      return;
    }

    setMessage("Checking video...");

    const res = await fetch("/api/get-talk", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ talkId }),
    });

    const data = await res.json();

    if (data.status === "done" && data.result_url) {
      setVideoUrl(data.result_url);
      setMessage("Video ready and saved.");

      await fetch("/api/save-talking-video", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "lou.delgado.pfs@gmail.com",
          avatar_name: selectedAvatar?.avatar_name,
          avatar_image_url: selectedAvatar?.image_url,
          script,
          talk_id: talkId,
          video_url: data.result_url,
          status: "completed",
        }),
      });

      return;
    }

    setMessage(`Video status: ${data.status || "not ready yet"}. Wait and click Check Video again.`);
  }

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <section className="mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold">Talking Avatar Studio</h1>

        <div className="mt-8 rounded-3xl border border-white/10 bg-zinc-900 p-6">
          <h2 className="text-2xl font-bold">Select Avatar</h2>

          <div className="mt-4 flex gap-4 overflow-x-auto">
            {avatars.map((avatar) => (
              <div
                key={avatar.id}
                onClick={() => setSelectedAvatar(avatar)}
                className={`min-w-40 cursor-pointer rounded-2xl border p-3 ${
                  selectedAvatar?.id === avatar.id
                    ? "border-blue-500 bg-blue-500/10"
                    : "border-white/10 bg-black"
                }`}
              >
                <img
                  src={avatar.image_url}
                  alt={avatar.avatar_name}
                  className="h-32 w-full rounded-xl object-cover"
                />
                <p className="mt-2 text-center text-sm font-bold">
                  {avatar.avatar_name}
                </p>
              </div>
            ))}
          </div>

          {avatars.length === 0 && (
            <p className="mt-4 text-yellow-400">
              No avatars saved yet. Go to Image Studio and save one as avatar.
            </p>
          )}
        </div>

        <div className="mt-8 rounded-3xl border border-white/10 bg-zinc-900 p-6">
          <h2 className="text-2xl font-bold">Script</h2>

          <textarea
            value={script}
            onChange={(e) => setScript(e.target.value)}
            className="mt-4 min-h-40 w-full rounded-2xl bg-black p-4 text-white"
            placeholder="Write what your avatar should say..."
          />

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              onClick={createTalkingVideo}
              disabled={loading}
              className="rounded-2xl bg-blue-600 px-6 py-4 font-bold hover:bg-blue-500 disabled:opacity-50"
            >
              {loading ? "Creating..." : "Generate Talking Video"}
            </button>

            <button
              onClick={checkVideo}
              className="rounded-2xl bg-zinc-800 px-6 py-4 font-bold hover:bg-zinc-700"
            >
              Check Video
            </button>

            <a
              href="/talking-history"
              className="rounded-2xl bg-green-600 px-6 py-4 font-bold hover:bg-green-500"
            >
              Video History
            </a>
          </div>

          {message && <p className="mt-4 text-yellow-400">{message}</p>}
        </div>

        {videoUrl && (
          <div className="mt-8 rounded-3xl border border-white/10 bg-zinc-900 p-6">
            <h2 className="text-2xl font-bold">Your Talking Avatar Video</h2>

            <video
              src={videoUrl}
              controls
              className="mt-5 w-full rounded-2xl"
            />

            <a
              href={videoUrl}
              target="_blank"
              className="mt-5 inline-block rounded-2xl bg-green-600 px-6 py-4 font-bold hover:bg-green-500"
            >
              Open / Download Video
            </a>
          </div>
        )}
      </section>
    </main>
  );
}