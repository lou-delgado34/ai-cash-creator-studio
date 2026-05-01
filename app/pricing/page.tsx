export default function PricingPage() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      desc: "Test the system",
      features: ["10 credits", "Basic content", "Limited tools"],
      highlight: false,
    },
    {
      name: "Standard",
      price: "$19/mo",
      desc: "For beginners",
      features: ["100 credits", "Content + Images", "Save projects"],
      highlight: false,
    },
    {
      name: "Pro",
      price: "$74/mo",
      desc: "Serious creators",
      features: ["500+ credits", "Video tools", "Voice + Image studio"],
      highlight: true,
    },
    {
      name: "Elite",
      price: "$149/mo",
      desc: "Full automation",
      features: ["Unlimited workflows", "Priority speed", "All tools unlocked"],
      highlight: false,
    },
    {
      name: "Admin",
      price: "Unlimited",
      desc: "Owner access",
      features: ["Everything unlocked", "No limits", "Internal control"],
      highlight: false,
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white px-6 py-10">
      <h1 className="text-5xl font-bold mb-3">
        Turn AI Into Income
      </h1>

      <p className="text-zinc-400 mb-10">
        Choose your plan and start building your AI business.
      </p>

      <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-5">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-3xl border p-6 ${
              plan.highlight
                ? "border-blue-500 bg-blue-500/10"
                : "border-white/10 bg-zinc-900"
            }`}
          >
            <h2 className="text-xl font-bold">{plan.name}</h2>

            <p className="text-3xl font-bold text-blue-400 mt-2">
              {plan.price}
            </p>

            <p className="text-zinc-400 mt-2">{plan.desc}</p>

            <ul className="mt-4 space-y-2 text-sm text-zinc-300">
              {plan.features.map((f) => (
                <li key={f}>✔ {f}</li>
              ))}
            </ul>

            <button
              className={`mt-6 w-full rounded-xl py-3 font-semibold ${
                plan.name === "Admin"
                  ? "bg-green-600"
                  : "bg-blue-600 hover:bg-blue-500"
              }`}
            >
              {plan.name === "Admin" ? "Admin Access" : "Upgrade"}
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}