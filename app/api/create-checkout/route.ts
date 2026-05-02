import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const plan = body.plan || "standard";

    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

    if (!stripeSecretKey) {
      return NextResponse.json({
        error: "Missing STRIPE_SECRET_KEY in Vercel.",
      });
    }

    const stripe = new Stripe(stripeSecretKey);

    const priceMap: Record<string, string | undefined> = {
      standard: process.env.STRIPE_STANDARD_PRICE_ID,
      pro: process.env.STRIPE_PRO_PRICE_ID,
      elite: process.env.STRIPE_ELITE_PRICE_ID,
    };

    const priceId = priceMap[plan];

    if (!priceId) {
      return NextResponse.json({
        error: "Missing price ID for selected plan.",
      });
    }

    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      "https://ai-cash-creator-studio.vercel.app";

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${siteUrl}/success?plan=${plan}`,
      cancel_url: `${siteUrl}/pricing`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    return NextResponse.json({
      error: "Stripe checkout failed.",
    });
  }
}