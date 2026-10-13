import type { Metadata } from "next";
import "./globals.css"; // <-- Pastikan baris ini ada!

export const metadata: Metadata = {
  title: "XI TKJ 3 Profile",
  description: "Class Profile XI TKJ 3",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}