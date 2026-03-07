import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Lang } from "@/lib/i18n";
import { connectDb } from "@/lib/db";
import AppointmentModel from "@/lib/models/Appointment";
import ProjectModel from "@/lib/models/Project";

export const dynamic = "force-dynamic";

const parseLang = (value?: string): Lang => {
  if (!value) return "en";
  if (value.startsWith("ru")) return "ru";
  if (value.startsWith("ar")) return "ar";
  return "en";
};

const labels = {
  en: {
    title: "Client Dashboard",
    projects: "Projects",
    appointments: "Appointments",
    emptyProjects: "No projects yet.",
    emptyAppointments: "No appointments yet.",
  },
  ru: {
    title: "Клиентский дашборд",
    projects: "Проекты",
    appointments: "Встречи",
    emptyProjects: "Пока нет проектов.",
    emptyAppointments: "Пока нет встреч.",
  },
  ar: {
    title: "لوحة العميل",
    projects: "المشاريع",
    appointments: "المواعيد",
    emptyProjects: "لا توجد مشاريع حاليا.",
    emptyAppointments: "لا توجد مواعيد حاليا.",
  },
} as const;

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const adminToken = process.env.ADMIN_TOKEN;
  const adminCookie = cookieStore.get("zec-admin-token")?.value;
  if (process.env.NODE_ENV === "production" && adminToken && adminCookie !== adminToken) {
    redirect("/auth");
  }

  const lang = parseLang(cookieStore.get("zec-lang")?.value);
  const t = labels[lang];

  await connectDb();
  const [projects, appointments] = await Promise.all([
    ProjectModel.find({}).sort({ createdAt: -1 }).limit(100).lean(),
    AppointmentModel.find({}).sort({ createdAt: -1 }).limit(100).lean(),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-3xl border border-edge bg-panel p-6">
        <h1 className="font-display text-3xl text-text">{t.title}</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-edge bg-panel p-4">
          <h2 className="font-display text-xl text-text">{t.projects}</h2>
          <div className="mt-4 space-y-3 text-sm text-muted">
            {projects.length === 0 ? (
              <p>{t.emptyProjects}</p>
            ) : (
              projects.map((project) => (
                <div key={String(project._id)} className="border-b border-edge pb-3">
                  <p className="text-xs uppercase tracking-[0.3em] text-muted">{project.status}</p>
                  <p className="text-text">{project.company}</p>
                  <p>{project.name}</p>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-edge bg-panel p-4">
          <h2 className="font-display text-xl text-text">{t.appointments}</h2>
          <div className="mt-4 space-y-3 text-sm text-muted">
            {appointments.length === 0 ? (
              <p>{t.emptyAppointments}</p>
            ) : (
              appointments.map((appointment) => (
                <div key={String(appointment._id)} className="border-b border-edge pb-3">
                  <p className="text-xs uppercase tracking-[0.3em] text-muted">{appointment.status}</p>
                  <p className="text-text">
                    {appointment.date} • {appointment.time}
                  </p>
                  <p>{appointment.name}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
