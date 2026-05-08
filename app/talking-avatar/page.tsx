"use client";

import { useEffect, useState } from "react";

export default function TalkingAvatarPage() {
  const [script, setScript] = useState("");
  const [avatars, setAvatars] = useState<any[]>([]);
  const [selectedAvatar, setSelectedAvatar] = useState<any>(null);
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

    const savedScript = localStorage.getItem("talking_avatar_script");

    if (savedScript) {
      setScript(savedScript);
      localStorage.removeItem("talking_avatar_script");
    }
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
    setMessage("Creating video...");
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

    if (!data.id) {
      setMessage(data.error || "Failed to create video.");
      setLoading(false);
      return;
    }

    setTalkId(data.id);
    setMessage("Video started. Wait 20 seconds then click Check Video.");
    setLoading(false);
  }

  async function checkVideo() {
    if (!talkId) {
      setMessage("Generate a video first.");
      return;
    }

    setMessage("Checking...");

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
      setMessage("Video ready.");
      return;
    }

    setMessage("Still processing...");
  }

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <section className="mx-auto max-w-6xl">

        <h1 className="text-4xl font-bold">Talking Avatar</h1>

        {/* AVATAR SELECT */}
        <div className="mt-6 flex gap-4 overflow-x-auto">
          {avatars.map((a) => (
            <div
              key={a.id}
              onClick={() => setSelectedAvatar(a)}
              className={`cursor-pointer rounded-xl p-2 ${
                selectedAvatar?.id === a.id ? "bg-blue-600" : "bg-zinc-900"
              }`}
            >
              <img src={a.image_url} className="w-32 h-32 object-cover rounded-lg" />
              <p className="text-center mt-2 text-sm">{a.avatar_name}</p>
            </div>
          ))}
        </div>

        {/* SCRIPT */}
        <textarea
          value={script}
          onChange={(e) => setScript(e.target.value)}
          className="mt-6 w-full min-h-40 bg-zinc-900 p-4 rounded-xl"
          placeholder="Write script..."
        />

        {/* BUTTONS */}
        <div className="mt-4 flex gap-3 flex-wrap">
          <button
            onClick={createTalkingVideo}
            disabled={loading}
            className="bg-blue-600 px-6 py-3 rounded-xl font-bold"
          >
            {loading ? "Creating..." : "Generate Video"}
          </button>

          <button
            onClick={checkVideo}
            className="bg-zinc-700 px-6 py-3 rounded-xl"
          >
            Check Video
          </button>
        </div>

        {message && <p className="mt-4 text-yellow-400">{message}</p>}

        {videoUrl && (
          <video src={videoUrl} controls className="mt-6 w-full rounded-xl" />
        )}

      </section>
    </main>
  );
}