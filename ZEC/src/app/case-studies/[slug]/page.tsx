"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FAQAccordion } from "@/app/components/FAQAccordion";
import { WorkflowInteractiveImage } from "@/app/components/WorkflowInteractiveImage";
import { CASE_STUDY_DETAILS, type CaseStudyDetail } from "@/lib/caseStudyDetails";
import { useLang } from "@/lib/lang";
import { SITE_CONTENT } from "@/lib/siteContent";
import { decodeMojibakeDeep } from "@/lib/text";
import { useTheme } from "@/lib/theme";
import { useLocalizedMeta } from "@/lib/useLocalizedMeta";
import { getThemedWorkflowImage } from "@/lib/workflowImageVariant";

const TOOL_ICON_MAP: Record<string, string> = {
  n8n: "/logos/n8n.svg",
  hubspot: "/logos/hubspot.svg",
  airtable: "/logos/airtable.svg",
  telegram: "/logos/telegram.svg",
  zapier: "/logos/zapier.svg",
  gmail: "/logos/gmail.svg",
  openai: "/logos/openai.svg",
  slack: "/logos/slack.svg",
  webhooks: "/logos/webhooks.svg",
  "google sheets": "/logos/google-sheets.svg",
  "google workspace": "/logos/google.svg",
  whatsapp: "/logos/whatsapp.svg",
  notion: "/logos/notion.svg",
  calendly: "/logos/calendly.svg",
};

