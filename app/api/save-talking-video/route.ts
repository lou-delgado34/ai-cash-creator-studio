import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const body = await req.json();

  const { error } = await supabase.from("talking_videos").insert({
    email: body.email,
    avatar_name: body.avatar_name,
    avatar_image_url: body.avatar_image_url,
    script: body.script,
    talk_id: body.talk_id,
    video_url: body.video_url,
    status: body.status || "completed",
  });

  if (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}