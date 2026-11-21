
"use client";

import { useMemo, useState } from "react";
import {
  FiUsers,
  FiUserPlus,
  FiSearch,
  FiFilter,
  FiEye,
  FiPhone,
  FiMail,
  FiX,
  FiChevronLeft,
  FiChevronRight,
  FiCheckCircle,
  FiUser,
} from "react-icons/fi";

const initialPatients = [
  {
    id: "MC-2026-001",
    name: "Sarah Ahmed",
    age: 28,
    gender: "Female",
    phone: "+880 1712-345678",
    email: "sarah.ahmed@email.com",
    blood: "O+",
    visits: 8,
    lastVisit: "Nov 20, 2026",
    status: "Active",
  },
  {
    id: "MC-2026-002",
    name: "Mohammad Rahman",
    age: 45,
    gender: "Male",
    phone: "+880 1812-456789",
    email: "m.rahman@email.com",
    blood: "B+",
    visits: 12,
    lastVisit: "Nov 21, 2026",
    status: "Active",
  },
  {
    id: "MC-2026-003",
    name: "Nusrat Jahan",
    age: 34,
    gender: "Female",
    phone: "+880 1912-567890",
    email: "nusrat@email.com",
    blood: "A+",
    visits: 4,
    lastVisit: "Nov 18, 2026",
    status: "Active",
  },
  {
    id: "MC-2026-004",
    name: "Tanvir Hasan",
    age: 52,
    gender: "Male",
    phone: "+880 1612-678901",
    email: "tanvir@email.com",
    blood: "AB+",
    visits: 15,
    lastVisit: "Nov 15, 2026",
    status: "Inactive",
  },
  {
    id: "MC-2026-005",
    name: "Ayesha Siddika",
    age: 23,
    gender: "Female",
    phone: "+880 1512-789012",
    email: "ayesha@email.com",
    blood: "O-",
    visits: 2,
    lastVisit: "Nov 19, 2026",
    status: "Active",
  },
  {
    id: "MC-2026-006",
    name: "Imran Hossain",
    age: 39,
    gender: "Male",
    phone: "+880 1312-890123",
    email: "imran@email.com",
    blood: "B-",
    visits: 6,
    lastVisit: "Nov 12, 2026",
    status: "Active",
  },
  {
    id: "MC-2026-007",
    name: "Farzana Akter",
    age: 31,
    gender: "Female",
    phone: "+880 1412-901234",
    email: "farzana@email.com",
    blood: "A-",
    visits: 3,
    lastVisit: "Nov 10, 2026",
    status: "Inactive",
  },
  {
    id: "MC-2026-008",
    name: "Rakibul Islam",
    age: 41,
    gender: "Male",
    phone: "+880 1713-012345",
    email: "rakib@email.com",
    blood: "O+",
    visits: 9,
    lastVisit: "Nov 08, 2026",
    status: "Active",
  },
];

const emptyForm = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  gender: "Male",
  blood: "Unknown",
  maritalStatus: "Single",
  phone: "",
  alternatePhone: "",
  email: "",
  address: "",
  city: "",
  postalCode: "",
  emergencyName: "",
  emergencyRelation: "",
  emergencyPhone: "",
  allergies: "",
  medicalConditions: "",
  currentMedications: "",
  notes: "",
};

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10";

function Field({ label, children }) {
  return (
    <div>
      <label className="mb-2 block text-xs font-semibold text-slate-600">
        {label}
      </label>
      {children}
    </div>
  );
}

function Divider() {
  return <div className="border-t border-slate-100" />;
}

function SectionHeading({ number, title, description }) {
  return (
    <div className="mb-5">
      <h3 className="font-bold text-slate-900">
        <span className="mr-2 text-blue-600">{number}.</span>
        {title}
      </h3>
      <p className="mt-1 text-xs text-slate-400">{description}</p>
    </div>
  );
}

