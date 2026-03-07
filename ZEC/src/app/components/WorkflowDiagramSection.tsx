"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Lang } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";

type DiagramNode = {
  id: string;
  title: string;
  caption: string;
  iconLabel: string;
  iconSrc?: string;
  fallbackIcon?: string;
  x: number;
  y: number;
};

type DiagramEdge = {
  from: string;
  to: string;
  curve?: number;
};

type DiagramFlow = {
  id: string;
  tabLabel: string;
  title: string;
  trigger: string;
  steps: string[];
  outcome: string;
  nodes: DiagramNode[];
  edges: DiagramEdge[];
};

type LocalizedText = {
  sectionTitle: string;
  sectionSubtitle: string;
  trigger: string;
  steps: string;
  outcome: string;
  request: string;
};

const getLocalizedText = (lang: Lang): LocalizedText => {
  if (lang === "ru") {
    return {
      sectionTitle: "Workflow Diagram",
      sectionSubtitle: "Переключайте сценарии и смотрите, как триггеры запускают шаги до финального результата.",
      trigger: "Триггер",
      steps: "Шаги",
      outcome: "Результат",
      request: "Запросить этот workflow",
    };
  }

  if (lang === "ar") {
    return {
      sectionTitle: "مخطط سير العمل",
      sectionSubtitle: "بدّل بين المسارات وشاهد كيف ينتقل الحدث من المشغل إلى النتيجة النهائية.",
      trigger: "المشغل",
      steps: "الخطوات",
      outcome: "النتيجة",
      request: "اطلب هذا المسار",
    };
  }

  return {
    sectionTitle: "Workflow Diagram",
    sectionSubtitle: "Switch examples and see each automation run from trigger to outcome.",
    trigger: "Trigger",
    steps: "Steps",
    outcome: "Outcome",
    request: "Request this workflow",
  };
};

