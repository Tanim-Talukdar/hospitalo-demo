
import AdminManagementPage from "@/components/admin/AdminManagementPage";

const config = {
  title: "Laboratory",
  description: "Manage diagnostic test orders, technicians and laboratory results.",
  itemName: "Lab Order",
  addLabel: "Create Lab Order",
  tableTitle: "Laboratory Test Orders",
  searchPlaceholder: "Search patient, test or order ID...",
  searchKeys: ["orderId", "patient", "test", "technician"],
  filterField: "status",
  filterLabel: "Statuses",
  filterOptions: ["Pending", "Processing", "Completed", "Cancelled"],
  stats: [
    { label: "Total Orders", type: "count" },
    { label: "Pending", type: "status", field: "status", value: "Pending" },
    { label: "Processing", type: "status", field: "status", value: "Processing" },
    { label: "Completed", type: "status", field: "status", value: "Completed" },
  ],
  columns: [
    { key: "orderId", label: "Order ID" },
    { key: "patient", label: "Patient" },
    { key: "test", label: "Test" },
    { key: "technician", label: "Technician" },
    { key: "date", label: "Order Date" },
    { key: "status", label: "Status", status: true },
  ],
  fields: [
    { name: "orderId", label: "Order ID", required: true },
    { name: "patient", label: "Patient Name", required: true },
    { name: "patientId", label: "Patient ID", required: true },
    {
      name: "test",
      label: "Diagnostic Test",
      type: "select",
      options: ["CBC", "Blood Sugar", "Lipid Profile", "Liver Function Test", "Kidney Function Test", "Urine R/E", "X-Ray", "ECG", "Ultrasound", "MRI"],
      required: true,
    },
    { name: "technician", label: "Assigned Technician", required: true },
    { name: "date", label: "Order Date", type: "date", required: true },
    { name: "amount", label: "Test Price (৳)", type: "number", required: true },
    {
      name: "status",
      label: "Test Status",
      type: "select",
      options: ["Pending", "Processing", "Completed", "Cancelled"],
      required: true,
      defaultValue: "Pending",
    },
    { name: "result", label: "Result / Notes", type: "textarea", fullWidth: true },
  ],
  initialRecords: [
    { id: 1, orderId: "LAB-2026-001", patient: "Rahim Uddin", patientId: "MC-2026-001", test: "CBC", technician: "Sadia Khan", date: "2026-11-22", amount: 600, status: "Completed", result: "Sample result recorded for demonstration." },
    { id: 2, orderId: "LAB-2026-002", patient: "Nusrat Jahan", patientId: "MC-2026-002", test: "Lipid Profile", technician: "Sadia Khan", date: "2026-11-22", amount: 1200, status: "Processing", result: "" },
    { id: 3, orderId: "LAB-2026-003", patient: "Karim Ahmed", patientId: "MC-2026-003", test: "Blood Sugar", technician: "Imran Hossain", date: "2026-11-22", amount: 300, status: "Pending", result: "" },
    { id: 4, orderId: "LAB-2026-004", patient: "Fatema Begum", patientId: "MC-2026-004", test: "ECG", technician: "Sadia Khan", date: "2026-11-21", amount: 500, status: "Completed", result: "Sample ECG result for demonstration." },
    { id: 5, orderId: "LAB-2026-005", patient: "Hasan Mahmud", patientId: "MC-2026-005", test: "X-Ray", technician: "Imran Hossain", date: "2026-11-21", amount: 800, status: "Pending", result: "" },
  ],
};

export default function LaboratoryPage() {
  return <AdminManagementPage config={config} />;
}
