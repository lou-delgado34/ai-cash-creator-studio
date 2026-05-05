"use client";

import { useEffect, useState } from "react";

type SavedImage = {
  id: string;
  email: string;
  prompt: string;
  image_url: string;
  created_at: string;
};

export default function ImageHistoryPage() {
  const [images, setImages] = useState<SavedImage[]>([]);

  async function loadImages() {
    const res = await fetch("/api/list-images");
    const data = await res.json();
    setImages(data.images || []);
  }

  async function deleteImage(id: string) {
    await fetch("/api/delete-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    loadImages();
  }

  function downloadImage(url: string) {
    const link = document.createElement("a");
    link.href = url;
    link.download = "ai-image.png";
    link.click();
  }

  useEffect(() => {
    loadImages();
  }, []);

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <section className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h1 className="text-4xl font-bold">Image History</h1>

          <a
            href="/image-studio"
            className="rounded-xl bg-zinc-800 px-4 py-3 text-sm font-bold hover:bg-zinc-700"
          >
            Back to Image Studio
          </a>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {images.map((image) => (
            <div key={image.id} className="rounded-3xl bg-zinc-900 p-4">
              <img
                src={image.image_url}
                alt="Saved AI image"
                className="rounded-2xl"
              />

              <p className="mt-3 text-sm text-zinc-400">{image.prompt}</p>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => downloadImage(image.image_url)}
                  className="flex-1 rounded-xl bg-blue-600 px-4 py-2 text-sm font-bold hover:bg-blue-500"
                >
                  Download
                </button>

                <button
                  onClick={() => deleteImage(image.id)}
                  className="flex-1 rounded-xl bg-red-600 px-4 py-2 text-sm font-bold hover:bg-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {images.length === 0 && (
          <p className="mt-8 rounded-2xl bg-zinc-900 p-6 text-zinc-400">
            No saved images yet.
          </p>
        )}
      </section>
    </main>
  );
}