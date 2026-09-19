import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NotiMate — AI operations for your LINE team",
  description: "NotiMate turns important events in team LINE chats into structured records, alerts and reports in the owner's preferred language.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
