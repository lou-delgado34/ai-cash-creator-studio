import { NextResponse } from "next/server";

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
          input: script,
          provider: {
            type: "microsoft",
            voice_id: "en-US-GuyNeural"
          }
        },
        config: {
          fluent: true,
          pad_audio: 0.5
        }
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data?.message || data?.error || "D-ID failed." },
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