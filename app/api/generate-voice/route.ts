import { NextResponse } from "next/server";

function cleanVoiceText(text: string) {
  return String(text || "")
    .replace(/[^\p{L}\p{N}\p{P}\p{Zs}\n]/gu, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 1200);
}

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    const apiKey = process.env.ELEVENLABS_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Missing ELEVENLABS_API_KEY in Vercel." },
        { status: 500 }
      );
    }

    const cleanText = cleanVoiceText(text);

    if (!cleanText) {
      return NextResponse.json({ error: "Missing voice text." }, { status: 400 });
    }

    const voiceId =
      process.env.ELEVENLABS_VOICE_ID || "21m00Tcm4TlvDq8ikWAM";

    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=mp3_44100_128`,
      {
        method: "POST",
        headers: {
          "xi-api-key": apiKey,
          "Content-Type": "application/json",
          Accept: "audio/mpeg",
        },
        body: JSON.stringify({
          text: cleanText,
          model_id: "eleven_multilingual_v2",
          voice_settings: {
            stability: 0.35,
            similarity_boost: 0.85,
            style: 0.75,
            use_speaker_boost: true,
          },
        }),
      }
    );

    if (!response.ok) {
      const details = await response.text();

      return NextResponse.json(
        {
          error: "ElevenLabs rejected the request.",
          details,
        },
        { status: 500 }
      );
    }

    const audio = await response.arrayBuffer();

    return new Response(audio, {
      headers: {
        "Content-Type": "audio/mpeg",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Voice generation crashed." },
      { status: 500 }
    );
  }
}