const getFlows = (lang: Lang): DiagramFlow[] => {
  if (lang === "ru") {
    return [
      {
        id: "weekly-analytics",
        tabLabel: "Еженедельный аналитический отчет",
        title: "Weekly Analytics Report",
        trigger: "По расписанию раз в неделю",
        steps: [
          "Получить аналитику Facebook, Twitter/X и LinkedIn",
          "Нормализовать метрики по каждому каналу",
          "Объединить данные в один пакет",
          "Записать в Google Sheets и отправить отчет на Gmail",
        ],
        outcome: "Единый отчет обновляется автоматически и приходит команде без ручной сборки.",
        nodes: [
          { id: "run", title: "Run weekly", caption: "trigger", iconLabel: "Schedule", fallbackIcon: "⏱", x: 8, y: 50 },
          { id: "fb", title: "Get Facebook analytics", caption: "source", iconLabel: "Facebook", iconSrc: "/logos/facebook.svg", x: 25, y: 20 },
          { id: "x", title: "Get Twitter analytics", caption: "source", iconLabel: "Twitter/X", iconSrc: "/logos/x.svg", x: 25, y: 50 },
          { id: "li", title: "Get LinkedIn analytics", caption: "source", iconLabel: "LinkedIn", iconSrc: "/logos/linkedin.svg", x: 25, y: 80 },
          { id: "ffb", title: "Format Facebook metrics", caption: "transform", iconLabel: "Formatter", fallbackIcon: "✎", x: 43, y: 20 },
          { id: "fx", title: "Format Twitter metrics", caption: "transform", iconLabel: "Formatter", fallbackIcon: "✎", x: 43, y: 50 },
          { id: "fli", title: "Format LinkedIn metrics", caption: "transform", iconLabel: "Formatter", fallbackIcon: "✎", x: 43, y: 80 },
          { id: "merge", title: "Merge", caption: "append", iconLabel: "Merge", fallbackIcon: "⎇", x: 61, y: 50 },
          { id: "sheets", title: "Write data to a sheet", caption: "destination", iconLabel: "Google Sheets", iconSrc: "/logos/google-sheets.svg", x: 81, y: 35 },
          { id: "gmail", title: "Send a report", caption: "destination", iconLabel: "Gmail", iconSrc: "/logos/gmail.svg", x: 81, y: 65 },
        ],
        edges: [
          { from: "run", to: "fb", curve: -42 },
          { from: "run", to: "x", curve: 0 },
          { from: "run", to: "li", curve: 42 },
          { from: "fb", to: "ffb", curve: 0 },
          { from: "x", to: "fx", curve: 0 },
          { from: "li", to: "fli", curve: 0 },
          { from: "ffb", to: "merge", curve: 28 },
          { from: "fx", to: "merge", curve: 0 },
          { from: "fli", to: "merge", curve: -28 },
          { from: "merge", to: "sheets", curve: -28 },
          { from: "merge", to: "gmail", curve: 28 },
        ],
      },
      {
        id: "lead-crm-telegram",
        tabLabel: "Лид -> CRM -> Telegram",
        title: "Lead Capture -> CRM -> Telegram Notification",
        trigger: "Новый лид из формы или чата",
        steps: [
          "Проверить имя и email",
          "Сохранить в Airtable",
          "Создать/обновить контакт в HubSpot",
          "Отправить уведомление в Telegram",
        ],
        outcome: "Команда реагирует быстрее и не теряет входящие лиды.",
        nodes: [
          { id: "lead", title: "Lead submitted", caption: "trigger", iconLabel: "Webhook", fallbackIcon: "⚡", x: 10, y: 50 },
          { id: "validate", title: "Validate lead", caption: "check", iconLabel: "Validation", fallbackIcon: "✓", x: 28, y: 50 },
          { id: "airtable", title: "Save to Airtable", caption: "storage", iconLabel: "Airtable", iconSrc: "/logos/airtable.svg", x: 46, y: 50 },
          { id: "hubspot", title: "Sync HubSpot", caption: "crm", iconLabel: "HubSpot", iconSrc: "/logos/hubspot.svg", x: 64, y: 50 },
          { id: "telegram", title: "Notify Telegram", caption: "message", iconLabel: "Telegram", iconSrc: "/logos/telegram.svg", x: 82, y: 50 },
        ],
        edges: [
          { from: "lead", to: "validate" },
          { from: "validate", to: "airtable" },
          { from: "airtable", to: "hubspot" },
          { from: "hubspot", to: "telegram" },
        ],
      },
      {
        id: "support-ai-approve",
        tabLabel: "Support Email -> AI -> Approve",
        title: "Support Email -> AI Draft -> Human Approve -> Send Reply",
        trigger: "Новое письмо в Gmail",
        steps: [
          "Извлечь контекст заявки",
          "Сгенерировать черновик ответа через AI",
          "Отправить в Slack/Telegram на ручное подтверждение",
          "После подтверждения отправить финальный ответ",
        ],
        outcome: "Скорость поддержки растет, качество остается под ручным контролем.",
        nodes: [
          { id: "mail", title: "New support email", caption: "trigger", iconLabel: "Gmail", iconSrc: "/logos/gmail.svg", x: 10, y: 50 },
          { id: "context", title: "Extract context", caption: "process", iconLabel: "Parser", fallbackIcon: "⌁", x: 30, y: 50 },
          { id: "ai", title: "AI draft", caption: "openai", iconLabel: "OpenAI", fallbackIcon: "AI", x: 50, y: 50 },
          { id: "approve", title: "Human approve", caption: "review", iconLabel: "Approval", fallbackIcon: "👤", x: 70, y: 50 },
          { id: "reply", title: "Send reply", caption: "message", iconLabel: "Reply", fallbackIcon: "✉", x: 88, y: 50 },
        ],
        edges: [
          { from: "mail", to: "context" },
          { from: "context", to: "ai" },
          { from: "ai", to: "approve" },
          { from: "approve", to: "reply" },
        ],
      },
    ];
  }

  if (lang === "ar") {
    return [
      {
        id: "weekly-analytics",
        tabLabel: "تقرير تحليلي أسبوعي",
        title: "Weekly Analytics Report",
        trigger: "تشغيل أسبوعي تلقائي",
        steps: [
          "جلب تحليلات Facebook وTwitter/X وLinkedIn",
          "تنسيق المقاييس لكل قناة",
          "دمج النتائج في عقدة واحدة",
          "حفظ البيانات في Google Sheets وإرسال تقرير عبر Gmail",
        ],
        outcome: "يتم إنشاء التقرير الأسبوعي تلقائيا وإرساله دون عمل يدوي.",
        nodes: [
          { id: "run", title: "Run weekly", caption: "trigger", iconLabel: "Schedule", fallbackIcon: "⏱", x: 8, y: 50 },
          { id: "fb", title: "Get Facebook analytics", caption: "source", iconLabel: "Facebook", iconSrc: "/logos/facebook.svg", x: 25, y: 20 },
          { id: "x", title: "Get Twitter analytics", caption: "source", iconLabel: "Twitter/X", iconSrc: "/logos/x.svg", x: 25, y: 50 },
          { id: "li", title: "Get LinkedIn analytics", caption: "source", iconLabel: "LinkedIn", iconSrc: "/logos/linkedin.svg", x: 25, y: 80 },
          { id: "ffb", title: "Format Facebook metrics", caption: "transform", iconLabel: "Formatter", fallbackIcon: "✎", x: 43, y: 20 },
          { id: "fx", title: "Format Twitter metrics", caption: "transform", iconLabel: "Formatter", fallbackIcon: "✎", x: 43, y: 50 },
          { id: "fli", title: "Format LinkedIn metrics", caption: "transform", iconLabel: "Formatter", fallbackIcon: "✎", x: 43, y: 80 },
          { id: "merge", title: "Merge", caption: "append", iconLabel: "Merge", fallbackIcon: "⎇", x: 61, y: 50 },
          { id: "sheets", title: "Write data to a sheet", caption: "destination", iconLabel: "Google Sheets", iconSrc: "/logos/google-sheets.svg", x: 81, y: 35 },
          { id: "gmail", title: "Send a report", caption: "destination", iconLabel: "Gmail", iconSrc: "/logos/gmail.svg", x: 81, y: 65 },
        ],
        edges: [
          { from: "run", to: "fb", curve: -42 },
          { from: "run", to: "x", curve: 0 },
          { from: "run", to: "li", curve: 42 },
          { from: "fb", to: "ffb", curve: 0 },
          { from: "x", to: "fx", curve: 0 },
          { from: "li", to: "fli", curve: 0 },
          { from: "ffb", to: "merge", curve: 28 },
          { from: "fx", to: "merge", curve: 0 },
          { from: "fli", to: "merge", curve: -28 },
          { from: "merge", to: "sheets", curve: -28 },
          { from: "merge", to: "gmail", curve: 28 },
        ],
      },
      {
        id: "lead-crm-telegram",
        tabLabel: "العميل -> CRM -> Telegram",
        title: "Lead Capture -> CRM -> Telegram Notification",
        trigger: "وصول عميل جديد من النموذج أو المحادثة",
        steps: [
          "التحقق من الاسم والبريد",
          "حفظ البيانات في Airtable",
          "تحديث جهة الاتصال في HubSpot",
          "إرسال تنبيه إلى Telegram",
        ],
        outcome: "استجابة أسرع وعدم فقدان العملاء المحتملين.",
        nodes: [
          { id: "lead", title: "Lead submitted", caption: "trigger", iconLabel: "Webhook", fallbackIcon: "⚡", x: 10, y: 50 },
          { id: "validate", title: "Validate lead", caption: "check", iconLabel: "Validation", fallbackIcon: "✓", x: 28, y: 50 },
          { id: "airtable", title: "Save to Airtable", caption: "storage", iconLabel: "Airtable", iconSrc: "/logos/airtable.svg", x: 46, y: 50 },
          { id: "hubspot", title: "Sync HubSpot", caption: "crm", iconLabel: "HubSpot", iconSrc: "/logos/hubspot.svg", x: 64, y: 50 },
          { id: "telegram", title: "Notify Telegram", caption: "message", iconLabel: "Telegram", iconSrc: "/logos/telegram.svg", x: 82, y: 50 },
        ],
        edges: [
          { from: "lead", to: "validate" },
          { from: "validate", to: "airtable" },
          { from: "airtable", to: "hubspot" },
          { from: "hubspot", to: "telegram" },
        ],
      },
      {
        id: "support-ai-approve",
        tabLabel: "بريد الدعم -> AI -> موافقة",
        title: "Support Email -> AI Draft -> Human Approve -> Send Reply",
        trigger: "وصول رسالة دعم جديدة إلى Gmail",
        steps: [
          "استخراج سياق الرسالة",
          "إنشاء مسودة رد عبر AI",
          "إرسال المسودة للمراجعة البشرية",
          "إرسال الرد النهائي بعد الموافقة",
        ],
        outcome: "دعم أسرع مع بقاء القرار النهائي بيد الفريق.",
        nodes: [
          { id: "mail", title: "New support email", caption: "trigger", iconLabel: "Gmail", iconSrc: "/logos/gmail.svg", x: 10, y: 50 },
          { id: "context", title: "Extract context", caption: "process", iconLabel: "Parser", fallbackIcon: "⌁", x: 30, y: 50 },
          { id: "ai", title: "AI draft", caption: "openai", iconLabel: "OpenAI", fallbackIcon: "AI", x: 50, y: 50 },
          { id: "approve", title: "Human approve", caption: "review", iconLabel: "Approval", fallbackIcon: "👤", x: 70, y: 50 },
          { id: "reply", title: "Send reply", caption: "message", iconLabel: "Reply", fallbackIcon: "✉", x: 88, y: 50 },
        ],
        edges: [
          { from: "mail", to: "context" },
          { from: "context", to: "ai" },
          { from: "ai", to: "approve" },
          { from: "approve", to: "reply" },
        ],
      },
    ];
  }

  return [
    {
      id: "weekly-analytics",
      tabLabel: "Weekly Analytics Report",
      title: "Weekly Analytics Report",
      trigger: "Run weekly on schedule",
      steps: [
        "Fetch Facebook, Twitter/X, and LinkedIn analytics",
        "Format each channel metric set",
        "Merge all data into one payload",
        "Write to Google Sheets and send report via Gmail",
      ],
      outcome: "A complete weekly report is generated and delivered automatically.",
      nodes: [
        { id: "run", title: "Run weekly", caption: "trigger", iconLabel: "Schedule", fallbackIcon: "⏱", x: 8, y: 50 },
        { id: "fb", title: "Get Facebook analytics", caption: "source", iconLabel: "Facebook", iconSrc: "/logos/facebook.svg", x: 25, y: 20 },
        { id: "x", title: "Get Twitter analytics", caption: "source", iconLabel: "Twitter/X", iconSrc: "/logos/x.svg", x: 25, y: 50 },
        { id: "li", title: "Get LinkedIn analytics", caption: "source", iconLabel: "LinkedIn", iconSrc: "/logos/linkedin.svg", x: 25, y: 80 },
        { id: "ffb", title: "Format Facebook metrics", caption: "transform", iconLabel: "Formatter", fallbackIcon: "✎", x: 43, y: 20 },
        { id: "fx", title: "Format Twitter metrics", caption: "transform", iconLabel: "Formatter", fallbackIcon: "✎", x: 43, y: 50 },
        { id: "fli", title: "Format LinkedIn metrics", caption: "transform", iconLabel: "Formatter", fallbackIcon: "✎", x: 43, y: 80 },
        { id: "merge", title: "Merge", caption: "append", iconLabel: "Merge", fallbackIcon: "⎇", x: 61, y: 50 },
        { id: "sheets", title: "Write data to a sheet", caption: "destination", iconLabel: "Google Sheets", iconSrc: "/logos/google-sheets.svg", x: 81, y: 35 },
        { id: "gmail", title: "Send a report", caption: "destination", iconLabel: "Gmail", iconSrc: "/logos/gmail.svg", x: 81, y: 65 },
      ],
      edges: [
        { from: "run", to: "fb", curve: -42 },
        { from: "run", to: "x", curve: 0 },
        { from: "run", to: "li", curve: 42 },
        { from: "fb", to: "ffb", curve: 0 },
        { from: "x", to: "fx", curve: 0 },
        { from: "li", to: "fli", curve: 0 },
        { from: "ffb", to: "merge", curve: 28 },
        { from: "fx", to: "merge", curve: 0 },
        { from: "fli", to: "merge", curve: -28 },
        { from: "merge", to: "sheets", curve: -28 },
        { from: "merge", to: "gmail", curve: 28 },
      ],
    },
    {
      id: "lead-crm-telegram",
      tabLabel: "Lead Capture -> CRM -> Telegram",
      title: "Lead Capture -> CRM -> Telegram Notification",
      trigger: "New website lead from form or chat",
      steps: [
        "Validate name and email",
        "Save to Airtable",
        "Create or update contact in HubSpot",
        "Send Telegram alert to internal channel",
      ],
      outcome: "Faster agency response and no missed leads.",
      nodes: [
        { id: "lead", title: "Lead submitted", caption: "trigger", iconLabel: "Webhook", fallbackIcon: "⚡", x: 10, y: 50 },
        { id: "validate", title: "Validate lead", caption: "check", iconLabel: "Validation", fallbackIcon: "✓", x: 28, y: 50 },
        { id: "airtable", title: "Save to Airtable", caption: "storage", iconLabel: "Airtable", iconSrc: "/logos/airtable.svg", x: 46, y: 50 },
        { id: "hubspot", title: "Sync HubSpot", caption: "crm", iconLabel: "HubSpot", iconSrc: "/logos/hubspot.svg", x: 64, y: 50 },
        { id: "telegram", title: "Notify Telegram", caption: "message", iconLabel: "Telegram", iconSrc: "/logos/telegram.svg", x: 82, y: 50 },
      ],
      edges: [
        { from: "lead", to: "validate" },
        { from: "validate", to: "airtable" },
        { from: "airtable", to: "hubspot" },
        { from: "hubspot", to: "telegram" },
      ],
    },
    {
      id: "support-ai-approve",
      tabLabel: "Support Email -> AI Draft -> Human Approve",
      title: "Support Email -> AI Draft -> Human Approve -> Send Reply",
      trigger: "New support email arrives",
      steps: [
        "Extract issue context",
        "Generate AI draft reply",
        "Send draft for human approval",
        "Deliver approved final response",
      ],
      outcome: "Support speed improves while humans keep final control.",
      nodes: [
        { id: "mail", title: "New support email", caption: "trigger", iconLabel: "Gmail", iconSrc: "/logos/gmail.svg", x: 10, y: 50 },
        { id: "context", title: "Extract context", caption: "process", iconLabel: "Parser", fallbackIcon: "⌁", x: 30, y: 50 },
        { id: "ai", title: "AI draft", caption: "openai", iconLabel: "OpenAI", fallbackIcon: "AI", x: 50, y: 50 },
        { id: "approve", title: "Human approve", caption: "review", iconLabel: "Approval", fallbackIcon: "👤", x: 70, y: 50 },
        { id: "reply", title: "Send reply", caption: "message", iconLabel: "Reply", fallbackIcon: "✉", x: 88, y: 50 },
      ],
      edges: [
        { from: "mail", to: "context" },
        { from: "context", to: "ai" },
        { from: "ai", to: "approve" },
        { from: "approve", to: "reply" },
      ],
    },
  ];
};

