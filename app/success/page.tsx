export default function SuccessPage({
  searchParams,
}: {
  searchParams: { plan?: string };
}) {
  const plan = searchParams.plan || "pro";

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <section className="mx-auto max-w-2xl rounded-3xl border border-green-500/30 bg-zinc-900 p-8 text-center">
        <p className="text-sm font-bold uppercase tracking-widest text-green-400">
          Payment Successful
        </p>

        <h1 className="mt-4 text-4xl font-bold">
          Your {plan.toUpperCase()} plan is active
        </h1>

        <p className="mt-4 text-zinc-400">
          Your account is now ready to use premium creator tools.
        </p>

        <a
          href="/dashboard"
          className="mt-8 inline-block rounded-2xl bg-green-600 px-6 py-4 font-bold hover:bg-green-500"
        >
          Open Dashboard
        </a>
      </section>
    </main>
  );
}