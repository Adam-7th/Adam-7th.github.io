import type { Lang } from "@/lib/i18n";
import type { WorkflowCategorySlug } from "./workflows/workflowData";

type PrimerCopy = {
  badge: string;
  title: string;
  subtitle: string;
  painTitle: string;
  pains: string[];
  scenarioTitle: string;
  scenarioBody: string;
  fitTitle: string;
  fitItems: string[];
};

const text = (lang: Lang, en: string, ru: string, ar: string) => {
  if (lang === "ru") return ru;
  if (lang === "ar") return ar;
  return en;
};

function getPrimerCopy(lang: Lang, category: WorkflowCategorySlug): PrimerCopy {
  if (category === "support") {
    return {
      badge: text(lang, "User problem first", "Сначала проблема пользователя", "ابدأ بمشكلة المستخدم"),
      title: text(lang, "Support teams lose time between inbox, drafts, and approvals", "Команды поддержки теряют время между inbox, черновиками и согласованием", "فرق الدعم تضيع وقتا بين البريد والمسودات والموافقات"),
      subtitle: text(
        lang,
        "Requests wait too long, agents repeat manual work, and quality becomes inconsistent under load.",
        "Запросы ждут слишком долго, агенты повторяют ручные действия, а качество проседает под нагрузкой.",
        "الطلبات تنتظر طويلا، والفريق يكرر أعمالا يدوية، والجودة تصبح غير مستقرة مع الضغط.",
      ),
      painTitle: text(lang, "Common pain points", "Типовые проблемы", "المشكلات الشائعة"),
      pains: [
        text(lang, "Slow first response to customer email", "Медленный первый ответ клиенту", "بطء أول رد على العميل"),
        text(lang, "No reliable approval path for AI drafts", "Нет надежного пути согласования AI-черновиков", "لا يوجد مسار اعتماد موثوق لمسودات AI"),
        text(lang, "Ticket context scattered across tools", "Контекст тикетов разбросан по инструментам", "سياق التذكرة موزع بين أدوات مختلفة"),
      ],
      scenarioTitle: text(lang, "Scenario", "Сценарий", "سيناريو"),
      scenarioBody: text(
        lang,
        "A support email arrives. n8n classifies intent, OpenAI drafts a reply, team approves in Slack/Telegram, and final response is sent automatically.",
        "Приходит письмо поддержки. n8n классифицирует intent, OpenAI готовит черновик, команда подтверждает в Slack/Telegram, после чего ответ отправляется автоматически.",
        "تصل رسالة دعم. يقوم n8n بتصنيف النية، ويُنشئ OpenAI مسودة رد، ثم يوافق الفريق في Slack/Telegram ويُرسل الرد النهائي تلقائيا.",
      ),
      fitTitle: text(lang, "Best fit teams", "Кому подходит", "الفرق المناسبة"),
      fitItems: [text(lang, "Support desk", "Support desk", "فريق الدعم"), text(lang, "Customer success", "Customer success", "نجاح العملاء"), text(lang, "High-volume inbox teams", "Команды с большим входящим потоком", "فرق البريد ذات الحجم العالي")],
    };
  }

  if (category === "operations") {
    return {
      badge: text(lang, "User problem first", "Сначала проблема пользователя", "ابدأ بمشكلة المستخدم"),
      title: text(lang, "Operations break when requests are manual and ownership is unclear", "Операции ломаются, когда запросы ручные и зоны ответственности не ясны", "العمليات تتعطل عندما تكون الطلبات يدوية والمسؤولية غير واضحة"),
      subtitle: text(
        lang,
        "Teams spend hours chasing updates instead of executing tasks.",
        "Команды тратят часы на погоню за статусами вместо выполнения задач.",
        "الفرق تستهلك ساعات في متابعة الحالة بدلا من تنفيذ المهام.",
      ),
      painTitle: text(lang, "Common pain points", "Типовые проблемы", "المشكلات الشائعة"),
      pains: [
        text(lang, "Requests are missed in chat/email", "Запросы теряются в чате/почте", "الطلبات تضيع في المحادثة/البريد"),
        text(lang, "No automatic owner assignment", "Нет автоназначения ответственного", "لا يوجد تعيين تلقائي للمسؤول"),
        text(lang, "Deadlines slip without reminders", "Сроки срываются без напоминаний", "المواعيد تتأخر بدون تذكيرات"),
      ],
      scenarioTitle: text(lang, "Scenario", "Сценарий", "سيناريو"),
      scenarioBody: text(
        lang,
        "A request is submitted. n8n validates fields, assigns owner + SLA, creates task in Notion/Trello, then sends team updates in Slack/Telegram.",
        "Поступает запрос. n8n проверяет поля, назначает owner + SLA, создает задачу в Notion/Trello и отправляет обновления команде в Slack/Telegram.",
        "يتم إرسال طلب. يقوم n8n بالتحقق من الحقول وتعيين المسؤول + SLA وإنشاء مهمة في Notion/Trello ثم إرسال تحديثات الفريق في Slack/Telegram.",
      ),
      fitTitle: text(lang, "Best fit teams", "Кому подходит", "الفرق المناسبة"),
      fitItems: [text(lang, "Operations managers", "Operations managers", "مديرو العمليات"), text(lang, "Internal service teams", "Internal service teams", "فرق الخدمات الداخلية"), text(lang, "Project delivery teams", "Project delivery teams", "فرق تنفيذ المشاريع")],
    };
  }

  if (category === "marketing") {
    return {
      badge: text(lang, "User problem first", "Сначала проблема пользователя", "ابدأ بمشكلة المستخدم"),
      title: text(lang, "Marketing workflows fail when planning and publishing are disconnected", "Маркетинг ломается, когда планирование и публикация разорваны", "يتعطل التسويق عندما ينفصل التخطيط عن النشر"),
      subtitle: text(
        lang,
        "Content gets delayed, approvals stall, and reporting is done manually.",
        "Контент задерживается, согласования тормозят, а отчеты делаются вручную.",
        "يتأخر المحتوى وتتوقف الموافقات ويتم إعداد التقارير يدويا.",
      ),
      painTitle: text(lang, "Common pain points", "Типовые проблемы", "المشكلات الشائعة"),
      pains: [
        text(lang, "No repeatable publishing cadence", "Нет повторяемого ритма публикаций", "لا يوجد إيقاع نشر ثابت"),
        text(lang, "Approval loop is slow", "Медленный цикл согласования", "حلقة الموافقة بطيئة"),
        text(lang, "Performance data is fragmented", "Данные эффективности фрагментированы", "بيانات الأداء مجزأة"),
      ],
      scenarioTitle: text(lang, "Scenario", "Сценарий", "سيناريو"),
      scenarioBody: text(
        lang,
        "A weekly schedule triggers n8n. Ideas are pulled from Airtable, drafts are generated, approvals happen in Slack, and publishing/reporting updates run automatically.",
        "Еженедельный триггер запускает n8n. Идеи берутся из Airtable, создаются черновики, согласование проходит в Slack, публикация и отчетность обновляются автоматически.",
        "يقوم جدول أسبوعي بتشغيل n8n. يتم سحب الأفكار من Airtable وتوليد المسودات والموافقة في Slack ثم تحديث النشر والتقارير تلقائيا.",
      ),
      fitTitle: text(lang, "Best fit teams", "Кому подходит", "الفرق المناسبة"),
      fitItems: [text(lang, "Content teams", "Content teams", "فرق المحتوى"), text(lang, "Growth marketing", "Growth marketing", "فرق النمو"), text(lang, "Agencies", "Agencies", "الوكالات")],
    };
  }

  if (category === "analytics") {
    return {
      badge: text(lang, "User problem first", "Сначала проблема пользователя", "ابدأ بمشكلة المستخدم"),
      title: text(lang, "Reporting is slow when channel data is not unified", "Отчетность медленная, когда данные каналов не объединены", "التقارير بطيئة عندما تكون بيانات القنوات غير موحدة"),
      subtitle: text(
        lang,
        "Teams copy metrics manually each week and still miss consistency.",
        "Команды вручную копируют метрики каждую неделю и все равно теряют консистентность.",
        "الفرق تنسخ المقاييس يدويا كل أسبوع ومع ذلك تفتقد الاتساق.",
      ),
      painTitle: text(lang, "Common pain points", "Типовые проблемы", "المشكلات الشائعة"),
      pains: [
        text(lang, "Data from each channel has different format", "Данные каждого канала в разном формате", "بيانات كل قناة بصيغة مختلفة"),
        text(lang, "Weekly reports take too much manual effort", "Еженедельные отчеты требуют слишком много ручной работы", "التقارير الأسبوعية تحتاج جهدا يدويا كبيرا"),
        text(lang, "Decision-makers wait for KPI snapshots", "Руководители ждут KPI-снимки", "صناع القرار ينتظرون لقطات KPI"),
      ],
      scenarioTitle: text(lang, "Scenario", "Сценарий", "سيناريو"),
      scenarioBody: text(
        lang,
        "n8n pulls channel data, normalizes metrics, merges results, updates Google Sheets, and sends the final report by email every week.",
        "n8n забирает данные каналов, нормализует метрики, объединяет результаты, обновляет Google Sheets и каждую неделю отправляет финальный отчет на email.",
        "يقوم n8n بسحب بيانات القنوات وتوحيد المقاييس ودمج النتائج وتحديث Google Sheets ثم إرسال التقرير النهائي عبر البريد أسبوعيا.",
      ),
      fitTitle: text(lang, "Best fit teams", "Кому подходит", "الفرق المناسبة"),
      fitItems: [text(lang, "Performance teams", "Performance teams", "فرق الأداء"), text(lang, "CMOs / founders", "CMO / founders", "مديرو التسويق / المؤسسون"), text(lang, "Data-informed agencies", "Агентства с data-подходом", "وكالات تعتمد على البيانات")],
    };
  }

  return {
    badge: text(lang, "User problem first", "Сначала проблема пользователя", "ابدأ بمشكلة المستخدم"),
    title: text(lang, "Leads are lost when capture, CRM, and team alerts are disconnected", "Лиды теряются, когда захват, CRM и уведомления не связаны", "يتم فقدان العملاء عندما يكون الالتقاط وCRM والتنبيهات منفصلة"),
    subtitle: text(
      lang,
      "Manual handoffs delay response and reduce conversion.",
      "Ручные передачи замедляют реакцию и снижают конверсию.",
      "نقل البيانات يدويا يبطئ الاستجابة ويخفض التحويل.",
    ),
    painTitle: text(lang, "Common pain points", "Типовые проблемы", "المشكلات الشائعة"),
    pains: [
      text(lang, "Lead form submissions wait too long", "Заявки из формы обрабатываются слишком долго", "طلبات النموذج تنتظر وقتا طويلا"),
      text(lang, "CRM is updated manually", "CRM обновляется вручную", "يتم تحديث CRM يدويا"),
      text(lang, "Sales team sees leads late", "Команда sales видит лиды с опозданием", "فريق المبيعات يرى العملاء متأخرا"),
    ],
    scenarioTitle: text(lang, "Scenario", "Сценарий", "سيناريو"),
    scenarioBody: text(
      lang,
      "A lead comes from form/chat. n8n validates and routes data, updates CRM instantly, and sends Telegram alert so sales can respond in minutes.",
      "Лид приходит из формы/чата. n8n проверяет и маршрутизирует данные, мгновенно обновляет CRM и отправляет Telegram-уведомление, чтобы sales ответили за минуты.",
      "يصل عميل من النموذج/المحادثة. يقوم n8n بالتحقق وتوجيه البيانات ويحدث CRM فورا ويرسل تنبيه Telegram ليستجيب فريق المبيعات خلال دقائق.",
    ),
    fitTitle: text(lang, "Best fit teams", "Кому подходит", "الفرق المناسبة"),
    fitItems: [text(lang, "Sales teams", "Sales teams", "فرق المبيعات"), text(lang, "Lead-gen websites", "Лидоген сайты", "مواقع توليد العملاء"), text(lang, "Service agencies", "Service agencies", "وكالات الخدمات")],
  };
}

