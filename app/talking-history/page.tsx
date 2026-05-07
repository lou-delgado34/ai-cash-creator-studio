"use client";

import { useEffect, useState } from "react";

type TalkingVideo = {
  id: string;
  avatar_name: string;
  script: string;
  video_url: string;
  status: string;
  created_at: string;
};

export default function TalkingHistoryPage() {
  const [videos, setVideos] = useState<TalkingVideo[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadVideos() {
    setLoading(true);
    const res = await fetch("/api/list-talking-videos");
    const data = await res.json();
    setVideos(data.videos || []);
    setLoading(false);
  }

  async function deleteVideo(id: string) {
    await fetch("/api/delete-talking-video", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    loadVideos();
  }

  useEffect(() => {
    loadVideos();
  }, []);

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <section className="mx-auto max-w-6xl">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold">Talking Video History</h1>

          <button
            onClick={loadVideos}
            className="rounded-xl bg-blue-600 px-4 py-2 font-bold hover:bg-blue-500"
          >
            Refresh
          </button>
        </div>

        {loading && <p className="mt-6 text-zinc-400">Loading...</p>}

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {videos.map((video) => (
            <div key={video.id} className="rounded-3xl bg-zinc-900 p-5">
              <h2 className="text-xl font-bold">
                {video.avatar_name || "Talking Video"}
              </h2>

              <p className="text-sm text-zinc-400">
                {new Date(video.created_at).toLocaleString()}
              </p>

              {video.video_url && (
                <video
                  src={video.video_url}
                  controls
                  className="mt-4 w-full rounded-xl"
                />
              )}

              <p className="mt-3 text-sm text-zinc-300 whitespace-pre-wrap">
                {video.script}
              </p>

              <div className="mt-4 flex gap-3">
                {video.video_url && (
                  <a
                    href={video.video_url}
                    target="_blank"
                    className="rounded-lg bg-green-600 px-4 py-2 text-sm font-bold hover:bg-green-500"
                  >
                    Download
                  </a>
                )}

                <button
                  onClick={() => deleteVideo(video.id)}
                  className="rounded-lg bg-red-600 px-4 py-2 text-sm font-bold hover:bg-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {videos.length === 0 && !loading && (
          <p className="mt-8 text-zinc-400">No videos yet.</p>
        )}
      </section>
    </main>
  );
}