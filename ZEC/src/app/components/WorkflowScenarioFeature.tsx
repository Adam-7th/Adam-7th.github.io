import type { Lang } from "@/lib/i18n";
import type { WorkflowCategorySlug } from "./workflows/workflowData";

type ScenarioCopy = {
  badge: string;
  title: string;
  subtitle: string;
  buildTitle: string;
  steps: string[];
  timeline: Array<{ label: string; detail: string }>;
  outcomesTitle: string;
  outcomes: string[];
};

const text = (lang: Lang, en: string, ru: string, ar: string) => {
  if (lang === "ru") return ru;
  if (lang === "ar") return ar;
  return en;
};

function getScenario(lang: Lang, category: WorkflowCategorySlug): ScenarioCopy {
  if (category === "support") {
    return {
      badge: text(lang, "Real-world Scenario", "Реальный сценарий", "سيناريو عملي"),
      title: text(lang, "Imagine your support inbox handling itself", "Представьте, что support inbox работает почти сам", "تخيل صندوق الدعم يعمل تلقائيا"),
      subtitle: text(
        lang,
        "We build the workflow below for your team, so every support request gets a fast, controlled response.",
        "Мы собираем workflow ниже для вашей команды, чтобы каждый запрос обрабатывался быстро и под контролем.",
        "نبني المسار التالي لفريقك بحيث تتم معالجة كل طلب دعم بسرعة وتحكم.",
      ),
      buildTitle: text(lang, "Workflow we build for your project", "Workflow, который мы строим под ваш проект", "المسار الذي نبنيه لمشروعك"),
      steps: [
        text(lang, "Email intake + intent classification", "Прием письма + классификация intent", "استقبال البريد + تصنيف النية"),
        text(lang, "AI draft generation with context", "Генерация AI-черновика с контекстом", "توليد مسودة AI مع السياق"),
        text(lang, "Human approval + final send", "Ручное подтверждение + финальная отправка", "موافقة بشرية + الإرسال النهائي"),
      ],
      timeline: [
        { label: text(lang, "Day 1", "День 1", "اليوم 1"), detail: text(lang, "Connect inbox and approval channel", "Подключение inbox и канала согласования", "ربط البريد وقناة الموافقة") },
        { label: text(lang, "Week 1", "Неделя 1", "الأسبوع 1"), detail: text(lang, "Go live with AI drafts + review rules", "Запуск AI-черновиков и правил проверки", "إطلاق مسودات AI وقواعد المراجعة") },
        { label: text(lang, "Month 1", "Месяц 1", "الشهر 1"), detail: text(lang, "Stable faster replies with quality control", "Стабильно более быстрые ответы с контролем качества", "ردود أسرع بثبات مع ضمان الجودة") },
      ],
      outcomesTitle: text(lang, "Expected outcome", "Ожидаемый результат", "النتيجة المتوقعة"),
      outcomes: [
        text(lang, "Support response time drops", "Сокращение времени ответа", "انخفاض وقت الاستجابة"),
        text(lang, "Quality stays human-controlled", "Качество остается под контролем команды", "الجودة تبقى تحت تحكم الفريق"),
        text(lang, "Team handles more tickets", "Команда обрабатывает больше тикетов", "الفريق يعالج تذاكر أكثر"),
      ],
    };
  }

  if (category === "operations") {
    return {
      badge: text(lang, "Real-world Scenario", "Реальный сценарий", "سيناريو عملي"),
      title: text(lang, "Imagine your operations running without chasing", "Представьте операции без ручной погони за статусами", "تخيل العمليات بدون متابعة يدوية"),
      subtitle: text(
        lang,
        "We build the workflow below for your team, so requests become assignable, trackable, and visible automatically.",
        "Мы строим workflow ниже, чтобы запросы автоматически назначались, отслеживались и были видны всей команде.",
        "نبني المسار التالي ليتم تعيين الطلبات وتتبعها وإظهارها تلقائيا.",
      ),
      buildTitle: text(lang, "Workflow we build for your project", "Workflow, который мы строим под ваш проект", "المسار الذي نبنيه لمشروعك"),
      steps: [
        text(lang, "Capture request + validate fields", "Прием запроса + проверка полей", "استقبال الطلب + التحقق من الحقول"),
        text(lang, "Assign owner + SLA automatically", "Автоназначение owner + SLA", "تعيين المسؤول + SLA تلقائيا"),
        text(lang, "Create tasks + send team updates", "Создание задач + обновления команде", "إنشاء المهام + تحديثات الفريق"),
      ],
      timeline: [
        { label: text(lang, "Day 1", "День 1", "اليوم 1"), detail: text(lang, "Map request types and team owners", "Карта типов запросов и ответственных", "تحديد أنواع الطلبات والمسؤولين") },
        { label: text(lang, "Week 1", "Неделя 1", "الأسبوع 1"), detail: text(lang, "Launch auto-assignment and reminders", "Запуск автоназначения и напоминаний", "إطلاق التعيين التلقائي والتذكيرات") },
        { label: text(lang, "Month 1", "Месяц 1", "الشهر 1"), detail: text(lang, "Cleaner process and better accountability", "Более чистый процесс и прозрачная ответственность", "عملية أنظف ومحاسبة أوضح") },
      ],
      outcomesTitle: text(lang, "Expected outcome", "Ожидаемый результат", "النتيجة المتوقعة"),
      outcomes: [
        text(lang, "Fewer tasks lost", "Меньше потерянных задач", "مهام أقل مفقودة"),
        text(lang, "Clear ownership", "Понятная зона ответственности", "مسؤوليات واضحة"),
        text(lang, "Predictable execution", "Предсказуемое исполнение", "تنفيذ أكثر قابلية للتوقع"),
      ],
    };
  }

  if (category === "marketing") {
    return {
      badge: text(lang, "Real-world Scenario", "Реальный сценарий", "سيناريو عملي"),
      title: text(lang, "Imagine your content pipeline running weekly", "Представьте контент-пайплайн, работающий каждую неделю", "تخيل خط المحتوى يعمل أسبوعيا"),
      subtitle: text(
        lang,
        "We build the workflow below for your team, so planning, drafting, approvals, and publishing stay consistent.",
        "Мы строим workflow ниже, чтобы планирование, черновики, согласования и публикации работали стабильно.",
        "نبني المسار التالي ليبقى التخطيط والكتابة والموافقة والنشر بشكل منتظم.",
      ),
      buildTitle: text(lang, "Workflow we build for your project", "Workflow, который мы строим под ваш проект", "المسار الذي نبنيه لمشروعك"),
      steps: [
        text(lang, "Weekly trigger + content idea pull", "Еженедельный триггер + получение идей", "تشغيل أسبوعي + سحب أفكار المحتوى"),
        text(lang, "Draft creation + team approval", "Создание черновика + согласование", "إنشاء المسودة + موافقة الفريق"),
        text(lang, "Publish + result logging", "Публикация + фиксация результата", "نشر + تسجيل النتائج"),
      ],
      timeline: [
        { label: text(lang, "Day 1", "День 1", "اليوم 1"), detail: text(lang, "Connect content source and channels", "Подключение источника контента и каналов", "ربط مصدر المحتوى والقنوات") },
        { label: text(lang, "Week 1", "Неделя 1", "الأسبوع 1"), detail: text(lang, "Enable draft + approval pipeline", "Запуск черновика и pipeline согласования", "تفعيل خط المسودة والموافقة") },
        { label: text(lang, "Month 1", "Месяц 1", "الشهر 1"), detail: text(lang, "Steady publishing rhythm", "Стабильный ритм публикаций", "إيقاع نشر منتظم") },
      ],
      outcomesTitle: text(lang, "Expected outcome", "Ожидаемый результат", "النتيجة المتوقعة"),
      outcomes: [
        text(lang, "More consistent publishing", "Более стабильные публикации", "نشر أكثر انتظاما"),
        text(lang, "Less manual coordination", "Меньше ручной координации", "تنسيق يدوي أقل"),
        text(lang, "Clear reporting loop", "Понятный контур отчетности", "حلقة تقارير واضحة"),
      ],
    };
  }

  if (category === "analytics") {
    return {
      badge: text(lang, "Real-world Scenario", "Реальный сценарий", "سيناريو عملي"),
      title: text(lang, "Imagine weekly reports created automatically", "Представьте еженедельные отчеты, формирующиеся автоматически", "تخيل إنشاء التقارير الأسبوعية تلقائيا"),
      subtitle: text(
        lang,
        "We build the workflow below for your team, so metrics are merged, normalized, and delivered on schedule.",
        "Мы строим workflow ниже, чтобы метрики объединялись, нормализовались и отправлялись по расписанию.",
        "نبني المسار التالي ليتم دمج المقاييس وتوحيدها وإرسالها في الموعد.",
      ),
      buildTitle: text(lang, "Workflow we build for your project", "Workflow, который мы строим под ваш проект", "المسار الذي نبنيه لمشروعك"),
      steps: [
        text(lang, "Fetch channel metrics", "Сбор метрик каналов", "جلب مقاييس القنوات"),
        text(lang, "Normalize + merge datasets", "Нормализация + merge dataset", "توحيد + دمج مجموعات البيانات"),
        text(lang, "Update Sheets + send email report", "Обновление Sheets + email-отчет", "تحديث Sheets + إرسال تقرير بالبريد"),
      ],
      timeline: [
        { label: text(lang, "Day 1", "День 1", "اليوم 1"), detail: text(lang, "Connect sources and report template", "Подключение источников и шаблона отчета", "ربط المصادر وقالب التقرير") },
        { label: text(lang, "Week 1", "Неделя 1", "الأسبوع 1"), detail: text(lang, "Enable automated run and validation", "Запуск автопрогона и валидации", "تفعيل التشغيل الآلي والتحقق") },
        { label: text(lang, "Month 1", "Месяц 1", "الشهر 1"), detail: text(lang, "Reliable reporting cadence", "Надежный ритм отчетности", "وتيرة تقارير موثوقة") },
      ],
      outcomesTitle: text(lang, "Expected outcome", "Ожидаемый результат", "النتيجة المتوقعة"),
      outcomes: [
        text(lang, "Consistent KPI snapshots", "Стабильные KPI-снимки", "لقطات KPI منتظمة"),
        text(lang, "No manual spreadsheet merge", "Без ручного merge таблиц", "بدون دمج جداول يدوي"),
        text(lang, "Reports delivered on time", "Отчеты приходят вовремя", "وصول التقارير في الوقت"),
      ],
    };
  }

  return {
    badge: text(lang, "Real-world Scenario", "Реальный сценарий", "سيناريو عملي"),
    title: text(lang, "Imagine your company capturing every lead instantly", "Представьте, что ваша компания мгновенно фиксирует каждый лид", "تخيل شركتك تلتقط كل عميل محتمل فوريا"),
    subtitle: text(
      lang,
      "We build the workflow below for your team, so every lead is validated, routed, and delivered to sales in seconds.",
      "Мы строим workflow ниже, чтобы каждый лид проходил проверку, маршрутизацию и попадал в sales за секунды.",
      "نبني المسار التالي ليتم التحقق من كل عميل وتوجيهه ووصوله للمبيعات خلال ثوان.",
    ),
    buildTitle: text(lang, "Workflow we build for your project", "Workflow, который мы строим под ваш проект", "المسار الذي نبنيه لمشروعك"),
    steps: [
      text(lang, "Form/chat lead submitted", "Лид отправлен из формы/чата", "تم إرسال عميل من النموذج/المحادثة"),
      text(lang, "n8n validates + routes to CRM", "n8n проверяет и отправляет в CRM", "يقوم n8n بالتحقق والتوجيه إلى CRM"),
      text(lang, "Telegram alert to your team", "Telegram-уведомление вашей команде", "تنبيه Telegram إلى فريقك"),
    ],
    timeline: [
      { label: text(lang, "Day 1", "День 1", "اليوم 1"), detail: text(lang, "Connect forms, CRM, and Telegram", "Подключение форм, CRM и Telegram", "ربط النماذج وCRM وTelegram") },
      { label: text(lang, "Week 1", "Неделя 1", "الأسبوع 1"), detail: text(lang, "Go live with routing and validation", "Запуск маршрутизации и валидации", "إطلاق التوجيه والتحقق") },
      { label: text(lang, "Month 1", "Месяц 1", "الشهر 1"), detail: text(lang, "Faster lead handling at scale", "Быстрее обработка лидов в масштабе", "تعامل أسرع مع العملاء على نطاق أكبر") },
    ],
    outcomesTitle: text(lang, "Expected outcome", "Ожидаемый результат", "النتيجة المتوقعة"),
    outcomes: [
      text(lang, "Lead response starts immediately", "Реакция на лид начинается сразу", "بدء الاستجابة للعميل فوريا"),
      text(lang, "No missed inbound leads", "Нет потерянных входящих лидов", "عدم فقدان العملاء المحتملين"),
      text(lang, "Sales team reacts faster", "Sales-команда реагирует быстрее", "فريق المبيعات يستجيب أسرع"),
    ],
  };
}

