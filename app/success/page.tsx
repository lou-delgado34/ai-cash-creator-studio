"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan") || "standard";

  useEffect(() => {
    localStorage.setItem("user_plan", plan);
  }, [plan]);

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <section className="mx-auto max-w-2xl rounded-3xl border border-white/10 bg-zinc-900 p-8 text-center">
        <h1 className="text-3xl font-bold text-green-400">
          PAYMENT SUCCESSFUL
        </h1>

        <p className="mt-4 text-xl">
          Your <strong>{plan.toUpperCase()}</strong> plan is active
        </p>

        <p className="mt-4 text-zinc-400">
          Your account is now ready to use premium creator tools.
        </p>

        <a
          href="/dashboard"
          className="mt-8 inline-block rounded-2xl bg-green-600 px-6 py-4 font-bold hover:bg-green-500"
        >
          Open Dashboard
        </a>
      </section>
    </main>
  );
}