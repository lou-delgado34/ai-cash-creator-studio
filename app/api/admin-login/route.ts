import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  if (
    body.email === process.env.ADMIN_EMAIL &&
    body.password === process.env.ADMIN_PASSWORD
  ) {
    const response = NextResponse.json({ success: true });

    response.cookies.set("admin_logged_in", "true", {
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "lax",
      secure: true,
    });

    return response;
  }

  return NextResponse.json({
    success: false,
    error: "Wrong email or password.",
  });
}