import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const { image_url, script } = await req.json();

    const didKey = process.env.DID_API_KEY;
    const elevenKey = process.env.ELEVENLABS_API_KEY;

    if (!didKey) {
      return NextResponse.json({ error: "Missing DID_API_KEY." }, { status: 500 });
    }

    if (!elevenKey) {
      return NextResponse.json({ error: "Missing ELEVENLABS_API_KEY." }, { status: 500 });
    }

    const voiceRes = await fetch(
      "https://api.elevenlabs.io/v1/text-to-speech/EXAVITQu4vr4xnSDxMaL",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "xi-api-key": elevenKey,
        },
        body: JSON.stringify({
          text: script,
          model_id: "eleven_monolingual_v1",
          voice_settings: {
            stability: 0.45,
            similarity_boost: 0.85,
          },
        }),
      }
    );

    if (!voiceRes.ok) {
      const errorText = await voiceRes.text();
      return NextResponse.json(
        { error: "ElevenLabs voice failed.", details: errorText },
        { status: 500 }
      );
    }

    const audioBuffer = await voiceRes.arrayBuffer();
    const fileName = `voice-${Date.now()}.mp3`;

    const { error: uploadError } = await supabase.storage
      .from("voice-files")
      .upload(fileName, audioBuffer, {
        contentType: "audio/mpeg",
        upsert: true,
      });

    if (uploadError) {
      return NextResponse.json(
        { error: "Supabase audio upload failed.", details: uploadError.message },
        { status: 500 }
      );
    }

    const { data: publicAudio } = supabase.storage
      .from("voice-files")
      .getPublicUrl(fileName);

    const audioUrl = publicAudio.publicUrl;

    const didRes = await fetch("https://api.d-id.com/talks", {
      method: "POST",
      headers: {
        Authorization: `Basic ${didKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        source_url: image_url,
        script: {
          type: "audio",
          audio_url: audioUrl,
        },
      }),
    });

    const didData = await didRes.json();

    if (!didRes.ok) {
      return NextResponse.json(
        { error: "D-ID talking video failed.", details: didData },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ...didData,
      audio_url: audioUrl,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Create talking video crashed." },
      { status: 500 }
    );
  }
}