export function WorkflowScenarioFeature({ lang, category }: { lang: Lang; category: WorkflowCategorySlug }) {
  const isRtl = lang === "ar";
  const scenario = getScenario(lang, category);

  return (
    <section className={`rounded-3xl border border-edge bg-panel p-6 md:p-7 ${isRtl ? "text-right" : "text-left"}`}>
      <p className="text-[10px] uppercase tracking-[0.22em] text-brand">{scenario.badge}</p>
      <h2 className="mt-2 font-display text-2xl text-text md:text-3xl">{scenario.title}</h2>
      <p className="mt-2 max-w-4xl text-sm text-muted">{scenario.subtitle}</p>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1.25fr_0.75fr]">
        <article className="rounded-2xl border border-edge bg-panel2 p-4">
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted">{scenario.buildTitle}</p>
          <div className="mt-3 grid gap-3 md:grid-cols-3">
            {scenario.steps.map((step, index) => (
              <div key={step} className="rounded-xl border border-edge bg-panel px-3 py-3">
                <p className="text-[10px] uppercase tracking-[0.16em] text-brand">0{index + 1}</p>
                <p className="mt-1 text-sm text-text">{step}</p>
              </div>
            ))}
          </div>
          <div className="scenario-track mt-4" aria-hidden="true" />
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {scenario.timeline.map((item) => (
              <div key={item.label} className="rounded-xl border border-edge bg-panel px-3 py-3">
                <p className="text-[10px] uppercase tracking-[0.18em] text-brand">{item.label}</p>
                <p className="mt-1 text-xs leading-5 text-muted">{item.detail}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-2xl border border-edge bg-panel2 p-4">
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted">{scenario.outcomesTitle}</p>
          <div className="mt-3 space-y-2">
            {scenario.outcomes.map((outcome) => (
              <p key={outcome} className="rounded-xl border border-edge bg-panel px-3 py-2 text-sm text-text">
                {outcome}
              </p>
            ))}
          </div>
          <div className="scenario-pulse mt-4" aria-hidden="true" />
        </article>
      </div>
    </section>
  );
}
