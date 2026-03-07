import Image from "next/image";
import type { Lang } from "@/lib/i18n";
import type { SiteCopy } from "@/lib/siteContent";
import type { WorkflowCategorySlug } from "./workflows/workflowData";

type FlowStep = {
  stage: string;
  title: string;
  detail: string;
  iconSrc: string;
};

type FlowContent = {
  title: string;
  subtitle: string;
  badge: string;
  steps: FlowStep[];
  outputsTitle: string;
  outputs: string[];
};

const t = (lang: Lang, en: string, ru: string, ar: string) => {
  if (lang === "ru") return ru;
  if (lang === "ar") return ar;
  return en;
};

function getFlowContent(lang: Lang, category: WorkflowCategorySlug): FlowContent {
  if (category === "support") {
    return {
      title: t(lang, "How our support automation works", "Как работает автоматизация поддержки", "كيف تعمل أتمتة الدعم"),
      subtitle: t(
        lang,
        "Support email -> classify intent -> AI draft -> human approval -> final reply.",
        "Письмо поддержки -> классификация -> AI-черновик -> подтверждение -> финальный ответ.",
        "رسالة دعم -> تصنيف الطلب -> مسودة AI -> موافقة بشرية -> الرد النهائي.",
      ),
      badge: "n8n Support Workflow",
      steps: [
        {
          stage: t(lang, "Trigger", "Триггер", "المشغل"),
          title: t(lang, "New Support Email", "Новое письмо поддержки", "رسالة دعم جديدة"),
          detail: t(lang, "Customer email arrives in support inbox.", "Письмо клиента поступает в inbox поддержки.", "وصول رسالة العميل إلى صندوق الدعم."),
          iconSrc: "/logos/gmail.svg",
        },
        {
          stage: t(lang, "Route", "Маршрут", "التوجيه"),
          title: "n8n Classifier",
          detail: t(
            lang,
            "n8n detects intent, priority, and assigns route.",
            "n8n определяет intent, приоритет и маршрут.",
            "يقوم n8n بتحديد النية والأولوية ومسار التنفيذ.",
          ),
          iconSrc: "/logos/n8n.svg",
        },
        {
          stage: t(lang, "Transform", "Трансформ", "التحويل"),
          title: t(lang, "AI Draft Reply", "AI-черновик ответа", "مسودة رد بالذكاء الاصطناعي"),
          detail: t(
            lang,
            "OpenAI prepares draft response with context.",
            "OpenAI формирует черновик ответа с учетом контекста.",
            "يقوم OpenAI بإعداد مسودة الرد حسب السياق.",
          ),
          iconSrc: "/logos/openai.svg",
        },
        {
          stage: t(lang, "Review", "Проверка", "المراجعة"),
          title: t(lang, "Human Approval", "Ручное подтверждение", "موافقة بشرية"),
          detail: t(lang, "Team approves in Slack/Telegram before send.", "Команда подтверждает в Slack/Telegram перед отправкой.", "الفريق يوافق في Slack/Telegram قبل الإرسال."),
          iconSrc: "/logos/slack.svg",
        },
        {
          stage: t(lang, "Destination", "Назначение", "الوجهة"),
          title: t(lang, "Send + Log Ticket", "Отправка + лог тикета", "إرسال الرد + تسجيل التذكرة"),
          detail: t(lang, "Final reply is sent and ticket is logged.", "Финальный ответ отправляется, тикет фиксируется.", "يتم إرسال الرد النهائي وتسجيل التذكرة."),
          iconSrc: "/logos/airtable.svg",
        },
      ],
      outputsTitle: t(lang, "What runs automatically", "Что выполняется автоматически", "ما يعمل تلقائيا"),
      outputs: [
        t(lang, "Faster support response", "Быстрее ответы поддержки", "استجابة دعم أسرع"),
        t(lang, "Human-approved AI replies", "AI-ответы с ручной проверкой", "ردود AI بموافقة بشرية"),
        t(lang, "Ticket history saved", "История тикетов сохраняется", "حفظ سجل التذاكر"),
      ],
    };
  }

  if (category === "operations") {
    return {
      title: t(lang, "How our operations workflow runs", "Как работает operations workflow", "كيف يعمل مسار العمليات"),
      subtitle: t(
        lang,
        "Internal request -> assign owner -> create task -> team update.",
        "Внутренний запрос -> назначение ответственного -> задача -> уведомление команды.",
        "طلب داخلي -> تعيين المسؤول -> إنشاء مهمة -> تحديث الفريق.",
      ),
      badge: "n8n Operations Workflow",
      steps: [
        {
          stage: t(lang, "Trigger", "Триггер", "المشغل"),
          title: t(lang, "Internal Request", "Внутренний запрос", "طلب داخلي"),
          detail: t(lang, "Team submits new operational request.", "Команда отправляет новый внутренний запрос.", "يرسل الفريق طلبا تشغيليا جديدا."),
          iconSrc: "/logos/webhooks.svg",
        },
        {
          stage: t(lang, "Route", "Маршрут", "التوجيه"),
          title: "n8n Router",
          detail: t(lang, "n8n routes request by team and priority.", "n8n маршрутизирует запрос по команде и приоритету.", "يقوم n8n بتوجيه الطلب حسب الفريق والأولوية."),
          iconSrc: "/logos/n8n.svg",
        },
        {
          stage: t(lang, "Transform", "Трансформ", "التحويل"),
          title: t(lang, "Assign Owner + SLA", "Назначение owner + SLA", "تعيين المسؤول + SLA"),
          detail: t(lang, "Auto-assigns owner and response deadline.", "Автоматически назначает owner и дедлайн.", "يعيّن المسؤول والموعد النهائي تلقائيا."),
          iconSrc: "/logos/openai.svg",
        },
        {
          stage: t(lang, "Destination", "Назначение", "الوجهة"),
          title: t(lang, "Create Task Board Item", "Создание задачи в доске", "إنشاء عنصر في لوحة المهام"),
          detail: t(lang, "Creates task in Notion/Trello.", "Создает задачу в Notion/Trello.", "ينشئ مهمة في Notion/Trello."),
          iconSrc: "/logos/notion.svg",
        },
        {
          stage: t(lang, "Notify", "Уведомление", "الإشعار"),
          title: t(lang, "Slack/Telegram Team Update", "Обновление команды в Slack/Telegram", "تحديث الفريق في Slack/Telegram"),
          detail: t(lang, "Sends status update and next action.", "Отправляет статус и следующее действие.", "يرسل تحديث الحالة والخطوة التالية."),
          iconSrc: "/logos/telegram.svg",
        },
      ],
      outputsTitle: t(lang, "What runs automatically", "Что выполняется автоматически", "ما يعمل تلقائيا"),
      outputs: [
        t(lang, "Task created with owner", "Задача создается с ответственным", "إنشاء المهمة مع المسؤول"),
        t(lang, "Deadline + reminders set", "Дедлайн и напоминания настроены", "تحديد الموعد النهائي والتذكيرات"),
        t(lang, "Team always informed", "Команда всегда в курсе", "الفريق على اطلاع دائم"),
      ],
    };
  }

  if (category === "marketing") {
    return {
      title: t(lang, "How our marketing automation works", "Как работает маркетинг-автоматизация", "كيف تعمل أتمتة التسويق"),
      subtitle: t(
        lang,
        "Content idea -> draft -> approval -> publish -> report.",
        "Идея контента -> черновик -> согласование -> публикация -> отчет.",
        "فكرة محتوى -> مسودة -> موافقة -> نشر -> تقرير.",
      ),
      badge: "n8n Marketing Workflow",
      steps: [
        {
          stage: t(lang, "Trigger", "Триггер", "المشغل"),
          title: t(lang, "Weekly Schedule", "Еженедельный запуск", "تشغيل أسبوعي"),
          detail: t(lang, "Workflow runs on content schedule.", "Workflow запускается по контент-расписанию.", "يعمل المسار حسب جدول المحتوى."),
          iconSrc: "/logos/schedule.svg",
        },
        {
          stage: t(lang, "Source", "Источник", "المصدر"),
          title: t(lang, "Pull Content Ideas", "Забор контент-идей", "جلب أفكار المحتوى"),
          detail: t(lang, "Loads ideas from Airtable/content plan.", "Подтягивает идеи из Airtable/контент-плана.", "يسحب الأفكار من Airtable/خطة المحتوى."),
          iconSrc: "/logos/airtable.svg",
        },
        {
          stage: t(lang, "Transform", "Трансформ", "التحويل"),
          title: t(lang, "Generate Draft", "Генерация черновика", "توليد المسودة"),
          detail: t(lang, "Creates draft post and caption.", "Создает черновик поста и подписи.", "ينشئ مسودة المنشور والنص."),
          iconSrc: "/logos/openai.svg",
        },
        {
          stage: t(lang, "Review", "Проверка", "المراجعة"),
          title: t(lang, "Approve in Slack", "Согласование в Slack", "موافقة عبر Slack"),
          detail: t(lang, "Team reviews and approves publishing.", "Команда проверяет и подтверждает публикацию.", "يراجع الفريق المحتوى ويعتمد النشر."),
          iconSrc: "/logos/slack.svg",
        },
        {
          stage: t(lang, "Destination", "Назначение", "الوجهة"),
          title: t(lang, "Publish + Track", "Публикация + трекинг", "نشر + تتبع"),
          detail: t(lang, "Publishes and stores links/results.", "Публикует и сохраняет ссылки/результаты.", "ينشر المحتوى ويحفظ الروابط والنتائج."),
          iconSrc: "/logos/google-sheets.svg",
        },
      ],
      outputsTitle: t(lang, "What runs automatically", "Что выполняется автоматически", "ما يعمل تلقائيا"),
      outputs: [
        t(lang, "Consistent publishing cadence", "Стабильный ритм публикаций", "إيقاع نشر منتظم"),
        t(lang, "Faster approval cycle", "Быстрее цикл согласования", "دورة موافقة أسرع"),
        t(lang, "Campaign results logged", "Результаты кампаний фиксируются", "تسجيل نتائج الحملات"),
      ],
    };
  }

  if (category === "analytics") {
    return {
      title: t(lang, "How our analytics report workflow runs", "Как работает workflow аналитики", "كيف يعمل مسار تقارير التحليلات"),
      subtitle: t(
        lang,
        "Channel metrics -> normalize -> merge -> Sheets + email report.",
        "Метрики каналов -> нормализация -> merge -> Sheets + email-отчет.",
        "مقاييس القنوات -> توحيد البيانات -> دمج -> Sheets + تقرير بريد.",
      ),
      badge: "n8n Analytics Workflow",
      steps: [
        {
          stage: t(lang, "Trigger", "Триггер", "المشغل"),
          title: t(lang, "Weekly Run", "Еженедельный запуск", "تشغيل أسبوعي"),
          detail: t(lang, "Report pipeline starts on schedule.", "Отчетный pipeline запускается по расписанию.", "يبدأ مسار التقارير حسب الجدول."),
          iconSrc: "/logos/schedule.svg",
        },
        {
          stage: t(lang, "Source", "Источник", "المصدر"),
          title: t(lang, "Pull Channel Metrics", "Сбор метрик каналов", "جلب مقاييس القنوات"),
          detail: t(lang, "Fetches Facebook, LinkedIn, and X data.", "Забирает данные Facebook, LinkedIn и X.", "يجلب بيانات Facebook وLinkedIn وX."),
          iconSrc: "/logos/facebook.svg",
        },
        {
          stage: t(lang, "Transform", "Трансформ", "التحويل"),
          title: t(lang, "Format + Normalize", "Форматирование + нормализация", "تنسيق + توحيد"),
          detail: t(lang, "Cleans and normalizes KPI structure.", "Очищает и нормализует структуру KPI.", "ينظف ويوحد هيكل مؤشرات الأداء."),
          iconSrc: "/logos/openai.svg",
        },
        {
          stage: t(lang, "Merge", "Слияние", "الدمج"),
          title: t(lang, "Merge Metrics", "Объединение метрик", "دمج المقاييس"),
          detail: t(lang, "Combines all channels into one dataset.", "Объединяет все каналы в единый dataset.", "يدمج كل القنوات في مجموعة بيانات واحدة."),
          iconSrc: "/logos/n8n.svg",
        },
        {
          stage: t(lang, "Destination", "Назначение", "الوجهة"),
          title: t(lang, "Send Report", "Отправка отчета", "إرسال التقرير"),
          detail: t(lang, "Writes to Sheets and emails the report.", "Пишет в Sheets и отправляет отчет на email.", "يحفظ في Sheets ويرسل التقرير عبر البريد."),
          iconSrc: "/logos/gmail.svg",
        },
      ],
      outputsTitle: t(lang, "What runs automatically", "Что выполняется автоматически", "ما يعمل تلقائيا"),
      outputs: [
        t(lang, "Unified KPI dataset", "Единый набор KPI", "مجموعة KPI موحدة"),
        t(lang, "Auto weekly email report", "Авто еженедельный email-отчет", "تقرير بريد أسبوعي تلقائي"),
        t(lang, "No manual spreadsheet work", "Без ручной сборки таблиц", "بدون عمل جداول يدوي"),
      ],
    };
  }

  return {
    title: t(lang, "How our lead capture works", "Как работает захват лида", "كيف يعمل التقاط العملاء المحتملين"),
    subtitle: t(
      lang,
      "Form/chat lead -> n8n webhook + routing -> CRM update + Telegram alert -> fast team response.",
      "Лид из формы/чата -> n8n webhook + маршрутизация -> обновление CRM + Telegram -> быстрый ответ команды.",
      "عميل من النموذج/المحادثة -> webhook + توجيه عبر n8n -> تحديث CRM + تنبيه Telegram -> استجابة أسرع.",
    ),
    badge: "n8n Lead Capture Workflow",
    steps: [
      {
        stage: t(lang, "Trigger", "Триггер", "المشغل"),
        title: t(lang, "Form / Chat Lead", "Лид из формы / чата", "عميل من النموذج / المحادثة"),
        detail: t(lang, "New lead is submitted from your website or chatbot.", "Новый лид отправлен с сайта или чат-виджета.", "يتم إرسال عميل جديد من الموقع أو الشات بوت."),
        iconSrc: "/logos/webhooks.svg",
      },
      {
        stage: t(lang, "Route", "Маршрут", "التوجيه"),
        title: "n8n Webhook + Router",
        detail: t(lang, "n8n receives payload and routes by source, language, and campaign.", "n8n принимает payload и маршрутизирует по источнику, языку и кампании.", "يستقبل n8n البيانات ويوجهها حسب المصدر واللغة والحملة."),
        iconSrc: "/logos/n8n.svg",
      },
      {
        stage: t(lang, "Transform", "Трансформ", "التحويل"),
        title: t(lang, "Validate + Enrich", "Проверка + обогащение", "تحقق + إثراء"),
        detail: t(lang, "Checks required fields, normalizes data, and blocks duplicates.", "Проверяет обязательные поля, нормализует данные и убирает дубли.", "يتحقق من الحقول المطلوبة ويوحد البيانات ويمنع التكرارات."),
        iconSrc: "/logos/openai.svg",
      },
      {
        stage: t(lang, "Destination", "Назначение", "الوجهة"),
        title: t(lang, "CRM Contact Update", "Обновление контакта в CRM", "تحديث جهة الاتصال في CRM"),
        detail: t(lang, "Creates or updates the contact in HubSpot or your CRM.", "Создает или обновляет контакт в HubSpot/вашей CRM.", "ينشئ أو يحدث جهة الاتصال في HubSpot أو CRM الحالي."),
        iconSrc: "/logos/hubspot.svg",
      },
      {
        stage: t(lang, "Notify", "Уведомление", "الإشعار"),
        title: t(lang, "Telegram Team Alert", "Telegram-уведомление команде", "تنبيه Telegram للفريق"),
        detail: t(lang, "Sends an instant alert to your sales/support channel.", "Мгновенно отправляет уведомление в рабочий канал.", "يرسل تنبيها فوريا إلى قناة الفريق."),
        iconSrc: "/logos/telegram.svg",
      },
    ],
    outputsTitle: t(lang, "What runs automatically", "Что выполняется автоматически", "ما يعمل تلقائيا"),
    outputs: [
      t(lang, "CRM record created/updated", "Контакт в CRM создан/обновлен", "إنشاء/تحديث جهة الاتصال في CRM"),
      t(lang, "Instant Telegram notification", "Мгновенное Telegram-уведомление", "تنبيه Telegram فوري"),
      t(lang, "Faster first-response time", "Быстрее первый ответ клиенту", "تسريع وقت أول استجابة"),
    ],
  };
}

