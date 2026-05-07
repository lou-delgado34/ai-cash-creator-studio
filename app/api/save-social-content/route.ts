import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const body = await req.json();

  const { error } = await supabase.from("social_content").insert({
    email: body.email,
    content_type: body.content_type,
    platform: body.platform,
    language: body.language,
    hook: body.hook,
    caption: body.caption,
    script: body.script,
    call_to_action: body.call_to_action,
    status: body.status || "draft",
  });

  if (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}