"use client";

import { useEffect, useMemo, useState } from "react";
import type { Lang } from "@/lib/i18n";

type ContactFormState = {
  name: string;
  company: string;
  email: string;
  phone: string;
  industry: string;
  monthlyLeads: string;
  serviceInterest: string;
  budget: string;
  currentTools: string;
  mainProblem: string;
  message: string;
  language: string;
  consent: boolean;
  honeypot: string;
  companyWebsite: string;
};

type ContactFormOption = {
  value: string;
  label: string;
};

type ContactFormCopy = {
  title: string;
  subtitle: string;
  responseNote: string;
  confirmSubmit: string;
  successMessage: string;
  errorMessage: string;
  submit: string;
  submitting: string;
  selectService: string;
  selectBudget: string;
  consent: string;
  labels: {
    name: string;
    company: string;
    email: string;
    phone: string;
    industry: string;
    monthlyLeads: string;
    serviceInterest: string;
    budget: string;
    currentTools: string;
    mainProblem: string;
    message: string;
    language: string;
  };
  placeholders: {
    name: string;
    company: string;
    email: string;
    phone: string;
    industry: string;
    monthlyLeads: string;
    currentTools: string;
    mainProblem: string;
    message: string;
  };
  serviceOptions: ContactFormOption[];
  budgetOptions: ContactFormOption[];
  languageOptions: ContactFormOption[];
};

const FORMSUBMIT_AJAX_ACTION = "https://formsubmit.co/ajax/dadfac2a7d526b24fe5d107c1b204f2e";

