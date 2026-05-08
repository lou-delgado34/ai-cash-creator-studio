import { NextResponse } from "next/server";

function isSpanish(text: string) {
  const lower = text.toLowerCase();
  return [
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
    "ganar",
    "hogar",
  ].some((word) => lower.includes(word));
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

  if (text.length > 500) {
    text = text.slice(0, 500);
  }

  return text;
}

async function createDidTalk({
  didKey,
  imageUrl,
  script,
  voiceId,
}: {
  didKey: string;
  imageUrl: string;
  script: string;
  voiceId: string;
}) {
  const response = await fetch("https://api.d-id.com/talks", {
    method: "POST",
    headers: {
      Authorization: `Basic ${didKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      source_url: imageUrl,
      script: {
        type: "text",
        input: script,
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

  return {
    ok: response.ok,
    data,
    voiceId,
  };
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

    const spanish = isSpanish(finalScript);

    const voiceList = spanish
      ? [
          "es-MX-JorgeNeural",
          "es-US-AlonsoNeural",
          "es-ES-AlvaroNeural",
          "es-MX-DaliaNeural",
          "es-US-PalomaNeural",
        ]
      : ["en-US-GuyNeural", "en-US-JennyNeural"];

    const errors: any[] = [];

    for (const voiceId of voiceList) {
      const attempt = await createDidTalk({
        didKey,
        imageUrl: image_url,
        script: finalScript,
        voiceId,
      });

      if (attempt.ok) {
        return NextResponse.json({
          ...attempt.data,
          voice_used: voiceId,
          script_used: finalScript,
        });
      }

      errors.push({
        voiceId,
        error: attempt.data,
      });
    }

    return NextResponse.json(
      {
        error: "D-ID failed with all voices.",
        script_used: finalScript,
        tried_voices: voiceList,
        details: errors,
      },
      { status: 500 }
    );
  } catch {
    return NextResponse.json(
      { error: "Create talk route crashed." },
      { status: 500 }
    );
  }
}