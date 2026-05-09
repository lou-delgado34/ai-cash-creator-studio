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

  async function loadVideos() {
    const res = await fetch("/api/list-talking-videos");
    const data = await res.json();
    setVideos(data.videos || []);
  }

  function prepPost(video: TalkingVideo) {
    localStorage.setItem("post_caption", video.script || "");
    localStorage.setItem("post_video_url", video.video_url || "");
    window.location.href = "/post-prep";
  }

  useEffect(() => {
    loadVideos();
  }, []);

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <section className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-green-400">
              Finished Video Library
            </p>
            <h1 className="mt-2 text-5xl font-bold">Video History</h1>
            <p className="mt-3 text-zinc-400">
              Manage finished avatar videos, download them, prepare captions, or delete old videos.
            </p>
          </div>

          <button onClick={loadVideos} className="rounded-xl bg-blue-600 px-5 py-3 font-bold">
            Refresh
          </button>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {videos.map((video) => (
            <div key={video.id} className="rounded-3xl border border-white/10 bg-zinc-900 p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-2xl font-bold">{video.avatar_name || "Talking Video"}</h2>
                  <p className="mt-1 text-sm text-zinc-400">
                    {video.created_at ? new Date(video.created_at).toLocaleString() : "Saved video"}
                  </p>
                </div>

                <span className="rounded-xl bg-green-600 px-3 py-1 text-sm font-bold">
                  {video.status || "completed"}
                </span>
              </div>

              {video.video_url && (
                <video src={video.video_url} controls className="mt-5 w-full rounded-2xl" />
              )}

              <div className="mt-5 rounded-2xl bg-black p-4">
                <p className="text-sm font-bold text-blue-400">Script Used</p>
                <p className="mt-2 whitespace-pre-wrap text-sm text-zinc-300">{video.script}</p>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                {video.video_url && (
                  <a
                    href={video.video_url}
                    target="_blank"
                    className="rounded-xl bg-green-600 px-4 py-3 text-sm font-bold"
                  >
                    Download Video
                  </a>
                )}

                <button onClick={() => prepPost(video)} className="rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold">
                  Prep Social Post
                </button>
              </div>
            </div>
          ))}
        </div>

        {videos.length === 0 && (
          <p className="mt-8 rounded-2xl bg-zinc-900 p-6 text-zinc-400">
            No finished videos saved yet.
          </p>
        )}
      </section>
    </main>
  );
}