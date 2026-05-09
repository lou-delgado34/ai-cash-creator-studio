"use client";

import { useState } from "react";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function ContentCalendarPage() {
  const [plan, setPlan] = useState<Record<string, string>>({
    Monday: "Recruiting Reel",
    Tuesday: "Financial education post",
    Wednesday: "Behind-the-scenes story",
    Thursday: "Client problem / solution post",
    Friday: "Business opportunity video",
    Saturday: "Personal brand post",
    Sunday: "Weekly recap + CTA",
  });

  function copyPlan() {
    const text = days.map((day) => `${day}: ${plan[day]}`).join("\n");
    navigator.clipboard.writeText(text);
  }

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <section className="mx-auto max-w-6xl">
        <p className="text-sm font-bold uppercase tracking-widest text-blue-400">
          Social Automation
        </p>

        <h1 className="mt-3 text-5xl font-bold">Content Calendar</h1>

        <p className="mt-4 text-zinc-400">
          Plan your weekly posting schedule before creating videos.
        </p>

        <div className="mt-10 grid gap-5">
          {days.map((day) => (
            <div key={day} className="rounded-2xl bg-zinc-900 p-5">
              <h2 className="text-xl font-bold">{day}</h2>

              <textarea
                value={plan[day]}
                onChange={(e) =>
                  setPlan({
                    ...plan,
                    [day]: e.target.value,
                  })
                }
                className="mt-3 min-h-24 w-full rounded-xl bg-black p-4 text-white"
              />
            </div>
          ))}
        </div>

        <button
          onClick={copyPlan}
          className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-bold hover:bg-blue-500"
        >
          Copy Weekly Plan
        </button>
      </section>
    </main>
  );
}