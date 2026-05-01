export default function PricingPage() {
  const plans = [
    {
      id: "free",
      name: "Free",
      price: "$0",
      desc: "Test the system",
      features: ["10 credits", "Basic content", "Limited tools"],
      highlight: false,
    },
    {
      id: "standard",
      name: "Standard",
      price: "$19/mo",
      desc: "For beginners",
      features: ["100 credits", "Content + Images", "Save projects"],
      highlight: false,
    },
    {
      id: "pro",
      name: "Pro",
      price: "$74/mo",
      desc: "Serious creators",
      features: ["500+ credits", "Video tools", "Voice + Image studio"],
      highlight: true,
    },
    {
      id: "elite",
      name: "Elite",
      price: "$149/mo",
      desc: "Full automation",
      features: ["Unlimited workflows", "Priority speed", "All tools unlocked"],
      highlight: false,
    },
    {
      id: "admin",
      name: "Admin",
      price: "Unlimited",
      desc: "Owner access",
      features: ["Everything unlocked", "No limits", "Internal control"],
      highlight: false,
    },
  ];

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <section className="mx-auto max-w-7xl">
        <h1 className="mb-3 text-5xl font-bold">Turn AI Into Income</h1>

        <p className="mb-10 text-zinc-400">
          Choose your plan and start building your AI business.
        </p>

        <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-5">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-3xl border p-6 ${
                plan.highlight
                  ? "border-blue-500 bg-blue-500/10"
                  : "border-white/10 bg-zinc-900"
              }`}
            >
              <h2 className="text-xl font-bold">{plan.name}</h2>

              <p className="mt-2 text-3xl font-bold text-blue-400">
                {plan.price}
              </p>

              <p className="mt-2 text-zinc-400">{plan.desc}</p>

              <ul className="mt-4 space-y-2 text-sm text-zinc-300">
                {plan.features.map((feature) => (
                  <li key={feature}>✔ {feature}</li>
                ))}
              </ul>

              <a
                href={
                  plan.id === "admin"
                    ? "/admin"
                    : `/checkout?plan=${plan.id}`
                }
                className={`mt-6 block w-full rounded-xl py-3 text-center font-semibold ${
                  plan.id === "admin"
                    ? "bg-green-600 hover:bg-green-500"
                    : "bg-blue-600 hover:bg-blue-500"
                }`}
              >
                {plan.id === "admin" ? "Admin Access" : "Upgrade"}
              </a>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}