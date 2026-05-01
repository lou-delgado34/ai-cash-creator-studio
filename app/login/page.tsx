"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("lou.delgado.pfs@gmail.com");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function login() {
    setMessage("Logging in...");

    const res = await fetch("/api/admin-login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!data.success) {
      setMessage(data.error || "Login failed.");
      return;
    }

    setMessage("Login successful. Opening dashboard...");

    setTimeout(() => {
      window.location.assign("/dashboard");
    }, 500);
  }

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <section className="mx-auto max-w-md rounded-3xl border border-white/10 bg-zinc-900 p-6">
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
          Admin Login
        </p>

        <h1 className="mt-3 text-4xl font-bold">Sign in</h1>

        <p className="mt-3 text-zinc-400">
          Enter your admin email and password.
        </p>

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-6 w-full rounded-2xl border border-white/10 bg-black px-4 py-3 text-white outline-none"
          placeholder="Email"
        />

        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="mt-4 w-full rounded-2xl border border-white/10 bg-black px-4 py-3 text-white outline-none"
          placeholder="Password"
        />

        <button
          onClick={login}
          className="mt-5 w-full rounded-2xl bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-500"
        >
          Login
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