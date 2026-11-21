
import AdminManagementPage from "@/components/admin/AdminManagementPage";

const config = {
  title: "Website Content",
  description: "Manage public website sections, banners and published content.",
  itemName: "Content Item",
  addLabel: "Add Content",
  tableTitle: "Website Content Library",
  searchPlaceholder: "Search content title, page or type...",
  searchKeys: ["title", "page", "type"],
  filterField: "status",
  filterLabel: "Publication Status",
  filterOptions: ["Published", "Draft", "Inactive"],
  stats: [
    { label: "Total Content Items", type: "count" },
    { label: "Published", type: "status", field: "status", value: "Published" },
    { label: "Drafts", type: "status", field: "status", value: "Draft" },
    { label: "Inactive", type: "status", field: "status", value: "Inactive" },
  ],
  columns: [
    { key: "title", label: "Content Title" },
    { key: "type", label: "Content Type" },
    { key: "page", label: "Website Page" },
    { key: "updated", label: "Last Updated" },
    { key: "status", label: "Status", status: true },
  ],
  fields: [
    { name: "title", label: "Content Title", required: true },
    {
      name: "type",
      label: "Content Type",
      type: "select",
      options: ["Banner", "Text Section", "Health Package", "Announcement", "Image", "Doctor Profile"],
      required: true,
    },
    {
      name: "page",
      label: "Website Page",
      type: "select",
      options: ["Home", "About", "Doctors", "Departments", "Health Packages", "Gallery", "Contact"],
      required: true,
    },
    { name: "updated", label: "Last Updated", type: "date", required: true },
    { name: "description", label: "Content / Description", type: "textarea", fullWidth: true },
    { name: "imageUrl", label: "Image URL", fullWidth: true },
    {
      name: "status",
      label: "Publication Status",
      type: "select",
      options: ["Published", "Draft", "Inactive"],
      required: true,
      defaultValue: "Draft",
    },
  ],
  initialRecords: [
    { id: 1, title: "Homepage Hero Banner", type: "Banner", page: "Home", updated: "2026-11-20", description: "Main homepage hero content.", imageUrl: "/images/hero.jpg", status: "Published" },
    { id: 2, title: "About Our Hospital", type: "Text Section", page: "About", updated: "2026-11-19", description: "Hospital introduction and overview.", imageUrl: "", status: "Published" },
    { id: 3, title: "Cardiac Care Package", type: "Health Package", page: "Health Packages", updated: "2026-11-18", description: "Sample package description.", imageUrl: "", status: "Published" },
    { id: 4, title: "Winter Health Announcement", type: "Announcement", page: "Home", updated: "2026-11-17", description: "Seasonal announcement draft.", imageUrl: "", status: "Draft" },
    { id: 5, title: "Hospital Gallery Cover", type: "Image", page: "Gallery", updated: "2026-11-16", description: "Gallery cover image.", imageUrl: "/images/gallery-cover.jpg", status: "Inactive" },
  ],
};

export default function WebsiteContentPage() {
  return <AdminManagementPage config={config} />;
}
