import type { Metadata } from "next";
import { Cairo, Manrope, Unbounded } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Chatbot } from "./components/Chatbot";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";

const display = Unbounded({
  variable: "--font-display",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

const body = Manrope({
  variable: "--font-body",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600"],
});

const arabic = Cairo({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Hulubet Automation Agency",
  description: "Automation agency for content, marketing, and operations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${display.variable} ${body.variable} ${arabic.variable} font-body`}>
        <Providers>
          <div className="min-h-screen bg-bg text-text">
            <div className="relative overflow-hidden">
              <div className="pointer-events-none absolute left-[-10%] top-[-10%] h-[36rem] w-[36rem] rounded-full bg-brand/20 blur-[120px]" />
              <div className="pointer-events-none absolute right-[-10%] top-24 h-[30rem] w-[30rem] rounded-full bg-brand2/20 blur-[140px]" />
              <Header />
              <main className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-6 lg:px-12">
                {children}
              </main>
              <Chatbot />
            </div>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
