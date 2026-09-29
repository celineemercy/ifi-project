import type { Metadata } from "next";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";

import { Toaster } from "@/components/ui/sonner";
import { brand } from "@/config/brand";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: `${brand.name} — Service Training Platform`,
    template: `%s | ${brand.name}`,
  },
  description:
    "A Pradita University prototype for continuous IFI service learning, deterministic practice, assessment, and improvement.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="bg-background h-full"
      data-scroll-behavior="smooth"
    >
      <body className="bg-background text-foreground min-h-full antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
