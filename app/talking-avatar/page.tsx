"use client";

import { useEffect, useState } from "react";

const voices = [
  { label: "English - Male", value: "en-US-GuyNeural" },
  { label: "English - Female", value: "en-US-JennyNeural" },
  { label: "Spanish Mexico - Male", value: "es-MX-JorgeNeural" },
  { label: "Spanish Mexico - Female", value: "es-MX-DaliaNeural" },
  { label: "Spanish Latino US - Male", value: "es-US-AlonsoNeural" },
  { label: "Spanish Latino US - Female", value: "es-US-PalomaNeural" },
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
  const [message, setMessage] = useState("");
  const [talkId, setTalkId] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [creditConfirm, setCreditConfirm] = useState(false);

  async function loadAvatars() {
    const res = await fetch("/api/list-avatars");
    const data = await res.json();
    setAvatars(data.avatars || []);
  }

  useEffect(() => {
    loadAvatars();

    const savedScript = localStorage.getItem("talking_avatar_script");
    const latestTalkId = localStorage.getItem("latest_talk_id");

    if (savedScript) setScript(savedScript);
    if (latestTalkId) setTalkId(latestTalkId);
  }, []);

  async function previewVoice() {
    const clean = cleanPreview(script);

    if (!clean) {
      setMessage("Add a script first.");
      return;
    }

    setMessage("Generating ElevenLabs voice...");

    const res = await fetch("/api/generate-voice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: clean }),
    });

    if (!res.ok) {
      const data = await res.json();
      setMessage(`${data.error || "Voice failed."} ${data.details || ""}`);
      return;
    }

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);

    audio.play();
    setMessage("Playing ElevenLabs voice. No D-ID credits used.");
  }

  async function createTalkingVideo() {
    if (!creditConfirm) {
      setMessage("Check the credit confirmation box before generating video.");
      return;
    }

    if (!selectedAvatar) {
      setMessage("Select an avatar first.");
      return;
    }

    if (!script.trim()) {
      setMessage("Write a script first.");
      return;
    }

    setLoading(true);
    setMessage("Creating D-ID video. This may use credits...");
    setVideoUrl("");

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
      setMessage(data.error || "Video failed. D-ID credits may be needed.");
      setLoading(false);
      return;
    }

    setTalkId(data.id);
    localStorage.setItem("latest_talk_id", data.id);
    localStorage.setItem("latest_talk_script", script);
    localStorage.setItem("latest_avatar_name", selectedAvatar.avatar_name);
    localStorage.setItem("latest_avatar_image", selectedAvatar.image_url);

    setMessage("Video started. Wait 30 seconds, then click Check Current Video.");
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
        <p className="text-sm font-bold uppercase tracking-widest text-blue-400">
          Creation Studio
        </p>

        <h1 className="mt-2 text-5xl font-bold">Talking Avatar Builder</h1>

        <p className="mt-3 text-zinc-400">
          Preview ElevenLabs voice before spending D-ID video credits.
        </p>

        <div className="mt-8 rounded-3xl border border-blue-500/30 bg-blue-950/20 p-6">
          <h2 className="text-2xl font-bold">Step 1: Choose Avatar</h2>

          <div className="mt-4 flex gap-4 overflow-x-auto">
            {avatars.map((avatar) => (
              <div
                key={avatar.id}
                onClick={() => setSelectedAvatar(avatar)}
                className={`min-w-36 cursor-pointer rounded-2xl border p-3 ${
                  selectedAvatar?.id === avatar.id
                    ? "border-blue-500 bg-blue-600/30"
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

        <div className="mt-6 rounded-3xl bg-zinc-900 p-6">
          <h2 className="text-2xl font-bold">Step 2: Script + Voice</h2>

          <textarea
            value={script}
            onChange={(e) => setScript(e.target.value)}
            className="mt-4 min-h-44 w-full rounded-2xl bg-black p-4 text-white"
            placeholder="Paste your script here..."
          />

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

          <div className="mt-6 rounded-2xl border border-yellow-500/30 bg-yellow-950/20 p-5">
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={creditConfirm}
                onChange={(e) => setCreditConfirm(e.target.checked)}
                className="mt-1"
              />
              <span>
                I understand that clicking Generate New Video may use D-ID credits.
              </span>
            </label>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={previewVoice}
              className="rounded-xl bg-purple-600 px-5 py-3 font-bold"
            >
              Preview ElevenLabs Voice
            </button>

            <button
              onClick={createTalkingVideo}
              disabled={loading}
              className="rounded-xl bg-blue-600 px-5 py-3 font-bold disabled:opacity-50"
            >
              {loading ? "Creating..." : "Generate New Video"}
            </button>

            <button
              onClick={checkVideo}
              className="rounded-xl bg-zinc-700 px-5 py-3 font-bold"
            >
              Check Current Video
            </button>

            <a
              href="/talking-history"
              className="rounded-xl bg-green-600 px-5 py-3 font-bold"
            >
              Go to Video History
            </a>
          </div>

          {message && (
            <p className="mt-5 whitespace-pre-wrap break-words text-yellow-400">
              {message}
            </p>
          )}
        </div>

        {videoUrl && (
          <div className="mt-8 rounded-3xl border border-green-500/30 bg-green-950/20 p-6">
            <h2 className="text-2xl font-bold">New Video Preview</h2>
            <video src={videoUrl} controls className="mt-5 w-full rounded-2xl" />
          </div>
        )}
      </section>
    </main>
  );
}