
import AdminManagementPage from "@/components/admin/AdminManagementPage";

const config = {
  title: "Billing & Payments",
  description: "Manage patient invoices, consultation charges and payment records.",
  itemName: "Invoice",
  addLabel: "Create Invoice",
  tableTitle: "Invoice Register",
  searchPlaceholder: "Search invoice, patient or patient ID...",
  searchKeys: ["invoiceId", "patient", "patientId", "service"],
  filterField: "status",
  filterLabel: "Payment Status",
  filterOptions: ["Paid", "Pending", "Unpaid", "Cancelled"],
  stats: [
    { label: "Total Invoices", type: "count" },
    { label: "Paid Invoices", type: "status", field: "status", value: "Paid" },
    { label: "Pending Payments", type: "status", field: "status", value: "Pending" },
    { label: "Invoice Value", type: "sum", field: "amount", prefix: "৳" },
  ],
  columns: [
    { key: "invoiceId", label: "Invoice ID" },
    { key: "patient", label: "Patient" },
    { key: "service", label: "Service" },
    { key: "date", label: "Invoice Date" },
    { key: "amount", label: "Amount", prefix: "৳" },
    { key: "method", label: "Payment Method" },
    { key: "status", label: "Status", status: true },
  ],
  fields: [
    { name: "invoiceId", label: "Invoice ID", required: true },
    { name: "patient", label: "Patient Name", required: true },
    { name: "patientId", label: "Patient ID", required: true },
    { name: "service", label: "Service / Description", required: true },
    { name: "date", label: "Invoice Date", type: "date", required: true },
    { name: "amount", label: "Total Amount (৳)", type: "number", required: true },
    {
      name: "method",
      label: "Payment Method",
      type: "select",
      options: ["Cash", "Card", "Mobile Banking", "Bank Transfer"],
      required: true,
    },
    {
      name: "status",
      label: "Payment Status",
      type: "select",
      options: ["Paid", "Pending", "Unpaid", "Cancelled"],
      required: true,
      defaultValue: "Pending",
    },
    { name: "notes", label: "Notes", type: "textarea", fullWidth: true },
  ],
  initialRecords: [
    { id: 1, invoiceId: "INV-2026-001", patient: "Rahim Uddin", patientId: "MC-2026-001", service: "Cardiology Consultation", date: "2026-11-22", amount: 1200, method: "Cash", status: "Paid", notes: "" },
    { id: 2, invoiceId: "INV-2026-002", patient: "Nusrat Jahan", patientId: "MC-2026-002", service: "Laboratory Tests", date: "2026-11-22", amount: 1800, method: "Mobile Banking", status: "Paid", notes: "" },
    { id: 3, invoiceId: "INV-2026-003", patient: "Karim Ahmed", patientId: "MC-2026-003", service: "General Consultation", date: "2026-11-22", amount: 800, method: "Cash", status: "Pending", notes: "Awaiting payment." },
    { id: 4, invoiceId: "INV-2026-004", patient: "Fatema Begum", patientId: "MC-2026-004", service: "Diagnostic Services", date: "2026-11-21", amount: 2500, method: "Card", status: "Paid", notes: "" },
    { id: 5, invoiceId: "INV-2026-005", patient: "Hasan Mahmud", patientId: "MC-2026-005", service: "Orthopedic Consultation", date: "2026-11-21", amount: 1300, method: "Cash", status: "Unpaid", notes: "" },
  ],
};

export default function BillingPage() {
  return <AdminManagementPage config={config} />;
}
