import type { Lang } from "./i18n";
import {
  ARABIC_ARTICLE_OVERRIDES,
  ARABIC_CASE_STUDY_OVERRIDES,
  RUSSIAN_ARTICLE_OVERRIDES,
  RUSSIAN_CASE_STUDY_OVERRIDES,
} from "./localizedContentOverrides";
import { decodeMojibakeDeep } from "./text";

export type CurrencyCode = "RUB" | "USD" | "EUR" | "AED";
export type WorkflowCategory = "leadSales" | "support" | "operations" | "marketing" | "analytics";

export type WorkflowItem = {
  id: string;
  category: WorkflowCategory;
  title: string;
  subtitle: string;
  isCommonExample?: boolean;
  trigger: string;
  steps: string[];
  outcome: string;
  tools: string[];
  nodes: Array<{
    title: string;
    caption: string;
    icon: string;
  }>;
};

export type ServiceItem = {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  timeline: string;
  problems: string[];
  deliverables: string[];
  tools: string[];
  faq: Array<{ question: string; answer: string }>;
};

export type CaseStudyItem = {
  slug: string;
  title: string;
  category: string;
  industry: string;
  problem: string;
  approach: string;
  deliverables: string[];
  outcomes: string[];
  before: string[];
  after: string[];
  metrics: Array<{
    label: string;
    before: string;
    after: string;
    impact: string;
  }>;
  tools: string[];
  tags: string[];
};

export type BlogArticle = {
  slug: string;
  category: string;
  title: string;
  summary: string;
  date: string;
  readingTime: string;
  sections: Array<{
    heading: string;
    body: string;
    image?: string;
    imageAlt?: string;
    imageCaption?: string;
  }>;
};

export type SiteCopy = {
  meta: {
    siteTitle: string;
    siteDescription: string;
    pages: {
      home: { title: string; description: string };
      solutions: { title: string; description: string };
      solutionDetail: { title: string; description: string };
      workflows: { title: string; description: string };
      pricing: { title: string; description: string };
      caseStudies: { title: string; description: string };
      caseDetail: { title: string; description: string };
      blog: { title: string; description: string };
      article: { title: string; description: string };
      about: { title: string; description: string };
      contact: { title: string; description: string };
      faq: { title: string; description: string };
      privacy: { title: string; description: string };
      terms: { title: string; description: string };
      auth: { title: string; description: string };
    };
  };
  brand: {
    name: string;
    tagline: string;
    trustNote: string;
  };
  nav: {
    home: string;
    solutions: string;
    workflows: string;
    pricing: string;
    caseStudies: string;
    blog: string;
    about: string;
    contact: string;
    faq: string;
    privacy: string;
    terms: string;
    getStarted: string;
    bookCall: string;
    seeWorkflows: string;
  };
  common: {
    contactSales: string;
    viewDetails: string;
    readArticle: string;
    requestWorkflow: string;
    downloadWorkflowOutline: string;
    mostPopular: string;
    taxesNote: string;
    languageAuto: string;
  };
  home: {
    announcement: string;
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    trustMicrocopy: string;
    trustStrip: string[];
    servicesTitle: string;
    servicesSubtitle: string;
    workflowsTitle: string;
    workflowsSubtitle: string;
    processTitle: string;
    processSteps: Array<{ title: string; body: string }>;
    casePreviewTitle: string;
    casePreviewSubtitle: string;
    pricingPreviewTitle: string;
    pricingPreviewSubtitle: string;
    faqPreviewTitle: string;
    faqPreviewSubtitle: string;
    leadCaptureTitle: string;
    leadCaptureSubtitle: string;
    finalCtaTitle: string;
    finalCtaSubtitle: string;
    demoLabel: string;
    demoReplaceHint: string;
    demoWatermark: string;
  };
  solutionsPage: {
    title: string;
    subtitle: string;
    timelineLabel: string;
    workflowsIncludedLabel: string;
  };
  solutionDetailPage: {
    problemsTitle: string;
    deliverablesTitle: string;
    exampleWorkflowTitle: string;
    toolsTitle: string;
    faqTitle: string;
    ctaTitle: string;
  };
  workflowsPage: {
    title: string;
    subtitle: string;
    categories: Record<WorkflowCategory, string>;
    triggerLabel: string;
    stepsLabel: string;
    outcomeLabel: string;
    toolsLabel: string;
    demoLabel: string;
    demoHint: string;
    leadCaptureTitle: string;
    leadCaptureSubtitle: string;
    outlineHint: string;
  };
  pricing: {
    title: string;
    subtitle: string;
    currencyLabel: string;
    tierNames: [string, string, string];
    tierDescriptions: [string, string, string];
    tierBullets: [string[], string[], string[]];
    starterOfferTitle: string;
    starterOfferName: string;
    starterOfferBullets: string[];
    starterOfferDisclaimer: string;
    comparisonTitle: string;
    comparisonColumns: {
      feature: string;
      launch: string;
      growth: string;
      scale: string;
    };
    comparisonRows: Array<{ feature: string; launch: string; growth: string; scale: string }>;
    faqTitle: string;
    faqItems: Array<{ question: string; answer: string }>;
  };
  caseStudiesPage: {
    title: string;
    subtitle: string;
    allFilter: string;
    contextTitle: string;
    approachTitle: string;
    deliverablesTitle: string;
    outcomesTitle: string;
    beforeTitle: string;
    afterTitle: string;
    toolsTitle: string;
  };
  blogPage: {
    title: string;
    subtitle: string;
    relatedTitle: string;
    tocTitle: string;
  };
  aboutPage: {
    title: string;
    subtitle: string;
    valuesTitle: string;
    values: string[];
    workStyleTitle: string;
    workStyle: string[];
    toolsTitle: string;
    teamTitle: string;
    teamPlaceholderTitle: string;
    teamPlaceholderBody: string;
  };
  contactPage: {
    title: string;
    subtitle: string;
    responseNote: string;
    consentNote: string;
    form: {
      name: string;
      email: string;
      message: string;
      serviceInterest: string;
      budget: string;
      language: string;
      submit: string;
      success: string;
      error: string;
      placeholders: {
        name: string;
        email: string;
        message: string;
        serviceInterest: string;
        budget: string;
      };
    };
  };
  faqPage: {
    title: string;
    subtitle: string;
    categories: Array<{
      title: string;
      items: Array<{ question: string; answer: string }>;
    }>;
  };
  legal: {
    updatedLabel: string;
    updatedDate: string;
    privacyTitle: string;
    termsTitle: string;
    privacySections: Array<{ title: string; body: string }>;
    termsSections: Array<{ title: string; body: string }>;
  };
  services: ServiceItem[];
  workflows: WorkflowItem[];
  caseStudies: CaseStudyItem[];
  articles: BlogArticle[];
};

export const DEFAULT_CURRENCY_BY_LANG: Record<Lang, CurrencyCode> = {
  ru: "RUB",
  en: "USD",
  ar: "AED",
};

export const CURRENCY_OPTIONS_BY_LANG: Record<Lang, CurrencyCode[]> = {
  ru: ["RUB", "USD", "EUR"],
  en: ["USD", "EUR", "RUB", "AED"],
  ar: ["AED", "USD"],
};

export const CURRENCY_ORDER: CurrencyCode[] = ["RUB", "USD", "EUR", "AED"];

export const CURRENCY_LABELS: Record<CurrencyCode, string> = {
  RUB: "RUB",
  USD: "USD",
  EUR: "EUR",
  AED: "AED",
};

export const CURRENCY_LOCALES: Record<CurrencyCode, string> = {
  RUB: "ru-RU",
  USD: "en-US",
  EUR: "de-DE",
  AED: "ar-AE",
};

const baseServices: ServiceItem[] = [
  {
    slug: "automation-workflows",
    title: "Automation Workflows",
    summary: "Design and implement end-to-end workflows across sales, support, and operations.",
    tags: ["n8n", "Zapier", "Make"],
    timeline: "1-3 weeks depending on scope",
    problems: [
      "Manual handoffs between tools",
      "Leads or tickets lost between steps",
      "No reliable ownership or audit trail",
    ],
    deliverables: [
      "Workflow architecture map",
      "Production-ready flow implementation",
      "Error handling and fallback logic",
      "Deployment notes and handoff documentation",
    ],
    tools: ["n8n", "Zapier", "Make", "Webhooks", "Airtable"],
    faq: [{ question: "Can we migrate from existing automation?", answer: "Yes, with minimal disruption." }],
  },
  {
    slug: "ai-integrations",
    title: "AI + Integrations",
    summary: "AI-assisted workflows with human approval, context extraction, and controlled actions.",
    tags: ["OpenAI", "APIs", "Human-in-the-loop"],
    timeline: "1-4 weeks depending on data and model behavior",
    problems: [
      "Slow support replies",
      "Inconsistent response quality",
      "No safe review step before sending",
    ],
    deliverables: [
      "Prompt and policy setup",
      "AI drafting with approval checkpoint",
      "Tool integrations for inbox and chat",
      "Operational guardrails and documentation",
    ],
    tools: ["OpenAI", "Gmail", "Slack", "Telegram", "APIs"],
    faq: [{ question: "Do you replace human review?", answer: "No. Human approval can stay in the loop." }],
  },
  {
    slug: "website-conversion",
    title: "Website + Conversion",
    summary: "High-conversion pages connected directly to CRM and notification channels.",
    tags: ["Forms", "CRM", "Analytics"],
    timeline: "1-2 weeks for focused updates",
    problems: [
      "Leads not captured reliably",
      "Slow response after form submissions",
      "Disconnected website and CRM data",
    ],
    deliverables: [
      "Section redesign and UX cleanup",
      "Lead form integration",
      "CRM sync + internal alerts",
      "SEO basics and performance checks",
    ],
    tools: ["HubSpot", "Webhooks", "Google Sheets", "Telegram"],
    faq: [{ question: "Do you support multilingual forms?", answer: "Yes, including RU/EN/AR." }],
  },
  {
    slug: "crm-lead-systems",
    title: "CRM + Lead Systems",
    summary: "From form submission to pipeline updates, with zero lead loss.",
    tags: ["CRM", "Lead routing", "Notifications"],
    timeline: "1-3 weeks",
    problems: [
      "Duplicate contacts across systems",
      "Manual lead qualification",
      "No response SLA visibility",
    ],
    deliverables: [
      "Lead validation and dedupe rules",
      "Contact create/update logic",
      "Routing and assignment setup",
      "Team notification channels",
    ],
    tools: ["HubSpot", "Airtable", "Telegram", "Slack"],
    faq: [{ question: "Do you support both Airtable and Sheets?", answer: "Yes." }],
  },
  {
    slug: "analytics-reporting",
    title: "Analytics + Reporting",
    summary: "Automated reporting pipelines for operations, marketing, and support visibility.",
    tags: ["Dashboards", "Alerts", "Ops"],
    timeline: "1-2 weeks",
    problems: ["Status updates are manual", "No real-time alerts", "Reporting is scattered"],
    deliverables: [
      "Data collection workflow",
      "Scheduled summary reports",
      "Alerting for key events",
      "Dashboard-ready structured data",
    ],
    tools: ["Google Sheets", "Slack", "Telegram", "Webhooks"],
    faq: [{ question: "Can alerts be role-specific?", answer: "Yes, by team and event type." }],
  },
  {
    slug: "ongoing-support",
    title: "Ongoing Support",
    summary: "Continuous iteration, reliability checks, and workflow optimization.",
    tags: ["Monitoring", "Iteration", "Support"],
    timeline: "Monthly retainer",
    problems: ["Automations break silently", "No owner for maintenance", "No scaling roadmap"],
    deliverables: [
      "Monthly optimization cycle",
      "Bug and failure response",
      "Change log and documentation updates",
      "Roadmap planning",
    ],
    tools: ["n8n", "Zapier", "Make", "Slack"],
    faq: [{ question: "Can support include new mini-flows?", answer: "Yes." }],
  },
];

const baseWorkflows: WorkflowItem[] = [
  {
    id: "lead-capture-crm-telegram",
    category: "leadSales",
    title: "Lead Capture -> CRM -> Telegram",
    subtitle: "Agency notification flow",
    trigger: "Website form/chat lead submitted",
    steps: [
      "Validate name + email",
      "Save lead to Airtable/Sheets",
      "Create or update contact in HubSpot",
      "Send Telegram notification to private channel",
    ],
    outcome: "Agency responds faster, no leads lost.",
    tools: ["Webhooks", "Airtable", "Google Sheets", "HubSpot", "Telegram", "n8n"],
    nodes: [
      { title: "Trigger", caption: "Form/chat lead", icon: "01" },
      { title: "Validate", caption: "Name + email", icon: "02" },
      { title: "Store", caption: "Sheets/Airtable", icon: "03" },
      { title: "CRM", caption: "HubSpot update", icon: "04" },
      { title: "Notify", caption: "Telegram alert", icon: "05" },
    ],
  },
  {
    id: "support-ai-human-approval",
    category: "support",
    title: "Support Inbox -> AI Draft -> Human Approval -> Reply",
    subtitle: "Human-controlled AI support",
    trigger: "New support email arrives in Gmail",
    steps: [
      "Extract message context",
      "AI drafts a reply with OpenAI",
      "Notify staff in Slack/Telegram for approval",
      "Send final approved reply",
    ],
    outcome: "Faster support with human control.",
    tools: ["Gmail", "OpenAI", "Slack", "Telegram", "Zapier"],
    nodes: [
      { title: "Trigger", caption: "New Gmail thread", icon: "01" },
      { title: "Context", caption: "Extract details", icon: "02" },
      { title: "AI Draft", caption: "OpenAI response", icon: "03" },
      { title: "Approval", caption: "Team review", icon: "04" },
      { title: "Reply", caption: "Send message", icon: "05" },
    ],
  },
  {
    id: "ecommerce-order-review",
    category: "operations",
    title: "Ecommerce Order -> Updates -> Review Request",
    subtitle: "Common example workflow",
    isCommonExample: true,
    trigger: "New order in Shopify (or store platform)",
    steps: ["Update order database", "Send order confirmation", "After delivery, send review request"],
    outcome: "Better CX and more reviews.",
    tools: ["Shopify", "Airtable", "Email", "Make"],
    nodes: [
      { title: "Trigger", caption: "New order", icon: "01" },
      { title: "Update", caption: "Sync database", icon: "02" },
      { title: "Confirm", caption: "Order message", icon: "03" },
      { title: "Follow-up", caption: "Review request", icon: "04" },
    ],
  },
  {
    id: "marketing-content-pipeline",
    category: "marketing",
    title: "Content Plan -> Approval -> Publish -> Report",
    subtitle: "Marketing operations workflow",
    trigger: "Weekly content queue is generated",
    steps: [
      "Generate draft copy",
      "Route to editor for approval",
      "Publish to selected channels",
      "Send weekly performance summary",
    ],
    outcome: "Consistent publishing with less manual coordination.",
    tools: ["OpenAI", "Telegram", "Slack", "Google Sheets", "n8n"],
    nodes: [
      { title: "Queue", caption: "Weekly plan", icon: "01" },
      { title: "Draft", caption: "AI content", icon: "02" },
      { title: "Approve", caption: "Editor review", icon: "03" },
      { title: "Publish", caption: "Multi-channel", icon: "04" },
      { title: "Report", caption: "Weekly digest", icon: "05" },
    ],
  },
  {
    id: "analytics-alert-loop",
    category: "analytics",
    title: "Data Refresh -> KPI Check -> Alert",
    subtitle: "Analytics and monitoring workflow",
    trigger: "Scheduled data refresh",
    steps: ["Pull latest KPI data", "Check threshold conditions", "Send alert to team channel"],
    outcome: "Faster response to anomalies and missed targets.",
    tools: ["Webhooks", "Google Sheets", "Slack", "Telegram", "Zapier"],
    nodes: [
      { title: "Refresh", caption: "Fetch data", icon: "01" },
      { title: "Check", caption: "Threshold rules", icon: "02" },
      { title: "Alert", caption: "Team notification", icon: "03" },
    ],
  },
];

