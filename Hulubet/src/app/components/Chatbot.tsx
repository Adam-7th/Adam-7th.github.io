"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/lang";

type Message = {
  id: string;
  role: "user" | "bot";
  text: string;
  attachmentName?: string;
  attachmentType?: "file" | "image" | "voice";
};

type Mode = "start" | "faq" | "live";
type LiveStep = "name" | "email" | "contact" | "needs" | "done";
type ReplyLang = "en" | "ru" | "ar";

type LiveInfo = {
  name?: string;
  email?: string;
  contact?: string;
  needs?: string;
};

const START_MESSAGE: Record<ReplyLang, string> = {
  en: "Hi! I’m CustomFast 🤖\nWould you like to talk with:\n\n1) CustomFast chatbot (instant answers)\n2) Live agent (human support)\n\nReply with 1 or 2.",
  ru: "Привет! Я CustomFast 🤖\nС кем вы хотите поговорить:\n\n1) Чатбот CustomFast (быстрые ответы)\n2) Живой агент (человеческая поддержка)\n\nОтветьте 1 или 2.",
  ar: "مرحبًا! أنا CustomFast 🤖\nهل تود التحدث مع:\n\n1) شات بوت CustomFast (إجابات فورية)\n2) وكيل بشري (دعم حي)\n\nيرجى الرد بـ 1 أو 2.",
};

const MENU: Record<ReplyLang, string> = {
  en: [
    "Great — instant answers 👇 Choose a topic:",
    "1) What services do you offer?",
    "2) Pricing (packages + monthly support)",
    "3) Timeline (how fast can you deliver?)",
    "4) Integrations (Russia + Global tools)",
    "5) AI Agents (what they do & how they work)",
    "6) CRM Automation (Bitrix24 / amoCRM / HubSpot)",
    "7) Social & Content Automation (VK/Telegram/Rutube/YouTube)",
    "8) HR / Resume Screening Automation",
    "9) Security & data privacy",
    "10) How to start (free audit / call booking)",
    "11) Examples / demo scenarios",
    "12) Custom question (type your question)",
    "",
    "Reply with a number.",
  ].join("\n"),
  ru: [
    "Отлично — быстрые ответы 👇 Выберите тему:",
    "1) Какие услуги вы предлагаете?",
    "2) Цены (пакеты + ежемесячная поддержка)",
    "3) Сроки (как быстро вы можете сделать?)",
    "4) Интеграции (Россия + глобальные инструменты)",
    "5) AI агенты (что они делают и как работают)",
    "6) CRM автоматизация (Bitrix24 / amoCRM / HubSpot)",
    "7) Соцсети и контент (VK/Telegram/Rutube/YouTube)",
    "8) HR / отбор резюме",
    "9) Безопасность и конфиденциальность данных",
    "10) Как начать (бесплатный аудит / созвон)",
    "11) Примеры / демо-сценарии",
    "12) Свой вопрос (напишите вопрос)",
    "",
    "Ответьте числом.",
  ].join("\n"),
  ar: [
    "رائع — إجابات سريعة 👇 اختر موضوعًا:",
    "1) ما الخدمات التي تقدمونها؟",
    "2) الأسعار (الباقات + الدعم الشهري)",
    "3) المدة (كم تستغرقون للتنفيذ؟)",
    "4) التكاملات (أدوات روسيا + أدوات عالمية)",
    "5) وكلاء الذكاء الاصطناعي (ماذا يفعلون وكيف يعملون)",
    "6) أتمتة CRM (Bitrix24 / amoCRM / HubSpot)",
    "7) أتمتة المحتوى والسوشيال (VK/Telegram/Rutube/YouTube)",
    "8) أتمتة الموارد البشرية/فرز السير الذاتية",
    "9) الأمان وخصوصية البيانات",
    "10) كيف نبدأ (تدقيق مجاني / حجز مكالمة)",
    "11) أمثلة / سيناريوهات تجريبية",
    "12) سؤال مخصص (اكتب سؤالك)",
    "",
    "يرجى الرد برقم.",
  ].join("\n"),
};

