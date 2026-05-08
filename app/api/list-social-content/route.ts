import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  const { data, error } = await supabase
    .from("social_content")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ content: [], error: error.message });
  }

  return NextResponse.json({ content: data || [] });
}