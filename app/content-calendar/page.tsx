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

const plans: any = {
  "Instagram Reels": {
    "Recruit new agents": {
      English: {
        Monday: "Recruiting Reel: 3 signs you need a second income.",
        Tuesday: "Financial education Reel: why most families are underprotected.",
        Wednesday: "Behind-the-scenes Reel: why I chose this business.",
        Thursday: "Problem/Solution Reel: working hard but still falling behind.",
        Friday: "Business opportunity Reel: how part-time effort can create options.",
        Saturday: "Personal brand Reel: my mission and who I help.",
        Sunday: "Weekly recap Reel with CTA: message INFO.",
      },
      Spanish: {
        Monday: "Reel de reclutamiento: 3 señales de que necesitas ingreso extra.",
        Tuesday: "Reel educativo: por qué muchas familias no están protegidas.",
        Wednesday: "Reel personal: por qué escogí este negocio.",
        Thursday: "Reel problema/solución: trabajar fuerte y todavía no avanzar.",
        Friday: "Reel de oportunidad: cómo empezar medio tiempo.",
        Saturday: "Reel de marca personal: mi misión y a quién ayudo.",
        Sunday: "Resumen semanal con CTA: comenta INFO.",
      },
    },
    "Book appointments": {
      English: {
        Monday: "Reel: why a financial checkup matters.",
        Tuesday: "Reel: common money leaks families miss.",
        Wednesday: "Story Reel: how a 20-minute conversation can help.",
        Thursday: "Reel: protection gaps most people ignore.",
        Friday: "Reel: invite people to book a free conversation.",
        Saturday: "Personal Reel: who I help and why.",
        Sunday: "Recap Reel: open appointment spots this week.",
      },
      Spanish: {
        Monday: "Reel: por qué una revisión financiera importa.",
        Tuesday: "Reel: errores de dinero que muchas familias no ven.",
        Wednesday: "Reel: cómo una conversación de 20 minutos puede ayudar.",
        Thursday: "Reel: brechas de protección que muchos ignoran.",
        Friday: "Reel: invitación a una conversación gratis.",
        Saturday: "Reel personal: a quién ayudo y por qué.",
        Sunday: "Resumen: espacios disponibles esta semana.",
      },
    },
  },

  TikTok: {
    "Recruit new agents": {
      English: {
        Monday: "TikTok hook: If your paycheck disappears every week, watch this.",
        Tuesday: "TikTok myth-buster: extra income does not always need a second job.",
        Wednesday: "TikTok story: what I wish I knew sooner about income.",
        Thursday: "TikTok challenge: ask yourself where you want to be in 12 months.",
        Friday: "TikTok opportunity: part-time business explanation.",
        Saturday: "TikTok personal: why I help families build options.",
        Sunday: "TikTok CTA: comment START for details.",
      },
      Spanish: {
        Monday: "TikTok hook: Si tu cheque desaparece cada semana, mira esto.",
        Tuesday: "TikTok mito: ingreso extra no siempre significa otro trabajo.",
        Wednesday: "TikTok historia: lo que me hubiera gustado saber antes.",
        Thursday: "TikTok reto: dónde quieres estar en 12 meses.",
        Friday: "TikTok oportunidad: cómo empezar medio tiempo.",
        Saturday: "TikTok personal: por qué ayudo a familias.",
        Sunday: "TikTok CTA: comenta EMPEZAR.",
      },
    },
    "Book appointments": {
      English: {
        Monday: "TikTok hook: Most people do not know where their money is going.",
        Tuesday: "TikTok tip: one simple money checkup.",
        Wednesday: "TikTok story: family protection mistake.",
        Thursday: "TikTok question: do you know your number?",
        Friday: "TikTok CTA: book a quick conversation.",
        Saturday: "TikTok trust post: what I help people review.",
        Sunday: "TikTok recap: free checkup slots available.",
      },
      Spanish: {
        Monday: "TikTok hook: Muchos no saben a dónde se va su dinero.",
        Tuesday: "TikTok consejo: una revisión simple de dinero.",
        Wednesday: "TikTok historia: error común de protección familiar.",
        Thursday: "TikTok pregunta: ¿sabes tu número?",
        Friday: "TikTok CTA: agenda una conversación rápida.",
        Saturday: "TikTok confianza: qué ayudo a revisar.",
        Sunday: "TikTok resumen: espacios disponibles.",
      },
    },
  },

  Facebook: {
    "Recruit new agents": {
      English: {
        Monday: "Facebook story post: why extra income matters for families.",
        Tuesday: "Education post: financial literacy and opportunity.",
        Wednesday: "Personal post: my mission and business journey.",
        Thursday: "Question post: who wants more options this year?",
        Friday: "Opportunity post: part-time business overview.",
        Saturday: "Community post: celebrate progress and growth.",
        Sunday: "CTA post: message me to learn more.",
      },
      Spanish: {
        Monday: "Post historia: por qué el ingreso extra importa.",
        Tuesday: "Post educativo: educación financiera y oportunidad.",
        Wednesday: "Post personal: mi misión y camino.",
        Thursday: "Pregunta: ¿quién quiere más opciones este año?",
        Friday: "Post oportunidad: negocio medio tiempo.",
        Saturday: "Post comunidad: celebrar progreso.",
        Sunday: "CTA: envíame mensaje para más información.",
      },
    },
    "Book appointments": {
      English: {
        Monday: "Facebook post: free financial checkup invitation.",
        Tuesday: "Education post: common protection gaps.",
        Wednesday: "Story post: why families delay planning.",
        Thursday: "Question post: when was your last review?",
        Friday: "CTA post: book a free appointment.",
        Saturday: "Trust post: what happens in a checkup.",
        Sunday: "Reminder post: appointment spots available.",
      },
      Spanish: {
        Monday: "Post: invitación a revisión financiera gratis.",
        Tuesday: "Post educativo: brechas comunes de protección.",
        Wednesday: "Historia: por qué las familias posponen planificar.",
        Thursday: "Pregunta: ¿cuándo fue tu última revisión?",
        Friday: "CTA: agenda una cita gratis.",
        Saturday: "Confianza: qué pasa en una revisión.",
        Sunday: "Recordatorio: espacios disponibles.",
      },
    },
  },

  LinkedIn: {
    "Recruit new agents": {
      English: {
        Monday: "Professional post: why entrepreneurship matters today.",
        Tuesday: "Education post: financial literacy as a career mission.",
        Wednesday: "Leadership post: building people, not just business.",
        Thursday: "Insight post: income diversification.",
        Friday: "Opportunity post: professional part-time business.",
        Saturday: "Personal brand post: values and mission.",
        Sunday: "CTA post: connect for a conversation.",
      },
      Spanish: {
        Monday: "Post profesional: por qué emprender importa hoy.",
        Tuesday: "Educación: alfabetización financiera como misión.",
        Wednesday: "Liderazgo: desarrollar personas, no solo negocio.",
        Thursday: "Insight: diversificación de ingresos.",
        Friday: "Oportunidad: negocio profesional medio tiempo.",
        Saturday: "Marca personal: valores y misión.",
        Sunday: "CTA: conecta conmigo para conversar.",
      },
    },
    "Book appointments": {
      English: {
        Monday: "Professional post: importance of financial reviews.",
        Tuesday: "Education post: protection and income planning.",
        Wednesday: "Insight post: why people delay decisions.",
        Thursday: "Question post: is your financial plan current?",
        Friday: "CTA post: schedule a conversation.",
        Saturday: "Trust post: what a review covers.",
        Sunday: "Reminder post: limited appointment openings.",
      },
      Spanish: {
        Monday: "Post profesional: importancia de revisiones financieras.",
        Tuesday: "Educación: protección y planificación de ingresos.",
        Wednesday: "Insight: por qué las personas posponen decisiones.",
        Thursday: "Pregunta: ¿tu plan financiero está actualizado?",
        Friday: "CTA: agenda una conversación.",
        Saturday: "Confianza: qué cubre una revisión.",
        Sunday: "Recordatorio: citas disponibles.",
      },
    },
  },
};

