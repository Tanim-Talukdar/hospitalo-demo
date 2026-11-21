
import {
  FiUsers,
  FiCalendar,
  FiUserCheck,
  FiClock,
  FiArrowUpRight,
  FiArrowDownRight,
  FiMoreHorizontal,
  FiPlus,
  FiActivity,
  FiFileText,
  FiCheckCircle,
  FiDollarSign,
} from "react-icons/fi";

const stats = [
  {
    label: "Total Patients",
    value: "2,845",
    change: "+12.8%",
    positive: true,
    description: "Compared to last month",
    icon: FiUsers,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    label: "Today's Appointments",
    value: "128",
    change: "+8.2%",
    positive: true,
    description: "Compared to yesterday",
    icon: FiCalendar,
    iconBg: "bg-violet-50",
    iconColor: "text-violet-600",
  },
  {
    label: "Available Doctors",
    value: "24",
    change: "18 active",
    positive: true,
    description: "Across 8 departments",
    icon: FiUserCheck,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    label: "Waiting Patients",
    value: "16",
    change: "Avg. 18 min",
    positive: false,
    description: "Current waiting time",
    icon: FiClock,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
  },
];

const appointments = [
  {
    name: "Ayesha Rahman",
    id: "PT-00241",
    doctor: "Dr. Sarah Ahmed",
    department: "Cardiology",
    time: "09:30 AM",
    status: "Confirmed",
    color: "bg-blue-100 text-blue-700",
  },
  {
    name: "Mahmud Hasan",
    id: "PT-00242",
    doctor: "Dr. Michael Rahman",
    department: "Neurology",
    time: "10:00 AM",
    status: "Waiting",
    color: "bg-amber-100 text-amber-700",
  },
  {
    name: "Nusrat Jahan",
    id: "PT-00243",
    doctor: "Dr. Emily Wilson",
    department: "Ophthalmology",
    time: "10:30 AM",
    status: "Completed",
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    name: "Tanvir Ahmed",
    id: "PT-00244",
    doctor: "Dr. James Anderson",
    department: "Orthopedics",
    time: "11:00 AM",
    status: "Confirmed",
    color: "bg-blue-100 text-blue-700",
  },
];

const queue = [
  { serial: "220", name: "Ayesha Rahman", doctor: "Dr. Sarah Ahmed", status: "Consulting" },
  { serial: "221", name: "Mahmud Hasan", doctor: "Dr. Sarah Ahmed", status: "Next" },
  { serial: "222", name: "Nusrat Jahan", doctor: "Dr. Sarah Ahmed", status: "Waiting" },
];

const activities = [
  {
    title: "New patient registered",
    detail: "Ayesha Rahman · PT-00241",
    time: "5 minutes ago",
    icon: FiUsers,
    color: "bg-blue-50 text-blue-600",
  },
  {
    title: "Appointment completed",
    detail: "Dr. Michael Rahman · Neurology",
    time: "18 minutes ago",
    icon: FiCheckCircle,
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    title: "Lab report uploaded",
    detail: "Patient ID: PT-00198",
    time: "32 minutes ago",
    icon: FiFileText,
    color: "bg-violet-50 text-violet-600",
  },
];