const baseCaseStudies: CaseStudyItem[] = [
  {
    slug: "lead-routing-upgrade",
    title: "Lead routing and response upgrade",
    category: "Lead Systems",
    industry: "Service business",
    problem: "Leads were arriving through forms and chat but follow-up timing was inconsistent.",
    approach: "Built lead intake workflow with validation, CRM sync, and Telegram notifications.",
    deliverables: ["Unified lead intake map", "Validation and dedupe logic", "CRM update flow", "Telegram alerts"],
    outcomes: ["Lower risk of missed leads", "Faster internal awareness", "Cleaner pipeline data"],
    before: ["Manual copy/paste", "Delayed notifications", "Duplicate records"],
    after: ["Structured intake", "Instant alerts", "Consistent CRM updates"],
    metrics: [
      { label: "Lead response time", before: "2-4 hours", after: "10-20 minutes", impact: "-90%" },
      { label: "Lead loss risk", before: "High", after: "Low", impact: "Major reduction" },
      { label: "Data consistency", before: "Fragmented", after: "Unified", impact: "High confidence" },
    ],
    tools: ["n8n", "HubSpot", "Airtable", "Telegram"],
    tags: ["Lead & Sales", "CRM", "Telegram"],
  },
  {
    slug: "support-approval-system",
    title: "AI-assisted support with approval",
    category: "Support",
    industry: "Digital services",
    problem: "Support inbox volume increased and drafting consumed too much team time.",
    approach: "Added AI draft generation with human approval checkpoints in Slack.",
    deliverables: ["Inbox parsing", "AI drafting flow", "Approval routing", "Final send logging"],
    outcomes: ["Faster draft cycle", "Human quality control", "Clear review ownership"],
    before: ["Manual drafts", "No priority routing", "Slow handoffs"],
    after: ["Draft-first workflow", "Approval gate", "Faster turnaround"],
    metrics: [
      { label: "Draft preparation time", before: "20-30 min", after: "5-10 min", impact: "-60%" },
      { label: "Support queue pressure", before: "High", after: "Moderate", impact: "Improved throughput" },
      { label: "Quality control", before: "Inconsistent", after: "Human-approved", impact: "Stable quality" },
    ],
    tools: ["Zapier", "Gmail", "OpenAI", "Slack"],
    tags: ["Support", "AI", "Human-in-the-loop"],
  },
  {
    slug: "website-crm-sync",
    title: "Website to CRM synchronization",
    category: "Website + CRM",
    industry: "Agency",
    problem: "Website forms were not consistently connected to CRM and internal channels.",
    approach: "Redesigned form handling and connected submissions to CRM + team notifications.",
    deliverables: ["Form UX cleanup", "Submission validation", "CRM mapping", "Notification setup"],
    outcomes: ["Smoother lead pipeline", "Less manual tracking", "Clear ownership"],
    before: ["Disconnected systems", "Manual data transfer", "Unclear ownership"],
    after: ["Connected flow", "Automated routing", "Clear handoff path"],
    metrics: [
      { label: "Form to CRM sync speed", before: "Manual / delayed", after: "Instant", impact: "Near real-time" },
      { label: "Operational workload", before: "High manual effort", after: "Automated handoff", impact: "-50%+" },
      { label: "Pipeline visibility", before: "Limited", after: "Live visibility", impact: "Improved tracking" },
    ],
    tools: ["Webhooks", "HubSpot", "Telegram", "Google Sheets"],
    tags: ["Website", "Conversion", "Operations"],
  },
  {
    slug: "crm-sync-control-center",
    title: "CRM sync control center",
    category: "CRM",
    industry: "B2B services",
    problem: "Contact and deal records were inconsistent across CRM and operations tools.",
    approach: "Built bidirectional sync workflow with precedence rules, retries, and audit logs.",
    deliverables: ["Schema mapping blueprint", "Conflict-resolution logic", "Sync monitoring dashboard", "Exception queue"],
    outcomes: ["Trusted CRM reporting", "Lower reconciliation workload", "Clear data ownership"],
    before: ["Conflicting records", "Manual reconciliation", "Unreliable forecasting"],
    after: ["Consistent records", "Automated sync", "Reliable pipeline metrics"],
    metrics: [
      { label: "Sync error rate", before: "14%", after: "2.1%", impact: "-85%" },
      { label: "Weekly reconciliation time", before: "9 hours", after: "1.5 hours", impact: "-83%" },
      { label: "Pipeline data confidence", before: "Low", after: "High", impact: "Major increase" },
    ],
    tools: ["HubSpot", "n8n", "Webhooks", "Slack"],
    tags: ["CRM", "Operations"],
  },
  {
    slug: "telegram-real-time-notifications",
    title: "Telegram real-time notification system",
    category: "Telegram",
    industry: "Multi-team operations",
    problem: "Critical lead and SLA events were delayed because teams relied on email-only notifications.",
    approach: "Implemented Telegram event routing with severity logic and escalation automation.",
    deliverables: ["Alert taxonomy", "Message templates", "Escalation flow", "Acknowledgment tracking"],
    outcomes: ["Faster incident response", "Improved SLA adherence", "Lower alert noise"],
    before: ["Slow event awareness", "No escalation consistency", "Missed SLA breaches"],
    after: ["Instant team alerts", "Structured escalation", "Improved response ownership"],
    metrics: [
      { label: "Critical alert response time", before: "18 min", after: "2 min", impact: "-89%" },
      { label: "SLA breach frequency", before: "High", after: "Low", impact: "Large reduction" },
      { label: "Escalation completion", before: "62%", after: "96%", impact: "+34 pts" },
    ],
    tools: ["Telegram", "n8n", "Webhooks", "Slack"],
    tags: ["Telegram", "Operations", "Lead & Sales"],
  },
  {
    slug: "ai-decision-engine",
    title: "AI decision engine for workflow routing",
    category: "AI",
    industry: "Automation-first agency",
    problem: "Manual triage delayed high-priority requests and created inconsistent routing quality.",
    approach: "Built confidence-scored AI classification with deterministic fallback branches.",
    deliverables: ["Intent model prompts", "Confidence gate logic", "Manual review queue", "Decision logs"],
    outcomes: ["Faster triage", "More consistent routing", "Explainable AI operations"],
    before: ["Manual sorting", "Priority mistakes", "No confidence scoring"],
    after: ["Automated routing", "Low-confidence fallback", "Auditable decisions"],
    metrics: [
      { label: "Triage time", before: "12 min", after: "2.5 min", impact: "-79%" },
      { label: "Routing accuracy", before: "71%", after: "92%", impact: "+21 pts" },
      { label: "Manual triage volume", before: "100%", after: "28%", impact: "-72%" },
    ],
    tools: ["OpenAI", "n8n", "HubSpot", "Webhooks"],
    tags: ["AI", "Operations", "Support"],
  },
  {
    slug: "human-loop-approval-gate",
    title: "Human-in-the-loop approval gate",
    category: "Human-in-the-loop",
    industry: "Regulated digital services",
    problem: "AI-assisted actions needed compliance-safe approval controls before execution.",
    approach: "Added risk scoring, reviewer queues, and auditable approval checkpoints.",
    deliverables: ["Risk model", "Approval queue", "Escalation timers", "Immutable approval logs"],
    outcomes: ["Safer automation", "Compliance traceability", "Higher reviewer confidence"],
    before: ["No approval structure", "Execution risk", "Limited traceability"],
    after: ["Controlled approvals", "Risk-aware routing", "Full audit history"],
    metrics: [
      { label: "Risk incident rate", before: "Moderate", after: "Very low", impact: "Major reduction" },
      { label: "Approval turnaround", before: "45 min", after: "11 min", impact: "-76%" },
      { label: "Audit completeness", before: "Partial", after: "Comprehensive", impact: "Compliance-ready" },
    ],
    tools: ["OpenAI", "n8n", "Slack", "Telegram"],
    tags: ["Human-in-the-loop", "AI", "Support"],
  },
  {
    slug: "conversion-follow-up-optimization",
    title: "Conversion follow-up optimization",
    category: "Conversion",
    industry: "Performance marketing",
    problem: "Lead capture was strong but follow-up inconsistency reduced booked-call conversion.",
    approach: "Implemented behavior-based multi-channel follow-up journeys with booking sync.",
    deliverables: ["Segmentation rules", "Follow-up sequence engine", "Booking integration", "Attribution tracking"],
    outcomes: ["Higher booked-call rate", "Consistent follow-up cadence", "Better campaign ROI visibility"],
    before: ["Missed reminders", "Static messaging", "Weak attribution"],
    after: ["Adaptive cadence", "Behavior triggers", "Funnel visibility"],
    metrics: [
      { label: "Lead-to-call conversion", before: "8.4%", after: "15.6%", impact: "+86%" },
      { label: "First follow-up speed", before: "3 hours", after: "4 minutes", impact: "-98%" },
      { label: "No-response lead rate", before: "49%", after: "23%", impact: "-53%" },
    ],
    tools: ["n8n", "WhatsApp", "Gmail", "HubSpot"],
    tags: ["Conversion", "Lead & Sales", "Website"],
  },
  {
    slug: "operations-reporting-dashboard",
    title: "Operations reporting dashboard automation",
    category: "Operations",
    industry: "Service operations",
    problem: "Weekly KPI reports were manually assembled and too slow for operational decisions.",
    approach: "Built scheduled ETL workflow for KPI calculation, dashboard refresh, and anomaly alerts.",
    deliverables: ["Data connectors", "KPI engine", "Automated digest", "Threshold alerting"],
    outcomes: ["Faster decision cycles", "Lower reporting overhead", "Real-time KPI visibility"],
    before: ["Manual reports", "Scattered data", "Delayed alerts"],
    after: ["Automated dashboards", "Unified data view", "Proactive notifications"],
    metrics: [
      { label: "Reporting prep time", before: "11 hours/week", after: "2.8 hours/week", impact: "-75%" },
      { label: "KPI freshness", before: "Weekly", after: "Daily / real-time alerts", impact: "Faster insight" },
      { label: "Ops incident detection", before: "Reactive", after: "Proactive", impact: "Improved control" },
    ],
    tools: ["n8n", "Google Sheets", "Slack", "Telegram"],
    tags: ["Operations", "CRM"],
  },
];

