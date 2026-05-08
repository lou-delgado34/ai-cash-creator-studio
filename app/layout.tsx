import "./globals.css";

export const metadata = {
  title: "AI Cash Creator Studio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const links = [
    ["Home", "/"],
    ["Dashboard", "/dashboard"],
    ["Social Planner", "/social-planner"],
    ["Content Library", "/content-library"],
    ["Bulk Content", "/bulk-content"],
    ["AI Models", "/ai-models"],
    ["Image Studio", "/image-studio"],
    ["Avatar Builder", "/avatar-builder"],
    ["Talking Avatar", "/talking-avatar"],
    ["Video History", "/talking-history"],
    ["Pricing", "/pricing"],
  ];

  return (
    <html lang="en">
      <body className="min-h-screen bg-black text-white">
        <header className="sticky top-0 z-50 border-b border-white/10 bg-black/95">
          <nav className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-6 py-5">
            {links.map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="rounded-2xl border border-white/20 bg-zinc-900 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-black/40 hover:bg-blue-600"
              >
                {label}
              </a>
            ))}
          </nav>
        </header>

        {children}
      </body>
    </html>
  );
}