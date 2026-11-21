
"use client";

import { useState } from "react";
import Image from "next/image";
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
  FiImage,
  FiHome,
  FiUsers,
  FiActivity,
  FiInfo,
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
  { label: "Home", href: "/", icon: FiHome },
  { label: "Doctors", href: "/doctors", icon: FiUsers },
  {
    label: "Health Packages",
    href: "/health-packages",
    icon: FiActivity,
  },
  { label: "Gallery", href: "/gallery", icon: FiImage },
  { label: "Contact", href: "/contact", icon: FiPhone },
];

export default function Navbar() {
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const aboutActive = pathname.startsWith("/about");

  const closeMenus = () => {
    setMobileOpen(false);
    setAboutOpen(false);
  };

  return (
    <>

{/* Top contact bar */}
<div className="hidden border-b border-blue-900 bg-blue-900 text-white lg:block">
  <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2.5">
    <div className="flex items-center gap-6 text-[12px] font-medium text-blue-50">
      <a
        href="tel:+8801700000000"
        className="flex items-center gap-2 transition hover:text-white"
      >
        <FiPhone size={13} />
        +880 1700-000000
      </a>

      <a
        href="mailto:info@medicare.com"
        className="flex items-center gap-2 transition hover:text-white"
      >
        <FiMail size={13} />
        info@medicare.com
      </a>
    </div>

    <div className="flex items-center gap-2 text-[12px] font-medium text-blue-50">
      <FiMapPin size={13} />
      Dhaka, Bangladesh
    </div>
  </div>
</div>


      {/* Main Navbar */}
      <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">

          {/* Logo */}
          <Link
            href="/"
            onClick={closeMenus}
            className="group flex shrink-0 items-center gap-3"
          >
            <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl bg-blue-50">
              {!logoError ? (
                <Image
                  src="/logo.png"
                  alt="MediCare Hospital Logo"
                  fill
                  sizes="44px"
                  className="object-contain p-1"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <FiHeart size={23} className="text-blue-700" />
              )}
            </div>

            <div className="leading-none">
              <span className="block text-[21px] font-extrabold tracking-tight text-slate-900">
                Medi<span className="text-blue-700">Care</span>
              </span>
              <span className="mt-1.5 block text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">
                Hospital & Healthcare
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.slice(0, 3).map((link) => {
              const Icon = link.icon;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 rounded-full px-3.5 py-2.5 text-[13px] font-semibold transition-all ${
                    isActive(link.href)
                      ? "bg-blue-50 text-blue-700"
                      : "text-slate-600 hover:bg-slate-50 hover:text-blue-700"
                  }`}
                >
                  <Icon size={15} />
                  {link.label}
                </Link>
              );
            })}

            {/* About Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setAboutOpen(true)}
              onMouseLeave={() => setAboutOpen(false)}
            >
              <button
                type="button"
                onClick={() => setAboutOpen((prev) => !prev)}
                aria-expanded={aboutOpen}
                className={`flex items-center gap-2 rounded-full px-3.5 py-2.5 text-[13px] font-semibold transition-all ${
                  aboutActive || aboutOpen
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-blue-700"
                }`}
              >
                <FiInfo size={15} />
                About
                <FiChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${
                    aboutOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {aboutOpen && (
                <div className="absolute left-1/2 top-full z-50 w-[560px] -translate-x-1/2 pt-4">
                  <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.13)]">
                    <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-4">
                      <div>
                        <p className="text-sm font-bold text-slate-900">
                          Discover MediCare
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          Learn more about our hospital and people.
                        </p>
                      </div>

                      <Link
                        href="/about"
                        onClick={closeMenus}
                        className="flex items-center gap-1 text-xs font-bold text-blue-700 hover:text-blue-900"
                      >
                        About us <FiArrowUpRight size={14} />
                      </Link>
                    </div>

                    <div className="grid grid-cols-2 gap-1">
                      {aboutLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={closeMenus}
                          className={`group flex items-center justify-between rounded-xl px-3 py-3 text-[12px] font-medium transition ${
                            pathname === link.href
                              ? "bg-blue-50 text-blue-700"
                              : "text-slate-600 hover:bg-slate-50 hover:text-blue-700"
                          }`}
                        >
                          {link.label}
                          <FiArrowUpRight
                            size={13}
                            className="shrink-0 opacity-0 transition group-hover:opacity-100"
                          />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {navLinks.slice(3).map((link) => {
              const Icon = link.icon;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 rounded-full px-3.5 py-2.5 text-[13px] font-semibold transition-all ${
                    isActive(link.href)
                      ? "bg-blue-50 text-blue-700"
                      : "text-slate-600 hover:bg-slate-50 hover:text-blue-700"
                  }`}
                >
                  <Icon size={15} />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Report Download */}
          <Link
            href="/report-download"
            className="hidden shrink-0 items-center gap-2 rounded-full bg-blue-700 px-5 py-3 text-[12px] font-bold text-white shadow-lg shadow-blue-700/15 transition hover:-translate-y-0.5 hover:bg-blue-800 lg:flex"
          >
            <FiFileText size={15} />
            Report Download
            <FiArrowUpRight size={14} />
          </Link>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition hover:bg-slate-50 lg:hidden"
          >
            {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="border-t border-slate-100 bg-white shadow-xl lg:hidden">
            <div className="mx-auto max-w-7xl px-5 py-5 sm:px-6">
              <nav className="space-y-1">
                {navLinks.slice(0, 3).map((link) => {
                  const Icon = link.icon;

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeMenus}
                      className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-semibold transition ${
                        isActive(link.href)
                          ? "bg-blue-50 text-blue-700"
                          : "text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <Icon size={17} />
                        {link.label}
                      </span>
                      <FiArrowUpRight size={15} className="opacity-50" />
                    </Link>
                  );
                })}

                {/* Mobile About */}
                <div>
                  <button
                    type="button"
                    onClick={() => setAboutOpen((prev) => !prev)}
                    aria-expanded={aboutOpen}
                    className={`flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-sm font-semibold transition ${
                      aboutActive
                        ? "bg-blue-50 text-blue-700"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <FiInfo size={17} />
                      About
                    </span>

                    <FiChevronDown
                      size={16}
                      className={`transition-transform ${
                        aboutOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {aboutOpen && (
                    <div className="ml-4 mt-1 space-y-1 border-l-2 border-blue-100 pl-3">
                      {aboutLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={closeMenus}
                          className={`block rounded-lg px-3 py-2.5 text-[13px] transition ${
                            pathname === link.href
                              ? "bg-blue-50 font-semibold text-blue-700"
                              : "text-slate-600 hover:bg-slate-50"
                          }`}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {navLinks.slice(3).map((link) => {
                  const Icon = link.icon;

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeMenus}
                      className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-semibold transition ${
                        isActive(link.href)
                          ? "bg-blue-50 text-blue-700"
                          : "text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <Icon size={17} />
                        {link.label}
                      </span>
                      <FiArrowUpRight size={15} className="opacity-50" />
                    </Link>
                  );
                })}
              </nav>

              <div className="mt-5 border-t border-slate-100 pt-5">
                <Link
                  href="/report-download"
                  onClick={closeMenus}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-blue-800"
                >
                  <FiFileText size={17} />
                  Download Your Report
                  <FiArrowUpRight size={15} />
                </Link>

                <div className="mt-5 grid grid-cols-1 gap-3 text-xs text-slate-500 sm:grid-cols-2">
                  <a
                    href="tel:+8801700000000"
                    className="flex items-center gap-2"
                  >
                    <FiPhone className="text-blue-600" size={14} />
                    +880 1700-000000
                  </a>

                  <a
                    href="mailto:info@medicare.com"
                    className="flex items-center gap-2"
                  >
                    <FiMail className="text-blue-600" size={14} />
                    info@medicare.com
                  </a>

                  <div className="flex items-center gap-2 sm:col-span-2">
                    <FiMapPin className="text-blue-600" size={14} />
                    Dhaka, Bangladesh
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