const baseArticles: BlogArticle[] = [
  {
    slug: "what-is-n8n-vs-zapier",
    category: "n8n Workflows",
    title: "What is n8n and when to use it instead of Zapier?",
    summary: "A practical engineering guide for choosing n8n vs Zapier based on architecture, scale, and operational control.",
    date: "2026-03-03",
    readingTime: "14 min",
    sections: [
      {
        heading: "1. Introduction",
        body: "Teams adopting automation often ask one question first: should we build on n8n or Zapier? Both tools can ship value quickly, but they optimize for different operating models. This guide explains the trade-offs from a technical and business operations perspective so founders, developers, and ops leads can make the right choice early.",
      },
      {
        heading: "2. Business Problem",
        body: "Most teams start with disconnected SaaS tools and manual handoffs. As process complexity grows, brittle point-to-point automations create hidden cost: duplicate records, failure blind spots, and no clear ownership. The platform decision becomes critical because it affects maintainability, visibility, and long-term workflow governance.",
      },
      {
        heading: "3. Why Automation Solves the Problem",
        body: "A workflow orchestration layer centralizes triggers, rules, data mapping, and observability. Instead of repeating manual copy-paste tasks, teams get deterministic process execution and faster response loops. Good automation also enforces consistency, making operational performance less dependent on individual team habits.",
      },
      {
        heading: "4. Workflow Architecture",
        body: "Reference architecture for a typical growth workflow:\nForm Trigger -> Validation -> Enrichment -> CRM Upsert -> Team Notification -> Audit Log.\nThe same architecture can be built in both tools, but n8n offers stronger flexibility for custom branching and self-hosted control.",
        image: "/images/case-workflows/crm-sync-control-center.svg",
        imageAlt: "n8n-style architecture flow for CRM synchronization",
        imageCaption: "Architecture example showing validation, conflict rules, and synchronized system updates.",
      },
      {
        heading: "5. Step-by-Step Automation Workflow",
        body: "Step 1: Capture the trigger event from form, inbox, or API.\nStep 2: Validate and normalize payload fields.\nStep 3: Enrich data from CRM or external context APIs.\nStep 4: Execute business rules (scoring, routing, ownership).\nStep 5: Write updates to core systems.\nStep 6: Notify the operating team with structured context.\nStep 7: Store execution logs for debugging and compliance.",
      },
      {
        heading: "6. n8n Workflow Explanation",
        body: "n8n gives deeper node-level control for custom logic and reusable sub-workflows. Common nodes include Webhook, IF, Function, Merge, HTTP Request, and Data Store nodes. For engineering teams, this means better handling of edge cases and lower lock-in when process requirements evolve.",
      },
      {
        heading: "7. Example Use Cases",
        body: "1) Lead routing with conditional ownership rules.\n2) AI-assisted support drafting with human approvals.\n3) CRM sync with conflict resolution.\n4) Multi-channel notifications with escalation logic.\n5) Scheduled reporting with anomaly alerts.",
      },
      {
        heading: "8. Common Pitfalls",
        body: "A frequent mistake is selecting a tool based only on setup speed, not lifecycle complexity. Teams also under-design error handling, causing silent failures in production. Another issue is scattered credentials and undocumented mapping logic, which makes workflows difficult to maintain.",
      },
      {
        heading: "9. Best Practices",
        body: "Use explicit naming conventions for workflows and nodes. Keep business rules versioned and documented next to each automation. Add retry strategy, error branches, and alerting from day one. Build with observability so operations can detect and resolve issues fast.",
      },
      {
        heading: "10. Scaling the Workflow",
        body: "At scale, route by region, product line, and ownership capacity instead of sending all events through one channel. Introduce queue-based processing for burst traffic and idempotency keys for safe retries. Move from single-flow automations to modular workflows that share common validation and logging steps.",
      },
      {
        heading: "11. Security and Data Handling",
        body: "Store API keys in secure environment variables, never hard-code credentials in workflow nodes. Enforce payload validation before any downstream writes. Minimize personal data in logs and define retention policies for audit records. For regulated teams, add approval checkpoints on sensitive actions.",
      },
      {
        heading: "12. Frequently Asked Questions",
        body: "Q: Is n8n better for every team?\nA: No. It is better when you need customization, control, and complex branching.\nQ: Is Zapier still useful?\nA: Yes, especially for lightweight, low-maintenance app-to-app automations.\nQ: Can teams use both?\nA: Yes. Many organizations use Zapier for simple automations and n8n for core process orchestration.",
      },
      {
        heading: "13. Conclusion",
        body: "Choose the platform that matches your operational maturity, not just your immediate setup speed. If your workflows involve custom logic, governance, and scale, n8n is usually the stronger foundation. If needs are simple and speed is the only priority, Zapier can still be effective.",
      },
    ],
  },
  {
    slug: "website-leads-to-telegram-10-minutes",
    category: "Automation",
    title: "How to connect website leads to Telegram in 10 minutes (workflow overview)",
    summary: "A practical lead-notification tutorial: website form to n8n to Telegram, with validation, routing, and follow-up logic.",
    date: "2026-03-03",
    readingTime: "16 min",
    sections: [
      {
        heading: "1. Introduction",
        body: "Many businesses capture leads through website forms, landing pages, and chat widgets, but the critical KPI is response speed. If your sales team reacts slowly, high-intent leads often contact competitors first. In this guide, we build a production-ready n8n workflow that sends instant Telegram alerts and keeps CRM data clean.",
      },
      {
        heading: "2. Business Problem",
        body: "Email-based lead alerts are often missed, delayed, or buried in noisy inboxes. This creates a gap between lead submission and first contact, which directly hurts conversion rates. Teams also struggle with fragmented data when lead details are manually copied into CRM systems.",
      },
      {
        heading: "3. Why Automation Solves the Problem",
        body: "Automation closes the response-time gap by routing lead data instantly to channels where teams are active. It also enforces consistent data validation before records reach CRM. Instead of relying on manual checks, teams get predictable handoff and faster qualification cycles.",
      },
      {
        heading: "4. Workflow Architecture",
        body: "Minimal architecture:\nWebsite Form -> Webhook Trigger -> Data Validation -> Lead Scoring -> CRM Create Contact -> Telegram Notification -> Follow-up Scheduler -> CRM Update.\nThis architecture supports both speed and governance because each node has a clear purpose and fallback behavior.",
        image: "/images/case-workflows/lead-routing-automation.svg",
        imageAlt: "n8n-style lead routing workflow with webhook, scoring, CRM, and Telegram nodes",
        imageCaption: "Lead routing automation pipeline with branching follow-up logic and CRM synchronization.",
      },
      {
        heading: "5. Step-by-Step Automation Workflow",
        body: "Step 1: Create a webhook endpoint in n8n and secure it with signature validation.\nStep 2: Configure your website form to POST payloads to that endpoint.\nStep 3: Validate required fields (name, email, phone, source) and reject malformed records.\nStep 4: Normalize payload keys so CRM mapping is deterministic.\nStep 5: Upsert contact/deal data in your CRM.\nStep 6: Send a structured Telegram alert including source, intent notes, and owner routing.\nStep 7: Start a follow-up timer if no sales action is detected.\nStep 8: Update CRM status after first response.",
      },
      {
        heading: "6. n8n Workflow Explanation",
        body: "Webhook Node receives the submission event. Set/Function nodes format and normalize payloads. IF nodes perform validation and branch invalid data to error logs. CRM nodes upsert records safely. Telegram node sends rich alert messages. Wait and IF nodes handle delayed follow-up checks and escalation.",
      },
      {
        heading: "7. Example Use Cases",
        body: "Real estate agencies for listing inquiries.\nPerformance marketing agencies for campaign lead routing.\nConsultancies for strategy call applications.\nB2B SaaS teams for demo request triage.\nLocal service businesses for inbound booking intent.",
      },
      {
        heading: "8. Common Pitfalls",
        body: "No validation layer leads to dirty CRM records. Missing deduplication creates duplicate contacts and confused ownership. Unstructured Telegram messages force manual interpretation. Teams also forget follow-up automation, leaving warm leads untouched after first alert.",
      },
      {
        heading: "9. Best Practices",
        body: "Add lead scoring and clear owner assignment in the same workflow. Standardize alert format with concise context and action steps. Track response-time SLA as a measurable KPI. Configure backup notification channels for mission-critical lead sources.",
      },
      {
        heading: "10. Scaling the Workflow",
        body: "Route leads by region, service category, campaign source, or deal size instead of one shared channel. Use queue patterns for burst handling during ad campaigns. Add segmentation and automated nurture branches for low-intent submissions. Integrate with HubSpot or Pipedrive to keep pipeline state synchronized.",
      },
      {
        heading: "11. Security and Data Handling",
        body: "Never expose raw webhook URLs publicly without verification controls. Validate payload signatures and limit accepted request origins. Store credentials in encrypted secrets and avoid logging full personal data. Define retention rules for execution logs and comply with local privacy obligations.",
      },
      {
        heading: "12. Frequently Asked Questions",
        body: "Q: How long does this workflow take to implement?\nA: A focused version can be launched in one day; production-hardening usually takes 3-5 days.\nQ: Can it handle high lead volume?\nA: Yes, with queueing, retries, and idempotent CRM upserts.\nQ: Do I need coding skills?\nA: Basic no-code setup is possible, but custom logic benefits from light scripting.\nQ: Can Telegram notifications be customized?\nA: Yes, by source, lead score, owner, and urgency level.",
      },
      {
        heading: "13. Conclusion",
        body: "Automating website lead notifications is one of the fastest ROI wins in operations automation. With n8n, teams can move from slow inbox workflows to instant structured alerts and consistent CRM updates. The result is faster response, cleaner data, and higher conversion confidence.",
      },
    ],
  },
  {
    slug: "ai-assisted-support-safe-approval",
    category: "AI for Business",
    title: "AI-assisted support: human approval workflows that stay safe",
    summary: "A technical playbook for AI-assisted support drafting with human approval, risk routing, and auditability.",
    date: "2026-03-03",
    readingTime: "15 min",
    sections: [
      {
        heading: "1. Introduction",
        body: "Support teams want faster response times, but fully automated replies can create quality and compliance risks. The strongest model is AI-assisted drafting with explicit human approval before sending. This article explains how to design that workflow in n8n so speed improves without losing control.",
      },
      {
        heading: "2. Business Problem",
        body: "As ticket volume increases, manual drafting becomes a bottleneck and first-response SLAs slip. Teams also face inconsistency in tone, policy interpretation, and escalation quality. Without structured routing, high-risk tickets can be mishandled or delayed.",
      },
      {
        heading: "3. Why Automation Solves the Problem",
        body: "Automation handles repetitive parsing, context retrieval, and draft generation in seconds. Human reviewers then focus on judgment-heavy decisions instead of writing every response from scratch. This hybrid model improves throughput while preserving quality and compliance.",
      },
      {
        heading: "4. Workflow Architecture",
        body: "Suggested architecture:\nEmail Inbox Trigger -> Ticket Parser -> AI Draft Generator -> Confidence Check -> Human Approval Node -> Send Response -> Ticket Update + Audit Log.\nThe architecture is designed around a strict approval gate to prevent unreviewed outbound replies.",
        image: "/images/case-workflows/ai-support-drafting.svg",
        imageAlt: "AI support drafting workflow with human approval in n8n-style canvas",
        imageCaption: "Human-in-the-loop support architecture with confidence gating and status tracking.",
      },
      {
        heading: "5. Step-by-Step Automation Workflow",
        body: "Step 1: Trigger on inbound email or ticket event.\nStep 2: Parse subject, intent, account metadata, and conversation history.\nStep 3: Generate AI draft with guardrails and response templates.\nStep 4: Evaluate confidence and risk category.\nStep 5: Route to reviewer channel with Approve/Edit/Reject actions.\nStep 6: Send approved response via support channel.\nStep 7: Update ticket state and record full audit trail.",
      },
      {
        heading: "6. n8n Workflow Explanation",
        body: "Email/Gmail trigger nodes ingest new messages. Function nodes prepare prompt context and policy constraints. OpenAI node drafts responses. IF/Switch nodes branch high-risk categories to specialist queues. Slack or Telegram approval nodes capture reviewer decision. Send nodes dispatch final approved messages, and data-store nodes persist logs.",
      },
      {
        heading: "7. Example Use Cases",
        body: "SaaS customer support for billing and onboarding tickets.\nAgency client support with multilingual reply drafts.\nMarketplace support teams handling order-related inquiries.\nInternal IT helpdesk triage with escalation policies.",
      },
      {
        heading: "8. Common Pitfalls",
        body: "Teams often skip explicit policy constraints in prompts, causing unsafe draft suggestions. Another issue is approving without visibility into source context. Many implementations also fail to capture decision logs, making QA and compliance review difficult.",
      },
      {
        heading: "9. Best Practices",
        body: "Use standardized response templates and brand-tone guardrails. Include customer context and ticket metadata in approval payloads. Set confidence thresholds and auto-route low-confidence drafts to manual handling. Track reviewer edits as feedback signals for prompt improvement.",
      },
      {
        heading: "10. Scaling the Workflow",
        body: "Add queue-based assignment by product line, language, and severity. Introduce specialist branches for legal, security, or financial cases. Build reusable sub-workflows for shared parsing and policy checks so new queues can be launched quickly.",
      },
      {
        heading: "11. Security and Data Handling",
        body: "Mask sensitive customer fields in logs and notifications. Apply least-privilege API credentials for all integration nodes. Keep approval events immutable for audit requirements. Define retention and deletion policies for support transcripts and generated drafts.",
      },
      {
        heading: "12. Frequently Asked Questions",
        body: "Q: Can AI send messages automatically?\nA: It can, but for most teams a human approval gate is safer.\nQ: How much time can this save?\nA: Many teams reduce draft time by 40-70%.\nQ: Can this work with chat and email together?\nA: Yes, via channel-specific trigger and send nodes.\nQ: How do we improve model quality over time?\nA: Feed approved edits and rejection reasons into prompt refinement cycles.",
      },
      {
        heading: "13. Conclusion",
        body: "AI-assisted support works best when automation and human review are intentionally combined. n8n makes it possible to operationalize this pattern with confidence checks, approval routing, and traceable outcomes. The result is faster support without sacrificing trust.",
      },
    ],
  },
  {
    slug: "five-automations-small-business",
    category: "Automation",
    title: "5 automations every small business should have",
    summary: "A strategic automation blueprint for small teams: which five workflows to launch first and how to operationalize them.",
    date: "2026-03-03",
    readingTime: "13 min",
    sections: [
      {
        heading: "1. Introduction",
        body: "Small businesses rarely fail because they lack ideas; they fail because operations become inconsistent as volume grows. A focused automation foundation can create immediate leverage without enterprise complexity. This guide covers five high-impact workflows that deliver predictable gains quickly.",
      },
      {
        heading: "2. Business Problem",
        body: "Growing teams usually run on fragmented tools and manual reminders. Leads are missed, follow-ups are inconsistent, and reporting is always late. The result is slower growth and rising operational stress.",
      },
      {
        heading: "3. Why Automation Solves the Problem",
        body: "Automation turns recurring operational tasks into deterministic execution paths. Instead of relying on memory and ad hoc coordination, teams get built-in triggers, routing rules, and alerts. This creates reliability and frees people for high-value work.",
      },
      {
        heading: "4. Workflow Architecture",
        body: "Core starter architecture:\nLead Intake Flow + Follow-up Flow + Support Routing Flow + Payment/Invoice Reminder Flow + Weekly Reporting Flow.\nEach flow should share validation, logging, and alerting patterns for easier maintenance.",
        image: "/images/case-workflows/operations-automation.svg",
        imageAlt: "Operations automation architecture for small business workflows",
        imageCaption: "Starter automation stack showing scheduled reporting and operational orchestration.",
      },
      {
        heading: "5. Step-by-Step Automation Workflow",
        body: "Step 1: Map your top repetitive processes and assign measurable KPIs.\nStep 2: Launch lead intake automation first.\nStep 3: Add follow-up reminders and ownership routing.\nStep 4: Automate support ticket triage.\nStep 5: Implement invoicing/payment reminders.\nStep 6: Add weekly KPI reporting digest.\nStep 7: Review logs weekly and iterate.",
      },
      {
        heading: "6. n8n Workflow Explanation",
        body: "Use Webhook and Schedule nodes for triggers, IF/Switch nodes for routing, and integration nodes for CRM, messaging, and storage. Function nodes handle normalization and simple logic. Error trigger workflows provide resilience and incident visibility.",
      },
      {
        heading: "7. Example Use Cases",
        body: "1) Local services: form inquiry -> instant owner alert.\n2) Coaching businesses: application -> qualification -> booking reminder.\n3) Ecommerce: order events -> support and review request flows.\n4) Agencies: lead intake -> CRM assignment -> weekly pipeline digest.",
      },
      {
        heading: "8. Common Pitfalls",
        body: "Launching too many automations at once creates operational noise. Another mistake is skipping success metrics, so teams cannot prove impact. Poor naming and no documentation quickly turn simple flows into maintenance debt.",
      },
      {
        heading: "9. Best Practices",
        body: "Start with one workflow per business bottleneck and define owner + SLA. Standardize input schemas and message templates. Keep fallback alerts for critical paths. Document every workflow trigger, branch condition, and expected output.",
      },
      {
        heading: "10. Scaling the Workflow",
        body: "Once baseline flows are stable, introduce segmentation by region, product, and lifecycle stage. Move shared logic into reusable sub-workflows. Add queueing for burst traffic and granular monitoring dashboards for each automation stream.",
      },
      {
        heading: "11. Security and Data Handling",
        body: "Apply input validation for all external triggers. Use role-restricted credentials and rotate secrets periodically. Avoid storing sensitive data in notification text. Set clear retention policies for logs and customer records.",
      },
      {
        heading: "12. Frequently Asked Questions",
        body: "Q: Which workflow should a small business automate first?\nA: Usually lead intake and first-response alerting.\nQ: Do we need a developer to start?\nA: Not always, but technical review helps prevent scaling issues.\nQ: How fast can we launch?\nA: Most starter workflows can launch in days, not months.\nQ: How do we measure ROI?\nA: Track response time, conversion lift, and manual hours saved.",
      },
      {
        heading: "13. Conclusion",
        body: "Small businesses gain the most from practical, focused automation rather than large transformation projects. Start with the five workflows that remove repetitive bottlenecks and improve response speed. Then scale intentionally as process maturity increases.",
      },
    ],
  },
  {
    slug: "crm-basics-forms-to-pipeline",
    category: "CRM & Lead Systems",
    title: "CRM basics: from forms to pipeline",
    summary: "A technical CRM operations guide: from form capture to clean stages, ownership, and reporting integrity.",
    date: "2026-03-03",
    readingTime: "14 min",
    sections: [
      {
        heading: "1. Introduction",
        body: "Many companies invest in CRM but still operate with inconsistent pipeline data. The missing piece is workflow design between form submission and stage progression. This guide explains how to build a reliable forms-to-pipeline system with automation guardrails.",
      },
      {
        heading: "2. Business Problem",
        body: "When form data enters CRM without validation and ownership logic, records become inconsistent quickly. Sales teams then mistrust dashboards and rely on manual updates. Forecasting quality drops because stage transitions do not reflect reality.",
      },
      {
        heading: "3. Why Automation Solves the Problem",
        body: "Automation enforces field standards, lead qualification rules, and routing policies every time data enters CRM. It also records stage updates and handoff events consistently. This creates higher confidence in pipeline analytics and operational decisions.",
      },
      {
        heading: "4. Workflow Architecture",
        body: "Reference flow:\nForm Trigger -> Field Validation -> Data Formatter -> Duplicate Check -> CRM Upsert -> Owner Assignment -> Stage Rules -> Notification + Log.\nThe architecture separates data quality checks from business routing logic for easier debugging.",
        image: "/images/case-workflows/website-crm-sync.svg",
        imageAlt: "Website form to CRM synchronization architecture",
        imageCaption: "Form-to-CRM architecture with duplicate control, owner assignment, and logging.",
      },
      {
        heading: "5. Step-by-Step Automation Workflow",
        body: "Step 1: Capture incoming form payloads through webhook trigger.\nStep 2: Validate required fields and normalize naming conventions.\nStep 3: Detect duplicates using deterministic keys.\nStep 4: Upsert contact/deal entities in CRM.\nStep 5: Assign owner based on territory, source, or queue load.\nStep 6: Apply stage entry criteria.\nStep 7: Notify team and write execution log.",
      },
      {
        heading: "6. n8n Workflow Explanation",
        body: "Webhook and Set nodes handle ingestion and normalization. IF/Switch nodes enforce qualification and routing policies. CRM nodes perform idempotent create/update operations. Telegram/Slack nodes deliver assignment alerts. Data-store nodes preserve audit history for lifecycle analysis.",
      },
      {
        heading: "7. Example Use Cases",
        body: "Agency inbound forms to HubSpot deals.\nB2B demo requests with territory-based owner assignment.\nFranchise lead routing by location.\nMarketplace seller applications with qualification scoring.",
      },
      {
        heading: "8. Common Pitfalls",
        body: "Missing duplicate controls create fragmented customer history. Overly broad stage definitions inflate pipeline quality artificially. Teams often notify owners without enforcing SLA tracking, leading to silent drop-offs after assignment.",
      },
      {
        heading: "9. Best Practices",
        body: "Define a canonical data contract for inbound forms. Use idempotent upserts and explicit stage transition rules. Attach owner SLA clocks to each assignment event. Build weekly pipeline hygiene jobs for stale-stage review.",
      },
      {
        heading: "10. Scaling the Workflow",
        body: "As volume grows, split intake by product line and market segment. Add enrichment layers before scoring to improve assignment quality. Move from static assignment to capacity-aware routing. Introduce exception queues for ambiguous records.",
      },
      {
        heading: "11. Security and Data Handling",
        body: "Restrict webhook access and validate request signatures. Encrypt credentials and rotate CRM API tokens. Limit sensitive field exposure in alerts and logs. Keep audit records for compliance and incident investigation.",
      },
      {
        heading: "12. Frequently Asked Questions",
        body: "Q: What is the most important first step?\nA: Define required fields and duplicate prevention policy.\nQ: Can this work with any CRM?\nA: Yes, with proper field mapping and API capabilities.\nQ: How often should pipeline hygiene run?\nA: Daily checks for fast-moving teams; weekly minimum for smaller teams.\nQ: Do we need custom code?\nA: Many flows are no-code, but custom logic helps with advanced routing.",
      },
      {
        heading: "13. Conclusion",
        body: "CRM performance depends less on the tool itself and more on workflow discipline. Automating forms-to-pipeline transitions creates cleaner data, faster ownership, and more reliable forecasting. Start with validation and routing, then scale into advanced lifecycle automation.",
      },
    ],
  },
  {
    slug: "website-automation-modern-growth-stack",
    category: "Website Conversion",
    title: "Website + automations: the modern growth stack",
    summary: "A modern growth engineering guide for connecting website conversion systems to CRM, operations, and AI workflows.",
    date: "2026-03-03",
    readingTime: "15 min",
    sections: [
      {
        heading: "1. Introduction",
        body: "A high-conversion website is not just a design deliverable; it is the front door of an operations system. The page experience and the post-submit workflow must be designed together. This guide explains how to build a website-centric automation stack that supports real revenue outcomes.",
      },
      {
        heading: "2. Business Problem",
        body: "Teams often invest in landing pages but leave lead handling disconnected from CRM and internal response workflows. This causes delayed follow-up, incomplete attribution, and poor conversion insight. Marketing and operations then optimize different metrics without shared context.",
      },
      {
        heading: "3. Why Automation Solves the Problem",
        body: "Automation connects form submissions, attribution metadata, routing logic, and team alerts in one deterministic flow. Every lead event is captured, qualified, and acted on quickly. This creates a closed-loop system where conversion improvements are measurable and repeatable.",
      },
      {
        heading: "4. Workflow Architecture",
        body: "Growth stack architecture:\nWebsite Form + Tracking -> Webhook Intake -> Validation -> Enrichment -> CRM Upsert -> Sales/Support Alerts -> Analytics Dashboard.\nThis architecture ensures both campaign attribution and operational response are handled in one pipeline.",
        image: "/images/case-workflows/conversion-optimization.svg",
        imageAlt: "Conversion optimization workflow linking website leads to CRM and sales alerts",
        imageCaption: "Website conversion workflow with qualification and alert-driven follow-up.",
      },
      {
        heading: "5. Step-by-Step Automation Workflow",
        body: "Step 1: Capture UTM and source metadata at submit time.\nStep 2: Send payload into webhook intake.\nStep 3: Validate and normalize lead data.\nStep 4: Enrich lead profile using CRM or enrichment APIs.\nStep 5: Update CRM objects and assign owner.\nStep 6: Trigger immediate team notification.\nStep 7: Push events to reporting layer for conversion analysis.",
      },
      {
        heading: "6. n8n Workflow Explanation",
        body: "n8n orchestrates website events across CRM, messaging, and analytics destinations. Common nodes include Webhook, Set, IF, HTTP Request, CRM connectors, and notification nodes. Wait nodes can power follow-up reminders for uncontacted leads, while logs track lifecycle quality.",
      },
      {
        heading: "7. Example Use Cases",
        body: "Agency landing pages routing leads by service intent.\nSaaS demo funnels with SDR assignment automation.\nConsulting applications with qualification thresholds.\nEcommerce high-ticket inquiry handling with instant owner alerts.",
      },
      {
        heading: "8. Common Pitfalls",
        body: "Collecting conversion events without source context weakens campaign optimization. Another problem is poor field naming consistency between forms and CRM. Teams also overlook failover alerts, so intake issues go unnoticed during high-traffic periods.",
      },
      {
        heading: "9. Best Practices",
        body: "Treat website forms as production APIs with strict data contracts. Keep message templates standardized for internal alerts. Measure lead response time as a core conversion metric, not just form submissions. Use periodic QA tests on the full submit-to-contact path.",
      },
      {
        heading: "10. Scaling the Workflow",
        body: "Scale by creating segment-specific routing for product lines, regions, and campaign tiers. Introduce intelligent lead scoring and priority queues. Add asynchronous processing for high-volume events and build dashboard slices by source and owner performance.",
      },
      {
        heading: "11. Security and Data Handling",
        body: "Apply anti-spam controls, request validation, and secure credential management. Avoid exposing personally identifiable information in unsecured channels. Set clear retention and deletion policies for lead data. Audit integration permissions quarterly.",
      },
      {
        heading: "12. Frequently Asked Questions",
        body: "Q: Can we run this with existing website builders?\nA: Yes, as long as form events can POST to webhooks.\nQ: Do we need a full CRM migration first?\nA: No, you can start with your current CRM and improve mapping iteratively.\nQ: How quickly can results appear?\nA: Response-time and lead-handoff improvements are often visible in the first week.\nQ: Can AI be added later?\nA: Yes, AI scoring and drafting layers can be added after baseline stability.",
      },
      {
        heading: "13. Conclusion",
        body: "Modern growth performance depends on more than page design; it depends on connected operations after conversion events occur. When websites, CRM, notifications, and analytics run in one automation stack, teams respond faster and optimize with better data. That is the foundation of sustainable conversion growth.",
      },
    ],
  },
];
const ENGLISH_CONTENT: SiteCopy = {
  meta: {
    siteTitle: "ZEC | AI Automation Agency",
    siteDescription: "ZEC builds AI automation workflows with n8n, Zapier, Make, APIs, and CRM integrations.",
    pages: {
      home: { title: "ZEC | AI Automation Agency", description: "Premium automation-native agency for websites, CRM, and AI workflows." },
      solutions: { title: "Solutions | ZEC", description: "Service overview for AI automation, integrations, and conversion websites." },
      solutionDetail: { title: "Service Detail | ZEC", description: "Reusable service blueprint with deliverables, workflow examples, and FAQ." },
      workflows: { title: "Automation Workflows | ZEC", description: "Blueprints for lead capture, support, operations, marketing, and analytics." },
      pricing: { title: "Pricing | ZEC", description: "Localized pricing in RUB, USD/EUR, and AED with transparent scope." },
      caseStudies: { title: "Case Studies | ZEC", description: "Qualitative outcomes from automation and integration projects." },
      caseDetail: { title: "Case Study Detail | ZEC", description: "Context, approach, deliverables, and qualitative outcomes." },
      blog: { title: "Blog | ZEC", description: "Automation, n8n, Zapier, AI operations, and website conversion articles." },
      article: { title: "Article | ZEC", description: "CMS-ready article template with related posts and table of contents." },
      about: { title: "About | ZEC", description: "Who we are, how we work, and why we build automation-first systems." },
      contact: { title: "Contact | ZEC", description: "Tell us your workflow goals. We reply within 5 business days." },
      faq: { title: "FAQ | ZEC", description: "Answers about pricing, delivery, tools, language support, and security." },
      privacy: { title: "Privacy Policy | ZEC", description: "Privacy placeholder policy for ZEC website and lead forms." },
      terms: { title: "Terms of Service | ZEC", description: "Terms placeholder policy for ZEC services and website use." },
      auth: { title: "Client Portal | ZEC", description: "Secure client area is being prepared." },
    },
  },
  brand: {
    name: "ZEC",
    tagline: "Automation-native agency for modern teams",
    trustNote: "Built with clear documentation, transparent delivery, and long-term support.",
  },
  nav: {
    home: "Home",
    solutions: "Solutions",
    workflows: "Workflows",
    pricing: "Pricing",
    caseStudies: "Case Studies",
    blog: "Blog",
    about: "About",
    contact: "Contact",
    faq: "FAQ",
    privacy: "Privacy Policy",
    terms: "Terms",
    getStarted: "Get started",
    bookCall: "Book free audit",
    seeWorkflows: "See workflows",
  },
  common: {
    contactSales: "Contact sales",
    viewDetails: "View details",
    readArticle: "Read article",
    requestWorkflow: "Request this workflow",
    downloadWorkflowOutline: "Download workflow outline",
    mostPopular: "Most popular",
    taxesNote: "Taxes/VAT may apply depending on country.",
    languageAuto: "Language auto",
  },
  home: {
    announcement: "Automation systems for growth, support, and operations",
    title: "Automate Your Business Operations With AI & n8n Workflows",
    subtitle: "We design intelligent automation systems that eliminate repetitive work, respond to leads instantly, and connect your entire business stack.",
    primaryCta: "Book Free Automation Audit",
    secondaryCta: "See How It Works",
    trustMicrocopy: "Built with n8n, Zapier, Make + modern AI tooling.",
    trustStrip: ["Secure", "Fast delivery", "Documentation", "Support"],
    servicesTitle: "Services snapshot",
    servicesSubtitle: "Practical implementation across automation, websites, CRM, and reporting.",
    workflowsTitle: "How Automation Works",
    workflowsSubtitle: "Trigger -> Steps -> Outcome. Switch between real workflow examples and see the pipeline run.",
    processTitle: "How we work",
    processSteps: [
      { title: "Automation Audit", body: "Map goals, tools, and process bottlenecks." },
      { title: "Workflow Design", body: "Design trigger-step-outcome architecture by business priority." },
      { title: "Build & Integration", body: "Implement workflows, API connections, and fallback logic." },
      { title: "Testing", body: "Run staged QA and validate edge cases with your team." },
      { title: "Deployment", body: "Go live with documentation and clear ownership." },
      { title: "Monitoring & Optimization", body: "Track reliability and continuously improve performance." },
    ],
    casePreviewTitle: "Case study previews",
    casePreviewSubtitle: "Before/After structure with measurable impact snapshots and delivery context.",
    pricingPreviewTitle: "Pricing preview",
    pricingPreviewSubtitle: "Start small, then scale by complexity and support model.",
    faqPreviewTitle: "FAQ preview",
    faqPreviewSubtitle: "Quick answers on delivery, tools, pricing, and language support.",
    leadCaptureTitle: "How our lead capture works",
    leadCaptureSubtitle: "Form/chat lead -> n8n webhook + routing -> CRM update + Telegram alert -> fast team response.",
    finalCtaTitle: "Ready to automate your next process?",
    finalCtaSubtitle: "Share your current stack and goals. We will propose a practical first workflow.",
    demoLabel: "5s Loop Demo (Replace with Lottie/MP4)",
    demoReplaceHint: "Fallback animation included. Replace with a compressed 5-second loop showing nodes connecting and updates sent.",
    demoWatermark: "ZEC",
  },
  solutionsPage: {
    title: "Services / Solutions",
    subtitle: "From lead capture to support workflows, we ship systems that reduce manual work and improve response speed.",
    timelineLabel: "Typical timeline",
    workflowsIncludedLabel: "Workflows included",
  },
  solutionDetailPage: {
    problemsTitle: "Problems we solve",
    deliverablesTitle: "What we deliver",
    exampleWorkflowTitle: "Example workflow",
    toolsTitle: "Tools used",
    faqTitle: "Service FAQ",
    ctaTitle: "Need this service in your stack?",
  },
  workflowsPage: {
    title: "Automation Workflows",
    subtitle: "Blueprints we build for lead & sales, support, operations, marketing, and analytics.",
    categories: {
      leadSales: "Lead & Sales",
      support: "Support",
      operations: "Operations",
      marketing: "Marketing",
      analytics: "Analytics",
    },
    triggerLabel: "Trigger",
    stepsLabel: "Steps",
    outcomeLabel: "Outcome",
    toolsLabel: "Tools",
    demoLabel: "5-second demo",
    demoHint: "Use lightweight Lottie or compressed MP4. Keep under 5 seconds and include the ZEC watermark.",
    leadCaptureTitle: "How our lead capture works",
    leadCaptureSubtitle: "Client submits form/chat -> n8n routes and validates the lead -> CRM is updated -> Telegram notification is sent to the team.",
    outlineHint: "PDF placeholder: workflow-outline.pdf",
  },
  pricing: {
    title: "Pricing",
    subtitle: "Localized pricing with flexible scope. Start with a focused deliverable, then expand.",
    currencyLabel: "Currency",
    tierNames: ["Launch", "Growth", "Scale"],
    tierDescriptions: [
      "One focused workflow and handoff docs.",
      "Multi-flow setup with CRM and support integrations.",
      "Cross-team automation program with ongoing optimization.",
    ],
    tierBullets: [
      ["1 primary automation flow", "Up to 3 integrations", "Basic QA + deployment", "Documentation and handover"],
      ["Up to 3 coordinated flows", "CRM + website integration", "Human approval checkpoints", "Priority support during rollout"],
      ["Custom flow architecture", "Advanced logic + webhooks", "Monitoring and iteration cycle", "Dedicated communication channel"],
    ],
    starterOfferTitle: "Low-entry offer",
    starterOfferName: "Starter 50",
    starterOfferBullets: [
      "1 section redesign or 1 simple automation mini-flow",
      "Mobile optimization",
      "Basic SEO titles + OG",
      "1 lead capture form integration",
      "48h delivery + 1 revision",
    ],
    starterOfferDisclaimer: "Scope is intentionally limited to keep the entry offer fast and affordable.",
    comparisonTitle: "Plan comparison",
    comparisonColumns: {
      feature: "Feature",
      launch: "Launch",
      growth: "Growth",
      scale: "Scale",
    },
    comparisonRows: [
      { feature: "Workflow count", launch: "1 core flow", growth: "Up to 3 flows", scale: "Custom program" },
      { feature: "Integrations", launch: "Up to 3", growth: "Up to 10", scale: "Unlimited" },
      { feature: "Documentation", launch: "Handover note", growth: "Structured docs", scale: "Living documentation" },
      { feature: "Support model", launch: "Business hours", growth: "Priority support", scale: "Dedicated channel" },
    ],
    faqTitle: "Pricing FAQ",
    faqItems: [
      { question: "Can we start with one small workflow?", answer: "Yes. Most teams start with one high-impact workflow and scale after validation." },
      { question: "Do you provide fixed price scopes?", answer: "Yes, for clearly defined deliverables. Larger programs use phased scope." },
      { question: "Do you support multi-currency proposals?", answer: "Yes. We localize pricing by language and preferred currency." },
    ],
  },
  caseStudiesPage: {
    title: "Case Studies",
    subtitle: "Examples of qualitative outcomes from automation and website integration engagements.",
    allFilter: "All",
    contextTitle: "Context",
    approachTitle: "Approach",
    deliverablesTitle: "Deliverables",
    outcomesTitle: "Outcomes",
    beforeTitle: "Before",
    afterTitle: "After",
    toolsTitle: "Tools",
  },
  blogPage: {
    title: "Blog / Articles",
    subtitle: "CMS-ready article structure with categories for automation, workflows, AI, and conversion.",
    relatedTitle: "Related articles",
    tocTitle: "Table of contents",
  },
  aboutPage: {
    title: "About ZEC",
    subtitle: "We are an automation-native agency focused on useful systems, not flashy demos.",
    valuesTitle: "Values",
    values: ["Clarity over complexity", "Reliable delivery over hype", "Documentation and handover by default"],
    workStyleTitle: "How we work",
    workStyle: ["Audit first, then implementation", "Build with reusable components", "Ship with monitoring and support"],
    toolsTitle: "Tools we use",
    teamTitle: "Team",
    teamPlaceholderTitle: "Team profile placeholder",
    teamPlaceholderBody: "Add real team members when ready. Do not use fake names, photos, or roles.",
  },
  contactPage: {
    title: "Contact",
    subtitle: "Tell us what you want to automate and what tools you already use.",
    responseNote: "We usually respond within 1-2 business days.",
    consentNote: "By submitting this form, you agree to our Privacy Policy.",
    form: {
      name: "Name",
      email: "Email",
      message: "Message",
      serviceInterest: "Service interest",
      budget: "Budget range (optional)",
      language: "Language",
      submit: "Send request",
      success: "Thanks, your request has been sent.",
      error: "Something went wrong. Please try again.",
      placeholders: {
        name: "Your name",
        email: "you@company.com",
        message: "Describe your process, tools, and goals",
        serviceInterest: "Example: Lead capture automation",
        budget: "Example: 500-2000",
      },
    },
  },
  faqPage: {
    title: "Frequently asked questions",
    subtitle: "Questions grouped by pricing, delivery, tools, support, language, and security.",
    categories: [
      {
        title: "Pricing",
        items: [
          { question: "Do you offer a low-entry package?", answer: "Yes. The Starter 50 offer is available in localized currency equivalents." },
          { question: "Can pricing change after audit?", answer: "If scope changes, we revise the estimate transparently before implementation." },
        ],
      },
      {
        title: "Delivery",
        items: [
          { question: "How long does a typical workflow take?", answer: "Simple flows usually ship in days, while multi-flow systems require phased rollout." },
          { question: "Do you provide post-launch support?", answer: "Yes, ongoing support is available for optimization and issue handling." },
        ],
      },
      {
        title: "Tools",
        items: [
          { question: "Which tools do you support?", answer: "n8n, Zapier, Make, Airtable, Google Sheets, HubSpot, Slack, Telegram, Gmail, APIs, and webhooks." },
          { question: "Can you use our existing stack?", answer: "Yes. We integrate with your existing systems whenever possible." },
        ],
      },
      {
        title: "Support",
        items: [
          { question: "Who approves AI-generated replies?", answer: "You can require a human approval step before replies are sent." },
          { question: "Do you provide documentation?", answer: "Yes, every delivery includes clear setup and operation notes." },
        ],
      },
      {
        title: "Language & RTL",
        items: [
          { question: "Do you support Russian, English, and Arabic?", answer: "Yes. We support RU/EN/AR and fully mirrored RTL layout for Arabic pages." },
          { question: "Can workflows handle multilingual leads?", answer: "Yes. Routing and messaging can be language-aware." },
        ],
      },
      {
        title: "Security",
        items: [
          { question: "Do you claim specific compliance standards?", answer: "We keep security practices general unless specific compliance scope is contractually agreed." },
          { question: "How is access managed?", answer: "We use least-privilege access and documented integration credentials." },
        ],
      },
    ],
  },
  legal: {
    updatedLabel: "Last updated",
    updatedDate: "March 3, 2026",
    privacyTitle: "Privacy Policy",
    termsTitle: "Terms of Service",
    privacySections: [
      { title: "Information we collect", body: "We collect contact details and project information submitted via forms or direct communication channels." },
      { title: "How we use information", body: "Information is used to respond to requests, prepare project proposals, and deliver agreed services." },
      { title: "Storage and access", body: "Data is stored in approved business tools with role-based access. Retention periods are based on project need." },
      { title: "Your choices", body: "You can request access, correction, or deletion of your contact data by emailing us." },
    ],
    termsSections: [
      { title: "Scope of services", body: "Service scope is defined in written proposals or agreements. Any additional scope is agreed separately." },
      { title: "Client responsibilities", body: "Clients provide timely access, approvals, and required integration credentials for delivery." },
      { title: "Payments", body: "Payment terms are defined in project proposals. Taxes or VAT may apply based on jurisdiction." },
      { title: "Liability", body: "We provide services with reasonable care. Liability limits and warranties are defined in signed agreements." },
    ],
  },
  services: baseServices,
  workflows: baseWorkflows,
  caseStudies: baseCaseStudies,
  articles: baseArticles,
};
const RUSSIAN_CONTENT: SiteCopy = {
  ...ENGLISH_CONTENT,
  meta: {
    ...ENGLISH_CONTENT.meta,
    siteTitle: "ZEC | Агентство AI-автоматизации",
    siteDescription: "ZEC строит AI-автоматизации на n8n, Zapier, Make, API и интеграциях с CRM.",
    pages: {
      ...ENGLISH_CONTENT.meta.pages,
      home: { title: "ZEC | AI-автоматизация", description: "Премиум агентство для автоматизации процессов, сайта и CRM." },
      solutions: { title: "Услуги | ZEC", description: "Обзор решений по автоматизациям, интеграциям и конверсионным сайтам." },
      workflows: { title: "Workflows | ZEC", description: "Сценарии для лидов, поддержки, операций, маркетинга и аналитики." },
      pricing: { title: "Цены | ZEC", description: "Локализованные тарифы в RUB, USD/EUR и AED." },
      caseStudies: { title: "Кейсы | ZEC", description: "Качественные результаты без выдуманных метрик." },
      blog: { title: "Блог | ZEC", description: "Статьи об автоматизации, n8n, Zapier, AI и конверсии сайта." },
      about: { title: "О нас | ZEC", description: "Кто мы и как строим automation-first системы." },
      contact: { title: "Контакты | ZEC", description: "Отвечаем в течение 5 рабочих дней." },
      faq: { title: "FAQ | ZEC", description: "Ответы по цене, срокам, инструментам и безопасности." },
      privacy: { title: "Политика | ZEC", description: "Шаблон политики конфиденциальности." },
      terms: { title: "Условия | ZEC", description: "Шаблон условий использования." },
      auth: { title: "Портал клиента | ZEC", description: "Раздел в разработке." },
    },
  },
  brand: {
    name: "ZEC",
    tagline: "Automation-native агентство для современных команд",
    trustNote: "Прозрачная доставка, документация и долгосрочная поддержка.",
  },
  nav: {
    home: "Главная",
    solutions: "Решения",
    workflows: "Workflows",
    pricing: "Цены",
    caseStudies: "Кейсы",
    blog: "Блог",
    about: "О нас",
    contact: "Контакты",
    faq: "FAQ",
    privacy: "Политика",
    terms: "Условия",
    getStarted: "Начать",
    bookCall: "Записаться на звонок",
    seeWorkflows: "Смотреть workflows",
  },
  common: {
    contactSales: "Связаться",
    viewDetails: "Подробнее",
    readArticle: "Читать",
    requestWorkflow: "Запросить workflow",
    downloadWorkflowOutline: "Скачать outline",
    mostPopular: "Популярный",
    taxesNote: "Налоги/VAT могут применяться в зависимости от страны.",
    languageAuto: "Язык авто",
  },
  home: {
    ...ENGLISH_CONTENT.home,
    announcement: "AI-автоматизация для роста, поддержки и операций",
    title: "Соединяем сайт, AI и CRM в одну надежную систему.",
    subtitle: "ZEC проектирует и внедряет автоматизации на n8n, Zapier, Make, API и webhooks. Этапы: аудит -> разработка -> запуск -> поддержка.",
    primaryCta: "Начать",
    secondaryCta: "Смотреть workflows",
    trustMicrocopy: "Собрано на n8n, Zapier, Make и современном AI-стеке.",
    trustStrip: ["Безопасно", "Быстрый запуск", "Документация", "Поддержка"],
    servicesTitle: "Ключевые услуги",
    servicesSubtitle: "Практическая реализация: автоматизации, сайт, CRM, аналитика.",
    workflowsTitle: "Как работает автоматизация",
    workflowsSubtitle: "Триггер -> Шаги -> Результат. Переключайте реальные сценарии и смотрите поток выполнения.",
    processTitle: "Как мы работаем",
    processSteps: [
      { title: "Аудит автоматизации", body: "Картируем цели, инструменты и узкие места процесса." },
      { title: "Проектирование workflow", body: "Проектируем архитектуру триггер -> шаг -> результат по бизнес-приоритетам." },
      { title: "Сборка и интеграция", body: "Реализуем workflow, API-подключения и fallback-логику." },
      { title: "Тестирование", body: "Проводим staged QA и проверяем крайние сценарии с вашей командой." },
      { title: "Запуск", body: "Выводим решение в прод с документацией и понятной зоной ответственности." },
      { title: "Мониторинг и оптимизация", body: "Отслеживаем надежность и непрерывно улучшаем результат." },
    ],
    casePreviewTitle: "Превью кейсов",
    casePreviewSubtitle: "Формат До/После с измеримым эффектом и контекстом внедрения.",
    pricingPreviewTitle: "Превью цен",
    pricingPreviewSubtitle: "Можно начать с малого и масштабировать по сложности.",
    faqPreviewTitle: "FAQ",
    faqPreviewSubtitle: "Быстрые ответы по срокам, инструментам, цене и языкам.",
    leadCaptureTitle: "Как работает захват лида",
    leadCaptureSubtitle: "Клиент отправляет форму/чат -> лид уходит в CRM + Telegram -> команда быстро отвечает.",
    finalCtaTitle: "Готовы автоматизировать следующий процесс?",
    finalCtaSubtitle: "Опишите текущий стек и цель, и мы предложим практичный первый workflow.",
    demoReplaceHint: "Есть fallback-анимация. Замените ее на сжатый 5-секундный loop с соединением нод.",
  },  solutionsPage: {
    title: "Услуги / Решения",
    subtitle: "От захвата лидов до поддержки: внедряем системы, которые уменьшают ручной труд и ускоряют ответ клиенту.",
    timelineLabel: "Типичный срок",
    workflowsIncludedLabel: "Включенные workflows",
  },
  solutionDetailPage: {
    problemsTitle: "Какие проблемы решаем",
    deliverablesTitle: "Что вы получаете",
    exampleWorkflowTitle: "Пример workflow",
    toolsTitle: "Инструменты",
    faqTitle: "FAQ по услуге",
    ctaTitle: "Нужна эта услуга в вашем стеке?",
  },
  workflowsPage: {
    ...ENGLISH_CONTENT.workflowsPage,
    title: "Automation Workflows",
    subtitle: "Сценарии для лидов и продаж, поддержки, операций, маркетинга и аналитики.",
    categories: { leadSales: "Лиды и продажи", support: "Поддержка", operations: "Операции", marketing: "Маркетинг", analytics: "Аналитика" },
    triggerLabel: "Триггер",
    stepsLabel: "Шаги",
    outcomeLabel: "Результат",
    toolsLabel: "Инструменты",
    demoLabel: "5-секундное демо",
    leadCaptureTitle: "Как работает захват лида",
    leadCaptureSubtitle: "Клиент отправляет форму/чат -> лид фиксируется в CRM -> команда получает Telegram-уведомление.",
  },
  pricing: {
    ...ENGLISH_CONTENT.pricing,
    title: "Цены",
    subtitle: "Локализованные тарифы с прозрачным объемом. Начните с компактной задачи.",
    currencyLabel: "Валюта",
    starterOfferTitle: "Низкий порог входа",
    starterOfferDisclaimer: "Объем специально ограничен для быстрого и доступного старта.",
    comparisonTitle: "Сравнение планов",
    comparisonColumns: { feature: "Функция", launch: "Launch", growth: "Growth", scale: "Scale" },
    faqTitle: "FAQ по ценам",
    faqItems: [
      { question: "Можно ли начать с одного небольшого workflow?", answer: "Да. Большинство команд начинают с одного приоритетного workflow и масштабируют после проверки." },
      { question: "Вы даете фиксированный scope и цену?", answer: "Да, для четко определенных deliverables. Для крупных программ используем поэтапный scope." },
      { question: "Поддерживаете мультивалютные предложения?", answer: "Да. Мы локализуем стоимость по языку и выбранной валюте." },
    ],
  },  caseStudiesPage: {
    title: "Кейсы",
    subtitle: "Примеры качественных результатов из проектов по автоматизации и интеграциям.",
    allFilter: "Все",
    contextTitle: "Контекст",
    approachTitle: "Подход",
    deliverablesTitle: "Что сделали",
    outcomesTitle: "Результаты",
    beforeTitle: "До",
    afterTitle: "После",
    toolsTitle: "Инструменты",
  },
  blogPage: {
    title: "Блог / Статьи",
    subtitle: "CMS-ready структура статей по автоматизации, workflows, AI и конверсии сайта.",
    relatedTitle: "Похожие статьи",
    tocTitle: "Содержание",
  },
  aboutPage: {
    title: "О ZEC",
    subtitle: "Мы automation-native агентство, которое строит полезные системы, а не шумные демо.",
    valuesTitle: "Ценности",
    values: ["Ясность вместо лишней сложности", "Надежная реализация вместо хайпа", "Документация и передача в стандартном процессе"],
    workStyleTitle: "Как мы работаем",
    workStyle: ["Сначала аудит, потом внедрение", "Сборка на переиспользуемых компонентах", "Запуск с мониторингом и поддержкой"],
    toolsTitle: "Инструменты",
    teamTitle: "Команда",
    teamPlaceholderTitle: "Placeholder профиля команды",
    teamPlaceholderBody: "Добавьте реальных участников. Не используйте вымышленные имена и роли.",
  },
  contactPage: {
    ...ENGLISH_CONTENT.contactPage,
    title: "Контакты",
    subtitle: "Расскажите, что хотите автоматизировать и какие инструменты уже используете.",
    responseNote: "Обычно отвечаем в течение 1-2 рабочих дней.",
    consentNote: "Отправляя форму, вы соглашаетесь с Политикой конфиденциальности.",
    form: {
      ...ENGLISH_CONTENT.contactPage.form,
      name: "Имя",
      message: "Сообщение",
      serviceInterest: "Интересующая услуга",
      budget: "Бюджет (опционально)",
      language: "Язык",
      submit: "Отправить",
      success: "Спасибо, заявка отправлена.",
      error: "Что-то пошло не так. Попробуйте еще раз.",
      placeholders: {
        name: "Ваше имя",
        email: "you@company.com",
        message: "Опишите процесс, инструменты и цели",
        serviceInterest: "Пример: автоматизация лидов",
        budget: "Пример: 500-2000",
      },
    },
  },
  faqPage: {
    ...ENGLISH_CONTENT.faqPage,
    title: "Частые вопросы",
    subtitle: "Ответы по категориям: цена, сроки, инструменты, поддержка, язык, безопасность.",
    categories: [
      {
        title: "Цены",
        items: [
          { question: "Есть ли пакет с низким порогом входа?", answer: "Да. Предложение Starter 50 доступно в локализованных валютных эквивалентах." },
          { question: "Может ли цена измениться после аудита?", answer: "Если меняется scope, мы прозрачно пересматриваем оценку до начала реализации." },
        ],
      },
      {
        title: "Сроки",
        items: [
          { question: "Сколько занимает типовой workflow?", answer: "Простые сценарии обычно запускаются за несколько дней, а multi-flow системы идут по этапам." },
          { question: "Есть ли поддержка после запуска?", answer: "Да, доступна постоянная поддержка для оптимизации и обработки инцидентов." },
        ],
      },
      {
        title: "Инструменты",
        items: [
          { question: "Какие инструменты вы поддерживаете?", answer: "n8n, Zapier, Make, Airtable, Google Sheets, HubSpot, Slack, Telegram, Gmail, API и webhooks." },
          { question: "Можно ли использовать наш текущий стек?", answer: "Да. По возможности интегрируемся с вашими текущими системами." },
        ],
      },
      {
        title: "Поддержка",
        items: [
          { question: "Кто подтверждает ответы, сгенерированные AI?", answer: "Вы можете требовать шаг ручного подтверждения перед отправкой ответа." },
          { question: "Вы предоставляете документацию?", answer: "Да, каждая поставка включает понятные инструкции по настройке и эксплуатации." },
        ],
      },
      {
        title: "Язык и RTL",
        items: [
          { question: "Поддерживаете русский, английский и арабский?", answer: "Да. Поддерживаем RU/EN/AR и зеркальный RTL-интерфейс для арабской версии." },
          { question: "Могут ли workflow обрабатывать многоязычные лиды?", answer: "Да. Маршрутизация и сообщения могут учитывать язык." },
        ],
      },
      {
        title: "Безопасность",
        items: [
          { question: "Заявляете ли вы конкретные стандарты соответствия?", answer: "Мы описываем практики безопасности в общем виде, если отдельный compliance scope не согласован контрактом." },
          { question: "Как управляется доступ?", answer: "Используем принцип минимальных привилегий и документированные учетные данные интеграций." },
        ],
      },
    ],
  },  legal: {
    ...ENGLISH_CONTENT.legal,
    updatedLabel: "Обновлено",
    updatedDate: "3 марта 2026",
    privacyTitle: "Политика конфиденциальности",
    termsTitle: "Условия использования",
  },
  services: baseServices.map((service) => {
    const map: Record<string, { title: string; summary: string }> = {
      "automation-workflows": {
        title: "Automation Workflows",
        summary: "Проектируем и внедряем end-to-end workflows для продаж, поддержки и операций.",
      },
      "ai-integrations": {
        title: "AI + Интеграции",
        summary: "AI-сценарии с ручным подтверждением, извлечением контекста и контролируемыми действиями.",
      },
      "website-conversion": {
        title: "Сайт + Конверсия",
        summary: "Конверсионные страницы с прямой связью с CRM и внутренними уведомлениями.",
      },
      "crm-lead-systems": {
        title: "CRM + Лид-системы",
        summary: "От формы на сайте до этапа воронки без потери лидов.",
      },
      "analytics-reporting": {
        title: "Аналитика + Отчеты",
        summary: "Автоматизированная отчетность для операций, маркетинга и поддержки.",
      },
      "ongoing-support": {
        title: "Постоянная поддержка",
        summary: "Постоянная оптимизация, мониторинг и развитие workflow-систем.",
      },
    };
    const localized = map[service.slug];
    return localized ? { ...service, title: localized.title, summary: localized.summary } : service;
  }),
  workflows: baseWorkflows.map((workflow) => {
    const map: Record<string, Partial<WorkflowItem>> = {
      "lead-capture-crm-telegram": {
        title: "Захват лида -> CRM -> Telegram",
        subtitle: "Сценарий уведомления агентства",
        trigger: "Лид отправлен через форму сайта или чат",
        steps: [
          "Проверка имени и email",
          "Сохранение в Airtable/Sheets",
          "Создание или обновление контакта в HubSpot",
          "Отправка уведомления в приватный Telegram-канал",
        ],
        outcome: "Команда отвечает быстрее, лиды не теряются.",
      },
      "support-ai-human-approval": {
        title: "Поддержка -> AI черновик -> Ручное подтверждение -> Ответ",
        subtitle: "AI-поддержка под контролем человека",
        trigger: "В Gmail приходит новое письмо в поддержку",
        steps: [
          "Извлечение контекста",
          "OpenAI создает черновик ответа",
          "Сотрудник подтверждает в Slack/Telegram",
          "Отправка финального ответа",
        ],
        outcome: "Быстрее поддержка с ручным контролем качества.",
      },
      "ecommerce-order-review": {
        title: "Заказ ecommerce -> Обновления -> Запрос отзыва",
        subtitle: "Типовой пример workflow",
        trigger: "Новый заказ в Shopify (или другой платформе магазина)",
        outcome: "Лучший CX и больше отзывов.",
      },
      "marketing-content-pipeline": {
        title: "Контент-план -> Согласование -> Публикация -> Отчет",
        subtitle: "Маркетинговый workflow",
      },
      "analytics-alert-loop": {
        title: "Обновление данных -> Проверка KPI -> Алерт",
        subtitle: "Workflow мониторинга и аналитики",
      },
    };
    return { ...workflow, ...map[workflow.id] };
  }),
  caseStudies: baseCaseStudies.map((caseStudy) => ({ ...caseStudy, ...RUSSIAN_CASE_STUDY_OVERRIDES[caseStudy.slug] })),
  articles: baseArticles.map((article) => ({ ...article, ...RUSSIAN_ARTICLE_OVERRIDES[article.slug] })),
};

