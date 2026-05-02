"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan") || "standard";

  const plans: Record<string, { name: string; price: string }> = {
    standard: { name: "Standard", price: "$19/mo" },
    pro: { name: "Pro", price: "$74/mo" },
    elite: { name: "Elite", price: "$149/mo" },
  };

  const selected = plans[plan] || plans.standard;

  async function goToStripe() {
    const res = await fetch("/api/create-checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ plan }),
    });

    const data = await res.json();

    if (data.url) {
      window.location.href = data.url;
      return;
    }

    alert(data.error || "Stripe checkout failed.");
  }

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <section className="mx-auto max-w-2xl rounded-3xl border border-white/10 bg-zinc-900 p-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-blue-400">
          Stripe Checkout
        </p>

        <h1 className="mt-3 text-4xl font-bold">
          You selected {selected.name}
        </h1>

        <p className="mt-4 text-5xl font-bold text-blue-400">
          {selected.price}
        </p>

        <button
          onClick={goToStripe}
          className="mt-8 w-full rounded-2xl bg-blue-600 px-6 py-4 font-bold hover:bg-blue-500"
        >
          Continue to Payment
        </button>

        <a
          href="/pricing"
          className="mt-5 block text-center text-zinc-400 hover:text-white"
        >
          Back to Pricing
        </a>
      </section>
    </main>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="text-white p-10">Loading...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}