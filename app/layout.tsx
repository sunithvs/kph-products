import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ClientOnly } from "@/components/providers/client-only";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { Navbar } from "@/components/ui/navbar";
import { PageTransition } from "@/components/ui/page-transition";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins'
});

export const metadata: Metadata = {
  title: "Kerala Product Hunt - Discover Amazing Products from Kerala",
  description: "Discover and support innovative products and startups from Kerala. Join our community of makers, innovators, and tech enthusiasts."
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${poppins.className} bg-background min-h-screen`}>
        <ClientOnly>
          <CustomCursor />
        </ClientOnly>
        <Navbar />
        <main className="pt-16">
          <PageTransition>{children}</PageTransition>
        </main>
        <Analytics />
        <SpeedInsights />
        <Toaster />
      </body>
    </html>
  );
}
