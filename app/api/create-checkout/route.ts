import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

export async function POST(req: Request) {
  const { plan } = await req.json();

  let priceId = "";

  if (plan === "standard") {
    priceId = process.env.STRIPE_STANDARD_PRICE_ID!;
  } else if (plan === "pro") {
    priceId = process.env.STRIPE_PRO_PRICE_ID!;
  } else if (plan === "elite") {
    priceId = process.env.STRIPE_ELITE_PRICE_ID!;
  }

  if (!priceId) {
    return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/pricing`,
  });

  return NextResponse.json({ url: session.url });
}