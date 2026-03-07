"use client";

import { useMemo, useState } from "react";
import type { Lang } from "@/lib/i18n";
import { decodeMojibakeDeep } from "@/lib/text";

const FORMSUBMIT_AJAX_ACTION = "https://formsubmit.co/ajax/dadfac2a7d526b24fe5d107c1b204f2e";

type OnboardingValues = {
  name: string;
  company: string;
  email: string;
  phone: string;
  budget: string;
  timeline: string;
  businessOverview: string;
  workflowDescription: string;
  toolsUsed: string;
  teamSize: string;
  automationGoals: string[];
  automationGoalsNotes: string;
  securityRequirements: string[];
  securityNotes: string;
  dataSources: string[];
  communicationChannels: string[];
  honeypot: string;
  sendClientCopy: boolean;
};

type OnboardingErrorKey = keyof OnboardingValues | "general";
type OnboardingErrors = Partial<Record<OnboardingErrorKey, string>>;

type Copy = {
  title: string;
  subtitle: string;
  submit: string;
  submitting: string;
  success: string;
  error: string;
  confirmSubmit?: string;
  yesLabel?: string;
  noLabel?: string;
  nextSteps: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  budget: string;
  timeline: string;
  businessContext: string;
  businessOverview: string;
  workflowDescription: string;
  toolsUsed: string;
  teamSize: string;
  automationGoals: string;
  customGoals: string;
  securityRequirements: string;
  securityNotes: string;
  dataSources: string;
  communicationChannels: string;
  sendCopy: string;
  rateLimited: string;
  commaSeparated: string;
  selectBudget: string;
  selectTimeline: string;
  selectTeamSize: string;
  placeholders: {
    name: string;
    company: string;
    phone: string;
    businessOverview: string;
    workflowDescription: string;
    toolsUsed: string;
    customGoals: string;
    securityNotes: string;
  };
  errors: {
    name: string;
    company: string;
    emailRequired: string;
    emailInvalid: string;
    phone: string;
    timeline: string;
    businessOverview: string;
    workflowDescription: string;
    toolsUsed: string;
    teamSize: string;
    automationGoals: string;
    communicationChannels: string;
  };
  honeypotWebsite: string;
};

