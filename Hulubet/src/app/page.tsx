"use client";

import Link from "next/link";
import Image from "next/image";
import { copy } from "@/lib/i18n";
import { useLang } from "@/lib/lang";
import { INTEGRATIONS } from "./components/integrationsData";
import founderImage from "../image/founder-modified.png";
import builderImage from "../image/image-2.png";

const integrationLogos = INTEGRATIONS.filter((item) => item.logoSrc);

export default function Home() {
  const { lang } = useLang();
  const t = copy[lang];
  const isRtl = lang === "ar";

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 md:gap-16 md:px-6">
      <section
        id="product"
        className="aurora-bg grid items-center gap-8 pt-6 lg:grid-cols-[1.05fr_0.95fr]"
      >
        <div className={`flex flex-col gap-5 ${isRtl ? "text-right" : "text-left"}`}>
          <span className="text-xs font-semibold uppercase tracking-[0.4em] text-muted">
            {t.hero.eyebrow}
          </span>
          <h1 className="font-display text-5xl leading-tight md:text-6xl">
            {t.hero.title}
          </h1>
          <p className="max-w-xl text-lg text-muted">{t.hero.subtitle}</p>
          <div className={`flex flex-wrap gap-3 ${isRtl ? "justify-end" : "justify-start"}`}>
            <Link
              href="/contact"
              className="rounded-full bg-brand px-8 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white"
            >
              {t.hero.ctaPrimary}
            </Link>
            <Link
              href="#pricing"
              className="rounded-full border border-edge px-8 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-text"
            >
              {t.hero.ctaSecondary}
            </Link>
          </div>
          <div className={`flex flex-wrap gap-4 text-xs uppercase tracking-[0.3em] text-muted ${isRtl ? "justify-end" : "justify-start"}`}>
            {t.hero.stats.map((stat) => (
              <span key={stat} className="rounded-full border border-edge px-3 py-2">
                {stat}
              </span>
            ))}
          </div>
        </div>
        <div className="relative overflow-hidden rounded-3xl border border-edge bg-panel/80 p-4 shimmer-border hover-3d">
          <div className="relative h-[360px] overflow-hidden rounded-2xl border border-edge lift-hover hover-zoom">
            <Image
              src="/images/make-hero.png"
              alt="Automation workflow preview"
              fill
              className="object-cover float-slow"
              priority
            />
          </div>
          <div className="absolute right-6 top-6 rounded-full bg-white/80 px-3 py-2 text-[0.6rem] uppercase tracking-[0.3em] text-muted">
            {t.hero.badge}
          </div>
        </div>
      </section>

      <section id="features" className="grid gap-6 md:grid-cols-[0.35fr_0.65fr]">
        <div className="card-surface rounded-3xl border border-edge bg-panel/80 p-6">
          <p className="text-xs uppercase tracking-[0.4em] text-muted">{t.labels.features}</p>
          <h2 className="mt-4 font-display text-3xl">{t.features.title}</h2>
          <p className="mt-3 text-sm text-muted">{t.features.subtitle}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {t.features.items.map((item) => (
            <div
              key={item.title}
              className="card-surface rounded-2xl border border-edge bg-panel/80 p-6"
            >
              <h3 className="font-display text-lg">{item.title}</h3>
              <p className="mt-3 text-sm text-muted">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="builder" className="grid gap-6 md:grid-cols-[0.55fr_0.45fr]">
        <div className="card-surface rounded-3xl border border-edge bg-panel/80 p-6">
          <p className="text-xs uppercase tracking-[0.4em] text-muted">{t.builder.eyebrow}</p>
          <h2 className="mt-4 font-display text-3xl">{t.builder.title}</h2>
          <p className="mt-3 text-sm text-muted">{t.builder.text}</p>
          <Link
            href="/contact"
            className="mt-6 inline-flex rounded-full border border-edge px-6 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-text"
          >
            {t.builder.cta}
          </Link>
        </div>
        <div className="card-surface rounded-3xl border border-edge bg-panel/80 p-6 hover-3d">
          <div className="relative h-[260px] overflow-hidden rounded-2xl border border-edge lift-hover hover-zoom">
            <Image
              src={builderImage}
              alt="Automation workflow preview"
              fill
              className="object-contain float-medium"
            />
          </div>
        </div>
      </section>

      <section id="process" className="grid gap-6 md:grid-cols-3">
        {t.steps.map((step, index) => (
          <div
            key={step.title}
            className="card-surface rounded-2xl border border-edge bg-panel/80 p-6"
          >
            <p className="text-xs uppercase tracking-[0.4em] text-muted">
              {t.labels.steps} 0{index + 1}
            </p>
            <h3 className="mt-4 font-display text-lg">{step.title}</h3>
            <p className="mt-3 text-sm text-muted">{step.text}</p>
          </div>
        ))}
      </section>

      <section id="templates" className="grid gap-6 md:grid-cols-[0.4fr_0.6fr]">
        <div className="card-surface rounded-3xl border border-edge bg-panel/80 p-6">
          <p className="text-xs uppercase tracking-[0.4em] text-muted">{t.labels.templates}</p>
          <h2 className="mt-4 font-display text-3xl">{t.templates.title}</h2>
          <p className="mt-3 text-sm text-muted">{t.templates.subtitle}</p>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {t.templates.items.map((item) => (
            <div
              key={item}
              className="card-surface rounded-2xl border border-edge bg-panel/80 p-4 text-sm text-muted"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="relative z-0 grid items-stretch gap-6 md:grid-cols-[0.4fr_0.6fr]">
        <div className="card-surface h-full rounded-3xl border border-edge bg-panel/80 p-6">
          <p className="text-xs uppercase tracking-[0.4em] text-muted">{t.ops.eyebrow}</p>
          <h2 className="mt-4 font-display text-3xl">{t.ops.title}</h2>
          <p className="mt-3 text-sm text-muted">{t.ops.text}</p>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            {t.ops.bullets.map((bullet) => (
              <li key={bullet}>- {bullet}</li>
            ))}
          </ul>
        </div>
        <div className="card-surface h-full overflow-hidden rounded-3xl border border-edge bg-panel/80 p-6">
          <div className="text-left">
            <p className="text-xs uppercase tracking-[0.4em] text-muted">
              {t.integrations.title}
            </p>
            <h3 className="mt-3 max-w-2xl font-display text-xl leading-tight md:text-2xl">
              {t.integrations.subtitle}
            </h3>
            <p className="mt-2 text-sm text-muted">{t.integrations.highlight}</p>
          </div>
          <div className="mt-6 space-y-4">
            <div className="logo-marquee-solid">
              <div className="logo-track-solid">
                {[...integrationLogos, ...integrationLogos].map((logo, index) => (
                  <div key={`row-1-${logo.name}-${index}`} className="logo-tile">
                    <Image
                      src={logo.logoSrc!}
                      alt={logo.name}
                      width={28}
                      height={28}
                      className="logo-icon"
                      unoptimized
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="logo-marquee-solid">
              <div className="logo-track-solid logo-track-reverse">
                {[...integrationLogos, ...integrationLogos].map((logo, index) => (
                  <div key={`row-2-${logo.name}-${index}`} className="logo-tile">
                    <Image
                      src={logo.logoSrc!}
                      alt={logo.name}
                      width={28}
                      height={28}
                      className="logo-icon"
                      unoptimized
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="grid gap-6 md:grid-cols-[0.5fr_0.5fr]">
        <div className="card-surface rounded-3xl border border-edge bg-panel/80 p-6">
          <p className="text-xs uppercase tracking-[0.4em] text-muted">{t.labels.pricing}</p>
          <h2 className="mt-4 font-display text-3xl">{t.pricing.title}</h2>
          <p className="mt-3 text-sm text-muted">{t.pricing.subtitle}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {t.pricing.tiers.map((tier) => (
            <div
              key={tier.name}
              className="card-surface rounded-2xl border border-edge bg-panel/80 p-6"
            >
              <p className="text-xs uppercase tracking-[0.4em] text-muted">{tier.name}</p>
              <p className="mt-4 font-display text-2xl">{tier.price}</p>
              <p className="mt-2 text-sm text-muted">{tier.text}</p>
              <Link
                href="/contact"
                className="mt-6 inline-flex rounded-full border border-edge px-6 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-text"
              >
                {t.cta.secondary}
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-[0.4fr_0.6fr]">
        <div className="card-surface rounded-3xl border border-edge bg-panel/80 p-6">
          <p className="text-xs uppercase tracking-[0.4em] text-muted">
            {t.pricingModels.title}
          </p>
          <h2 className="mt-4 font-display text-3xl">{t.pricingModels.title}</h2>
          <p className="mt-3 text-sm text-muted">{t.pricingModels.intro}</p>
          <p className="mt-4 text-sm text-text">{t.pricingModels.note}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {t.pricingModels.items.map((item) => (
            <div
              key={item.title}
              className="card-surface rounded-2xl border border-edge bg-panel/80 p-6"
            >
              <h3 className="font-display text-lg">{item.title}</h3>
              <p className="mt-3 text-sm text-muted">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-[0.45fr_0.55fr]">
        <div className="card-surface rounded-3xl border border-edge bg-panel/80 p-6">
          <p className="text-xs uppercase tracking-[0.4em] text-muted">
            {t.regionalPricing.title}
          </p>
          <h2 className="mt-4 font-display text-3xl">{t.regionalPricing.title}</h2>
          <p className="mt-3 text-sm text-muted">{t.regionalPricing.note}</p>
        </div>
        <div className="card-surface rounded-3xl border border-edge bg-panel/80 p-6">
          <ul className="space-y-2 text-sm text-muted">
            {t.regionalPricing.items.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="card-surface rounded-3xl border border-edge bg-panel/80 p-6">
          <p className="text-xs uppercase tracking-[0.4em] text-muted">
            {t.audienceSplit.title}
          </p>
          <h2 className="mt-4 font-display text-3xl">{t.audienceSplit.title}</h2>
          <p className="mt-3 text-sm text-muted">{t.audienceSplit.cta}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="card-surface rounded-2xl border border-edge bg-panel/80 p-6">
            <h3 className="font-display text-lg">{t.audienceSplit.individuals.title}</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              {t.audienceSplit.individuals.bullets.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </div>
          <div className="card-surface rounded-2xl border border-edge bg-panel/80 p-6">
            <h3 className="font-display text-lg">{t.audienceSplit.companies.title}</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              {t.audienceSplit.companies.bullets.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-[0.5fr_0.5fr]">
        <div className="card-surface rounded-3xl border border-edge bg-panel/80 p-6">
          <p className="text-xs uppercase tracking-[0.4em] text-muted">{t.mvp.title}</p>
          <h2 className="mt-4 font-display text-3xl">{t.mvp.title}</h2>
          <p className="mt-3 text-sm text-muted">{t.mvp.text}</p>
          <p className="mt-4 text-sm text-text">{t.mvp.note}</p>
        </div>
        <div className="card-surface rounded-3xl border border-edge bg-panel/80 p-6">
          <p className="text-xs uppercase tracking-[0.4em] text-muted">
            {t.meetings.title}
          </p>
          <h2 className="mt-4 font-display text-3xl">{t.meetings.title}</h2>
          <p className="mt-3 text-sm text-muted">{t.meetings.text}</p>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            {t.meetings.options.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-[0.55fr_0.45fr]">
        <div className={`card-surface rounded-3xl border border-edge bg-panel/80 p-6 ${isRtl ? "text-right" : "text-left"}`}>
          <p className="text-xs uppercase tracking-[0.4em] text-muted">
            {t.founderTeam.title}
          </p>
          <h2 className="mt-4 font-display text-3xl">{t.founderTeam.title}</h2>
          <p className="mt-3 text-sm text-muted">{t.founderTeam.founderBio}</p>
          <p className="mt-6 text-xs uppercase tracking-[0.3em] text-muted">
            {t.founderTeam.highlightsTitle}
          </p>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            {t.founderTeam.highlights.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
          <p className="mt-6 text-xs uppercase tracking-[0.3em] text-muted">
            {t.founderTeam.certificationsTitle}
          </p>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            {t.founderTeam.certifications.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
          <Link
            href="https://www.linkedin.com/in/henok-tariku1012/"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-edge px-6 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-text"
          >
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png"
              alt="LinkedIn logo"
              width={24}
              height={24}
              className="rounded bg-white p-1"
            />
            {t.founderTeam.linkedinCta}
          </Link>
        </div>
        <div className="card-surface relative overflow-hidden rounded-3xl border border-edge bg-panel/80 p-6">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -right-10 top-10 h-56 w-56 rounded-full bg-brand/20 blur-3xl" />
            <div className="absolute -left-10 bottom-6 h-48 w-48 rounded-full bg-cyan-400/20 blur-3xl" />
          </div>
          <div className="relative z-10 flex flex-col items-center gap-4 text-center">
            <div className="relative h-44 w-44 overflow-hidden rounded-full border border-edge bg-panel shadow-xl">
              <Image
                src={founderImage}
                alt={t.founderTeam.founderName}
                fill
                className="object-cover origin-top float-slow"
                style={{ transform: "scale(2.8)", objectPosition: "50% 5%" }}
                priority
              />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted">
                {t.founderTeam.founderName}
              </p>
              <p className="mt-2 whitespace-pre-line text-sm text-text">
                {t.founderTeam.founderTitle}
              </p>
              <div className="mt-4 border-t border-edge/60 pt-4">
                <p className="text-[11px] uppercase tracking-[0.3em] text-muted">
                  Education
                </p>
                <div className="mt-3 grid gap-3 text-xs text-muted">
                  <div className="flex items-center gap-3">
                    <Image
                      src="https://media.cake.me/image/upload/s--9DWv9hg0--/c_pad,fl_png8,h_200,w_200/v1699785240/emeaxbfqop5n6ehtperf.png"
                      alt="MIPT logo"
                      width={40}
                      height={40}
                      className="rounded-lg border border-edge bg-white/80 p-1.5"
                    />
                    <div className="text-left">
                      <p className="text-text">
                        MIPT (Moscow Institute of Physics and Technology)
                      </p>
                      <p className="text-[11px] text-muted">BSc in Computer Science</p>
                      <p className="text-[11px] text-muted">Moscow, Russia</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Image
                      src="https://upload.wikimedia.org/wikipedia/en/thumb/2/22/University_of_the_People_seal.png/250px-University_of_the_People_seal.png"
                      alt="University of the People logo"
                      width={40}
                      height={40}
                      className="rounded-lg border border-edge bg-white/80 p-1.5"
                    />
                    <div className="text-left">
                      <p className="text-text">University of the People</p>
                      <p className="text-[11px] text-muted">BSc in Computer Science</p>
                      <p className="text-[11px] text-muted">USA</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="card-surface rounded-3xl border border-edge bg-panel/80 p-6">
        <div className="flex items-center justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-muted">
              {t.founderTeam.teamTitle}
            </p>
            <h2 className="mt-4 font-display text-3xl">{t.founderTeam.teamTitle}</h2>
            <p className="mt-3 text-sm text-muted">{t.founderTeam.teamDescription}</p>
          </div>
          <p className="hidden text-xs uppercase tracking-[0.3em] text-muted md:block">
            {t.founderTeam.scaleNote}
          </p>
        </div>
        <div className="mt-6 flex gap-4 overflow-x-auto pb-4">
          {t.founderTeam.roles.map((role) => (
            <div
              key={role}
              className="min-w-[220px] rounded-2xl border border-edge bg-panel/60 px-4 py-6 text-sm text-muted transition hover:-translate-y-1 hover:border-brand/60"
            >
              {role}
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs uppercase tracking-[0.3em] text-muted md:hidden">
          {t.founderTeam.scaleNote}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="rounded-full bg-brand px-6 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white"
          >
            {t.founderTeam.ctaButtons[0]}
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-edge px-6 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-text"
          >
            {t.founderTeam.ctaButtons[1]}
          </Link>
        </div>
      </section>

      <section id="contact" className="card-surface rounded-3xl border border-edge bg-panel/80 p-6">
        <div className="grid gap-6 md:grid-cols-[0.6fr_0.4fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-muted">{t.booking.title}</p>
            <h2 className="mt-4 font-display text-3xl">{t.booking.title}</h2>
            <p className="mt-3 text-sm text-muted">{t.booking.text}</p>
          </div>
          <div className="flex flex-col gap-3">
            <Link
              href="/contact"
              className="rounded-full bg-brand px-8 py-3 text-center text-xs font-semibold uppercase tracking-[0.3em] text-white"
            >
              {t.booking.buttons[0]}
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-edge px-8 py-3 text-center text-xs font-semibold uppercase tracking-[0.3em] text-text"
            >
              {t.booking.buttons[1]}
            </Link>
            <Link
              href="https://t.me/your_company"
              className="rounded-full border border-edge px-8 py-3 text-center text-xs font-semibold uppercase tracking-[0.3em] text-text"
            >
              {t.booking.buttons[2]}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