const ARABIC_CONTENT: SiteCopy = {
  ...ENGLISH_CONTENT,
  meta: {
    ...ENGLISH_CONTENT.meta,
    siteTitle: "ZEC | وكالة أتمتة بالذكاء الاصطناعي",
    siteDescription: "تقوم ZEC ببناء أنظمة الأتمتة باستخدام n8n وZapier وMake وواجهات API وتكاملات CRM.",
  },
  brand: { name: "ZEC", tagline: "وكالة تعتمد الأتمتة كجوهر العمل", trustNote: "تنفيذ واضح، توثيق كامل، ودعم مستمر." },
  nav: {
    home: "الرئيسية",
    solutions: "الحلول",
    workflows: "المسارات",
    pricing: "الأسعار",
    caseStudies: "دراسات الحالة",
    blog: "المدونة",
    about: "من نحن",
    contact: "تواصل",
    faq: "الأسئلة الشائعة",
    privacy: "الخصوصية",
    terms: "الشروط",
    getStarted: "ابدأ الآن",
    bookCall: "احجز مكالمة",
    seeWorkflows: "عرض المسارات",
  },
  common: {
    contactSales: "تواصل معنا",
    viewDetails: "عرض التفاصيل",
    readArticle: "قراءة المقال",
    requestWorkflow: "اطلب هذا المسار",
    downloadWorkflowOutline: "تحميل مخطط المسار",
    mostPopular: "الأكثر طلبا",
    taxesNote: "قد يتم تطبيق الضرائب/VAT حسب الدولة.",
    languageAuto: "اللغة تلقائي",
  },
  home: {
    ...ENGLISH_CONTENT.home,
    announcement: "أنظمة أتمتة للنمو والدعم والعمليات",
    title: "نربط الموقع والذكاء الاصطناعي وCRM في نظام واحد موثوق.",
    subtitle: "تقوم ZEC بتصميم وتنفيذ الأتمتة باستخدام n8n وZapier وMake وواجهات API وWebhooks. منهجنا: تدقيق -> بناء -> إطلاق -> دعم.",
    primaryCta: "ابدأ الآن",
    secondaryCta: "عرض المسارات",
    trustMicrocopy: "مبني باستخدام n8n وZapier وMake وأدوات AI الحديثة.",
    trustStrip: ["آمن", "تنفيذ سريع", "توثيق", "دعم"],
    servicesTitle: "لمحة عن الخدمات",
    servicesSubtitle: "تنفيذ عملي للأتمتة والموقع وCRM والتقارير.",
    workflowsTitle: "كيف تعمل الأتمتة",
    workflowsSubtitle: "المشغل -> الخطوات -> النتيجة. بدّل بين المسارات العملية وشاهد التنفيذ.",
    processTitle: "طريقة العمل",
    processSteps: [
      { title: "تدقيق الأتمتة", body: "نرسم الأهداف والأدوات ونقاط الاختناق في العملية." },
      { title: "تصميم المسار", body: "نصمم معمارية المشغل -> الخطوات -> النتيجة حسب أولوية العمل." },
      { title: "البناء والتكامل", body: "ننفيذ المسارات مع ربط API وإضافة منطق fallback." },
      { title: "الاختبار", body: "نجري QA مرحلي ونراجع الحالات الطرفية مع فريقك." },
      { title: "الإطلاق", body: "نطلق الحل مع توثيق واضح وملكية تشغيلية محددة." },
      { title: "المراقبة والتحسين", body: "نراقب الاعتمادية ونحسن الأداء بشكل مستمر." },
    ],
    casePreviewTitle: "معاينة دراسات الحالة",
    casePreviewSubtitle: "عرض قبل/بعد مع تأثير قابل للقياس وسياق التنفيذ.",
    pricingPreviewTitle: "معاينة الأسعار",
    pricingPreviewSubtitle: "ابدأ بشكل بسيط ثم توسع حسب الحاجة.",
    faqPreviewTitle: "معاينة الأسئلة الشائعة",
    faqPreviewSubtitle: "إجابات سريعة حول التنفيذ والأدوات واللغة والتسعير.",
    leadCaptureTitle: "كيف يعمل التقاط العملاء المحتملين",
    leadCaptureSubtitle: "يرسل العميل نموذج/رسالة -> يتم تحديث CRM مع إشعار Telegram -> يرد الفريق بسرعة.",
    finalCtaTitle: "جاهز لأتمتة العملية القادمة؟",
    finalCtaSubtitle: "شارك أدواتك الحالية وهدفك، وسنقترح أول مسار عملي.",
  },  solutionsPage: {
    title: "الخدمات / الحلول",
    subtitle: "من التقاط العملاء المحتملين إلى دعم العملاء، نبني أنظمة تقلل العمل اليدوي وتسرّع الاستجابة.",
    timelineLabel: "المدة المعتادة",
    workflowsIncludedLabel: "المسارات المضمنة",
  },
  solutionDetailPage: {
    problemsTitle: "المشكلات التي نعالجها",
    deliverablesTitle: "ما الذي نقدمه",
    exampleWorkflowTitle: "مثال على المسار",
    toolsTitle: "الأدوات المستخدمة",
    faqTitle: "أسئلة شائعة للخدمة",
    ctaTitle: "هل تريد هذه الخدمة ضمن نظامك؟",
  },
  workflowsPage: {
    ...ENGLISH_CONTENT.workflowsPage,
    title: "مسارات الأتمتة",
    subtitle: "مخططات عملية نبنيها للمبيعات والدعم والعمليات والتسويق والتحليلات.",
    categories: { leadSales: "العملاء والمبيعات", support: "الدعم", operations: "العمليات", marketing: "التسويق", analytics: "التحليلات" },
    triggerLabel: "المشغل",
    stepsLabel: "الخطوات",
    outcomeLabel: "النتيجة",
    toolsLabel: "الأدوات",
    leadCaptureTitle: "كيف يعمل التقاط العملاء المحتملين",
    leadCaptureSubtitle: "يرسل العميل نموذج/محادثة -> يتم تسجيل العميل في CRM -> يصل إشعار Telegram للفريق.",
  },
  pricing: {
    ...ENGLISH_CONTENT.pricing,
    title: "الأسعار",
    subtitle: "تسعير محلي مرن حسب النطاق. ابدأ بتسليم صغير ثم توسع.",
    currencyLabel: "العملة",
    starterOfferTitle: "عرض دخول منخفض",
    starterOfferDisclaimer: "النطاق محدود عمدا ليبقى العرض سريعا ومنخفض التكلفة.",
    comparisonTitle: "مقارنة الخطط",
    comparisonColumns: { feature: "الميزة", launch: "Launch", growth: "Growth", scale: "Scale" },
    faqTitle: "أسئلة الأسعار",
    faqItems: [
      { question: "هل يمكن البدء بمسار واحد صغير؟", answer: "نعم. تبدأ أغلب الفرق بمسار عالي التأثير ثم تتوسع بعد التحقق." },
      { question: "هل تقدمون نطاقا وسعرا ثابتين؟", answer: "نعم، عند وضوح المخرجات. أما البرامج الأكبر فتدار على مراحل." },
      { question: "هل تدعمون العروض متعددة العملات؟", answer: "نعم. نقوم بمواءمة التسعير حسب اللغة والعملة المفضلة." },
    ],
  },  caseStudiesPage: {
    title: "دراسات الحالة",
    subtitle: "أمثلة على نتائج نوعية من مشاريع الأتمتة والتكامل.",
    allFilter: "الكل",
    contextTitle: "السياق",
    approachTitle: "المنهج",
    deliverablesTitle: "المخرجات",
    outcomesTitle: "النتائج",
    beforeTitle: "قبل",
    afterTitle: "بعد",
    toolsTitle: "الأدوات",
  },
  blogPage: {
    title: "المدونة / المقالات",
    subtitle: "هيكل جاهز لـ CMS لمواضيع الأتمتة وAI وتحويل المواقع.",
    relatedTitle: "مقالات ذات صلة",
    tocTitle: "جدول المحتوى",
  },
  aboutPage: {
    title: "عن ZEC",
    subtitle: "نحن وكالة تعتمد الأتمتة لتقديم أنظمة عملية قابلة للتطوير.",
    valuesTitle: "القيم",
    values: ["وضوح في التنفيذ", "اعتمادية بدل الوعود التسويقية", "توثيق وتسليم منظم"],
    workStyleTitle: "كيف نعمل",
    workStyle: ["نبدأ بالتدقيق ثم التنفيذ", "نبني بمكونات قابلة لإعادة الاستخدام", "نطلق مع مراقبة ودعم مستمر"],
    toolsTitle: "الأدوات التي نستخدمها",
    teamTitle: "الفريق",
    teamPlaceholderTitle: "عنصر فريق مؤقت",
    teamPlaceholderBody: "أضف أعضاء فريق حقيقيين عند الجاهزية. لا تستخدم أسماء أو أدوار وهمية.",
  },
  contactPage: {
    ...ENGLISH_CONTENT.contactPage,
    title: "تواصل معنا",
    subtitle: "أخبرنا بما تريد أتمتته وما هي أدواتك الحالية.",
    responseNote: "نرد عادة خلال 1-2 يوم عمل.",
    consentNote: "بإرسال النموذج، أنت توافق على سياسة الخصوصية.",
    form: {
      ...ENGLISH_CONTENT.contactPage.form,
      name: "الاسم",
      email: "البريد الإلكتروني",
      message: "الرسالة",
      serviceInterest: "الخدمة المطلوبة",
      budget: "نطاق الميزانية (اختياري)",
      language: "اللغة",
      submit: "إرسال الطلب",
      success: "شكرا، تم إرسال طلبك.",
      error: "حدث خطأ. حاول مرة أخرى.",
      placeholders: {
        name: "اسمك",
        email: "you@company.com",
        message: "اشرح العملية الحالية والأدوات والهدف",
        serviceInterest: "مثال: أتمتة التقاط العملاء",
        budget: "مثال: 500-2000",
      },
    },
  },
  faqPage: {
    ...ENGLISH_CONTENT.faqPage,
    title: "الأسئلة الشائعة",
    subtitle: "إجابات مصنفة حسب السعر والتنفيذ والأدوات والدعم واللغة والأمان.",
    categories: [
      {
        title: "الأسعار",
        items: [
          { question: "هل لديكم باقة دخول منخفضة؟", answer: "نعم. يتوفر عرض Starter 50 بصيغ عملات محلية مكافئة." },
          { question: "هل يمكن أن يتغير السعر بعد التدقيق؟", answer: "إذا تغير النطاق نحدّث التقدير بشكل واضح قبل التنفيذ." },
        ],
      },
      {
        title: "التنفيذ",
        items: [
          { question: "كم يستغرق المسار المعتاد؟", answer: "المسارات البسيطة تُطلق خلال أيام، أما الأنظمة متعددة المسارات فتُنفذ على مراحل." },
          { question: "هل تقدمون دعما بعد الإطلاق؟", answer: "نعم، يتوفر دعم مستمر للتحسين ومعالجة المشكلات." },
        ],
      },
      {
        title: "الأدوات",
        items: [
          { question: "ما الأدوات التي تدعمونها؟", answer: "n8n وZapier وMake وAirtable وGoogle Sheets وHubSpot وSlack وTelegram وGmail وواجهات API وwebhooks." },
          { question: "هل يمكن استخدام بيئتنا الحالية؟", answer: "نعم. نندمج مع أنظمتكم الحالية كلما كان ذلك ممكنا." },
        ],
      },
      {
        title: "الدعم",
        items: [
          { question: "من يوافق على الردود التي ينتجها الذكاء الاصطناعي؟", answer: "يمكن فرض خطوة موافقة بشرية قبل إرسال أي رد." },
          { question: "هل تقدمون توثيقا؟", answer: "نعم، كل تسليم يتضمن ملاحظات إعداد وتشغيل واضحة." },
        ],
      },
      {
        title: "اللغة وRTL",
        items: [
          { question: "هل تدعمون الروسية والإنجليزية والعربية؟", answer: "نعم. ندعم RU/EN/AR مع تخطيط RTL كامل للصفحات العربية." },
          { question: "هل يمكن للمسارات التعامل مع العملاء متعددي اللغات؟", answer: "نعم. يمكن أن تكون قواعد التوجيه والرسائل واعية باللغة." },
        ],
      },
      {
        title: "الأمان",
        items: [
          { question: "هل تلتزمون بمعايير امتثال محددة؟", answer: "نوضح ممارسات الأمان بشكل عام ما لم يتم الاتفاق تعاقديا على نطاق امتثال محدد." },
          { question: "كيف تتم إدارة الوصول؟", answer: "نستخدم مبدأ أقل صلاحية مع بيانات اعتماد موثقة للتكاملات." },
        ],
      },
    ],
  },  legal: {
    ...ENGLISH_CONTENT.legal,
    updatedLabel: "آخر تحديث",
    updatedDate: "3 مارس 2026",
    privacyTitle: "سياسة الخصوصية",
    termsTitle: "الشروط والأحكام",
  },
  services: baseServices.map((service) => {
    const map: Record<string, { title: string; summary: string }> = {
      "automation-workflows": {
        title: "مسارات الأتمتة",
        summary: "نصمم وننفذ مسارات عمل شاملة للمبيعات والدعم والعمليات.",
      },
      "ai-integrations": {
        title: "الذكاء الاصطناعي + التكاملات",
        summary: "مسارات مدعومة بالذكاء الاصطناعي مع موافقة بشرية وتحكم واضح.",
      },
      "website-conversion": {
        title: "الموقع + التحويل",
        summary: "صفحات تحويل عالية الجودة مرتبطة مباشرة بـ CRM وقنوات التنبيه.",
      },
      "crm-lead-systems": {
        title: "CRM + أنظمة العملاء المحتملين",
        summary: "من إرسال النموذج إلى تحديث خط المبيعات بدون فقدان العملاء.",
      },
      "analytics-reporting": {
        title: "التحليلات + التقارير",
        summary: "أتمتة تقارير العمليات والتسويق والدعم.",
      },
      "ongoing-support": {
        title: "الدعم المستمر",
        summary: "تحسين مستمر ومراقبة ورفع كفاءة مسارات الأتمتة.",
      },
    };
    const localized = map[service.slug];
    return localized ? { ...service, title: localized.title, summary: localized.summary } : service;
  }),
  workflows: baseWorkflows.map((workflow) => {
    const map: Record<string, Partial<WorkflowItem>> = {
      "lead-capture-crm-telegram": {
        title: "التقاط العميل -> CRM -> Telegram",
        subtitle: "مسار إشعار فريق الوكالة",
        trigger: "إرسال عميل محتمل عبر نموذج الموقع أو المحادثة",
        steps: [
          "التحقق من الاسم والبريد الإلكتروني",
          "تخزين العميل في Airtable/Sheets",
          "إنشاء أو تحديث جهة الاتصال في HubSpot",
          "إرسال إشعار Telegram للقناة الداخلية",
        ],
        outcome: "استجابة أسرع من الفريق وعدم فقدان العملاء المحتملين.",
      },
      "support-ai-human-approval": {
        title: "صندوق الدعم -> مسودة AI -> موافقة بشرية -> رد",
        subtitle: "دعم سريع مع تحكم بشري",
        trigger: "وصول بريد دعم جديد إلى Gmail",
        steps: [
          "استخراج سياق الرسالة",
          "إنشاء مسودة رد باستخدام OpenAI",
          "طلب موافقة الموظف في Slack/Telegram",
          "إرسال الرد النهائي المعتمد",
        ],
        outcome: "دعم أسرع مع الحفاظ على الإشراف البشري.",
      },
      "ecommerce-order-review": {
        title: "طلب متجر إلكتروني -> تحديثات -> طلب تقييم",
        subtitle: "مثال شائع لمسار عمل",
        trigger: "طلب جديد في Shopify (أو منصة متجر بديلة)",
        outcome: "تجربة عميل أفضل وتقييمات أكثر.",
      },
      "marketing-content-pipeline": {
        title: "خطة المحتوى -> موافقة -> نشر -> تقرير",
        subtitle: "مسار عمليات التسويق",
      },
      "analytics-alert-loop": {
        title: "تحديث البيانات -> فحص KPI -> تنبيه",
        subtitle: "مسار التحليلات والمراقبة",
      },
    };
    return { ...workflow, ...map[workflow.id] };
  }),
  caseStudies: baseCaseStudies.map((caseStudy) => ({ ...caseStudy, ...ARABIC_CASE_STUDY_OVERRIDES[caseStudy.slug] })),
  articles: baseArticles.map((article) => ({ ...article, ...ARABIC_ARTICLE_OVERRIDES[article.slug] })),
};

