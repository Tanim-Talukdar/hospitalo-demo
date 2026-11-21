
"use client";

import { useState } from "react";
import {
  FiArrowDown,
  FiArrowRight,
  FiEye,
  FiEyeOff,
  FiFileText,
  FiLock,
  FiShield,
  FiUser,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";

export default function ReportDownloadPage() {
  const [patientId, setPatientId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [reportAvailable, setReportAvailable] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setReportAvailable(false);

    if (!patientId.trim() || !password.trim()) {
      setError("Please enter your Patient ID and password.");
      return;
    }

    // Demo only: accepts any non-empty credentials.
    // Real patient authentication requires a secure backend.
    setReportAvailable(true);
  };

  return (
    <main className="bg-[#f5f8fc] min-h-screen">
      <section className="container-main py-8 md:py-16">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-6 lg:gap-8 items-stretch">

          {/* Right report access panel - first on mobile */}
          <div className="order-1 lg:order-2 rounded-[28px] bg-white border border-[#e5edf5] shadow-[0_15px_50px_rgba(15,40,75,0.05)] p-6 sm:p-9 md:p-11">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold tracking-[0.16em] uppercase text-[#0d9488]">
                  REPORT ACCESS
                </p>
                <h2 className="text-2xl md:text-3xl font-semibold text-[#172b45] mt-3">
                  Download your report
                </h2>
                <p className="text-sm text-[#64748b] mt-3 leading-6">
                  Enter the details provided by the hospital to access your report.
                </p>
              </div>

              <div className="hidden sm:flex w-14 h-14 rounded-2xl bg-blue-50 items-center justify-center text-[#1268b3]">
                <FiFileText size={25} />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div>
                <label
                  htmlFor="patientId"
                  className="block text-sm font-semibold text-[#263b55] mb-2"
                >
                  Patient ID
                </label>

                <div className="relative">
                  <FiUser
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    size={18}
                  />
                  <input
                    id="patientId"
                    type="text"
                    value={patientId}
                    onChange={(e) => setPatientId(e.target.value)}
                    placeholder="Enter your patient ID"
                    className="w-full h-13 rounded-xl border border-[#dce5ef] bg-[#fbfdff] pl-12 pr-4 text-sm text-[#172b45] outline-none transition focus:border-[#1268b3] focus:ring-4 focus:ring-blue-100"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-[#263b55] mb-2"
                >
                  Password
                </label>

                <div className="relative">
                  <FiLock
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    size={18}
                  />

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full h-13 rounded-xl border border-[#dce5ef] bg-[#fbfdff] pl-12 pr-12 text-sm text-[#172b45] outline-none transition focus:border-[#1268b3] focus:ring-4 focus:ring-blue-100"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#1268b3] transition"
                  >
                    {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 rounded-xl bg-red-50 border border-red-100 p-3 text-sm text-red-600">
                  <FiAlertCircle size={17} />
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full h-13 rounded-xl bg-[#1268b3] hover:bg-[#0d5799] text-white font-semibold text-sm flex items-center justify-center gap-3 transition shadow-lg shadow-blue-900/10"
              >
                Access My Report
                <FiArrowRight size={17} />
              </button>
            </form>

            {reportAvailable && (
              <div className="mt-7 rounded-2xl border border-teal-100 bg-teal-50/70 p-5">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center shrink-0">
                    <FiCheckCircle size={20} />
                  </div>

                  <div className="min-w-0">
                    <h3 className="font-semibold text-[#172b45]">
                      Demo report available
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Patient ID: {patientId}
                    </p>
                  </div>
                </div>

                <div className="mt-5 rounded-xl bg-white border border-teal-100 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#1268b3] flex items-center justify-center shrink-0">
                      <FiFileText size={19} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-[#172b45]">
                        Medical Report
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        Sample PDF document
                      </p>
                    </div>
                  </div>

                  <a
                    href="/reports/sample-report.pdf"
                    download
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#1268b3] hover:bg-[#0d5799] px-4 py-2.5 text-xs font-semibold text-white transition shrink-0"
                  >
                    <FiArrowDown size={15} />
                    Download
                  </a>
                </div>
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-[#edf1f6]">
              <div className="flex items-start gap-3">
                <FiShield className="text-[#0d9488] mt-0.5 shrink-0" size={17} />
                <p className="text-xs text-slate-500 leading-6">
                  Having trouble accessing your report? Please contact our
                  support team for assistance.
                  <a
                    href="/contact"
                    className="ml-1 font-semibold text-[#1268b3] hover:text-[#0d9488] transition"
                  >
                    Contact us
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Information panel - second on mobile */}
          <div className="order-2 lg:order-1 relative overflow-hidden rounded-[28px] bg-[#071a32] text-white p-7 md:p-10 flex flex-col justify-between min-h-[420px] lg:min-h-[480px]">
            <div className="absolute -top-24 -right-20 w-72 h-72 rounded-full bg-blue-500/15 blur-3xl" />
            <div className="absolute -bottom-24 -left-20 w-72 h-72 rounded-full bg-teal-400/10 blur-3xl" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold tracking-wide text-blue-200">
                <FiShield size={14} />
                PATIENT REPORT PORTAL
              </div>

              <h1 className="mt-9 text-3xl md:text-4xl lg:text-[42px] leading-tight font-semibold tracking-tight">
                Your health information,
                <span className="block text-teal-300 mt-1">
                  within reach.
                </span>
              </h1>

              <p className="mt-5 max-w-md text-sm md:text-base leading-7 text-slate-300">
                Access your medical reports in one convenient place.
                Enter your patient credentials to view and download
                your reports.
              </p>
            </div>

            <div className="relative z-10 mt-10 space-y-5">
              <div className="flex gap-4 items-start">
                <div className="w-11 h-11 shrink-0 rounded-xl bg-white/10 flex items-center justify-center text-teal-300">
                  <FiLock size={19} />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Private access</h3>
                  <p className="text-sm text-slate-400 mt-1 leading-6">
                    Your reports should only be accessible to authorized patients.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-11 h-11 shrink-0 rounded-xl bg-white/10 flex items-center justify-center text-teal-300">
                  <FiFileText size={19} />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Convenient downloads</h3>
                  <p className="text-sm text-slate-400 mt-1 leading-6">
                    Keep a digital copy of your medical reports for future reference.
                  </p>
                </div>
              </div>

              <div className="pt-5 border-t border-white/10 flex items-center gap-3 text-xs text-slate-400">
                <FiShield size={15} className="text-teal-300" />
                Your medical information deserves careful protection.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom information cards */}
      <section className="container-main pb-14">
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            {
              icon: FiLock,
              title: "Secure access",
              description: "Keep your patient credentials private.",
            },
            {
              icon: FiFileText,
              title: "Digital records",
              description: "Access report documents conveniently.",
            },
            {
              icon: FiShield,
              title: "Patient support",
              description: "Our team can help with report access.",
            },
          ].map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="rounded-2xl border border-[#e5edf5] bg-white p-5 flex items-start gap-4"
              >
                <div className="w-11 h-11 rounded-xl bg-blue-50 text-[#1268b3] flex items-center justify-center shrink-0">
                  <Icon size={19} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#172b45]">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-5">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
