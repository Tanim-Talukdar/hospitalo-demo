"use client";
import { useEffect, useMemo, useState } from "react";
import {
  FiCalendar,
  FiUsers,
  FiClock,
  FiCheckCircle,
  FiSearch,
  FiPlus,
  FiX,
  FiPhone,
  FiUser,
  FiArrowUpRight,
  FiAlertCircle,
} from "react-icons/fi";

const getLocalDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};
const initialPatients = [
  {
    id: "MC-2026-001",
    name: "Sarah Ahmed",
    phone: "01712345678",
    gender: "Female",
    age: 28,
  },
  {
    id: "MC-2026-002",
    name: "Rahim Uddin",
    phone: "01812345678",
    gender: "Male",
    age: 42,
  },
  {
    id: "MC-2026-003",
    name: "Nusrat Jahan",
    phone: "01912345678",
    gender: "Female",
    age: 35,
  },
  {
    id: "MC-2026-004",
    name: "Tanvir Hasan",
    phone: "01612345678",
    gender: "Male",
    age: 31,
  },
  {
    id: "MC-2026-005",
    name: "Fatema Begum",
    phone: "01512345678",
    gender: "Female",
    age: 55,
  },
];

const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Ahmed",
    department: "Cardiology",
    available: true,
  },
  {
    id: 2,
    name: "Dr. Michael Rahman",
    department: "Neurology",
    available: true,
  },
  {
    id: 3,
    name: "Dr. Emily Wilson",
    department: "Ophthalmology",
    available: true,
  },
  {
    id: 4,
    name: "Dr. James Anderson",
    department: "Orthopedics",
    available: true,
  },
  {
    id: 5,
    name: "Dr. Nadia Karim",
    department: "Pulmonology",
    available: false,
  },
  {
    id: 6,
    name: "Dr. David Morgan",
    department: "General Medicine",
    available: true,
  },
];

const departments = [
  "Cardiology",
  "Neurology",
  "Ophthalmology",
  "Orthopedics",
  "Pulmonology",
  "General Medicine",
];

const initialAppointments = [
  {
    id: "APT-001",
    patientId: "MC-2026-001",
    patient: "Sarah Ahmed",
    phone: "01712345678",
    doctor: "Dr. Sarah Ahmed",
    department: "Cardiology",
    date: "",
    time: "09:30",
    type: "Scheduled",
    complaint: "Chest discomfort and irregular heartbeat",
    serial: 1,
    status: "Waiting",
  },
  {
    id: "APT-002",
    patientId: "MC-2026-002",
    patient: "Rahim Uddin",
    phone: "01812345678",
    doctor: "Dr. Michael Rahman",
    department: "Neurology",
    date: "",
    time: "10:00",
    type: "Walk-in",
    complaint: "Frequent headaches",
    serial: 1,
    status: "Called",
  },
  {
    id: "APT-003",
    patientId: "MC-2026-003",
    patient: "Nusrat Jahan",
    phone: "01912345678",
    doctor: "Dr. Emily Wilson",
    department: "Ophthalmology",
    date: "",
    time: "11:00",
    type: "Follow-up",
    complaint: "Follow-up eye examination",
    serial: 1,
    status: "Completed",
  },
];

const emptyForm = {
  patientMode: "existing",
  patientSearch: "",
  patientId: "",
  newPatientName: "",
  newPatientPhone: "",
  newPatientGender: "Male",
  newPatientAge: "",
  visitType: "Walk-in",
  complaint: "",
  department: "",
  doctorId: "",
  date: "", 
  time: "",
};

