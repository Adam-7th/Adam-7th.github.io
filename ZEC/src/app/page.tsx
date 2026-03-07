"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLang } from "@/lib/lang";
import { PUBLIC_CALENDLY_URL } from "@/lib/contactConfig";
import { SITE_CONTENT } from "@/lib/siteContent";
import { useLocalizedMeta } from "@/lib/useLocalizedMeta";
import { AutomationAuditCTA } from "./components/AutomationAuditCTA";
import { BlogInsightsPreview } from "./components/BlogInsightsPreview";
import { CaseStudyCard } from "./components/CaseStudyCard";
import { FeatureGrid } from "./components/FeatureGrid";
import { FAQAccordion } from "./components/FAQAccordion";
import { HeroVisual } from "./components/HeroVisual";
import { HomeLeadCaptureForm } from "./components/HomeLeadCaptureForm";
import { IndustriesGrid } from "./components/IndustriesGrid";
import { IntegrationsMarquee } from "./components/IntegrationsMarquee";
import { LeadCaptureMini } from "./components/LeadCaptureMini";
import { LocalizedPricing } from "./components/LocalizedPricing";
import { MakeWorkflowCard } from "./components/MakeWorkflowCard";
import { ProblemsWeSolve } from "./components/ProblemsWeSolve";
import { StickyCTA } from "./components/StickyCTA";
import { TechStackCards } from "./components/TechStackCards";
import { TestimonialCarousel } from "./components/TestimonialCarousel";
import { WorkflowDiagramSection } from "./components/WorkflowDiagramSection";
import { INTEGRATIONS } from "./components/integrationsData";

