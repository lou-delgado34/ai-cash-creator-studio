import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    if (!text) {
      return NextResponse.json({ error: "Missing text." }, { status: 400 });
    }

    const apiKey = process.env.ELEVENLABS_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "API key not found in Vercel." },
        { status: 500 }
      );
    }

    const response = await fetch(
      "https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM",
      {
        method: "POST",
        headers: {
          "xi-api-key": apiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          model_id: "eleven_multilingual_v2",
          voice_settings: {
            stability: 0.2,
            similarity_boost: 0.9,
            style: 1,
            use_speaker_boost: true,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: "ElevenLabs API error", details: errorText },
        { status: 500 }
      );
    }

    const audio = await response.arrayBuffer();

    return new Response(audio, {
      headers: {
        "Content-Type": "audio/mpeg",
      },
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Voice generation crashed." },
      { status: 500 }
    );
  }
}