const FAQ_ANSWERS: Record<ReplyLang, Record<number, string>> = {
  en: {
    1: "We build AI automation systems that remove manual work across teams:\n• AI Agents for sales, support, and internal knowledge\n• CRM automation (lead routing, follow-ups, reporting)\n• Telegram/VK/WhatsApp bots + workflow integrations\n• HR automation (resume intake, candidate screening, summaries)\n• Content automation (planning, generation, auto publishing, analytics)\nIf you tell me your industry, I’ll suggest the best starting scenario.\nNext step: Book a call or request a free audit.",
    2: "We offer fixed packages + ongoing support.\nRussia (RUB):\n• Starter: from 120,000 ₽ (one key workflow)\n• Business: from 250,000 ₽ (2–3 workflows + CRM/AI)\n• Pro: from 500,000 ₽ (multi-process automation)\n• Support: from 25,000 ₽/month\nFor startups, we can start with a small Pilot/MVP (reduced scope, faster test).\nNext step: Want a quick estimate? Tell me your goal: sales, support, HR, or content.",
    3: "Typical timelines:\n• Pilot/MVP: 5–7 days\n• Starter: 7–10 days\n• Business: 10–14 days\n• Pro: 14–21 days\nExact time depends on integrations and workflow complexity.\nNext step: What do you want to automate first?",
    4: "We integrate with tools you already use.\nRussia:\n• Telegram, VK, Yandex (Forms/Mail/Analytics/Cloud), Rutube\n• Bitrix24, amoCRM\nGlobal:\n• WhatsApp, Slack, Google Workspace, HubSpot, Zapier/Make, APIs\nNext step: Which tools do you use today?",
    5: "AI Agents handle conversations and knowledge tasks:\n• Reply to customers 24/7\n• Qualify leads (ask questions, score, route)\n• Answer using your docs/FAQ (knowledge base / RAG)\n• Hand off to humans when needed\nThey don’t replace your team — they remove repetitive work.\nNext step: Do you want an agent for Sales, Support, or Internal team?",
    6: "We automate CRM so leads don’t get lost:\n• Lead capture → qualification → deal creation\n• Auto follow-ups + reminders\n• Routing to the right manager\n• Sales reports and dashboards\nWorks with Bitrix24, amoCRM, HubSpot (depending on your region).\nNext step: Which CRM do you use?",
    7: "We automate content workflows:\n• Content planning + AI draft generation\n• Auto publishing (VK, Telegram, Rutube/YouTube)\n• Comment/DM routing and alerts\n• Engagement analytics + owner reports\nNext step: Which platform is priority: VK, Telegram, Rutube, or YouTube?",
    8: "We automate recruiting:\n• Collect resumes from form/email\n• AI screening + ranking\n• Short candidate summaries for HR\n• Notifications to Telegram/Email\n• Optional CRM/ATS integration\nNext step: How many resumes per week do you process?",
    9: "We design secure automations:\n• Role-based access\n• Minimal data collection\n• Secure storage for documents\n• Audit logs (if needed)\nWe can adapt architecture to your compliance needs (cloud or private).\nNext step: Do you require on-prem/private deployment?",
    10: "Fast start process:\n1) Free audit (15–30 min)\n2) We map your workflow and success metric\n3) Build MVP in 7–14 days\n4) Support and scaling\nNext step: Do you prefer a free audit or a strategy call?",
    11: "Common quick-win automations:\n• Lead intake bot → CRM → follow-up reminders\n• AI support agent trained on your FAQ/docs\n• Resume screening → shortlist → Telegram notifications\n• Content pipeline: plan → generate → publish → report\nNext step: Pick one: Sales, Support, HR, or Content.",
  },
  ru: {
    1: "Мы создаем системы AI‑автоматизации, которые убирают ручную работу в командах:\n• AI‑агенты для продаж, поддержки и внутренней базы знаний\n• CRM‑автоматизация (распределение лидов, фоллоу‑апы, отчетность)\n• Telegram/VK/WhatsApp боты + интеграции с процессами\n• HR‑автоматизация (прием резюме, отбор, краткие выводы)\n• Автоматизация контента (планирование, генерация, автопубликация, аналитика)\nЕсли вы скажете вашу сферу, я подскажу лучший стартовый сценарий.\nСледующий шаг: Забронировать звонок или запросить бесплатный аудит.",
    2: "Мы предлагаем фиксированные пакеты + поддержку.\nРоссия (RUB):\n• Starter: от 120 000 ₽ (один ключевой процесс)\n• Business: от 250 000 ₽ (2–3 процесса + CRM/AI)\n• Pro: от 500 000 ₽ (многоэтапная автоматизация)\n• Support: от 25 000 ₽/мес\nДля стартапов можем начать с небольшого Pilot/MVP (меньше объема, быстрее тест).\nСледующий шаг: Нужна быстрая оценка? Скажите цель: продажи, поддержка, HR или контент.",
    3: "Типичные сроки:\n• Pilot/MVP: 5–7 дней\n• Starter: 7–10 дней\n• Business: 10–14 дней\n• Pro: 14–21 день\nТочные сроки зависят от интеграций и сложности процессов.\nСледующий шаг: Что хотите автоматизировать в первую очередь?",
    4: "Мы интегрируемся с инструментами, которые вы уже используете.\nРоссия:\n• Telegram, VK, Yandex (Forms/Mail/Analytics/Cloud), Rutube\n• Bitrix24, amoCRM\nГлобально:\n• WhatsApp, Slack, Google Workspace, HubSpot, Zapier/Make, APIs\nСледующий шаг: Какими инструментами вы пользуетесь сейчас?",
    5: "AI‑агенты берут на себя диалоги и задачи знания:\n• Отвечают клиентам 24/7\n• Квалифицируют лидов (задают вопросы, оценивают, маршрутизируют)\n• Отвечают по вашим документам/FAQ (knowledge base / RAG)\n• Передают запрос человеку при необходимости\nОни не заменяют команду — они снимают рутину.\nСледующий шаг: Вам нужен агент для Sales, Support или внутренней команды?",
    6: "Мы автоматизируем CRM, чтобы лиды не терялись:\n• Захват лида → квалификация → создание сделки\n• Авто‑фоллоу‑апы + напоминания\n• Маршрутизация на нужного менеджера\n• Отчеты и дашборды по продажам\nРаботает с Bitrix24, amoCRM, HubSpot (в зависимости от региона).\nСледующий шаг: Какую CRM вы используете?",
    7: "Мы автоматизируем контент‑воркфлоу:\n• Планирование контента + AI‑черновики\n• Автопубликация (VK, Telegram, Rutube/YouTube)\n• Маршрутизация комментариев/DM и алерты\n• Аналитика вовлеченности + отчеты владельцу\nСледующий шаг: Какая площадка в приоритете: VK, Telegram, Rutube или YouTube?",
    8: "Мы автоматизируем рекрутинг:\n• Сбор резюме из формы/почты\n• AI‑скрининг + ранжирование\n• Краткие резюме кандидатов для HR\n• Уведомления в Telegram/Email\n• Опциональная интеграция с CRM/ATS\nСледующий шаг: Сколько резюме в неделю вы обрабатываете?",
    9: "Мы проектируем безопасные автоматизации:\n• Ролевой доступ\n• Минимальный сбор данных\n• Защищенное хранение документов\n• Аудит‑логи (если нужно)\nМы адаптируем архитектуру под ваши требования к комплаенсу (облако или private).\nСледующий шаг: Нужен on‑prem/private deployment?",
    10: "Быстрый старт:\n1) Бесплатный аудит (15–30 мин)\n2) Маппим процесс и метрики успеха\n3) Делаем MVP за 7–14 дней\n4) Поддержка и масштабирование\nСледующий шаг: Что предпочитаете — бесплатный аудит или стратегический звонок?",
    11: "Типовые быстрые сценарии:\n• Бот для лидов → CRM → напоминания о фоллоу‑апах\n• AI‑агент поддержки по вашему FAQ/документам\n• Отбор резюме → шорт‑лист → уведомления в Telegram\n• Контент‑пайплайн: план → генерация → публикация → отчет\nСледующий шаг: Выберите: Sales, Support, HR или Content.",
  },
  ar: {
    1: "نحن نبني أنظمة أتمتة بالذكاء الاصطناعي تزيل العمل اليدوي عبر الفرق:\n• وكلاء ذكاء اصطناعي للمبيعات والدعم والمعرفة الداخلية\n• أتمتة CRM (توجيه العملاء المحتملين، المتابعة، التقارير)\n• بوتات Telegram/VK/WhatsApp مع تكاملات سير العمل\n• أتمتة الموارد البشرية (استقبال السير الذاتية، الفرز، الملخصات)\n• أتمتة المحتوى (التخطيط، التوليد، النشر التلقائي، التحليلات)\nإذا أخبرتني بمجالك، سأقترح أفضل سيناريو للبدء.\nالخطوة التالية: احجز مكالمة أو اطلب تدقيقًا مجانيًا.",
    2: "نقدم باقات ثابتة + دعم مستمر.\nروسيا (روبل):\n• Starter: من 120,000 ₽ (سير عمل رئيسي واحد)\n• Business: من 250,000 ₽ (2–3 سير عمل + CRM/AI)\n• Pro: من 500,000 ₽ (أتمتة متعددة العمليات)\n• Support: من 25,000 ₽/شهريًا\nللشركات الناشئة يمكننا البدء بـ Pilot/MVP صغير (نطاق أقل وتجربة أسرع).\nالخطوة التالية: تريد تقديرًا سريعًا؟ أخبرني هدفك: مبيعات، دعم، موارد بشرية، أم محتوى.",
    3: "المدد المعتادة:\n• Pilot/MVP: من 5 إلى 7 أيام\n• Starter: من 7 إلى 10 أيام\n• Business: من 10 إلى 14 يومًا\n• Pro: من 14 إلى 21 يومًا\nالوقت الدقيق يعتمد على التكاملات وتعقيد سير العمل.\nالخطوة التالية: ماذا تريد أن تؤتمت أولًا؟",
    4: "نتكامل مع الأدوات التي تستخدمها بالفعل.\nروسيا:\n• Telegram، VK، Yandex (Forms/Mail/Analytics/Cloud)، Rutube\n• Bitrix24، amoCRM\nعالميًا:\n• WhatsApp، Slack، Google Workspace، HubSpot، Zapier/Make، APIs\nالخطوة التالية: ما الأدوات التي تستخدمها الآن؟",
    5: "وكلاء الذكاء الاصطناعي يتولون المحادثات ومهام المعرفة:\n• يردون على العملاء 24/7\n• يؤهلون العملاء المحتملين (أسئلة، تقييم، توجيه)\n• يجيبون باستخدام مستنداتك/الأسئلة الشائعة (knowledge base / RAG)\n• يحولون للحضور البشري عند الحاجة\nهم لا يستبدلون فريقك — بل يزيلون العمل المتكرر.\nالخطوة التالية: هل تريد وكيلاً للمبيعات أم للدعم أم لفريق داخلي؟",
    6: "نؤتمت CRM حتى لا تضيع الفرص:\n• التقاط العميل المحتمل → التأهيل → إنشاء الصفقة\n• متابعات وتذكيرات تلقائية\n• توجيه للمدير المناسب\n• تقارير ولوحات مبيعات\nيعمل مع Bitrix24 وamoCRM وHubSpot (حسب المنطقة).\nالخطوة التالية: أي CRM تستخدم؟",
    7: "نؤتمت سير عمل المحتوى:\n• تخطيط المحتوى + مسودات AI\n• نشر تلقائي (VK، Telegram، Rutube/YouTube)\n• توجيه التعليقات/الرسائل والتنبيهات\n• تحليلات التفاعل + تقارير للمالك\nالخطوة التالية: أي منصة أولوية لديك: VK أم Telegram أم Rutube أم YouTube؟",
    8: "نؤتمت التوظيف:\n• جمع السير الذاتية من النموذج/البريد\n• فرز وتصنيف بالذكاء الاصطناعي\n• ملخصات قصيرة للمرشحين لـ HR\n• إشعارات عبر Telegram/Email\n• تكامل اختياري مع CRM/ATS\nالخطوة التالية: كم سيرة ذاتية تعالجون أسبوعيًا؟",
    9: "نصمم أتمتة آمنة:\n• صلاحيات حسب الأدوار\n• تقليل جمع البيانات\n• تخزين آمن للمستندات\n• سجلات تدقيق (عند الحاجة)\nيمكننا تكييف المعمارية حسب متطلبات الامتثال (سحابة أو خاص).\nالخطوة التالية: هل تحتاج إلى تشغيل محلي/خاص؟",
    10: "خطوات البدء السريع:\n1) تدقيق مجاني (15–30 دقيقة)\n2) نرسم سير العمل ومؤشر النجاح\n3) نبني MVP خلال 7–14 يومًا\n4) دعم وتوسيع\nالخطوة التالية: هل تفضل تدقيقًا مجانيًا أم مكالمة استراتيجية؟",
    11: "سيناريوهات سريعة شائعة:\n• بوت استقبال عملاء → CRM → تذكيرات متابعة\n• وكيل دعم AI مدرب على FAQ/المستندات\n• فرز سير ذاتية → قائمة مختصرة → إشعارات Telegram\n• خط محتوى: خطة → توليد → نشر → تقرير\nالخطوة التالية: اختر واحدًا: مبيعات، دعم، موارد بشرية، أم محتوى.",
  },
};

