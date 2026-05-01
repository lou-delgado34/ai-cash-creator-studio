"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("lou.delgado.pfs@gmail.com");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function login() {
    setMessage("Checking login...");

    const response = await fetch("/api/admin-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!data.success) {
      setMessage(data.error || "Login failed.");
      return;
    }

    document.cookie = "admin_logged_in=true; path=/; max-age=604800";
    window.location.href = "/dashboard";
  }

  return (
    <main style={{ minHeight: "100vh", background: "#000", color: "#fff", padding: 32 }}>
      <section style={{ maxWidth: 480, margin: "40px auto", background: "#18181b", padding: 32, borderRadius: 24 }}>
        <p style={{ color: "#60a5fa", fontWeight: 800 }}>ADMIN LOGIN</p>
        <h1 style={{ fontSize: 42 }}>Sign in</h1>

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          style={{ width: "100%", padding: 14, marginTop: 16, borderRadius: 14, background: "#000", color: "#fff" }}
        />

        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          style={{ width: "100%", padding: 14, marginTop: 16, borderRadius: 14, background: "#000", color: "#fff" }}
        />

        <button
          onClick={login}
          style={{ width: "100%", padding: 14, marginTop: 20, borderRadius: 14, background: "#2563eb", color: "#fff", fontWeight: 800 }}
        >
          Login
        </button>

        {message && <p style={{ marginTop: 16 }}>{message}</p>}
      </section>
    </main>
  );
}