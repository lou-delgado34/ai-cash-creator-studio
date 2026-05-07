"use client";

import { useEffect, useState } from "react";

type TalkingVideo = {
  id: string;
  avatar_name: string;
  avatar_image_url: string;
  script: string;
  video_url: string;
  status: string;
  created_at: string;
};

export default function TalkingHistoryPage() {
  const [videos, setVideos] = useState<TalkingVideo[]>([]);

  async function loadVideos() {
    const res = await fetch("/api/list-talking-videos");
    const data = await res.json();
    setVideos(data.videos || []);
  }

  useEffect(() => {
    loadVideos();
  }, []);

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <section className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h1 className="text-4xl font-bold">Talking Video History</h1>

          <a
            href="/talking-avatar"
            className="rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold hover:bg-blue-500"
          >
            Create New Video
          </a>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {videos.map((video) => (
            <div key={video.id} className="rounded-3xl bg-zinc-900 p-5">
              <h2 className="text-2xl font-bold">
                {video.avatar_name || "Talking Video"}
              </h2>

              <p className="mt-2 text-sm text-zinc-400">
                Status: {video.status}
              </p>

              {video.video_url && (
                <video
                  src={video.video_url}
                  controls
                  className="mt-5 w-full rounded-2xl"
                />
              )}

              <p className="mt-4 whitespace-pre-wrap text-sm text-zinc-300">
                {video.script}
              </p>

              {video.video_url && (
                <a
                  href={video.video_url}
                  target="_blank"
                  className="mt-5 inline-block rounded-xl bg-green-600 px-4 py-3 text-sm font-bold hover:bg-green-500"
                >
                  Open / Download
                </a>
              )}
            </div>
          ))}
        </div>

        {videos.length === 0 && (
          <p className="mt-8 rounded-2xl bg-zinc-900 p-6 text-zinc-400">
            No talking videos saved yet.
          </p>
        )}
      </section>
    </main>
  );
}