const COPY_BY_LANG: Record<Lang, ContactFormCopy> = {
  en: {
    title: "Contact ZEC AI Automation Agency",
    subtitle: "Tell us what you want to automate and what tools you currently use.",
    responseNote: "We usually respond within 1-2 business days.",
    confirmSubmit: "Confirm and submit?",
    successMessage: "Thanks for contacting ZEC AI Automation Agency. We received your request and will follow up within 2-5 business days.",
    errorMessage: "Something went wrong. Please try again.",
    submit: "Send request",
    submitting: "Submitting...",
    selectService: "Select service",
    selectBudget: "Select budget",
    consent: "By submitting this form you agree to our Privacy Policy.",
    labels: {
      name: "Name",
      company: "Company",
      email: "Email",
      phone: "Phone",
      industry: "Industry",
      monthlyLeads: "Estimated monthly leads",
      serviceInterest: "Service interest",
      budget: "Budget range (optional)",
      currentTools: "Current tools used",
      mainProblem: "Main automation problem",
      message: "Message",
      language: "Language",
    },
    placeholders: {
      name: "Your name",
      company: "Company name",
      email: "you@company.com",
      phone: "+1...",
      industry: "Example: Agency",
      monthlyLeads: "Example: 200",
      currentTools: "HubSpot, Telegram, Google Sheets, etc.",
      mainProblem: "Where does manual work slow your team down?",
      message: "Describe your workflow, tools, and goals.",
    },
    serviceOptions: [
      { value: "Lead automation", label: "Lead automation" },
      { value: "CRM integration", label: "CRM integration" },
      { value: "AI workflow automation", label: "AI workflow automation" },
      { value: "Operations automation", label: "Operations automation" },
      { value: "Website automation", label: "Website automation" },
      { value: "Custom automation system", label: "Custom automation system" },
    ],
    budgetOptions: [
      { value: "$500 - $2,000", label: "$500 - $2,000" },
      { value: "$2,000 - $5,000", label: "$2,000 - $5,000" },
      { value: "$5,000 - $10,000", label: "$5,000 - $10,000" },
      { value: "$10,000+", label: "$10,000+" },
    ],
    languageOptions: [
      { value: "EN", label: "English" },
      { value: "RU", label: "Russian" },
      { value: "AR", label: "Arabic" },
    ],
  },
  ru: {
    title: "Связаться с ZEC AI Automation Agency",
    subtitle: "Расскажите, что вы хотите автоматизировать и какие инструменты уже используете.",
    responseNote: "Обычно отвечаем в течение 1-2 рабочих дней.",
    confirmSubmit: "Подтвердить и отправить?",
    successMessage: "Спасибо за обращение в ZEC AI Automation Agency. Мы получили вашу заявку и ответим в течение 2-5 рабочих дней.",
    errorMessage: "Что-то пошло не так. Попробуйте еще раз.",
    submit: "Отправить заявку",
    submitting: "Отправка...",
    selectService: "Выберите услугу",
    selectBudget: "Выберите бюджет",
    consent: "Отправляя форму, вы соглашаетесь с нашей Политикой конфиденциальности.",
    labels: {
      name: "Имя",
      company: "Компания",
      email: "Email",
      phone: "Телефон",
      industry: "Сфера деятельности",
      monthlyLeads: "Оценка лидов в месяц",
      serviceInterest: "Интересующая услуга",
      budget: "Диапазон бюджета (опционально)",
      currentTools: "Текущие инструменты",
      mainProblem: "Главная проблема автоматизации",
      message: "Сообщение",
      language: "Язык",
    },
    placeholders: {
      name: "Ваше имя",
      company: "Название компании",
      email: "you@company.com",
      phone: "+7...",
      industry: "Пример: Агентство",
      monthlyLeads: "Пример: 200",
      currentTools: "HubSpot, Telegram, Google Sheets и т.д.",
      mainProblem: "Где ручная работа сильнее всего замедляет вашу команду?",
      message: "Опишите ваш процесс, инструменты и цель.",
    },
    serviceOptions: [
      { value: "Lead automation", label: "Автоматизация лидов" },
      { value: "CRM integration", label: "Интеграция с CRM" },
      { value: "AI workflow automation", label: "AI-автоматизация процессов" },
      { value: "Operations automation", label: "Автоматизация операций" },
      { value: "Website automation", label: "Автоматизация сайта" },
      { value: "Custom automation system", label: "Индивидуальная система автоматизации" },
    ],
    budgetOptions: [
      { value: "$500 - $2,000", label: "$500 - $2,000" },
      { value: "$2,000 - $5,000", label: "$2,000 - $5,000" },
      { value: "$5,000 - $10,000", label: "$5,000 - $10,000" },
      { value: "$10,000+", label: "$10,000+" },
    ],
    languageOptions: [
      { value: "EN", label: "Английский" },
      { value: "RU", label: "Русский" },
      { value: "AR", label: "Арабский" },
    ],
  },
  ar: {
    title: "تواصل مع ZEC AI Automation Agency",
    subtitle: "أخبرنا بما تريد أتمتته وما الأدوات التي تستخدمها حاليا.",
    responseNote: "نرد عادة خلال 1-2 يوم عمل.",
    confirmSubmit: "تأكيد وإرسال؟",
    successMessage: "شكرا لتواصلك مع ZEC AI Automation Agency. استلمنا طلبك وسنرد خلال 2-5 أيام عمل.",
    errorMessage: "حدث خطأ ما. حاول مرة أخرى.",
    submit: "إرسال الطلب",
    submitting: "جار الإرسال...",
    selectService: "اختر الخدمة",
    selectBudget: "اختر الميزانية",
    consent: "بإرسال هذا النموذج أنت توافق على سياسة الخصوصية الخاصة بنا.",
    labels: {
      name: "الاسم",
      company: "الشركة",
      email: "البريد الإلكتروني",
      phone: "الهاتف",
      industry: "المجال",
      monthlyLeads: "عدد العملاء المحتملين شهريا",
      serviceInterest: "الخدمة المطلوبة",
      budget: "نطاق الميزانية (اختياري)",
      currentTools: "الأدوات الحالية المستخدمة",
      mainProblem: "أهم مشكلة في الأتمتة",
      message: "الرسالة",
      language: "اللغة",
    },
    placeholders: {
      name: "اسمك",
      company: "اسم الشركة",
      email: "you@company.com",
      phone: "+971...",
      industry: "مثال: وكالة",
      monthlyLeads: "مثال: 200",
      currentTools: "HubSpot, Telegram, Google Sheets وغيرها",
      mainProblem: "أين يبطئ العمل اليدوي فريقك أكثر شيء؟",
      message: "اشرح سير العمل الحالي والأدوات والهدف.",
    },
    serviceOptions: [
      { value: "Lead automation", label: "أتمتة العملاء المحتملين" },
      { value: "CRM integration", label: "تكامل CRM" },
      { value: "AI workflow automation", label: "أتمتة سير العمل بالذكاء الاصطناعي" },
      { value: "Operations automation", label: "أتمتة العمليات" },
      { value: "Website automation", label: "أتمتة الموقع" },
      { value: "Custom automation system", label: "نظام أتمتة مخصص" },
    ],
    budgetOptions: [
      { value: "$500 - $2,000", label: "$500 - $2,000" },
      { value: "$2,000 - $5,000", label: "$2,000 - $5,000" },
      { value: "$5,000 - $10,000", label: "$5,000 - $10,000" },
      { value: "$10,000+", label: "$10,000+" },
    ],
    languageOptions: [
      { value: "EN", label: "الإنجليزية" },
      { value: "RU", label: "الروسية" },
      { value: "AR", label: "العربية" },
    ],
  },
};