const canvasWidth = 1100;
const canvasHeight = 470;

const cx = (x: number, isRtl: boolean) => ((isRtl ? 100 - x : x) / 100) * canvasWidth;
const cy = (y: number) => (y / 100) * canvasHeight;

export function WorkflowDiagramSection({ lang }: { lang: Lang }) {
  const isRtl = lang === "ar";
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const panRef = useRef<HTMLDivElement>(null);
  const t = getLocalizedText(lang);
  const flows = useMemo(() => getFlows(lang), [lang]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoPaused, setAutoPaused] = useState(false);

  useEffect(() => {
    if (flows.length < 2 || autoPaused) return;
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % flows.length);
    }, 3200);
    return () => window.clearInterval(timer);
  }, [autoPaused, flows.length]);

  const normalizedIndex = flows.length ? activeIndex % flows.length : 0;
  const activeFlow = flows[normalizedIndex] ?? flows[0];

  const nodeMap = useMemo(() => {
    const map = new Map<string, DiagramNode>();
    activeFlow.nodes.forEach((node) => {
      map.set(node.id, node);
    });
    return map;
  }, [activeFlow.nodes]);

  const onPanEnter = () => {
    const shell = panRef.current;
    if (!shell) return;
    shell.style.setProperty("--wf-scale", "1.3");
  };

  const onPanMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const shell = panRef.current;
    if (!shell) return;
    const rect = shell.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    shell.style.setProperty("--wf-x", `${x}%`);
    shell.style.setProperty("--wf-y", `${y}%`);
  };

  const onPanLeave = () => {
    const shell = panRef.current;
    if (!shell) return;
    shell.style.setProperty("--wf-scale", "1");
    shell.style.setProperty("--wf-x", "50%");
    shell.style.setProperty("--wf-y", "50%");
  };

  return (
    <section
      className={`rounded-[2rem] border border-edge p-6 md:p-8 ${
        isDark ? "bg-[#121725] text-slate-100 shadow-[0_20px_60px_-40px_rgba(41,121,255,0.55)]" : "bg-panel text-text shadow-[0_20px_60px_-40px_rgba(43,117,215,0.28)]"
      }`}
      onMouseEnter={() => setAutoPaused(true)}
      onMouseLeave={() => setAutoPaused(false)}
    >
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="title-chroma font-display text-3xl text-text md:text-4xl">{t.sectionTitle}</h2>
          <p className="copy-color-flow mt-2 max-w-3xl text-sm text-muted">{t.sectionSubtitle}</p>
        </div>
        <a
          href="/contact#schedule"
          className={`rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] ${
            isDark ? "border-slate-500/60 text-white hover:border-blue-400" : "border-edge text-text hover:border-brand"
          }`}
        >
          {t.request}
        </a>
      </div>

      <div className={`mb-5 overflow-x-auto pb-1 ${isRtl ? "mr-auto" : ""}`}>
        <div className={`inline-flex min-w-max rounded-full border p-1 ${isDark ? "border-slate-600 bg-slate-900/70" : "border-edge bg-panel2"}`}>
          {flows.map((flow, index) => (
            <button
              key={flow.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`whitespace-nowrap rounded-full px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] ${
                normalizedIndex === index
                  ? "bg-brand text-white"
                  : isDark
                    ? "text-slate-300 hover:text-white"
                    : "text-muted hover:text-text"
              }`}
            >
              {flow.tabLabel}
            </button>
          ))}
        </div>
      </div>

      <div ref={panRef} onMouseEnter={onPanEnter} onMouseMove={onPanMove} onMouseLeave={onPanLeave} className="workflow-interactive-shell overflow-x-auto">
        <div
          key={`${activeFlow.id}-canvas`}
          className={`workflow-interactive-image relative min-w-[1040px] rounded-2xl border animate-[workflow-swap_260ms_ease] ${isDark ? "border-slate-600/70" : "border-edge"}`}
          style={{
            width: `${canvasWidth}px`,
            height: `${canvasHeight}px`,
            backgroundColor: isDark ? "#191E2A" : "#F7FAFF",
            backgroundImage:
              isDark
                ? "radial-gradient(rgba(163, 182, 209, 0.26) 0.8px, transparent 0.8px), linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0))"
                : "radial-gradient(rgba(119, 145, 184, 0.3) 0.8px, transparent 0.8px), linear-gradient(180deg, rgba(255,255,255,0.7), rgba(247,250,255,0.92))",
            backgroundSize: "16px 16px, 100% 100%",
          }}
        >
          <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox={`0 0 ${canvasWidth} ${canvasHeight}`} fill="none" aria-hidden="true">
            <defs>
              <linearGradient id="edgeGlow" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor={isDark ? "#8EA1BD" : "#6E8DB7"} stopOpacity={isDark ? "0.35" : "0.28"} />
                <stop offset="50%" stopColor={isDark ? "#A9C7FF" : "#5E88CB"} stopOpacity={isDark ? "0.82" : "0.68"} />
                <stop offset="100%" stopColor={isDark ? "#8EA1BD" : "#6E8DB7"} stopOpacity={isDark ? "0.35" : "0.28"} />
              </linearGradient>
              <marker id="arrowHead" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                <path d="M0 0L8 4L0 8Z" fill={isDark ? "#9DB9E8" : "#6B8FC6"} />
              </marker>
            </defs>

            {activeFlow.edges.map((edge) => {
              const from = nodeMap.get(edge.from);
              const to = nodeMap.get(edge.to);
              if (!from || !to) return null;

              const startX = cx(from.x, isRtl);
              const startY = cy(from.y);
              const endX = cx(to.x, isRtl);
              const endY = cy(to.y);
              const direction = endX >= startX ? 1 : -1;
              const spread = Math.max(Math.abs(endX - startX) * 0.38, 70) * direction;
              const controlCurve = edge.curve ?? 0;

              const d = `M ${startX} ${startY} C ${startX + spread} ${startY + controlCurve}, ${endX - spread} ${endY + controlCurve}, ${endX} ${endY}`;

              return (
                <g key={`${edge.from}-${edge.to}`}>
                  <path d={d} stroke={isDark ? "rgba(41,121,255,0.17)" : "rgba(67,126,206,0.22)"} strokeWidth="6" fill="none" />
                  <path d={d} stroke="url(#edgeGlow)" strokeWidth="2" fill="none" markerEnd="url(#arrowHead)" />
                </g>
              );
            })}
          </svg>

          {activeFlow.nodes.map((node) => {
            const left = isRtl ? 100 - node.x : node.x;
            return (
              <div
                key={node.id}
                className="absolute"
                style={{ left: `${left}%`, top: `${node.y}%`, transform: "translate(-50%, -50%)" }}
              >
                <div
                  className={`w-[170px] rounded-2xl border px-3 py-3 ${
                    isDark
                      ? "border-slate-400/50 bg-slate-900/85 shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_12px_30px_-20px_rgba(91,151,255,0.65)]"
                      : "border-edge bg-white/90 shadow-[0_0_0_1px_rgba(62,110,185,0.08),0_12px_30px_-22px_rgba(62,110,185,0.35)]"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`media-zoom-shell inline-flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg border ${
                        isDark ? "border-slate-500 bg-slate-800/90" : "border-edge bg-panel2"
                      }`}
                      title={node.iconLabel}
                    >
                      {node.iconSrc ? (
                        <Image src={node.iconSrc} alt={node.iconLabel} width={20} height={20} className="media-zoom h-5 w-5 object-contain" />
                      ) : (
                        <span className={`text-sm ${isDark ? "text-slate-100" : "text-text"}`}>{node.fallbackIcon ?? "•"}</span>
                      )}
                    </span>
                    <p className={`text-xs font-semibold ${isDark ? "text-slate-100" : "text-text"}`}>{node.title}</p>
                  </div>
                </div>
                <p className={`mt-1 text-center text-[11px] uppercase tracking-[0.12em] ${isDark ? "text-slate-400" : "text-muted"}`}>{node.caption}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div key={`${activeFlow.id}-summary`} className="mt-6 grid gap-3 md:grid-cols-3 animate-[workflow-swap_260ms_ease]">
        <article className={`rounded-2xl border p-4 ${isDark ? "border-slate-600 bg-slate-900/75" : "border-edge bg-panel2"}`}>
          <p className={`text-[10px] uppercase tracking-[0.2em] ${isDark ? "text-slate-400" : "text-muted"}`}>{t.trigger}</p>
          <p className={`mt-2 text-sm ${isDark ? "text-slate-100" : "text-text"}`}>{activeFlow.trigger}</p>
        </article>

        <article className={`rounded-2xl border p-4 ${isDark ? "border-slate-600 bg-slate-900/75" : "border-edge bg-panel2"}`}>
          <p className={`text-[10px] uppercase tracking-[0.2em] ${isDark ? "text-slate-400" : "text-muted"}`}>{t.steps}</p>
          <ul className={`mt-2 space-y-1 text-sm ${isDark ? "text-slate-300" : "text-muted"}`}>
            {activeFlow.steps.map((step) => (
              <li key={step}>- {step}</li>
            ))}
          </ul>
        </article>

        <article className={`rounded-2xl border p-4 ${isDark ? "border-slate-600 bg-slate-900/75" : "border-edge bg-panel2"}`}>
          <p className={`text-[10px] uppercase tracking-[0.2em] ${isDark ? "text-slate-400" : "text-muted"}`}>{t.outcome}</p>
          <p className={`mt-2 text-sm ${isDark ? "text-slate-100" : "text-text"}`}>{activeFlow.outcome}</p>
        </article>
      </div>
    </section>
  );
}
