"use client";

import { useEffect, useState } from "react";

export default function PostPrepPage() {
  const [caption, setCaption] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [hashtags, setHashtags] = useState(
    "#ExtraIncome #FinancialEducation #BusinessOpportunity"
  );
  const [cta, setCta] = useState("Comment INFO or send me a message.");

  const [posted, setPosted] = useState({
    instagram: false,
    tiktok: false,
    facebook: false,
    youtube: false,
    linkedin: false,
  });

  useEffect(() => {
    const savedCaption = localStorage.getItem("post_caption");
    const savedVideoUrl = localStorage.getItem("post_video_url");

    if (savedCaption) setCaption(savedCaption);
    if (savedVideoUrl) setVideoUrl(savedVideoUrl);
  }, []);

  function copyPost() {
    navigator.clipboard.writeText(`${caption}\n\n${cta}\n\n${hashtags}`);
  }

  function togglePlatform(platform: keyof typeof posted) {
    setPosted({
      ...posted,
      [platform]: !posted[platform],
    });
  }

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <section className="mx-auto max-w-5xl">
        <h1 className="text-4xl font-bold">Post Prep</h1>

        {videoUrl && (
          <video src={videoUrl} controls className="mt-8 w-full rounded-2xl" />
        )}

        <textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="mt-8 min-h-40 w-full rounded-2xl bg-zinc-900 p-4 text-white"
          placeholder="Caption..."
        />

        <input
          value={cta}
          onChange={(e) => setCta(e.target.value)}
          className="mt-4 w-full rounded-2xl bg-zinc-900 p-4 text-white"
          placeholder="Call to action"
        />

        <input
          value={hashtags}
          onChange={(e) => setHashtags(e.target.value)}
          className="mt-4 w-full rounded-2xl bg-zinc-900 p-4 text-white"
          placeholder="Hashtags"
        />

        <button
          onClick={copyPost}
          className="mt-5 rounded-xl bg-blue-600 px-6 py-3 font-bold hover:bg-blue-500"
        >
          Copy Post Text
        </button>

        <div className="mt-8 rounded-3xl bg-zinc-900 p-6">
          <h2 className="text-2xl font-bold">Posting Checklist</h2>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {Object.entries(posted).map(([platform, value]) => (
              <button
                key={platform}
                onClick={() => togglePlatform(platform as keyof typeof posted)}
                className={`rounded-xl px-5 py-4 text-left font-bold ${
                  value ? "bg-green-600" : "bg-zinc-800"
                }`}
              >
                {value ? "✅" : "⬜"} Posted to {platform}
              </button>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}