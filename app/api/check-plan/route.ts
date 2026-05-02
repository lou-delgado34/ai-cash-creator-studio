import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  const { email } = await req.json();

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.SUPABASE_SERVICE_ROLE_KEY || ""
  );

  const { data } = await supabase
    .from("user_subscriptions")
    .select("plan,status")
    .eq("email", email)
    .single();

  if (!data || data.status !== "active") {
    return NextResponse.json({ plan: "free", active: false });
  }

  return NextResponse.json({
    plan: data.plan,
    active: true,
  });
}