const RAW_SITE_CONTENT: Record<Lang, SiteCopy> = {
  en: ENGLISH_CONTENT,
  ru: RUSSIAN_CONTENT,
  ar: ARABIC_CONTENT,
};

const ARTICLE_LOCALIZATION_OVERRIDES: Partial<Record<Lang, Record<string, Partial<BlogArticle>>>> = {
  ru: {
    "what-is-n8n-vs-zapier": {
      summary: "Практическое инженерное руководство по выбору n8n или Zapier с учетом архитектуры, масштаба и операционного контроля.",
      readingTime: "14 мин",
    },
    "website-leads-to-telegram-10-minutes": {
      summary: "Практический гайд по уведомлениям о лидах: форма сайта -> n8n -> Telegram, с валидацией, маршрутизацией и follow-up логикой.",
      readingTime: "16 мин",
    },
    "ai-assisted-support-safe-approval": {
      summary: "Технический playbook по AI-черновикам в поддержке: ручное подтверждение, маршрутизация рисков и аудит.",
      readingTime: "15 мин",
    },
    "five-automations-small-business": {
      summary: "Стратегический план автоматизации для малого бизнеса: какие 5 сценариев запускать первыми и как внедрять.",
      readingTime: "13 мин",
    },
    "crm-basics-forms-to-pipeline": {
      summary: "Техническое руководство по CRM-операциям: от форм до чистых этапов воронки, владельцев и корректной отчетности.",
      readingTime: "14 мин",
    },
    "website-automation-modern-growth-stack": {
      summary: "Современный growth-гайд: как связать конверсию сайта с CRM, операциями и AI-сценариями.",
      readingTime: "15 мин",
    },
  },
  ar: {
    "what-is-n8n-vs-zapier": {
      summary: "دليل هندسي عملي لاختيار n8n أو Zapier بناء على البنية والتوسع والتحكم التشغيلي.",
      readingTime: "14 دقيقة",
    },
    "website-leads-to-telegram-10-minutes": {
      summary: "دليل عملي لتنبيهات العملاء المحتملين: نموذج الموقع إلى n8n ثم Telegram مع التحقق والتوجيه.",
      readingTime: "16 دقيقة",
    },
    "ai-assisted-support-safe-approval": {
      summary: "دليل تقني لدعم العملاء بالذكاء الاصطناعي مع موافقة بشرية وتوجيه المخاطر وسجل تدقيق.",
      readingTime: "15 دقيقة",
    },
    "five-automations-small-business": {
      summary: "خطة أتمتة استراتيجية للفرق الصغيرة: ما هي أول 5 مسارات يجب إطلاقها وكيفية تشغيلها.",
      readingTime: "13 دقيقة",
    },
    "crm-basics-forms-to-pipeline": {
      summary: "دليل تقني لعمليات CRM: من التقاط النماذج إلى مراحل نظيفة وملكية واضحة وتقارير دقيقة.",
      readingTime: "14 دقيقة",
    },
    "website-automation-modern-growth-stack": {
      summary: "دليل نمو حديث لربط تحويل الموقع مع CRM والعمليات ومسارات الذكاء الاصطناعي.",
      readingTime: "15 دقيقة",
    },
  },
};