const createInitialState = (lang: Lang): ContactFormState => ({
  name: "",
  company: "",
  email: "",
  phone: "",
  industry: "",
  monthlyLeads: "",
  serviceInterest: "",
  budget: "",
  currentTools: "",
  mainProblem: "",
  message: "",
  language: lang.toUpperCase(),
  consent: false,
  honeypot: "",
  companyWebsite: "",
});

export function ContactRequestForm({ lang }: { lang: Lang }) {
  const copy = useMemo(() => COPY_BY_LANG[lang], [lang]);
  const [form, setForm] = useState<ContactFormState>(() => createInitialState(lang));
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    setForm((prev) => ({ ...prev, language: lang.toUpperCase() }));
  }, [lang]);

  const update = <K extends keyof ContactFormState>(key: K, value: ContactFormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (status !== "idle") {
      setStatus("idle");
      setErrorText("");
    }
  };

  const contactSubject = `New ZEC Contact Request - ${form.name.trim() || "Unknown"} - ${form.company.trim() || "Unknown Company"}`;

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formElement = event.currentTarget;
    if (!formElement.checkValidity()) {
      formElement.reportValidity();
      return;
    }

    if (!window.confirm(copy.confirmSubmit)) {
      return;
    }

    setLoading(true);
    setStatus("idle");
    setErrorText("");

    const formData = new FormData(formElement);
    formData.set("_subject", contactSubject);
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

      setForm(createInitialState(lang));
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorText(copy.errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="schedule" className="scroll-mt-24 rounded-3xl border border-edge bg-panel p-6 md:p-8">
      <h2 className="font-display text-3xl text-text">{copy.title}</h2>
      <p className="mt-2 text-sm text-muted">{copy.subtitle}</p>
      <p className="mt-1 text-xs text-muted">{copy.responseNote}</p>

      <form onSubmit={onSubmit} className="mt-6 grid gap-4 md:grid-cols-2">
        <input type="hidden" name="_subject" value={contactSubject} />
        <input type="hidden" name="_replyto" value={form.email} />
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_template" value="table" />

        <label className="flex flex-col gap-2 text-sm text-muted">
          <span>{copy.labels.name}</span>
          <input
            name="name"
            value={form.name}
            onChange={(event) => update("name", event.target.value)}
            placeholder={copy.placeholders.name}
            required
            className="rounded-xl border border-edge bg-panel2 px-4 py-2 text-text"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm text-muted">
          <span>{copy.labels.company}</span>
          <input
            name="company"
            value={form.company}
            onChange={(event) => update("company", event.target.value)}
            placeholder={copy.placeholders.company}
            required
            className="rounded-xl border border-edge bg-panel2 px-4 py-2 text-text"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm text-muted">
          <span>{copy.labels.email}</span>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={(event) => update("email", event.target.value)}
            placeholder={copy.placeholders.email}
            required
            className="rounded-xl border border-edge bg-panel2 px-4 py-2 text-text"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm text-muted">
          <span>{copy.labels.phone}</span>
          <input
            name="phone"
            type="tel"
            value={form.phone}
            onChange={(event) => update("phone", event.target.value)}
            placeholder={copy.placeholders.phone}
            className="rounded-xl border border-edge bg-panel2 px-4 py-2 text-text"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm text-muted">
          <span>{copy.labels.industry}</span>
          <input
            name="industry"
            value={form.industry}
            onChange={(event) => update("industry", event.target.value)}
            placeholder={copy.placeholders.industry}
            required
            className="rounded-xl border border-edge bg-panel2 px-4 py-2 text-text"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm text-muted">
          <span>{copy.labels.monthlyLeads}</span>
          <input
            name="monthlyLeads"
            value={form.monthlyLeads}
            onChange={(event) => update("monthlyLeads", event.target.value)}
            placeholder={copy.placeholders.monthlyLeads}
            required
            className="rounded-xl border border-edge bg-panel2 px-4 py-2 text-text"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm text-muted">
          <span>{copy.labels.serviceInterest}</span>
          <select
            name="serviceInterest"
            value={form.serviceInterest}
            onChange={(event) => update("serviceInterest", event.target.value)}
            required
            className="rounded-xl border border-edge bg-panel2 px-4 py-2 text-text"
          >
            <option value="">{copy.selectService}</option>
            {copy.serviceOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2 text-sm text-muted">
          <span>{copy.labels.budget}</span>
          <select
            name="budget"
            value={form.budget}
            onChange={(event) => update("budget", event.target.value)}
            className="rounded-xl border border-edge bg-panel2 px-4 py-2 text-text"
          >
            <option value="">{copy.selectBudget}</option>
            {copy.budgetOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2 text-sm text-muted md:col-span-2">
          <span>{copy.labels.currentTools}</span>
          <input
            name="currentTools"
            value={form.currentTools}
            onChange={(event) => update("currentTools", event.target.value)}
            placeholder={copy.placeholders.currentTools}
            required
            className="rounded-xl border border-edge bg-panel2 px-4 py-2 text-text"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm text-muted md:col-span-2">
          <span>{copy.labels.mainProblem}</span>
          <textarea
            name="mainProblem"
            rows={3}
            value={form.mainProblem}
            onChange={(event) => update("mainProblem", event.target.value)}
            placeholder={copy.placeholders.mainProblem}
            required
            className="rounded-2xl border border-edge bg-panel2 px-4 py-3 text-text"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm text-muted md:col-span-2">
          <span>{copy.labels.message}</span>
          <textarea
            name="message"
            rows={4}
            value={form.message}
            onChange={(event) => update("message", event.target.value)}
            placeholder={copy.placeholders.message}
            required
            className="rounded-2xl border border-edge bg-panel2 px-4 py-3 text-text"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm text-muted md:max-w-xs">
          <span>{copy.labels.language}</span>
          <select
            name="language"
            value={form.language}
            onChange={(event) => update("language", event.target.value)}
            className="rounded-xl border border-edge bg-panel2 px-4 py-2 text-text"
          >
            {copy.languageOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <div className="md:col-span-2 hidden" aria-hidden="true">
          <label htmlFor="contact-honeypot">Website</label>
          <input
            id="contact-honeypot"
            name="_honey"
            value={form.honeypot}
            onChange={(event) => update("honeypot", event.target.value)}
            tabIndex={-1}
            autoComplete="off"
          />
          <label htmlFor="contact-company-website">Company website</label>
          <input
            id="contact-company-website"
            name="companyWebsite"
            value={form.companyWebsite}
            onChange={(event) => update("companyWebsite", event.target.value)}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <label className="md:col-span-2 flex items-start gap-2 rounded-xl border border-edge bg-panel2 px-3 py-2 text-sm text-muted">
          <input name="consent" type="checkbox" value="yes" required checked={form.consent} onChange={(event) => update("consent", event.target.checked)} className="mt-0.5 h-4 w-4" />
          <span>{copy.consent}</span>
        </label>

        <div className="md:col-span-2 flex flex-wrap items-center gap-3">
          <button type="submit" disabled={loading} className="rounded-full bg-brand px-6 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-white disabled:opacity-70">
            {loading ? copy.submitting : copy.submit}
          </button>
          {status === "success" ? <p className="text-sm text-emerald-500">{copy.successMessage}</p> : null}
          {status === "error" ? <p className="text-sm text-red-500">{errorText}</p> : null}
        </div>
      </form>
    </section>
  );
}