const UI_BY_LANG = decodeMojibakeDeep({
  en: {
    before: "Before",
    after: "After",
    sectionProblem: "Section 1 - Client Problem",
    sectionContext: "Section 2-3 - Context and Goal",
    sectionArchitecture: "Section 4-5 - Workflow and Architecture",
    sectionSteps: "Section 6 - Step by Step Workflow",
    sectionBreakdown: "Section 7 - n8n Breakdown",
    sectionResults: "Section 8 - Results and Metrics",
    sectionChallenges: "Section 9 - Implementation Challenges",
    sectionLearned: "Section 10 - Lessons Learned",
    sectionFaq: "Section 11 - FAQ",
    problemScenario: "Problem Scenario",
    businessContext: "Business Context",
    automationGoal: "Automation Goal",
    workflowOverview: "Automation Workflow Overview",
    stepPipeline: "Step-by-Step Pipeline",
    n8nExplanation: "n8n Workflow Explanation",
    toolsTitle: "Tools and Integrations",
    toolsSubtitle: "Integration icons and tooling used in this implementation.",
    resultsTitle: "Before vs After Impact",
    metric: "Metric",
    impact: "Impact",
    challengesTitle: "Challenges and Solutions",
    learnedTitle: "Key Learnings",
    faqTitle: "Frequently Asked Questions",
    ctaTitle: "Want a Similar Automation System?",
    ctaBody: "Share your workflow stack and current bottlenecks. We will design a practical automation architecture with implementation priorities.",
    ctaPrimary: "Book Free Automation Audit",
    ctaSecondary: "Back to Case Studies",
    step: "Step",
    fallbackSubtitle: "Automation outcome summary with measurable operational impact.",
    fallbackContextPrefix: "Industry context",
  },
  ru: {
    before: "До",
    after: "После",
    sectionProblem: "Раздел 1 - Проблема клиента",
    sectionContext: "Раздел 2-3 - Контекст и цель",
    sectionArchitecture: "Раздел 4-5 - Workflow и архитектура",
    sectionSteps: "Раздел 6 - Пошаговый workflow",
    sectionBreakdown: "Раздел 7 - Разбор n8n",
    sectionResults: "Раздел 8 - Результаты и метрики",
    sectionChallenges: "Раздел 9 - Сложности внедрения",
    sectionLearned: "Раздел 10 - Выводы",
    sectionFaq: "Раздел 11 - FAQ",
    problemScenario: "Сценарий проблемы",
    businessContext: "Бизнес-контекст",
    automationGoal: "Цель автоматизации",
    workflowOverview: "Обзор automation-workflow",
    stepPipeline: "Пошаговый pipeline",
    n8nExplanation: "Объяснение n8n workflow",
    toolsTitle: "Инструменты и интеграции",
    toolsSubtitle: "Иконки интеграций и инструменты, использованные в этом внедрении.",
    resultsTitle: "Влияние: до и после",
    metric: "Метрика",
    impact: "Эффект",
    challengesTitle: "Сложности и решения",
    learnedTitle: "Ключевые выводы",
    faqTitle: "Частые вопросы",
    ctaTitle: "Нужна похожая automation-система?",
    ctaBody: "Опишите ваш стек и узкие места. Мы предложим практичную архитектуру автоматизации и приоритеты внедрения.",
    ctaPrimary: "Записаться на аудит",
    ctaSecondary: "Назад к кейсам",
    step: "Шаг",
    fallbackSubtitle: "Краткое описание результата автоматизации с измеримым операционным эффектом.",
    fallbackContextPrefix: "Контекст отрасли",
  },
  ar: {
    before: "قبل",
    after: "بعد",
    sectionProblem: "القسم 1 - مشكلة العميل",
    sectionContext: "القسم 2-3 - السياق والهدف",
    sectionArchitecture: "القسم 4-5 - المسار والمعمارية",
    sectionSteps: "القسم 6 - المسار خطوة بخطوة",
    sectionBreakdown: "القسم 7 - شرح n8n",
    sectionResults: "القسم 8 - النتائج والمؤشرات",
    sectionChallenges: "القسم 9 - تحديات التنفيذ",
    sectionLearned: "القسم 10 - الدروس المستفادة",
    sectionFaq: "القسم 11 - الأسئلة الشائعة",
    problemScenario: "سيناريو المشكلة",
    businessContext: "السياق التجاري",
    automationGoal: "هدف الأتمتة",
    workflowOverview: "نظرة عامة على مسار الأتمتة",
    stepPipeline: "سير العمل خطوة بخطوة",
    n8nExplanation: "شرح مسار n8n",
    toolsTitle: "الأدوات والتكاملات",
    toolsSubtitle: "أيقونات التكامل والأدوات المستخدمة في هذا التنفيذ.",
    resultsTitle: "الأثر قبل وبعد",
    metric: "المؤشر",
    impact: "الأثر",
    challengesTitle: "التحديات والحلول",
    learnedTitle: "أهم الدروس",
    faqTitle: "الأسئلة الشائعة",
    ctaTitle: "هل تريد نظام أتمتة مشابه؟",
    ctaBody: "شاركنا أدواتك الحالية والتحديات الأساسية، وسنصمم معمارية أتمتة عملية مع أولويات التنفيذ.",
    ctaPrimary: "احجز تدقيقا مجانيا",
    ctaSecondary: "الرجوع إلى دراسات الحالة",
    step: "الخطوة",
    fallbackSubtitle: "ملخص نتيجة الأتمتة مع أثر تشغيلي قابل للقياس.",
    fallbackContextPrefix: "سياق القطاع",
  },
} as const);

