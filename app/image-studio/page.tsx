"use client";

import { useState } from "react";

export default function ImageStudio() {
  const [email, setEmail] = useState("");
  const [allowed, setAllowed] = useState(false);
  const [checked, setChecked] = useState(false);

  async function checkAccess() {
    const res = await fetch("/api/check-plan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (data.active) {
      setAllowed(true);
      localStorage.setItem("user_email", email);
      localStorage.setItem("user_plan", data.plan);
    }

    setChecked(true);
  }

  if (!allowed) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center p-6">
        <div className="max-w-md w-full rounded-3xl bg-zinc-900 p-8 border border-white/10">
          <h1 className="text-3xl font-bold">Verify Access</h1>
          <p className="mt-3 text-zinc-400">
            Enter the email used at Stripe checkout.
          </p>

          <input
            className="mt-6 w-full rounded-xl bg-black p-4 text-white"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            onClick={checkAccess}
            className="mt-4 w-full rounded-xl bg-blue-600 p-4 font-bold"
          >
            Check Access
          </button>

          {checked && (
            <p className="mt-4 text-red-400">
              No active paid plan found. Please upgrade.
            </p>
          )}

          <a
            href="/pricing"
            className="mt-5 block text-center text-blue-400"
          >
            Upgrade Now
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold">Image Studio Unlocked</h1>
      <p className="mt-4 text-zinc-400">
        Your paid plan was verified from Supabase.
      </p>
    </main>
  );
}