const COPY_BY_LANG: Record<Lang, Copy> = {
  en: {
    title: "Client Onboarding Form",
    subtitle: "For approved projects, complete this onboarding brief so we can build your automation blueprint quickly.",
    submit: "Submit Onboarding",
    submitting: "Submitting...",
    success: "Onboarding details submitted successfully.",
    error: "Unable to submit onboarding. Please try again.",
    confirmSubmit: "Confirm and submit?",
    yesLabel: "Yes",
    noLabel: "No",
    nextSteps: "Next steps: we review your workflow and send implementation milestones.",
    name: "Full Name *",
    company: "Company *",
    email: "Work Email *",
    phone: "Phone",
    budget: "Budget Range",
    timeline: "Preferred Timeline *",
    businessContext: "Business Context",
    businessOverview: "Business Overview *",
    workflowDescription: "Current Workflow Description *",
    toolsUsed: "Tools Used *",
    teamSize: "Team Size *",
    automationGoals: "Automation Goals",
    customGoals: "Custom automation goals (optional)",
    securityRequirements: "Security Requirements",
    securityNotes: "Security notes (optional)",
    dataSources: "Data Sources",
    communicationChannels: "Communication Channels *",
    sendCopy: "Email me a copy of this onboarding brief.",
    rateLimited: "Submissions are rate limited and checked for spam.",
    commaSeparated: "Comma-separated values.",
    selectBudget: "Select budget range",
    selectTimeline: "Select timeline",
    selectTeamSize: "Select team size",
    placeholders: {
      name: "Your full name",
      company: "Company name",
      phone: "+1 555 123 4567",
      businessOverview: "What does your company do, who is your customer, and what is your main operating model?",
      workflowDescription: "Describe trigger, manual steps, delays, handoffs, and current bottlenecks.",
      toolsUsed: "n8n, HubSpot, Telegram, Google Sheets",
      customGoals: "Add custom goals, KPI targets, or constraints.",
      securityNotes: "Share compliance policies, retention rules, or approval requirements.",
    },
    errors: {
      name: "Full name is required.",
      company: "Company is required.",
      emailRequired: "Work email is required.",
      emailInvalid: "Enter a valid email.",
      phone: "Enter a valid international phone number.",
      timeline: "Select a preferred timeline.",
      businessOverview: "Business overview is required.",
      workflowDescription: "Current workflow description is required.",
      toolsUsed: "Add at least one tool.",
      teamSize: "Team size is required.",
      automationGoals: "Select at least one automation goal or add a custom goal.",
      communicationChannels: "Select at least one communication channel.",
    },
    honeypotWebsite: "Website",
  },
  ru: {
    title: "Форма онбординга клиента",
    subtitle: "Для утвержденных проектов заполните этот бриф, чтобы мы быстрее собрали ваш automation-план.",
    submit: "Отправить онбординг",
    submitting: "Отправка...",
    success: "Данные онбординга успешно отправлены.",
    error: "Не удалось отправить онбординг. Попробуйте еще раз.",
    nextSteps: "Следующий шаг: мы изучим ваш процесс и отправим этапы внедрения.",
    name: "Полное имя *",
    company: "Компания *",
    email: "Рабочий email *",
    phone: "Телефон",
    budget: "Диапазон бюджета",
    timeline: "Желаемый срок *",
    businessContext: "Контекст бизнеса",
    businessOverview: "Описание бизнеса *",
    workflowDescription: "Текущее описание процесса *",
    toolsUsed: "Используемые инструменты *",
    teamSize: "Размер команды *",
    automationGoals: "Цели автоматизации",
    customGoals: "Дополнительные цели автоматизации (опционально)",
    securityRequirements: "Требования безопасности",
    securityNotes: "Заметки по безопасности (опционально)",
    dataSources: "Источники данных",
    communicationChannels: "Каналы коммуникации *",
    sendCopy: "Отправить копию этого брифа на мой email.",
    rateLimited: "Отправки ограничены по частоте и проверяются на спам.",
    commaSeparated: "Значения через запятую.",
    selectBudget: "Выберите бюджет",
    selectTimeline: "Выберите срок",
    selectTeamSize: "Выберите размер команды",
    placeholders: {
      name: "Ваше полное имя",
      company: "Название компании",
      phone: "+7 900 123 45 67",
      businessOverview: "Чем занимается компания, кто ваш клиент и какая модель работы основная?",
      workflowDescription: "Опишите триггер, ручные шаги, задержки, передачи и текущие узкие места.",
      toolsUsed: "n8n, HubSpot, Telegram, Google Sheets",
      customGoals: "Добавьте KPI, цели или ограничения.",
      securityNotes: "Укажите политики комплаенса, хранение данных или требования к согласованию.",
    },
    errors: {
      name: "Укажите полное имя.",
      company: "Укажите компанию.",
      emailRequired: "Укажите рабочий email.",
      emailInvalid: "Введите корректный email.",
      phone: "Введите корректный международный номер телефона.",
      timeline: "Выберите желаемый срок.",
      businessOverview: "Описание бизнеса обязательно.",
      workflowDescription: "Описание текущего процесса обязательно.",
      toolsUsed: "Добавьте минимум один инструмент.",
      teamSize: "Укажите размер команды.",
      automationGoals: "Выберите минимум одну цель автоматизации или добавьте свою.",
      communicationChannels: "Выберите минимум один канал коммуникации.",
    },
    honeypotWebsite: "Сайт",
  },
  ar: {
    title: "نموذج تأهيل العميل",
    subtitle: "للمشاريع المعتمدة، أكمل هذا النموذج حتى نُعد مخطط الأتمتة بسرعة.",
    submit: "إرسال النموذج",
    submitting: "جار الإرسال...",
    success: "تم إرسال بيانات التأهيل بنجاح.",
    error: "تعذر إرسال النموذج. حاول مرة أخرى.",
    nextSteps: "الخطوة التالية: نراجع سير العمل ونرسل مراحل التنفيذ.",
    name: "الاسم الكامل *",
    company: "الشركة *",
    email: "بريد العمل *",
    phone: "الهاتف",
    budget: "نطاق الميزانية",
    timeline: "الإطار الزمني المفضل *",
    businessContext: "سياق العمل",
    businessOverview: "نظرة عامة على النشاط *",
    workflowDescription: "وصف سير العمل الحالي *",
    toolsUsed: "الأدوات المستخدمة *",
    teamSize: "حجم الفريق *",
    automationGoals: "أهداف الأتمتة",
    customGoals: "أهداف أتمتة مخصصة (اختياري)",
    securityRequirements: "متطلبات الأمان",
    securityNotes: "ملاحظات الأمان (اختياري)",
    dataSources: "مصادر البيانات",
    communicationChannels: "قنوات التواصل *",
    sendCopy: "أرسل نسخة من هذا النموذج إلى بريدي الإلكتروني.",
    rateLimited: "عمليات الإرسال محدودة ومحمية من الرسائل المزعجة.",
    commaSeparated: "أدخل القيم مفصولة بفواصل.",
    selectBudget: "اختر نطاق الميزانية",
    selectTimeline: "اختر الإطار الزمني",
    selectTeamSize: "اختر حجم الفريق",
    placeholders: {
      name: "اسمك الكامل",
      company: "اسم الشركة",
      phone: "+971 50 123 4567",
      businessOverview: "ما طبيعة شركتك، من هو العميل المستهدف، وما نموذج التشغيل الأساسي؟",
      workflowDescription: "صف المشغل، الخطوات اليدوية، التأخيرات، التحويلات، والاختناقات الحالية.",
      toolsUsed: "n8n, HubSpot, Telegram, Google Sheets",
      customGoals: "أضف أهدافا مخصصة أو مؤشرات KPI أو قيودا.",
      securityNotes: "شارك سياسات الامتثال، قواعد الاحتفاظ، أو متطلبات الموافقة.",
    },
    errors: {
      name: "الاسم الكامل مطلوب.",
      company: "اسم الشركة مطلوب.",
      emailRequired: "بريد العمل مطلوب.",
      emailInvalid: "أدخل بريدا إلكترونيا صالحا.",
      phone: "أدخل رقم هاتف دولي صالح.",
      timeline: "اختر الإطار الزمني المفضل.",
      businessOverview: "نظرة عامة على النشاط مطلوبة.",
      workflowDescription: "وصف سير العمل الحالي مطلوب.",
      toolsUsed: "أضف أداة واحدة على الأقل.",
      teamSize: "حجم الفريق مطلوب.",
      automationGoals: "اختر هدف أتمتة واحدا على الأقل أو أضف هدفا مخصصا.",
      communicationChannels: "اختر قناة تواصل واحدة على الأقل.",
    },
    honeypotWebsite: "الموقع",
  },
};