const ARTICLE_SECTION_HEADING_OVERRIDES: Partial<Record<Lang, Record<string, string>>> = {
  ru: {
    "1. Introduction": "1. Введение",
    "2. Business Problem": "2. Бизнес-проблема",
    "3. Why Automation Solves the Problem": "3. Почему автоматизация решает проблему",
    "4. Workflow Architecture": "4. Архитектура workflow",
    "5. Step-by-Step Automation Workflow": "5. Пошаговый workflow автоматизации",
    "6. n8n Workflow Explanation": "6. Разбор workflow в n8n",
    "7. Example Use Cases": "7. Примеры использования",
    "8. Common Pitfalls": "8. Частые ошибки",
    "9. Best Practices": "9. Лучшие практики",
    "10. Scaling the Workflow": "10. Масштабирование workflow",
    "11. Security and Data Handling": "11. Безопасность и работа с данными",
    "12. Frequently Asked Questions": "12. Часто задаваемые вопросы",
    "13. Conclusion": "13. Заключение",
  },
  ar: {
    "1. Introduction": "1. مقدمة",
    "2. Business Problem": "2. مشكلة الأعمال",
    "3. Why Automation Solves the Problem": "3. لماذا تحل الأتمتة المشكلة",
    "4. Workflow Architecture": "4. بنية سير العمل",
    "5. Step-by-Step Automation Workflow": "5. سير عمل الأتمتة خطوة بخطوة",
    "6. n8n Workflow Explanation": "6. شرح سير العمل في n8n",
    "7. Example Use Cases": "7. أمثلة استخدام",
    "8. Common Pitfalls": "8. أخطاء شائعة",
    "9. Best Practices": "9. أفضل الممارسات",
    "10. Scaling the Workflow": "10. توسيع سير العمل",
    "11. Security and Data Handling": "11. الأمان ومعالجة البيانات",
    "12. Frequently Asked Questions": "12. الأسئلة الشائعة",
    "13. Conclusion": "13. الخلاصة",
  },
};

