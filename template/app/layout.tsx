"use client"

import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: process.env.APP_NAME,
  description: "new app",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="./favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  );
}