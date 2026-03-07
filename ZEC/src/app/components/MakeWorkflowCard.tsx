"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Lang } from "@/lib/i18n";
import { WorkflowInteractiveImage } from "./WorkflowInteractiveImage";

const labels = {
  en: {
    title: "Workflow Preview",
    helper: "Real n8n workflow screenshot",
    flowTitle: "Form Submission -> Format Data -> Create PDF -> Gmail + Drive",
    statusTitle: "Steps shown in this workflow",
    statusItems: [
      "Form submission trigger received",
      "Data formatted for document fields",
      "PDF generated and delivered to Gmail and Google Drive",
    ],
    live: "Live",
    viewWorkflow: "View workflow examples",
  },
  ru: {
    title: "Превью workflow",
    helper: "Реальный скриншот workflow в n8n",
    flowTitle: "Отправка формы -> Форматирование -> PDF -> Gmail + Drive",
    statusTitle: "Шаги в этом workflow",
    statusItems: [
      "Получен триггер отправки формы",
      "Данные подготовлены для полей документа",
      "PDF создан и отправлен в Gmail и Google Drive",
    ],
    live: "Live",
    viewWorkflow: "Смотреть примеры workflow",
  },
  ar: {
    title: "معاينة سير العمل",
    helper: "لقطة حقيقية لمسار n8n",
    flowTitle: "إرسال النموذج -> تنسيق البيانات -> إنشاء PDF -> Gmail + Drive",
    statusTitle: "الخطوات في هذا المسار",
    statusItems: [
      "تم استقبال مشغل إرسال النموذج",
      "تم تنسيق البيانات لحقول المستند",
      "تم إنشاء PDF وإرساله إلى Gmail وGoogle Drive",
    ],
    live: "مباشر",
    viewWorkflow: "عرض أمثلة المسارات",
  },
} as const;

export function MakeWorkflowCard({ lang }: { lang: Lang }) {
  const t = labels[lang] ?? labels.en;
  const isRtl = lang === "ar";
  const [statusIndex, setStatusIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setStatusIndex((value) => (value + 1) % t.statusItems.length);
    }, 2500);
    return () => window.clearInterval(timer);
  }, [t.statusItems.length]);

  return (
    <div className="hero-workflow-card rounded-3xl border border-edge bg-panel p-4">
      <div className={`flex items-start justify-between gap-3 ${isRtl ? "text-right" : "text-left"}`}>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted">{t.title}</p>
          <p className="mt-1 text-[10px] text-muted">{t.helper}</p>
          <p className="mt-2 text-[10px] uppercase tracking-[0.14em] text-brand/90">{t.flowTitle}</p>
        </div>
        <span className="hero-live-soft inline-flex rounded-full border border-brand/35 bg-brand/10 px-2.5 py-1 text-[9px] uppercase tracking-[0.16em] text-brand">
          {t.live}
        </span>
      </div>

      <div className="mt-3">
        <div className="overflow-hidden rounded-2xl border border-edge/80 bg-panel2">
          <WorkflowInteractiveImage
            src="/images/real-workflows/n8n-home-workflow.png"
            alt="Real n8n workflow screenshot preview"
            width={1060}
            height={350}
          />
        </div>
      </div>

      <div className={`mt-3 rounded-xl border border-edge/80 bg-panel2 p-3 ${isRtl ? "text-right" : "text-left"}`}>
        <p className="text-[10px] uppercase tracking-[0.18em] text-muted">{t.statusTitle}</p>
        <div className="mt-2 space-y-1.5 text-xs">
          {t.statusItems.map((item, index) => (
            <p
              key={item}
              className={`flex items-center gap-2 transition-opacity duration-200 ${
                statusIndex === index ? "text-text opacity-100" : "text-muted opacity-55"
              }`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${statusIndex === index ? "bg-brand shadow-[0_0_0_3px_hsl(var(--accent)/0.18)]" : "bg-muted/40"}`} />
              <span>{item}</span>
            </p>
          ))}
        </div>
      </div>

      <div className={`mt-3 flex ${isRtl ? "justify-end" : "justify-start"}`}>
        <Link href="/workflows#workflow-diagram" className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand hover:text-brand/80">
          {t.viewWorkflow}
        </Link>
      </div>
    </div>
  );
}
