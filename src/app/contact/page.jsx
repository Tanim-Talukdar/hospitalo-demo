
"use client";

import { useState } from "react";
import {
  FiArrowUpRight,
  FiCheck,
  FiCheckCircle,
  FiMail,
  FiMapPin,
  FiNavigation,
  FiPhone,
  FiSend,
  FiShield,
} from "react-icons/fi";

const contactDetails = [
  {
    icon: FiPhone,
    label: "CALL OUR TEAM",
    title: "+880 1700-000000",
    description: "Speak with our team",
    href: "tel:+8801700000000",
  },
  {
    icon: FiMail,
    label: "EMAIL US",
    title: "info@medicarehospital.com",
    description: "Send us your questions",
    href: "mailto:info@medicarehospital.com",
  },
  {
    icon: FiMapPin,
    label: "OUR LOCATION",
    title: "Dhaka, Bangladesh",
    description: "Visit our hospital",
    href: "https://www.google.com/maps/search/?api=1&query=Hospital+Dhaka+Bangladesh",
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setSubmitted(false);
  }

  function handleSubmit(event) {
    event.preventDefault();

    // Frontend demonstration only. Connect an API before production.
    setSubmitted(true);

    setForm({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  }

  return (
    <main className="min-h-screen bg-[#f7f9fc] text-slate-800">
      {/* Page heading */}
      <section className="border-b border-slate-200 bg-white">
        <div className="container-main py-12 sm:py-16">
          <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-teal-700">
            <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
            Get in touch
          </span>

          <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-[#102b49] sm:text-5xl">
            We're always happy to hear from you.
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
            Whether you need general information or assistance with our
            services, contact our team through the details below.
          </p>
        </div>
      </section>

      {/* Contact information and form */}
      <section className="container-main py-10 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          {/* Left side */}
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-teal-700">
              Contact information
            </span>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#102b49]">
              Let's talk.
            </h2>

            <p className="mt-3 max-w-sm text-sm leading-7 text-slate-500">
              Have a question or need assistance? Reach out to our team using
              the contact details below.
            </p>

            <div className="mt-8 space-y-4">
              {contactDetails.map((item, index) => {
                const Icon = item.icon;
                const isExternal = item.href.startsWith("https");

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-[0_15px_35px_rgba(15,55,100,0.06)]"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                      <Icon size={21} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-bold tracking-[0.16em] text-teal-700">
                        {item.label}
                      </p>

                      <h3 className="mt-1 break-words text-base font-semibold text-[#102b49]">
                        {item.title}
                      </h3>

                      <p className="mt-1 text-xs text-slate-500">
                        {item.description}
                      </p>
                    </div>

                    <FiArrowUpRight className="shrink-0 text-slate-300 transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-blue-600" />
                  </a>
                );
              })}
            </div>

            {/* Small supporting note */}
            <div className="mt-6 rounded-2xl border border-blue-100 bg-[#edf5fc] p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-blue-700">
                  <FiCheck size={17} />
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-[#102b49]">
                    We're here to help
                  </h3>
                  <p className="mt-1 text-xs leading-6 text-slate-500">
                    Contact our team for information about hospital services
                    and general enquiries.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side: Form */}
          <div className="rounded-[26px] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,55,100,0.045)] sm:p-9 lg:p-10">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-teal-700">
                Send an enquiry
              </span>

              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#102b49]">
                How can we help you?
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-500">
                Complete the form and provide a few details about your enquiry.
              </p>
            </div>

            {submitted && (
              <div
                role="status"
                className="mt-7 flex gap-3 rounded-xl border border-teal-100 bg-teal-50 p-4"
              >
                <FiCheckCircle className="mt-0.5 shrink-0 text-teal-600" />

                <div>
                  <p className="text-sm font-semibold text-teal-800">
                    Demo submission completed
                  </p>
                  <p className="mt-1 text-xs leading-5 text-teal-700">
                    This form is not connected to a server. Your message was
                    not actually sent.
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-xs font-semibold text-slate-700"
                  >
                    Full name <span className="text-rose-500">*</span>
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className="h-12 w-full rounded-xl border border-slate-200 bg-[#fafbfd] px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-xs font-semibold text-slate-700"
                  >
                    Email address <span className="text-rose-500">*</span>
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    className="h-12 w-full rounded-xl border border-slate-200 bg-[#fafbfd] px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
                  />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-xs font-semibold text-slate-700"
                  >
                    Phone number
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+880 1XXX-XXXXXX"
                    className="h-12 w-full rounded-xl border border-slate-200 bg-[#fafbfd] px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="mb-2 block text-xs font-semibold text-slate-700"
                  >
                    Enquiry type <span className="text-rose-500">*</span>
                  </label>

                  <select
                    id="subject"
                    name="subject"
                    required
                    value={form.subject}
                    onChange={handleChange}
                    className="h-12 w-full rounded-xl border border-slate-200 bg-[#fafbfd] px-4 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
                  >
                    <option value="">Choose an option</option>
                    <option value="General enquiry">General enquiry</option>
                    <option value="Hospital services">Hospital services</option>
                    <option value="Diagnostic services">
                      Diagnostic services
                    </option>
                    <option value="Patient support">Patient support</option>
                    <option value="Feedback">Feedback</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-xs font-semibold text-slate-700"
                >
                  Your message <span className="text-rose-500">*</span>
                </label>

                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us how we can assist you..."
                  className="w-full resize-y rounded-xl border border-slate-200 bg-[#fafbfd] px-4 py-3 text-sm leading-6 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
                />
              </div>

              <div className="flex flex-col gap-4 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="flex max-w-xs items-start gap-2 text-[11px] leading-5 text-slate-400">
                  <FiShield className="mt-0.5 shrink-0 text-teal-600" />
                  Please avoid sharing sensitive medical records through this
                  demonstration form.
                </p>

                <button
                  type="submit"
                  className="inline-flex h-12 shrink-0 items-center justify-center gap-3 rounded-xl bg-[#1268b3] px-7 text-sm font-semibold text-white shadow-lg shadow-blue-900/10 transition-all hover:-translate-y-0.5 hover:bg-[#0d5595] hover:shadow-xl"
                >
                  Send enquiry
                  <FiSend size={15} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="border-t border-slate-200 bg-white py-14 sm:py-20">
        <div className="container-main">
          <div className="grid gap-7 lg:grid-cols-[0.8fr_1.2fr] lg:items-stretch">
            {/* Location information background box */}
            <div className="relative flex flex-col justify-center overflow-hidden rounded-[26px] bg-[#092b4b] p-7 text-white sm:p-10">
              <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border border-white/[0.08]" />
              <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full border border-white/[0.08]" />
              <div className="pointer-events-none absolute -bottom-20 -left-16 h-64 w-64 rounded-full bg-teal-500/10 blur-3xl" />

              <div className="relative">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-teal-300">
                  Visit us
                </span>

                <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                  We'd love to welcome you.
                </h2>

                <p className="mt-4 text-sm leading-7 text-blue-100/70">
                  Find our hospital location and plan your visit. Our team
                  looks forward to welcoming you.
                </p>

                <div className="mt-8 flex items-start gap-4 border-t border-white/10 pt-7">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.07] text-teal-300">
                    <FiMapPin size={21} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-white">
                      MediCare Hospital
                    </p>
                    <p className="mt-2 text-sm leading-6 text-blue-100/65">
                      Dhaka, Bangladesh
                    </p>
                  </div>
                </div>

                <a
                  href="https://www.google.com/maps/search/?api=1&query=Hospital+Dhaka+Bangladesh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-semibold text-[#092b4b] transition hover:bg-teal-50"
                >
                  Get directions
                  <FiNavigation size={16} />
                </a>
              </div>
            </div>

            {/* Map */}
            <div className="relative min-h-[300px] overflow-hidden rounded-[26px] border border-slate-200 bg-slate-100 shadow-[0_18px_45px_rgba(15,55,100,0.08)] sm:min-h-[390px]">
              <iframe
                title="Map showing Dhaka, Bangladesh"
                src="https://maps.google.com/maps?q=Dhaka%2C%20Bangladesh&t=&z=12&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
