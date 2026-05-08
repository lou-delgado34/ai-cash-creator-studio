import { NextResponse } from "next/server";

function isSpanish(text: string) {
  const spanishWords = [
    "que",
    "puedes",
    "dinero",
    "familia",
    "protección",
    "educación",
    "financiera",
    "oportunidad",
    "ingresos",
    "mensaje",
    "aprende",
    "hola",
    "quieres",
    "trabajo",
    "negocio",
  ];

  const lower = text.toLowerCase();

  return spanishWords.some((word) => lower.includes(word));
}

function extractScript(input: string) {
  let text = input || "";

  text = text
    .replace(/\*\*/g, "")
    .replace(/###/g, "")
    .replace(/["“”]/g, "")
    .trim();

  const scriptMatch =
    text.match(/SCRIPT:\s*([\s\S]*?)(CTA:|CALL TO ACTION:|CAPTION:|HOOK:|$)/i) ||
    text.match(/GUIÓN:\s*([\s\S]*?)(CTA:|LLAMADO A LA ACCIÓN:|CAPTION:|HOOK:|$)/i) ||
    text.match(/GUION:\s*([\s\S]*?)(CTA:|LLAMADO A LA ACCIÓN:|CAPTION:|HOOK:|$)/i);

  if (scriptMatch?.[1]) {
    text = scriptMatch[1].trim();
  }

  text = text
    .replace(/HOOK:[\s\S]*?(CAPTION:|SCRIPT:|GUIÓN:|GUION:)/i, "")
    .replace(/CAPTION:[\s\S]*?(SCRIPT:|GUIÓN:|GUION:)/i, "")
    .replace(/CTA:[\s\S]*/i, "")
    .replace(/CALL TO ACTION:[\s\S]*/i, "")
    .replace(/LLAMADO A LA ACCIÓN:[\s\S]*/i, "")
    .replace(/Post 1/gi, "")
    .replace(/Post 2[\s\S]*/gi, "")
    .replace(/Publicación 1/gi, "")
    .replace(/Publicación 2[\s\S]*/gi, "")
    .trim();

  if (text.length > 700) {
    text = text.slice(0, 700);
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

    const finalScript = extractScript(script);
    const spanish = isSpanish(finalScript);

    const voiceId = spanish ? "es-US-AlonsoNeural" : "en-US-GuyNeural";

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
        { error: data?.message || data?.error || "D-ID failed.", details: data },
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