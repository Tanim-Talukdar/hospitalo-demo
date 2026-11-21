
import AdminManagementPage from "@/components/admin/AdminManagementPage";

const config = {
  title: "Medical Records",
  description: "Review patient visits, diagnoses and clinical record summaries.",
  itemName: "Medical Record",
  addLabel: "Add Medical Record",
  tableTitle: "Patient Medical Records",
  searchPlaceholder: "Search patient, ID, doctor or diagnosis...",
  searchKeys: ["recordId", "patient", "patientId", "doctor", "diagnosis"],
  filterField: "status",
  filterLabel: "Record Status",
  filterOptions: ["Draft", "Finalized"],
  stats: [
    { label: "Total Records", type: "count" },
    { label: "Finalized", type: "status", field: "status", value: "Finalized" },
    { label: "Draft Records", type: "status", field: "status", value: "Draft" },
    { label: "Total Visits", type: "sum", field: "visits" },
  ],
  columns: [
    { key: "recordId", label: "Record ID" },
    { key: "patient", label: "Patient" },
    { key: "patientId", label: "Patient ID" },
    { key: "doctor", label: "Attending Doctor" },
    { key: "diagnosis", label: "Diagnosis" },
    { key: "date", label: "Visit Date" },
    { key: "status", label: "Status", status: true },
  ],
  fields: [
    { name: "recordId", label: "Record ID", required: true },
    { name: "patient", label: "Patient Name", required: true },
    { name: "patientId", label: "Patient ID", required: true },
    { name: "doctor", label: "Attending Doctor", required: true },
    { name: "date", label: "Visit Date", type: "date", required: true },
    { name: "diagnosis", label: "Diagnosis", required: true, fullWidth: true },
    { name: "symptoms", label: "Reported Symptoms", type: "textarea", fullWidth: true },
    { name: "examination", label: "Examination Notes", type: "textarea", fullWidth: true },
    { name: "prescription", label: "Prescription", type: "textarea", fullWidth: true },
    { name: "visits", label: "Visit Count", type: "number", required: true },
    {
      name: "status",
      label: "Record Status",
      type: "select",
      options: ["Draft", "Finalized"],
      required: true,
      defaultValue: "Draft",
    },
  ],
  initialRecords: [
    { id: 1, recordId: "MR-2026-001", patient: "Rahim Uddin", patientId: "MC-2026-001", doctor: "Dr. Sarah Ahmed", diagnosis: "Hypertension", date: "2026-11-22", visits: 4, symptoms: "Headache and dizziness.", examination: "Blood pressure checked.", prescription: "Sample prescription for demonstration.", status: "Finalized" },
    { id: 2, recordId: "MR-2026-002", patient: "Nusrat Jahan", patientId: "MC-2026-002", doctor: "Dr. Nusrat Jahan", diagnosis: "Seasonal allergy", date: "2026-11-21", visits: 2, symptoms: "Sneezing and runny nose.", examination: "Sample examination.", prescription: "Sample prescription for demonstration.", status: "Finalized" },
    { id: 3, recordId: "MR-2026-003", patient: "Karim Ahmed", patientId: "MC-2026-003", doctor: "Dr. Imran Chowdhury", diagnosis: "Pending assessment", date: "2026-11-22", visits: 1, symptoms: "Fever and fatigue.", examination: "", prescription: "", status: "Draft" },
    { id: 4, recordId: "MR-2026-004", patient: "Fatema Begum", patientId: "MC-2026-004", doctor: "Dr. Farhana Islam", diagnosis: "Dermatitis", date: "2026-11-20", visits: 3, symptoms: "Skin irritation.", examination: "Sample examination.", prescription: "Sample prescription for demonstration.", status: "Finalized" },
  ],
};

export default function MedicalRecordsPage() {
  return <AdminManagementPage config={config} />;
}
