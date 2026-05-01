"use client";

import { useState } from "react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const res = await fetch("/api/admin-login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (data.success) {
      window.location.assign("/dashboard");
    } else {
      alert("Wrong login");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-zinc-900 p-6 rounded-xl w-[350px]">
        <h2 className="text-xl mb-4">Admin Login</h2>

        <input
          className="w-full mb-3 p-2 bg-black border border-gray-700 rounded"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full mb-3 p-2 bg-black border border-gray-700 rounded"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={login}
          className="w-full bg-blue-600 p-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
}