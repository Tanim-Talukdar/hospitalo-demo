
import AdminManagementPage from "@/components/admin/AdminManagementPage";

const config = {
  title: "Departments",
  description: "Manage hospital departments and their assigned doctors.",
  itemName: "Department",
  addLabel: "Add Department",
  tableTitle: "Department Directory",
  searchPlaceholder: "Search department or head of department...",
  searchKeys: ["name", "head", "location"],
  filterField: "status",
  filterLabel: "Statuses",
  filterOptions: ["Active", "Inactive"],
  stats: [
    { label: "Total Departments", type: "count" },
    { label: "Active Departments", type: "status", field: "status", value: "Active" },
    { label: "Inactive Departments", type: "status", field: "status", value: "Inactive" },
    { label: "Total Beds", type: "sum", field: "beds" },
  ],
  columns: [
    { key: "name", label: "Department" },
    { key: "head", label: "Department Head" },
    { key: "doctors", label: "Doctors" },
    { key: "beds", label: "Beds" },
    { key: "location", label: "Location" },
    { key: "status", label: "Status", status: true },
  ],
  fields: [
    { name: "name", label: "Department Name", required: true },
    { name: "head", label: "Head of Department", required: true },
    { name: "doctors", label: "Assigned Doctors", type: "number", required: true },
    { name: "beds", label: "Available Beds", type: "number", required: true },
    { name: "location", label: "Location / Floor", required: true },
    {
      name: "status",
      label: "Department Status",
      type: "select",
      options: ["Active", "Inactive"],
      required: true,
      defaultValue: "Active",
    },
    { name: "description", label: "Description", type: "textarea", fullWidth: true },
  ],
  initialRecords: [
    { id: 1, name: "Cardiology", head: "Dr. Sarah Ahmed", doctors: 5, beds: 24, location: "Block A, Floor 2", status: "Active", description: "Heart and cardiovascular care." },
    { id: 2, name: "Neurology", head: "Dr. Mahmud Rahman", doctors: 4, beds: 18, location: "Block A, Floor 3", status: "Active", description: "Brain and nervous system care." },
    { id: 3, name: "Pediatrics", head: "Dr. Nusrat Jahan", doctors: 6, beds: 30, location: "Block B, Floor 1", status: "Active", description: "Medical care for infants and children." },
    { id: 4, name: "Orthopedics", head: "Dr. Tanvir Hasan", doctors: 3, beds: 20, location: "Block B, Floor 2", status: "Active", description: "Bone, joint and musculoskeletal care." },
    { id: 5, name: "Dermatology", head: "Dr. Farhana Islam", doctors: 2, beds: 0, location: "Block A, Floor 1", status: "Inactive", description: "Skin and hair care." },
    { id: 6, name: "General Medicine", head: "Dr. Imran Chowdhury", doctors: 8, beds: 35, location: "Block C, Floor 1", status: "Active", description: "General medical consultation and treatment." },
  ],
};

export default function DepartmentsPage() {
  return <AdminManagementPage config={config} />;
}
