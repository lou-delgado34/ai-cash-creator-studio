"use client";

import { useEffect, useState } from "react";

export default function AIModelsPage() {
  const [plan, setPlan] = useState<string | null>(null);

  useEffect(() => {
    const savedPlan = localStorage.getItem("user_plan");
    setPlan(savedPlan);
  }, []);

  if (!plan || plan === "standard") {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-400">
            Upgrade Required
          </h1>
          <p className="mt-4 text-zinc-400">
            You need PRO or ELITE to access AI Models.
          </p>

          <a
            href="/pricing"
            className="mt-6 inline-block bg-blue-600 px-6 py-3 rounded-xl font-bold"
          >
            Upgrade Now
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-3xl font-bold">
        AI Models (Unlocked)
      </h1>
    </main>
  );
}