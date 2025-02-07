import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ClientOnly } from "@/components/providers/client-only";
import { CustomCursor } from "@/components/ui/custom-cursor";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={`${inter.className} bg-background min-h-screen`}>
        <ClientOnly>
          <CustomCursor />
        </ClientOnly>
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
          <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl hover:opacity-80 transition-opacity">
              <span className="text-primary">KPH</span>
              <span className="text-sm font-normal">Products</span>
            </Link>
            <div className="flex items-center gap-6">
              <Link href="/products" className="hover:text-primary transition-colors">Products</Link>
              <Link href="https://kph.network" target="_blank" className="hover:text-primary transition-colors">About KPH</Link>
              <Link 
                href="/products/submit" 
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md transition-colors"
              >
                Submit Product
              </Link>
            </div>
          </nav>
        </header>
        <main className="pt-16">{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