const FALLBACK_DETAIL_BY_LANG = decodeMojibakeDeep({
  en: {
    architectureSummary: "Event-driven n8n orchestration with validation, transformation, and notifications.",
    architectureFlow: ["Trigger", "Validation", "Transform", "Action", "Monitoring"],
    stepByStepWorkflow: [
      "Capture inbound event and normalize payload.",
      "Validate required fields and branch on quality checks.",
      "Run core business logic and data mapping.",
      "Trigger downstream updates and notifications.",
      "Log execution result for operational visibility.",
    ],
    n8nWorkflowBreakdown: [
      { node: "Trigger Node", purpose: "Starts the automation flow on new events." },
      { node: "IF Node", purpose: "Validates payload and routes invalid data." },
      { node: "Function Node", purpose: "Applies transformation and business rules." },
      { node: "Action Nodes", purpose: "Writes to connected tools and sends notifications." },
      { node: "Logging Node", purpose: "Stores execution outcomes for monitoring." },
    ],
    diagramSuggestion: "Recommended diagram: Trigger -> Validation -> Transformation -> Action -> Monitoring.",
    implementationChallenges: [
      { challenge: "Data quality inconsistencies", solution: "Introduced strict validation and normalized field mapping." },
      { challenge: "Operational handoff gaps", solution: "Added routing and role-based notifications with fallback logic." },
    ],
    lessonsLearned: ["Validation should be first-class in all automation pipelines.", "Operational transparency increases adoption and trust."],
    faq: [
      {
        question: "Can this workflow be expanded later?",
        answer: "Yes. The architecture is modular and can be extended with additional branches and integrations.",
      },
      {
        question: "How long does implementation usually take?",
        answer: "Most implementations are delivered in 1-3 weeks depending on integrations and approval cycles.",
      },
    ],
  },
  ru: {
    architectureSummary: "Событийная оркестрация в n8n с проверкой данных, преобразованием и уведомлениями.",
    architectureFlow: ["Триггер", "Проверка", "Преобразование", "Действие", "Мониторинг"],
    stepByStepWorkflow: [
      "Зафиксировать входящее событие и нормализовать данные.",
      "Проверить обязательные поля и отфильтровать ошибки.",
      "Применить бизнес-логику и правила маршрутизации.",
      "Обновить связанные системы и отправить уведомления.",
      "Записать результат выполнения для операционного контроля.",
    ],
    n8nWorkflowBreakdown: [
      { node: "Trigger Node", purpose: "Запускает автоматизацию при новом событии." },
      { node: "IF Node", purpose: "Проверяет данные и направляет некорректные записи." },
      { node: "Function Node", purpose: "Применяет правила и преобразование полей." },
      { node: "Action Nodes", purpose: "Обновляет интеграции и отправляет уведомления." },
      { node: "Logging Node", purpose: "Сохраняет историю выполнения для мониторинга." },
    ],
    diagramSuggestion: "Рекомендуемая схема: Триггер -> Проверка -> Преобразование -> Действие -> Мониторинг.",
    implementationChallenges: [
      { challenge: "Нестабильное качество входящих данных", solution: "Добавлена строгая валидация и единые правила нормализации." },
      { challenge: "Разрывы в операционной передаче задачи", solution: "Внедрены маршрутизация по ролям и резервная логика уведомлений." },
    ],
    lessonsLearned: ["Качество данных нужно проверять на первом шаге workflow.", "Прозрачность операций повышает доверие и скорость команды."],
    faq: [
      {
        question: "Можно ли расширить workflow позже?",
        answer: "Да, архитектура модульная и поддерживает добавление новых веток и интеграций.",
      },
      {
        question: "Сколько обычно занимает внедрение?",
        answer: "Базовое внедрение обычно занимает 1-3 недели в зависимости от количества интеграций.",
      },
    ],
  },
  ar: {
    architectureSummary: "تنسيق قائم على الأحداث في n8n مع تحقق من البيانات وتحويل وتنبيهات تشغيلية.",
    architectureFlow: ["المشغل", "التحقق", "التحويل", "التنفيذ", "المراقبة"],
    stepByStepWorkflow: [
      "استقبال الحدث الوارد وتوحيد تنسيق البيانات.",
      "التحقق من الحقول المطلوبة ومعالجة السجلات غير الصحيحة.",
      "تطبيق منطق الأعمال وقواعد التوجيه.",
      "تحديث الأنظمة المرتبطة وإرسال التنبيهات.",
      "تسجيل نتيجة التنفيذ للمتابعة التشغيلية.",
    ],
    n8nWorkflowBreakdown: [
      { node: "Trigger Node", purpose: "يبدأ التشغيل تلقائيا عند وصول حدث جديد." },
      { node: "IF Node", purpose: "يتحقق من صحة البيانات ويوجه الحالات غير المكتملة." },
      { node: "Function Node", purpose: "ينفذ قواعد العمل وتحويل الحقول." },
      { node: "Action Nodes", purpose: "يحدث الأنظمة المتكاملة ويرسل الإشعارات." },
      { node: "Logging Node", purpose: "يحفظ سجل التنفيذ لأغراض المراقبة." },
    ],
    diagramSuggestion: "المخطط المقترح: مشغل -> تحقق -> تحويل -> تنفيذ -> مراقبة.",
    implementationChallenges: [
      { challenge: "تباين جودة البيانات الواردة", solution: "تم تطبيق تحقق صارم وقواعد توحيد واضحة." },
      { challenge: "فجوات في تسليم العمل بين الفرق", solution: "تمت إضافة توجيه حسب الأدوار مع مسارات بديلة للتنبيه." },
    ],
    lessonsLearned: ["التحقق من البيانات يجب أن يكون أول خطوة في أي مسار.", "الشفافية التشغيلية ترفع الثقة وسرعة التنفيذ."],
    faq: [
      {
        question: "هل يمكن توسيع المسار لاحقا؟",
        answer: "نعم، البنية مرنة وتدعم إضافة تفرعات وتكاملات جديدة.",
      },
      {
        question: "كم يستغرق التنفيذ عادة؟",
        answer: "غالبا ما يستغرق التنفيذ الأساسي من أسبوع إلى ثلاثة أسابيع حسب التعقيد.",
      },
    ],
  },
} as const);

