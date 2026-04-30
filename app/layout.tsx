import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Cash Creator Studio",
  description: "AI virtual influencer business dashboard",
};

const mainLinks = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/ai-models", label: "AI Models" },
  { href: "/prompt-studio", label: "Content" },
  { href: "/image-studio", label: "Images" },
  { href: "/voice-studio", label: "Voice" },
  { href: "/video-generator", label: "Video" },
  { href: "/history", label: "History" },
  { href: "/admin", label: "Admin" },
  { href: "/login", label: "Login" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/90 px-6 py-4 backdrop-blur">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <Link href="/" className="text-xl font-bold">
                AI Cash Creator Studio
              </Link>

              <div className="flex flex-wrap gap-2 text-sm text-zinc-300">
                {mainLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={
                      link.label === "Admin"
                        ? "rounded-full bg-blue-600/20 px-3 py-2 text-blue-300 hover:bg-blue-600/30"
                        : link.label === "Login"
                        ? "rounded-full bg-green-600/20 px-3 py-2 text-green-300 hover:bg-green-600/30"
                        : "rounded-full px-3 py-2 hover:bg-white/10 hover:text-white"
                    }
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>

        {children}
      </body>
    </html>
  );
}