export function LeadCaptureMini({
  copy,
  lang,
  activeCategory = "lead_sales",
}: {
  copy: SiteCopy;
  lang: Lang;
  activeCategory?: WorkflowCategorySlug;
}) {
  const flow = getFlowContent(lang, activeCategory);
  const title = flow.title || copy.home.leadCaptureTitle;
  const subtitle = flow.subtitle || copy.home.leadCaptureSubtitle;

  return (
    <section className="rounded-3xl border border-edge bg-panel p-6">
      <h3 className="font-display text-2xl text-text">{title}</h3>
      <p className="mt-2 text-sm text-muted">{subtitle}</p>

      <div className="mt-4 rounded-2xl border border-edge bg-panel2/70 p-4">
        <p className="text-[10px] uppercase tracking-[0.2em] text-brand">{flow.badge}</p>
        <div className="mt-3 overflow-x-auto pb-2">
          <div className="flex min-w-max items-stretch gap-2">
            {flow.steps.map((step, index) => (
              <div key={step.title} className="flex items-center gap-2">
                <article className="min-w-[230px] rounded-2xl border border-edge bg-panel px-3 py-3">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-muted">{step.stage}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="inline-flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg border border-edge bg-panel2">
                      <Image src={step.iconSrc} alt={step.title} width={18} height={18} className="object-contain" />
                    </span>
                    <p className="text-sm font-semibold text-text">{step.title}</p>
                  </div>
                  <p className="mt-2 text-xs leading-5 text-muted">{step.detail}</p>
                </article>
                {index < flow.steps.length - 1 ? <span className="flow-connector min-w-[54px]" aria-hidden="true" /> : null}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-3">
        <p className="rounded-xl border border-edge bg-panel2 px-3 py-2 text-xs uppercase tracking-[0.16em] text-muted md:col-span-3">{flow.outputsTitle}</p>
        {flow.outputs.map((output) => (
          <p key={output} className="rounded-xl border border-edge bg-panel2 px-3 py-2 text-sm text-text">
            {output}
          </p>
        ))}
      </div>
    </section>
  );
}