const MENU_FOOTER: Record<ReplyLang, string> = {
  en: "Reply with a number to choose another topic, or type your question.",
  ru: "Ответьте числом, чтобы выбрать другую тему, или напишите свой вопрос.",
  ar: "يرجى الرد برقم لاختيار موضوع آخر، أو اكتب سؤالك.",
};

const LIVE_PROMPTS: Record<ReplyLang, Record<LiveStep, string>> = {
  en: {
    name: "Sure — I’ll connect you with a live agent. First, your name:",
    email: "Thanks! Your email:",
    contact: "Preferred contact: Telegram / WhatsApp / Email?",
    needs: "Briefly: what do you want to automate?",
    done: "I can help right now, and a live agent will follow up on your request.",
  },
  ru: {
    name: "Хорошо — я подключу живого агента. Сначала ваше имя:",
    email: "Спасибо! Ваш email:",
    contact: "Предпочтительный контакт: Telegram / WhatsApp / Email?",
    needs: "Кратко: что хотите автоматизировать?",
    done: "Я могу помочь прямо сейчас, и живой агент продолжит общение по вашему запросу.",
  },
  ar: {
    name: "حسنًا — سأوصلك بوكيل بشري. أولاً، ما اسمك؟",
    email: "شكرًا! بريدك الإلكتروني:",
    contact: "وسيلة التواصل المفضلة: Telegram / WhatsApp / Email؟",
    needs: "باختصار: ماذا تريد أن تؤتمت؟",
    done: "يمكنني المساعدة الآن، وسيتابع معك وكيل بشري طلبك.",
  },
};

