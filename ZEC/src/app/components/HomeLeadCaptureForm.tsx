"use client";

import { useState } from "react";
import type { Lang } from "@/lib/i18n";

const FORMSUBMIT_AJAX_ACTION = "https://formsubmit.co/ajax/dadfac2a7d526b24fe5d107c1b204f2e";

const labels = {
  en: {
    title: "Request an automation strategy call",
    subtitle: "Share your workflow context and we will map the fastest automation wins.",
    submit: "Request strategy call",
    success: "Request sent. We will respond within 1-2 business days.",
    error: "Submission failed. Please try again.",
    fields: {
      name: "Name",
      company: "Company",
      email: "Work Email",
      phone: "Phone",
      industry: "Industry",
      tools: "Current tools used",
      problem: "Main automation problem",
      leads: "Estimated monthly leads",
    },
  },
  ru: {
    title: "Запросить стратегический звонок",
    subtitle: "Опишите контекст процесса, и мы покажем самые быстрые automation-улучшения.",
    submit: "Запросить звонок",
    success: "Заявка отправлена. Ответим в течение 1-2 рабочих дней.",
    error: "Не удалось отправить заявку. Попробуйте еще раз.",
    fields: {
      name: "Имя",
      company: "Компания",
      email: "Рабочий Email",
      phone: "Телефон",
      industry: "Отрасль",
      tools: "Какие инструменты используете",
      problem: "Главная проблема автоматизации",
      leads: "Оценка лидов в месяц",
    },
  },
  ar: {
    title: "اطلب مكالمة استراتيجية للأتمتة",
    subtitle: "شارك تفاصيل سير العمل الحالي وسنحدد أسرع فرص التحسين.",
    submit: "طلب مكالمة استراتيجية",
    success: "تم إرسال الطلب. سنرد خلال 1-2 يوم عمل.",
    error: "فشل الإرسال. حاول مرة أخرى.",
    fields: {
      name: "الاسم",
      company: "الشركة",
      email: "البريد المهني",
      phone: "الهاتف",
      industry: "القطاع",
      tools: "الأدوات الحالية",
      problem: "أهم مشكلة أتمتة",
      leads: "العملاء المحتملون شهريا",
    },
  },
} as const;

export function HomeLeadCaptureForm({ lang }: { lang: Lang }) {
  const t = labels[lang];
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorDetail, setErrorDetail] = useState("");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formElement = event.currentTarget;
    if (!formElement.checkValidity()) {
      formElement.reportValidity();
      return;
    }

    setLoading(true);
    setStatus("idle");
    setErrorDetail("");

    const formData = new FormData(formElement);
    const name = String(formData.get("name") ?? "").trim();
    const company = String(formData.get("company") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const monthlyLeads = String(formData.get("leads") ?? "").trim();
    const currentTools = String(formData.get("tools") ?? "").trim();
    const mainProblem = String(formData.get("problem") ?? "").trim();
    const contactSubject = `New ZEC Homepage Strategy Call - ${name || "Unknown"} - ${company || "Unknown Company"}`;

    formData.set("monthlyLeads", monthlyLeads);
    formData.set("currentTools", currentTools);
    formData.set("mainProblem", mainProblem);
    formData.set("serviceInterest", "Strategy call");
    formData.set("budget", "");
    formData.set("language", lang.toUpperCase());
    formData.set("consent", "yes");
    formData.set("message", mainProblem || "Homepage strategy call request");
    formData.set("_subject", contactSubject);
    formData.set("_replyto", email);
    formData.set("_template", "table");
    formData.set("_captcha", "false");
    formData.set("_honey", String(formData.get("_honey") ?? ""));

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

      setStatus("success");
      formElement.reset();
    } catch (error) {
      setStatus("error");
      setErrorDetail(error instanceof Error ? error.message : "");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="schedule" className="scroll-mt-24 rounded-3xl border border-edge bg-panel p-6 md:p-8">
      <h2 className="font-display text-3xl text-text">{t.title}</h2>
      <p className="mt-2 text-sm text-muted">{t.subtitle}</p>

      <form onSubmit={onSubmit} className="mt-5 grid gap-4 md:grid-cols-2">
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_template" value="table" />
        <div className="md:col-span-2 hidden" aria-hidden="true">
          <label htmlFor="home-honeypot">Website</label>
          <input id="home-honeypot" name="_honey" tabIndex={-1} autoComplete="off" />
        </div>
        <label className="flex flex-col gap-2 text-sm text-muted">
          <span>{t.fields.name}</span>
          <input name="name" required className="rounded-xl border border-edge bg-panel2 px-4 py-2 text-text" />
        </label>
        <label className="flex flex-col gap-2 text-sm text-muted">
          <span>{t.fields.company}</span>
          <input name="company" required className="rounded-xl border border-edge bg-panel2 px-4 py-2 text-text" />
        </label>
        <label className="flex flex-col gap-2 text-sm text-muted">
          <span>{t.fields.email}</span>
          <input name="email" type="email" required className="rounded-xl border border-edge bg-panel2 px-4 py-2 text-text" />
        </label>
        <label className="flex flex-col gap-2 text-sm text-muted">
          <span>{t.fields.phone}</span>
          <input name="phone" className="rounded-xl border border-edge bg-panel2 px-4 py-2 text-text" />
        </label>
        <label className="flex flex-col gap-2 text-sm text-muted">
          <span>{t.fields.industry}</span>
          <input name="industry" required className="rounded-xl border border-edge bg-panel2 px-4 py-2 text-text" />
        </label>
        <label className="flex flex-col gap-2 text-sm text-muted">
          <span>{t.fields.leads}</span>
          <input name="leads" required className="rounded-xl border border-edge bg-panel2 px-4 py-2 text-text" />
        </label>
        <label className="flex flex-col gap-2 text-sm text-muted md:col-span-2">
          <span>{t.fields.tools}</span>
          <input name="tools" required className="rounded-xl border border-edge bg-panel2 px-4 py-2 text-text" />
        </label>
        <label className="flex flex-col gap-2 text-sm text-muted md:col-span-2">
          <span>{t.fields.problem}</span>
          <textarea name="problem" rows={4} required className="rounded-2xl border border-edge bg-panel2 px-4 py-3 text-text" />
        </label>
        <div className="md:col-span-2">
          <button type="submit" disabled={loading} className="rounded-full bg-brand px-6 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-white disabled:opacity-70">
            {loading ? "..." : t.submit}
          </button>
          {status === "success" ? <p className="mt-2 text-sm text-emerald-500">{t.success}</p> : null}
          {status === "error" ? <p className="mt-2 text-sm text-red-500">{errorDetail ? `${t.error} ${errorDetail}` : t.error}</p> : null}
        </div>
      </form>
    </section>
  );
}