const budgetOptions = ["$0-$500", "$500-$2k", "$2k-$5k", "$5k+"] as const;
const timelineOptions = ["ASAP", "1-2 weeks", "2-4 weeks", "1-2 months"] as const;
const teamSizeOptions = ["1-5", "6-15", "16-50", "51-200", "200+"] as const;

const automationGoalOptions = [
  "Lead capture and routing",
  "CRM data sync",
  "Support workflow automation",
  "AI drafting with approval",
  "Reporting and analytics automation",
  "Website conversion automation",
  "Operations workflow automation",
] as const;

const securityOptions = [
  "Least-privilege access",
  "Human approval required for sensitive actions",
  "Audit logs and monitoring",
  "Data residency requirements",
  "PII masking or redaction",
] as const;

const dataSourceOptions = ["Website forms", "CRM", "Email", "WhatsApp", "Telegram", "Sheets", "Database", "Ads", "Other"] as const;
const communicationOptions = ["Email", "WhatsApp", "Telegram", "Slack", "Zoom"] as const;

type OptionLabels = {
  budget: Record<string, string>;
  timeline: Record<string, string>;
  teamSize: Record<string, string>;
  automationGoals: Record<string, string>;
  security: Record<string, string>;
  dataSources: Record<string, string>;
  communication: Record<string, string>;
};

