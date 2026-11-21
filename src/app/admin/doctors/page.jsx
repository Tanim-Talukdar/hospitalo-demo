
"use client";

import { useMemo, useState } from "react";
import {
  FiActivity,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiEdit2,
  FiImage,
  FiMail,
  FiPhone,
  FiPlus,
  FiSearch,
  FiTrash2,
  FiUser,
  FiUsers,
  FiX,
} from "react-icons/fi";

const departments = [
  "Cardiology",
  "Neurology",
  "Orthopedics",
  "Pediatrics",
  "Dermatology",
  "General Medicine",
  "Gynecology",
  "Dental",
];

const weekdays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const initialDoctors = [
  {
    id: 1,
    name: "Dr. Sarah Ahmed",
    specialty: "Cardiologist",
    department: "Cardiology",
    qualification: "MBBS, MD (Cardiology)",
    experience: "12",
    phone: "+880 1712-345678",
    email: "sarah@medicare.com",
    fee: "1200",
    status: "Available",
    image: "",
    days: ["Sunday", "Monday", "Tuesday", "Wednesday"],
    startTime: "09:00",
    endTime: "14:00",
  },
  {
    id: 2,
    name: "Dr. Mahmud Rahman",
    specialty: "Neurologist",
    department: "Neurology",
    qualification: "MBBS, FCPS (Neurology)",
    experience: "15",
    phone: "+880 1812-345678",
    email: "mahmud@medicare.com",
    fee: "1500",
    status: "Available",
    image: "",
    days: ["Sunday", "Tuesday", "Thursday"],
    startTime: "10:00",
    endTime: "15:00",
  },
  {
    id: 3,
    name: "Dr. Nusrat Jahan",
    specialty: "Pediatrician",
    department: "Pediatrics",
    qualification: "MBBS, DCH",
    experience: "8",
    phone: "+880 1912-345678",
    email: "nusrat@medicare.com",
    fee: "1000",
    status: "On Leave",
    image: "",
    days: ["Monday", "Wednesday", "Friday"],
    startTime: "09:00",
    endTime: "13:00",
  },
  {
    id: 4,
    name: "Dr. Tanvir Hasan",
    specialty: "Orthopedic Surgeon",
    department: "Orthopedics",
    qualification: "MBBS, MS (Orthopedics)",
    experience: "10",
    phone: "+880 1612-345678",
    email: "tanvir@medicare.com",
    fee: "1300",
    status: "Available",
    image: "",
    days: ["Sunday", "Monday", "Thursday"],
    startTime: "11:00",
    endTime: "16:00",
  },
  {
    id: 5,
    name: "Dr. Farhana Islam",
    specialty: "Dermatologist",
    department: "Dermatology",
    qualification: "MBBS, DDV",
    experience: "7",
    phone: "+880 1512-345678",
    email: "farhana@medicare.com",
    fee: "900",
    status: "Unavailable",
    image: "",
    days: ["Saturday", "Sunday", "Tuesday"],
    startTime: "10:00",
    endTime: "14:00",
  },
  {
    id: 6,
    name: "Dr. Imran Chowdhury",
    specialty: "General Physician",
    department: "General Medicine",
    qualification: "MBBS, FCPS",
    experience: "18",
    phone: "+880 1712-987654",
    email: "imran@medicare.com",
    fee: "1100",
    status: "Available",
    image: "",
    days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
    startTime: "08:00",
    endTime: "13:00",
  },
];

const emptyForm = {
  name: "",
  specialty: "",
  department: "",
  qualification: "",
  experience: "",
  phone: "",
  email: "",
  fee: "",
  status: "Available",
  image: "",
  days: [],
  startTime: "09:00",
  endTime: "14:00",
};

