"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  async function sendMagicLink() {
    setMessage("Sending login link...");

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
      },
    });

    if (error) {
      setMessage("Login error: " + error.message);
      return;
    }

    setMessage("Check your email for the login link.");
  }

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <section className="mx-auto max-w-md rounded-3xl border border-white/10 bg-zinc-900 p-6">
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
          Login
        </p>

        <h1 className="mt-3 text-4xl font-bold">Sign in</h1>

        <p className="mt-3 text-zinc-400">
          Enter your email and Supabase will send you a secure login link.
        </p>

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-6 w-full rounded-2xl border border-white/10 bg-black px-4 py-3 text-white outline-none"
          placeholder="your@email.com"
        />

        <button
          onClick={sendMagicLink}
          className="mt-5 w-full rounded-2xl bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-500"
        >
          Send Login Link
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