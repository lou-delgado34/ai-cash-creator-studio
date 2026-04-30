const offers = [
  {
    name: "Fitness Coaching Lead",
    type: "Lead Generation",
    description: "Free fitness consultation call",
    cta: "Book your free call now",
  },
  {
    name: "Digital Product",
    type: "Ebook",
    description: "How to build discipline daily",
    cta: "Download now",
  },
  {
    name: "Affiliate Product",
    type: "Affiliate",
    description: "Protein supplements brand",
    cta: "Shop now",
  },
];

export default function MonetizationPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <section className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
          Monetization
        </p>

        <h1 className="mt-3 text-4xl font-bold">
          Turn Content Into Money
        </h1>

        <p className="mt-3 max-w-2xl text-zinc-400">
          Create offers that your AI influencer promotes. This is how your
          system generates income.
        </p>

        <div className="mt-8 rounded-3xl border border-white/10 bg-zinc-900 p-6">
          <h2 className="text-2xl font-bold">Create New Offer</h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <input
              className="rounded-2xl border border-white/10 bg-black px-4 py-3 text-white outline-none"
              placeholder="Offer Name"
            />

            <input
              className="rounded-2xl border border-white/10 bg-black px-4 py-3 text-white outline-none"
              placeholder="Offer Type: Affiliate, Digital, Coaching..."
            />
          </div>

          <textarea
            className="mt-4 min-h-28 w-full rounded-2xl border border-white/10 bg-black px-4 py-3 text-white outline-none"
            placeholder="Description: What is this offer about?"
          />

          <input
            className="mt-4 w-full rounded-2xl border border-white/10 bg-black px-4 py-3 text-white outline-none"
            placeholder="CTA: Example: Click link in bio, Buy now..."
          />

          <input
            className="mt-4 w-full rounded-2xl border border-white/10 bg-black px-4 py-3 text-white outline-none"
            placeholder="Link: Where does the user go?"
          />

          <button className="mt-5 rounded-2xl bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-500">
            Save Offer
          </button>

          <p className="mt-3 text-sm text-zinc-500">
            Note: Saving will be connected to Supabase in a later step.
          </p>
        </div>

        <h2 className="mb-4 mt-8 text-2xl font-bold">
          Example Offers
        </h2>

        <div className="grid gap-5 md:grid-cols-3">
          {offers.map((offer) => (
            <div
              key={offer.name}
              className="rounded-3xl border border-white/10 bg-zinc-900 p-6"
            >
              <h3 className="text-xl font-bold">{offer.name}</h3>

              <p className="mt-2 text-sm text-blue-400">
                {offer.type}
              </p>

              <p className="mt-3 text-zinc-400">
                {offer.description}
              </p>

              <p className="mt-4 text-sm text-zinc-300">
                CTA: {offer.cta}
              </p>

              <button className="mt-5 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 font-semibold hover:bg-white/15">
                Use This Offer
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}