async function login() {
  setMessage("Logging in...");

  const res = await fetch("/api/admin-login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // IMPORTANT
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!data.success) {
    setMessage(data.error || "Login failed.");
    return;
  }

  window.location.href = "/dashboard";
}