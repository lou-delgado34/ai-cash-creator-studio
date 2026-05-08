"use client";

import { useEffect, useState } from "react";

const voices = [
  { label: "English - Male", value: "en-US-GuyNeural", lang: "en-US" },
  { label: "English - Female", value: "en-US-JennyNeural", lang: "en-US" },
  { label: "Spanish Mexico - Male", value: "es-MX-JorgeNeural", lang: "es-MX" },
  { label: "Spanish Mexico - Female", value: "es-MX-DaliaNeural", lang: "es-MX" },
  { label: "Spanish Latino US - Male", value: "es-US-AlonsoNeural", lang: "es-US" },
  { label: "Spanish Latino US - Female", value: "es-US-PalomaNeural", lang: "es-US" },
];

function cleanPreview(text: string) {
  return text
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
    .replace(/#\w+/g, "")
    .trim();
}

export default function TalkingAvatarPage() {
  const [avatars, setAvatars] = useState<any[]>([]);
  const [selectedAvatar, setSelectedAvatar] = useState<any>(null);
  const [script, setScript] = useState("");
  const [voiceId, setVoiceId] = useState("en-US-GuyNeural");
  const [speed, setSpeed] = useState(1);
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
    const latestTalkId = localStorage.getItem("latest_talk_id");

    if (savedScript) {
      setScript(savedScript);
      localStorage.removeItem("talking_avatar_script");
    }

    if (latestTalkId) {
      setTalkId(latestTalkId);
    }
  }, []);

  function previewVoice() {
    const selectedVoice = voices.find((v) => v.value === voiceId);
    const clean = cleanPreview(script);

    if (!clean) {
      setMessage("Add a script first.");
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(clean);
    utterance.lang = selectedVoice?.lang || "en-US";
    utterance.rate = speed;

    window.speechSynthesis.speak(utterance);
    setMessage("Voice preview playing.");
  }

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
        voice_id: voiceId,
      }),
    });

    const data = await res.json();

    if (!data.id) {
      setMessage(data.error || "Video failed.");
      setLoading(false);
      return;
    }

    setTalkId(data.id);
    localStorage.setItem("latest_talk_id", data.id);
    setMessage("Video started. Wait 30 seconds, then click Check Video.");
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
      setMessage("Video ready.");
      return;
    }

    setMessage(`Video status: ${data.status || "still processing"}`);
  }

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <section className="mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold">Talking Avatar Studio</h1>

        <div className="mt-6 rounded-3xl bg-zinc-900 p-5">
          <h2 className="text-2xl font-bold">Select Avatar</h2>

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
                <img src={avatar.image_url} className="h-28 w-full rounded-xl object-cover" />
                <p className="mt-2 text-center text-sm font-bold">{avatar.avatar_name}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 rounded-3xl bg-zinc-900 p-6">
          <h2 className="text-2xl font-bold">Script</h2>

          <textarea
            value={script}
            onChange={(e) => setScript(e.target.value)}
            className="mt-4 min-h-44 w-full rounded-2xl bg-black p-4 text-white"
            placeholder="Paste your script here..."
          />

          <h2 className="mt-6 text-2xl font-bold">Voice</h2>

          <select
            value={voiceId}
            onChange={(e) => setVoiceId(e.target.value)}
            className="mt-4 w-full rounded-2xl bg-black p-4 text-white"
          >
            {voices.map((voice) => (
              <option key={voice.value} value={voice.value}>
                {voice.label}
              </option>
            ))}
          </select>

          <div className="mt-5">
            <p className="font-bold">Preview Speed: {speed}</p>
            <input
              type="range"
              min="0.7"
              max="1.3"
              step="0.1"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="mt-3 w-full"
            />
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button onClick={previewVoice} className="rounded-xl bg-purple-600 px-5 py-3 font-bold">
              Preview Voice
            </button>

            <button
              onClick={createTalkingVideo}
              disabled={loading}
              className="rounded-xl bg-blue-600 px-5 py-3 font-bold disabled:opacity-50"
            >
              {loading ? "Creating..." : "Generate Video"}
            </button>

            <button onClick={checkVideo} className="rounded-xl bg-zinc-700 px-5 py-3 font-bold">
              Check Video
            </button>
          </div>

          {message && <p className="mt-5 text-yellow-400">{message}</p>}
        </div>

        {videoUrl && (
          <div className="mt-8 rounded-3xl bg-zinc-900 p-6">
            <h2 className="text-2xl font-bold">Your Video</h2>
            <video src={videoUrl} controls className="mt-5 w-full rounded-2xl" />
          </div>
        )}
      </section>
    </main>
  );
}