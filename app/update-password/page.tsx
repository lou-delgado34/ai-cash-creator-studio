"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function UpdatePasswordPage() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function updatePassword() {
    setMessage("Updating password...");

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      setMessage("Error: " + error.message);
      return;
    }

    setMessage("Password updated. You can now login.");
    setTimeout(() => {
      window.location.href = "/login";
    }, 1500);
  }

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <section className="mx-auto max-w-md rounded-3xl border border-white/10 bg-zinc-900 p-6">
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
          Reset Password
        </p>

        <h1 className="mt-3 text-4xl font-bold">Create New Password</h1>

        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="mt-6 w-full rounded-2xl border border-white/10 bg-black px-4 py-3 text-white outline-none"
          placeholder="New password"
        />

        <button
          onClick={updatePassword}
          className="mt-5 w-full rounded-2xl bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-500"
        >
          Save New Password
        </button>

        {message && (
          <p className="mt-4 rounded-2xl border border-white/10 bg-black p-4 text-sm text-zinc-300">
            {message}
          </p>
        )}
      </section>
    </main>
  );
}