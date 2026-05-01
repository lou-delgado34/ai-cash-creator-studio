import "./globals.css";
import Link from "next/link";

const mainLinks = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/ai-models", label: "AI Models" },
  { href: "/prompt-studio", label: "Content" },
  { href: "/image-studio", label: "Images" },
  { href: "/voice-studio", label: "Voice" },
  { href: "/video-generator", label: "Video" },
  { href: "/history", label: "History" },
  { href: "/pricing", label: "Pricing" },
  { href: "/admin", label: "Admin" },
  { href: "/login", label: "Login" },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/90 px-6 py-4">
          <div className="flex flex-wrap gap-3">
            {mainLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-semibold hover:bg-zinc-800"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>

        {children}
      </body>
    </html>
  );
}