function SectionHeading({ title, subtitle, action }) {
  return (
    <div className="mb-5 flex items-center justify-between gap-3">
      <div>
        <h2 className="text-[15px] font-bold text-slate-800">{title}</h2>
        {subtitle && (
          <p className="mt-1 text-xs text-slate-400">{subtitle}</p>
        )}
      </div>
      {action}
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <div className="mx-auto max-w-[1600px] space-y-7">
      {/* Page heading */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[1.5px] text-blue-600">
            Hospital overview
          </p>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-[28px]">
            Good morning, Administrator
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Here's what's happening at your hospital today.
          </p>
        </div>

        <button className="flex items-center justify-center gap-2 rounded-xl bg-[#1769B2] px-4 py-3 text-xs font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700">
          <FiPlus size={16} />
          Add New Patient
        </button>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500">
                    {stat.label}
                  </p>
                  <h3 className="mt-3 text-[28px] font-bold tracking-tight text-slate-900">
                    {stat.value}
                  </h3>
                </div>
                <div className={`rounded-xl p-3 ${stat.iconBg} ${stat.iconColor}`}>
                  <Icon size={20} />
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span
                  className={`flex items-center gap-1 text-[11px] font-bold ${
                    stat.positive ? "text-emerald-600" : "text-amber-600"
                  }`}
                >
                  {stat.positive ? (
                    <FiArrowUpRight size={13} />
                  ) : (
                    <FiClock size={13} />
                  )}
                  {stat.change}
                </span>
                <span className="text-[11px] text-slate-400">
                  {stat.description}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main grid */}
      <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        {/* Appointment overview */}
        <section className="min-w-0 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
          <SectionHeading
            title="Recent Appointments"
            subtitle="Overview of the latest patient appointments"
            action={
              <button className="text-xs font-semibold text-blue-600 transition hover:text-blue-800">
                View all
              </button>
            }
          />

          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] text-left">
              <thead>
                <tr className="border-y border-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  <th className="py-3 pr-4">Patient</th>
                  <th className="py-3 pr-4">Doctor</th>
                  <th className="py-3 pr-4">Time</th>
                  <th className="py-3 pr-4">Status</th>
                  <th className="py-3 text-right"> </th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment, index) => (
                  <tr
                    key={appointment.id}
                    className="border-b border-slate-50 last:border-0"
                  >
                    <td className="py-4 pr-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[11px] font-bold text-slate-600">
                          {appointment.name
                            .split(" ")
                            .map((word) => word[0])
                            .join("")}
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-slate-800">
                            {appointment.name}
                          </p>
                          <p className="mt-1 text-[10px] text-slate-400">
                            {appointment.id}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 pr-4">
                      <p className="text-xs font-medium text-slate-700">
                        {appointment.doctor}
                      </p>
                      <p className="mt-1 text-[10px] text-slate-400">
                        {appointment.department}
                      </p>
                    </td>
                    <td className="py-4 pr-4 text-xs text-slate-600">
                      {appointment.time}
                    </td>
                    <td className="py-4 pr-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${appointment.color}`}
                      >
                        {appointment.status}
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      <button
                        aria-label={`More options for ${appointment.name}`}
                        className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
                      >
                        <FiMoreHorizontal size={17} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Queue */}
        <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
          <SectionHeading
            title="Live Patient Queue"
            subtitle="Cardiology · Dr. Sarah Ahmed"
            action={
              <span className="flex items-center gap-1.5 text-[10px] font-semibold text-emerald-600">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Demo
              </span>
            }
          />

          <div className="rounded-2xl bg-[#101C35] p-5 text-white">
            <p className="text-[10px] font-semibold uppercase tracking-[1.5px] text-slate-400">
              Currently consulting
            </p>
            <div className="mt-3 flex items-end justify-between">
              <div>
                <h3 className="text-4xl font-bold tracking-tight">220</h3>
                <p className="mt-2 text-xs text-slate-300">
                  Ayesha Rahman
                </p>
              </div>
              <span className="rounded-full bg-emerald-400/15 px-3 py-1.5 text-[10px] font-semibold text-emerald-300">
                In progress
              </span>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            {queue.slice(1).map((patient) => (
              <div
                key={patient.serial}
                className="flex items-center justify-between rounded-xl border border-slate-100 p-3"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-xs font-bold text-blue-700">
                    {patient.serial}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-800">
                      {patient.name}
                    </p>
                    <p className="mt-1 text-[10px] text-slate-400">
                      {patient.doctor}
                    </p>
                  </div>
                </div>
                <span
                  className={`text-[10px] font-semibold ${
                    patient.status === "Next"
                      ? "text-amber-600"
                      : "text-slate-400"
                  }`}
                >
                  {patient.status}
                </span>
              </div>
            ))}
          </div>

          <button className="mt-5 w-full rounded-xl border border-blue-100 bg-blue-50 py-3 text-xs font-semibold text-blue-700 transition hover:bg-blue-100">
            Manage appointment queues
          </button>
        </section>
      </div>

      {/* Bottom grid */}
      <div className="grid gap-6 xl:grid-cols-2">
        {/* Activity */}
        <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
          <SectionHeading
            title="Recent Activities"
            subtitle="Latest updates across the hospital"
            action={
              <button className="text-xs font-semibold text-blue-600">
                View activity
              </button>
            }
          />

          <div className="space-y-5">
            {activities.map((activity) => {
              const Icon = activity.icon;
              return (
                <div key={activity.title} className="flex items-start gap-3">
                  <div className={`rounded-xl p-3 ${activity.color}`}>
                    <Icon size={17} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-slate-800">
                      {activity.title}
                    </p>
                    <p className="mt-1 text-[11px] text-slate-500">
                      {activity.detail}
                    </p>
                    <p className="mt-1.5 text-[10px] text-slate-400">
                      {activity.time}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Revenue */}
        <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
          <SectionHeading
            title="Revenue Overview"
            subtitle="Illustrative monthly revenue"
            action={
              <button className="rounded-lg border border-slate-200 px-3 py-2 text-[10px] font-semibold text-slate-600">
                This month
              </button>
            }
          />

          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-xs text-slate-500">Total revenue</p>
              <h3 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                ৳8,45,200
              </h3>
              <p className="mt-2 flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                <FiArrowUpRight size={14} />
                12.5% from last month
              </p>
            </div>
            <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
              <FiDollarSign size={20} />
            </div>
          </div>

          <div className="mt-7 flex h-36 items-end gap-2 sm:gap-3">
            {[42, 58, 47, 76, 62, 88, 69, 94, 73, 82, 64, 100].map(
              (height, index) => (
                <div
                  key={index}
                  className="group flex h-full flex-1 items-end"
                >
                  <div
                    style={{ height: `${height}%` }}
                    className={`w-full rounded-t-md transition ${
                      index === 11
                        ? "bg-blue-600"
                        : "bg-blue-100 group-hover:bg-blue-300"
                    }`}
                  />
                </div>
              )
            )}
          </div>

          <div className="mt-3 flex justify-between text-[10px] text-slate-400">
            <span>Jan</span>
            <span>Mar</span>
            <span>May</span>
            <span>Jul</span>
            <span>Sep</span>
            <span>Nov</span>
            <span>Dec</span>
          </div>
        </section>
      </div>

      <p className="pb-2 text-center text-[10px] text-slate-400">
        MediCare Hospital Management Portal · Frontend demonstration
      </p>
    </div>
  );
}