export default function HomePage() {
  const { lang } = useLang();
  const t = SITE_CONTENT[lang];
  const isRtl = lang === "ar";
  const [heroGridOffset, setHeroGridOffset] = useState(0);
  const [trustPulseIndex, setTrustPulseIndex] = useState(0);
  const [isScrollHot, setIsScrollHot] = useState(false);
  const [typedTitle, setTypedTitle] = useState("");
  const [typingDone, setTypingDone] = useState(false);

  useLocalizedMeta(t.meta.pages.home.title, t.meta.pages.home.description);

  const serviceCards = t.services.slice(0, 6).map((item) => ({
    title: item.title,
    body: item.summary,
    tag: item.tags[0] ?? "Service",
  }));

  const casePreview = t.caseStudies.slice(0, 3);
  const faqPreview = t.faqPage.categories.flatMap((group) => group.items).slice(0, 6);
  const testimonials =
    lang === "ru"
      ? [
          { quote: "После внедрения workflow команда перестала терять лиды, а обработка входящих стала управляемой.", author: "Operations Lead", role: "Service Company" },
          { quote: "AI-черновики с ручным подтверждением сократили время ответа и сохранили качество коммуникации.", author: "Support Manager", role: "Digital Business" },
          { quote: "Сайт, CRM и уведомления наконец работают как единая система без ручных переносов.", author: "Growth Lead", role: "Agency Partner" },
        ]
      : lang === "ar"
        ? [
            { quote: "بعد تنفيذ التدفقات لم نعد نفقد العملاء المحتملين وأصبح الرد أسرع بكثير.", author: "مدير العمليات", role: "شركة خدمات" },
            { quote: "مسودات AI مع الموافقة البشرية حسّنت السرعة دون التضحية بالجودة.", author: "مدير الدعم", role: "أعمال رقمية" },
            { quote: "الموقع وCRM والتنبيهات أصبحت منظومة واحدة واضحة.", author: "مدير النمو", role: "وكالة شريكة" },
          ]
        : [
            { quote: "After deployment, our team stopped losing inbound leads and response flow became predictable.", author: "Operations Lead", role: "Service Company" },
            { quote: "AI draft + approval workflow reduced support turnaround while keeping message quality high.", author: "Support Manager", role: "Digital Business" },
            { quote: "Website, CRM, and internal alerts now work as one reliable system instead of disconnected tools.", author: "Growth Lead", role: "Agency Partner" },
          ];
  const workflowPreviewLabel = lang === "ar" ? "معاينة سير العمل" : lang === "ru" ? "Превью workflow" : "Workflow Preview";
  const technologyTitle = lang === "ar" ? "التقنيات والتكاملات" : lang === "ru" ? "Технологии и интеграции" : "Technology & Integrations";
  const technologySubtitle =
    lang === "ar"
      ? "n8n ووكلاء الذكاء الاصطناعي وواجهات API وwebhooks وCRM وقنوات المراسلة ضمن نظام واحد."
      : lang === "ru"
        ? "n8n, AI-агенты, API, webhooks, CRM и каналы коммуникации в едином стеке."
        : "n8n, AI agents, APIs, webhooks, CRM, and messaging channels connected in one stack.";
  const freeAuditLabel = lang === "ar" ? "احجز تدقيق أتمتة مجاني" : lang === "ru" ? "Забронировать бесплатный automation-аудит" : "Book Free Automation Audit";

  useEffect(() => {
    const fullTitle = t.home.title;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let timer: number | undefined;

    const kickoff = window.setTimeout(() => {
      if (prefersReducedMotion) {
        setTypedTitle(fullTitle);
        setTypingDone(true);
        return;
      }

      setTypedTitle("");
      setTypingDone(false);

      const glyphs = Array.from(fullTitle);
      let index = 0;

      timer = window.setInterval(() => {
        index += 1;
        setTypedTitle(glyphs.slice(0, index).join(""));

        if (index >= glyphs.length) {
          window.clearInterval(timer);
          setTypingDone(true);
        }
      }, 22);
    }, 0);

    return () => {
      window.clearTimeout(kickoff);
      if (timer) {
        window.clearInterval(timer);
      }
    };
  }, [t.home.title]);

  useEffect(() => {
    let raf = 0;
    let scrollIdleTimer = 0;
    const stripLength = Math.max(t.home.trustStrip.length, 1);

    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        const y = window.scrollY;
        setHeroGridOffset(Math.min(28, y * 0.08));
        setTrustPulseIndex(Math.floor(y / 72) % stripLength);
        setIsScrollHot(true);
        if (scrollIdleTimer) {
          window.clearTimeout(scrollIdleTimer);
        }
        scrollIdleTimer = window.setTimeout(() => {
          setIsScrollHot(false);
        }, 140);
        raf = 0;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) {
        window.cancelAnimationFrame(raf);
      }
      if (scrollIdleTimer) {
        window.clearTimeout(scrollIdleTimer);
      }
    };
  }, [t.home.trustStrip.length]);

  return (
    <div className={`mx-auto flex w-full max-w-[1240px] flex-col gap-14 pb-16 ${isRtl ? "text-right" : "text-left"}`}>
      <section className="hero-shell relative overflow-hidden rounded-[2rem] border border-edge bg-panel p-7 md:p-10 xl:p-12">
        <div className="hero-grid-parallax absolute inset-0" style={{ transform: `translateY(${heroGridOffset}px)` }} aria-hidden="true" />
        <div className="hero-grid-wash absolute inset-0" aria-hidden="true" />

        <div className="relative grid gap-8 lg:grid-cols-[0.86fr_1.14fr]">
          <div>
            <span className="hero-tag-reveal inline-flex rounded-full border border-edge bg-panel2 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-muted">
              {t.home.announcement}
            </span>
            <h1
              aria-label={t.home.title}
              className="hero-headline-reveal hero-title-hover mt-4 max-w-[9ch] font-display text-[clamp(1.95rem,7vw,4.2rem)] leading-[0.95] tracking-[-0.02em] text-text"
            >
              <span aria-hidden="true" className="hero-typewriter-wrap">
                <span className="hero-typewriter-ghost">{t.home.title}</span>
                <span className={`hero-typewriter title-chroma ${typingDone ? "is-done" : ""}`}>{typedTitle}</span>
              </span>
            </h1>
            <p className="hero-copy-reveal copy-color-flow mt-4 text-base text-muted md:max-w-2xl lg:max-w-[34ch]">{t.home.subtitle}</p>
            <div className={`mt-6 flex flex-wrap gap-3 ${isRtl ? "justify-end" : "justify-start"}`}>
              <Link
                href={PUBLIC_CALENDLY_URL}
                className="hero-cta-reveal hero-cta-primary rounded-full bg-brand px-6 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-white"
              >
                {t.home.primaryCta}
              </Link>
              <Link
                href="/workflows"
                className="hero-cta-reveal hero-cta-secondary rounded-full border border-edge px-6 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-text hover:border-brand"
              >
                {t.home.secondaryCta}
              </Link>
            </div>
            <p className="hero-copy-reveal mt-5 text-sm text-muted">{t.home.trustMicrocopy}</p>
          </div>

          <div className="min-w-0 space-y-3">
            <div className="hero-panel-enter hero-panel-delay-1">
              <HeroVisual lang={lang} />
            </div>
            <div className="hero-panel-enter hero-panel-delay-2 hero-preview-mask is-visible">
              <MakeWorkflowCard lang={lang} />
            </div>
          </div>
        </div>
      </section>

      <section className={`trust-strip grid gap-3 sm:grid-cols-2 lg:grid-cols-4 ${isScrollHot ? "is-scrolling" : ""}`}>
        {t.home.trustStrip.map((item, index) => (
          <article
            key={item}
            className={`trust-chip rounded-2xl border border-edge bg-panel px-4 py-3 text-xs uppercase tracking-[0.2em] text-muted ${
              trustPulseIndex === index ? "is-active" : ""
            }`}
          >
            {item}
          </article>
        ))}
      </section>

      <ProblemsWeSolve lang={lang} />

      <section>
        <h2 className="title-chroma font-display text-3xl text-text">{t.home.servicesTitle}</h2>
        <p className="copy-color-flow mt-2 text-sm text-muted">{t.home.servicesSubtitle}</p>
        <div className="mt-6">
          <FeatureGrid items={serviceCards} />
        </div>
      </section>

      <WorkflowDiagramSection lang={lang} />

      <section className="rounded-3xl border border-edge bg-panel p-6 md:p-8">
        <h2 className="title-chroma font-display text-3xl text-text">{t.home.processTitle}</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-6">
          {t.home.processSteps.map((step, index) => (
            <article key={step.title} className="rounded-2xl border border-edge bg-panel2 p-4">
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted">0{index + 1}</p>
              <h3 className="mt-2 font-display text-lg text-text">{step.title}</h3>
              <p className="mt-2 text-sm text-muted">{step.body}</p>
            </article>
          ))}
        </div>
      </section>

      <IndustriesGrid lang={lang} />

      <TechStackCards lang={lang} />

      <section className="rounded-3xl border border-edge bg-panel p-6">
        <h2 className="title-chroma font-display text-3xl text-text">{technologyTitle}</h2>
        <p className="copy-color-flow mt-2 text-sm text-muted">{technologySubtitle}</p>
        <div className="mt-5">
          <IntegrationsMarquee items={INTEGRATIONS} />
        </div>
      </section>

      <section>
        <div className="mb-5 flex items-end justify-between gap-3">
          <div>
            <h2 className="title-chroma font-display text-3xl text-text">{t.home.casePreviewTitle}</h2>
            <p className="copy-color-flow mt-2 text-sm text-muted">{t.home.casePreviewSubtitle}</p>
          </div>
          <Link href="/case-studies" className="rounded-full border border-edge px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-text hover:border-brand">
            {t.nav.caseStudies}
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {casePreview.map((item) => (
            <CaseStudyCard key={item.slug} item={item} viewLabel={t.common.viewDetails} workflowPreviewLabel={workflowPreviewLabel} />
          ))}
        </div>
      </section>

      <TestimonialCarousel items={testimonials} />

      <section>
        <LocalizedPricing compact={true} bookingHref={PUBLIC_CALENDLY_URL} />
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between gap-3">
          <div>
            <h2 className="title-chroma font-display text-3xl text-text">{t.home.faqPreviewTitle}</h2>
            <p className="copy-color-flow mt-2 text-sm text-muted">{t.home.faqPreviewSubtitle}</p>
          </div>
          <Link href="/faq" className="rounded-full border border-edge px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-text hover:border-brand">
            {t.nav.faq}
          </Link>
        </div>
        <FAQAccordion items={faqPreview} />
      </section>

      <AutomationAuditCTA lang={lang} />

      <LeadCaptureMini copy={t} lang={lang} />

      <HomeLeadCaptureForm lang={lang} />

      <section className="rounded-3xl border border-edge bg-panel p-6 md:p-8">
        <h2 className="title-chroma font-display text-3xl text-text">{t.aboutPage.title}</h2>
        <p className="copy-color-flow mt-2 text-sm text-muted">{t.aboutPage.subtitle}</p>
        <div className={`mt-5 flex flex-wrap gap-3 ${isRtl ? "justify-end" : "justify-start"}`}>
          <Link href="/about" className="rounded-full border border-edge px-6 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-text hover:border-brand">
            {t.nav.about}
          </Link>
          <Link href={PUBLIC_CALENDLY_URL} className="rounded-full bg-brand px-6 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-white">
            {freeAuditLabel}
          </Link>
        </div>
      </section>

      <BlogInsightsPreview lang={lang} copy={t} />

      <section className="rounded-3xl border border-edge bg-panel p-8">
        <h2 className="title-chroma font-display text-3xl text-text">{t.home.finalCtaTitle}</h2>
        <p className="copy-color-flow mt-3 max-w-3xl text-sm text-muted">{t.home.finalCtaSubtitle}</p>
        <div className={`mt-6 flex flex-wrap gap-3 ${isRtl ? "justify-end" : "justify-start"}`}>
          <Link href={PUBLIC_CALENDLY_URL} className="rounded-full bg-brand px-6 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-white">
            {t.nav.getStarted}
          </Link>
          <Link href="/pricing" className="rounded-full border border-edge px-6 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-text hover:border-brand">
            {t.nav.pricing}
          </Link>
        </div>
      </section>

      <StickyCTA
        text={lang === "ar" ? "احجز تدقيق أتمتة مجاني" : lang === "ru" ? "Забронируйте бесплатный automation-аудит" : "Book your free automation audit"}
        button={lang === "ar" ? "احجز الآن" : lang === "ru" ? "Записаться" : "Book now"}
        href={PUBLIC_CALENDLY_URL}
      />
    </div>
  );
}
