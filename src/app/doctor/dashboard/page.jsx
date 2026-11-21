
"use client";

import { useMemo, useRef, useState } from "react";
import {
  FiActivity,
  FiAlertCircle,
  FiArrowRight,
  FiBell,
  FiCalendar,
  FiCheck,
  FiCheckCircle,
  FiChevronDown,
  FiClock,
  FiFileText,
  FiGrid,
  FiHeart,
  FiImage,
  FiLogOut,
  FiMenu,
  FiMoreHorizontal,
  FiPlus,
  FiSearch,
  FiSettings,
  FiShield,
  FiUser,
  FiUsers,
  FiX,
} from "react-icons/fi";

const initialDoctor = {
  name: "Dr. Sarah Ahmed",
  specialty: "Cardiology Specialist",
  department: "Cardiology",
  qualification: "MBBS, MD (Cardiology)",
  experience: "12 years",
  phone: "+880 1712-345678",
  email: "sarah.ahmed@medicare.com",
  fee: "1200",
  bio: "Experienced cardiologist focused on preventive heart care and patient-centered treatment.",
  image: "",
};

const initialAppointments = [
  {
    id: "APT-001",
    patientId: "MC-2026-001",
    patient: "Rahim Uddin",
    age: 45,
    gender: "Male",
    phone: "+880 1711-222333",
    date: "2026-11-22",
    time: "09:00 AM",
    serial: 1,
    type: "Scheduled",
    complaint: "Chest discomfort and shortness of breath",
    status: "Waiting",
    bloodGroup: "B+",
    allergies: "Penicillin",
  },
  {
    id: "APT-002",
    patientId: "MC-2026-002",
    patient: "Nusrat Jahan",
    age: 32,
    gender: "Female",
    phone: "+880 1812-333444",
    date: "2026-11-22",
    time: "09:30 AM",
    serial: 2,
    type: "Follow-up",
    complaint: "Follow-up for blood pressure",
    status: "Waiting",
    bloodGroup: "O+",
    allergies: "None reported",
  },
  {
    id: "APT-003",
    patientId: "MC-2026-003",
    patient: "Karim Hasan",
    age: 58,
    gender: "Male",
    phone: "+880 1912-444555",
    date: "2026-11-22",
    time: "10:00 AM",
    serial: 3,
    type: "Walk-in",
    complaint: "Irregular heartbeat",
    status: "In Consultation",
    bloodGroup: "A+",
    allergies: "None reported",
  },
  {
    id: "APT-004",
    patientId: "MC-2026-004",
    patient: "Maliha Akter",
    age: 27,
    gender: "Female",
    phone: "+880 1612-555666",
    date: "2026-11-22",
    time: "10:30 AM",
    serial: 4,
    type: "Scheduled",
    complaint: "Routine cardiac checkup",
    status: "Completed",
    bloodGroup: "AB+",
    allergies: "Dust",
  },
  {
    id: "APT-005",
    patientId: "MC-2026-005",
    patient: "Tanvir Ahmed",
    age: 39,
    gender: "Male",
    phone: "+880 1512-666777",
    date: "2026-11-22",
    time: "11:00 AM",
    serial: 5,
    type: "Scheduled",
    complaint: "High blood pressure",
    status: "Waiting",
    bloodGroup: "O-",
    allergies: "None reported",
  },
];

const initialPatients = [
  {
    id: "MC-2026-001",
    name: "Rahim Uddin",
    age: 45,
    gender: "Male",
    phone: "+880 1711-222333",
    bloodGroup: "B+",
    allergies: "Penicillin",
    conditions: "Hypertension",
    medications: "Amlodipine",
  },
  {
    id: "MC-2026-002",
    name: "Nusrat Jahan",
    age: 32,
    gender: "Female",
    phone: "+880 1812-333444",
    bloodGroup: "O+",
    allergies: "None reported",
    conditions: "Hypertension",
    medications: "As prescribed",
  },
  {
    id: "MC-2026-003",
    name: "Karim Hasan",
    age: 58,
    gender: "Male",
    phone: "+880 1912-444555",
    bloodGroup: "A+",
    allergies: "None reported",
    conditions: "Arrhythmia",
    medications: "Under review",
  },
  {
    id: "MC-2026-004",
    name: "Maliha Akter",
    age: 27,
    gender: "Female",
    phone: "+880 1612-555666",
    bloodGroup: "AB+",
    allergies: "Dust",
    conditions: "None reported",
    medications: "None",
  },
  {
    id: "MC-2026-005",
    name: "Tanvir Ahmed",
    age: 39,
    gender: "Male",
    phone: "+880 1512-666777",
    bloodGroup: "O-",
    allergies: "None reported",
    conditions: "Hypertension",
    medications: "Losartan",
  },
];

const initialNotifications = [
  {
    id: 1,
    title: "New appointment assigned",
    description: "A new appointment has been added to your schedule.",
    time: "10 minutes ago",
    unread: true,
  },
  {
    id: 2,
    title: "Laboratory report available",
    description: "A patient laboratory report is ready for review.",
    time: "35 minutes ago",
    unread: true,
  },
  {
    id: 3,
    title: "Schedule reminder",
    description: "Your consultation session starts at 9:00 AM.",
    time: "Yesterday",
    unread: false,
  },
];

const navigation = [
  {
    title: "Workspace",
    items: [
      { id: "overview", label: "Overview", icon: FiGrid },
      { id: "appointments", label: "Appointments", icon: FiCalendar },
      { id: "patients", label: "My Patients", icon: FiUsers },
    ],
  },
  {
    title: "Clinical",
    items: [
      { id: "consultations", label: "Consultations", icon: FiActivity },
      { id: "prescriptions", label: "Prescriptions", icon: FiFileText },
      { id: "laboratory", label: "Laboratory Orders", icon: FiHeart },
      { id: "diagnostics", label: "Diagnostics", icon: FiImage },
      { id: "followups", label: "Follow-ups", icon: FiClock },
    ],
  },
  {
    title: "Account",
    items: [
      { id: "schedule", label: "My Schedule", icon: FiCalendar },
      { id: "profile", label: "My Profile", icon: FiUser },
      { id: "notifications", label: "Notifications", icon: FiBell },
    ],
  },
];

const laboratoryTests = [
  "Complete Blood Count (CBC)",
  "Blood Glucose",
  "Urine R/E",
  "Lipid Profile",
  "Liver Function Test (LFT)",
  "Kidney Function Test (KFT)",
  "Thyroid Function Test (TFT)",
  "Electrolytes",
  "Troponin I",
  "HbA1c",
];

const diagnosticTests = [
  "ECG",
  "Echocardiogram",
  "Chest X-ray",
  "Ultrasound",
  "CT Scan",
  "MRI",
  "Stress Test",
  "Holter Monitoring",
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

function todayDate() {
  const date = new Date();
  const offset = date.getTimezoneOffset();
  return new Date(date.getTime() - offset * 60000)
    .toISOString()
    .slice(0, 10);
}

function classNames(...values) {
  return values.filter(Boolean).join(" ");
}

function statusClass(status) {
  const styles = {
    Waiting: "bg-amber-50 text-amber-700",
    "In Consultation": "bg-blue-50 text-blue-700",
    Completed: "bg-emerald-50 text-emerald-700",
    Cancelled: "bg-rose-50 text-rose-700",
    "No Show": "bg-slate-100 text-slate-600",
    Pending: "bg-amber-50 text-amber-700",
    "In Progress": "bg-blue-50 text-blue-700",
    Ready: "bg-emerald-50 text-emerald-700",
  };

  return styles[status] || "bg-slate-100 text-slate-600";
}

function StatusBadge({ status }) {
  return (
    <span
      className={classNames(
        "inline-flex rounded-full px-3 py-1 text-xs font-semibold",
        statusClass(status)
      )}
    >
      {status}
    </span>
  );
}

function SectionHeading({ eyebrow, title, description, action }) {
  return (
    <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <p className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
          {eyebrow}
        </p>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          {title}
        </h1>
        {description && (
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            {description}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}

function StatCard({ label, value, note, icon: Icon, color = "blue" }) {
  const colors = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-emerald-50 text-emerald-600",
    amber: "bg-amber-50 text-amber-600",
    purple: "bg-violet-50 text-violet-600",
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
            {value}
          </p>
          {note && <p className="mt-2 text-xs text-slate-500">{note}</p>}
        </div>
        <div className={classNames("rounded-xl p-3", colors[color])}>
          <Icon size={21} />
        </div>
      </div>
    </div>
  );
}

function EmptyState({ title, description }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
        <FiFileText size={22} />
      </div>
      <h3 className="mt-4 font-semibold text-slate-800">{title}</h3>
      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
        {description}
      </p>
    </div>
  );
}

function Modal({ title, subtitle, onClose, children, wide = false }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-3 backdrop-blur-sm sm:p-6">
      <div
        className={classNames(
          "flex max-h-[92vh] w-full flex-col overflow-hidden rounded-2xl bg-white shadow-2xl",
          wide ? "max-w-3xl" : "max-w-xl"
        )}
      >
        <div className="flex items-start justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
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
            aria-label="Close"
          >
            <FiX size={19} />
          </button>
        </div>
        <div className="overflow-y-auto p-5 sm:p-6">{children}</div>
      </div>
    </div>
  );
}

function Field({ label, children, required = false }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold text-slate-600">
        {label} {required && <span className="text-rose-500">*</span>}
      </span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10";

function PrimaryButton({ children, onClick, type = "button", disabled = false }) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {children}
    </button>
  );
}

