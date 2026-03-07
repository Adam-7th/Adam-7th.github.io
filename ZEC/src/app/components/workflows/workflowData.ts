import type { Lang } from "@/lib/i18n";
import type { WorkflowCategory } from "@/lib/siteContent";

export const WORKFLOW_CATEGORY_ORDER = ["lead_sales", "support", "operations", "marketing", "analytics"] as const;
export type WorkflowCategorySlug = (typeof WORKFLOW_CATEGORY_ORDER)[number];

export const DEFAULT_WORKFLOW_CATEGORY: WorkflowCategorySlug = "lead_sales";

export const SLUG_TO_CONTENT_CATEGORY: Record<WorkflowCategorySlug, WorkflowCategory> = {
  lead_sales: "leadSales",
  support: "support",
  operations: "operations",
  marketing: "marketing",
  analytics: "analytics",
};

const CONTENT_TO_SLUG: Record<WorkflowCategory, WorkflowCategorySlug> = {
  leadSales: "lead_sales",
  support: "support",
  operations: "operations",
  marketing: "marketing",
  analytics: "analytics",
};

const WORKFLOW_ID_TO_CATEGORY: Record<string, WorkflowCategorySlug> = {
  "01": "lead_sales",
  "02": "support",
  "03": "operations",
  "04": "marketing",
  "05": "analytics",
};

export type WorkflowCanvasNode = {
  id: string;
  title: string;
  caption: string;
  iconLabel: string;
  iconSrc?: string;
  fallbackIcon?: string;
  x: number;
  y: number;
};

export type WorkflowCanvasEdge = {
  from: string;
  to: string;
  curve?: number;
};

export type WorkflowVariant = {
  category: WorkflowCategorySlug;
  contentCategory: WorkflowCategory;
  workflowId: string;
  title: string;
  subtitle: string;
  trigger: string;
  steps: string[];
  outcome: string;
  tools: string[];
  nodes: WorkflowCanvasNode[];
  edges: WorkflowCanvasEdge[];
  compactNodeIds?: string[];
};

const text = (lang: Lang, en: string, ru: string, ar: string) => {
  if (lang === "ru") return ru;
  if (lang === "ar") return ar;
  return en;
};

export function normalizeWorkflowCategory(cat: string | null | undefined): WorkflowCategorySlug {
  if (!cat) return DEFAULT_WORKFLOW_CATEGORY;

  const lower = cat.toLowerCase();

  if (WORKFLOW_CATEGORY_ORDER.includes(lower as WorkflowCategorySlug)) {
    return lower as WorkflowCategorySlug;
  }

  if (lower === "leadsales" || lower === "lead_sales" || lower === "lead-sales" || lower === "lead") return "lead_sales";
  if (lower === "ops" || lower === "operation") return "operations";

  if (cat in CONTENT_TO_SLUG) {
    return CONTENT_TO_SLUG[cat as WorkflowCategory];
  }

  return DEFAULT_WORKFLOW_CATEGORY;
}

export function resolveWorkflowCategoryFromParams(
  cat: string | null | undefined,
  workflowId: string | null | undefined,
): WorkflowCategorySlug {
  if (cat) return normalizeWorkflowCategory(cat);
  if (workflowId && WORKFLOW_ID_TO_CATEGORY[workflowId]) return WORKFLOW_ID_TO_CATEGORY[workflowId];
  return DEFAULT_WORKFLOW_CATEGORY;
}