function StatusBadge({ status }) {
  const styles = {
    Waiting: "bg-amber-50 text-amber-700 border-amber-100",
    Called: "bg-blue-50 text-blue-700 border-blue-100",
    Completed: "bg-emerald-50 text-emerald-700 border-emerald-100",
    Cancelled: "bg-red-50 text-red-600 border-red-100",
    "No Show": "bg-gray-100 text-gray-600 border-gray-200",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${
        styles[status] || styles.Waiting
      }`}
    >
      {status}
    </span>
  );
}

function StatCard({ icon: Icon, label, value, color }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <div className={`rounded-xl p-3 ${color}`}>
          <Icon size={19} />
        </div>
      </div>
      <h3 className="mt-4 text-2xl font-bold text-slate-900">{value}</h3>
    </div>
  );
}

function Field({ label, children, required = false }) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-slate-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50";

export default function AppointmentsPage() {
  const [patients, setPatients] = useState(initialPatients);
  const [appointments, setAppointments] = useState(initialAppointments);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedDate, setSelectedDate] = useState("");
  const [today, setToday] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const currentDate = getLocalDate();

    setToday(currentDate);
    setSelectedDate(currentDate);

    setAppointments((previous) =>
      previous.map((item) => ({
        ...item,
        date: item.date || currentDate,
      }))
    );

    setForm((previous) => ({
      ...previous,
      date: currentDate,
    }));
  }, []);

  const todayAppointments = appointments.filter(
    (item) => item.date === today
  );

  const stats = [
    {
      label: "Total Appointments",
      value: todayAppointments.length,
      icon: FiCalendar,
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Waiting Patients",
      value: todayAppointments.filter((item) => item.status === "Waiting").length,
      icon: FiClock,
      color: "bg-amber-50 text-amber-600",
    },
    {
      label: "Completed",
      value: todayAppointments.filter((item) => item.status === "Completed").length,
      icon: FiCheckCircle,
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      label: "Registered Patients",
      value: patients.length,
      icon: FiUsers,
      color: "bg-violet-50 text-violet-600",
    },
  ];

  const filteredAppointments = useMemo(() => {
    return appointments.filter((item) => {
      const searchMatch = [
        item.patient,
        item.patientId,
        item.doctor,
        item.phone,
        item.id,
      ]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());

      const statusMatch =
        statusFilter === "All" || item.status === statusFilter;

      const dateMatch = !selectedDate || item.date === selectedDate;

      return searchMatch && statusMatch && dateMatch;
    });
  }, [appointments, search, statusFilter, selectedDate]);

  const matchingPatients = patients.filter((patient) => {
    const query = form.patientSearch.toLowerCase();

    return (
      query &&
      [patient.name, patient.id, patient.phone]
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  });

  const selectedDoctor = doctors.find(
    (doctor) => String(doctor.id) === String(form.doctorId)
  );

  const availableDoctors = doctors.filter(
    (doctor) =>
      doctor.department === form.department && doctor.available
  );

  function updateForm(key, value) {
    setForm((previous) => ({
      ...previous,
      [key]: value,
    }));
  }

  function openNewAppointment() {
    setForm({
      ...emptyForm,
      date: selectedDate || today,
    });
    setNotice("");
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setNotice("");
  }

  function selectPatient(patient) {
    setForm((previous) => ({
      ...previous,
      patientId: patient.id,
      patientSearch: `${patient.name} (${patient.id})`,
    }));
  }

  function registerNewPatient() {
    if (
      !form.newPatientName.trim() ||
      !form.newPatientPhone.trim() ||
      !form.newPatientAge
    ) {
      setNotice("Please complete the required patient information.");
      return;
    }

    const newId = `MC-${new Date().getFullYear()}-${String(
      patients.length + 1
    ).padStart(3, "0")}`;

    const newPatient = {
      id: newId,
      name: form.newPatientName.trim(),
      phone: form.newPatientPhone.trim(),
      gender: form.newPatientGender,
      age: Number(form.newPatientAge),
    };

    setPatients((previous) => [...previous, newPatient]);

    setForm((previous) => ({
      ...previous,
      patientId: newPatient.id,
      patientSearch: `${newPatient.name} (${newPatient.id})`,
      patientMode: "existing",
    }));

    setNotice("Patient registered. Complete the appointment details.");
  }

  function createAppointment(event) {
    event.preventDefault();

    const patient = patients.find(
      (item) => item.id === form.patientId
    );

    if (!patient) {
      setNotice("Please select or register a patient first.");
      return;
    }

    if (!selectedDoctor) {
      setNotice("Please select an available doctor.");
      return;
    }

    if (!form.complaint.trim()) {
      setNotice("Please enter the patient's reported problem.");
      return;
    }

    if (!form.date || !form.time) {
      setNotice("Please select an appointment date and time.");
      return;
    }

    const sameDoctorAppointments = appointments.filter(
      (item) =>
        item.doctor === selectedDoctor.name &&
        item.date === form.date &&
        item.status !== "Cancelled"
    );

    const serial =
      sameDoctorAppointments.reduce(
        (maximum, item) => Math.max(maximum, item.serial || 0),
        0
      ) + 1;

    const newAppointment = {
      id: `APT-${String(appointments.length + 1).padStart(3, "0")}`,
      patientId: patient.id,
      patient: patient.name,
      phone: patient.phone,
      doctor: selectedDoctor.name,
      department: selectedDoctor.department,
      date: form.date,
      time: form.time,
      type: form.visitType,
      complaint: form.complaint.trim(),
      serial,
      status: "Waiting",
    };

    setAppointments((previous) => [newAppointment, ...previous]);
    setModalOpen(false);
    setForm(emptyForm);
    setNotice("");
  }

  function updateAppointmentStatus(id, status) {
    setAppointments((previous) =>
      previous.map((item) =>
        item.id === id ? { ...item, status } : item
      )
    );

    setSelectedAppointment((previous) =>
      previous?.id === id ? { ...previous, status } : previous
    );
  }

  return (
    <div className="space-y-7 pb-10">
      {/* Page heading */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-medium text-blue-600">
            Hospital Management
          </p>
          <h1 className="mt-1 text-2xl font-bold text-slate-900">
            Appointments
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Manage scheduled visits, walk-ins, and patient queues.
          </p>
        </div>

        <button
          onClick={openNewAppointment}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
        >
          <FiPlus size={18} />
          New Appointment
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* Appointment list */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="border-b border-slate-100 p-5">
          <div className="flex flex-col justify-between gap-4 xl:flex-row xl:items-center">
            <div>
              <h2 className="font-bold text-slate-900">
                Appointment Records
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Search and manage patient appointments.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search patient, ID, doctor..."
                  className={`${inputClass} pl-10 sm:w-64`}
                />
              </div>

              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className={`${inputClass} sm:w-40`}
              >
                <option value="All">All Status</option>
                <option value="Waiting">Waiting</option>
                <option value="Called">Called</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
                <option value="No Show">No Show</option>
              </select>

              <input
                type="date"
                value={selectedDate}
                onChange={(event) => setSelectedDate(event.target.value)}
                aria-label="Filter appointments by date"
                className={`${inputClass} sm:w-40`}
              />
            </div>
          </div>
        </div>

        {/* Desktop table */}
        <div className="hidden overflow-x-auto lg:block">
          <table className="w-full min-w-[950px] text-left">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-5 py-4 font-semibold">Patient</th>
                <th className="px-5 py-4 font-semibold">Doctor</th>
                <th className="px-5 py-4 font-semibold">Visit</th>
                <th className="px-5 py-4 font-semibold">Date & Time</th>
                <th className="px-5 py-4 font-semibold">Serial</th>
                <th className="px-5 py-4 font-semibold">Status</th>
                <th className="px-5 py-4 text-right font-semibold">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredAppointments.map((item) => (
                <tr key={item.id} className="transition hover:bg-slate-50/70">
                  <td className="px-5 py-4">
                    <p className="font-semibold text-slate-800">
                      {item.patient}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {item.patientId}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    <p className="text-sm font-medium text-slate-700">
                      {item.doctor}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {item.department}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                      {item.type}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <p className="text-sm text-slate-700">{item.date}</p>
                    <p className="mt-1 text-xs text-slate-500">
                      {item.time}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    <span className="font-bold text-blue-600">
                      #{item.serial}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <StatusBadge status={item.status} />
                  </td>

                  <td className="px-5 py-4 text-right">
                    <button
                      onClick={() => setSelectedAppointment(item)}
                      className="rounded-lg p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
                      title="View appointment"
                    >
                      <FiArrowUpRight size={18} />
                    </button>
                  </td>
                </tr>
              ))}

              {filteredAppointments.length === 0 && (
                <tr>
                  <td colSpan="7" className="px-5 py-12 text-center">
                    <FiCalendar className="mx-auto text-3xl text-slate-300" />
                    <p className="mt-3 font-semibold text-slate-700">
                      No appointments found
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      Try changing your search or filters.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="divide-y divide-slate-100 lg:hidden">
          {filteredAppointments.map((item) => (
            <div key={item.id} className="space-y-4 p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-slate-900">
                    {item.patient}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    {item.patientId}
                  </p>
                </div>
                <StatusBadge status={item.status} />
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-xs text-slate-400">Doctor</p>
                  <p className="mt-1 font-medium text-slate-700">
                    {item.doctor}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Department</p>
                  <p className="mt-1 font-medium text-slate-700">
                    {item.department}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Date & Time</p>
                  <p className="mt-1 font-medium text-slate-700">
                    {item.date} · {item.time}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Queue Serial</p>
                  <p className="mt-1 font-bold text-blue-600">
                    #{item.serial}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedAppointment(item)}
                className="w-full rounded-xl border border-slate-200 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                View Appointment
              </button>
            </div>
          ))}

          {filteredAppointments.length === 0 && (
            <p className="px-5 py-12 text-center text-sm text-slate-500">
              No appointments found.
            </p>
          )}
        </div>
      </section>

      {/* New appointment modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-3 backdrop-blur-sm sm:p-5">
          <div className="flex max-h-[94vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-7">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Create Appointment
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Register a visit and assign a doctor.
                </p>
              </div>

              <button
                onClick={closeModal}
                className="rounded-xl p-2 text-slate-500 hover:bg-slate-100"
              >
                <FiX size={20} />
              </button>
            </div>

            <form
              onSubmit={createAppointment}
              className="space-y-6 overflow-y-auto p-5 sm:p-7"
            >
              {/* Patient selection */}
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900">
                    01. Patient Information
                  </h3>
                  <span className="text-xs font-medium text-slate-400">
                    Required
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      updateForm("patientMode", "existing")
                    }
                    className={`rounded-xl px-4 py-2.5 text-sm font-semibold ${
                      form.patientMode === "existing"
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    Existing Patient
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      updateForm("patientMode", "new")
                    }
                    className={`rounded-xl px-4 py-2.5 text-sm font-semibold ${
                      form.patientMode === "new"
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    Register New Patient
                  </button>
                </div>

                {form.patientMode === "existing" ? (
                  <div className="space-y-3">
                    <Field label="Search Patient" required>
                      <div className="relative">
                        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          value={form.patientSearch}
                          onChange={(event) => {
                            updateForm("patientSearch", event.target.value);
                            updateForm("patientId", "");
                          }}
                          placeholder="Enter patient name, ID or phone"
                          className={`${inputClass} pl-10`}
                        />
                      </div>
                    </Field>

                    {form.patientId && (
                      <div className="flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                        <div>
                          <p className="text-sm font-semibold text-emerald-800">
                            {patients.find(
                              (item) => item.id === form.patientId
                            )?.name}
                          </p>
                          <p className="mt-1 text-xs text-emerald-700">
                            {form.patientId} · Patient selected
                          </p>
                        </div>
                        <FiCheckCircle className="text-emerald-600" />
                      </div>
                    )}

                    {form.patientSearch &&
                      !form.patientId &&
                      matchingPatients.length > 0 && (
                        <div className="max-h-48 overflow-y-auto rounded-xl border border-slate-200">
                          {matchingPatients.map((patient) => (
                            <button
                              key={patient.id}
                              type="button"
                              onClick={() => selectPatient(patient)}
                              className="flex w-full items-center justify-between border-b border-slate-100 p-3 text-left last:border-0 hover:bg-blue-50"
                            >
                              <div>
                                <p className="text-sm font-semibold text-slate-800">
                                  {patient.name}
                                </p>
                                <p className="mt-1 text-xs text-slate-500">
                                  {patient.id} · {patient.phone}
                                </p>
                              </div>
                              <FiArrowUpRight className="text-blue-600" />
                            </button>
                          ))}
                        </div>
                      )}

                    {form.patientSearch &&
                      !form.patientId &&
                      matchingPatients.length === 0 && (
                        <p className="rounded-xl bg-amber-50 p-3 text-sm text-amber-700">
                          No matching patient found. Register a new patient instead.
                        </p>
                      )}
                  </div>
                ) : (
                  <div className="space-y-4 rounded-xl border border-slate-200 p-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="Full Name" required>
                        <input
                          value={form.newPatientName}
                          onChange={(event) =>
                            updateForm("newPatientName", event.target.value)
                          }
                          placeholder="Patient full name"
                          className={inputClass}
                        />
                      </Field>

                      <Field label="Phone Number" required>
                        <input
                          value={form.newPatientPhone}
                          onChange={(event) =>
                            updateForm("newPatientPhone", event.target.value)
                          }
                          placeholder="01XXXXXXXXX"
                          className={inputClass}
                        />
                      </Field>

                      <Field label="Age" required>
                        <input
                          type="number"
                          min="0"
                          max="120"
                          value={form.newPatientAge}
                          onChange={(event) =>
                            updateForm("newPatientAge", event.target.value)
                          }
                          placeholder="Patient age"
                          className={inputClass}
                        />
                      </Field>

                      <Field label="Gender">
                        <select
                          value={form.newPatientGender}
                          onChange={(event) =>
                            updateForm("newPatientGender", event.target.value)
                          }
                          className={inputClass}
                        >
                          <option>Male</option>
                          <option>Female</option>
                          <option>Other</option>
                        </select>
                      </Field>
                    </div>

                    <button
                      type="button"
                      onClick={registerNewPatient}
                      className="w-full rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
                    >
                      <FiUserPlusFallback />
                      Register Patient
                    </button>
                  </div>
                )}
              </section>

              <div className="border-t border-slate-100" />

              {/* Visit details */}
              <section className="space-y-4">
                <h3 className="font-bold text-slate-900">
                  02. Visit Details
                </h3>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Visit Type" required>
                    <select
                      value={form.visitType}
                      onChange={(event) =>
                        updateForm("visitType", event.target.value)
                      }
                      className={inputClass}
                    >
                      <option value="Walk-in">Walk-in</option>
                      <option value="Scheduled">Scheduled</option>
                      <option value="Follow-up">Follow-up</option>
                    </select>
                  </Field>

                  <Field label="Appointment Date" required>
                    <input
                      type="date"
                      min={today || undefined}
                      value={form.date}
                      onChange={(event) =>
                        updateForm("date", event.target.value)
                      }
                      className={inputClass}
                    />
                  </Field>

                  <Field label="Appointment Time" required>
                    <input
                      type="time"
                      value={form.time}
                      onChange={(event) =>
                        updateForm("time", event.target.value)
                      }
                      className={inputClass}
                    />
                  </Field>
                </div>

                <Field label="Patient's Reported Problem" required>
                  <textarea
                    rows={3}
                    value={form.complaint}
                    onChange={(event) =>
                      updateForm("complaint", event.target.value)
                    }
                    placeholder="Briefly describe the problem reported by the patient..."
                    className={`${inputClass} resize-none`}
                  />
                  <p className="text-xs text-slate-400">
                    Record the patient's complaint. The doctor will enter the
                    clinical diagnosis after consultation.
                  </p>
                </Field>
              </section>

              <div className="border-t border-slate-100" />

              {/* Doctor assignment */}
              <section className="space-y-4">
                <h3 className="font-bold text-slate-900">
                  03. Doctor Assignment
                </h3>

                <Field label="Department" required>
                  <select
                    value={form.department}
                    onChange={(event) => {
                      updateForm("department", event.target.value);
                      updateForm("doctorId", "");
                    }}
                    className={inputClass}
                  >
                    <option value="">Select department</option>
                    {departments.map((department) => (
                      <option key={department} value={department}>
                        {department}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Select Available Doctor" required>
                  <select
                    value={form.doctorId}
                    onChange={(event) =>
                      updateForm("doctorId", event.target.value)
                    }
                    disabled={!form.department}
                    className={`${inputClass} disabled:cursor-not-allowed disabled:bg-slate-50`}
                  >
                    <option value="">
                      {form.department
                        ? "Choose a doctor"
                        : "Select a department first"}
                    </option>

                    {availableDoctors.map((doctor) => (
                      <option key={doctor.id} value={doctor.id}>
                        {doctor.name}
                      </option>
                    ))}
                  </select>

                  {form.department && availableDoctors.length === 0 && (
                    <p className="text-xs text-amber-600">
                      No available doctor in this department.
                    </p>
                  )}
                </Field>

                {selectedDoctor && (
                  <div className="flex items-center gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4">
                    <div className="rounded-xl bg-white p-3 text-blue-600">
                      <FiUser size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        {selectedDoctor.name}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {selectedDoctor.department} · Available
                      </p>
                    </div>
                  </div>
                )}
              </section>

              {notice && (
                <div className="flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
                  <FiAlertCircle className="mt-0.5 shrink-0" />
                  {notice}
                </div>
              )}

              <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                >
                  Create Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Appointment details modal */}
      {selectedAppointment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-3 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                  {selectedAppointment.id}
                </p>
                <h2 className="mt-2 text-xl font-bold text-slate-900">
                  Appointment Details
                </h2>
              </div>

              <button
                onClick={() => setSelectedAppointment(null)}
                className="rounded-xl p-2 text-slate-500 hover:bg-slate-100"
              >
                <FiX size={20} />
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="font-bold text-slate-900">
                  {selectedAppointment.patient}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  {selectedAppointment.patientId}
                </p>
                <p className="mt-3 flex items-center gap-2 text-sm text-slate-600">
                  <FiPhone size={14} />
                  {selectedAppointment.phone}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-xs text-slate-400">Doctor</p>
                  <p className="mt-1 font-semibold text-slate-800">
                    {selectedAppointment.doctor}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Department</p>
                  <p className="mt-1 font-semibold text-slate-800">
                    {selectedAppointment.department}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Visit Type</p>
                  <p className="mt-1 font-semibold text-slate-800">
                    {selectedAppointment.type}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Queue Serial</p>
                  <p className="mt-1 font-bold text-blue-600">
                    #{selectedAppointment.serial}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Date</p>
                  <p className="mt-1 font-semibold text-slate-800">
                    {selectedAppointment.date}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Time</p>
                  <p className="mt-1 font-semibold text-slate-800">
                    {selectedAppointment.time}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-400">
                  REPORTED PROBLEM
                </p>
                <p className="mt-2 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-700">
                  {selectedAppointment.complaint}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs font-semibold text-slate-400">
                  APPOINTMENT STATUS
                </p>
                <StatusBadge status={selectedAppointment.status} />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  disabled={
                    ["Completed", "Cancelled", "No Show"].includes(
                      selectedAppointment.status
                    )
                  }
                  onClick={() =>
                    updateAppointmentStatus(
                      selectedAppointment.id,
                      "Called"
                    )
                  }
                  className="rounded-xl border border-blue-200 bg-blue-50 px-3 py-3 text-sm font-semibold text-blue-700 disabled:opacity-40"
                >
                  Call Patient
                </button>

                <button
                  disabled={
                    ["Completed", "Cancelled", "No Show"].includes(
                      selectedAppointment.status
                    )
                  }
                  onClick={() =>
                    updateAppointmentStatus(
                      selectedAppointment.id,
                      "Completed"
                    )
                  }
                  className="rounded-xl bg-emerald-600 px-3 py-3 text-sm font-semibold text-white disabled:opacity-40"
                >
                  Complete
                </button>

                <button
                  disabled={
                    ["Completed", "Cancelled", "No Show"].includes(
                      selectedAppointment.status
                    )
                  }
                  onClick={() =>
                    updateAppointmentStatus(
                      selectedAppointment.id,
                      "No Show"
                    )
                  }
                  className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold text-slate-600 disabled:opacity-40"
                >
                  Mark No Show
                </button>

                <button
                  disabled={
                    ["Completed", "Cancelled", "No Show"].includes(
                      selectedAppointment.status
                    )
                  }
                  onClick={() =>
                    updateAppointmentStatus(
                      selectedAppointment.id,
                      "Cancelled"
                    )
                  }
                  className="rounded-xl border border-red-200 bg-red-50 px-3 py-3 text-sm font-semibold text-red-600 disabled:opacity-40"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FiUserPlusFallback() {
  return <span className="mr-1 inline-block">+</span>;
}