export function WorkflowProblemPrimer({ lang, category }: { lang: Lang; category: WorkflowCategorySlug }) {
  const isRtl = lang === "ar";
  const copy = getPrimerCopy(lang, category);

  return (
    <section id="workflow-problem-primer" className={`scroll-mt-24 rounded-3xl border border-edge bg-panel p-6 md:p-7 ${isRtl ? "text-right" : "text-left"}`}>
      <p className="text-[10px] uppercase tracking-[0.22em] text-brand">{copy.badge}</p>
      <h2 className="mt-2 font-display text-2xl text-text md:text-3xl">{copy.title}</h2>
      <p className="mt-2 max-w-4xl text-sm text-muted">{copy.subtitle}</p>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <article className="rounded-2xl border border-edge bg-panel2 p-4">
          <p className="text-[10px] uppercase tracking-[0.18em] text-muted">{copy.painTitle}</p>
          <div className="mt-3 grid gap-2 md:grid-cols-3">
            {copy.pains.map((item) => (
              <p key={item} className="rounded-xl border border-edge bg-panel px-3 py-2 text-sm text-text">
                {item}
              </p>
            ))}
          </div>
        </article>

        <article className="rounded-2xl border border-edge bg-panel2 p-4">
          <p className="text-[10px] uppercase tracking-[0.18em] text-brand">{copy.scenarioTitle}</p>
          <p className="mt-2 text-sm leading-6 text-muted">{copy.scenarioBody}</p>
          <p className="mt-4 text-[10px] uppercase tracking-[0.18em] text-muted">{copy.fitTitle}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {copy.fitItems.map((item) => (
              <span key={item} className="rounded-full border border-edge bg-panel px-3 py-1.5 text-xs text-text">
                {item}
              </span>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
