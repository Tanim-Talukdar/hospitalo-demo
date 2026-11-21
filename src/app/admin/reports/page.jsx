
"use client";

import { useMemo, useState } from "react";
import {
  FiActivity,
  FiCalendar,
  FiDownload,
  FiDollarSign,
  FiUsers,
} from "react-icons/fi";

const reportData = {
  revenue: [
    { month: "Jun", amount: 520000 },
    { month: "Jul", amount: 610000 },
    { month: "Aug", amount: 580000 },
    { month: "Sep", amount: 720000 },
    { month: "Oct", amount: 790000 },
    { month: "Nov", amount: 845200 },
  ],
  departments: [
    { name: "Cardiology", appointments: 420 },
    { name: "General Medicine", appointments: 380 },
    { name: "Pediatrics", appointments: 310 },
    { name: "Neurology", appointments: 245 },
    { name: "Orthopedics", appointments: 195 },
    { name: "Dermatology", appointments: 150 },
  ],
  activity: [
    { label: "Appointments", value: 1280, change: "+12%" },
    { label: "New Patients", value: 340, change: "+8%" },
    { label: "Lab Tests", value: 890, change: "+15%" },
    { label: "Completed Visits", value: 1120, change: "+10%" },
  ],
};

const money = (value) =>
  `৳${Number(value).toLocaleString("en-BD")}`;

export default function ReportsPage() {
  const [period, setPeriod] = useState("Last 6 Months");

  const totalRevenue = useMemo(
    () => reportData.revenue.reduce((sum, item) => sum + item.amount, 0),
    []
  );

  const highestRevenue = Math.max(
    ...reportData.revenue.map((item) => item.amount)
  );

  const highestDepartment = Math.max(
    ...reportData.departments.map((item) => item.appointments)
  );

  function exportReport() {
    const rows = [
      ["Report", "Value"],
      ["Reporting Period", period],
      ["Total Revenue", totalRevenue],
      ...reportData.revenue.map((item) => [
        `Revenue - ${item.month}`,
        item.amount,
      ]),
      ...reportData.departments.map((item) => [
        `Appointments - ${item.name}`,
        item.appointments,
      ]),
      ...reportData.activity.map((item) => [
        item.label,
        item.value,
      ]),
    ];

    const csv = rows
      .map((row) =>
        row
          .map((value) => `"${String(value).replaceAll('"', '""')}"`)
          .join(",")
      )
      .join("\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "medicare-hospital-report.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
            Hospital Management
          </p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
            Reports & Analytics
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Monitor hospital performance, revenue and operational activity.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <select
            value={period}
            onChange={(event) => setPeriod(event.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-blue-400"
          >
            <option>Last 6 Months</option>
            <option>Last 30 Days</option>
            <option>This Year</option>
          </select>

          <button
            type="button"
            onClick={exportReport}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
          >
            <FiDownload size={17} />
            Export CSV
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
        Demonstration analytics only. These figures are sample data and are not
        connected to hospital transactions.
      </div>

      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {[
          {
            label: "Total Revenue",
            value: money(845200),
            icon: FiDollarSign,
            note: "November sample",
          },
          {
            label: "Total Patients",
            value: "2,845",
            icon: FiUsers,
            note: "Demo patient count",
          },
          {
            label: "Appointments",
            value: "1,280",
            icon: FiCalendar,
            note: "Selected sample period",
          },
          {
            label: "Lab Tests",
            value: "890",
            icon: FiActivity,
            note: "Selected sample period",
          },
        ].map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-medium text-slate-500">
                  {item.label}
                </p>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Icon size={19} />
                </div>
              </div>
              <p className="mt-3 text-2xl font-bold text-slate-900">
                {item.value}
              </p>
              <p className="mt-1 text-xs text-slate-400">{item.note}</p>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="font-bold text-slate-900">Revenue Overview</h2>
              <p className="mt-1 text-sm text-slate-500">
                Monthly hospital revenue
              </p>
            </div>
            <p className="text-lg font-bold text-slate-900">
              {money(totalRevenue)}
            </p>
          </div>

          <div className="mt-8 flex h-64 items-end gap-3 border-b border-slate-100 pb-2 sm:gap-5">
            {reportData.revenue.map((item) => (
              <div
                key={item.month}
                className="flex h-full flex-1 flex-col items-center justify-end gap-2"
              >
                <span className="text-[10px] font-semibold text-slate-500 sm:text-xs">
                  {money(item.amount).replace("৳", "")}
                </span>
                <div
                  className="w-full max-w-14 rounded-t-lg bg-blue-500 transition hover:bg-blue-700"
                  style={{
                    height: `${(item.amount / highestRevenue) * 75}%`,
                    minHeight: "12px",
                  }}
                  title={`${item.month}: ${money(item.amount)}`}
                />
                <span className="text-xs font-medium text-slate-500">
                  {item.month}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="font-bold text-slate-900">Department Activity</h2>
          <p className="mt-1 text-sm text-slate-500">
            Appointments by department
          </p>

          <div className="mt-6 space-y-5">
            {reportData.departments.map((item) => (
              <div key={item.name}>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <span className="text-sm font-medium text-slate-700">
                    {item.name}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    {item.appointments}
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-blue-500"
                    style={{
                      width: `${(item.appointments / highestDepartment) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-5">
          <h2 className="font-bold text-slate-900">Hospital Activity</h2>
          <p className="mt-1 text-sm text-slate-500">
            Operational overview for the selected sample period
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {reportData.activity.map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-slate-100 bg-slate-50 p-5"
            >
              <p className="text-sm font-medium text-slate-500">
                {item.label}
              </p>
              <div className="mt-3 flex items-end justify-between gap-2">
                <p className="text-2xl font-bold text-slate-900">
                  {item.value.toLocaleString("en-BD")}
                </p>
                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                  {item.change}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
