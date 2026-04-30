import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { modelData, contentType, topic } = body;

    const prompt = `
Create viral social media content for this AI virtual influencer.

AI MODEL:
Name: ${modelData.name}
Niche: ${modelData.niche}
Platform: ${modelData.platform}
Personality: ${modelData.personality}
Style: ${modelData.style}
Backstory: ${modelData.backstory}

CONTENT TYPE:
${contentType}

TOPIC:
${topic || "Help the audience take action today"}

RULES:
- Make it clear this is for an AI-generated virtual character.
- Do not pretend the AI model is a real person.
- Make it strong, simple, and social-media ready.
- Include Hook, Content, CTA, and Safety Note.
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You create strong social media content for original AI virtual influencers.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    return Response.json({
      result: response.choices[0].message.content,
    });
  } catch (error: any) {
    return Response.json({
      error: error.message || "Something went wrong.",
    });
  }
}