function SecondaryButton({ children, onClick, type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
    >
      {children}
    </button>
  );
}

export default function DoctorDashboardPage() {
  const [activePage, setActivePage] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [appointments, setAppointments] = useState(initialAppointments);
  const [patients] = useState(initialPatients);
  const [doctor, setDoctor] = useState(initialDoctor);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [prescriptions, setPrescriptions] = useState([]);
  const [labOrders, setLabOrders] = useState([]);
  const [diagnosticOrders, setDiagnosticOrders] = useState([]);
  const [consultations, setConsultations] = useState([]);
  const [followups, setFollowups] = useState([]);
  const [schedule, setSchedule] = useState(
    weekdays.map((day) => ({
      day,
      enabled: !["Friday"].includes(day),
      start: "09:00",
      end: "17:00",
    }))
  );

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [modal, setModal] = useState("");
  const [toast, setToast] = useState("");
  const [consultationForm, setConsultationForm] = useState({
    complaint: "",
    symptoms: "",
    examination: "",
    bloodPressure: "",
    pulse: "",
    temperature: "",
    weight: "",
    diagnosis: "",
    treatment: "",
    notes: "",
    followupDate: "",
  });
  const [prescriptionForm, setPrescriptionForm] = useState({
    patientId: "",
    diagnosis: "",
    medicines: [
      {
        name: "",
        dosage: "",
        frequency: "",
        duration: "",
        instructions: "",
      },
    ],
    notes: "",
  });
  const [labForm, setLabForm] = useState({
    patientId: "",
    tests: [],
    priority: "Normal",
    notes: "",
  });
  const [diagnosticForm, setDiagnosticForm] = useState({
    patientId: "",
    tests: [],
    priority: "Normal",
    notes: "",
  });
  const [profileForm, setProfileForm] = useState(initialDoctor);
  const [profileImage, setProfileImage] = useState("");
  const imageInputRef = useRef(null);

  const today = todayDate();

  const todayAppointments = useMemo(
    () => appointments.filter((item) => item.date === today),
    [appointments, today]
  );

  const waitingAppointments = todayAppointments.filter(
    (item) => item.status === "Waiting"
  );

  const completedAppointments = todayAppointments.filter(
    (item) => item.status === "Completed"
  );

  const unreadCount = notifications.filter((item) => item.unread).length;

  const filteredAppointments = useMemo(() => {
    const query = search.toLowerCase().trim();

    return appointments.filter((item) => {
      const matchesSearch =
        !query ||
        item.patient.toLowerCase().includes(query) ||
        item.id.toLowerCase().includes(query) ||
        item.patientId.toLowerCase().includes(query) ||
        item.phone.includes(query);

      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [appointments, search, statusFilter]);

  const showToast = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2800);
  };

  const updateAppointmentStatus = (id, status) => {
    setAppointments((current) =>
      current.map((item) =>
        item.id === id ? { ...item, status } : item
      )
    );

    setSelectedAppointment((current) =>
      current?.id === id ? { ...current, status } : current
    );

    showToast(`Appointment marked as ${status.toLowerCase()}.`);
  };

  const openConsultation = (appointment) => {
    setSelectedAppointment(appointment);
    setConsultationForm({
      complaint: appointment.complaint || "",
      symptoms: "",
      examination: "",
      bloodPressure: "",
      pulse: "",
      temperature: "",
      weight: "",
      diagnosis: "",
      treatment: "",
      notes: "",
      followupDate: "",
    });
    setActivePage("consultations");
  };

  const saveConsultation = (event) => {
    event.preventDefault();

    if (!selectedAppointment) {
      showToast("Select an appointment first.");
      return;
    }

    if (!consultationForm.diagnosis.trim()) {
      showToast("Please enter a diagnosis.");
      return;
    }

    const record = {
      id: `CON-${Date.now()}`,
      appointmentId: selectedAppointment.id,
      patientId: selectedAppointment.patientId,
      patient: selectedAppointment.patient,
      date: today,
      ...consultationForm,
    };

    setConsultations((current) => [record, ...current]);

    setAppointments((current) =>
      current.map((item) =>
        item.id === selectedAppointment.id
          ? { ...item, status: "Completed" }
          : item
      )
    );

    if (consultationForm.followupDate) {
      setFollowups((current) => [
        {
          id: `FUP-${Date.now()}`,
          patientId: selectedAppointment.patientId,
          patient: selectedAppointment.patient,
          date: consultationForm.followupDate,
          reason: consultationForm.diagnosis,
          status: "Pending",
        },
        ...current,
      ]);
    }

    setSelectedAppointment(null);
    setActivePage("appointments");
    showToast("Consultation saved successfully.");
  };

  const savePrescription = (event) => {
    event.preventDefault();

    const patient = patients.find(
      (item) => item.id === prescriptionForm.patientId
    );

    if (!patient) {
      showToast("Please select a patient.");
      return;
    }

    const validMedicines = prescriptionForm.medicines.filter(
      (medicine) => medicine.name.trim()
    );

    if (!validMedicines.length) {
      showToast("Add at least one medicine.");
      return;
    }

    setPrescriptions((current) => [
      {
        id: `RX-${Date.now()}`,
        patientId: patient.id,
        patient: patient.name,
        date: today,
        diagnosis: prescriptionForm.diagnosis,
        medicines: validMedicines,
        notes: prescriptionForm.notes,
      },
      ...current,
    ]);

    setPrescriptionForm({
      patientId: "",
      diagnosis: "",
      medicines: [
        {
          name: "",
          dosage: "",
          frequency: "",
          duration: "",
          instructions: "",
        },
      ],
      notes: "",
    });

    setModal("");
    showToast("Prescription created.");
  };

  const saveLabOrder = (event) => {
    event.preventDefault();

    const patient = patients.find(
      (item) => item.id === labForm.patientId
    );

    if (!patient || labForm.tests.length === 0) {
      showToast("Select a patient and at least one test.");
      return;
    }

    setLabOrders((current) => [
      {
        id: `LAB-${Date.now()}`,
        patientId: patient.id,
        patient: patient.name,
        tests: labForm.tests,
        priority: labForm.priority,
        notes: labForm.notes,
        date: today,
        status: "Pending",
      },
      ...current,
    ]);

    setLabForm({
      patientId: "",
      tests: [],
      priority: "Normal",
      notes: "",
    });

    setModal("");
    showToast("Laboratory order created.");
  };

  const saveDiagnosticOrder = (event) => {
    event.preventDefault();

    const patient = patients.find(
      (item) => item.id === diagnosticForm.patientId
    );

    if (!patient || diagnosticForm.tests.length === 0) {
      showToast("Select a patient and at least one test.");
      return;
    }

    setDiagnosticOrders((current) => [
      {
        id: `DIA-${Date.now()}`,
        patientId: patient.id,
        patient: patient.name,
        tests: diagnosticForm.tests,
        priority: diagnosticForm.priority,
        notes: diagnosticForm.notes,
        date: today,
        status: "Pending",
      },
      ...current,
    ]);

    setDiagnosticForm({
      patientId: "",
      tests: [],
      priority: "Normal",
      notes: "",
    });

    setModal("");
    showToast("Diagnostic order created.");
  };

  const saveProfile = (event) => {
    event.preventDefault();

    setDoctor({
      ...profileForm,
      image: profileImage || profileForm.image,
    });

    setModal("");
    showToast("Profile updated.");
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      showToast("Choose a JPG, PNG or WebP image.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      showToast("Image size must be below 2MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => setProfileImage(reader.result);
    reader.readAsDataURL(file);
  };

  const updateSchedule = (day, field, value) => {
    setSchedule((current) =>
      current.map((item) =>
        item.day === day ? { ...item, [field]: value } : item
      )
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((current) =>
      current.map((item) => ({ ...item, unread: false }))
    );
    showToast("All notifications marked as read.");
  };

  const pageTitles = {
    overview: "Doctor Overview",
    appointments: "Appointments",
    patients: "My Patients",
    consultations: "Consultations",
    prescriptions: "Prescriptions",
    laboratory: "Laboratory Orders",
    diagnostics: "Diagnostic Orders",
    followups: "Follow-ups",
    schedule: "My Schedule",
    profile: "My Profile",
    notifications: "Notifications",
  };

  const pageDescription = {
    overview: "Your daily clinical activity and patient schedule.",
    appointments: "Review appointments and manage your patient queue.",
    patients: "View patient information and available medical history.",
    consultations: "Record examination findings and treatment plans.",
    prescriptions: "Create and review patient prescriptions.",
    laboratory: "Request laboratory investigations for your patients.",
    diagnostics: "Request diagnostic procedures and imaging.",
    followups: "Manage patients who need another consultation.",
    schedule: "Manage your consultation days and working hours.",
    profile: "Manage your professional information.",
    notifications: "Updates and reminders related to your work.",
  };

  const renderOverview = () => (
    <>
      <SectionHeading
        eyebrow="Your workspace"
        title={`Good morning, ${doctor.name.split(" ")[1] || "Doctor"}`}
        description="Here is an overview of your clinical activities for today."
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Today's Appointments"
          value={todayAppointments.length}
          note="Scheduled for today"
          icon={FiCalendar}
          color="blue"
        />
        <StatCard
          label="Waiting Patients"
          value={waitingAppointments.length}
          note="Patients in your queue"
          icon={FiClock}
          color="amber"
        />
        <StatCard
          label="Completed Visits"
          value={completedAppointments.length}
          note="Consultations completed today"
          icon={FiCheckCircle}
          color="green"
        />
        <StatCard
          label="My Patients"
          value={patients.length}
          note="Demo patient records"
          icon={FiUsers}
          color="purple"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <div>
              <h2 className="font-bold text-slate-900">Today's Patient Queue</h2>
              <p className="mt-1 text-xs text-slate-500">
                Your appointments and walk-in patients
              </p>
            </div>
            <button
              onClick={() => setActivePage("appointments")}
              className="text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              View all
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {todayAppointments.length === 0 ? (
              <div className="p-8 text-center text-sm text-slate-500">
                No appointments for today.
              </div>
            ) : (
              todayAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-sm font-bold text-blue-700">
                      {appointment.serial}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">
                        {appointment.patient}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {appointment.patientId} · {appointment.time}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 sm:justify-end">
                    <StatusBadge status={appointment.status} />
                    <button
                      onClick={() => {
                        setSelectedAppointment(appointment);
                        setModal("appointment");
                      }}
                      className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-blue-600"
                      aria-label="View appointment"
                    >
                      <FiArrowRight size={18} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl bg-slate-900 p-5 text-white">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-white/10 p-3">
                <FiActivity size={22} />
              </div>
              <div>
                <p className="text-sm font-semibold">Your Department</p>
                <p className="mt-1 text-xs text-slate-300">
                  {doctor.department}
                </p>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4 border-t border-white/10 pt-5">
              <div>
                <p className="text-2xl font-bold">{doctor.experience}</p>
                <p className="mt-1 text-xs text-slate-400">Experience</p>
              </div>
              <div>
                <p className="text-2xl font-bold">৳{doctor.fee}</p>
                <p className="mt-1 text-xs text-slate-400">
                  Consultation fee
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-slate-900">Recent Notifications</h2>
              <button
                onClick={() => setActivePage("notifications")}
                className="text-xs font-semibold text-blue-600"
              >
                See all
              </button>
            </div>
            <div className="mt-4 space-y-4">
              {notifications.slice(0, 3).map((item) => (
                <div key={item.id} className="flex gap-3">
                  <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-800">
                      {item.title}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      {item.description}
                    </p>
                    <p className="mt-1 text-[11px] text-slate-400">
                      {item.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );

  const renderAppointments = () => (
    <>
      <SectionHeading
        eyebrow="Patient management"
        title="Appointments"
        description={pageDescription.appointments}
      />

      <div className="mb-5 grid gap-4 sm:grid-cols-3">
        <StatCard
          label="Total Appointments"
          value={todayAppointments.length}
          icon={FiCalendar}
        />
        <StatCard
          label="Waiting"
          value={waitingAppointments.length}
          icon={FiClock}
          color="amber"
        />
        <StatCard
          label="Completed"
          value={completedAppointments.length}
          icon={FiCheckCircle}
          color="green"
        />
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="flex flex-col gap-3 border-b border-slate-100 p-4 sm:flex-row">
          <div className="relative flex-1">
            <FiSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={17}
            />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search patient, ID or phone..."
              className={`${inputClass} pl-10`}
            />
          </div>
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className={`${inputClass} sm:w-48`}
          >
            {[
              "All",
              "Waiting",
              "In Consultation",
              "Completed",
              "Cancelled",
              "No Show",
            ].map((status) => (
              <option key={status}>{status}</option>
            ))}
          </select>
        </div>

        <div className="hidden overflow-x-auto md:block">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-5 py-4">Patient</th>
                <th className="px-5 py-4">Serial / Time</th>
                <th className="px-5 py-4">Visit Type</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredAppointments.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/70">
                  <td className="px-5 py-4">
                    <p className="font-semibold text-slate-800">
                      {item.patient}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {item.patientId} · {item.phone}
                    </p>
                  </td>
                  <td className="px-5 py-4">
                    <p className="font-semibold text-slate-700">
                      #{item.serial}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">{item.time}</p>
                  </td>
                  <td className="px-5 py-4 text-slate-600">{item.type}</td>
                  <td className="px-5 py-4">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button
                      onClick={() => {
                        setSelectedAppointment(item);
                        setModal("appointment");
                      }}
                      className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:border-blue-300 hover:text-blue-700"
                    >
                      View details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredAppointments.length === 0 && (
            <div className="p-10 text-center text-sm text-slate-500">
              No matching appointments found.
            </div>
          )}
        </div>

        <div className="divide-y divide-slate-100 md:hidden">
          {filteredAppointments.map((item) => (
            <div key={item.id} className="space-y-3 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-slate-800">{item.patient}</p>
                  <p className="mt-1 text-xs text-slate-500">
                    {item.patientId}
                  </p>
                </div>
                <StatusBadge status={item.status} />
              </div>
              <div className="flex justify-between text-xs text-slate-500">
                <span>Serial #{item.serial}</span>
                <span>{item.time}</span>
                <span>{item.type}</span>
              </div>
              <button
                onClick={() => {
                  setSelectedAppointment(item);
                  setModal("appointment");
                }}
                className="w-full rounded-lg border border-slate-200 py-2 text-xs font-semibold text-slate-700"
              >
                View appointment
              </button>
            </div>
          ))}
          {filteredAppointments.length === 0 && (
            <p className="p-8 text-center text-sm text-slate-500">
              No matching appointments found.
            </p>
          )}
        </div>
      </div>
    </>
  );

  const renderPatients = () => {
    const query = search.toLowerCase().trim();
    const filtered = patients.filter(
      (patient) =>
        !query ||
        patient.name.toLowerCase().includes(query) ||
        patient.id.toLowerCase().includes(query) ||
        patient.phone.includes(query)
    );

    return (
      <>
        <SectionHeading
          eyebrow="Patient records"
          title="My Patients"
          description={pageDescription.patients}
        />

        <div className="mb-5 grid gap-4 sm:grid-cols-3">
          <StatCard label="Total Patients" value={patients.length} icon={FiUsers} />
          <StatCard
            label="Male Patients"
            value={patients.filter((item) => item.gender === "Male").length}
            icon={FiUser}
            color="blue"
          />
          <StatCard
            label="Female Patients"
            value={patients.filter((item) => item.gender === "Female").length}
            icon={FiHeart}
            color="purple"
          />
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="border-b border-slate-100 p-4">
            <div className="relative">
              <FiSearch
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={17}
              />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search patient name, ID or phone..."
                className={`${inputClass} pl-10`}
              />
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {filtered.map((patient) => (
              <div
                key={patient.id}
                className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 font-bold text-blue-700">
                    {patient.name
                      .split(" ")
                      .map((part) => part[0])
                      .slice(0, 2)
                      .join("")}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">
                      {patient.name}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {patient.id} · {patient.age} years · {patient.gender}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSelectedPatient(patient);
                    setModal("patient");
                  }}
                  className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:border-blue-300 hover:text-blue-700"
                >
                  View patient record
                </button>
              </div>
            ))}
            {filtered.length === 0 && (
              <p className="p-8 text-center text-sm text-slate-500">
                No patients found.
              </p>
            )}
          </div>
        </div>
      </>
    );
  };

  const renderConsultations = () => (
    <>
      <SectionHeading
        eyebrow="Clinical documentation"
        title="Consultation"
        description="Document patient complaints, examination findings, diagnosis and treatment."
        action={
          selectedAppointment ? (
            <SecondaryButton
              onClick={() => setSelectedAppointment(null)}
            >
              Clear patient
            </SecondaryButton>
          ) : null
        }
      />

      {!selectedAppointment ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="font-bold text-slate-900">Select a patient</h2>
          <p className="mt-1 text-sm text-slate-500">
            Choose an appointment to start documenting a consultation.
          </p>
          <div className="mt-5 divide-y divide-slate-100">
            {appointments
              .filter(
                (item) =>
                  item.status === "Waiting" ||
                  item.status === "In Consultation"
              )
              .map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-semibold text-slate-800">
                      {item.patient}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {item.patientId} · Serial #{item.serial} · {item.time}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {item.complaint}
                    </p>
                  </div>
                  <PrimaryButton onClick={() => openConsultation(item)}>
                    Start consultation <FiArrowRight />
                  </PrimaryButton>
                </div>
              ))}
          </div>
        </div>
      ) : (
        <form onSubmit={saveConsultation} className="space-y-5">
          <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-5">
            <p className="text-xs font-bold uppercase tracking-wide text-blue-600">
              Selected patient
            </p>
            <div className="mt-2 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  {selectedAppointment.patient}
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  {selectedAppointment.patientId} · Age{" "}
                  {selectedAppointment.age} · {selectedAppointment.gender}
                </p>
              </div>
              <StatusBadge status={selectedAppointment.status} />
            </div>
            <p className="mt-3 text-sm text-slate-600">
              Reported complaint: {selectedAppointment.complaint}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <h2 className="mb-5 font-bold text-slate-900">
              Clinical assessment
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Chief complaint">
                <textarea
                  rows={3}
                  value={consultationForm.complaint}
                  onChange={(event) =>
                    setConsultationForm({
                      ...consultationForm,
                      complaint: event.target.value,
                    })
                  }
                  className={inputClass}
                  placeholder="Patient's reported complaint..."
                />
              </Field>
              <Field label="Symptoms">
                <textarea
                  rows={3}
                  value={consultationForm.symptoms}
                  onChange={(event) =>
                    setConsultationForm({
                      ...consultationForm,
                      symptoms: event.target.value,
                    })
                  }
                  className={inputClass}
                  placeholder="Describe symptoms..."
                />
              </Field>
              <Field label="Physical examination">
                <textarea
                  rows={3}
                  value={consultationForm.examination}
                  onChange={(event) =>
                    setConsultationForm({
                      ...consultationForm,
                      examination: event.target.value,
                    })
                  }
                  className={inputClass}
                  placeholder="Examination findings..."
                />
              </Field>
              <Field label="Clinical notes">
                <textarea
                  rows={3}
                  value={consultationForm.notes}
                  onChange={(event) =>
                    setConsultationForm({
                      ...consultationForm,
                      notes: event.target.value,
                    })
                  }
                  className={inputClass}
                  placeholder="Additional notes..."
                />
              </Field>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <h2 className="mb-5 font-bold text-slate-900">Patient vitals</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["bloodPressure", "Blood pressure", "e.g. 120/80 mmHg"],
                ["pulse", "Pulse rate", "e.g. 78 bpm"],
                ["temperature", "Temperature", "e.g. 98.6 °F"],
                ["weight", "Weight", "e.g. 65 kg"],
              ].map(([key, label, placeholder]) => (
                <Field key={key} label={label}>
                  <input
                    value={consultationForm[key]}
                    onChange={(event) =>
                      setConsultationForm({
                        ...consultationForm,
                        [key]: event.target.value,
                      })
                    }
                    className={inputClass}
                    placeholder={placeholder}
                  />
                </Field>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <h2 className="mb-5 font-bold text-slate-900">
              Diagnosis and treatment
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Diagnosis" required>
                <textarea
                  rows={3}
                  required
                  value={consultationForm.diagnosis}
                  onChange={(event) =>
                    setConsultationForm({
                      ...consultationForm,
                      diagnosis: event.target.value,
                    })
                  }
                  className={inputClass}
                  placeholder="Enter clinical diagnosis..."
                />
              </Field>
              <Field label="Treatment plan">
                <textarea
                  rows={3}
                  value={consultationForm.treatment}
                  onChange={(event) =>
                    setConsultationForm({
                      ...consultationForm,
                      treatment: event.target.value,
                    })
                  }
                  className={inputClass}
                  placeholder="Treatment and recommendations..."
                />
              </Field>
              <Field label="Follow-up date">
                <input
                  type="date"
                  min={today}
                  value={consultationForm.followupDate}
                  onChange={(event) =>
                    setConsultationForm({
                      ...consultationForm,
                      followupDate: event.target.value,
                    })
                  }
                  className={inputClass}
                />
              </Field>
            </div>
          </div>

          <div className="flex flex-col justify-end gap-3 sm:flex-row">
            <SecondaryButton
              onClick={() => setSelectedAppointment(null)}
            >
              Cancel
            </SecondaryButton>
            <PrimaryButton type="submit">
              <FiCheck /> Save consultation
            </PrimaryButton>
          </div>
        </form>
      )}

      {consultations.length > 0 && (
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="font-bold text-slate-900">Recent consultations</h2>
          <div className="mt-4 divide-y divide-slate-100">
            {consultations.map((item) => (
              <div key={item.id} className="py-3">
                <p className="font-semibold text-slate-800">{item.patient}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {item.date} · {item.diagnosis}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );

  const renderPrescriptions = () => (
    <>
      <SectionHeading
        eyebrow="Medication management"
        title="Prescriptions"
        description="Create prescriptions and review prescriptions created in this session."
        action={
          <PrimaryButton onClick={() => setModal("prescription")}>
            <FiPlus /> New prescription
          </PrimaryButton>
        }
      />

      {prescriptions.length === 0 ? (
        <EmptyState
          title="No prescriptions yet"
          description="Prescriptions you create will appear here."
        />
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {prescriptions.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-slate-200 bg-white p-5"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-bold text-slate-900">{item.patient}</p>
                  <p className="mt-1 text-xs text-slate-500">
                    {item.patientId} · {item.date}
                  </p>
                </div>
                <span className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">
                  {item.id}
                </span>
              </div>
              <p className="mt-4 text-sm text-slate-600">
                Diagnosis: {item.diagnosis || "Not specified"}
              </p>
              <div className="mt-4 space-y-2">
                {item.medicines.map((medicine, index) => (
                  <div
                    key={index}
                    className="rounded-xl bg-slate-50 p-3 text-sm"
                  >
                    <p className="font-semibold text-slate-800">
                      {medicine.name}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {medicine.dosage} · {medicine.frequency} ·{" "}
                      {medicine.duration}
                    </p>
                    {medicine.instructions && (
                      <p className="mt-1 text-xs text-slate-500">
                        {medicine.instructions}
                      </p>
                    )}
                  </div>
                ))}
              </div>
              {item.notes && (
                <p className="mt-3 text-xs text-slate-500">
                  Notes: {item.notes}
                </p>
              )}
              <button
                onClick={() => {
                  const printable = [
                    "MEDICARE HOSPITAL",
                    "PRESCRIPTION",
                    `Patient: ${item.patient}`,
                    `Patient ID: ${item.patientId}`,
                    `Date: ${item.date}`,
                    `Diagnosis: ${item.diagnosis}`,
                    "",
                    ...item.medicines.map(
                      (medicine, index) =>
                        `${index + 1}. ${medicine.name} - ${medicine.dosage} - ${medicine.frequency} - ${medicine.duration}\n   ${medicine.instructions}`
                    ),
                    "",
                    `Notes: ${item.notes}`,
                    "",
                    `Doctor: ${doctor.name}`,
                    doctor.qualification,
                  ].join("\n");

                  const popup = window.open("", "_blank", "width=750,height=800");
                  if (!popup) {
                    showToast("Please allow pop-ups to print.");
                    return;
                  }
                  popup.document.write(
                    `<html><head><title>Prescription</title><style>body{font-family:Arial,sans-serif;padding:40px;white-space:pre-wrap;line-height:1.7;color:#172033}h1{font-size:22px}</style></head><body><h1>MEDICARE HOSPITAL</h1><pre>${printable.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</pre></body></html>`
                  );
                  popup.document.close();
                  popup.focus();
                  popup.print();
                }}
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                <FiFileText /> Print prescription
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );

  const renderLaboratory = () => (
    <>
      <SectionHeading
        eyebrow="Investigation requests"
        title="Laboratory Orders"
        description="Create laboratory test requests for your patients."
        action={
          <PrimaryButton onClick={() => setModal("lab")}>
            <FiPlus /> Create lab order
          </PrimaryButton>
        }
      />

      {labOrders.length === 0 ? (
        <EmptyState
          title="No laboratory orders"
          description="Laboratory orders created by you will appear here."
        />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="divide-y divide-slate-100">
            {labOrders.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-bold text-slate-800">{item.patient}</p>
                  <p className="mt-1 text-xs text-slate-500">
                    {item.id} · {item.patientId} · {item.date}
                  </p>
                  <p className="mt-2 text-sm text-slate-600">
                    {item.tests.join(", ")}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Priority: {item.priority}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <StatusBadge status={item.status} />
                  <select
                    value={item.status}
                    onChange={(event) =>
                      setLabOrders((current) =>
                        current.map((order) =>
                          order.id === item.id
                            ? { ...order, status: event.target.value }
                            : order
                        )
                      )
                    }
                    className="rounded-lg border border-slate-200 px-2 py-2 text-xs"
                  >
                    <option>Pending</option>
                    <option>In Progress</option>
                    <option>Ready</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );

  const renderDiagnostics = () => (
    <>
      <SectionHeading
        eyebrow="Diagnostic investigations"
        title="Diagnostic Orders"
        description="Request imaging and diagnostic procedures for your patients."
        action={
          <PrimaryButton onClick={() => setModal("diagnostic")}>
            <FiPlus /> New diagnostic order
          </PrimaryButton>
        }
      />

      {diagnosticOrders.length === 0 ? (
        <EmptyState
          title="No diagnostic orders"
          description="Diagnostic requests you create will appear here."
        />
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {diagnosticOrders.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-slate-200 bg-white p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-bold text-slate-900">{item.patient}</p>
                  <p className="mt-1 text-xs text-slate-500">
                    {item.id} · {item.patientId}
                  </p>
                </div>
                <StatusBadge status={item.status} />
              </div>
              <p className="mt-4 text-sm text-slate-600">
                {item.tests.join(", ")}
              </p>
              <p className="mt-2 text-xs text-slate-500">
                Priority: {item.priority} · {item.date}
              </p>
              <select
                value={item.status}
                onChange={(event) =>
                  setDiagnosticOrders((current) =>
                    current.map((order) =>
                      order.id === item.id
                        ? { ...order, status: event.target.value }
                        : order
                    )
                  )
                }
                className="mt-4 w-full rounded-lg border border-slate-200 px-3 py-2 text-xs"
              >
                <option>Pending</option>
                <option>In Progress</option>
                <option>Ready</option>
              </select>
            </div>
          ))}
        </div>
      )}
    </>
  );

  const renderFollowups = () => (
    <>
      <SectionHeading
        eyebrow="Continuity of care"
        title="Follow-ups"
        description={pageDescription.followups}
      />

      {followups.length === 0 ? (
        <EmptyState
          title="No follow-ups scheduled"
          description="Follow-ups added during consultations will appear here."
        />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          {followups.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-3 border-b border-slate-100 p-5 last:border-0 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-bold text-slate-800">{item.patient}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {item.patientId} · {item.date}
                </p>
                <p className="mt-2 text-sm text-slate-600">{item.reason}</p>
              </div>
              <div className="flex items-center gap-3">
                <StatusBadge status={item.status} />
                <button
                  onClick={() =>
                    setFollowups((current) =>
                      current.map((followup) =>
                        followup.id === item.id
                          ? {
                              ...followup,
                              status:
                                followup.status === "Completed"
                                  ? "Pending"
                                  : "Completed",
                            }
                          : followup
                      )
                    )
                  }
                  className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700"
                >
                  {item.status === "Completed" ? "Reopen" : "Complete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );

  const renderSchedule = () => (
    <>
      <SectionHeading
        eyebrow="Availability settings"
        title="My Schedule"
        description="Set the days and consultation hours when patients can book appointments."
      />

      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="mb-5">
          <h2 className="font-bold text-slate-900">Weekly availability</h2>
          <p className="mt-1 text-sm text-slate-500">
            Changes are currently stored in this page only.
          </p>
        </div>

        <div className="space-y-3">
          {schedule.map((item) => (
            <div
              key={item.day}
              className="grid gap-3 rounded-xl border border-slate-100 p-4 sm:grid-cols-[1fr_100px_1fr_1fr]"
            >
              <div className="flex items-center font-semibold text-slate-800">
                {item.day}
              </div>
              <label className="flex items-center gap-2 text-sm text-slate-600">
                <input
                  type="checkbox"
                  checked={item.enabled}
                  onChange={(event) =>
                    updateSchedule(item.day, "enabled", event.target.checked)
                  }
                  className="h-4 w-4 accent-blue-600"
                />
                Available
              </label>
              <Field label="Start time">
                <input
                  type="time"
                  disabled={!item.enabled}
                  value={item.start}
                  onChange={(event) =>
                    updateSchedule(item.day, "start", event.target.value)
                  }
                  className={inputClass}
                />
              </Field>
              <Field label="End time">
                <input
                  type="time"
                  disabled={!item.enabled}
                  value={item.end}
                  onChange={(event) =>
                    updateSchedule(item.day, "end", event.target.value)
                  }
                  className={inputClass}
                />
              </Field>
            </div>
          ))}
        </div>

        <div className="mt-5 flex justify-end">
          <PrimaryButton onClick={() => showToast("Schedule saved in demo.")}>
            <FiCheck /> Save schedule
          </PrimaryButton>
        </div>
      </div>
    </>
  );

  const renderProfile = () => (
    <>
      <SectionHeading
        eyebrow="Account settings"
        title="My Profile"
        description={pageDescription.profile}
        action={
          <PrimaryButton
            onClick={() => {
              setProfileForm(doctor);
              setProfileImage(doctor.image || "");
              setModal("profile");
            }}
          >
            <FiSettings /> Edit profile
          </PrimaryButton>
        }
      />

      <div className="grid gap-6 xl:grid-cols-[1fr_1.5fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex flex-col items-center text-center">
            {doctor.image ? (
              <img
                src={doctor.image}
                alt={doctor.name}
                className="h-28 w-28 rounded-2xl object-cover"
              />
            ) : (
              <div className="flex h-28 w-28 items-center justify-center rounded-2xl bg-blue-50 text-3xl font-bold text-blue-700">
                {doctor.name
                  .split(" ")
                  .map((part) => part[0])
                  .slice(0, 2)
                  .join("")}
              </div>
            )}
            <h2 className="mt-4 text-xl font-bold text-slate-900">
              {doctor.name}
            </h2>
            <p className="mt-1 text-sm text-blue-600">{doctor.specialty}</p>
            <span className="mt-3 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              Active doctor
            </span>
          </div>
          <div className="mt-6 space-y-4 border-t border-slate-100 pt-5 text-sm">
            <div className="flex justify-between gap-4">
              <span className="text-slate-500">Department</span>
              <span className="font-semibold text-slate-800">
                {doctor.department}
              </span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-slate-500">Experience</span>
              <span className="font-semibold text-slate-800">
                {doctor.experience}
              </span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-slate-500">Consultation fee</span>
              <span className="font-semibold text-slate-800">
                ৳{doctor.fee}
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="font-bold text-slate-900">Professional information</h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            {[
              ["Full name", doctor.name],
              ["Specialty", doctor.specialty],
              ["Department", doctor.department],
              ["Qualification", doctor.qualification],
              ["Phone", doctor.phone],
              ["Email", doctor.email],
            ].map(([label, value]) => (
              <div key={label}>
                <p className="text-xs font-medium text-slate-500">{label}</p>
                <p className="mt-2 break-words text-sm font-semibold text-slate-800">
                  {value || "Not provided"}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-6 border-t border-slate-100 pt-5">
            <p className="text-xs font-medium text-slate-500">About</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {doctor.bio || "No biography added."}
            </p>
          </div>
        </div>
      </div>
    </>
  );

  const renderNotifications = () => (
    <>
      <SectionHeading
        eyebrow="Updates"
        title="Notifications"
        description={pageDescription.notifications}
        action={
          <SecondaryButton onClick={markAllNotificationsRead}>
            <FiCheck /> Mark all as read
          </SecondaryButton>
        }
      />

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        {notifications.map((item) => (
          <div
            key={item.id}
            className={classNames(
              "flex gap-4 border-b border-slate-100 p-5 last:border-0",
              item.unread && "bg-blue-50/40"
            )}
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <FiBell size={18} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-semibold text-slate-800">{item.title}</p>
                {item.unread && (
                  <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-700">
                    NEW
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm leading-6 text-slate-500">
                {item.description}
              </p>
              <p className="mt-2 text-xs text-slate-400">{item.time}</p>
            </div>
            {item.unread && (
              <button
                onClick={() =>
                  setNotifications((current) =>
                    current.map((notification) =>
                      notification.id === item.id
                        ? { ...notification, unread: false }
                        : notification
                    )
                  )
                }
                className="self-center text-xs font-semibold text-blue-600"
              >
                Mark read
              </button>
            )}
          </div>
        ))}
        {notifications.length === 0 && (
          <p className="p-8 text-center text-sm text-slate-500">
            No notifications.
          </p>
        )}
      </div>
    </>
  );

  const addMedicine = () => {
    setPrescriptionForm((current) => ({
      ...current,
      medicines: [
        ...current.medicines,
        {
          name: "",
          dosage: "",
          frequency: "",
          duration: "",
          instructions: "",
        },
      ],
    }));
  };

  const updateMedicine = (index, field, value) => {
    setPrescriptionForm((current) => ({
      ...current,
      medicines: current.medicines.map((medicine, medicineIndex) =>
        medicineIndex === index
          ? { ...medicine, [field]: value }
          : medicine
      ),
    }));
  };

  const removeMedicine = (index) => {
    setPrescriptionForm((current) => ({
      ...current,
      medicines: current.medicines.filter(
        (_, medicineIndex) => medicineIndex !== index
      ),
    }));
  };

  const toggleTest = (form, setForm, test) => {
    setForm((current) => ({
      ...current,
      tests: current.tests.includes(test)
        ? current.tests.filter((item) => item !== test)
        : [...current.tests, test],
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {sidebarOpen && (
        <button
          aria-label="Close navigation"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden"
        />
      )}

      <aside
        className={classNames(
          "fixed inset-y-0 left-0 z-50 flex w-[270px] flex-col bg-slate-950 text-white transition-transform duration-300 lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600">
              <FiHeart size={21} />
            </div>
            <div>
              <p className="text-lg font-bold tracking-tight">MediCare</p>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                Doctor Portal
              </p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-2 text-slate-400 hover:bg-white/10 lg:hidden"
          >
            <FiX size={19} />
          </button>
        </div>

        <div className="border-b border-white/10 px-5 py-5">
          <div className="flex items-center gap-3">
            {doctor.image ? (
              <img
                src={doctor.image}
                alt={doctor.name}
                className="h-11 w-11 rounded-xl object-cover"
              />
            ) : (
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/20 font-bold text-blue-300">
                SA
              </div>
            )}
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">{doctor.name}</p>
              <p className="mt-1 truncate text-xs text-slate-400">
                {doctor.department}
              </p>
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-7 overflow-y-auto px-4 py-6">
          {navigation.map((group) => (
            <div key={group.title}>
              <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                {group.title}
              </p>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const active = activePage === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActivePage(item.id);
                        setSidebarOpen(false);
                        setSearch("");
                      }}
                      className={classNames(
                        "flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition",
                        active
                          ? "bg-blue-600 text-white shadow-lg shadow-blue-950/30"
                          : "text-slate-400 hover:bg-white/5 hover:text-white"
                      )}
                    >
                      <Icon size={18} />
                      <span className="flex-1">{item.label}</span>
                      {item.id === "notifications" && unreadCount > 0 && (
                        <span className="rounded-full bg-rose-500 px-2 py-0.5 text-[10px] font-bold text-white">
                          {unreadCount}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="border-t border-white/10 p-4">
          <button
            onClick={() => showToast("Demo portal: sign-out is not connected.")}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-400 transition hover:bg-white/5 hover:text-white"
          >
            <FiLogOut size={18} />
            Sign out
          </button>
          <p className="mt-3 px-3 text-[10px] text-slate-600">
            MediCare Hospital · Doctor Portal
          </p>
        </div>
      </aside>

      <div className="min-h-screen lg:pl-[270px]">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-7">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-xl border border-slate-200 p-2.5 text-slate-600 hover:bg-slate-50 lg:hidden"
              aria-label="Open navigation"
            >
              <FiMenu size={19} />
            </button>
            <div>
              <p className="text-sm font-bold text-slate-900">
                {pageTitles[activePage]}
              </p>
              <p className="mt-1 hidden text-xs text-slate-500 sm:block">
                MediCare Hospital / Doctor Portal
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => setActivePage("notifications")}
              className="relative rounded-xl border border-slate-200 p-2.5 text-slate-500 transition hover:bg-slate-50"
              aria-label="Notifications"
            >
              <FiBell size={19} />
              {unreadCount > 0 && (
                <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full border-2 border-white bg-rose-500" />
              )}
            </button>
            <button
              onClick={() => setActivePage("profile")}
              className="flex items-center gap-2 rounded-xl p-1.5 transition hover:bg-slate-50"
            >
              {doctor.image ? (
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="h-9 w-9 rounded-lg object-cover"
                />
              ) : (
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-xs font-bold text-blue-700">
                  SA
                </div>
              )}
              <div className="hidden text-left sm:block">
                <p className="text-xs font-bold text-slate-800">
                  {doctor.name}
                </p>
                <p className="mt-0.5 text-[10px] text-slate-500">Doctor</p>
              </div>
              <FiChevronDown className="hidden text-slate-400 sm:block" size={14} />
            </button>
          </div>
        </header>

        <main className="mx-auto max-w-[1600px] p-4 sm:p-7 lg:p-8">
          {activePage === "overview" && renderOverview()}
          {activePage === "appointments" && renderAppointments()}
          {activePage === "patients" && renderPatients()}
          {activePage === "consultations" && renderConsultations()}
          {activePage === "prescriptions" && renderPrescriptions()}
          {activePage === "laboratory" && renderLaboratory()}
          {activePage === "diagnostics" && renderDiagnostics()}
          {activePage === "followups" && renderFollowups()}
          {activePage === "schedule" && renderSchedule()}
          {activePage === "profile" && renderProfile()}
          {activePage === "notifications" && renderNotifications()}

          <div className="mt-10 flex flex-col justify-between gap-2 border-t border-slate-200 pt-5 text-xs text-slate-400 sm:flex-row">
            <p>© 2026 MediCare Hospital. Doctor Portal.</p>
            <p className="flex items-center gap-2">
              <FiShield size={13} /> Secure clinical workspace demo
            </p>
          </div>
        </main>
      </div>

      {modal === "appointment" && selectedAppointment && (
        <Modal
          title="Appointment details"
          subtitle={selectedAppointment.id}
          onClose={() => setModal("")}
        >
          <div className="space-y-5">
            <div>
              <p className="text-lg font-bold text-slate-900">
                {selectedAppointment.patient}
              </p>
              <p className="mt-1 text-sm text-slate-500">
                {selectedAppointment.patientId}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                ["Age", selectedAppointment.age],
                ["Gender", selectedAppointment.gender],
                ["Phone", selectedAppointment.phone],
                ["Blood group", selectedAppointment.bloodGroup],
                ["Date", selectedAppointment.date],
                ["Time", selectedAppointment.time],
                ["Visit type", selectedAppointment.type],
                ["Serial", `#${selectedAppointment.serial}`],
              ].map(([label, value]) => (
                <div key={label} className="rounded-xl bg-slate-50 p-3">
                  <p className="text-xs text-slate-500">{label}</p>
                  <p className="mt-1 break-words text-sm font-semibold text-slate-800">
                    {value}
                  </p>
                </div>
              ))}
            </div>
            <div className="rounded-xl bg-amber-50 p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-amber-700">
                Reported complaint
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                {selectedAppointment.complaint}
              </p>
            </div>
            <div>
              <p className="mb-2 text-xs font-semibold text-slate-500">
                Appointment status
              </p>
              <StatusBadge status={selectedAppointment.status} />
            </div>
            <div className="flex flex-wrap gap-2 border-t border-slate-100 pt-4">
              {selectedAppointment.status === "Waiting" && (
                <PrimaryButton
                  onClick={() => {
                    updateAppointmentStatus(
                      selectedAppointment.id,
                      "In Consultation"
                    );
                  }}
                >
                  <FiActivity /> Call patient
                </PrimaryButton>
              )}
              {selectedAppointment.status !== "Completed" &&
                selectedAppointment.status !== "Cancelled" && (
                  <SecondaryButton
                    onClick={() => {
                      setModal("");
                      openConsultation(selectedAppointment);
                    }}
                  >
                    Open consultation
                  </SecondaryButton>
                )}
              {selectedAppointment.status !== "Completed" && (
                <SecondaryButton
                  onClick={() =>
                    updateAppointmentStatus(
                      selectedAppointment.id,
                      "Completed"
                    )
                  }
                >
                  <FiCheck /> Complete
                </SecondaryButton>
              )}
              {selectedAppointment.status === "Waiting" && (
                <SecondaryButton
                  onClick={() =>
                    updateAppointmentStatus(
                      selectedAppointment.id,
                      "No Show"
                    )
                  }
                >
                  Mark no show
                </SecondaryButton>
              )}
            </div>
          </div>
        </Modal>
      )}

      {modal === "patient" && selectedPatient && (
        <Modal
          title="Patient record"
          subtitle={selectedPatient.id}
          onClose={() => setModal("")}
        >
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-lg font-bold text-blue-700">
                {selectedPatient.name
                  .split(" ")
                  .map((part) => part[0])
                  .slice(0, 2)
                  .join("")}
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {selectedPatient.name}
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  {selectedPatient.age} years · {selectedPatient.gender}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                ["Phone", selectedPatient.phone],
                ["Blood group", selectedPatient.bloodGroup],
                ["Allergies", selectedPatient.allergies],
                ["Existing conditions", selectedPatient.conditions],
                ["Current medication", selectedPatient.medications],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-xl bg-slate-50 p-3"
                >
                  <p className="text-xs text-slate-500">{label}</p>
                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    {value || "Not available"}
                  </p>
                </div>
              ))}
            </div>
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
              <div className="flex items-center gap-2 text-amber-800">
                <FiAlertCircle />
                <p className="text-sm font-bold">Allergy information</p>
              </div>
              <p className="mt-2 text-sm text-slate-700">
                {selectedPatient.allergies}
              </p>
            </div>
            <PrimaryButton
              onClick={() => {
                const appointment = appointments.find(
                  (item) => item.patientId === selectedPatient.id
                );
                if (!appointment) {
                  setModal("");
                  showToast("No appointment found for this patient.");
                  return;
                }
                setModal("");
                openConsultation(appointment);
              }}
            >
              Start consultation <FiArrowRight />
            </PrimaryButton>
          </div>
        </Modal>
      )}

      {modal === "prescription" && (
        <Modal
          title="Create prescription"
          subtitle="Add medication and dosage instructions."
          onClose={() => setModal("")}
          wide
        >
          <form onSubmit={savePrescription} className="space-y-5">
            <Field label="Select patient" required>
              <select
                required
                value={prescriptionForm.patientId}
                onChange={(event) =>
                  setPrescriptionForm({
                    ...prescriptionForm,
                    patientId: event.target.value,
                  })
                }
                className={inputClass}
              >
                <option value="">Choose patient</option>
                {patients.map((patient) => (
                  <option key={patient.id} value={patient.id}>
                    {patient.name} — {patient.id}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Diagnosis">
              <input
                value={prescriptionForm.diagnosis}
                onChange={(event) =>
                  setPrescriptionForm({
                    ...prescriptionForm,
                    diagnosis: event.target.value,
                  })
                }
                className={inputClass}
                placeholder="Enter diagnosis"
              />
            </Field>

            <div>
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-bold text-slate-900">Medicines</h3>
                <button
                  type="button"
                  onClick={addMedicine}
                  className="inline-flex items-center gap-1 text-xs font-bold text-blue-600"
                >
                  <FiPlus /> Add medicine
                </button>
              </div>

              <div className="space-y-4">
                {prescriptionForm.medicines.map((medicine, index) => (
                  <div
                    key={index}
                    className="rounded-xl border border-slate-200 p-4"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <p className="text-sm font-bold text-slate-700">
                        Medicine {index + 1}
                      </p>
                      {prescriptionForm.medicines.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeMedicine(index)}
                          className="text-xs font-semibold text-rose-600"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {[
                        ["name", "Medicine name", "e.g. Medicine name"],
                        ["dosage", "Dosage", "e.g. 500 mg"],
                        ["frequency", "Frequency", "e.g. 1-0-1"],
                        ["duration", "Duration", "e.g. 7 days"],
                      ].map(([key, label, placeholder]) => (
                        <Field key={key} label={label}>
                          <input
                            value={medicine[key]}
                            onChange={(event) =>
                              updateMedicine(index, key, event.target.value)
                            }
                            className={inputClass}
                            placeholder={placeholder}
                          />
                        </Field>
                      ))}
                      <div className="sm:col-span-2">
                        <Field label="Instructions">
                          <input
                            value={medicine.instructions}
                            onChange={(event) =>
                              updateMedicine(
                                index,
                                "instructions",
                                event.target.value
                              )
                            }
                            className={inputClass}
                            placeholder="e.g. Take after meals"
                          />
                        </Field>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Field label="Additional instructions">
              <textarea
                rows={3}
                value={prescriptionForm.notes}
                onChange={(event) =>
                  setPrescriptionForm({
                    ...prescriptionForm,
                    notes: event.target.value,
                  })
                }
                className={inputClass}
                placeholder="Additional advice for the patient..."
              />
            </Field>

            <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
              <SecondaryButton onClick={() => setModal("")}>
                Cancel
              </SecondaryButton>
              <PrimaryButton type="submit">
                <FiCheck /> Save prescription
              </PrimaryButton>
            </div>
          </form>
        </Modal>
      )}

      {modal === "lab" && (
        <Modal
          title="Create laboratory order"
          subtitle="Select the tests required for this patient."
          onClose={() => setModal("")}
          wide
        >
          <form onSubmit={saveLabOrder} className="space-y-5">
            <Field label="Select patient" required>
              <select
                required
                value={labForm.patientId}
                onChange={(event) =>
                  setLabForm({ ...labForm, patientId: event.target.value })
                }
                className={inputClass}
              >
                <option value="">Choose patient</option>
                {patients.map((patient) => (
                  <option key={patient.id} value={patient.id}>
                    {patient.name} — {patient.id}
                  </option>
                ))}
              </select>
            </Field>

            <div>
              <h3 className="mb-3 text-sm font-bold text-slate-800">
                Select laboratory tests
              </h3>
              <div className="grid gap-2 sm:grid-cols-2">
                {laboratoryTests.map((test) => (
                  <label
                    key={test}
                    className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 p-3 text-sm text-slate-700 hover:border-blue-300"
                  >
                    <input
                      type="checkbox"
                      checked={labForm.tests.includes(test)}
                      onChange={() => toggleTest(labForm, setLabForm, test)}
                      className="h-4 w-4 accent-blue-600"
                    />
                    {test}
                  </label>
                ))}
              </div>
            </div>

            <Field label="Priority">
              <select
                value={labForm.priority}
                onChange={(event) =>
                  setLabForm({ ...labForm, priority: event.target.value })
                }
                className={inputClass}
              >
                <option>Normal</option>
                <option>Urgent</option>
                <option>Emergency</option>
              </select>
            </Field>

            <Field label="Clinical notes">
              <textarea
                rows={3}
                value={labForm.notes}
                onChange={(event) =>
                  setLabForm({ ...labForm, notes: event.target.value })
                }
                className={inputClass}
                placeholder="Relevant clinical information..."
              />
            </Field>

            <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
              <SecondaryButton onClick={() => setModal("")}>
                Cancel
              </SecondaryButton>
              <PrimaryButton type="submit">
                <FiCheck /> Submit lab order
              </PrimaryButton>
            </div>
          </form>
        </Modal>
      )}

      {modal === "diagnostic" && (
        <Modal
          title="Create diagnostic order"
          subtitle="Request imaging and diagnostic procedures."
          onClose={() => setModal("")}
          wide
        >
          <form onSubmit={saveDiagnosticOrder} className="space-y-5">
            <Field label="Select patient" required>
              <select
                required
                value={diagnosticForm.patientId}
                onChange={(event) =>
                  setDiagnosticForm({
                    ...diagnosticForm,
                    patientId: event.target.value,
                  })
                }
                className={inputClass}
              >
                <option value="">Choose patient</option>
                {patients.map((patient) => (
                  <option key={patient.id} value={patient.id}>
                    {patient.name} — {patient.id}
                  </option>
                ))}
              </select>
            </Field>

            <div>
              <h3 className="mb-3 text-sm font-bold text-slate-800">
                Select diagnostic tests
              </h3>
              <div className="grid gap-2 sm:grid-cols-2">
                {diagnosticTests.map((test) => (
                  <label
                    key={test}
                    className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 p-3 text-sm text-slate-700 hover:border-blue-300"
                  >
                    <input
                      type="checkbox"
                      checked={diagnosticForm.tests.includes(test)}
                      onChange={() =>
                        toggleTest(diagnosticForm, setDiagnosticForm, test)
                      }
                      className="h-4 w-4 accent-blue-600"
                    />
                    {test}
                  </label>
                ))}
              </div>
            </div>

            <Field label="Priority">
              <select
                value={diagnosticForm.priority}
                onChange={(event) =>
                  setDiagnosticForm({
                    ...diagnosticForm,
                    priority: event.target.value,
                  })
                }
                className={inputClass}
              >
                <option>Normal</option>
                <option>Urgent</option>
                <option>Emergency</option>
              </select>
            </Field>

            <Field label="Clinical notes">
              <textarea
                rows={3}
                value={diagnosticForm.notes}
                onChange={(event) =>
                  setDiagnosticForm({
                    ...diagnosticForm,
                    notes: event.target.value,
                  })
                }
                className={inputClass}
                placeholder="Clinical indication and relevant notes..."
              />
            </Field>

            <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
              <SecondaryButton onClick={() => setModal("")}>
                Cancel
              </SecondaryButton>
              <PrimaryButton type="submit">
                <FiCheck /> Submit diagnostic order
              </PrimaryButton>
            </div>
          </form>
        </Modal>
      )}

      {modal === "profile" && (
        <Modal
          title="Edit doctor profile"
          subtitle="Update your professional details and profile image."
          onClose={() => setModal("")}
          wide
        >
          <form onSubmit={saveProfile} className="space-y-5">
            <div className="flex flex-col items-center gap-3 rounded-xl bg-slate-50 p-5">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile preview"
                  className="h-24 w-24 rounded-2xl object-cover"
                />
              ) : (
                <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-blue-100 text-2xl font-bold text-blue-700">
                  {profileForm.name
                    .split(" ")
                    .map((part) => part[0])
                    .slice(0, 2)
                    .join("")}
                </div>
              )}
              <input
                ref={imageInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={handleImageChange}
                className="hidden"
              />
              <div className="flex gap-2">
                <SecondaryButton
                  onClick={() => imageInputRef.current?.click()}
                >
                  <FiImage /> Upload photo
                </SecondaryButton>
                {profileImage && (
                  <SecondaryButton
                    onClick={() => setProfileImage("")}
                  >
                    Remove
                  </SecondaryButton>
                )}
              </div>
              <p className="text-xs text-slate-400">
                JPG, PNG or WebP · Maximum 2MB
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ["name", "Full name"],
                ["specialty", "Specialty"],
                ["department", "Department"],
                ["qualification", "Qualification"],
                ["experience", "Experience"],
                ["phone", "Phone number"],
                ["email", "Email address"],
                ["fee", "Consultation fee (৳)"],
              ].map(([key, label]) => (
                <Field key={key} label={label} required>
                  <input
                    required
                    value={profileForm[key]}
                    onChange={(event) =>
                      setProfileForm({
                        ...profileForm,
                        [key]: event.target.value,
                      })
                    }
                    className={inputClass}
                  />
                </Field>
              ))}
            </div>

            <Field label="Professional biography">
              <textarea
                rows={4}
                value={profileForm.bio}
                onChange={(event) =>
                  setProfileForm({
                    ...profileForm,
                    bio: event.target.value,
                  })
                }
                className={inputClass}
                placeholder="Write a short professional biography..."
              />
            </Field>

            <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
              <SecondaryButton onClick={() => setModal("")}>
                Cancel
              </SecondaryButton>
              <PrimaryButton type="submit">
                <FiCheck /> Save changes
              </PrimaryButton>
            </div>
          </form>
        </Modal>
      )}

      {toast && (
        <div className="fixed bottom-5 right-5 z-[120] flex max-w-sm items-center gap-3 rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white shadow-xl">
          <FiCheckCircle className="shrink-0 text-emerald-400" />
          {toast}
        </div>
      )}
    </div>
  );
}