export function getWorkflowVariants(lang: Lang): Record<WorkflowCategorySlug, WorkflowVariant> {
  const triggerLabel = text(lang, "TRIGGER", "ТРИГГЕР", "المشغل");
  const sourceLabel = text(lang, "SOURCE", "ИСТОЧНИК", "المصدر");
  const transformLabel = text(lang, "TRANSFORM", "ТРАНСФОРМ", "التحويل");
  const destinationLabel = text(lang, "DESTINATION", "НАЗНАЧЕНИЕ", "الوجهة");

  return {
    lead_sales: {
      category: "lead_sales",
      contentCategory: "leadSales",
      workflowId: "01",
      title: text(lang, "Lead capture -> CRM -> Telegram", "Лид -> CRM -> Telegram", "التقاط عميل -> CRM -> Telegram"),
      subtitle: text(
        lang,
        "Never miss a lead. Instant routing to your team.",
        "Ни один лид не теряется. Мгновенная маршрутизация в команду.",
        "لا تفقد أي عميل محتمل. توجيه فوري إلى فريقك.",
      ),
      trigger: text(
        lang,
        "Website form or chat lead submitted",
        "Лид отправлен через форму сайта или чат",
        "تم إرسال عميل محتمل من نموذج الموقع أو الدردشة",
      ),
      steps: [
        text(lang, "Validate name + email", "Проверить имя и email", "التحقق من الاسم والبريد الإلكتروني"),
        text(lang, "Store lead in Sheets/Airtable", "Сохранить лид в Sheets/Airtable", "حفظ العميل في Sheets/Airtable"),
        text(lang, "Update CRM (HubSpot)", "Обновить CRM (HubSpot)", "تحديث CRM (HubSpot)"),
        text(lang, "Notify agency on Telegram instantly", "Мгновенно уведомить команду в Telegram", "إرسال تنبيه فوري إلى Telegram"),
      ],
      outcome: text(lang, "Faster response. No leads lost.", "Быстрее реакция. Лиды не теряются.", "استجابة أسرع. لا فقدان للعملاء المحتملين."),
      tools: ["Webhooks", "Airtable", "Google Sheets", "HubSpot", "Telegram", "n8n"],
      compactNodeIds: ["lead", "validate", "store", "hubspot", "telegram", "email"],
      nodes: [
        {
          id: "lead",
          title: text(lang, "Webhook (Lead)", "Webhook (Лид)", "Webhook (عميل)"),
          caption: triggerLabel,
          iconLabel: "Webhooks",
          iconSrc: "/logos/webhooks.svg",
          x: 9,
          y: 54,
        },
        {
          id: "validate",
          title: text(lang, "Validate (Name + Email)", "Проверка (Имя + Email)", "تحقق (الاسم + البريد)"),
          caption: transformLabel,
          iconLabel: "Validation",
          fallbackIcon: "✓",
          x: 25,
          y: 54,
        },
        {
          id: "enrich",
          title: text(lang, "Enrich lead (optional)", "Обогащение лида", "إثراء بيانات العميل"),
          caption: sourceLabel,
          iconLabel: "AI",
          fallbackIcon: "AI",
          x: 41,
          y: 36,
        },
        {
          id: "store",
          title: text(lang, "Store (Sheets/Airtable)", "Сохранение (Sheets/Airtable)", "حفظ (Sheets/Airtable)"),
          caption: destinationLabel,
          iconLabel: "Airtable",
          iconSrc: "/logos/airtable.svg",
          x: 58,
          y: 36,
        },
        {
          id: "hubspot",
          title: text(lang, "CRM (HubSpot)", "CRM (HubSpot)", "CRM (HubSpot)"),
          caption: destinationLabel,
          iconLabel: "HubSpot",
          iconSrc: "/logos/hubspot.svg",
          x: 58,
          y: 69,
        },
        {
          id: "telegram",
          title: text(lang, "Notify (Telegram)", "Уведомление (Telegram)", "تنبيه (Telegram)"),
          caption: destinationLabel,
          iconLabel: "Telegram",
          iconSrc: "/logos/telegram.svg",
          x: 79,
          y: 46,
        },
        {
          id: "email",
          title: text(lang, "Email confirmation", "Email подтверждение", "تأكيد عبر البريد"),
          caption: destinationLabel,
          iconLabel: "Gmail",
          iconSrc: "/logos/gmail.svg",
          x: 79,
          y: 74,
        },
      ],
      edges: [
        { from: "lead", to: "validate" },
        { from: "validate", to: "enrich", curve: -20 },
        { from: "enrich", to: "store" },
        { from: "validate", to: "hubspot", curve: 24 },
        { from: "store", to: "telegram", curve: 16 },
        { from: "hubspot", to: "telegram", curve: -16 },
        { from: "hubspot", to: "email", curve: 16 },
      ],
    },
    support: {
      category: "support",
      contentCategory: "support",
      workflowId: "02",
      title: text(
        lang,
        "Support inbox -> AI draft -> Human approval -> Reply",
        "Поддержка -> AI черновик -> Подтверждение -> Ответ",
        "صندوق الدعم -> مسودة AI -> موافقة بشرية -> رد",
      ),
      subtitle: text(lang, "Faster support with human control.", "Поддержка быстрее, но с контролем человека.", "دعم أسرع مع تحكم بشري كامل."),
      trigger: text(lang, "New support email arrives", "Новое письмо поддержки в Gmail", "وصول رسالة دعم جديدة إلى Gmail"),
      steps: [
        text(lang, "Classify request + priority", "Определить тип запроса и приоритет", "تحديد نوع الطلب والأولوية"),
        text(lang, "Draft reply with AI", "Сформировать черновик ответа через AI", "إعداد مسودة رد عبر AI"),
        text(lang, "Human approves/edits", "Сотрудник подтверждает/редактирует", "مراجعة بشرية وتعديل"),
        text(lang, "Send response", "Отправить финальный ответ", "إرسال الرد النهائي"),
      ],
      outcome: text(lang, "Replies faster, stays safe.", "Быстрые ответы и контроль качества.", "ردود أسرع مع الحفاظ على الجودة."),
      tools: ["Gmail", "OpenAI", "Airtable", "Slack", "Telegram", "Webhooks", "n8n"],
      nodes: [
        { id: "mail", title: text(lang, "New support email (Gmail)", "Новое письмо в Gmail", "رسالة دعم جديدة في Gmail"), caption: triggerLabel, iconLabel: "Gmail", iconSrc: "/logos/gmail.svg", x: 10, y: 52 },
        { id: "intent", title: text(lang, "Detect intent + priority", "Определить intent + priority", "تحليل النية + الأولوية"), caption: sourceLabel, iconLabel: "Intent", fallbackIcon: "⌁", x: 28, y: 52 },
        { id: "ai", title: text(lang, "AI draft reply (OpenAI)", "AI черновик ответа", "إنشاء مسودة AI"), caption: transformLabel, iconLabel: "OpenAI", iconSrc: "/logos/openai.svg", x: 46, y: 52 },
        { id: "ticket", title: text(lang, "Create ticket record", "Создать ticket запись", "إنشاء سجل تذكرة"), caption: destinationLabel, iconLabel: "Airtable", iconSrc: "/logos/airtable.svg", x: 64, y: 35 },
        { id: "approval", title: text(lang, "Send for approval in Slack/Telegram", "Согласование в Slack/Telegram", "إرسال للموافقة في Slack/Telegram"), caption: destinationLabel, iconLabel: "Slack", iconSrc: "/logos/slack.svg", x: 64, y: 69 },
        { id: "reply", title: text(lang, "Send final email reply", "Отправить финальный ответ", "إرسال الرد النهائي"), caption: destinationLabel, iconLabel: "Gmail", iconSrc: "/logos/gmail.svg", x: 84, y: 52 },
      ],
      edges: [
        { from: "mail", to: "intent" },
        { from: "intent", to: "ai" },
        { from: "ai", to: "ticket", curve: -20 },
        { from: "ai", to: "approval", curve: 20 },
        { from: "ticket", to: "reply", curve: 20 },
        { from: "approval", to: "reply", curve: -20 },
      ],
    },
    operations: {
      category: "operations",
      contentCategory: "operations",
      workflowId: "03",
      title: text(lang, "Tasks -> Approvals -> Team updates", "Задачи -> Согласования -> Обновления", "المهام -> الموافقات -> تحديثات الفريق"),
      subtitle: text(lang, "Operations that run without manual chasing.", "Операции работают без ручной погони за статусами.", "عمليات تعمل بدون متابعة يدوية مستمرة."),
      trigger: text(lang, "Internal request created", "Создана внутренняя заявка", "تم إنشاء طلب داخلي جديد"),
      steps: [
        text(lang, "Capture request", "Получить внутренний запрос", "التقاط الطلب الداخلي"),
        text(lang, "Assign owner automatically", "Автоматически назначить владельца", "تعيين المالك تلقائيا"),
        text(lang, "Track status + reminders", "Обновлять статус и напоминания", "تتبع الحالة والتذكيرات"),
      ],
      outcome: text(lang, "More consistency, less manual work.", "Больше стабильности, меньше ручной работы.", "اتساق أعلى وجهد يدوي أقل."),
      tools: ["Webhooks", "Notion/Trello", "Google Sheets", "Slack/Telegram", "n8n"],
      nodes: [
        { id: "request", title: text(lang, "New request form submitted", "Новая форма запроса", "نموذج طلب جديد"), caption: triggerLabel, iconLabel: "Webhooks", iconSrc: "/logos/webhooks.svg", x: 10, y: 52 },
        { id: "validate", title: text(lang, "Validate fields", "Проверка полей", "التحقق من الحقول"), caption: sourceLabel, iconLabel: "Validation", fallbackIcon: "✓", x: 29, y: 52 },
        { id: "assign", title: text(lang, "Assign owner + deadline", "Назначить owner + deadline", "تعيين المالك + الموعد"), caption: transformLabel, iconLabel: "Assign", fallbackIcon: "⏱", x: 47, y: 52 },
        { id: "task", title: text(lang, "Create task in Notion/Trello", "Создать задачу в Notion/Trello", "إنشاء مهمة في Notion/Trello"), caption: destinationLabel, iconLabel: "Task", fallbackIcon: "N", x: 66, y: 35 },
        { id: "notify", title: text(lang, "Notify team in Slack/Telegram", "Уведомить команду", "تنبيه الفريق"), caption: destinationLabel, iconLabel: "Slack", iconSrc: "/logos/slack.svg", x: 66, y: 69 },
        { id: "status", title: text(lang, "Log status in Sheets", "Логировать статус в Sheets", "تسجيل الحالة في Sheets"), caption: destinationLabel, iconLabel: "Google Sheets", iconSrc: "/logos/google-sheets.svg", x: 85, y: 52 },
      ],
      edges: [
        { from: "request", to: "validate" },
        { from: "validate", to: "assign" },
        { from: "assign", to: "task", curve: -20 },
        { from: "assign", to: "notify", curve: 20 },
        { from: "task", to: "status", curve: 20 },
        { from: "notify", to: "status", curve: -20 },
      ],
    },
    marketing: {
      category: "marketing",
      contentCategory: "marketing",
      workflowId: "04",
      title: text(lang, "Content pipeline -> Publish -> Report", "Контент-пайплайн -> Публикация -> Отчет", "خط إنتاج المحتوى -> نشر -> تقرير"),
      subtitle: text(lang, "Turn content into a repeatable machine.", "Контент превращается в повторяемую систему.", "حوّل المحتوى إلى نظام قابل للتكرار."),
      trigger: text(lang, "Weekly schedule", "Еженедельный запуск по расписанию", "تشغيل أسبوعي مجدول"),
      steps: [
        text(lang, "Prepare content", "Подготовить контент", "تحضير المحتوى"),
        text(lang, "Approve", "Согласовать", "الموافقة"),
        text(lang, "Publish", "Опубликовать", "النشر"),
        text(lang, "Track links", "Зафиксировать ссылки", "تتبع الروابط"),
      ],
      outcome: text(lang, "Faster publishing, consistent output.", "Быстрее публикации и стабильный поток контента.", "نشر أسرع واستمرارية أفضل للمحتوى."),
      tools: ["Airtable", "Webhooks", "Slack/Telegram", "Google Sheets", "n8n", "AI (optional)"],
      nodes: [
        { id: "schedule", title: text(lang, "Schedule weekly", "Запуск по расписанию", "تشغيل حسب الجدول"), caption: triggerLabel, iconLabel: "Schedule", iconSrc: "/logos/schedule.svg", x: 10, y: 52 },
        { id: "ideas", title: text(lang, "Pull ideas from Airtable", "Взять идеи из Airtable", "سحب الأفكار من Airtable"), caption: sourceLabel, iconLabel: "Airtable", iconSrc: "/logos/airtable.svg", x: 28, y: 52 },
        { id: "draft", title: text(lang, "Draft post (AI optional)", "Черновик поста (AI)", "مسودة منشور (AI)"), caption: transformLabel, iconLabel: "AI", fallbackIcon: "AI", x: 46, y: 52 },
        { id: "approve", title: text(lang, "Send to approval", "Отправить на согласование", "إرسال للموافقة"), caption: destinationLabel, iconLabel: "Slack", iconSrc: "/logos/slack.svg", x: 64, y: 35 },
        { id: "publish", title: text(lang, "Publish to social tool", "Публикация в social tool", "نشر عبر أداة اجتماعية"), caption: destinationLabel, iconLabel: "Publish", fallbackIcon: "↗", x: 64, y: 69 },
        { id: "links", title: text(lang, "Save links to Sheets", "Сохранить ссылки в Sheets", "حفظ الروابط في Sheets"), caption: destinationLabel, iconLabel: "Google Sheets", iconSrc: "/logos/google-sheets.svg", x: 84, y: 52 },
      ],
      edges: [
        { from: "schedule", to: "ideas" },
        { from: "ideas", to: "draft" },
        { from: "draft", to: "approve", curve: -20 },
        { from: "draft", to: "publish", curve: 20 },
        { from: "approve", to: "links", curve: 20 },
        { from: "publish", to: "links", curve: -20 },
      ],
    },
    analytics: {
      category: "analytics",
      contentCategory: "analytics",
      workflowId: "05",
      title: text(lang, "Analytics -> Merge -> Sheets + Email report", "Аналитика -> Merge -> Sheets + Email отчет", "التحليلات -> Merge -> Sheets + تقرير بريد"),
      subtitle: text(lang, "One report, every week, automatically.", "Один отчет каждую неделю, полностью автоматически.", "تقرير واحد أسبوعيا بشكل تلقائي بالكامل."),
      trigger: text(lang, "Runs weekly", "Запуск каждую неделю", "يعمل أسبوعيا"),
      steps: [
        text(lang, "Pull analytics", "Собрать аналитику каналов", "سحب التحليلات"),
        text(lang, "Normalize metrics", "Нормализовать метрики", "توحيد المقاييس"),
        text(lang, "Merge into one dataset", "Объединить в единый dataset", "دمج البيانات في مجموعة واحدة"),
        text(lang, "Save to Sheets + email report", "Сохранить в Sheets + отправить отчет на email", "الحفظ في Sheets + إرسال تقرير بالبريد"),
      ],
      outcome: text(lang, "Clear reporting without manual work.", "Понятная отчетность без ручной сборки.", "تقارير واضحة بدون عمل يدوي."),
      tools: ["Schedule", "Facebook", "X/Twitter", "LinkedIn", "Google Sheets", "Gmail", "n8n"],
      nodes: [
        { id: "run", title: text(lang, "Run weekly", "Запуск раз в неделю", "تشغيل أسبوعي"), caption: triggerLabel, iconLabel: "Schedule", iconSrc: "/logos/schedule.svg", x: 7, y: 50 },
        { id: "fb", title: text(lang, "Get Facebook analytics", "Получить Facebook аналитику", "جلب تحليلات Facebook"), caption: sourceLabel, iconLabel: "Facebook", iconSrc: "/logos/facebook.svg", x: 24, y: 20 },
        { id: "x", title: text(lang, "Get Twitter/X analytics", "Получить Twitter/X аналитику", "جلب تحليلات Twitter/X"), caption: sourceLabel, iconLabel: "X/Twitter", iconSrc: "/logos/x.svg", x: 24, y: 50 },
        { id: "li", title: text(lang, "Get LinkedIn analytics", "Получить LinkedIn аналитику", "جلب تحليلات LinkedIn"), caption: sourceLabel, iconLabel: "LinkedIn", iconSrc: "/logos/linkedin.svg", x: 24, y: 80 },
        { id: "ffb", title: text(lang, "Format Facebook metrics", "Форматировать Facebook метрики", "تنسيق مقاييس Facebook"), caption: transformLabel, iconLabel: "Format", fallbackIcon: "✎", x: 42, y: 20 },
        { id: "fx", title: text(lang, "Format Twitter metrics", "Форматировать Twitter метрики", "تنسيق مقاييس Twitter"), caption: transformLabel, iconLabel: "Format", fallbackIcon: "✎", x: 42, y: 50 },
        { id: "fli", title: text(lang, "Format LinkedIn metrics", "Форматировать LinkedIn метрики", "تنسيق مقاييس LinkedIn"), caption: transformLabel, iconLabel: "Format", fallbackIcon: "✎", x: 42, y: 80 },
        { id: "merge", title: text(lang, "Merge (append)", "Merge (append)", "Merge (append)"), caption: destinationLabel, iconLabel: "Merge", fallbackIcon: "⎇", x: 61, y: 50 },
        { id: "sheets", title: text(lang, "Write data to a sheet", "Записать данные в Sheets", "كتابة البيانات إلى Sheets"), caption: destinationLabel, iconLabel: "Google Sheets", iconSrc: "/logos/google-sheets.svg", x: 82, y: 35 },
        { id: "gmail", title: text(lang, "Send a report", "Отправить отчет", "إرسال تقرير"), caption: destinationLabel, iconLabel: "Gmail", iconSrc: "/logos/gmail.svg", x: 82, y: 65 },
      ],
      edges: [
        { from: "run", to: "fb", curve: -42 },
        { from: "run", to: "x", curve: 0 },
        { from: "run", to: "li", curve: 42 },
        { from: "fb", to: "ffb" },
        { from: "x", to: "fx" },
        { from: "li", to: "fli" },
        { from: "ffb", to: "merge", curve: 24 },
        { from: "fx", to: "merge" },
        { from: "fli", to: "merge", curve: -24 },
        { from: "merge", to: "sheets", curve: -22 },
        { from: "merge", to: "gmail", curve: 22 },
      ],
    },
  };
}