const LIVE_CONFIRM: Record<ReplyLang, string> = {
  en: "Thanks, {name}! ✅\nI’m notifying a live agent now.\nYou’ll receive a verification/confirmation at {email}.\nWhile we wait, you can also share:\n• Your current tools (CRM, messengers, site)\n• Your main goal (more leads / faster support / lower workload)\nI’ll stay here and help until the agent joins.",
  ru: "Спасибо, {name}! ✅\nЯ уведомляю живого агента.\nВы получите подтверждение на {email}.\nПока мы ждём, можно также указать:\n• Ваши текущие инструменты (CRM, мессенджеры, сайт)\n• Главную цель (больше лидов / быстрее поддержка / меньше нагрузки)\nЯ останусь здесь и помогу, пока агент не подключится.",
  ar: "شكرًا، {name}! ✅\nأقوم الآن بإخطار وكيل بشري.\nستتلقى رسالة تأكيد على {email}.\nوأثناء الانتظار يمكنك مشاركة:\n• أدواتك الحالية (CRM، المراسلات، الموقع)\n• هدفك الأساسي (مزيد من العملاء / دعم أسرع / تقليل الحمل)\nسأبقى هنا وأساعدك حتى ينضم الوكيل.",
};

const CUSTOM_REPLY: Record<ReplyLang, string> = {
  en: "Got it — we can help with that. Share a bit about your workflow and tools so I can suggest the right approach.",
  ru: "Понял — мы можем с этим помочь. Расскажите немного про процесс и инструменты, чтобы я предложил лучший подход.",
  ar: "تم — يمكننا مساعدتك في ذلك. شاركني قليلاً عن سير العمل والأدوات حتى أقترح الأنسب.",
};

