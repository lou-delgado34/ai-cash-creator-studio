import "./globals.css";

export const metadata = {
  title: "AI Cash Creator Studio",
  description: "AI Creator Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <header className="border-b border-white/10 bg-zinc-950">
          <nav className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-6 py-4">
            <a
              href="/"
              className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-bold hover:bg-zinc-800"
            >
              Home
            </a>

            <a
              href="/pricing"
              className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-bold hover:bg-zinc-800"
            >
              Pricing
            </a>

            <a
              href="/image-studio"
              className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-bold hover:bg-zinc-800"
            >
              Image Studio
            </a>

            <a
              href="/avatar-builder"
              className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-bold hover:bg-zinc-800"
            >
              Avatar Builder
            </a>

            <a
              href="/dashboard"
              className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-bold hover:bg-zinc-800"
            >
              Dashboard
            </a>
          </nav>
        </header>

        {children}
      </body>
    </html>
  );
}