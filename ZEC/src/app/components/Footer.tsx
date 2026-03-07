"use client";

import Link from "next/link";
import { PUBLIC_CONTACT_MAILTO, PUBLIC_LINKEDIN_URL, PUBLIC_TELEGRAM_URL, PUBLIC_WHATSAPP_URL } from "@/lib/contactConfig";
import { useLang } from "@/lib/lang";
import { SITE_CONTENT } from "@/lib/siteContent";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

const footerLabels = {
  en: {
    company: "Company",
    services: "Services",
    workflows: "Workflows",
    resources: "Resources",
    legal: "Legal",
    social: "Social",
    workflowLead: "Lead Capture",
    workflowSupport: "Support + AI",
    articleOne: "n8n vs Zapier",
    articleTwo: "Growth stack",
  },
  ru: {
    company: "Компания",
    services: "Услуги",
    workflows: "Workflows",
    resources: "Ресурсы",
    legal: "Правовое",
    social: "Соцсети",
    workflowLead: "Захват лидов",
    workflowSupport: "Поддержка + AI",
    articleOne: "n8n vs Zapier",
    articleTwo: "Growth stack",
  },
  ar: {
    company: "الشركة",
    services: "الخدمات",
    workflows: "المسارات",
    resources: "الموارد",
    legal: "القانوني",
    social: "الشبكات",
    workflowLead: "التقاط العملاء",
    workflowSupport: "الدعم + AI",
    articleOne: "n8n مقابل Zapier",
    articleTwo: "حزمة النمو",
  },
} as const;

export function Footer() {
  const { lang } = useLang();
  const t = SITE_CONTENT[lang];
  const labels = footerLabels[lang];

  return (
    <footer className="border-t border-edge bg-panel/90">
      <div className="mx-auto grid w-full max-w-[1200px] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.2fr_repeat(5,minmax(0,1fr))] lg:px-8">
        <div className="space-y-4">
          <Logo />
          <p className="text-sm text-muted">{t.brand.trustNote}</p>
          <ThemeToggle />
        </div>

        <div className="space-y-2 text-sm">
          <p className="text-xs uppercase tracking-[0.22em] text-muted">{labels.company}</p>
          <Link href="/about" className="block hover:text-brand">{t.nav.about}</Link>
          <Link href="/contact" className="block hover:text-brand">{t.nav.contact}</Link>
          <Link href="/faq" className="block hover:text-brand">{t.nav.faq}</Link>
        </div>

        <div className="space-y-2 text-sm">
          <p className="text-xs uppercase tracking-[0.22em] text-muted">{labels.services}</p>
          <Link href="/solutions" className="block hover:text-brand">{t.nav.solutions}</Link>
          <Link href="/pricing" className="block hover:text-brand">{t.nav.pricing}</Link>
          <Link href="/case-studies" className="block hover:text-brand">{t.nav.caseStudies}</Link>
        </div>

        <div className="space-y-2 text-sm">
          <p className="text-xs uppercase tracking-[0.22em] text-muted">{labels.workflows}</p>
          <Link href="/workflows" className="block hover:text-brand">{t.nav.workflows}</Link>
          <Link href="/workflows#lead-capture-crm-telegram" className="block hover:text-brand">{labels.workflowLead}</Link>
          <Link href="/workflows#support-ai-human-approval" className="block hover:text-brand">{labels.workflowSupport}</Link>
        </div>

        <div className="space-y-2 text-sm">
          <p className="text-xs uppercase tracking-[0.22em] text-muted">{labels.resources}</p>
          <Link href="/blog" className="block hover:text-brand">{t.nav.blog}</Link>
          <Link href="/blog/what-is-n8n-vs-zapier" className="block hover:text-brand">{labels.articleOne}</Link>
          <Link href="/blog/website-automation-modern-growth-stack" className="block hover:text-brand">{labels.articleTwo}</Link>
        </div>

        <div className="space-y-2 text-sm">
          <p className="text-xs uppercase tracking-[0.22em] text-muted">{labels.legal}</p>
          <Link href="/privacy-policy" className="block hover:text-brand">{t.nav.privacy}</Link>
          <Link href="/terms-of-service" className="block hover:text-brand">{t.nav.terms}</Link>
          <p className="pt-2 text-[11px] text-muted">{labels.social}</p>
          <div className="flex gap-3 text-xs">
            <a href={PUBLIC_WHATSAPP_URL} target="_blank" rel="noreferrer" className="hover:text-brand">WhatsApp</a>
            <a href={PUBLIC_CONTACT_MAILTO} className="hover:text-brand">Email</a>
            <a href={PUBLIC_TELEGRAM_URL} target="_blank" rel="noreferrer" className="hover:text-brand">Telegram</a>
            <a href={PUBLIC_LINKEDIN_URL} target="_blank" rel="noreferrer" className="hover:text-brand">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
