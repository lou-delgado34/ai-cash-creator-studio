import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password } = body;

  const correctEmail = process.env.ADMIN_EMAIL;
  const correctPassword = process.env.ADMIN_PASSWORD;

  if (email === correctEmail && password === correctPassword) {
    const response = NextResponse.json({ success: true });

    response.cookies.set("admin_logged_in", "true", {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  }

  return NextResponse.json({
    success: false,
    error: "Wrong email or password.",
  });
}