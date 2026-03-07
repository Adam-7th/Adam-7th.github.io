import type { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
import { Cairo, Manrope, Unbounded } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { CursorAura } from "./components/CursorAura";
import { ScrollBookReveal } from "./components/ScrollBookReveal";
import { StickyVerticalNav } from "./components/StickyVerticalNav";
import type { Lang } from "@/lib/i18n";
import type { CurrencyCode } from "@/lib/siteContent";

type ThemeMode = "light" | "dark";

const display = Unbounded({
  variable: "--font-display",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

const body = Manrope({
  variable: "--font-body",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
});

const arabic = Cairo({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "ZEC | AI Automation Agency",
  description: "Premium automation-native agency for websites, CRM, and AI workflows.",
  icons: {
    icon: "/logos/zec-logo.svg",
    shortcut: "/logos/zec-logo.svg",
    apple: "/logos/zec-logo.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const parseLang = (value?: string): Lang => {
  if (!value) return "en";
  if (value.startsWith("ru")) return "ru";
  if (value.startsWith("ar")) return "ar";
  return "en";
};

const parseTheme = (value?: string): ThemeMode => (value === "dark" ? "dark" : "light");
const parseCurrency = (value?: string): CurrencyCode | null => {
  if (value === "RUB" || value === "USD" || value === "EUR" || value === "AED") {
    return value;
  }
  return null;
};
const parseCountryCode = (value?: string): string | null => {
  if (!value) return null;
  const normalized = value.trim().toUpperCase();
  return /^[A-Z]{2}$/.test(normalized) ? normalized : null;
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ZEC AI Automation Agency",
  url: siteUrl,
  logo: `${siteUrl}/logos/zec-logo.png`,
  description: "AI automation agency building n8n workflows, AI agents, and business integrations.",
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "AI Workflow Automation",
  provider: {
    "@type": "Organization",
    name: "ZEC AI Automation Agency",
  },
  areaServed: "Global",
  description: "Automation audit, workflow design, integration delivery, and optimization for AI-enabled operations.",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies();
  const initialLang = parseLang(cookieStore.get("zec-lang")?.value);
  const initialCurrency = parseCurrency(cookieStore.get("zec-currency")?.value);
  const initialCountryCode = parseCountryCode(cookieStore.get("zec-country")?.value);
  const initialTheme = parseTheme(cookieStore.get("zec-theme")?.value);

  return (
    <html
      lang={initialLang}
      dir={initialLang === "ar" ? "rtl" : "ltr"}
      className={initialTheme === "dark" ? "dark" : ""}
      suppressHydrationWarning={true}
    >
      <body className={`${display.variable} ${body.variable} ${arabic.variable} font-body`} suppressHydrationWarning={true}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
        <Providers
          initialLang={initialLang}
          initialCurrency={initialCurrency}
          initialCountryCode={initialCountryCode}
          initialTheme={initialTheme}
        >
          <div className="min-h-screen bg-bg text-text">
            <CursorAura />
            <ScrollBookReveal />
            <StickyVerticalNav />
            <Header />
            <main className="page-transition-shell mx-auto w-full max-w-[1320px] px-4 pb-20 pt-10 sm:px-6 lg:px-8">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}

