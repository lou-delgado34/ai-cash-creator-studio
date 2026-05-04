import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const { email } = await req.json();

  const { data } = await supabase
    .from("user_subscriptions")
    .select("*")
    .eq("email", email)
    .eq("status", "active")
    .single();

  if (!data) {
    return NextResponse.json({ active: false });
  }

  return NextResponse.json({
    active: true,
    plan: data.plan,
  });
}