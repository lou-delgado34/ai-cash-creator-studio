import { NextResponse } from "next/server";

function cleanScript(input: string) {
  let text = input || "";

  const scriptMatch =
    text.match(/SCRIPT:\s*([\s\S]*?)(CTA:|CALL TO ACTION:|CAPTION:|HOOK:|$)/i) ||
    text.match(/GUION:\s*([\s\S]*?)(CTA:|LLAMADO A LA ACCIÓN:|CAPTION:|HOOK:|$)/i) ||
    text.match(/GUIÓN:\s*([\s\S]*?)(CTA:|LLAMADO A LA ACCIÓN:|CAPTION:|HOOK:|$)/i);

  if (scriptMatch?.[1]) text = scriptMatch[1];

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
    .replace(/#\w+/g, "")
    .replace(/Post \d+/gi, "")
    .replace(/Publicación \d+/gi, "")
    .replace(/["“”]/g, "")
    .trim();

  return text.slice(0, 500);
}

export async function POST(req: Request) {
  try {
    const { image_url, script, voice_id } = await req.json();

    const didKey = process.env.DID_API_KEY;

    if (!didKey) {
      return NextResponse.json({ error: "Missing DID_API_KEY." }, { status: 500 });
    }

    const finalScript = cleanScript(script);

    if (!image_url) {
      return NextResponse.json({ error: "Missing avatar image." }, { status: 400 });
    }

    if (!finalScript) {
      return NextResponse.json({ error: "No clean script found." }, { status: 400 });
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
            voice_id: voice_id || "en-US-GuyNeural",
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
        { error: data?.description || data?.message || data?.error || "D-ID failed.", details: data },
        { status: 500 }
      );
    }

    return NextResponse.json({ ...data, script_used: finalScript });
  } catch {
    return NextResponse.json({ error: "Create talk route crashed." }, { status: 500 });
  }
}