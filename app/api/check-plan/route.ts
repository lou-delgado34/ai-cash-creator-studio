import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Missing email" }, { status: 400 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data, error } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("email", email)
      .eq("status", "active")
      .single();

    if (error || !data) {
      return NextResponse.json({
        active: false,
        error: "No active plan found",
      });
    }

    return NextResponse.json({
      active: true,
      plan: data.plan,
    });
  } catch (err) {
    return NextResponse.json({
      error: "Server error",
    });
  }
}