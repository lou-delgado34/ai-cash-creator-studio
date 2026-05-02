import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
  const formData = await req.formData();
  const plan = String(formData.get("plan") || "standard");

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

  const priceMap: Record<string, string | undefined> = {
    standard: process.env.STRIPE_STANDARD_PRICE_ID,
    pro: process.env.STRIPE_PRO_PRICE_ID,
    elite: process.env.STRIPE_ELITE_PRICE_ID,
  };

  const priceId = priceMap[plan];

  if (!priceId) {
    return NextResponse.redirect(new URL("/pricing?error=missing-price", req.url));
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://ai-cash-creator-studio.vercel.app";

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${siteUrl}/dashboard?checkout=success`,
    cancel_url: `${siteUrl}/pricing?checkout=cancelled`,
  });

  return NextResponse.redirect(session.url || siteUrl);
}