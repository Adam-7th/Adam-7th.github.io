"use client";

import Link from "next/link";

export default function CareersPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
      <section className="rounded-3xl border border-edge bg-panel/80 p-8">
        <h1 className="font-display text-3xl">About Hulubet</h1>
        <p className="mt-3 text-sm text-muted">
          AI automation systems that remove manual work and help teams scale.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/appointments"
            className="rounded-full bg-brand px-6 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white"
          >
            Book a strategy call
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-edge px-6 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-text"
          >
            Contact us
          </Link>
        </div>
      </section>

      <section className="rounded-3xl border border-edge bg-panel/80 p-8">
        <h2 className="font-display text-2xl">Our mission</h2>
        <p className="mt-3 text-sm text-muted">
          We build practical automation that saves time, improves response speed,
          and reduces operational cost.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="card-surface rounded-3xl border border-edge bg-panel/80 p-6">
          <h3 className="font-display text-xl">What we do</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            <li>- AI agents for sales, support, and internal knowledge</li>
            <li>- CRM and lead routing automation</li>
            <li>- HR and resume screening automation</li>
            <li>- Content & social media automation (VK, Telegram, Rutube, YouTube)</li>
            <li>- Backend workflows, reporting, and alerts</li>
          </ul>
        </div>
        <div className="card-surface rounded-3xl border border-edge bg-panel/80 p-6">
          <h3 className="font-display text-xl">How we work</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            <li>- Audit — map workflows and define success metrics</li>
            <li>- Design — scenarios and integrations</li>
            <li>- Build — MVP in 7–14 days</li>
            <li>- Scale — monitoring and continuous improvements</li>
          </ul>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="card-surface rounded-3xl border border-edge bg-panel/80 p-6">
          <h3 className="font-display text-xl">Why choose Hulubet</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            <li>- Business-first outcomes, not tools</li>
            <li>- Fast delivery with clear scope</li>
            <li>- Flexible pricing models: project, monthly, contract</li>
            <li>- Regional-first integrations for RU, MENA, global</li>
            <li>- Ongoing support and optimization</li>
          </ul>
        </div>
        <div className="card-surface rounded-3xl border border-edge bg-panel/80 p-6">
          <h3 className="font-display text-xl">Our values</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            <li>- Clarity</li>
            <li>- Reliability</li>
            <li>- Security-minded design</li>
            <li>- Long-term partnership</li>
            <li>- Continuous improvement</li>
          </ul>
        </div>
      </section>

      <section className="rounded-3xl border border-edge bg-panel/80 p-8">
        <h2 className="font-display text-2xl">Where we work</h2>
        <p className="mt-3 text-sm text-muted">
          We support teams across regions with the right tools and integrations:
          Telegram, VK, Yandex, amoCRM/Bitrix24, Rutube; WhatsApp, email, CRM,
          cloud; Slack, Google Workspace, HubSpot, APIs, Zapier/Make.
        </p>
        <ul className="mt-4 grid gap-2 text-sm text-muted md:grid-cols-2">
          <li>- Russia</li>
          <li>- UAE & MENA</li>
          <li>- UK / USA</li>
          <li>- Worldwide (remote-first)</li>
        </ul>
      </section>

      <section className="rounded-3xl border border-edge bg-panel/80 p-8">
        <h2 className="font-display text-2xl">Let’s build your automation roadmap</h2>
        <p className="mt-3 text-sm text-muted">
          Tell us what you want to automate and your current tools.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="rounded-full bg-brand px-6 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white"
          >
            Get a free audit
          </Link>
          <a
            href="https://t.me/hulubet_support"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-edge px-6 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-text"
          >
            Message on Telegram
          </a>
        </div>
        <div className="mt-6 text-sm text-muted">
          <p>Email: hulubetautomationagency@gmail.com</p>
          <p>Phone: +7 925 785 0702</p>
          <p>Telegram: https://t.me/hulubet_support</p>
        </div>
      </section>
    </div>
  );
}
