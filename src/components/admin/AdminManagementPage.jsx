
"use client";

import { useMemo, useState } from "react";
import {
  FiPlus,
  FiSearch,
  FiX,
  FiEdit2,
  FiTrash2,
  FiActivity,
  FiUsers,
  FiCheckCircle,
  FiClock,
} from "react-icons/fi";

function StatIcon({ index }) {
  const icons = [FiUsers, FiActivity, FiCheckCircle, FiClock];
  const Icon = icons[index % icons.length];

  return (
    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
      <Icon size={20} />
    </div>
  );
}

function getStatValue(stat, records) {
  if (stat.type === "count") return records.length;

  if (stat.type === "unique") {
    return new Set(records.map((item) => item[stat.field]).filter(Boolean)).size;
  }

  if (stat.type === "status") {
    return records.filter((item) => item[stat.field] === stat.value).length;
  }

  if (stat.type === "sum") {
    return records.reduce(
      (total, item) => total + Number(item[stat.field] || 0),
      0
    );
  }

  return stat.value ?? 0;
}

function Modal({ title, onClose, children }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="my-auto w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
          <h2 className="text-lg font-bold text-slate-900">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close"
          >
            <FiX size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function StatusBadge({ value }) {
  const normalized = String(value || "").toLowerCase();

  let style = "bg-slate-100 text-slate-600";

  if (
    ["active", "available", "paid", "completed", "published", "verified"].includes(
      normalized
    )
  ) {
    style = "bg-emerald-50 text-emerald-700";
  } else if (
    ["pending", "processing", "scheduled", "draft", "waiting"].includes(
      normalized
    )
  ) {
    style = "bg-amber-50 text-amber-700";
  } else if (
    ["cancelled", "canceled", "inactive", "unpaid", "rejected"].includes(
      normalized
    )
  ) {
    style = "bg-red-50 text-red-700";
  }

  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${style}`}>
      {value || "—"}
    </span>
  );
}

export default function AdminManagementPage({ config }) {
  const [records, setRecords] = useState(config.initialRecords || []);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [modal, setModal] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [form, setForm] = useState({});

  const filteredRecords = useMemo(() => {
    const query = search.trim().toLowerCase();

    return records.filter((record) => {
      const matchesSearch =
        !query ||
        config.searchKeys.some((key) =>
          String(record[key] ?? "").toLowerCase().includes(query)
        );

      const matchesFilter =
        filter === "All" ||
        !config.filterField ||
        record[config.filterField] === filter;

      return matchesSearch && matchesFilter;
    });
  }, [records, search, filter, config]);

  function openCreate() {
    setEditingId(null);
    setForm(
      Object.fromEntries(
        config.fields.map((field) => [
          field.name,
          field.defaultValue ?? "",
        ])
      )
    );
    setModal("form");
  }

  function openEdit(record) {
    setEditingId(record.id);
    setForm({ ...record });
    setModal("form");
  }

  function updateField(name, value) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (editingId !== null) {
      setRecords((current) =>
        current.map((record) =>
          record.id === editingId ? { ...record, ...form } : record
        )
      );
    } else {
      setRecords((current) => [
        { ...form, id: Date.now() },
        ...current,
      ]);
    }

    setModal("");
  }

  function confirmDelete() {
    setRecords((current) =>
      current.filter((record) => record.id !== deleteId)
    );
    setDeleteId(null);
  }

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
            Hospital Management
          </p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
            {config.title}
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {config.description}
          </p>
        </div>

        {config.addLabel && (
          <button
            type="button"
            onClick={openCreate}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
          >
            <FiPlus size={17} />
            {config.addLabel}
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {config.stats.map((stat, index) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  {stat.label}
                </p>
                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {stat.prefix || ""}
                  {getStatValue(stat, records).toLocaleString("en-BD")}
                </p>
              </div>
              <StatIcon index={index} />
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="grid gap-3 md:grid-cols-[1fr_220px]">
          <div className="relative">
            <FiSearch
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={config.searchPlaceholder || "Search records..."}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
            />
          </div>

          {config.filterOptions?.length > 0 && (
            <select
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none focus:border-blue-400"
            >
              <option value="All">All {config.filterLabel || "Statuses"}</option>
              {config.filterOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <h2 className="font-bold text-slate-900">{config.tableTitle}</h2>
          <span className="text-sm text-slate-500">
            {filteredRecords.length} records
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left">
            <thead className="bg-slate-50">
              <tr>
                {config.columns.map((column) => (
                  <th
                    key={column.key}
                    className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500"
                  >
                    {column.label}
                  </th>
                ))}
                <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wide text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredRecords.map((record) => (
                <tr key={record.id} className="transition hover:bg-slate-50/70">
                  {config.columns.map((column) => (
                    <td key={column.key} className="px-5 py-4 text-sm">
                      {column.status ? (
                        <StatusBadge value={record[column.key]} />
                      ) : (
                        <span className="font-medium text-slate-700">
                          {column.prefix || ""}
                          {record[column.key] ?? "—"}
                          {column.suffix || ""}
                        </span>
                      )}
                    </td>
                  ))}

                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedRecord(record);
                          setModal("details");
                        }}
                        className="rounded-lg px-3 py-2 text-xs font-semibold text-blue-600 hover:bg-blue-50"
                      >
                        View
                      </button>
                      <button
                        type="button"
                        onClick={() => openEdit(record)}
                        className="rounded-lg p-2 text-slate-500 hover:bg-blue-50 hover:text-blue-600"
                        aria-label="Edit record"
                      >
                        <FiEdit2 size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteId(record.id)}
                        className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600"
                        aria-label="Delete record"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredRecords.length === 0 && (
                <tr>
                  <td
                    colSpan={config.columns.length + 1}
                    className="px-5 py-14 text-center text-sm text-slate-500"
                  >
                    No records found. Try changing your search or filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {modal === "form" && (
        <Modal
          title={editingId !== null ? `Edit ${config.itemName}` : config.addLabel}
          onClose={() => setModal("")}
        >
          <form onSubmit={handleSubmit}>
            <div className="grid max-h-[65vh] gap-4 overflow-y-auto p-6 sm:grid-cols-2">
              {config.fields.map((field) => (
                <div
                  key={field.name}
                  className={field.fullWidth ? "sm:col-span-2" : ""}
                >
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    {field.label}
                    {field.required && " *"}
                  </label>

                  {field.type === "select" ? (
                    <select
                      required={field.required}
                      value={form[field.name] ?? ""}
                      onChange={(event) =>
                        updateField(field.name, event.target.value)
                      }
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-400"
                    >
                      <option value="">Select {field.label.toLowerCase()}</option>
                      {field.options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : field.type === "textarea" ? (
                    <textarea
                      required={field.required}
                      rows={3}
                      value={form[field.name] ?? ""}
                      onChange={(event) =>
                        updateField(field.name, event.target.value)
                      }
                      placeholder={field.placeholder || ""}
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-400"
                    />
                  ) : (
                    <input
                      required={field.required}
                      type={field.type || "text"}
                      min={field.type === "number" ? "0" : undefined}
                      value={form[field.name] ?? ""}
                      onChange={(event) =>
                        updateField(field.name, event.target.value)
                      }
                      placeholder={field.placeholder || ""}
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-400"
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50 px-6 py-4 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setModal("")}
                className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
              >
                {editingId !== null ? "Save Changes" : "Create"}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {modal === "details" && selectedRecord && (
        <Modal title={`${config.itemName} Details`} onClose={() => setModal("")}>
          <div className="grid gap-4 p-6 sm:grid-cols-2">
            {config.fields.map((field) => (
              <div
                key={field.name}
                className={`rounded-xl bg-slate-50 p-4 ${
                  field.fullWidth ? "sm:col-span-2" : ""
                }`}
              >
                <p className="text-xs font-medium text-slate-500">
                  {field.label}
                </p>
                <p className="mt-1 break-words text-sm font-semibold text-slate-800">
                  {selectedRecord[field.name] || "—"}
                </p>
              </div>
            ))}
          </div>
        </Modal>
      )}

      {deleteId !== null && (
        <Modal title="Confirm Delete" onClose={() => setDeleteId(null)}>
          <div className="p-6">
            <p className="text-sm leading-6 text-slate-600">
              Are you sure you want to delete this {config.itemName.toLowerCase()}?
              This change only affects the current demo data.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteId(null)}
                className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
