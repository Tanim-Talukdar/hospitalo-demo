
import AdminManagementPage from "@/components/admin/AdminManagementPage";

const config = {
  title: "Users & Permissions",
  description: "Manage hospital staff accounts, assigned roles and access status.",
  itemName: "User",
  addLabel: "Add Staff User",
  tableTitle: "Staff Accounts",
  searchPlaceholder: "Search staff name, email or role...",
  searchKeys: ["name", "email", "role", "department"],
  filterField: "status",
  filterLabel: "Account Status",
  filterOptions: ["Active", "Inactive"],
  stats: [
    { label: "Total Users", type: "count" },
    { label: "Active Users", type: "status", field: "status", value: "Active" },
    { label: "Inactive Users", type: "status", field: "status", value: "Inactive" },
    { label: "Departments", type: "countDepartments", field: "department" },
  ],
  columns: [
    { key: "name", label: "Staff Member" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
    { key: "department", label: "Department" },
    { key: "status", label: "Status", status: true },
  ],
  fields: [
    { name: "name", label: "Full Name", required: true },
    { name: "email", label: "Email Address", type: "email", required: true },
    {
      name: "role",
      label: "Staff Role",
      type: "select",
      options: ["Super Admin", "Hospital Manager", "Receptionist", "Doctor", "Lab Technician", "Cashier", "Content Manager"],
      required: true,
    },
    {
      name: "department",
      label: "Department",
      type: "select",
      options: ["Administration", "Reception", "Cardiology", "Neurology", "Pediatrics", "Laboratory", "Accounts", "Marketing"],
      required: true,
    },
    { name: "phone", label: "Phone Number", required: true },
    {
      name: "status",
      label: "Account Status",
      type: "select",
      options: ["Active", "Inactive"],
      required: true,
      defaultValue: "Active",
    },
  ],
  initialRecords: [
    { id: 1, name: "Admin User", email: "admin@medicare.com", role: "Super Admin", department: "Administration", phone: "+880 1700-000001", status: "Active" },
    { id: 2, name: "Reception Team", email: "reception@medicare.com", role: "Receptionist", department: "Reception", phone: "+880 1700-000002", status: "Active" },
    { id: 3, name: "Dr. Sarah Ahmed", email: "sarah@medicare.com", role: "Doctor", department: "Cardiology", phone: "+880 1712-345678", status: "Active" },
    { id: 4, name: "Sadia Khan", email: "sadia@medicare.com", role: "Lab Technician", department: "Laboratory", phone: "+880 1700-000004", status: "Active" },
    { id: 5, name: "Accounts Team", email: "accounts@medicare.com", role: "Cashier", department: "Accounts", phone: "+880 1700-000005", status: "Inactive" },
    { id: 6, name: "Content Manager", email: "content@medicare.com", role: "Content Manager", department: "Marketing", phone: "+880 1700-000006", status: "Active" },
  ],
};

export default function UsersPage() {
  return <AdminManagementPage config={config} />;
}