const OPTION_LABELS_BY_LANG: Partial<Record<Lang, OptionLabels>> = {
  ru: {
    budget: {},
    timeline: {
      ASAP: "Как можно скорее",
      "1-2 weeks": "1-2 недели",
      "2-4 weeks": "2-4 недели",
      "1-2 months": "1-2 месяца",
    },
    teamSize: {},
    automationGoals: {
      "Lead capture and routing": "Захват и маршрутизация лидов",
      "CRM data sync": "Синхронизация данных CRM",
      "Support workflow automation": "Автоматизация поддержки",
      "AI drafting with approval": "AI-черновики с ручным подтверждением",
      "Reporting and analytics automation": "Автоматизация отчетов и аналитики",
      "Website conversion automation": "Автоматизация конверсии сайта",
      "Operations workflow automation": "Автоматизация операционных процессов",
    },
    security: {
      "Least-privilege access": "Доступ по принципу наименьших привилегий",
      "Human approval required for sensitive actions": "Ручное подтверждение для чувствительных действий",
      "Audit logs and monitoring": "Аудит-логи и мониторинг",
      "Data residency requirements": "Требования к локализации данных",
      "PII masking or redaction": "Маскирование или редактирование персональных данных",
    },
    dataSources: {
      "Website forms": "Формы на сайте",
      CRM: "CRM",
      Email: "Email",
      WhatsApp: "WhatsApp",
      Telegram: "Telegram",
      Sheets: "Таблицы",
      Database: "База данных",
      Ads: "Реклама",
      Other: "Другое",
    },
    communication: {
      Email: "Email",
      WhatsApp: "WhatsApp",
      Telegram: "Telegram",
      Slack: "Slack",
      Zoom: "Zoom",
    },
  },
  ar: {
    budget: {},
    timeline: {
      ASAP: "في أقرب وقت",
      "1-2 weeks": "1-2 أسبوع",
      "2-4 weeks": "2-4 أسابيع",
      "1-2 months": "1-2 شهر",
    },
    teamSize: {},
    automationGoals: {
      "Lead capture and routing": "التقاط العملاء المحتملين وتوجيههم",
      "CRM data sync": "مزامنة بيانات CRM",
      "Support workflow automation": "أتمتة سير عمل الدعم",
      "AI drafting with approval": "مسودات ذكاء اصطناعي مع موافقة بشرية",
      "Reporting and analytics automation": "أتمتة التقارير والتحليلات",
      "Website conversion automation": "أتمتة تحويل الموقع",
      "Operations workflow automation": "أتمتة سير عمل العمليات",
    },
    security: {
      "Least-privilege access": "وصول بأقل صلاحيات",
      "Human approval required for sensitive actions": "موافقة بشرية مطلوبة للخطوات الحساسة",
      "Audit logs and monitoring": "سجلات تدقيق ومراقبة",
      "Data residency requirements": "متطلبات إقامة البيانات",
      "PII masking or redaction": "إخفاء أو تنقيح البيانات الشخصية",
    },
    dataSources: {
      "Website forms": "نماذج الموقع",
      CRM: "CRM",
      Email: "البريد الإلكتروني",
      WhatsApp: "واتساب",
      Telegram: "تلغرام",
      Sheets: "الجداول",
      Database: "قاعدة البيانات",
      Ads: "الإعلانات",
      Other: "أخرى",
    },
    communication: {
      Email: "البريد الإلكتروني",
      WhatsApp: "واتساب",
      Telegram: "تلغرام",
      Slack: "سلاك",
      Zoom: "زووم",
    },
  },
};

const resolveOptionLabel = (labels: Record<string, string> | undefined, value: string) => labels?.[value] ?? value;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const isPhoneValid = (value: string) => {
  const normalized = value.replace(/[^\d+]/g, "").trim();
  if (!normalized) {
    return true;
  }
  if (normalized.startsWith("+")) {
    return /^\+\d{7,15}$/.test(normalized);
  }
  return /^\d{7,15}$/.test(normalized);
};

const parseTags = (value: string) => [...new Set(value.split(",").map((tag) => tag.trim()).filter(Boolean))].slice(0, 12);

