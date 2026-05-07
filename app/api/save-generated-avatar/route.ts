import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const { email, avatar_name, image_url, character_notes } = await req.json();

  const base64 = image_url.replace(/^data:image\/\w+;base64,/, "");
  const buffer = Buffer.from(base64, "base64");
  const fileName = `avatar-${Date.now()}.png`;

  const { error: uploadError } = await supabase.storage
    .from("avatar-images")
    .upload(fileName, buffer, {
      contentType: "image/png",
      upsert: true,
    });

  if (uploadError) {
    return NextResponse.json(
      { success: false, error: uploadError.message },
      { status: 500 }
    );
  }

  const { data } = supabase.storage
    .from("avatar-images")
    .getPublicUrl(fileName);

  const publicUrl = data.publicUrl;

  const { error } = await supabase.from("ai_avatars").insert({
    email,
    avatar_name,
    image_url: publicUrl,
    character_notes,
  });

  if (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true, image_url: publicUrl });
}