const PRICING_LOCALIZATION_OVERRIDES: Partial<Record<Lang, Partial<SiteCopy["pricing"]>>> = {
  ru: {
    tierNames: ["Старт", "Рост", "Масштаб"] as [string, string, string],
    tierDescriptions: [
      "Один целевой workflow и документы для передачи.",
      "Несколько workflows с CRM и интеграциями поддержки.",
      "Кросс-командная программа автоматизации с постоянной оптимизацией.",
    ] as [string, string, string],
    tierBullets: [
      ["1 основной automation-сценарий", "До 3 интеграций", "Базовое QA и деплой", "Документация и передача"],
      ["До 3 связанных сценариев", "Интеграция CRM + сайта", "Чекпоинты ручного подтверждения", "Приоритетная поддержка на запуске"],
      ["Кастомная архитектура сценариев", "Продвинутая логика + webhooks", "Мониторинг и цикл улучшений", "Выделенный канал коммуникации"],
    ] as [string[], string[], string[]],
    starterOfferName: "Старт 50",
    starterOfferBullets: [
      "Редизайн 1 секции или 1 простой mini-workflow",
      "Мобильная оптимизация",
      "Базовые SEO-заголовки + OG",
      "Интеграция 1 формы захвата лида",
      "Срок 48 часов + 1 итерация правок",
    ],
    comparisonColumns: {
      feature: "Параметр",
      launch: "Старт",
      growth: "Рост",
      scale: "Масштаб",
    },
    comparisonRows: [
      { feature: "Количество сценариев", launch: "1 основной", growth: "До 3 сценариев", scale: "Кастомная программа" },
      { feature: "Интеграции", launch: "До 3", growth: "До 10", scale: "Без ограничений" },
      { feature: "Документация", launch: "Краткий handover", growth: "Структурированная документация", scale: "Живая документация" },
      { feature: "Модель поддержки", launch: "В рабочие часы", growth: "Приоритетная поддержка", scale: "Выделенный канал" },
    ],
    faqItems: [
      {
        question: "Можно начать с одного небольшого сценария?",
        answer: "Да. Большинство команд начинают с одного high-impact workflow и масштабируют после валидации.",
      },
      {
        question: "Даете фиксированную стоимость?",
        answer: "Да, для четко определенного объема. Для крупных программ используем поэтапный scope.",
      },
      {
        question: "Поддерживается мультивалютное коммерческое предложение?",
        answer: "Да. Мы локализуем цены по языку и выбранной валюте.",
      },
    ],
  },
  ar: {
    tierNames: ["الإطلاق", "النمو", "التوسع"] as [string, string, string],
    tierDescriptions: [
      "مسار عمل مركز واحد مع توثيق التسليم.",
      "إعداد عدة مسارات مع تكامل CRM والدعم.",
      "برنامج أتمتة شامل بين الفرق مع تحسين مستمر.",
    ] as [string, string, string],
    tierBullets: [
      ["مسار أتمتة أساسي واحد", "حتى 3 تكاملات", "اختبار أساسي + نشر", "توثيق وتسليم"],
      ["حتى 3 مسارات مترابطة", "تكامل CRM + الموقع", "نقاط موافقة بشرية", "دعم أولوية أثناء الإطلاق"],
      ["معمارية مسارات مخصصة", "منطق متقدم + webhooks", "مراقبة ودورة تحسين", "قناة تواصل مخصصة"],
    ] as [string[], string[], string[]],
    starterOfferName: "بداية 50",
    starterOfferBullets: [
      "إعادة تصميم قسم واحد أو mini-flow بسيط واحد",
      "تحسين للجوال",
      "عناوين SEO أساسية + OG",
      "تكامل نموذج التقاط عميل واحد",
      "تسليم خلال 48 ساعة + مراجعة واحدة",
    ],
    comparisonColumns: {
      feature: "الميزة",
      launch: "الإطلاق",
      growth: "النمو",
      scale: "التوسع",
    },
    comparisonRows: [
      { feature: "عدد المسارات", launch: "مسار أساسي واحد", growth: "حتى 3 مسارات", scale: "برنامج مخصص" },
      { feature: "التكاملات", launch: "حتى 3", growth: "حتى 10", scale: "غير محدود" },
      { feature: "التوثيق", launch: "ملاحظات تسليم", growth: "توثيق منظم", scale: "توثيق حي" },
      { feature: "نموذج الدعم", launch: "ساعات العمل", growth: "دعم أولوية", scale: "قناة مخصصة" },
    ],
    faqItems: [
      {
        question: "هل يمكن البدء بمسار عمل صغير واحد؟",
        answer: "نعم. أغلب الفرق تبدأ بمسار عالي التأثير ثم تتوسع بعد التحقق.",
      },
      {
        question: "هل توفرون نطاقا بسعر ثابت؟",
        answer: "نعم عند وضوح المخرجات. البرامج الأكبر تُدار على مراحل.",
      },
      {
        question: "هل تدعمون عروض أسعار متعددة العملات؟",
        answer: "نعم. نُوطّن الأسعار حسب اللغة والعملة المفضلة.",
      },
    ],
  },
};

type LocalizedLang = Exclude<Lang, "en">;

const CASE_STUDY_TITLE_OVERRIDES: Record<LocalizedLang, Record<string, string>> = {
  ru: {
    "lead-routing-upgrade": "Улучшение маршрутизации лидов и скорости ответа",
    "support-approval-system": "AI-поддержка с ручным подтверждением",
    "website-crm-sync": "Синхронизация сайта и CRM",
    "crm-sync-control-center": "Центр контроля CRM-синхронизации",
    "telegram-real-time-notifications": "Система уведомлений Telegram в реальном времени",
    "ai-decision-engine": "AI-движок принятия решений для маршрутизации",
    "human-loop-approval-gate": "Контур ручного согласования Human-in-the-loop",
    "conversion-follow-up-optimization": "Оптимизация follow-up для роста конверсии",
    "operations-reporting-dashboard": "Автоматизация операционного дашборда и отчетности",
  },
  ar: {
    "lead-routing-upgrade": "تحسين توجيه العملاء المحتملين وسرعة الاستجابة",
    "support-approval-system": "دعم بالذكاء الاصطناعي مع موافقة بشرية",
    "website-crm-sync": "مزامنة الموقع مع CRM",
    "crm-sync-control-center": "مركز التحكم في مزامنة CRM",
    "telegram-real-time-notifications": "نظام إشعارات Telegram الفورية",
    "ai-decision-engine": "محرك قرارات ذكاء اصطناعي لتوجيه المسارات",
    "human-loop-approval-gate": "بوابة موافقة بشرية Human-in-the-loop",
    "conversion-follow-up-optimization": "تحسين المتابعة لرفع التحويل",
    "operations-reporting-dashboard": "أتمتة لوحة تقارير العمليات",
  },
};

const CASE_STUDY_CATEGORY_OVERRIDES: Record<LocalizedLang, Record<string, string>> = {
  ru: {
    "Lead Systems": "Системы лидов",
    Support: "Поддержка",
    "Website + CRM": "Сайт + CRM",
    CRM: "CRM",
    Telegram: "Telegram",
    AI: "AI",
    "Human-in-the-loop": "Human-in-the-loop",
    Conversion: "Конверсия",
    Operations: "Операции",
  },
  ar: {
    "Lead Systems": "أنظمة العملاء المحتملين",
    Support: "الدعم",
    "Website + CRM": "الموقع + CRM",
    CRM: "CRM",
    Telegram: "Telegram",
    AI: "الذكاء الاصطناعي",
    "Human-in-the-loop": "Human-in-the-loop",
    Conversion: "التحويل",
    Operations: "العمليات",
  },
};

