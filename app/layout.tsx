import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Cash Creator Studio",
  description: "AI system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <nav className="flex flex-wrap gap-2 p-4 border-b border-gray-800">
          <Link href="/" className="nav">Home</Link>
          <Link href="/dashboard" className="nav">Dashboard</Link>
          <Link href="/ai-models" className="nav">AI Models</Link>
          <Link href="/prompt-studio" className="nav">Content</Link>
          <Link href="/image-studio" className="nav">Images</Link>
          <Link href="/voice-studio" className="nav">Voice</Link>
          <Link href="/video-generator" className="nav">Video</Link>
          <Link href="/pricing" className="nav">Pricing</Link>
          <Link href="/history" className="nav">History</Link>
          <Link href="/admin" className="nav">Admin</Link>
          <Link href="/login" className="nav">Login</Link>
        </nav>

        <div className="p-6">{children}</div>
      </body>
    </html>
  );
}