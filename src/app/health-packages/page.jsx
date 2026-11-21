
"use client";

import { useMemo, useState } from "react";
import {
  FiActivity,
  FiCheck,
  FiChevronDown,
  FiDroplet,
  FiHeart,
  FiPlus,
  FiSearch,
  FiShield,
  FiSun,
  FiUsers,
  FiWind,
  FiX,
  FiArrowUpRight,
} from "react-icons/fi";

const categories = [
  "All Packages",
  "General Health",
  "Men's Health",
  "Women's Health",
  "Senior Care",
];

const packages = [
  {
    id: 1,
    name: "Complete Health Checkup",
    category: "General Health",
    description:
      "A comprehensive overview of your general health with essential blood tests and clinical assessments.",
    price: 4500,
    oldPrice: 6000,
    icon: FiActivity,
    color: "blue",
    tests: [
      "Complete Blood Count (CBC)",
      "Fasting Blood Sugar",
      "Lipid Profile",
      "Liver Function Test",
      "Kidney Function Test",
      "Urine R/E",
      "ECG",
      "Chest X-ray",
    ],
  },
  {
    id: 2,
    name: "Essential Health Screening",
    category: "General Health",
    description:
      "A practical screening package covering several important health indicators.",
    price: 2200,
    oldPrice: 3000,
    icon: FiShield,
    color: "teal",
    tests: [
      "Complete Blood Count (CBC)",
      "Fasting Blood Sugar",
      "Lipid Profile",
      "Urine R/E",
      "Serum Creatinine",
    ],
  },
  {
    id: 3,
    name: "Men's Wellness Check",
    category: "Men's Health",
    description:
      "A screening package designed around selected health indicators for adult men.",
    price: 3800,
    oldPrice: 4800,
    icon: FiUsers,
    color: "indigo",
    tests: [
      "Complete Blood Count (CBC)",
      "Fasting Blood Sugar",
      "Lipid Profile",
      "Liver Function Test",
      "Kidney Function Test",
      "PSA",
      "Urine R/E",
    ],
  },
  {
    id: 4,
    name: "Women's Wellness Check",
    category: "Women's Health",
    description:
      "A selection of laboratory tests and screenings for women's general health.",
    price: 4200,
    oldPrice: 5500,
    icon: FiHeart,
    color: "rose",
    tests: [
      "Complete Blood Count (CBC)",
      "Fasting Blood Sugar",
      "Thyroid Profile",
      "Lipid Profile",
      "Urine R/E",
      "Vitamin D",
      "Hemoglobin",
    ],
  },
  {
    id: 5,
    name: "Senior Health Assessment",
    category: "Senior Care",
    description:
      "Selected tests to help assess common health indicators in older adults.",
    price: 5200,
    oldPrice: 6500,
    icon: FiSun,
    color: "amber",
    tests: [
      "Complete Blood Count (CBC)",
      "Fasting Blood Sugar",
      "HbA1c",
      "Lipid Profile",
      "Liver Function Test",
      "Kidney Function Test",
      "ECG",
      "Urine R/E",
    ],
  },
  {
    id: 6,
    name: "Diabetes Screening",
    category: "General Health",
    description:
      "A focused package covering blood glucose and selected related health indicators.",
    price: 1800,
    oldPrice: 2400,
    icon: FiDroplet,
    color: "cyan",
    tests: [
      "Fasting Blood Sugar",
      "HbA1c",
      "Urine R/E",
      "Serum Creatinine",
      "Lipid Profile",
    ],
  },
  {
    id: 7,
    name: "Respiratory Health Screening",
    category: "General Health",
    description:
      "Selected investigations that may support a clinician's respiratory health assessment.",
    price: 2600,
    oldPrice: 3400,
    icon: FiWind,
    color: "sky",
    tests: [
      "Chest X-ray",
      "Complete Blood Count (CBC)",
      "Spirometry",
      "ESR",
    ],
  },
];

const colorStyles = {
  blue: {
    icon: "bg-blue-50 text-blue-600",
    tag: "bg-blue-50 text-blue-700",
  },
  teal: {
    icon: "bg-teal-50 text-teal-600",
    tag: "bg-teal-50 text-teal-700",
  },
  indigo: {
    icon: "bg-indigo-50 text-indigo-600",
    tag: "bg-indigo-50 text-indigo-700",
  },
  rose: {
    icon: "bg-rose-50 text-rose-600",
    tag: "bg-rose-50 text-rose-700",
  },
  amber: {
    icon: "bg-amber-50 text-amber-600",
    tag: "bg-amber-50 text-amber-700",
  },
  cyan: {
    icon: "bg-cyan-50 text-cyan-600",
    tag: "bg-cyan-50 text-cyan-700",
  },
  sky: {
    icon: "bg-sky-50 text-sky-600",
    tag: "bg-sky-50 text-sky-700",
  },
};

function formatPrice(price) {
  return `৳${price.toLocaleString("en-BD")}`;
}

