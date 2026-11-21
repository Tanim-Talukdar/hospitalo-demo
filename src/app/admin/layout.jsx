import AdminShell from "../../components/admin/AdminShell";

export const metadata = {
  title: "Admin Dashboard | MediCare Hospital",
  description: "Hospital management administration portal.",
};

export default function AdminLayout({ children }) {
  return <AdminShell>{children}</AdminShell>;
}