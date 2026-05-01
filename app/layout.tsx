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
      <body style={{ margin: 0, background: "#000", color: "#fff" }}>
        <nav
          style={{
            position: "sticky",
            top: 0,
            zIndex: 50,
            background: "#050505",
            borderBottom: "1px solid #222",
            padding: "16px 24px",
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          {mainLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                color: "#fff",
                background: "#111827",
                padding: "10px 16px",
                borderRadius: "999px",
                textDecoration: "none",
                fontWeight: 700,
                border: "1px solid #333",
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {children}
      </body>
    </html>
  );
}