export default function PatientsPage() {
  const [patients, setPatients] = useState(initialPatients);
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("All");
  const [status, setStatus] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [page, setPage] = useState(1);
  const [notice, setNotice] = useState("");

  const pageSize = 6;

  const filteredPatients = useMemo(() => {
    return patients.filter((patient) => {
      const matchesSearch = [
        patient.name,
        patient.id,
        patient.phone,
        patient.email,
      ]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());

      return (
        matchesSearch &&
        (gender === "All" || patient.gender === gender) &&
        (status === "All" || patient.status === status)
      );
    });
  }, [patients, search, gender, status]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredPatients.length / pageSize)
  );

  const visiblePatients = filteredPatients.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const activeCount = patients.filter(
    (patient) => patient.status === "Active"
  ).length;

  const updateForm = (key, value) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const closeForm = () => {
    setShowForm(false);
    setForm(emptyForm);
  };

  const registerPatient = (event) => {
    event.preventDefault();

    const today = new Date();
    const birthDate = new Date(`${form.dateOfBirth}T00:00:00`);
    const age = today.getFullYear() - birthDate.getFullYear() -
      (
        today.getMonth() < birthDate.getMonth() ||
        (today.getMonth() === birthDate.getMonth() &&
          today.getDate() < birthDate.getDate())
          ? 1
          : 0
      );

    if (age < 0 || age > 120) {
      setNotice("Please enter a valid date of birth.");
      return;
    }

    const newPatient = {
      ...form,
      id: `MC-2026-${String(patients.length + 1).padStart(3, "0")}`,
      name: `${form.firstName.trim()} ${form.lastName.trim()}`.trim(),
      age,
      visits: 0,
      lastVisit: "No visits yet",
      status: "Active",
    };

    setPatients((current) => [newPatient, ...current]);
    closeForm();
    setSearch("");
    setGender("All");
    setStatus("All");
    setPage(1);
    setNotice("Patient registered successfully.");

    setTimeout(() => setNotice(""), 3000);
  };

  return (
    <div className="space-y-7">
      {/* Page heading */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-medium text-slate-400">
            <span>Workspace</span>
            <span>/</span>
            <span className="text-blue-600">Patients</span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Patient Management
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage patient information and registration records.
          </p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
        >
          <FiUserPlus size={17} />
          Register Patient
        </button>
      </div>

      {/* Notification */}
      {notice && (
        <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
          <FiCheckCircle />
          {notice}
        </div>
      )}

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Total Patients",
            value: patients.length,
            icon: FiUsers,
            color: "bg-blue-50 text-blue-600",
            detail: "Registered records",
          },
          {
            label: "Active Patients",
            value: activeCount,
            icon: FiUser,
            color: "bg-emerald-50 text-emerald-600",
            detail: "Currently active",
          },
          {
            label: "Male Patients",
            value: patients.filter((p) => p.gender === "Male").length,
            icon: FiUsers,
            color: "bg-violet-50 text-violet-600",
            detail: "Registered male patients",
          },
          {
            label: "Female Patients",
            value: patients.filter((p) => p.gender === "Female").length,
            icon: FiUsers,
            color: "bg-orange-50 text-orange-600",
            detail: "Registered female patients",
          },
        ].map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    {stat.label}
                  </p>
                  <h3 className="mt-3 text-2xl font-bold text-slate-900">
                    {stat.value.toLocaleString()}
                  </h3>
                </div>

                <div className={`rounded-xl p-3 ${stat.color}`}>
                  <Icon size={20} />
                </div>
              </div>

              <p className="mt-3 text-xs text-slate-400">{stat.detail}</p>
            </div>
          );
        })}
      </div>

      {/* Patient directory */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col justify-between gap-4 border-b border-slate-100 p-5 lg:flex-row lg:items-center">
          <div>
            <h2 className="font-bold text-slate-900">All Patients</h2>
            <p className="mt-1 text-xs text-slate-400">
              Browse and manage registered patients
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="flex h-10 items-center gap-2 rounded-xl border border-slate-200 px-3 sm:w-64">
              <FiSearch className="shrink-0 text-slate-400" size={16} />

              <input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Search name, ID, phone..."
                className="w-full bg-transparent text-xs outline-none placeholder:text-slate-400"
              />
            </div>

            <div className="flex items-center gap-2">
              <FiFilter className="text-slate-400" size={16} />

              <select
                value={gender}
                onChange={(e) => {
                  setGender(e.target.value);
                  setPage(1);
                }}
                className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-600 outline-none"
              >
                <option value="All">All genders</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>

              <select
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                  setPage(1);
                }}
                className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-600 outline-none"
              >
                <option value="All">All status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left">
            <thead className="bg-slate-50">
              <tr className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                <th className="px-5 py-4">Patient</th>
                <th className="px-5 py-4">Patient ID</th>
                <th className="px-5 py-4">Contact</th>
                <th className="px-5 py-4">Age / Gender</th>
                <th className="px-5 py-4">Last Visit</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4 text-right">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {visiblePatients.map((patient) => (
                <tr
                  key={patient.id}
                  className="transition hover:bg-slate-50/70"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-bold text-blue-700">
                        {patient.name
                          .split(" ")
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join("")}
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-slate-800">
                          {patient.name}
                        </p>
                        <p className="mt-1 text-[11px] text-slate-400">
                          {patient.blood} blood group
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-xs font-semibold text-blue-600">
                    {patient.id}
                  </td>

                  <td className="px-5 py-4">
                    <p className="text-xs font-medium text-slate-700">
                      {patient.phone}
                    </p>
                    <p className="mt-1 text-[11px] text-slate-400">
                      {patient.email || "No email"}
                    </p>
                  </td>

                  <td className="px-5 py-4 text-xs text-slate-600">
                    {patient.age} years
                    <span className="text-slate-400">
                      {" "}/ {patient.gender}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-xs text-slate-500">
                    {patient.lastVisit}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
                        patient.status === "Active"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {patient.status}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-right">
                    <button
                      onClick={() => setSelectedPatient(patient)}
                      title="View patient"
                      className="rounded-lg border border-slate-200 p-2 text-slate-500 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                    >
                      <FiEye size={15} />
                    </button>
                  </td>
                </tr>
              ))}

              {visiblePatients.length === 0 && (
                <tr>
                  <td colSpan="7" className="px-5 py-16 text-center">
                    <FiUsers
                      className="mx-auto text-slate-300"
                      size={30}
                    />
                    <p className="mt-3 text-sm font-semibold text-slate-600">
                      No patients found
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      Try another search or filter.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col justify-between gap-3 border-t border-slate-100 px-5 py-4 sm:flex-row sm:items-center">
          <p className="text-xs text-slate-400">
            Showing{" "}
            {filteredPatients.length ? (page - 1) * pageSize + 1 : 0}
            {" – "}
            {Math.min(page * pageSize, filteredPatients.length)} of{" "}
            {filteredPatients.length} patients
          </p>

          <div className="flex items-center gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="rounded-lg border border-slate-200 p-2 text-slate-500 disabled:opacity-30"
            >
              <FiChevronLeft size={15} />
            </button>

            <span className="px-2 text-xs font-semibold text-slate-600">
              Page {page} of {totalPages}
            </span>

            <button
              disabled={page >= totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="rounded-lg border border-slate-200 p-2 text-slate-500 disabled:opacity-30"
            >
              <FiChevronRight size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* Registration modal */}
      {showForm && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-slate-950/60 p-3 backdrop-blur-sm sm:p-6">
          <div className="my-auto w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white px-6 py-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                  Patient Registration
                </p>
                <h2 className="mt-1 text-xl font-bold text-slate-900">
                  Register New Patient
                </h2>
                <p className="mt-1 text-xs text-slate-400">
                  Complete the patient's information to create a medical record.
                </p>
              </div>

              <button
                type="button"
                onClick={closeForm}
                className="rounded-xl p-2 text-slate-400 hover:bg-slate-100"
                aria-label="Close registration"
              >
                <FiX size={20} />
              </button>
            </div>

            <form onSubmit={registerPatient} className="max-h-[75vh] overflow-y-auto">
              <div className="space-y-8 p-6">
                {/* Personal information */}
                <section>
                  <SectionHeading
                    number="01"
                    title="Personal Information"
                    description="Basic identity and demographic details."
                  />

                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <Field label="First Name *">
                      <input
                        required
                        value={form.firstName}
                        onChange={(e) => updateForm("firstName", e.target.value)}
                        placeholder="First name"
                        className={inputClass}
                      />
                    </Field>

                    <Field label="Last Name *">
                      <input
                        required
                        value={form.lastName}
                        onChange={(e) => updateForm("lastName", e.target.value)}
                        placeholder="Last name"
                        className={inputClass}
                      />
                    </Field>

                    <Field label="Date of Birth *">
                      <input
                        required
                        type="date"
                        max={new Date().toLocaleDateString("en-CA")}
                        value={form.dateOfBirth}
                        onChange={(e) => updateForm("dateOfBirth", e.target.value)}
                        className={inputClass}
                      />
                    </Field>

                    <Field label="Gender *">
                      <select
                        value={form.gender}
                        onChange={(e) => updateForm("gender", e.target.value)}
                        className={inputClass}
                      >
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                        <option>Prefer not to say</option>
                      </select>
                    </Field>

                    <Field label="Blood Group">
                      <select
                        value={form.blood}
                        onChange={(e) => updateForm("blood", e.target.value)}
                        className={inputClass}
                      >
                        {[
                          "Unknown", "A+", "A-", "B+", "B-", "O+", "O-",
                          "AB+", "AB-",
                        ].map((group) => (
                          <option key={group}>{group}</option>
                        ))}
                      </select>
                    </Field>

                    <Field label="Marital Status">
                      <select
                        value={form.maritalStatus}
                        onChange={(e) =>
                          updateForm("maritalStatus", e.target.value)
                        }
                        className={inputClass}
                      >
                        <option>Single</option>
                        <option>Married</option>
                        <option>Divorced</option>
                        <option>Widowed</option>
                      </select>
                    </Field>
                  </div>
                </section>

                <Divider />

                {/* Contact information */}
                <section>
                  <SectionHeading
                    number="02"
                    title="Contact Information"
                    description="Patient's contact details and residential address."
                  />

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Primary Phone *">
                      <input
                        required
                        type="tel"
                        value={form.phone}
                        onChange={(e) => updateForm("phone", e.target.value)}
                        placeholder="+880 1XXX-XXXXXX"
                        className={inputClass}
                      />
                    </Field>

                    <Field label="Alternative Phone">
                      <input
                        type="tel"
                        value={form.alternatePhone}
                        onChange={(e) =>
                          updateForm("alternatePhone", e.target.value)
                        }
                        placeholder="Alternative contact number"
                        className={inputClass}
                      />
                    </Field>

                    <Field label="Email Address">
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => updateForm("email", e.target.value)}
                        placeholder="patient@email.com"
                        className={inputClass}
                      />
                    </Field>

                    <Field label="City">
                      <input
                        value={form.city}
                        onChange={(e) => updateForm("city", e.target.value)}
                        placeholder="Dhaka"
                        className={inputClass}
                      />
                    </Field>

                    <Field label="Postal Code">
                      <input
                        value={form.postalCode}
                        onChange={(e) =>
                          updateForm("postalCode", e.target.value)
                        }
                        placeholder="Postal code"
                        className={inputClass}
                      />
                    </Field>

                    <Field label="Full Address">
                      <input
                        value={form.address}
                        onChange={(e) => updateForm("address", e.target.value)}
                        placeholder="House, road, area..."
                        className={inputClass}
                      />
                    </Field>
                  </div>
                </section>

                <Divider />

                {/* Emergency contact */}
                <section>
                  <SectionHeading
                    number="03"
                    title="Emergency Contact"
                    description="Person to contact in case of an emergency."
                  />

                  <div className="grid gap-4 sm:grid-cols-3">
                    <Field label="Contact Person">
                      <input
                        value={form.emergencyName}
                        onChange={(e) =>
                          updateForm("emergencyName", e.target.value)
                        }
                        placeholder="Full name"
                        className={inputClass}
                      />
                    </Field>

                    <Field label="Relationship">
                      <input
                        value={form.emergencyRelation}
                        onChange={(e) =>
                          updateForm("emergencyRelation", e.target.value)
                        }
                        placeholder="e.g. Father, Spouse"
                        className={inputClass}
                      />
                    </Field>

                    <Field label="Emergency Phone">
                      <input
                        type="tel"
                        value={form.emergencyPhone}
                        onChange={(e) =>
                          updateForm("emergencyPhone", e.target.value)
                        }
                        placeholder="+880 1XXX-XXXXXX"
                        className={inputClass}
                      />
                    </Field>
                  </div>
                </section>

                <Divider />

                {/* Medical information */}
                <section>
                  <SectionHeading
                    number="04"
                    title="Basic Medical Information"
                    description="Background information for authorized medical staff."
                  />

                  <div className="space-y-4">
                    <Field label="Known Allergies">
                      <textarea
                        rows={2}
                        value={form.allergies}
                        onChange={(e) => updateForm("allergies", e.target.value)}
                        placeholder="List known drug, food or other allergies. Write Unknown if not assessed."
                        className={inputClass}
                      />
                    </Field>

                    <Field label="Existing Medical Conditions">
                      <textarea
                        rows={2}
                        value={form.medicalConditions}
                        onChange={(e) =>
                          updateForm("medicalConditions", e.target.value)
                        }
                        placeholder="e.g. Diabetes, hypertension..."
                        className={inputClass}
                      />
                    </Field>

                    <Field label="Current Medications">
                      <textarea
                        rows={2}
                        value={form.currentMedications}
                        onChange={(e) =>
                          updateForm("currentMedications", e.target.value)
                        }
                        placeholder="Current medicines, if any..."
                        className={inputClass}
                      />
                    </Field>

                    <Field label="Additional Notes">
                      <textarea
                        rows={3}
                        value={form.notes}
                        onChange={(e) => updateForm("notes", e.target.value)}
                        placeholder="Other relevant information..."
                        className={inputClass}
                      />
                    </Field>
                  </div>
                </section>

                <div className="rounded-xl border border-amber-100 bg-amber-50 p-4">
                  <p className="text-xs font-semibold text-amber-800">
                    Important
                  </p>
                  <p className="mt-1 text-xs leading-5 text-amber-700">
                    Medical information should be verified by authorized
                    clinical staff. Registration does not replace a medical
                    assessment.
                  </p>
                </div>
              </div>

              <div className="sticky bottom-0 flex flex-col-reverse justify-end gap-3 border-t border-slate-100 bg-white px-6 py-4 sm:flex-row">
                <button
                  type="button"
                  onClick={closeForm}
                  className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700"
                >
                  Register Patient
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Patient profile modal */}
      {selectedPatient && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4 backdrop-blur-sm">
          <div className="my-auto w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 p-5">
              <div>
                <h2 className="font-bold text-slate-900">Patient Profile</h2>
                <p className="mt-1 text-xs text-slate-400">
                  {selectedPatient.id}
                </p>
              </div>

              <button
                onClick={() => setSelectedPatient(null)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
                aria-label="Close patient profile"
              >
                <FiX size={19} />
              </button>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-xl font-bold text-blue-700">
                  {selectedPatient.name
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")}
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {selectedPatient.name}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500">
                    {selectedPatient.age} years · {selectedPatient.gender}
                  </p>
                  <span className="mt-2 inline-block rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700">
                    {selectedPatient.status}
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                {[
                  ["Blood Group", selectedPatient.blood],
                  ["Total Visits", selectedPatient.visits],
                  ["Last Visit", selectedPatient.lastVisit],
                  ["Patient ID", selectedPatient.id],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-xl bg-slate-50 p-3">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                      {label}
                    </p>
                    <p className="mt-2 text-sm font-semibold text-slate-800">
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-5 space-y-3">
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <FiPhone className="text-blue-500" />
                  {selectedPatient.phone}
                </div>

                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <FiMail className="text-blue-500" />
                  {selectedPatient.email || "No email provided"}
                </div>
              </div>

              {selectedPatient.allergies && (
                <div className="mt-5 rounded-xl border border-amber-100 bg-amber-50 p-3">
                  <p className="text-xs font-bold text-amber-800">
                    Recorded allergies
                  </p>
                  <p className="mt-1 text-xs text-amber-700">
                    {selectedPatient.allergies}
                  </p>
                </div>
              )}

              <p className="mt-5 rounded-xl border border-blue-100 bg-blue-50 p-3 text-xs leading-5 text-blue-700">
                Medical history, prescriptions and laboratory reports will be
                available here after backend integration.
              </p>
            </div>

            <div className="border-t border-slate-100 p-5 text-right">
              <button
                onClick={() => setSelectedPatient(null)}
                className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
