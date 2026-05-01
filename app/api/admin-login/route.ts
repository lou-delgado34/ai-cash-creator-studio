import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const formData = await req.formData();

  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");

  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const response = NextResponse.redirect(new URL("/dashboard", req.url), {
      status: 303,
    });

    response.cookies.set("admin_logged_in", "true", {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  }

  return NextResponse.redirect(new URL("/login?error=wrong", req.url), {
    status: 303,
  });
}