import { cookies } from "next/headers";
import { copy, type Lang } from "@/lib/i18n";
import { connectDb } from "@/lib/db";
import ProjectModel from "@/lib/models/Project";
import AppointmentModel from "@/lib/models/Appointment";

export const dynamic = "force-dynamic";

const parseLang = (value?: string): Lang => {
  if (!value) return "en";
  if (value.startsWith("ru")) return "ru";
  if (value.startsWith("ar")) return "ar";
  return "en";
};

export default async function DashboardPage() {
  const lang = parseLang(cookies().get("hulubet-lang")?.value);
  const t = copy[lang];

  await connectDb();
  const [projects, appointments] = await Promise.all([
    ProjectModel.find({}).sort({ createdAt: -1 }).limit(100).lean(),
    AppointmentModel.find({}).sort({ createdAt: -1 }).limit(100).lean(),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-3xl border border-edge bg-panel/80 p-6">
        <h1 className="font-display text-3xl">{t.dashboard.title}</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-edge bg-panel/80 p-4">
          <h2 className="font-display text-xl">{t.dashboard.projects}</h2>
          <div className="mt-4 space-y-3 text-sm text-muted">
            {projects.length === 0 ? (
              <p>{t.dashboard.emptyProjects}</p>
            ) : (
              projects.map((project) => (
                <div key={String(project._id)} className="border-b border-edge pb-3">
                  <p className="text-xs uppercase tracking-[0.3em] text-muted">
                    {project.status}
                  </p>
                  <p className="text-text">{project.company}</p>
                  <p>{project.name}</p>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="rounded-2xl border border-edge bg-panel/80 p-4">
          <h2 className="font-display text-xl">{t.dashboard.appointments}</h2>
          <div className="mt-4 space-y-3 text-sm text-muted">
            {appointments.length === 0 ? (
              <p>{t.dashboard.emptyAppointments}</p>
            ) : (
              appointments.map((appt) => (
                <div key={String(appt._id)} className="border-b border-edge pb-3">
                  <p className="text-xs uppercase tracking-[0.3em] text-muted">
                    {appt.status}
                  </p>
                  <p className="text-text">
                    {appt.date} · {appt.time}
                  </p>
                  <p>{appt.name}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