const createInitialValues = (): OnboardingValues => ({
  name: "",
  company: "",
  email: "",
  phone: "",
  budget: "",
  timeline: "",
  businessOverview: "",
  workflowDescription: "",
  toolsUsed: "",
  teamSize: "",
  automationGoals: [],
  automationGoalsNotes: "",
  securityRequirements: [],
  securityNotes: "",
  dataSources: [],
  communicationChannels: [],
  honeypot: "",
  sendClientCopy: true,
});

const toggleSelection = (current: string[], value: string) => (current.includes(value) ? current.filter((item) => item !== value) : [...current, value]);

const SectionTitle = ({ children }: { children: string }) => <h3 className="font-display text-lg text-text">{children}</h3>;

export function ClientOnboardingForm({ lang }: { lang: Lang }) {
  const t = useMemo(() => decodeMojibakeDeep(COPY_BY_LANG[lang]), [lang]);
  const optionLabels = OPTION_LABELS_BY_LANG[lang];
  const confirmSubmit =
    t.confirmSubmit ??
    (lang === "ru" ? "Подтвердить и отправить?" : lang === "ar" ? "تأكيد وإرسال؟" : "Confirm and submit?");
  const yesLabel = t.yesLabel ?? (lang === "ru" ? "Да" : lang === "ar" ? "نعم" : "Yes");
  const noLabel = t.noLabel ?? (lang === "ru" ? "Нет" : lang === "ar" ? "لا" : "No");
  const [form, setForm] = useState<OnboardingValues>(createInitialValues);
  const [errors, setErrors] = useState<OnboardingErrors>({});
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [submitError, setSubmitError] = useState("");

  const toolsList = useMemo(() => parseTags(form.toolsUsed), [form.toolsUsed]);

  const updateField = <K extends keyof OnboardingValues>(key: K, value: OnboardingValues[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined, general: undefined }));
    if (submitStatus !== "idle") {
      setSubmitStatus("idle");
      setSubmitError("");
    }
  };

  const validate = () => {
    const nextErrors: OnboardingErrors = {};
    if (!form.name.trim()) nextErrors.name = t.errors.name;
    if (!form.company.trim()) nextErrors.company = t.errors.company;
    if (!form.email.trim()) nextErrors.email = t.errors.emailRequired;
    else if (!emailRegex.test(form.email.trim())) nextErrors.email = t.errors.emailInvalid;
    if (form.phone.trim() && !isPhoneValid(form.phone)) nextErrors.phone = t.errors.phone;
    if (!form.timeline) nextErrors.timeline = t.errors.timeline;
    if (!form.businessOverview.trim()) nextErrors.businessOverview = t.errors.businessOverview;
    if (!form.workflowDescription.trim()) nextErrors.workflowDescription = t.errors.workflowDescription;
    if (parseTags(form.toolsUsed).length === 0) nextErrors.toolsUsed = t.errors.toolsUsed;
    if (!form.teamSize) nextErrors.teamSize = t.errors.teamSize;
    if (form.automationGoals.length === 0 && !form.automationGoalsNotes.trim()) nextErrors.automationGoals = t.errors.automationGoals;
    if (form.communicationChannels.length === 0) nextErrors.communicationChannels = t.errors.communicationChannels;
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const onboardingSubject = `New ZEC Onboarding Submission - ${form.name.trim() || "Unknown"} - ${form.company.trim() || "Unknown Company"}`;
  const onboardingDetails = [
    `Business Overview: ${form.businessOverview.trim()}`,
    `Current Workflow Description: ${form.workflowDescription.trim()}`,
    `Tools Used: ${parseTags(form.toolsUsed).join(", ") || "Not provided"}`,
    `Team Size: ${form.teamSize || "Not provided"}`,
    `Automation Goals: ${form.automationGoals.join(", ") || "Not selected"}`,
    `Custom Automation Goals: ${form.automationGoalsNotes.trim() || "Not provided"}`,
    `Security Requirements: ${form.securityRequirements.join(", ") || "Not selected"}`,
    `Security Notes: ${form.securityNotes.trim() || "Not provided"}`,
    `Data Sources: ${form.dataSources.join(", ") || "Not selected"}`,
    `Communication Channels: ${form.communicationChannels.join(", ") || "Not selected"}`,
    `Send client copy requested: ${form.sendClientCopy ? yesLabel : noLabel}`,
  ].join("\n");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formElement = event.currentTarget;
    if (!formElement.checkValidity()) {
      formElement.reportValidity();
      return;
    }

    if (!validate()) {
      return;
    }

    if (!window.confirm(confirmSubmit)) {
      return;
    }

    setLoading(true);
    setSubmitStatus("idle");
    setSubmitError("");

    const formData = new FormData(formElement);
    formData.set("_subject", onboardingSubject);
    formData.set("_replyto", form.email.trim());
    formData.set("_template", "table");
    formData.set("_captcha", "false");
    formData.set("_honey", form.honeypot);

    try {
      const response = await fetch(FORMSUBMIT_AJAX_ACTION, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });
      const data = (await response.json().catch(() => null)) as { success?: string | boolean; message?: string } | null;
      const succeeded = data?.success === true || data?.success === "true";

      if (!response.ok || !succeeded) {
        throw new Error(data?.message || "submit-failed");
      }

      setForm(createInitialValues());
      setErrors({});
      setSubmitStatus("success");
    } catch {
      setSubmitStatus("error");
      setSubmitError(t.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="rounded-3xl border border-edge bg-panel p-6">
      <h2 className="font-display text-2xl text-text">{t.title}</h2>
      <p className="mt-2 text-sm text-muted">{t.subtitle}</p>

      <form onSubmit={onSubmit} className="mt-5 space-y-6">
        <input type="hidden" name="_subject" value={onboardingSubject} />
        <input type="hidden" name="_replyto" value={form.email} />
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_template" value="table" />
        <input type="hidden" name="details" value={onboardingDetails} />

        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm text-muted">
            <span>{t.name}</span>
            <input name="name" required value={form.name} onChange={(event) => updateField("name", event.target.value)} className={`rounded-xl border bg-panel2 px-4 py-2 text-text ${errors.name ? "border-red-500" : "border-edge"}`} placeholder={t.placeholders.name} />
            {errors.name ? <p className="text-xs text-red-500">{errors.name}</p> : null}
          </label>
          <label className="flex flex-col gap-2 text-sm text-muted">
            <span>{t.company}</span>
            <input name="company" required value={form.company} onChange={(event) => updateField("company", event.target.value)} className={`rounded-xl border bg-panel2 px-4 py-2 text-text ${errors.company ? "border-red-500" : "border-edge"}`} placeholder={t.placeholders.company} />
            {errors.company ? <p className="text-xs text-red-500">{errors.company}</p> : null}
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm text-muted">
            <span>{t.email}</span>
            <input name="email" required type="email" value={form.email} onChange={(event) => updateField("email", event.target.value)} className={`rounded-xl border bg-panel2 px-4 py-2 text-text ${errors.email ? "border-red-500" : "border-edge"}`} placeholder="you@company.com" />
            {errors.email ? <p className="text-xs text-red-500">{errors.email}</p> : null}
          </label>
          <label className="flex flex-col gap-2 text-sm text-muted">
            <span>{t.phone}</span>
            <input name="phone" type="tel" value={form.phone} onChange={(event) => updateField("phone", event.target.value)} className={`rounded-xl border bg-panel2 px-4 py-2 text-text ${errors.phone ? "border-red-500" : "border-edge"}`} placeholder={t.placeholders.phone} />
            {errors.phone ? <p className="text-xs text-red-500">{errors.phone}</p> : null}
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm text-muted">
            <span>{t.budget}</span>
            <select name="budget" value={form.budget} onChange={(event) => updateField("budget", event.target.value)} className="rounded-xl border border-edge bg-panel2 px-4 py-2 text-text">
              <option value="">{t.selectBudget}</option>
              {budgetOptions.map((option) => (
                <option key={option} value={option}>
                  {resolveOptionLabel(optionLabels?.budget, option)}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-2 text-sm text-muted">
            <span>{t.timeline}</span>
            <select name="timeline" required value={form.timeline} onChange={(event) => updateField("timeline", event.target.value)} className={`rounded-xl border bg-panel2 px-4 py-2 text-text ${errors.timeline ? "border-red-500" : "border-edge"}`}>
              <option value="">{t.selectTimeline}</option>
              {timelineOptions.map((option) => (
                <option key={option} value={option}>
                  {resolveOptionLabel(optionLabels?.timeline, option)}
                </option>
              ))}
            </select>
            {errors.timeline ? <p className="text-xs text-red-500">{errors.timeline}</p> : null}
          </label>
        </div>

        <div className="space-y-4">
          <SectionTitle>{t.businessContext}</SectionTitle>
          <label className="flex flex-col gap-2 text-sm text-muted">
            <span>{t.businessOverview}</span>
            <textarea name="businessOverview" required rows={4} value={form.businessOverview} onChange={(event) => updateField("businessOverview", event.target.value)} className={`rounded-2xl border bg-panel2 px-4 py-3 text-text ${errors.businessOverview ? "border-red-500" : "border-edge"}`} placeholder={t.placeholders.businessOverview} />
            {errors.businessOverview ? <p className="text-xs text-red-500">{errors.businessOverview}</p> : null}
          </label>

          <label className="flex flex-col gap-2 text-sm text-muted">
            <span>{t.workflowDescription}</span>
            <textarea name="workflowDescription" required rows={5} value={form.workflowDescription} onChange={(event) => updateField("workflowDescription", event.target.value)} className={`rounded-2xl border bg-panel2 px-4 py-3 text-text ${errors.workflowDescription ? "border-red-500" : "border-edge"}`} placeholder={t.placeholders.workflowDescription} />
            {errors.workflowDescription ? <p className="text-xs text-red-500">{errors.workflowDescription}</p> : null}
          </label>

          <label className="flex flex-col gap-2 text-sm text-muted">
            <span>{t.toolsUsed}</span>
            <input name="toolsUsed" required value={form.toolsUsed} onChange={(event) => updateField("toolsUsed", event.target.value)} className={`rounded-xl border bg-panel2 px-4 py-2 text-text ${errors.toolsUsed ? "border-red-500" : "border-edge"}`} placeholder={t.placeholders.toolsUsed} />
            <p className="text-xs text-muted">{t.commaSeparated}</p>
            {toolsList.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {toolsList.map((tool) => (
                  <span key={tool} className="rounded-full border border-edge bg-panel2 px-3 py-1 text-[11px] text-text">
                    {tool}
                  </span>
                ))}
              </div>
            ) : null}
            {errors.toolsUsed ? <p className="text-xs text-red-500">{errors.toolsUsed}</p> : null}
          </label>

          <label className="flex flex-col gap-2 text-sm text-muted md:max-w-xs">
            <span>{t.teamSize}</span>
            <select name="teamSize" required value={form.teamSize} onChange={(event) => updateField("teamSize", event.target.value)} className={`rounded-xl border bg-panel2 px-4 py-2 text-text ${errors.teamSize ? "border-red-500" : "border-edge"}`}>
              <option value="">{t.selectTeamSize}</option>
              {teamSizeOptions.map((option) => (
                <option key={option} value={option}>
                  {resolveOptionLabel(optionLabels?.teamSize, option)}
                </option>
              ))}
            </select>
            {errors.teamSize ? <p className="text-xs text-red-500">{errors.teamSize}</p> : null}
          </label>
        </div>

        <div className="space-y-4">
          <SectionTitle>{t.automationGoals}</SectionTitle>
          <div className="grid gap-2 md:grid-cols-2">
            {automationGoalOptions.map((option) => (
              <label key={option} className="flex items-start gap-2 rounded-xl border border-edge bg-panel2 px-3 py-2 text-sm text-muted">
                <input
                  name="automationGoals"
                  type="checkbox"
                  value={option}
                  checked={form.automationGoals.includes(option)}
                  onChange={() => updateField("automationGoals", toggleSelection(form.automationGoals, option))}
                  className="mt-0.5 h-4 w-4"
                />
                <span>{resolveOptionLabel(optionLabels?.automationGoals, option)}</span>
              </label>
            ))}
          </div>
          <label className="flex flex-col gap-2 text-sm text-muted">
            <span>{t.customGoals}</span>
            <textarea name="automationGoalsNotes" rows={3} value={form.automationGoalsNotes} onChange={(event) => updateField("automationGoalsNotes", event.target.value)} className="rounded-2xl border border-edge bg-panel2 px-4 py-3 text-text" placeholder={t.placeholders.customGoals} />
          </label>
          {errors.automationGoals ? <p className="text-xs text-red-500">{errors.automationGoals}</p> : null}
        </div>

        <div className="space-y-4">
          <SectionTitle>{t.securityRequirements}</SectionTitle>
          <div className="grid gap-2 md:grid-cols-2">
            {securityOptions.map((option) => (
              <label key={option} className="flex items-start gap-2 rounded-xl border border-edge bg-panel2 px-3 py-2 text-sm text-muted">
                <input
                  name="securityRequirements"
                  type="checkbox"
                  value={option}
                  checked={form.securityRequirements.includes(option)}
                  onChange={() => updateField("securityRequirements", toggleSelection(form.securityRequirements, option))}
                  className="mt-0.5 h-4 w-4"
                />
                <span>{resolveOptionLabel(optionLabels?.security, option)}</span>
              </label>
            ))}
          </div>
          <label className="flex flex-col gap-2 text-sm text-muted">
            <span>{t.securityNotes}</span>
            <textarea name="securityNotes" rows={3} value={form.securityNotes} onChange={(event) => updateField("securityNotes", event.target.value)} className="rounded-2xl border border-edge bg-panel2 px-4 py-3 text-text" placeholder={t.placeholders.securityNotes} />
          </label>
        </div>

        <div className="space-y-4">
          <SectionTitle>{t.dataSources}</SectionTitle>
          <div className="grid gap-2 md:grid-cols-3">
            {dataSourceOptions.map((option) => (
              <label key={option} className="flex items-start gap-2 rounded-xl border border-edge bg-panel2 px-3 py-2 text-sm text-muted">
                <input
                  name="dataSources"
                  type="checkbox"
                  value={option}
                  checked={form.dataSources.includes(option)}
                  onChange={() => updateField("dataSources", toggleSelection(form.dataSources, option))}
                  className="mt-0.5 h-4 w-4"
                />
                <span>{resolveOptionLabel(optionLabels?.dataSources, option)}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <SectionTitle>{t.communicationChannels}</SectionTitle>
          <div className="grid gap-2 md:grid-cols-3">
            {communicationOptions.map((option) => (
              <label key={option} className="flex items-start gap-2 rounded-xl border border-edge bg-panel2 px-3 py-2 text-sm text-muted">
                <input
                  name="communicationChannels"
                  type="checkbox"
                  value={option}
                  checked={form.communicationChannels.includes(option)}
                  onChange={() => updateField("communicationChannels", toggleSelection(form.communicationChannels, option))}
                  className="mt-0.5 h-4 w-4"
                />
                <span>{resolveOptionLabel(optionLabels?.communication, option)}</span>
              </label>
            ))}
          </div>
          {errors.communicationChannels ? <p className="text-xs text-red-500">{errors.communicationChannels}</p> : null}
        </div>

        <div className="hidden" aria-hidden="true">
          <label htmlFor="onboarding-honeypot">{t.honeypotWebsite}</label>
          <input id="onboarding-honeypot" name="_honey" type="text" tabIndex={-1} autoComplete="off" value={form.honeypot} onChange={(event) => updateField("honeypot", event.target.value)} />
        </div>

        <label className="flex items-start gap-2 rounded-xl border border-edge bg-panel2 px-3 py-2 text-sm text-muted">
          <input name="sendClientCopy" type="checkbox" value="yes" checked={form.sendClientCopy} onChange={(event) => updateField("sendClientCopy", event.target.checked)} className="mt-0.5 h-4 w-4" />
          <span>{t.sendCopy}</span>
        </label>

        <div className="flex flex-wrap items-center gap-3">
          <button type="submit" disabled={loading} className="rounded-full bg-brand px-6 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-white disabled:opacity-70">
            {loading ? t.submitting : t.submit}
          </button>
          <p className="text-xs text-muted">{t.rateLimited}</p>
          {submitStatus === "success" ? <p className="text-sm text-emerald-500">{t.success}</p> : null}
          {submitStatus === "error" ? <p className="text-sm text-red-500">{submitError || t.error}</p> : null}
        </div>
      </form>
    </section>
  );
}
