
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiGrid,
  FiUsers,
  FiCalendar,
  FiUserCheck,
  FiLayers,
  FiActivity,
  FiFileText,
  FiCreditCard,
  FiHeart,
  FiGlobe,
  FiBarChart2,
  FiShield,
  FiSettings,
  FiMenu,
  FiX,
  FiSearch,
  FiBell,
  FiChevronDown,
  FiLogOut,
  FiCommand,
  FiHelpCircle,
} from "react-icons/fi";

const navigation = [
  {
    title: "WORKSPACE",
    items: [
      { label: "Overview", href: "/admin", icon: FiGrid },
      { label: "Patients", href: "/admin/patients", icon: FiUsers },
      { label: "Appointments", href: "/admin/appointments", icon: FiCalendar },
      { label: "Doctors & Staff", href: "/admin/doctors", icon: FiUserCheck },
    ],
  },
  {
    title: "HOSPITAL MANAGEMENT",
    items: [
      { label: "Departments", href: "/admin/departments", icon: FiLayers },
      { label: "Laboratory", href: "/admin/laboratory", icon: FiActivity },
      { label: "Medical Records", href: "/admin/medical-records", icon: FiFileText },
      { label: "Billing & Payments", href: "/admin/billing", icon: FiCreditCard },
      { label: "Health Packages", href: "/admin/packages", icon: FiHeart },
    ],
  },
  {
    title: "MANAGEMENT",
    items: [
      { label: "Website Content", href: "/admin/website", icon: FiGlobe },
      { label: "Reports & Analytics", href: "/admin/reports", icon: FiBarChart2 },
      { label: "Users & Permissions", href: "/admin/users", icon: FiShield },
    ],
  },
];

export default function AdminShell({ children }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      <Link
        href="/admin"
        onClick={() => setMobileOpen(false)}
        className="flex h-[76px] items-center gap-3 border-b border-white/10 px-6"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500 text-white shadow-lg shadow-blue-500/20">
          <FiHeart size={21} />
        </div>
        <div>
          <h2 className="text-[16px] font-bold tracking-wide text-white">
            MediCare
          </h2>
          <p className="text-[10px] font-medium tracking-[2px] text-slate-400">
            MANAGEMENT PORTAL
          </p>
        </div>
      </Link>

      <div className="flex-1 overflow-y-auto px-4 py-6">
        {navigation.map((section) => (
          <div key={section.title} className="mb-7">
            <p className="mb-3 px-3 text-[10px] font-bold tracking-[1.5px] text-slate-500">
              {section.title}
            </p>

            <div className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const active =
                  item.href === "/admin"
                    ? pathname === "/admin"
                    : pathname === item.href ||
                      pathname.startsWith(`${item.href}/`);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`group flex items-center gap-3 rounded-xl px-3 py-3 text-[13px] font-medium transition ${
                      active
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-950/30"
                        : "text-slate-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <Icon
                      size={17}
                      className={
                        active
                          ? "text-white"
                          : "text-slate-500 group-hover:text-blue-400"
                      }
                    />
                    {item.label}
                    {item.label === "Appointments" && (
                      <span className="ml-auto rounded-md bg-blue-400/15 px-2 py-0.5 text-[10px] font-bold text-blue-300">
                        12
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10 p-4">
        <div className="mb-3 rounded-xl bg-white/5 p-3">
          <div className="flex items-center gap-2 text-white">
            <FiHelpCircle size={17} />
            <span className="text-xs font-semibold">Need assistance?</span>
          </div>
          <p className="mt-2 text-[11px] leading-5 text-slate-400">
            Contact your system administrator for help.
          </p>
        </div>

        <Link
          href="/admin/settings"
          className="flex items-center gap-3 rounded-xl px-3 py-3 text-xs font-medium text-slate-400 transition hover:bg-white/5 hover:text-white"
        >
          <FiSettings size={17} />
          Settings
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F5F7FB]">
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/60 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[260px] bg-[#101C35] transition-transform duration-300 lg:sticky lg:top-0 lg:z-30 lg:h-screen lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="absolute right-3 top-5 lg:hidden">
          <button
            onClick={() => setMobileOpen(false)}
            className="rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white"
            aria-label="Close menu"
          >
            <FiX size={20} />
          </button>
        </div>
        <SidebarContent />
      </aside>

      <div className="min-w-0 flex-1 lg:-mt-[100vh] lg:ml-[260px]">
        <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-slate-200/80 bg-white/95 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="rounded-lg border border-slate-200 p-2 text-slate-600 lg:hidden"
              aria-label="Open menu"
            >
              <FiMenu size={19} />
            </button>

            <div className="hidden items-center gap-2 text-xs text-slate-400 sm:flex">
              <FiCommand size={15} />
              <span>Hospital Management</span>
              <span>/</span>
              <span className="font-semibold text-slate-700">
                {pathname === "/admin" ? "Overview" : "Workspace"}
              </span>
            </div>

            <div className="sm:hidden text-sm font-bold text-slate-800">
              MediCare Portal
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-5">
            <div className="hidden h-10 w-[230px] items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 md:flex">
              <FiSearch className="text-slate-400" size={16} />
              <input
                type="search"
                placeholder="Search anything..."
                className="w-full bg-transparent text-xs text-slate-700 outline-none placeholder:text-slate-400"
              />
              <span className="rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] text-slate-400">
                /
              </span>
            </div>

            <button
              className="relative rounded-xl p-2.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
              aria-label="Notifications"
            >
              <FiBell size={19} />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-white bg-red-500" />
            </button>

            <div className="h-8 w-px bg-slate-200" />

            <button className="flex items-center gap-2.5 rounded-xl transition hover:bg-slate-50 sm:p-1.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
                AD
              </div>
              <div className="hidden text-left sm:block">
                <p className="text-xs font-bold text-slate-800">Administrator</p>
                <p className="mt-0.5 text-[10px] text-slate-400">
                  Super Admin
                </p>
              </div>
              <FiChevronDown className="hidden text-slate-400 sm:block" size={15} />
            </button>
          </div>
        </header>

        <main className="min-h-[calc(100vh-76px)] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
