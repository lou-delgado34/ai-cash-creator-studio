import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const { platform, language, goal, audience, topic } = body;

  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Missing OPENAI_API_KEY" },
      { status: 500 }
    );
  }

  const prompt = `
You are a social media expert.

Create HIGH-CONVERTING content.

Platform: ${platform}
Language: ${language}
Goal: ${goal}
Audience: ${audience}
Topic: ${topic}

Return:

1. HOOK (viral opening line)
2. CAPTION (short engaging caption)
3. SCRIPT (talking video script)
4. CTA (call to action to recruit or convert)

Keep it clean, persuasive, and social-media ready.
`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    }),
  });

  const data = await response.json();

  return NextResponse.json({
    content: data.choices?.[0]?.message?.content || "No content generated",
  });
}