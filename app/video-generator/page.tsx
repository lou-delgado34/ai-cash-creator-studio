"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

type SavedImage = {
  id: string;
  ai_model_name: string;
  prompt: string;
  image_url: string;
  created_at: string;
};

export default function VideoGeneratorPage() {
  const [images, setImages] = useState<SavedImage[]>([]);
  const [selectedImageId, setSelectedImageId] = useState("");
  const [script, setScript] = useState("");
  const [videoStyle, setVideoStyle] = useState("Talking Avatar");
  const [platform, setPlatform] = useState("TikTok / Instagram Reels");
  const [result, setResult] = useState("");
  const [status, setStatus] = useState("");

  async function loadImages() {
    const { data, error } = await supabase
      .from("generated_images")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setStatus("Error loading saved images: " + error.message);
      return;
    }

    setImages(data || []);

    if (data && data.length > 0) {
      setSelectedImageId(data[0].id);
    }
  }

  function getSelectedImage() {
    return images.find((item) => item.id === selectedImageId);
  }

  function buildWorkflow(type: "free" | "paid") {
    const image = getSelectedImage();

    if (!image) {
      return "No saved image selected. Go to Image Studio and generate an image first.";
    }

    const finalScript =
      script || "Paste the script your AI avatar should say in the video.";

    if (type === "free") {
      return `
FREE TALKING VIDEO WORKFLOW

AI MODEL:
${image.ai_model_name}

STEP 1:
Use this saved avatar image from your app.

IMAGE:
${image.image_url}

STEP 2:
Copy this script:

${finalScript}

STEP 3:
Use one manual tool:
- HeyGen
- D-ID
- CapCut AI tools
- Canva video tools

STEP 4:
Upload the image, paste the script, choose a clear voice, and export vertical 9:16.

VIDEO STYLE:
${videoStyle}

PLATFORM:
${platform}

SAFETY NOTE:
This is an AI-generated virtual creator. Do not claim this avatar is a real human.
Do not impersonate a real person or celebrity.
`.trim();
    }

    return `
PAID API READY VIDEO REQUEST

IMAGE URL:
${image.image_url}

AI MODEL NAME:
${image.ai_model_name}

SCRIPT:
${finalScript}

VIDEO STYLE:
${videoStyle}

PLATFORM:
${platform}

FORMAT:
Vertical 9:16

DIRECTION:
Create a talking avatar video using the selected AI-generated avatar image.
The avatar should speak the script clearly with natural mouth movement, facial expression, and eye contact.
The final video should be social-media ready for ${platform}.

SAFETY NOTE:
This is an AI-generated virtual character. Do not impersonate a real person.
`.trim();
  }

  async function saveProject(workflowResult: string) {
    const image = getSelectedImage();

    if (!image) {
      setStatus("No saved image selected.");
      return;
    }

    const saveResponse = await supabase.from("video_projects").insert([
      {
        ai_model_name: image.ai_model_name,
        image_url: image.image_url,
        script: script || "",
        video_style: videoStyle,
        platform,
        workflow_result: workflowResult,
        status: "draft",
      },
    ]);

    if (saveResponse.error) {
      setStatus("Project created, but save failed: " + saveResponse.error.message);
      return;
    }

    setStatus("Video project saved successfully.");
  }

  async function createFreeWorkflow() {
    const workflow = buildWorkflow("free");
    setResult(workflow);
    await saveProject(workflow);
  }

  async function createPaidApiPrompt() {
    const workflow = buildWorkflow("paid");
    setResult(workflow);
    await saveProject(workflow);
  }

  function copyResult() {
    navigator.clipboard.writeText(result);
  }

  useEffect(() => {
    loadImages();
  }, []);

  const selectedImage = getSelectedImage();

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <section className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
          Video Generator
        </p>

        <h1 className="mt-3 text-4xl font-bold">
          Talking Avatar Video System
        </h1>

        <p className="mt-3 max-w-2xl text-zinc-400">
          Prepare and save video projects using your saved AI avatar image and script.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-zinc-900 p-6">
            <h2 className="text-2xl font-bold">Video Setup</h2>

            <div className="mt-6 grid gap-4">
              <select
                value={selectedImageId}
                onChange={(e) => setSelectedImageId(e.target.value)}
                className="rounded-2xl border border-white/10 bg-black px-4 py-3 text-white outline-none"
              >
                {images.length === 0 && (
                  <option value="">No saved images found</option>
                )}

                {images.map((image) => (
                  <option key={image.id} value={image.id}>
                    {image.ai_model_name}
                  </option>
                ))}
              </select>

              <select
                value={videoStyle}
                onChange={(e) => setVideoStyle(e.target.value)}
                className="rounded-2xl border border-white/10 bg-black px-4 py-3 text-white outline-none"
              >
                <option>Talking Avatar</option>
                <option>Luxury Influencer</option>
                <option>Financial Education</option>
                <option>Motivational Speaker</option>
                <option>Podcast Style</option>
                <option>Social Media Ad</option>
              </select>

              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="rounded-2xl border border-white/10 bg-black px-4 py-3 text-white outline-none"
              >
                <option>TikTok / Instagram Reels</option>
                <option>YouTube Shorts</option>
                <option>Facebook Reels</option>
                <option>Instagram Story</option>
                <option>LinkedIn Video</option>
              </select>
            </div>

            <textarea
              value={script}
              onChange={(e) => setScript(e.target.value)}
              className="mt-4 min-h-40 w-full rounded-2xl border border-white/10 bg-black px-4 py-3 text-white outline-none"
              placeholder="Paste the script your AI avatar should say..."
            />

            <div className="mt-5 flex flex-wrap gap-3">
              <button
                onClick={createFreeWorkflow}
                className="rounded-2xl bg-green-600 px-6 py-3 font-semibold hover:bg-green-500"
              >
                Free Workflow + Save
              </button>

              <button
                onClick={createPaidApiPrompt}
                className="rounded-2xl bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-500"
              >
                Paid API Ready + Save
              </button>
            </div>

            {status && (
              <p className="mt-4 rounded-2xl border border-white/10 bg-black p-4 text-sm text-zinc-300">
                {status}
              </p>
            )}
          </div>

          <div className="rounded-3xl border border-white/10 bg-zinc-900 p-6">
            <h2 className="text-2xl font-bold">Selected Avatar Image</h2>

            <div className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-black">
              {selectedImage ? (
                <img
                  src={selectedImage.image_url}
                  alt={selectedImage.ai_model_name}
                  className="w-full object-cover"
                />
              ) : (
                <div className="flex min-h-[500px] items-center justify-center p-6 text-center text-zinc-500">
                  No saved image selected.
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-white/10 bg-zinc-900 p-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-bold">Video Workflow Result</h2>

            <button
              onClick={copyResult}
              className="rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm hover:bg-white/15"
            >
              Copy
            </button>
          </div>

          <pre className="mt-5 whitespace-pre-wrap rounded-2xl bg-black p-5 text-sm text-zinc-300">
            {result || "Your video workflow will appear here."}
          </pre>
        </div>
      </section>
    </main>
  );
}