

en: {
  heroBadge: "About ZEC",
  heroTitle: "Automation systems built for real operations",
  heroBody:
    "ZEC AI Automation Agency is an automation-native team focused on useful systems, not flashy demos. We build practical workflows that remove repetitive work, improve operational speed, and stay reliable after launch.",
  whyNowTitle: "Why Now (2026)",
  whyNowBody:
    "In 2026, more daily operations are handled by AI and automation, but most teams still struggle with reliability and execution. Businesses need dependable systems that integrate cleanly and produce measurable results.",
  whatZecTitle: "What ZEC Means",
  whatZecBody:
    "ZEC = Z(the) + EC (tech). The name reflects our focus on engineering discipline, execution clarity, and practical automation delivery.",
  toolsTitle: "Tools We Use",

  founderTitle: "Co-Founder",
  founderName: "Elsa Alemayehu",
  founderRole: "Co-Founder and Software Engineer",
  founderBio:
    "Elsa Alemayehu is a Full-Stack Developer and Co-Founder of ZEC AI Automation Agency. She is also a Software Engineering student at AASTU.",
  educationTitle: "Educational Background",
  education: [
    "Bachelor's degree in Software Engineering at AASTU (Feb 2022 – Jun 2027)",
  ],

  teamTitle: "Team",
  teamSubtitle:
    "Cross-functional delivery team built for clear execution across automation, integrations, product, and rollout.",

  teamRoles: [
    {
      title: "Automation Architect",
      desc: "Designs end-to-end workflow architecture, logic paths, and system guardrails.",
    },
    {
      title: "Integration Engineer",
      desc: "Connects APIs, webhooks, CRM, and messaging tools with reliable data flow.",
    },
    {
      title: "Web Developer",
      desc: "Builds frontend and backend layers that connect automation to user-facing experience.",
    },
    {
      title: "Delivery Lead",
      desc: "Keeps execution clear with scoped milestones, rollout coordination, and handover quality.",
    },
    {
      title: "Data Analyst / AI Workflow Designer",
      desc: "Turns data into automation decisions, reporting loops, and AI-assisted workflow logic.",
    },
  ],

  securityTitle: "Security and Quality",
  securityPoints: [
    "Least-privilege access for systems and credentials",
    "Full documentation for implementation and handover",
    "Human-in-the-loop controls for sensitive steps",
  ],

  ctaTitle: "Want to automate your workflow?",
  ctaBody:
    "Book a free automation audit and we will identify where your team can save time and reduce manual work.",
  ctaPrimary: "Book Free Audit",
  ctaSecondary: "See Case Studies",
},

Delete the old duplicate block beginning with:

founderTitle: "Founder",
founderName: "Henok Tariku",
2. src/app/layout.tsx

Remove:

import { Cairo, Manrope, Unbounded } from "next/font/google";

Also remove all display, body, and arabic font definitions.

Change the body to:

<body className="font-body" suppressHydrationWarning={true}>
3. src/app/globals.css

Add this inside :root:

:root {
  --font-display: "Arial Narrow", Arial, sans-serif;
  --font-body: Arial, Helvetica, sans-serif;
  --font-arabic: Arial, "Noto Sans Arabic", sans-serif;

  color-scheme: light;
}

Then run:

npm run build
git add .
git commit -m "Fix Vercel build errors"
git push origin main

This removes the duplicate TypeScript properties and prevents Vercel from downloading Google Fonts during deployment.

Pasted text(20260920-134318).txt
Document
nootehrpartdeteleonlyupdatethispartorfixerror

