export default function CheckoutPage({
  searchParams,
}: {
  searchParams: { plan?: string };
}) {
  const plan = searchParams.plan || "standard";

  const plans: Record<string, { name: string; price: string; desc: string }> = {
    free: {
      name: "Free",
      price: "$0",
      desc: "Test the system with basic access.",
    },
    standard: {
      name: "Standard",
      price: "$19/mo",
      desc: "For beginners creating consistent content.",
    },
    pro: {
      name: "Pro",
      price: "$74/mo",
      desc: "For serious creators using video, voice, and image tools.",
    },
    elite: {
      name: "Elite",
      price: "$149/mo",
      desc: "For scaling with advanced workflows and automation.",
    },
  };

  const selectedPlan = plans[plan] || plans.standard;

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <section className="mx-auto max-w-2xl rounded-3xl border border-white/10 bg-zinc-900 p-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
          Checkout Preview
        </p>

        <h1 className="mt-3 text-4xl font-bold">
          You selected {selectedPlan.name}
        </h1>

        <p className="mt-4 text-5xl font-bold text-blue-400">
          {selectedPlan.price}
        </p>

        <p className="mt-4 text-zinc-400">{selectedPlan.desc}</p>

        <div className="mt-8 rounded-2xl border border-yellow-500/30 bg-yellow-950/20 p-5">
          <h2 className="text-xl font-bold text-yellow-300">
            Stripe Coming Next
          </h2>
          <p className="mt-2 text-zinc-300">
            This page will connect to Stripe checkout next. For now it confirms
            which plan the user selected.
          </p>
        </div>

        <a
          href="/pricing"
          className="mt-6 inline-block rounded-2xl bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-500"
        >
          Back to Pricing
        </a>
      </section>
    </main>
  );
}