const resolveToolIcon = (tool: string) => {
  const normalized = tool.trim().toLowerCase();
  return TOOL_ICON_MAP[normalized];
};

const buildFallbackDetail = (
  lang: keyof typeof UI_BY_LANG,
  ui: (typeof UI_BY_LANG)[keyof typeof UI_BY_LANG],
  industry: string,
  problem: string,
  approach: string,
  outcomes: string[],
  preferredDiagramImage?: string,
): CaseStudyDetail => {
  const localized = FALLBACK_DETAIL_BY_LANG[lang];
  return {
    subtitle: outcomes[0] ?? ui.fallbackSubtitle,
    clientProblem: [problem],
    businessContext: `${ui.fallbackContextPrefix}: ${industry}.`,
    automationGoal: approach,
    workflowOverview: approach,
    architectureSummary: localized.architectureSummary,
    architectureFlow: [...localized.architectureFlow],
    stepByStepWorkflow: [...localized.stepByStepWorkflow],
    n8nWorkflowBreakdown: localized.n8nWorkflowBreakdown.map((node) => ({ ...node })),
    diagramSuggestion: localized.diagramSuggestion,
    diagramImage: preferredDiagramImage ?? "/images/workflow-diagram-1.svg",
    implementationChallenges: localized.implementationChallenges.map((item) => ({ ...item })),
    lessonsLearned: [...localized.lessonsLearned],
    faq: localized.faq.map((item) => ({ ...item })),
  };
};

