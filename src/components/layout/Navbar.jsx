
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiMenu,
  FiX,
  FiChevronDown,
  FiPhone,
  FiMail,
  FiMapPin,
  FiArrowUpRight,
  FiFileText,
  FiHeart,
} from "react-icons/fi";

const aboutLinks = [
  { label: "About Hospital", href: "/about" },
  { label: "Mission & Vision", href: "/about/mission-vision" },
  { label: "Chairman's Message", href: "/about/chairman" },
  { label: "CEO's Message", href: "/about/ceo" },
  { label: "Managing Director", href: "/about/managing-director" },
  { label: "Board of Directors", href: "/about/board-of-directors" },
  { label: "Hospital Facilities", href: "/about/facilities" },
  { label: "Departments", href: "/about/departments" },
  { label: "Awards & Achievements", href: "/about/achievements" },
  { label: "Why Choose Us", href: "/about/why-choose-us" },
];

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Doctors", href: "/doctors" },
  { label: "Health Packages", href: "/health-packages" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const closeMobile = () => {
    setMobileOpen(false);
    setAboutOpen(false);
  };

  return (
    <>
      {/* Top Bar */}
      <div className="hidden md:block bg-[#0B3157] text-white">
        <div className="container-main flex items-center justify-between py-2.5 text-xs">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 text-blue-100">
              <FiPhone className="text-[#55D6C2]" />
              Emergency: +880 1700-000000
            </span>
            <span className="flex items-center gap-2 text-blue-100">
              <FiMail className="text-[#55D6C2]" />
              info@medicare.com
            </span>
          </div>

          <span className="flex items-center gap-2 text-blue-100">
            <FiMapPin className="text-[#55D6C2]" />
            Dhaka, Bangladesh
          </span>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur-xl">
        <div className="container-main flex h-[78px] items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1268B3] text-white shadow-lg shadow-blue-200">
              <FiHeart size={25} />
            </div>

            <div>
              <h1 className="text-[21px] font-extrabold tracking-tight text-[#12365A]">
                MediCare<span className="text-[#1268B3]">.</span>
              </h1>
              <p className="text-[9px] font-bold tracking-[0.19em] text-slate-500">
                MULTISPECIALTY HOSPITAL
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex h-full items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[13px] font-semibold transition-colors ${
                  isActive(link.href)
                    ? "text-[#1268B3]"
                    : "text-slate-600 hover:text-[#1268B3]"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* About Mega Menu */}
            <div
              className="group flex h-full items-center"
              onMouseEnter={() => setAboutOpen(true)}
              onMouseLeave={() => setAboutOpen(false)}
            >
              <button
                onClick={() => setAboutOpen(!aboutOpen)}
                aria-expanded={aboutOpen}
                className={`flex items-center gap-1.5 text-[13px] font-semibold transition-colors ${
                  pathname.startsWith("/about")
                    ? "text-[#1268B3]"
                    : "text-slate-600 hover:text-[#1268B3]"
                }`}
              >
                About
                <FiChevronDown
                  size={14}
                  className={`transition-transform ${aboutOpen ? "rotate-180" : ""}`}
                />
              </button>

              {aboutOpen && (
                <div className="absolute left-0 top-full w-full border-t border-slate-100 bg-white shadow-2xl shadow-slate-200/60">
                  <div className="container-main grid grid-cols-12 gap-8 py-9">
                    <div className="col-span-4 rounded-2xl bg-[#0B3157] p-7 text-white">
                      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                        <FiHeart size={26} />
                      </div>

                      <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#55D6C2]">
                        About MediCare
                      </p>

                      <h3 className="mb-3 text-2xl font-bold leading-snug">
                        Caring for lives, building a healthier future.
                      </h3>

                      <p className="text-sm leading-6 text-blue-100">
                        Discover our story, leadership, values and commitment
                        to quality healthcare.
                      </p>

                      <Link
                        href="/about"
                        onClick={() => setAboutOpen(false)}
                        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#55D6C2]"
                      >
                        Explore Hospital <FiArrowUpRight />
                      </Link>
                    </div>

                    <div className="col-span-8 grid grid-cols-2 gap-x-8 gap-y-1">
                      {aboutLinks.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setAboutOpen(false)}
                          className="flex items-center justify-between rounded-lg px-4 py-3 text-[13px] font-semibold text-slate-600 transition-all hover:bg-blue-50 hover:text-[#1268B3]"
                        >
                          {item.label}
                          <FiArrowUpRight size={14} />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Report Button */}
          <Link
            href="/report-download"
            className="hidden lg:flex items-center gap-2 rounded-lg bg-[#1268B3] px-4 py-3 text-xs font-bold text-white shadow-lg shadow-blue-200 transition-all hover:-translate-y-0.5 hover:bg-[#0B4F91]"
          >
            <FiFileText size={16} />
            Report Download
          </Link>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation"
            aria-expanded={mobileOpen}
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-50 text-[#12365A] lg:hidden"
          >
            {mobileOpen ? <FiX size={23} /> : <FiMenu size={23} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileOpen && (
          <div className="border-t border-slate-100 bg-white px-5 pb-6 pt-3 shadow-xl lg:hidden">
            <nav className="flex flex-col">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMobile}
                  className={`border-b border-slate-100 py-3.5 text-sm font-semibold ${
                    isActive(link.href)
                      ? "text-[#1268B3]"
                      : "text-slate-700"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <button
                onClick={() => setAboutOpen(!aboutOpen)}
                className="flex items-center justify-between border-b border-slate-100 py-3.5 text-sm font-semibold text-slate-700"
              >
                About
                <FiChevronDown
                  className={`transition-transform ${aboutOpen ? "rotate-180" : ""}`}
                />
              </button>

              {aboutOpen && (
                <div className="grid grid-cols-1 gap-1 bg-slate-50 p-3">
                  {aboutLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeMobile}
                      className="rounded-lg px-3 py-2.5 text-sm text-slate-600 hover:bg-white hover:text-[#1268B3]"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}

              <Link
                href="/report-download"
                onClick={closeMobile}
                className="mt-5 flex items-center justify-center gap-2 rounded-lg bg-[#1268B3] px-4 py-3.5 text-sm font-bold text-white"
              >
                <FiFileText size={17} />
                Report Download
              </Link>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