const CTA: Record<ReplyLang, string> = {
  en: "Next step: Book a call or request a free audit.",
  ru: "Следующий шаг: Забронировать звонок или запросить бесплатный аудит.",
  ar: "الخطوة التالية: احجز مكالمة أو اطلب تدقيقًا مجانيًا.",
};

const PICK_AGAIN: Record<ReplyLang, string> = {
  en: "Please reply 1 for chatbot or 2 for live agent.",
  ru: "Пожалуйста, ответьте 1 для чатбота или 2 для живого агента.",
  ar: "يرجى الرد بـ 1 للروبوت أو 2 للوكيل البشري.",
};

export function Chatbot() {
  const { lang: siteLang } = useLang();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [autoOpened, setAutoOpened] = useState(false);
  const [mode, setMode] = useState<Mode>("start");
  const [liveStep, setLiveStep] = useState<LiveStep>("name");
  const [liveInfo, setLiveInfo] = useState<LiveInfo>({});
  const [replyLang, setReplyLang] = useState<ReplyLang>("en");
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setReplyLang(siteLang);
    setMessages((prev) => {
      if (prev.length !== 1 || prev[0]?.id !== "b-welcome") return prev;
      if (prev[0].text === START_MESSAGE[siteLang]) return prev;
      return [{ ...prev[0], text: START_MESSAGE[siteLang] }];
    });
  }, [siteLang]);

  const playSound = (src: string) => {
    const sound = new Audio(src);
    void sound.play().catch(() => undefined);
  };

  const detectLang = (value: string): ReplyLang | undefined => {
    if (/[\u0600-\u06ff]/.test(value)) return "ar";
    if (/[\u0400-\u04ff]/.test(value)) return "ru";
    if (/[a-z]/i.test(value)) return "en";
    return undefined;
  };

  const getClosestTopic = (value: string) => {
    const text = value.toLowerCase();
    if (/(price|pricing|cost|budget|quote|цена|стоим|сколько|سعر|تكلفة)/.test(text)) {
      return 2;
    }
    if (/(timeline|time|delivery|срок|когда|مدة|وقت)/.test(text)) return 3;
    if (/(integrat|tool|api|интеграц|инструмент|تكامل)/.test(text)) return 4;
    if (/(agent|bot|чат|агент|وكيل)/.test(text)) return 5;
    if (/(crm|битрикс|amocrm|hubspot)/.test(text)) return 6;
    if (/(content|social|vk|telegram|rutube|youtube|контент|соц|محتوى|يوتيوب|تليجرام)/.test(text)) {
      return 7;
    }
    if (/(hr|resume|recruit|кадр|резюм|توظيف|سيرة)/.test(text)) return 8;
    if (/(security|privacy|secure|безопас|конфиден|أمان|خصوصية)/.test(text)) return 9;
    if (/(start|audit|call|нача|аудит|звон|ابدأ|تدقيق|مكالمة)/.test(text)) return 10;
    if (/(demo|example|сценар|пример|عرض|مثال)/.test(text)) return 11;
    return 1;
  };

  const getClosestLabel = (lang: ReplyLang, num: number) => {
    const labels: Record<ReplyLang, Record<number, string>> = {
      en: {
        1: "What services do you offer?",
        2: "Pricing (packages + monthly support)",
        3: "Timeline (how fast can you deliver?)",
        4: "Integrations (Russia + Global tools)",
        5: "AI Agents (what they do & how they work)",
        6: "CRM Automation (Bitrix24 / amoCRM / HubSpot)",
        7: "Social & Content Automation (VK/Telegram/Rutube/YouTube)",
        8: "HR / Resume Screening Automation",
        9: "Security & data privacy",
        10: "How to start (free audit / call booking)",
        11: "Examples / demo scenarios",
      },
      ru: {
        1: "Какие услуги вы предлагаете?",
        2: "Цены (пакеты + ежемесячная поддержка)",
        3: "Сроки (как быстро вы можете сделать?)",
        4: "Интеграции (Россия + глобальные инструменты)",
        5: "AI агенты (что они делают и как работают)",
        6: "CRM автоматизация (Bitrix24 / amoCRM / HubSpot)",
        7: "Соцсети и контент (VK/Telegram/Rutube/YouTube)",
        8: "HR / отбор резюме",
        9: "Безопасность и конфиденциальность данных",
        10: "Как начать (бесплатный аудит / созвон)",
        11: "Примеры / демо-сценарии",
      },
      ar: {
        1: "ما الخدمات التي تقدمونها؟",
        2: "الأسعار (الباقات + الدعم الشهري)",
        3: "المدة (كم تستغرقون للتنفيذ؟)",
        4: "التكاملات (أدوات روسيا + أدوات عالمية)",
        5: "وكلاء الذكاء الاصطناعي (ماذا يفعلون وكيف يعملون)",
        6: "أتمتة CRM (Bitrix24 / amoCRM / HubSpot)",
        7: "أتمتة المحتوى والسوشيال (VK/Telegram/Rutube/YouTube)",
        8: "أتمتة الموارد البشرية/فرز السير الذاتية",
        9: "الأمان وخصوصية البيانات",
        10: "كيف نبدأ (تدقيق مجاني / حجز مكالمة)",
        11: "أمثلة / سيناريوهات تجريبية",
      },
    };
    return labels[lang][num] ?? labels[lang][1];
  };

  const buildMenuResponse = (lang: ReplyLang, answer: string) => {
    return `${answer}\n\n${MENU_FOOTER[lang]}\n\n${MENU[lang]}`;
  };

  const buildCustomResponse = (lang: ReplyLang, text: string) => {
    const closest = getClosestTopic(text);
    const closestLabel = getClosestLabel(lang, closest);
    const suggestion =
      lang === "en"
        ? `Closest topic: ${closest}) ${closestLabel}`
        : lang === "ru"
          ? `Ближайшая тема: ${closest}) ${closestLabel}`
          : `أقرب موضوع: ${closest}) ${closestLabel}`;
    return buildMenuResponse(lang, `${CUSTOM_REPLY[lang]}\n${CTA[lang]}\n${suggestion}`);
  };

  const getFaqAnswer = (lang: ReplyLang, num: number) => {
    const answer = FAQ_ANSWERS[lang][num];
    return buildMenuResponse(lang, answer ?? FAQ_ANSWERS[lang][1]);
  };

  const handleUserInput = (text: string, attachment?: Message) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const isNumeric = /^[0-9]+$/.test(trimmed);
    const detectedLang = detectLang(trimmed);
    const lang = (isNumeric ? siteLang : detectedLang) ?? siteLang;
    setReplyLang(lang);

    let botText = "";
    if (mode === "start") {
      if (trimmed === "1") {
        setMode("faq");
        botText = MENU[lang];
      } else if (trimmed === "2") {
        setMode("live");
        setLiveStep("name");
        botText = LIVE_PROMPTS[lang].name;
      } else {
        botText = PICK_AGAIN[lang];
      }
    } else if (mode === "faq") {
      const number = Number(trimmed);
      if (Number.isInteger(number) && number >= 1 && number <= 11) {
        botText = getFaqAnswer(lang, number);
      } else if (trimmed === "12") {
        botText = buildCustomResponse(lang, trimmed);
      } else {
        botText = buildCustomResponse(lang, trimmed);
      }
    } else {
      if (liveStep === "name") {
        setLiveInfo((prev) => ({ ...prev, name: trimmed }));
        setLiveStep("email");
        botText = LIVE_PROMPTS[lang].email;
      } else if (liveStep === "email") {
        const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
        if (!emailOk) {
          botText =
            lang === "ru"
              ? "Пожалуйста, укажите корректный email."
              : lang === "ar"
                ? "يرجى إدخال بريد إلكتروني صحيح."
                : "Please enter a valid email.";
        } else {
          setLiveInfo((prev) => ({ ...prev, email: trimmed }));
          setLiveStep("contact");
          botText = LIVE_PROMPTS[lang].contact;
        }
      } else if (liveStep === "contact") {
        setLiveInfo((prev) => ({ ...prev, contact: trimmed }));
        setLiveStep("needs");
        botText = LIVE_PROMPTS[lang].needs;
      } else if (liveStep === "needs") {
        const name = liveInfo.name || "there";
        const email = liveInfo.email || "your email";
        setLiveInfo((prev) => ({ ...prev, needs: trimmed }));
        setLiveStep("done");
        botText = LIVE_CONFIRM[lang]
          .replace("{name}", name)
          .replace("{email}", email);
      } else {
        const number = Number(trimmed);
        if (Number.isInteger(number) && number >= 1 && number <= 11) {
          botText = `${FAQ_ANSWERS[lang][number]}\n\n${LIVE_PROMPTS[lang].done}`;
        } else {
          botText = `${CUSTOM_REPLY[lang]}\n${CTA[lang]}\n\n${LIVE_PROMPTS[lang].done}`;
        }
      }
    }

    const userMessage: Message = attachment ?? {
      id: `u-${Date.now()}`,
      role: "user",
      text: trimmed,
    };
    const botMessage: Message = {
      id: `b-${Date.now() + 1}`,
      role: "bot",
      text: botText,
    };
    setMessages((prev) => [...prev, userMessage, botMessage]);
    setInput("");
    playSound("/sounds/chat-open.ogg");
    setTimeout(() => playSound("/sounds/chat-open.ogg"), 300);
  };

  const sendAttachment = (file: File, type: "file" | "image" | "voice") => {
    const userMessage: Message = {
      id: `u-${Date.now()}`,
      role: "user",
      text:
        type === "voice"
          ? "Voice message (ready for integration)."
          : `Sent a ${type}.`,
      attachmentName: file.name,
      attachmentType: type,
    };
    handleUserInput(userMessage.text, userMessage);
  };

  useEffect(() => {
    const target = buttonRef.current;
    if (!target || autoOpened) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const isVisible = entries.some((entry) => entry.isIntersecting);
        if (!isVisible || autoOpened) return;
        setAutoOpened(true);
        setOpen(true);
        if (messages.length === 0) {
          setMessages([
            {
              id: "b-welcome",
              role: "bot",
              text: START_MESSAGE[replyLang],
            },
          ]);
          setMode("start");
          setLiveStep("name");
          setLiveInfo({});
          setReplyLang("en");
        }
        playSound("/sounds/chat-open.ogg");
      },
      { threshold: 0.6 },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [autoOpened, messages.length]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open && (
        <div className="card-surface mb-3 w-[460px] overflow-hidden rounded-2xl border border-edge bg-panel/90 shadow-xl md:w-[520px]">
          <div className="flex items-center justify-between border-b border-edge px-4 py-3">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted">
                Chatbot
              </p>
              <p className="font-display text-lg text-text">CustomFast</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-full border border-edge px-2 py-1 text-[10px] uppercase tracking-[0.3em] text-muted"
            >
              Close
            </button>
          </div>
          <div className="max-h-[380px] space-y-2 overflow-y-auto px-4 py-3 text-sm">
            {messages.length === 0 && (
              <p className="text-muted">
                Ask a question and we will route it to the right automation.
              </p>
            )}
            {messages.map((message) => (
              <div
                key={message.id}
                className={`rounded-xl px-2 py-1.5 ${
                  message.role === "user"
                    ? "bg-brand text-white"
                    : "border border-edge text-text"
                }`}
              >
                <p className="whitespace-pre-line">{message.text}</p>
                {message.attachmentName && (
                  <p
                    className={`mt-1 text-[10px] uppercase tracking-[0.2em] ${
                      message.role === "user"
                        ? "text-white/90"
                        : "text-text/80"
                    }`}
                  >
                    {message.attachmentType}: {message.attachmentName}
                  </p>
                )}
              </div>
            ))}
          </div>
          <div className="border-t border-edge px-4 py-3">
            <div className="mb-2 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="rounded-full border border-edge px-2 py-1 text-[10px] uppercase tracking-[0.3em] text-muted hover:text-text"
              >
                Attach file
              </button>
              <button
                type="button"
                onClick={() => imageInputRef.current?.click()}
                className="rounded-full border border-edge px-2 py-1 text-[10px] uppercase tracking-[0.3em] text-muted hover:text-text"
              >
                Attach image
              </button>
              <button
                type="button"
                onClick={() =>
                  sendAttachment(new File(["voice"], "voice-note.wav"), "voice")
                }
                className="rounded-full border border-edge px-2 py-1 text-[10px] uppercase tracking-[0.3em] text-muted hover:text-text"
              >
                Voice note
              </button>
            </div>
            <form
              className="flex items-center gap-2"
              onSubmit={(event) => {
                event.preventDefault();
                handleUserInput(input);
              }}
            >
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Type your message..."
                className="flex-1 rounded-full border border-edge bg-transparent px-3 py-1.5 text-xs"
              />
              <button
                type="submit"
                className="rounded-full bg-brand px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.3em] text-white"
              >
                Send
              </button>
            </form>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) sendAttachment(file, "file");
                event.target.value = "";
              }}
            />
            <input
              ref={imageInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) sendAttachment(file, "image");
                event.target.value = "";
              }}
            />
          </div>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        ref={buttonRef}
        className="hover-3d rounded-full bg-brand px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-white shadow-glow"
      >
        Chat
      </button>
    </div>
  );
}
