/* eslint-disable */
"use client";
import { useEffect, useState, useCallback } from "react";
import EditModal from "./EditModal";

const ALL_EVENTS = ["all", "technoseek", "typemaster", "clash_royale", "coding_relay", "dsa_smackdown", "pitch_perfect"];
const EVENT_COLORS: Record<string, string> = {
  technoseek: "#6366f1", typemaster: "#8b5cf6", clash_royale: "#ec4899",
  coding_relay: "#f59e0b", dsa_smackdown: "#10b981", pitch_perfect: "#3b82f6",
};
const PAGE_SIZE = 15;

export interface Member { name?: string; usn?: string; email?: string; phone?: string; semester?: number; branch?: string }
export interface Participant {
  _id: string;
  event: string;
  team_name: string;
  member1: Member;
  member2?: Member;
  member3?: Member;
  registeredAt: string;
}

export default function ParticipantsClient() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState("all");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<Participant | null>(null);
  const [editingParticipant, setEditingParticipant] = useState<Participant | null>(null);
  const [exporting, setExporting] = useState(false);

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 350);
    return () => clearTimeout(t);
  }, [search]);

  const fetchParticipants = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (event !== "all") params.set("event", event);
    if (debouncedSearch) params.set("search", debouncedSearch);
    const res = await fetch(`/api/admin/participants?${params}`);
    const data = await res.json();
    setPage(1);
    setParticipants(data.participants ?? []);
    setLoading(false);
  }, [event, debouncedSearch]);

  useEffect(() => { fetchParticipants(); }, [fetchParticipants]);

  async function handleDelete(p: Participant) {
    setDeleting(p._id);
    setConfirmDelete(null);
    await fetch(`/api/admin/participants/${p._id}`, { method: "DELETE" });
    setParticipants((prev) => prev.filter((x) => x._id !== p._id));
    setDeleting(null);
  }

  async function handleExport() {
    setExporting(true);
    const params = event !== "all" ? `?event=${event}` : "";
    const res = await fetch(`/api/admin/export${params}`);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = event !== "all" ? `catalysis_${event}.csv` : "catalysis_all.csv";
    a.click();
    URL.revokeObjectURL(url);
    setExporting(false);
  }

  const totalPages = Math.max(1, Math.ceil(participants.length / PAGE_SIZE));
  const paged = participants.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div>
      {}
      <div style={{ marginBottom: 28, display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ color: "#f1f5f9", fontSize: 28, fontWeight: 700, margin: "0 0 6px", letterSpacing: "-0.5px" }}>
            Participants
          </h1>
          <p style={{ color: "#475569", fontSize: 14, margin: 0 }}>
            {loading ? "Loading…" : `${participants.length} registration${participants.length !== 1 ? "s" : ""} found`}
          </p>
        </div>
        <button
          onClick={handleExport}
          disabled={exporting || loading}
          style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "10px 18px", borderRadius: 10,
            background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.3)",
            color: "#a5b4fc", fontSize: 13, fontWeight: 600, cursor: exporting ? "wait" : "pointer",
            transition: "all 0.15s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(99,102,241,0.25)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(99,102,241,0.15)"; }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
          {exporting ? "Exporting…" : "Export CSV"}
        </button>
      </div>

      {}
      <div style={{
        display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap",
        background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 14, padding: 16,
      }}>
        {}
        <div style={{ flex: 1, minWidth: 200, position: "relative" }}>
          <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#475569" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
          </span>
          <input
            id="participants-search"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, USN, email or team…"
            style={{
              width: "100%", padding: "10px 12px 10px 38px",
              background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 10, color: "#f1f5f9", fontSize: 14, outline: "none",
              boxSizing: "border-box",
            }}
          />
        </div>
        {}
        <select
          id="participants-event-filter"
          value={event}
          onChange={(e) => setEvent(e.target.value)}
          style={{
            padding: "10px 14px",
            background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 10, color: "#f1f5f9", fontSize: 14, outline: "none", cursor: "pointer",
          }}
        >
          {ALL_EVENTS.map((e) => (
            <option key={e} value={e} style={{ background: "#13182e" }}>
              {e === "all" ? "All Events" : e.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
            </option>
          ))}
        </select>
      </div>

      {}
      <div style={{
        background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 16, overflow: "hidden",
      }}>
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", padding: 60 }}>
            <div style={spinStyle} />
          </div>
        ) : paged.length === 0 ? (
          <div style={{ textAlign: "center", padding: 60, color: "#475569" }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ opacity: 0.3, marginBottom: 12 }}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /></svg>
            <p style={{ margin: 0, color: "#334155" }}>No participants found</p>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  {["Name", "USN", "Event", "Team", "Registered At", ""].map((h, i) => (
                    <th key={i} style={{
                      textAlign: "left", color: "#334155",
                      fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.8px",
                      padding: "14px 16px",
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paged.map((p) => (
                  <>
                    <tr
                      key={p._id}
                      onClick={() => setExpanded(expanded === p._id ? null : p._id)}
                      style={{
                        borderBottom: "1px solid rgba(255,255,255,0.04)",
                        cursor: "pointer", transition: "background 0.15s",
                        background: expanded === p._id ? "rgba(99,102,241,0.06)" : "transparent",
                      }}
                      onMouseEnter={(e) => { if (expanded !== p._id) e.currentTarget.style.background = "rgba(255,255,255,0.02)"; }}
                      onMouseLeave={(e) => { if (expanded !== p._id) e.currentTarget.style.background = "transparent"; }}
                    >
                      <td style={tdStyle}><span style={{ color: "#e2e8f0", fontWeight: 500 }}>{p.member1?.name || "—"}</span></td>
                      <td style={tdStyle}><code style={{ color: "#94a3b8", fontSize: 12, background: "rgba(255,255,255,0.05)", padding: "2px 6px", borderRadius: 4 }}>{p.member1?.usn || "—"}</code></td>
                      <td style={tdStyle}>
                        <span style={{
                          padding: "3px 8px", borderRadius: 6,
                          background: `${EVENT_COLORS[p.event] ?? "#6366f1"}22`,
                          color: EVENT_COLORS[p.event] ?? "#6366f1",
                          fontSize: 11, fontWeight: 600, textTransform: "capitalize", whiteSpace: "nowrap",
                        }}>
                          {p.event.replace(/_/g, " ")}
                        </span>
                      </td>
                      <td style={tdStyle}><span style={{ color: "#64748b" }}>{p.team_name || "—"}</span></td>
                      <td style={tdStyle}>
                        <span style={{ color: "#475569", whiteSpace: "nowrap" }}>
                          {new Date(p.registeredAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                          {" "}
                          <span style={{ color: "#334155", fontSize: 11 }}>
                            {new Date(p.registeredAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                          </span>
                        </span>
                      </td>
                      <td style={{ ...tdStyle, textAlign: "right" }}>
                        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                          <button
                            onClick={(e) => { e.stopPropagation(); setEditingParticipant(p); }}
                            style={{
                              padding: "6px 10px", borderRadius: 8,
                              background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)",
                              color: "#818cf8", cursor: "pointer", fontSize: 12, transition: "all 0.15s",
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(99,102,241,0.2)"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(99,102,241,0.1)"; }}
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); setConfirmDelete(p); }}
                            disabled={deleting === p._id}
                            style={{
                              padding: "6px 10px", borderRadius: 8,
                              background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)",
                              color: "#f87171", cursor: "pointer", fontSize: 12, transition: "all 0.15s",
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(239,68,68,0.2)"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(239,68,68,0.1)"; }}
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" /><path d="M10 11v6" /><path d="M14 11v6" /></svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                    {}
                    {expanded === p._id && (
                      <tr key={`${p._id}-details`} style={{ background: "rgba(99,102,241,0.04)" }}>
                        <td colSpan={6} style={{ padding: "16px 20px" }}>
                          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
                            {[p.member1, p.member2, p.member3].map((m, i) => {
                              if (!m || !m.name) return null;
                              return (
                                <div key={i} style={{
                                  background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)",
                                  borderRadius: 10, padding: "12px 16px", minWidth: 180,
                                }}>
                                  <p style={{ color: "#6366f1", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.8px", margin: "0 0 10px" }}>
                                    Member {i + 1} {i === 0 ? "(Lead)" : ""}
                                  </p>
                                  {([["Name", m.name], ["USN", m.usn], ["Email", m.email], ["Phone", m.phone], ["Semester", m.semester], ["Branch", m.branch]] as [string, unknown][]).filter(([, v]) => v).map(([k, v]) => (
                                    <p key={k} style={{ margin: "0 0 4px", fontSize: 12 }}>
                                      <span style={{ color: "#475569" }}>{k}: </span>
                                      <span style={{ color: "#94a3b8" }}>{String(v)}</span>
                                    </p>
                                  ))}
                                </div>
                              );
                            })}
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {}
        {!loading && participants.length > PAGE_SIZE && (
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "14px 20px", borderTop: "1px solid rgba(255,255,255,0.06)",
          }}>
            <span style={{ color: "#475569", fontSize: 13 }}>
              Page {page} of {totalPages} ({participants.length} total)
            </span>
            <div style={{ display: "flex", gap: 8 }}>
              {[["← Prev", page > 1, () => setPage(page - 1)], ["Next →", page < totalPages, () => setPage(page + 1)]].map(([label, enabled, action]) => (
                <button
                  key={String(label)}
                  disabled={!enabled}
                  onClick={action as () => void}
                  style={{
                    padding: "7px 14px", borderRadius: 8,
                    background: enabled ? "rgba(99,102,241,0.15)" : "rgba(255,255,255,0.04)",
                    border: `1px solid ${enabled ? "rgba(99,102,241,0.3)" : "rgba(255,255,255,0.06)"}`,
                    color: enabled ? "#a5b4fc" : "#334155",
                    fontSize: 13, cursor: enabled ? "pointer" : "not-allowed", transition: "all 0.15s",
                  }}
                >
                  {String(label)}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {}
      {confirmDelete && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 999,
          display: "flex", alignItems: "center", justifyContent: "center", padding: 16,
        }} onClick={() => setConfirmDelete(null)}>
          <div
            style={{
              background: "#131830", border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 20, padding: 32, maxWidth: 400, width: "100%",
              boxShadow: "0 32px 64px rgba(0,0,0,0.5)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
              <div style={{
                width: 56, height: 56, borderRadius: 16,
                background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)",
                display: "flex", alignItems: "center", justifyContent: "center", color: "#f87171",
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" /></svg>
              </div>
            </div>
            <h3 style={{ color: "#f1f5f9", textAlign: "center", margin: "0 0 8px", fontSize: 18, fontWeight: 700 }}>
              Delete Registration?
            </h3>
            <p style={{ color: "#64748b", textAlign: "center", margin: "0 0 24px", fontSize: 14 }}>
              This will permanently remove <strong style={{ color: "#94a3b8" }}>{confirmDelete.member1?.name}</strong>&apos;s registration for <strong style={{ color: "#94a3b8" }}>{confirmDelete.event.replace(/_/g, " ")}</strong>. This cannot be undone.
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              <button
                onClick={() => setConfirmDelete(null)}
                style={{
                  flex: 1, padding: "11px", borderRadius: 10,
                  background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
                  color: "#94a3b8", fontSize: 14, cursor: "pointer",
                }}
              >Cancel</button>
              <button
                onClick={() => handleDelete(confirmDelete)}
                style={{
                  flex: 1, padding: "11px", borderRadius: 10,
                  background: "rgba(239,68,68,0.2)", border: "1px solid rgba(239,68,68,0.4)",
                  color: "#f87171", fontSize: 14, fontWeight: 600, cursor: "pointer",
                }}
              >Delete</button>
            </div>
          </div>
        </div>
      )}

      {}
      {editingParticipant && (
        <EditModal
          participant={editingParticipant}
          onClose={() => setEditingParticipant(null)}
          onSave={(updated) => {
            setParticipants((prev) => prev.map((p) => (p._id === updated._id ? updated : p)));
            setEditingParticipant(null);
          }}
        />
      )}
    </div>
  );
}

const tdStyle: React.CSSProperties = { padding: "14px 16px", verticalAlign: "middle" };
const spinStyle: React.CSSProperties = {
  width: 36, height: 36,
  border: "3px solid rgba(255,255,255,0.08)",
  borderTopColor: "#6366f1",
  borderRadius: "50%",
  animation: "spin 0.8s linear infinite",
};
