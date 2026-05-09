export default function PersonalTwinPrepPage() {
  const checklist = [
    "Use a clean background",
    "Face the camera straight",
    "Use bright lighting from the front",
    "Record chest-up, not too close",
    "No sunglasses or hat",
    "Speak slowly and clearly",
    "Keep background noise low",
    "Save your best video before uploading to D-ID",
  ];

  const script = `Hi, my name is Luis.

I help people create extra income, build financial knowledge, and take control of their future.

If you're serious about changing your situation, I'll show you exactly how to get started.

Let's get to work.`;

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <section className="mx-auto max-w-5xl">
        <p className="text-sm font-bold uppercase tracking-widest text-purple-400">
          Personal Digital Twin
        </p>

        <h1 className="mt-3 text-5xl font-bold">Personal Twin Prep</h1>

        <p className="mt-4 text-zinc-400">
          Use this before creating your real personal avatar in D-ID.
        </p>

        <div className="mt-8 rounded-3xl bg-zinc-900 p-6">
          <h2 className="text-2xl font-bold">Recording Checklist</h2>

          <div className="mt-5 space-y-3">
            {checklist.map((item) => (
              <p key={item} className="rounded-xl bg-black p-4">
                ✅ {item}
              </p>
            ))}
          </div>
        </div>

        <div className="mt-8 rounded-3xl bg-zinc-900 p-6">
          <h2 className="text-2xl font-bold">Practice Script</h2>

          <pre className="mt-5 whitespace-pre-wrap rounded-2xl bg-black p-5 text-zinc-300">
            {script}
          </pre>
        </div>

        <div className="mt-8 rounded-3xl border border-yellow-500/30 bg-yellow-950/20 p-6">
          <h2 className="text-2xl font-bold text-yellow-400">
            Do Not Upload Yet
          </h2>

          <p className="mt-3 text-zinc-300">
            Only upload to D-ID after you are happy with your lighting, face angle,
            and voice clarity. You have limited personal avatar slots.
          </p>
        </div>
      </section>
    </main>
  );
}