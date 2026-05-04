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

  useEffect(() => {
    loadImages();
  }, []);

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <section className="mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold">Image History</h1>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {images.map((image) => (
            <div key={image.id} className="rounded-3xl bg-zinc-900 p-4">
              <img
                src={image.image_url}
                alt="Saved AI image"
                className="rounded-2xl"
              />
              <p className="mt-3 text-sm text-zinc-400">{image.prompt}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}