function PackageIcon({ icon: Icon, color = "blue" }) {
  const styles = colorStyles[color] || colorStyles.blue;

  return (
    <div
      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${styles.icon}`}
    >
      <Icon size={21} />
    </div>
  );
}

function PackageCard({ item }) {
  const [expanded, setExpanded] = useState(false);
  const styles = colorStyles[item.color] || colorStyles.blue;
  const Icon = item.icon;

  return (
    <article className="group flex h-full flex-col rounded-[22px] border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_18px_45px_rgba(15,55,100,0.09)] sm:p-7">
      <div className="flex items-start justify-between gap-3">
        <PackageIcon icon={Icon} color={item.color} />

        <span
          className={`rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] ${styles.tag}`}
        >
          {item.category}
        </span>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-bold tracking-tight text-slate-900 transition-colors group-hover:text-blue-700">
          {item.name}
        </h3>

        <p className="mt-2 min-h-[48px] text-sm leading-6 text-slate-500">
          {item.description}
        </p>
      </div>

      <div className="mt-6 border-t border-slate-100 pt-5">
        <div className="flex items-end gap-2">
          <span className="text-3xl font-extrabold tracking-tight text-slate-900">
            {formatPrice(item.price)}
          </span>

          <span className="pb-1 text-sm text-slate-400 line-through">
            {formatPrice(item.oldPrice)}
          </span>
        </div>

        <p className="mt-1 text-xs text-slate-400">
          Sample package pricing
        </p>
      </div>

      <div className="mt-6">
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          className="flex w-full items-center justify-between border-b border-slate-100 pb-3 text-left"
        >
          <span className="text-sm font-bold text-slate-800">
            Included tests
            <span className="ml-2 text-xs font-medium text-slate-400">
              ({item.tests.length})
            </span>
          </span>

          <FiChevronDown
            className={`text-slate-500 transition-transform duration-300 ${
              expanded ? "rotate-180" : ""
            }`}
          />
        </button>

        <div
          className={`grid transition-all duration-300 ${
            expanded
              ? "mt-4 grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <ul className="space-y-3">
              {item.tests.map((test) => (
                <li
                  key={test}
                  className="flex items-start gap-2.5 text-sm text-slate-600"
                >
                  <FiCheck className="mt-0.5 shrink-0 text-teal-600" />
                  <span>{test}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {!expanded && (
          <div className="mt-4 flex flex-wrap gap-2">
            {item.tests.slice(0, 3).map((test) => (
              <span
                key={test}
                className="rounded-lg bg-slate-50 px-2.5 py-1.5 text-[11px] font-medium text-slate-500"
              >
                {test}
              </span>
            ))}

            {item.tests.length > 3 && (
              <span className="rounded-lg bg-blue-50 px-2.5 py-1.5 text-[11px] font-semibold text-blue-600">
                +{item.tests.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>

      <div className="mt-auto pt-7">
        <div className="flex items-center gap-2 border-t border-slate-100 pt-5 text-xs leading-5 text-slate-400">
          <FiShield className="shrink-0 text-teal-600" />
          <span>Package details are for demonstration purposes.</span>
        </div>
      </div>
    </article>
  );
}

export default function HealthPackagesPage() {
  const [activeCategory, setActiveCategory] = useState("All Packages");
  const [search, setSearch] = useState("");

  const filteredPackages = useMemo(() => {
    return packages.filter((item) => {
      const matchesCategory =
        activeCategory === "All Packages" ||
        item.category === activeCategory;

      const searchText = search.trim().toLowerCase();

      const matchesSearch =
        !searchText ||
        item.name.toLowerCase().includes(searchText) ||
        item.description.toLowerCase().includes(searchText) ||
        item.tests.some((test) =>
          test.toLowerCase().includes(searchText)
        );

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  return (
    <main className="min-h-screen bg-[#f7f9fc]">
      {/* Package directory */}
      <section className="container-main py-12 sm:py-16 lg:py-20">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-teal-600">
              Explore our collection
            </p>

            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
              Health Packages
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
              Explore health screening packages, compare included tests,
              and find the information you need.
            </p>
          </div>

          <div className="relative w-full lg:max-w-xs">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search packages or tests..."
              aria-label="Search health packages"
              className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-10 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <FiX size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Category filters */}
        <div className="mt-8 flex gap-2.5 overflow-x-auto pb-3">
          {categories.map((category) => {
            const active = activeCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                aria-pressed={active}
                className={`shrink-0 rounded-full px-5 py-3 text-xs font-bold transition-all duration-200 sm:text-sm ${
                  active
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/15"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Package cards */}
        {filteredPackages.length > 0 ? (
          <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredPackages.map((item) => (
              <PackageCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
              <FiSearch size={24} />
            </div>

            <h3 className="mt-5 text-lg font-bold text-slate-800">
              No matching packages
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Try another search term or choose a different category.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setActiveCategory("All Packages");
              }}
              className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700"
            >
              Clear filters <FiArrowUpRight />
            </button>
          </div>
        )}
      </section>

      {/* Patient information */}
      <section className="border-t border-slate-200 bg-white">
        <div className="container-main grid gap-8 py-12 sm:grid-cols-3 sm:gap-6 sm:py-14">
          <div className="flex gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <FiShield size={21} />
            </div>

            <div>
              <h3 className="font-bold text-slate-900">
                Understand your package
              </h3>
              <p className="mt-1 text-sm leading-6 text-slate-500">
                Review the listed investigations and confirm what is included.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
              <FiActivity size={21} />
            </div>

            <div>
              <h3 className="font-bold text-slate-900">
                Follow professional advice
              </h3>
              <p className="mt-1 text-sm leading-6 text-slate-500">
                A healthcare professional can help determine which tests are
                appropriate.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <FiUsers size={21} />
            </div>

            <div>
              <h3 className="font-bold text-slate-900">
                Know before visiting
              </h3>
              <p className="mt-1 text-sm leading-6 text-slate-500">
                Confirm preparation instructions, availability, and final
                pricing with the hospital.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-[#f7f9fc] py-5">
        <div className="container-main">
          <p className="text-center text-xs leading-6 text-slate-400">
            Demonstration content only. Package names, tests, prices, and
            discounts are sample data and must be reviewed and approved by
            the hospital's clinical team before going live.
          </p>
        </div>
      </div>
    </main>
  );
}
