"use client";

import { useState } from "react";
import { copy } from "@/lib/i18n";
import { useLang } from "@/lib/lang";

export default function ProjectsPage() {
  const { lang } = useLang();
  const t = copy[lang];
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>([]);

  const toggleNeed = (need: string) => {
    setSelectedNeeds((prev) =>
      prev.includes(need) ? prev.filter((item) => item !== need) : [...prev, need],
    );
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setStatus("idle");

    const formData = new FormData(event.currentTarget);
    const files = formData.getAll("files").filter((file) => file instanceof File);

    const fileUrls: string[] = [];
    try {
      for (const file of files) {
        const actualFile = file as File;
        if (!actualFile.name) continue;
        const response = await fetch("/api/uploads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            filename: actualFile.name,
            contentType: actualFile.type,
          }),
        });
        if (!response.ok) {
          throw new Error("Upload init failed");
        }
        const data = (await response.json()) as { uploadUrl: string; publicUrl: string };
        await fetch(data.uploadUrl, {
          method: "PUT",
          headers: { "Content-Type": actualFile.type },
          body: actualFile,
        });
        fileUrls.push(data.publicUrl);
      }

      const payload = {
        name: String(formData.get("name") ?? ""),
        company: String(formData.get("company") ?? ""),
        email: String(formData.get("email") ?? ""),
        phone: String(formData.get("phone") ?? ""),
        budget: String(formData.get("budget") ?? ""),
        timeline: String(formData.get("timeline") ?? ""),
        needs: selectedNeeds,
        details: String(formData.get("details") ?? ""),
        fileUrls,
      };

      const submit = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!submit.ok) {
        throw new Error("Submit failed");
      }
      event.currentTarget.reset();
      setSelectedNeeds([]);
      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
      <div className="rounded-3xl border border-edge bg-panel/80 p-8">
        <h1 className="font-display text-3xl">{t.forms.projectTitle}</h1>
        <p className="mt-3 text-sm text-muted">{t.sections.valueText}</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-3xl border border-edge bg-panel/80 p-6"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm">
            <span>{t.forms.name}</span>
            <input
              name="name"
              required
              className="rounded-xl border border-edge bg-transparent px-4 py-2"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm">
            <span>{t.forms.company}</span>
            <input
              name="company"
              required
              className="rounded-xl border border-edge bg-transparent px-4 py-2"
            />
          </label>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm">
            <span>{t.forms.email}</span>
            <input
              name="email"
              type="email"
              required
              className="rounded-xl border border-edge bg-transparent px-4 py-2"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm">
            <span>{t.forms.phone}</span>
            <input
              name="phone"
              className="rounded-xl border border-edge bg-transparent px-4 py-2"
            />
          </label>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm">
            <span>{t.forms.budget}</span>
            <input
              name="budget"
              className="rounded-xl border border-edge bg-transparent px-4 py-2"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm">
            <span>{t.forms.timeline}</span>
            <input
              name="timeline"
              className="rounded-xl border border-edge bg-transparent px-4 py-2"
            />
          </label>
        </div>
        <div className="space-y-2 text-sm">
          <span>{t.forms.needs}</span>
          <div className="flex flex-wrap gap-2">
            {t.forms.needsOptions.map((need) => (
              <button
                type="button"
                key={need}
                onClick={() => toggleNeed(need)}
                className={`rounded-full border px-3 py-1 text-xs uppercase tracking-wide ${
                  selectedNeeds.includes(need)
                    ? "border-brand bg-brand text-white"
                    : "border-edge text-muted"
                }`}
              >
                {need}
              </button>
            ))}
          </div>
        </div>
        <label className="flex flex-col gap-2 text-sm">
          <span>{t.forms.details}</span>
          <textarea
            name="details"
            rows={4}
            className="rounded-2xl border border-edge bg-transparent px-4 py-3"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm">
          <span>{t.forms.upload}</span>
          <input
            name="files"
            type="file"
            multiple
            className="rounded-xl border border-edge bg-transparent px-4 py-2 text-sm"
          />
        </label>
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-brand px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white disabled:opacity-70"
        >
          {loading ? "..." : t.forms.submit}
        </button>
        {status === "success" && (
          <p className="text-sm text-emerald-500">{t.forms.success}</p>
        )}
        {status === "error" && (
          <p className="text-sm text-brand">{t.forms.error}</p>
        )}
      </form>
    </div>
  );
}