Do not change any other part. Replace only lines 26–45 with this:

    founderTitle: "Founders",
    founderName: "Henok Tariku and Elsa Alemayehu",
    founderRole: "Founder and Co-Founder",
    founderBio:
      "Henok Tariku is an AI automation specialist and Computer Science student at MIPT. Elsa Alemayehu is a Full-Stack Developer and Co-Founder of ZEC AI Automation Agency.",
    educationTitle: "Educational Background",
    education: [
      "Henok Tariku: MIPT, Bachelor's in Computer Science (Sep 2026 - Present)",
      "Henok Tariku: University of the People, Bachelor's in Computer Science",
      "Elsa Alemayehu: Bachelor's degree in Software Engineering at AASTU (Feb 2022 – Jun 2027)",
    ],

The error happens because founderTitle, founderName, founderRole, founderBio, educationTitle, and education appear twice. This update keeps both people without deleting the rest of your code.

fullcodewhioutchnage

Here is the full code with only the duplicate English founder section fixed:

Download the complete corrected code

Only the duplicated English fields were updated. Russian, Arabic, layout, imports, and all other code remain unchanged.

Pasted text(20260920-134318).txt
Document

Pasted text(20260920-134318).txt
"use client";
    whatZecBody: "ZEC = Z(the) + EC (tech). The name reflects our focus on engineering discipline, execution clarity, and practical automation delivery.",
              className="h-40 w-40 rounded-full object-cover md:h-44 md:w-44"
            />
          </div>


          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted">{ui.founderName}</p>
            <h3 className="mt-2 font-display text-2xl text-text">{ui.founderRole}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{ui.founderBio}</p>
            <a
              href={FOUNDER_LINKEDIN_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-2 rounded-full border border-edge bg-panel px-3 py-1.5 hover:border-brand"
            >
              <Image src="/logos/linkedin.svg" alt="LinkedIn" width={14} height={14} className="h-3.5 w-3.5" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-text">LinkedIn</span>
            </a>


            <div className="mt-4 rounded-xl border border-edge bg-panel px-4 py-3">
              <p className="text-[10px] uppercase tracking-[0.18em] text-muted">{ui.educationTitle}</p>
              <ul className="mt-2 space-y-1.5 text-sm text-muted">
                {ui.education.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </article>
      </section>


      <section className="rounded-3xl border border-edge bg-panel p-6 animate-[hero-in-up_320ms_ease_both]" style={{ animationDelay: "220ms" }}>
        <h2 className="font-display text-2xl text-text">{ui.teamTitle}</h2>
        <p className="mt-2 text-sm text-muted">{ui.teamSubtitle}</p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {ui.teamRoles.map((role) => (
            <article key={role.title} className="rounded-2xl border border-edge bg-panel2 p-5 card-hover">
              <h3 className="text-sm font-semibold text-text">{role.title}</h3>
              <p className="mt-2 text-sm text-muted">{role.desc}</p>
            </article>
          ))}
        </div>
      </section>


      <section className="rounded-3xl border border-edge bg-panel p-6 animate-[hero-in-up_320ms_ease_both]" style={{ animationDelay: "260ms" }}>
        <h2 className="font-display text-2xl text-text">{ui.securityTitle}</h2>
        <ul className="mt-4 space-y-2 text-sm text-muted">
          {ui.securityPoints.map((point) => (
            <li key={point}>- {point}</li>
          ))}
        </ul>
      </section>


      <section className="rounded-3xl border border-edge bg-panel p-6 md:p-8 animate-[hero-in-up_320ms_ease_both]" style={{ animationDelay: "300ms" }}>
        <h2 className="font-display text-3xl text-text">{ui.ctaTitle}</h2>
        <p className="mt-3 max-w-3xl text-sm text-muted">{ui.ctaBody}</p>
        <div className={`mt-5 flex flex-wrap gap-3 ${isRtl ? "justify-end" : "justify-start"}`}>
          <Link href="/contact#schedule" className="rounded-full bg-brand px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white">
            {ui.ctaPrimary}
          </Link>
          <Link href="/case-studies" className="rounded-full border border-edge px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-text hover:border-brand">
            {ui.ctaSecondary}
          </Link>
        </div>
      </section>
    </div>
  );
}

