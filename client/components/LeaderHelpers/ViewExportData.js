import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

import { fetchAllSessions } from "../../store/allSessions";
import { fetchUsers } from "../../store/users";
import { formatDateNew } from "../utils/formatDate";
import { useNavigate } from "react-router-dom";

const ViewExportData = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sessions = useSelector((state) => state.sessions.allSessions) || [];
  const users = useSelector((state) => state.users.users) || [];
  const loading = useSelector((state) => state.sessions.loading);

  // ----------------------------
  // RAW FILTER INPUT STATE
  // ----------------------------
  const [draftFilters, setDraftFilters] = useState({
    id: "",
    station: "",
    level: "",
    technician: "",
    startDate: "",
    endDate: "",
  });

  // ----------------------------
  // ACTIVE FILTERS (APPLIED)
  // ----------------------------
  const [activeFilters, setActiveFilters] = useState(draftFilters);

  useEffect(() => {
    dispatch(fetchAllSessions());
    dispatch(fetchUsers());
  }, [dispatch]);

  // ----------------------------
  // DATA (IMPORTANT: KEEP RAW DATES TOO)
  // ----------------------------
  const data = useMemo(() => {
    return sessions.map((s) => {
      const user = users.find((u) => String(u.id) === String(s.userId));

      return {
        id: s.id,
        station: s.station,
        level: s.level,

        // formatted only for display
        startedRunAtLabel: formatDateNew(s.startedRunAt),
        endedRunAtLabel: formatDateNew(s.endedRunAt),

        // raw for filtering
        startedRunAt: s.startedRunAt,
        endedRunAt: s.endedRunAt,

        unitsCount: s.unitsCount,
        technician: user ? user.username : s.userId,
      };
    });
  }, [sessions, users]);

  // ----------------------------
  // FILTERED DATA (APPLIED ONLY)
  // ----------------------------
  const filteredData = useMemo(() => {
    return data.filter((row) => {
      const matchText = (key, value) =>
        value
          ? String(row[key]).toLowerCase().includes(value.toLowerCase())
          : true;

      const rowStart = new Date(row.startedRunAt);
      const rowEnd = new Date(row.endedRunAt);

      const startOk = activeFilters.startDate
        ? rowStart >= new Date(activeFilters.startDate)
        : true;

      const endOk = activeFilters.endDate
        ? rowEnd <= new Date(activeFilters.endDate + "T23:59:59")
        : true;

      return (
        matchText("id", activeFilters.id) &&
        matchText("station", activeFilters.station) &&
        matchText("level", activeFilters.level) &&
        matchText("technician", activeFilters.technician) &&
        startOk &&
        endOk
      );
    });
  }, [data, activeFilters]);

  // ----------------------------
  // APPLY FILTERS
  // ----------------------------
  const applyFilters = () => {
    setActiveFilters(draftFilters);
  };

  const clearFilters = () => {
    const empty = {
      id: "",
      station: "",
      level: "",
      technician: "",
      startDate: "",
      endDate: "",
    };
    setDraftFilters(empty);
    setActiveFilters(empty);
  };

  // ----------------------------
  // TABLE
  // ----------------------------
  const columns = useMemo(
    () => [
      { accessorKey: "id", header: "Session ID" },
      { accessorKey: "station", header: "Station" },
      { accessorKey: "level", header: "Level" },

      // display formatted
      { accessorKey: "startedRunAtLabel", header: "Start Time" },
      { accessorKey: "endedRunAtLabel", header: "End Time" },

      { accessorKey: "unitsCount", header: "Units" },
      { accessorKey: "technician", header: "Technician" },
    ],
    []
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // ----------------------------
  // EXPORT
  // ----------------------------
  const escapeCSV = (value) => {
    if (value === null || value === undefined) return "";
    return `"${String(value).replace(/"/g, '""')}"`;
  };

  const exportCSV = () => {
    const rows = table.getRowModel().rows.map((row) => row.original);

    const csvRows = [
      ["Session ID", "Station", "Level", "Start", "End", "Units", "Technician"],
      ...rows.map((r) => [
        r.id,
        String(r.station).replace(/-/g, "_"),
        r.level,
        r.startedRunAtLabel,
        r.endedRunAtLabel,
        r.unitsCount,
        r.technician,
      ]),
    ];

    const csv = csvRows.map((row) => row.map(escapeCSV).join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "sessions.csv";
    a.click();

    URL.revokeObjectURL(url);
  };

  if (loading) return "Loading...";

  return (
    <div style={{ padding: "20px" }}>
      View / Export Data

      {/* FILTERS */}
      <div style={{ marginBottom: "10px" }}>
        <input
          placeholder="Session Id"
          value={draftFilters.id}
          onChange={(e) =>
            setDraftFilters((p) => ({ ...p, id: e.target.value }))
          }
        />

        <input
          placeholder="Station"
          value={draftFilters.station}
          onChange={(e) =>
            setDraftFilters((p) => ({ ...p, station: e.target.value }))
          }
        />

        <input
          placeholder="Level"
          value={draftFilters.level}
          onChange={(e) =>
            setDraftFilters((p) => ({ ...p, level: e.target.value }))
          }
        />

        <input
          placeholder="Technician"
          value={draftFilters.technician}
          onChange={(e) =>
            setDraftFilters((p) => ({ ...p, technician: e.target.value }))
          }
        />

        <input
          type="date"
          value={draftFilters.startDate}
          onChange={(e) =>
            setDraftFilters((p) => ({ ...p, startDate: e.target.value }))
          }
        />

        <input
          type="date"
          value={draftFilters.endDate}
          onChange={(e) =>
            setDraftFilters((p) => ({ ...p, endDate: e.target.value }))
          }
        />

        {/* ✅ APPLY BUTTON BACK */}
        <button onClick={applyFilters} style={{ marginLeft: 8 }}>
          Apply
        </button>

        <button onClick={clearFilters} style={{ marginLeft: 8 }}>
          Clear
        </button>
      </div>

      {/* EXPORT */}
      <button onClick={exportCSV} style={{ marginBottom: 10 }}>
        Export CSV
      </button>

      {/* TABLE */}
      <table border="1" cellPadding="8" style={{ width: "100%" }}>
        <thead>
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id}>
              {hg.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(
                    cell.column.columnDef.cell ??
                      cell.column.columnDef.accessorKey,
                    cell.getContext()
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <button className="btn btn-red" onClick={() => navigate("/home")}>
        Go Back
      </button>
    </div>
  );
};

export default ViewExportData;