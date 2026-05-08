import { NextResponse } from "next/server";

function detectSpanish(text: string) {
  const lower = text.toLowerCase();

  const spanishSignals = [
    "hola",
    "amigos",
    "dinero",
    "ingresos",
    "familia",
    "puedes",
    "quieres",
    "oportunidad",
    "negocio",
    "financiera",
    "educación",
    "protección",
    "mensaje",
    "equipo",
    "unirte",
    "ganar",
    "casa",
  ];

  return spanishSignals.some((word) => lower.includes(word));
}

function cleanScript(input: string) {
  let text = input || "";

  text = text
    .replace(/\*\*/g, "")
    .replace(/###/g, "")
    .replace(/HOOK:/gi, "")
    .replace(/CAPTION:/gi, "")
    .replace(/SCRIPT:/gi, "")
    .replace(/CTA:/gi, "")
    .replace(/CALL TO ACTION:/gi, "")
    .replace(/GUION:/gi, "")
    .replace(/GUIÓN:/gi, "")
    .replace(/LLAMADO A LA ACCIÓN:/gi, "")
    .replace(/Post \d+/gi, "")
    .replace(/Publicación \d+/gi, "")
    .replace(/["“”]/g, "")
    .trim();

  if (text.length > 550) {
    text = text.slice(0, 550);
  }

  return text;
}

export async function POST(req: Request) {
  try {
    const { image_url, script } = await req.json();

    const didKey = process.env.DID_API_KEY;

    if (!didKey) {
      return NextResponse.json(
        { error: "Missing DID_API_KEY." },
        { status: 500 }
      );
    }

    const finalScript = cleanScript(script);

    if (!image_url) {
      return NextResponse.json(
        { error: "Missing avatar image." },
        { status: 400 }
      );
    }

    if (!finalScript) {
      return NextResponse.json(
        { error: "No clean script found." },
        { status: 400 }
      );
    }

    const isSpanish = detectSpanish(finalScript);

    const voiceId = isSpanish ? "es-MX-JorgeNeural" : "en-US-GuyNeural";

    const response = await fetch("https://api.d-id.com/talks", {
      method: "POST",
      headers: {
        Authorization: `Basic ${didKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        source_url: image_url,
        script: {
          type: "text",
          input: finalScript,
          provider: {
            type: "microsoft",
            voice_id: voiceId,
          },
        },
        config: {
          fluent: true,
          pad_audio: 0.5,
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          error: "D-ID failed.",
          details: data,
          voice_used: voiceId,
          script_used: finalScript,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Create talk route crashed." },
      { status: 500 }
    );
  }
}