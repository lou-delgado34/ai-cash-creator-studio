import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    return new NextResponse("Webhook Error", { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any;

    const email = session.customer_details?.email;

    if (!email) {
      return NextResponse.json({ error: "No email found" });
    }

    // Determine plan from price ID
    let plan = "standard";

    if (session.line_items?.data?.[0]?.price?.id === process.env.STRIPE_PRO_PRICE_ID) {
      plan = "pro";
    }

    if (session.line_items?.data?.[0]?.price?.id === process.env.STRIPE_ELITE_PRICE_ID) {
      plan = "elite";
    }

    await supabase.from("user_subscriptions").upsert({
      email,
      plan,
      status: "active",
    });
  }

  return NextResponse.json({ received: true });
}