const CASE_STUDY_INDUSTRY_OVERRIDES: Record<LocalizedLang, Record<string, string>> = {
  ru: {
    "Service business": "Сервисный бизнес",
    "Digital services": "Цифровые сервисы",
    Agency: "Агентство",
    "B2B services": "B2B-сервисы",
    "Multi-team operations": "Мультикомандные операции",
    "Automation-first agency": "Агентство automation-first",
    "Regulated digital services": "Регулируемые цифровые сервисы",
    "Performance marketing": "Performance-маркетинг",
    "Service operations": "Сервисные операции",
  },
  ar: {
    "Service business": "أعمال خدمية",
    "Digital services": "خدمات رقمية",
    Agency: "وكالة",
    "B2B services": "خدمات B2B",
    "Multi-team operations": "عمليات متعددة الفرق",
    "Automation-first agency": "وكالة تعتمد الأتمتة",
    "Regulated digital services": "خدمات رقمية خاضعة للحوكمة",
    "Performance marketing": "تسويق الأداء",
    "Service operations": "عمليات خدمية",
  },
};

const CASE_STUDY_TAG_OVERRIDES: Record<LocalizedLang, Record<string, string>> = {
  ru: {
    "Lead & Sales": "Лиды и продажи",
    CRM: "CRM",
    Telegram: "Telegram",
    Support: "Поддержка",
    AI: "AI",
    "Human-in-the-loop": "Human-in-the-loop",
    Website: "Сайт",
    Conversion: "Конверсия",
    Operations: "Операции",
  },
  ar: {
    "Lead & Sales": "العملاء والمبيعات",
    CRM: "CRM",
    Telegram: "Telegram",
    Support: "الدعم",
    AI: "الذكاء الاصطناعي",
    "Human-in-the-loop": "Human-in-the-loop",
    Website: "الموقع",
    Conversion: "التحويل",
    Operations: "العمليات",
  },
};

const CASE_STUDY_TEXT_BY_LANG: Record<
  LocalizedLang,
  {
    problem: (title: string) => string;
    approach: (title: string) => string;
    deliverables: [string, string, string, string];
    outcomes: [string, string, string];
    before: [string, string, string];
    after: [string, string, string];
    metrics: [string, string, string];
  }
> = {
  ru: {
    problem: (title) => `До внедрения "${title}" процесс зависел от ручных шагов, задержек и разрозненных систем.`,
    approach: (title) => `Для сценария "${title}" мы внедрили управляемый workflow с проверками данных, маршрутизацией и автоматическими уведомлениями.`,
    deliverables: [
      "Карта процесса и точек потерь",
      "Workflow с валидацией и ветвлением",
      "Интеграция CRM и каналов уведомлений",
      "Документация и handover для команды",
    ],
    outcomes: ["Скорость операций выросла", "Ошибок ручного ввода стало меньше", "Прозрачность процесса стала выше"],
    before: ["Ручные действия", "Медленная реакция", "Низкая прозрачность"],
    after: ["Единый автоматизированный поток", "Быстрые уведомления", "Понятный контроль и отчетность"],
    metrics: ["Скорость реакции", "Качество данных", "Операционная нагрузка"],
  },
  ar: {
    problem: (title) => `قبل تنفيذ "${title}" كانت العملية تعتمد على خطوات يدوية وتأخير وتشتت بين الأنظمة.`,
    approach: (title) => `في سيناريو "${title}" قمنا ببناء مسار عمل منظم مع تحقق من البيانات وتوجيه تلقائي وإشعارات فورية.`,
    deliverables: [
      "خريطة العملية ونقاط الفاقد",
      "مسار عمل مع تحقق وتفرعات",
      "تكامل CRM وقنوات التنبيه",
      "توثيق وتسليم واضح للفريق",
    ],
    outcomes: ["تحسنت سرعة التنفيذ", "انخفضت الأخطاء اليدوية", "ارتفعت شفافية التشغيل"],
    before: ["تنفيذ يدوي", "استجابة بطيئة", "رؤية محدودة"],
    after: ["تدفق موحد مؤتمت", "تنبيهات سريعة", "متابعة وتقارير واضحة"],
    metrics: ["سرعة الاستجابة", "جودة البيانات", "العبء التشغيلي"],
  },
};

const CASE_STUDY_METRIC_STATE_BY_LANG: Record<
  LocalizedLang,
  { before: string; after: string; impact: string; impactPrefix: string }
> = {
  ru: {
    before: "До оптимизации",
    after: "После оптимизации",
    impact: "Существенное улучшение",
    impactPrefix: "Изменение ",
  },
  ar: {
    before: "قبل التحسين",
    after: "بعد التحسين",
    impact: "تحسن واضح",
    impactPrefix: "تغير ",
  },
};

const ARTICLE_CATEGORY_OVERRIDES: Record<LocalizedLang, Record<string, string>> = {
  ru: {
    "what-is-n8n-vs-zapier": "Сценарии n8n",
    "website-leads-to-telegram-10-minutes": "Автоматизация",
    "ai-assisted-support-safe-approval": "AI для бизнеса",
    "five-automations-small-business": "Автоматизация",
    "crm-basics-forms-to-pipeline": "CRM и лид-системы",
    "website-automation-modern-growth-stack": "Конверсия сайта",
  },
  ar: {
    "what-is-n8n-vs-zapier": "مسارات n8n",
    "website-leads-to-telegram-10-minutes": "الأتمتة",
    "ai-assisted-support-safe-approval": "الذكاء الاصطناعي للأعمال",
    "five-automations-small-business": "الأتمتة",
    "crm-basics-forms-to-pipeline": "CRM وأنظمة العملاء",
    "website-automation-modern-growth-stack": "تحويل المواقع",
  },
};

const ARTICLE_SECTION_BODY_TEMPLATES: Record<LocalizedLang, string[]> = {
  ru: [
    `Этот раздел вводит в тему "{title}" и объясняет исходный контекст внедрения. {summary}`,
    "Ключевая бизнес-проблема обычно связана с ручными операциями, задержками реакции и потерей прозрачности между командами.",
    "Автоматизация решает задачу за счет предсказуемого процесса: валидация данных, единые правила и быстрые маршруты реакции.",
    "Рекомендуемая архитектура: триггер -> проверка данных -> бизнес-логика -> обновление систем -> уведомления и контроль.",
    "Пошаговая реализация: получить событие, проверить поля, применить правила, обновить CRM и записать журнал выполнения.",
    "В n8n это реализуется через Webhook/Trigger, IF/Switch, Function и интеграционные ноды с обработкой ошибок.",
    "Типовые сценарии: лиды и продажи, поддержка, синхронизация CRM, отчетность и SLA-уведомления.",
    "Частые ошибки: отсутствие валидации, контроль дублей только вручную, слабый мониторинг и размытая зона ответственности.",
    "Лучшие практики: единые схемы данных, понятные названия нод, алерты, ретраи и обязательная документация.",
    "Для масштаба добавляют маршрутизацию по сегментам, очереди для пиковых нагрузок и модульные подпроцессы.",
    "Безопасность строится на проверке подписи вебхуков, хранении секретов и минимизации чувствительных данных в логах.",
    "FAQ обычно покрывает сроки запуска, требования к стеку, варианты расширения и модель дальнейшей поддержки.",
    "Итог: внедряйте поэтапно, измеряйте KPI и улучшайте workflow на основе данных эксплуатации.",
  ],
  ar: [
    `يقدم هذا القسم موضوع "{title}" ويشرح سياق التنفيذ العملي. {summary}`,
    "غالبا ما تكون المشكلة الأساسية في الخطوات اليدوية، وتأخر الاستجابة، وضعف وضوح المسؤوليات بين الفرق.",
    "تعالج الأتمتة هذه المشكلة عبر تدفق منظم يشمل التحقق من البيانات، قواعد واضحة، ومسارات استجابة سريعة.",
    "البنية المقترحة: مشغل -> تحقق من البيانات -> منطق الأعمال -> تحديث الأنظمة -> تنبيهات ومتابعة.",
    "خطوات التنفيذ: استقبال الحدث، التحقق من الحقول، تطبيق القواعد، تحديث CRM، وتسجيل التنفيذ.",
    "في n8n يتم ذلك عبر عقد Webhook/Trigger و IF/Switch و Function وعقد التكامل مع معالجة الأخطاء.",
    "أمثلة الاستخدام تشمل: العملاء المحتملين والمبيعات، الدعم، مزامنة CRM، التقارير، وتنبيهات SLA.",
    "الأخطاء الشائعة: غياب التحقق، ضعف إدارة التكرار، مراقبة محدودة، وعدم وضوح ملكية الخطوات.",
    "أفضل الممارسات: توحيد مخطط البيانات، تسمية العقد بوضوح، إضافة تنبيهات وإعادة محاولة، وتوثيق مستمر.",
    "عند التوسع يضاف التوجيه حسب الشرائح، وطوابير للضغط العالي، ومسارات فرعية قابلة لإعادة الاستخدام.",
    "الأمان يعتمد على التحقق من التوقيع، حفظ الأسرار بشكل آمن، وتقليل البيانات الحساسة في السجلات.",
    "قسم الأسئلة الشائعة يغطي مدة الإطلاق، متطلبات الأدوات، خيارات التوسع، وخطة الدعم بعد الإطلاق.",
    "الخلاصة: نفذ على مراحل، راقب مؤشرات الأداء، ثم حسّن المسار باستمرار بناء على النتائج.",
  ],
};

const ARTICLE_IMAGE_COPY_BY_LANG: Record<LocalizedLang, { altSuffix: string; caption: string }> = {
  ru: {
    altSuffix: "схема автоматизации",
    caption: "Схема архитектуры workflow и последовательности выполнения.",
  },
  ar: {
    altSuffix: "مخطط الأتمتة",
    caption: "يوضح المخطط بنية المسار وتسلسل التنفيذ.",
  },
};

const extractNumericImpact = (value: string) => {
  const matched = value.match(/[+\-]?\d+(?:[.,]\d+)?%?\+?/);
  return matched?.[0];
};

const interpolateTemplate = (template: string, article: BlogArticle) => {
  return template.replaceAll("{title}", article.title).replaceAll("{summary}", article.summary);
};

const localizeCaseStudyMetrics = (lang: LocalizedLang, metrics: CaseStudyItem["metrics"]): CaseStudyItem["metrics"] => {
  const template = CASE_STUDY_METRIC_STATE_BY_LANG[lang];
  const labels = CASE_STUDY_TEXT_BY_LANG[lang].metrics;
  return metrics.map((metric, index) => {
    const numeric = extractNumericImpact(metric.impact);
    return {
      label: labels[index] ?? labels[labels.length - 1],
      before: template.before,
      after: template.after,
      impact: numeric ? `${template.impactPrefix}${numeric}` : template.impact,
    };
  });
};

const applyCaseStudyLocalizationOverrides = (lang: Lang, content: SiteCopy): SiteCopy => {
  if (lang === "en") {
    return content;
  }

  const localizedLang = lang as LocalizedLang;
  const titleMap = CASE_STUDY_TITLE_OVERRIDES[localizedLang];
  const categoryMap = CASE_STUDY_CATEGORY_OVERRIDES[localizedLang];
  const industryMap = CASE_STUDY_INDUSTRY_OVERRIDES[localizedLang];
  const tagMap = CASE_STUDY_TAG_OVERRIDES[localizedLang];
  const templates = CASE_STUDY_TEXT_BY_LANG[localizedLang];

  return {
    ...content,
    caseStudies: content.caseStudies.map((caseStudy) => {
      const title = titleMap[caseStudy.slug] ?? caseStudy.title;
      return {
        ...caseStudy,
        title,
        category: categoryMap[caseStudy.category] ?? caseStudy.category,
        industry: industryMap[caseStudy.industry] ?? caseStudy.industry,
        problem: templates.problem(title),
        approach: templates.approach(title),
        deliverables: [...templates.deliverables],
        outcomes: [...templates.outcomes],
        before: [...templates.before],
        after: [...templates.after],
        metrics: localizeCaseStudyMetrics(localizedLang, caseStudy.metrics),
        tags: caseStudy.tags.map((tag) => tagMap[tag] ?? tag),
      };
    }),
  };
};

const applyArticleLocalizationOverrides = (lang: Lang, content: SiteCopy): SiteCopy => {
  const overrides = ARTICLE_LOCALIZATION_OVERRIDES[lang];
  const headingOverrides = ARTICLE_SECTION_HEADING_OVERRIDES[lang];
  const hasOverrides = Boolean(overrides || headingOverrides || lang !== "en");

  if (!hasOverrides) {
    return content;
  }

  const articleOverrides = decodeMojibakeDeep(overrides ?? {}) as Record<string, Partial<BlogArticle>>;
  const resolvedHeadingOverrides = decodeMojibakeDeep(headingOverrides ?? {}) as Record<string, string>;
  const categoryOverrides = lang === "en" ? undefined : ARTICLE_CATEGORY_OVERRIDES[lang as LocalizedLang];

  return {
    ...content,
    articles: content.articles.map((article) => {
      const localizedArticle: BlogArticle = {
        ...article,
        ...(articleOverrides[article.slug] ?? {}),
        category: categoryOverrides?.[article.slug] ?? article.category,
      };

      if (lang === "en") {
        return {
          ...localizedArticle,
          sections: localizedArticle.sections.map((section) => ({
            ...section,
            heading: resolvedHeadingOverrides[section.heading] ?? section.heading,
          })),
        };
      }

      const localizedLang = lang as LocalizedLang;
      const bodyTemplates = ARTICLE_SECTION_BODY_TEMPLATES[localizedLang];
      const imageCopy = ARTICLE_IMAGE_COPY_BY_LANG[localizedLang];

      return {
        ...localizedArticle,
        sections: localizedArticle.sections.map((section, index) => ({
          ...section,
          heading: resolvedHeadingOverrides[section.heading] ?? section.heading,
          body: interpolateTemplate(bodyTemplates[index] ?? bodyTemplates[bodyTemplates.length - 1], localizedArticle),
          imageAlt: section.image ? `${localizedArticle.title}: ${imageCopy.altSuffix}` : section.imageAlt,
          imageCaption: section.image ? imageCopy.caption : section.imageCaption,
        })),
      };
    }),
  };
};

const applyPricingLocalizationOverrides = (lang: Lang, content: SiteCopy): SiteCopy => {
  const overrides = PRICING_LOCALIZATION_OVERRIDES[lang];
  if (!overrides) {
    return content;
  }

  const resolvedOverrides = decodeMojibakeDeep(overrides) as Partial<SiteCopy["pricing"]>;

  return {
    ...content,
    pricing: {
      ...content.pricing,
      ...resolvedOverrides,
    },
  };
};

const buildLocalizedContent = (lang: LocalizedLang): SiteCopy => {
  const decoded = decodeMojibakeDeep(RAW_SITE_CONTENT[lang]);
  return applyPricingLocalizationOverrides(
    lang,
    applyCaseStudyLocalizationOverrides(lang, applyArticleLocalizationOverrides(lang, decoded)),
  );
};

export const SITE_CONTENT: Record<Lang, SiteCopy> = {
  en: RAW_SITE_CONTENT.en,
  ru: buildLocalizedContent("ru"),
  ar: buildLocalizedContent("ar"),
};

export const getServiceBySlug = (lang: Lang, slug: string) => {
  return SITE_CONTENT[lang].services.find((service) => service.slug === slug);
};

export const getWorkflowById = (lang: Lang, id: string) => {
  return SITE_CONTENT[lang].workflows.find((item) => item.id === id);
};

export const getCaseStudyBySlug = (lang: Lang, slug: string) => {
  return SITE_CONTENT[lang].caseStudies.find((item) => item.slug === slug);
};

export const getArticleBySlug = (lang: Lang, slug: string) => {
  return SITE_CONTENT[lang].articles.find((item) => item.slug === slug);
};