export default function ContentCalendarPage() {
  const [platform, setPlatform] = useState("Instagram Reels");
  const [goal, setGoal] = useState("Recruit new agents");
  const [language, setLanguage] = useState("English");

  const [plan, setPlan] = useState<Record<string, string>>({
    Monday: "Recruiting Reel",
    Tuesday: "Financial education post",
    Wednesday: "Behind-the-scenes story",
    Thursday: "Client problem / solution post",
    Friday: "Business opportunity video",
    Saturday: "Personal brand post",
    Sunday: "Weekly recap + CTA",
  });

  function generatePlan() {
    const selectedPlan =
      plans?.[platform]?.[goal]?.[language] ||
      plans["Instagram Reels"]["Recruit new agents"]["English"];

    setPlan(selectedPlan);
  }

  function copyPlan() {
    const text = days.map((day) => `${day}: ${plan[day]}`).join("\n");
    navigator.clipboard.writeText(text);
  }

  function sendToSocialPlanner(day: string) {
    localStorage.setItem("planner_platform", platform);
    localStorage.setItem("planner_language", language);
    localStorage.setItem("planner_goal", goal);
    localStorage.setItem("planner_topic", plan[day]);
    window.location.href = "/social-planner";
  }

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <section className="mx-auto max-w-6xl">
        <p className="text-sm font-bold uppercase tracking-widest text-blue-400">
          Social Automation
        </p>

        <h1 className="mt-3 text-5xl font-bold">Auto Content Calendar</h1>

        <p className="mt-4 text-zinc-400">
          Pick platform, goal, and language. The system builds your weekly strategy.
        </p>

        <div className="mt-8 grid gap-4 rounded-3xl bg-zinc-900 p-6 md:grid-cols-3">
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="rounded-xl bg-black p-4 text-white"
          >
            <option>Instagram Reels</option>
            <option>TikTok</option>
            <option>Facebook</option>
            <option>LinkedIn</option>
          </select>

          <select
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="rounded-xl bg-black p-4 text-white"
          >
            <option>Recruit new agents</option>
            <option>Book appointments</option>
          </select>

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="rounded-xl bg-black p-4 text-white"
          >
            <option>English</option>
            <option>Spanish</option>
          </select>

          <button
            onClick={generatePlan}
            className="rounded-xl bg-blue-600 px-6 py-3 font-bold hover:bg-blue-500 md:col-span-3"
          >
            Generate Weekly Plan
          </button>
        </div>

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

              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  onClick={() => sendToSocialPlanner(day)}
                  className="rounded-xl bg-purple-600 px-5 py-3 font-bold hover:bg-purple-500"
                >
                  Create Script for {day}
                </button>
              </div>
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