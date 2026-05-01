export default function PricingPage() {
  const plans = [
    ["Free", "$0", "Try the app", "10 credits, basic tools"],
    ["Standard", "$19/mo", "Regular creator", "100 credits, content and images"],
    ["Pro", "$74/mo", "Serious creator", "500+ credits, video workflows"],
    ["Pro+ / Elite", "$149/mo", "Scaling business", "Automation and priority tools"],
    ["Admin", "Unlimited", "Owner access", "Everything unlocked"],
  ];

  return (
    <main style={{ minHeight: "100vh", background: "#000", color: "#fff", padding: 32 }}>
      <h1 style={{ fontSize: 48, marginBottom: 12 }}>Choose Your Creator Plan</h1>
      <p style={{ color: "#aaa", marginBottom: 32 }}>
        Free, Standard, Pro, Elite, and Admin Unlimited.
      </p>

      <div style={{ display: "grid", gap: 20, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
        {plans.map(([name, price, desc, features]) => (
          <div
            key={name}
            style={{
              background: "#18181b",
              border: "1px solid #333",
              borderRadius: 24,
              padding: 24,
            }}
          >
            <h2>{name}</h2>
            <h3 style={{ fontSize: 32, color: "#60a5fa" }}>{price}</h3>
            <p style={{ color: "#bbb" }}>{desc}</p>
            <p style={{ color: "#ddd" }}>✅ {features}</p>
            <button
              style={{
                width: "100%",
                marginTop: 20,
                padding: 12,
                borderRadius: 16,
                background: "#2563eb",
                color: "#fff",
                border: "none",
                fontWeight: 700,
              }}
            >
              {name === "Admin" ? "Admin Access" : "Choose Plan"}
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}