function getInitials(name = "") {
  return name
    .replace(/^Dr\.\s*/i, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function DoctorAvatar({ doctor, size = "large" }) {
  const dimensions =
    size === "small"
      ? "h-11 w-11 text-sm"
      : size === "profile"
        ? "h-24 w-24 text-2xl"
        : "h-16 w-16 text-lg";

  return (
    <div
      className={`${dimensions} flex shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-blue-50 font-bold text-blue-700`}
    >
      {doctor.image ? (
        <img
          src={doctor.image}
          alt={doctor.name}
          className="h-full w-full object-cover"
        />
      ) : (
        <span>{getInitials(doctor.name)}</span>
      )}
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    Available: "bg-emerald-50 text-emerald-700",
    "On Leave": "bg-amber-50 text-amber-700",
    Unavailable: "bg-slate-100 text-slate-600",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
        styles[status] || styles.Unavailable
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

function Modal({ title, subtitle, onClose, children, size = "max-w-2xl" }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className={`my-auto w-full ${size} overflow-hidden rounded-2xl bg-white shadow-2xl`}
      >
        <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5">
          <div>
            <h2 className="text-lg font-bold text-slate-900">{title}</h2>
            {subtitle && (
              <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close modal"
          >
            <FiX size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState(initialDoctors);
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All Departments");
  const [statusFilter, setStatusFilter] = useState("All Statuses");

  const [modal, setModal] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [imageError, setImageError] = useState("");
  const [deleteId, setDeleteId] = useState(null);

  const stats = useMemo(
    () => ({
      total: doctors.length,
      available: doctors.filter((doctor) => doctor.status === "Available")
        .length,
      onLeave: doctors.filter((doctor) => doctor.status === "On Leave").length,
      departments: new Set(doctors.map((doctor) => doctor.department)).size,
    }),
    [doctors]
  );

  const filteredDoctors = useMemo(() => {
    const query = search.trim().toLowerCase();

    return doctors.filter((doctor) => {
      const matchesSearch =
        !query ||
        [
          doctor.name,
          doctor.specialty,
          doctor.department,
          doctor.email,
          doctor.phone,
        ].some((value) => value?.toLowerCase().includes(query));

      const matchesDepartment =
        departmentFilter === "All Departments" ||
        doctor.department === departmentFilter;

      const matchesStatus =
        statusFilter === "All Statuses" || doctor.status === statusFilter;

      return matchesSearch && matchesDepartment && matchesStatus;
    });
  }, [doctors, search, departmentFilter, statusFilter]);

  function openCreateModal() {
    setEditingId(null);
    setForm({ ...emptyForm });
    setImageError("");
    setModal("form");
  }

  function openEditModal(doctor) {
    setEditingId(doctor.id);
    setForm({
      ...emptyForm,
      ...doctor,
      days: [...(doctor.days || [])],
    });
    setImageError("");
    setModal("form");
  }

  function handleImageUpload(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setImageError("Please upload a JPG, PNG, or WebP image.");
      event.target.value = "";
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setImageError("Image size must be 2MB or less.");
      event.target.value = "";
      return;
    }

    setImageError("");

    const reader = new FileReader();

    reader.onload = () => {
      setForm((current) => ({
        ...current,
        image: reader.result,
      }));
    };

    reader.onerror = () => {
      setImageError("Could not read this image. Please try again.");
    };

    reader.readAsDataURL(file);
  }

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function toggleDay(day) {
    setForm((current) => ({
      ...current,
      days: current.days.includes(day)
        ? current.days.filter((item) => item !== day)
        : [...current.days, day],
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const doctorData = {
      ...form,
      experience: String(form.experience),
      fee: String(form.fee),
      days: [...form.days],
    };

    if (editingId !== null) {
      setDoctors((current) =>
        current.map((doctor) =>
          doctor.id === editingId
            ? { ...doctor, ...doctorData, id: editingId }
            : doctor
        )
      );
    } else {
      const newDoctor = {
        ...doctorData,
        id: Date.now(),
      };

      setDoctors((current) => [newDoctor, ...current]);
    }

    setModal("");
    setForm({ ...emptyForm });
    setEditingId(null);
  }

  function confirmDelete() {
    setDoctors((current) =>
      current.filter((doctor) => doctor.id !== deleteId)
    );

    if (selectedDoctor?.id === deleteId) {
      setSelectedDoctor(null);
    }

    setDeleteId(null);
  }

  return (
    <div className="space-y-6 pb-10">
      {/* Page heading */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
            Hospital Management
          </p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
            Doctors & Staff
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage doctor profiles, departments, schedules and availability.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateModal}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
        >
          <FiPlus size={17} />
          Add New Doctor
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {[
          {
            label: "Total Doctors",
            value: stats.total,
            icon: FiUsers,
            color: "bg-blue-50 text-blue-600",
          },
          {
            label: "Available",
            value: stats.available,
            icon: FiCheckCircle,
            color: "bg-emerald-50 text-emerald-600",
          },
          {
            label: "On Leave",
            value: stats.onLeave,
            icon: FiCalendar,
            color: "bg-amber-50 text-amber-600",
          },
          {
            label: "Departments",
            value: stats.departments,
            icon: FiActivity,
            color: "bg-violet-50 text-violet-600",
          },
        ].map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    {item.label}
                  </p>
                  <p className="mt-2 text-2xl font-bold text-slate-900">
                    {item.value}
                  </p>
                </div>
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${item.color}`}
                >
                  <Icon size={20} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Search and filters */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="grid gap-3 md:grid-cols-[1fr_220px_180px]">
          <div className="relative">
            <FiSearch
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by doctor name, specialty, phone..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
            />
          </div>

          <select
            value={departmentFilter}
            onChange={(event) => setDepartmentFilter(event.target.value)}
            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none focus:border-blue-400"
          >
            <option>All Departments</option>
            {departments.map((department) => (
              <option key={department}>{department}</option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none focus:border-blue-400"
          >
            <option>All Statuses</option>
            <option>Available</option>
            <option>On Leave</option>
            <option>Unavailable</option>
          </select>
        </div>
      </div>

      {/* Doctor cards */}
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-slate-900">
          Doctor Directory
        </h2>
        <p className="text-sm text-slate-500">
          {filteredDoctors.length} doctors found
        </p>
      </div>

      {filteredDoctors.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
          <FiUsers className="mx-auto text-slate-300" size={36} />
          <h3 className="mt-4 font-semibold text-slate-800">
            No doctors found
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Try changing your search or filter.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 2xl:grid-cols-3">
          {filteredDoctors.map((doctor) => (
            <div
              key={doctor.id}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-slate-200/60"
            >
              <div className="p-5">
                <div className="flex items-start gap-4">
                  <DoctorAvatar doctor={doctor} />

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-bold text-slate-900">
                        {doctor.name}
                      </h3>
                    </div>
                    <p className="mt-1 text-sm font-medium text-blue-600">
                      {doctor.specialty}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {doctor.department}
                    </p>
                  </div>
                </div>

                <div className="mt-5 space-y-3 border-t border-slate-100 pt-4">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <FiActivity className="shrink-0 text-slate-400" />
                    <span>{doctor.experience} years of experience</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <FiPhone className="shrink-0 text-slate-400" />
                    <span>{doctor.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <FiClock className="shrink-0 text-slate-400" />
                    <span>
                      {doctor.startTime} – {doctor.endTime}
                    </span>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between gap-3">
                  <StatusBadge status={doctor.status} />
                  <p className="text-sm font-bold text-slate-900">
                    ৳{Number(doctor.fee || 0).toLocaleString("en-BD")}
                    <span className="ml-1 text-xs font-normal text-slate-400">
                      / visit
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/70 px-5 py-3">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedDoctor(doctor);
                    setModal("profile");
                  }}
                  className="text-sm font-semibold text-blue-600 transition hover:text-blue-800"
                >
                  View Profile
                </button>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => openEditModal(doctor)}
                    className="rounded-lg p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
                    aria-label={`Edit ${doctor.name}`}
                  >
                    <FiEdit2 size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleteId(doctor.id)}
                    className="rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                    aria-label={`Delete ${doctor.name}`}
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Doctor Modal */}
      {modal === "form" && (
        <Modal
          title={editingId ? "Edit Doctor Profile" : "Add New Doctor"}
          subtitle="Enter the doctor's professional and contact information."
          onClose={() => setModal("")}
          size="max-w-3xl"
        >
          <form onSubmit={handleSubmit} className="max-h-[75vh] overflow-y-auto">
            <div className="space-y-7 p-6">
              {/* Profile photo */}
              <section>
                <h3 className="mb-4 text-sm font-bold text-slate-900">
                  Doctor Profile Photo
                </h3>

                <div className="flex flex-col gap-5 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center">
                  <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white">
                    {form.image ? (
                      <img
                        src={form.image}
                        alt="Doctor preview"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <FiImage size={30} className="text-slate-300" />
                    )}
                  </div>

                  <div className="flex-1">
                    <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:text-blue-600">
                      <FiImage size={16} />
                      Upload Photo
                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>

                    {form.image && (
                      <button
                        type="button"
                        onClick={() =>
                          setForm((current) => ({
                            ...current,
                            image: "",
                          }))
                        }
                        className="ml-3 text-sm font-medium text-red-600 hover:text-red-700"
                      >
                        Remove
                      </button>
                    )}

                    <p className="mt-2 text-xs text-slate-500">
                      JPG, PNG or WebP. Maximum file size: 2MB.
                    </p>

                    {imageError && (
                      <p className="mt-2 text-xs font-medium text-red-600">
                        {imageError}
                      </p>
                    )}
                  </div>
                </div>
              </section>

              {/* Professional information */}
              <section>
                <h3 className="mb-4 text-sm font-bold text-slate-900">
                  Professional Information
                </h3>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      Doctor Name *
                    </label>
                    <input
                      required
                      name="name"
                      value={form.name}
                      onChange={updateField}
                      placeholder="e.g. Dr. Sarah Ahmed"
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      Specialty *
                    </label>
                    <input
                      required
                      name="specialty"
                      value={form.specialty}
                      onChange={updateField}
                      placeholder="e.g. Cardiologist"
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      Department *
                    </label>
                    <select
                      required
                      name="department"
                      value={form.department}
                      onChange={updateField}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-400"
                    >
                      <option value="">Select department</option>
                      {departments.map((department) => (
                        <option key={department}>{department}</option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      Qualification *
                    </label>
                    <input
                      required
                      name="qualification"
                      value={form.qualification}
                      onChange={updateField}
                      placeholder="e.g. MBBS, FCPS"
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      Years of Experience *
                    </label>
                    <input
                      required
                      type="number"
                      min="0"
                      name="experience"
                      value={form.experience}
                      onChange={updateField}
                      placeholder="e.g. 10"
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-400"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      Consultation Fee (৳) *
                    </label>
                    <input
                      required
                      type="number"
                      min="0"
                      name="fee"
                      value={form.fee}
                      onChange={updateField}
                      placeholder="e.g. 1000"
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-400"
                    />
                  </div>
                </div>
              </section>

              {/* Contact information */}
              <section>
                <h3 className="mb-4 text-sm font-bold text-slate-900">
                  Contact Information
                </h3>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      Phone Number *
                    </label>
                    <input
                      required
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={updateField}
                      placeholder="+880 1XXX-XXXXXX"
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-400"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={updateField}
                      placeholder="doctor@medicare.com"
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-400"
                    />
                  </div>
                </div>
              </section>

              {/* Schedule */}
              <section>
                <h3 className="mb-4 text-sm font-bold text-slate-900">
                  Schedule & Availability
                </h3>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      Start Time
                    </label>
                    <input
                      type="time"
                      name="startTime"
                      value={form.startTime}
                      onChange={updateField}
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-400"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      End Time
                    </label>
                    <input
                      type="time"
                      name="endTime"
                      value={form.endTime}
                      onChange={updateField}
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-400"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="mb-3 block text-sm font-medium text-slate-700">
                      Available Days
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {weekdays.map((day) => {
                        const active = form.days.includes(day);

                        return (
                          <button
                            key={day}
                            type="button"
                            onClick={() => toggleDay(day)}
                            className={`rounded-lg border px-3 py-2 text-xs font-semibold transition ${
                              active
                                ? "border-blue-600 bg-blue-600 text-white"
                                : "border-slate-200 bg-white text-slate-600 hover:border-blue-300"
                            }`}
                          >
                            {day.slice(0, 3)}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      Doctor Status
                    </label>
                    <select
                      name="status"
                      value={form.status}
                      onChange={updateField}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-400"
                    >
                      <option>Available</option>
                      <option>On Leave</option>
                      <option>Unavailable</option>
                    </select>
                  </div>
                </div>
              </section>
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50 px-6 py-4 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setModal("")}
                className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                {editingId ? "Save Changes" : "Add Doctor"}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Doctor profile modal */}
      {modal === "profile" && selectedDoctor && (
        <Modal
          title="Doctor Profile"
          subtitle="Professional details and availability."
          onClose={() => setModal("")}
          size="max-w-xl"
        >
          <div className="max-h-[75vh] space-y-6 overflow-y-auto p-6">
            <div className="flex flex-col items-center rounded-2xl bg-blue-50/70 p-6 text-center">
              <DoctorAvatar doctor={selectedDoctor} size="profile" />
              <h3 className="mt-4 text-xl font-bold text-slate-900">
                {selectedDoctor.name}
              </h3>
              <p className="mt-1 text-sm font-medium text-blue-600">
                {selectedDoctor.specialty}
              </p>
              <p className="mt-1 text-sm text-slate-500">
                {selectedDoctor.department}
              </p>
              <div className="mt-3">
                <StatusBadge status={selectedDoctor.status} />
              </div>
            </div>

            <div>
              <h4 className="mb-3 text-sm font-bold text-slate-900">
                Professional Details
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-500">Qualification</p>
                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    {selectedDoctor.qualification || "Not provided"}
                  </p>
                </div>
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-500">Experience</p>
                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    {selectedDoctor.experience} years
                  </p>
                </div>
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-500">Consultation Fee</p>
                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    ৳{Number(selectedDoctor.fee || 0).toLocaleString("en-BD")}
                  </p>
                </div>
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-500">Department</p>
                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    {selectedDoctor.department}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="mb-3 text-sm font-bold text-slate-900">
                Contact Information
              </h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <FiPhone className="text-blue-600" />
                  {selectedDoctor.phone}
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <FiMail className="text-blue-600" />
                  {selectedDoctor.email || "No email provided"}
                </div>
              </div>
            </div>

            <div>
              <h4 className="mb-3 text-sm font-bold text-slate-900">
                Weekly Schedule
              </h4>
              <div className="rounded-xl bg-slate-50 p-4">
                <div className="flex flex-wrap gap-2">
                  {(selectedDoctor.days || []).length > 0 ? (
                    selectedDoctor.days.map((day) => (
                      <span
                        key={day}
                        className="rounded-lg bg-white px-3 py-2 text-xs font-semibold text-slate-700"
                      >
                        {day}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-slate-500">
                      No schedule added.
                    </span>
                  )}
                </div>
                <p className="mt-4 flex items-center gap-2 text-sm text-slate-600">
                  <FiClock className="text-blue-600" />
                  {selectedDoctor.startTime} – {selectedDoctor.endTime}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => openEditModal(selectedDoctor)}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              <FiEdit2 size={16} />
              Edit Doctor Profile
            </button>
          </div>
        </Modal>
      )}

      {/* Delete confirmation */}
      {deleteId !== null && (
        <Modal
          title="Delete Doctor"
          subtitle="This action will remove this doctor from the current demo list."
          onClose={() => setDeleteId(null)}
          size="max-w-md"
        >
          <div className="p-6">
            <div className="flex items-start gap-3 rounded-xl bg-red-50 p-4">
              <FiTrash2 className="mt-0.5 shrink-0 text-red-600" size={20} />
              <p className="text-sm leading-6 text-red-800">
                Are you sure you want to delete this doctor? This action cannot
                be undone in this demo.
              </p>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteId(null)}
                className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
              >
                Delete Doctor
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
