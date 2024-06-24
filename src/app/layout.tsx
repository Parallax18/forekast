import type { Metadata } from "next";
import { Barlow } from "next/font/google";
import "./globals.css";
import ProviderRoot from "@/providers";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Weather app",
  description: "Basic weather app with weather Api",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProviderRoot>
      <html lang="en">
        <body className={barlow.className}>{children}</body>
      </html>
    </ProviderRoot>
  );
}
