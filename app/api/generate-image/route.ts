import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { prompt } = body;

    if (!prompt) {
      return Response.json({ error: "Missing image prompt." });
    }

    const image = await openai.images.generate({
      model: "gpt-image-1",
      prompt,
      size: "1024x1536",
      quality: "low",
      n: 1,
    });

    const base64Image = image.data?.[0]?.b64_json;

    if (!base64Image) {
      return Response.json({ error: "No image returned." });
    }

    return Response.json({
      imageUrl: `data:image/png;base64,${base64Image}`,
    });
  } catch (error: any) {
    return Response.json({
      error: error.message || "Image generation failed.",
    });
  }
}