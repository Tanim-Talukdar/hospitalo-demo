
"use client";

import { useMemo, useState } from "react";
import {
  FiSearch,
  FiAward,
  FiClock,
  FiUsers,
  FiArrowRight,
  FiX,
} from "react-icons/fi";

const doctors = [
  {
    name: "Dr. Sarah Ahmed",
    specialty: "Cardiology",
    qualification: "MBBS, MD (Cardiology)",
    experience: "15+ Years",
    description:
      "Specialized in cardiovascular health, heart disease prevention, and advanced cardiac care.",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=700&auto=format&fit=crop&q=85",
  },
  {
    name: "Dr. Michael Rahman",
    specialty: "Neurology",
    qualification: "MBBS, FCPS (Neurology)",
    experience: "12+ Years",
    description:
      "Experienced in neurological consultations, migraine management, and nervous system disorders.",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=700&auto=format&fit=crop&q=85",
  },
  {
    name: "Dr. Emily Wilson",
    specialty: "Ophthalmology",
    qualification: "MBBS, MS (Ophthalmology)",
    experience: "10+ Years",
    description:
      "Provides comprehensive eye examinations, vision care, and treatment for eye conditions.",
    image:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=700&auto=format&fit=crop&q=85",
  },
  {
    name: "Dr. James Anderson",
    specialty: "Orthopedics",
    qualification: "MBBS, MS (Orthopedics)",
    experience: "14+ Years",
    description:
      "Focused on bone and joint health, sports injuries, and musculoskeletal care.",
    image:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=700&auto=format&fit=crop&q=85",
  },
  {
    name: "Dr. Nadia Karim",
    specialty: "Pulmonology",
    qualification: "MBBS, MD (Chest Medicine)",
    experience: "11+ Years",
    description:
      "Specialized in respiratory health, asthma management, and lung-related conditions.",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=700&auto=format&fit=crop&q=85",
  },
  {
    name: "Dr. David Morgan",
    specialty: "Diagnostics",
    qualification: "MBBS, DMRT",
    experience: "13+ Years",
    description:
      "Experienced in diagnostic imaging, medical evaluation, and radiology services.",
    image:
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=700&auto=format&fit=crop&q=85",
  },
];

const specialties = [
  "All Departments",
  "Cardiology",
  "Neurology",
  "Ophthalmology",
  "Orthopedics",
  "Pulmonology",
  "Diagnostics",
];

export default function DoctorsPage() {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All Departments");

  const filteredDoctors = useMemo(() => {
    return doctors.filter((doctor) => {
      const matchesDepartment =
        department === "All Departments" ||
        doctor.specialty === department;

      const searchText =
        `${doctor.name} ${doctor.specialty} ${doctor.qualification}`.toLowerCase();

      return matchesDepartment && searchText.includes(search.toLowerCase());
    });
  }, [search, department]);

  return (
    <main className="bg-white">
      <section className="container-main pb-20 pt-12 sm:pt-16">
        {/* Compact page heading */}
        <div className="mb-9">
          <span className="section-label">Our Medical Team</span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-[#102b49] sm:text-4xl">
            Find the Right Doctor
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
            Explore our experienced medical professionals by name or
            specialty to find the right care for your health needs.
          </p>
        </div>

        {/* Search and filter */}
        <div className="mb-8 flex flex-col gap-3 rounded-2xl border border-slate-100 bg-[#f8fbfd] p-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <FiSearch
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={19}
            />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search doctors by name, specialty or qualification..."
              aria-label="Search doctors"
              className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-700 outline-none transition focus:border-[#1475b9] focus:ring-4 focus:ring-blue-100"
            />
          </div>

          <select
            value={department}
            onChange={(event) => setDepartment(event.target.value)}
            aria-label="Filter by department"
            className="h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none focus:border-[#1475b9] focus:ring-4 focus:ring-blue-100 sm:w-56"
          >
            {specialties.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* Results */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-semibold text-[#102b49]">
              {filteredDoctors.length}
            </span>{" "}
            doctors
          </p>

          {(search || department !== "All Departments") && (
            <button
              onClick={() => {
                setSearch("");
                setDepartment("All Departments");
              }}
              className="flex items-center gap-1 text-sm font-semibold text-[#1475b9] hover:text-[#0b4f91]"
            >
              <FiX size={15} />
              Clear filters
            </button>
          )}
        </div>

        {/* Doctor cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredDoctors.map((doctor) => (
            <article
              key={doctor.name}
              className="group overflow-hidden rounded-2xl border border-slate-100 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/70"
            >
              <div className="relative h-[270px] overflow-hidden bg-[#edf4f8]">
                <img
                  src={doctor.image}
                  alt={`${doctor.name}, ${doctor.specialty} specialist`}
                  loading="lazy"
                  className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-105"
                />
                <span className="absolute bottom-4 left-4 rounded-lg bg-white/95 px-4 py-2 text-xs font-bold text-[#1475b9] shadow-sm">
                  {doctor.specialty}
                </span>
              </div>

              <div className="p-6">
                <h2 className="text-xl font-bold text-[#102b49]">
                  {doctor.name}
                </h2>
                <p className="mt-2 text-sm font-medium text-[#1475b9]">
                  {doctor.qualification}
                </p>
                <p className="mt-4 min-h-[66px] text-sm leading-6 text-slate-500">
                  {doctor.description}
                </p>
                <div className="mt-5 flex items-center gap-2 border-t border-slate-100 pt-4 text-xs font-medium text-slate-500">
                  <FiClock className="text-[#1475b9]" size={15} />
                  {doctor.experience} Experience
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredDoctors.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-200 py-16 text-center">
            <FiSearch className="mx-auto text-slate-300" size={34} />
            <h3 className="mt-4 text-lg font-bold text-[#102b49]">
              No doctors found
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Try another name or select a different department.
            </p>
          </div>
        )}
      </section>
    </main>
  );

}
