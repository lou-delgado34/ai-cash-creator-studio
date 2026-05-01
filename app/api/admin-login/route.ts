import { cookies } from "next/headers";

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password } = body;

  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    cookies().set("admin_logged_in", "true", {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return Response.json({ success: true });
  }

  return Response.json({ success: false, error: "Wrong email or password." });
}