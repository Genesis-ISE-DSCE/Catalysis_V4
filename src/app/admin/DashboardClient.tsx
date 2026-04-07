"use client";
import { useEffect, useState } from "react";



const EVENT_COLORS: Record<string, string> = {
  technoseek: "#6366f1",
  typemaster: "#8b5cf6",
  clash_royale: "#ec4899",
  coding_relay: "#f59e0b",
  dsa_smackdown: "#10b981",
  pitch_perfect: "#3b82f6",
};

interface EventCount { event: string; count: number }
interface RecentParticipant {
  _id: string;
  event: string;
  team_name: string;
  member1: { name: string; usn: string };
  registeredAt: string;
}

interface Stats {
  total: number;
  eventCounts: EventCount[];
  recentCount: number;
  recentRegistrations: RecentParticipant[];
}

export default function DashboardClient() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then((d) => { setStats(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const maxCount = stats?.eventCounts?.length
    ? Math.max(...stats.eventCounts.map((e) => e.count), 1)
    : 1;

  return (
    <div>
      {}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ color: "#f1f5f9", fontSize: 28, fontWeight: 700, margin: "0 0 6px", letterSpacing: "-0.5px" }}>
          Dashboard
        </h1>
        <p style={{ color: "#475569", fontSize: 14, margin: 0 }}>
          Overview of all Catalysis event registrations
        </p>
      </div>

      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", paddingTop: 80 }}>
          <div style={spin} />
        </div>
      ) : (!stats || !stats.eventCounts || !stats.recentRegistrations) ? (
        <div style={card}>
          <p style={{ color: "#f87171", textAlign: "center" }}>Failed to load stats. Check your MongoDB connection.</p>
        </div>
      ) : (
        <>
          {}
          <div style={grid3}>
            <StatCard
              icon={<UsersIcon />}
              label="Total Registrations"
              value={stats.total}
              accent="#6366f1"
            />
          </div>

          {}
          <div style={{ ...card, marginBottom: 24 }}>
            <h2 style={sectionTitle}>Registrations by Event</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {stats.eventCounts.map(({ event, count }) => (
                <div key={event}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ color: "#94a3b8", fontSize: 13, textTransform: "capitalize" }}>
                      {event.replace(/_/g, " ")}
                    </span>
                    <span style={{ color: "#f1f5f9", fontSize: 13, fontWeight: 600 }}>{count}</span>
                  </div>
                  <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 6, height: 8, overflow: "hidden" }}>
                    <div style={{
                      height: "100%",
                      width: `${(count / maxCount) * 100}%`,
                      background: `linear-gradient(90deg, ${EVENT_COLORS[event] ?? "#6366f1"}, ${EVENT_COLORS[event] ?? "#6366f1"}aa)`,
                      borderRadius: 6,
                      transition: "width 0.8s cubic-bezier(0.4,0,0.2,1)",
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {}
          <div style={card}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h2 style={{ ...sectionTitle, marginBottom: 0 }}>Recent Registrations</h2>
              <a href="/admin/participants" style={{ color: "#6366f1", fontSize: 13, textDecoration: "none", fontWeight: 500 }}>
                View all →
              </a>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr>
                    {["Name", "USN", "Event", "Team", "Registered"].map((h) => (
                      <th key={h} style={th}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {stats.recentRegistrations.length === 0 ? (
                    <tr>
                      <td colSpan={5} style={{ textAlign: "center", color: "#475569", padding: 24 }}>
                        No registrations yet
                      </td>
                    </tr>
                  ) : (
                    stats.recentRegistrations.map((p) => (
                      <tr key={p._id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                        <td style={td}>{p.member1?.name || "-"}</td>
                        <td style={td}><code style={{ color: "#94a3b8", fontSize: 12 }}>{p.member1?.usn || "-"}</code></td>
                        <td style={td}>
                          <span style={{
                            padding: "3px 8px", borderRadius: 6,
                            background: `${EVENT_COLORS[p.event] ?? "#6366f1"}22`,
                            color: EVENT_COLORS[p.event] ?? "#6366f1",
                            fontSize: 11, fontWeight: 600, textTransform: "capitalize",
                          }}>
                            {p.event.replace(/_/g, " ")}
                          </span>
                        </td>
                        <td style={td}>{p.team_name || "-"}</td>
                        <td style={td}>
                          <span style={{ color: "#475569" }}>
                            {new Date(p.registeredAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function StatCard({ icon, label, value, accent }: { icon: React.ReactNode; label: string; value: number; accent: string }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: 16, padding: "24px",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", top: 0, right: 0, width: 120, height: 120,
        background: `radial-gradient(circle at top right, ${accent}18, transparent 70%)`,
        pointerEvents: "none",
      }} />
      <div style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        width: 42, height: 42, borderRadius: 12,
        background: `${accent}20`, border: `1px solid ${accent}35`,
        color: accent, marginBottom: 14,
      }}>
        {icon}
      </div>
      <p style={{ color: "#475569", fontSize: 12, fontWeight: 500, margin: "0 0 6px", textTransform: "uppercase", letterSpacing: "0.8px" }}>
        {label}
      </p>
      <p style={{ color: "#f1f5f9", fontSize: 32, fontWeight: 700, margin: 0, letterSpacing: "-1px" }}>
        {value.toLocaleString()}
      </p>
    </div>
  );
}

function UsersIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>;
}

const card: React.CSSProperties = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.07)",
  borderRadius: 16, padding: 24, marginBottom: 24,
};
const grid3: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: 16, marginBottom: 24,
};
const sectionTitle: React.CSSProperties = {
  color: "#f1f5f9", fontSize: 16, fontWeight: 600, margin: "0 0 16px",
};
const th: React.CSSProperties = {
  textAlign: "left", color: "#334155",
  fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.8px",
  padding: "0 12px 12px 0", borderBottom: "1px solid rgba(255,255,255,0.06)",
};
const td: React.CSSProperties = {
  color: "#94a3b8", padding: "12px 12px 12px 0", verticalAlign: "middle",
};
const spin: React.CSSProperties = {
  width: 36, height: 36,
  border: "3px solid rgba(255,255,255,0.08)",
  borderTopColor: "#6366f1",
  borderRadius: "50%",
  animation: "spin 0.8s linear infinite",
};