export default function CaseStudyDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { lang } = useLang();
  const ui = UI_BY_LANG[lang];
  const { theme } = useTheme();
  const t = SITE_CONTENT[lang];
  const item = t.caseStudies.find((caseStudy) => caseStudy.slug === slug) ?? t.caseStudies[0];
  const baseDetail = CASE_STUDY_DETAILS[item.slug];
  const fallbackDetail = buildFallbackDetail(
    lang,
    ui,
    item.industry,
    item.problem,
    item.approach,
    item.outcomes,
    baseDetail?.diagramImage,
  );
  const detail = lang === "en" ? baseDetail ?? fallbackDetail : fallbackDetail;
  const localizedSubtitle = item.outcomes[0] ?? detail.subtitle;
  const localizedWorkflowOverview = item.approach ?? detail.workflowOverview;

  useLocalizedMeta(`${item.title} | ${t.meta.siteTitle}`, localizedSubtitle);

  const sectionedSteps = detail.stepByStepWorkflow.map((step, index) => ({ id: index + 1, step }));
  const diagramImage = getThemedWorkflowImage(detail.diagramImage, theme);

  return (
    <div className="mx-auto flex w-full max-w-[1240px] flex-col gap-8 pb-16">
      <section className="relative overflow-hidden rounded-3xl border border-edge bg-panel p-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,hsl(var(--accent)/0.15),transparent_42%),radial-gradient(circle_at_90%_8%,hsl(var(--accent)/0.14),transparent_40%)]" />
        <div className="relative">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-edge bg-panel2 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-muted">{item.category}</span>
            {item.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-edge px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-muted">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="mt-4 font-display text-4xl text-text md:text-5xl">{item.title}</h1>
          <p className="mt-3 max-w-4xl text-base text-text">{localizedSubtitle}</p>
          <p className="mt-3 max-w-4xl text-sm text-muted">{localizedWorkflowOverview}</p>

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {item.metrics.slice(0, 3).map((metric) => (
              <article key={`${item.slug}-${metric.label}`} className="rounded-2xl border border-edge bg-panel2 p-4">
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted">{metric.label}</p>
                <p className="mt-2 text-xs text-muted">{ui.before}: {metric.before}</p>
                <p className="mt-1 text-xs text-muted">{ui.after}: {metric.after}</p>
                <p className="mt-2 text-sm font-semibold text-brand">{metric.impact}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        <article className="rounded-3xl border border-edge bg-panel p-6">
          <p className="text-[10px] uppercase tracking-[0.25em] text-muted">{ui.sectionProblem}</p>
          <h2 className="mt-2 font-display text-2xl text-text">{ui.problemScenario}</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            {detail.clientProblem.map((point) => (
              <li key={point}>- {point}</li>
            ))}
          </ul>
        </article>

        <article className="rounded-3xl border border-edge bg-panel p-6">
          <p className="text-[10px] uppercase tracking-[0.25em] text-muted">{ui.sectionContext}</p>
          <h2 className="mt-2 font-display text-2xl text-text">{ui.businessContext}</h2>
          <p className="mt-3 text-sm text-muted">{detail.businessContext}</p>
          <h3 className="mt-4 font-display text-xl text-text">{ui.automationGoal}</h3>
          <p className="mt-2 text-sm text-muted">{detail.automationGoal}</p>
        </article>
      </section>

      <section className="rounded-3xl border border-edge bg-panel p-6">
        <p className="text-[10px] uppercase tracking-[0.25em] text-muted">{ui.sectionArchitecture}</p>
        <h2 className="mt-2 font-display text-2xl text-text">{ui.workflowOverview}</h2>
        <p className="mt-3 text-sm text-muted">{detail.architectureSummary}</p>

        <div className="mt-5 overflow-x-auto pb-2">
          <div className="flex min-w-[760px] items-center gap-3">
            {detail.architectureFlow.map((node, index) => (
              <div key={`${item.slug}-${node}`} className="flex items-center gap-3">
                <div className="rounded-xl border border-edge bg-panel2 px-4 py-3 text-xs font-medium text-text">{node}</div>
                {index < detail.architectureFlow.length - 1 && <span className="flow-connector w-14" aria-hidden="true" />}
              </div>
            ))}
          </div>
        </div>

        <p className="mt-4 text-sm text-muted">{detail.diagramSuggestion}</p>
        <div className="mt-4 overflow-hidden rounded-2xl border border-edge bg-panel2">
          <WorkflowInteractiveImage src={diagramImage} alt={`${item.title} workflow diagram`} width={1400} height={720} />
        </div>
      </section>

      <section className="rounded-3xl border border-edge bg-panel p-6">
        <p className="text-[10px] uppercase tracking-[0.25em] text-muted">{ui.sectionSteps}</p>
        <h2 className="mt-2 font-display text-2xl text-text">{ui.stepPipeline}</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {sectionedSteps.map((entry) => (
            <article key={`${item.slug}-step-${entry.id}`} className="rounded-2xl border border-edge bg-panel2 p-4">
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted">{ui.step} {entry.id}</p>
              <p className="mt-2 text-sm text-text">{entry.step}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <article className="rounded-3xl border border-edge bg-panel p-6">
          <p className="text-[10px] uppercase tracking-[0.25em] text-muted">{ui.sectionBreakdown}</p>
          <h2 className="mt-2 font-display text-2xl text-text">{ui.n8nExplanation}</h2>
          <div className="mt-4 space-y-3">
            {detail.n8nWorkflowBreakdown.map((node) => (
              <div key={`${item.slug}-${node.node}`} className="rounded-2xl border border-edge bg-panel2 p-4">
                <p className="text-sm font-semibold text-text">{node.node}</p>
                <p className="mt-1 text-sm text-muted">{node.purpose}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-3xl border border-edge bg-panel p-6">
          <h3 className="font-display text-xl text-text">{ui.toolsTitle}</h3>
          <p className="mt-2 text-sm text-muted">{ui.toolsSubtitle}</p>
          <div className="mt-4 grid gap-2">
            {item.tools.map((tool) => {
              const icon = resolveToolIcon(tool);
              return (
                <div key={`${item.slug}-${tool}`} className="flex items-center gap-3 rounded-xl border border-edge bg-panel2 px-3 py-2 text-sm text-text">
                  {icon ? (
                    <Image src={icon} alt={`${tool} icon`} width={18} height={18} className="h-[18px] w-[18px]" />
                  ) : (
                    <span className="inline-flex h-[18px] w-[18px] items-center justify-center rounded-full border border-edge text-[10px] text-muted">
                      {tool.slice(0, 1).toUpperCase()}
                    </span>
                  )}
                  <span>{tool}</span>
                </div>
              );
            })}
          </div>
        </article>
      </section>

      <section className="rounded-3xl border border-edge bg-panel p-6">
        <p className="text-[10px] uppercase tracking-[0.25em] text-muted">{ui.sectionResults}</p>
        <h2 className="mt-2 font-display text-2xl text-text">{ui.resultsTitle}</h2>
        <div className="mt-4 overflow-hidden rounded-2xl border border-edge">
          <table className="w-full min-w-[680px] text-left text-sm">
            <thead className="border-b border-edge bg-panel2 text-[11px] uppercase tracking-[0.2em] text-muted">
              <tr>
                <th className="px-4 py-3">{ui.metric}</th>
                <th className="px-4 py-3">{ui.before}</th>
                <th className="px-4 py-3">{ui.after}</th>
                <th className="px-4 py-3">{ui.impact}</th>
              </tr>
            </thead>
            <tbody>
              {item.metrics.map((metric) => (
                <tr key={`${item.slug}-table-${metric.label}`} className="border-b border-edge/70 last:border-0">
                  <td className="px-4 py-3 text-text">{metric.label}</td>
                  <td className="px-4 py-3 text-muted">{metric.before}</td>
                  <td className="px-4 py-3 text-muted">{metric.after}</td>
                  <td className="px-4 py-3 font-semibold text-brand">{metric.impact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        <article className="rounded-3xl border border-edge bg-panel p-6">
          <p className="text-[10px] uppercase tracking-[0.25em] text-muted">{ui.sectionChallenges}</p>
          <h2 className="mt-2 font-display text-2xl text-text">{ui.challengesTitle}</h2>
          <div className="mt-4 space-y-3">
            {detail.implementationChallenges.map((entry) => (
              <details key={`${item.slug}-${entry.challenge}`} className="group overflow-hidden rounded-2xl border border-edge bg-panel2">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 [&::-webkit-details-marker]:hidden">
                  <span className="text-sm font-semibold text-text">{entry.challenge}</span>
                  <span aria-hidden="true" className="text-lg text-muted transition-transform duration-200 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="px-4 pb-4 text-sm text-muted">{entry.solution}</p>
              </details>
            ))}
          </div>
        </article>

        <article className="rounded-3xl border border-edge bg-panel p-6">
          <p className="text-[10px] uppercase tracking-[0.25em] text-muted">{ui.sectionLearned}</p>
          <h2 className="mt-2 font-display text-2xl text-text">{ui.learnedTitle}</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            {detail.lessonsLearned.map((lesson) => (
              <li key={`${item.slug}-${lesson}`}>- {lesson}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="rounded-3xl border border-edge bg-panel p-6">
        <p className="text-[10px] uppercase tracking-[0.25em] text-muted">{ui.sectionFaq}</p>
        <h2 className="mt-2 font-display text-2xl text-text">{ui.faqTitle}</h2>
        <div className="mt-4">
          <FAQAccordion items={detail.faq} />
        </div>
      </section>

      <section className="rounded-3xl border border-edge bg-panel p-6 md:p-8">
        <h2 className="font-display text-3xl text-text">{ui.ctaTitle}</h2>
        <p className="mt-3 max-w-3xl text-sm text-muted">{ui.ctaBody}</p>
        <div className="mt-5 flex flex-wrap gap-3">
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

