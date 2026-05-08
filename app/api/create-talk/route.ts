import { NextResponse } from "next/server";

function cleanScript(input: string) {
  let script = input || "";

  script = script
    .replace(/###/g, "")
    .replace(/\*\*/g, "")
    .replace(/HOOK:/gi, "")
    .replace(/CAPTION:/gi, "")
    .replace(/SCRIPT:/gi, "")
    .replace(/CTA:/gi, "")
    .replace(/Post 1/gi, "")
    .replace(/Post 2[\s\S]*/gi, "")
    .trim();

  if (script.length > 900) {
    script = script.slice(0, 900);
  }

  return script;
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
        { error: "Script is empty after cleanup." },
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
            voice_id: "en-US-GuyNeural",
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