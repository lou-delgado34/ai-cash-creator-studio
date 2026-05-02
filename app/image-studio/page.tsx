"use client";

import { isPro } from "@/lib/plan";

export default function ImageStudio() {
  if (!isPro()) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Upgrade Required</h1>
          <p className="mt-4 text-zinc-400">
            This feature is only available for PRO users.
          </p>
          <a
            href="/pricing"
            className="mt-6 inline-block bg-blue-600 px-6 py-3 rounded-xl font-bold"
          >
            Upgrade Now
          </a>
        </div>
      </div>
    );
  }

  return <div className="text-white p-10">Image Studio Unlocked</div>;
}