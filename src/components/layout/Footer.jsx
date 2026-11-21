
import Link from "next/link";
import {
  FiHeart,
  FiMapPin,
  FiPhone,
  FiMail,
  FiFacebook,
  FiInstagram,
  FiYoutube,
  FiArrowUpRight,
} from "react-icons/fi";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Our Doctors", href: "/doctors" },
  { label: "Health Packages", href: "/health-packages" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact Us", href: "/contact" },
];

const aboutLinks = [
  { label: "About Hospital", href: "/about" },
  { label: "Mission & Vision", href: "/about/mission-vision" },
  { label: "Leadership", href: "/about/board-of-directors" },
  { label: "Our Facilities", href: "/about/facilities" },
  { label: "Achievements", href: "/about/achievements" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0B2745] text-white">
      <div className="container-main grid grid-cols-1 gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div>
          <Link href="/" className="mb-5 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1268B3]">
              <FiHeart size={24} />
            </div>
            <div>
              <h2 className="text-xl font-extrabold">
                MediCare<span className="text-[#55D6C2]">.</span>
              </h2>
              <p className="text-[9px] font-semibold tracking-[0.18em] text-blue-200">
                MULTISPECIALTY HOSPITAL
              </p>
            </div>
          </Link>

          <p className="max-w-xs text-sm leading-7 text-blue-100/70">
            Dedicated to delivering quality healthcare through experienced
            professionals, modern technology and compassionate care.
          </p>

          <div className="mt-6 flex gap-3">
            {[FiFacebook, FiInstagram, FiYoutube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label={["Facebook", "Instagram", "YouTube"][i]}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white transition hover:bg-[#1268B3]"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="mb-6 text-sm font-bold uppercase tracking-wider">
            Quick Links
          </h3>
          <ul className="space-y-4">
            {quickLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center gap-2 text-sm text-blue-100/70 transition hover:text-[#55D6C2]"
                >
                  <FiArrowUpRight size={14} />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* About */}
        <div>
          <h3 className="mb-6 text-sm font-bold uppercase tracking-wider">
            About Hospital
          </h3>
          <ul className="space-y-4">
            {aboutLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center gap-2 text-sm text-blue-100/70 transition hover:text-[#55D6C2]"
                >
                  <FiArrowUpRight size={14} />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="mb-6 text-sm font-bold uppercase tracking-wider">
            Contact Information
          </h3>

          <div className="space-y-5">
            <div className="flex gap-3 text-sm leading-6 text-blue-100/70">
              <FiMapPin className="mt-1 shrink-0 text-[#55D6C2]" size={18} />
              Dhaka, Bangladesh
            </div>

            <div className="flex gap-3 text-sm text-blue-100/70">
              <FiPhone className="shrink-0 text-[#55D6C2]" size={18} />
              +880 1700-000000
            </div>

            <div className="flex gap-3 text-sm text-blue-100/70">
              <FiMail className="shrink-0 text-[#55D6C2]" size={18} />
              info@medicare.com
            </div>
          </div>

          <div className="mt-7 rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs font-bold text-[#55D6C2]">
              EMERGENCY HELPLINE
            </p>
            <p className="mt-2 text-xl font-extrabold">+880 1700-000000</p>
            <p className="mt-1 text-xs text-blue-100/60">
              Available 24 hours a day
            </p>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10">
        <div className="container-main flex flex-col items-center justify-between gap-3 py-6 text-center text-xs text-blue-100/50 md:flex-row md:text-left">
          <p>
            © 2026 MediCare Hospital. All rights reserved.
          </p>
          <p>Designed with care for better healthcare.</p>
        </div>
      </div>
    </footer>
  );
}
