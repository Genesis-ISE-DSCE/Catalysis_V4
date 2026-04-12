"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const NAV_ITEMS = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
    exact: true,
  },
  {
    href: "/admin/participants",
    label: "Participants",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    exact: false,
  },
  {
    href: "/admin/register",
    label: "Help Desk Register",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8 3-8-3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    exact: false,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  function isActive(item: (typeof NAV_ITEMS)[0]) {
    return item.exact ? pathname === item.href : pathname.startsWith(item.href);
  }

  return (
    <>
      {}
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed", top: 16, left: 16, zIndex: 200,
          display: "flex", alignItems: "center", justifyContent: "center",
          width: 40, height: 40,
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 10, color: "#94a3b8", cursor: "pointer",
        }}
        aria-label="Toggle menu"
        className="sidebar-hamburger"
      >
        {open ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
        )}
      </button>

      {}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 150 }}
        />
      )}

      {}
      <aside style={{
        position: "fixed", top: 0, left: 0, bottom: 0,
        width: 240,
        background: "rgba(10,14,26,0.97)",
        backdropFilter: "blur(24px)",
        borderRight: "1px solid rgba(255,255,255,0.06)",
        display: "flex", flexDirection: "column",
        zIndex: 160,
        transform: open ? "translateX(0)" : undefined,
        transition: "transform 0.25s ease",
        paddingTop: 0,
      }}
        className="admin-sidebar"
      >
        {}
        <div style={{
          padding: "24px 20px 20px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: "linear-gradient(135deg, rgba(99,102,241,0.4), rgba(139,92,246,0.4))",
              border: "1px solid rgba(99,102,241,0.4)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#a5b4fc", flexShrink: 0,
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <div>
              <p style={{ color: "#f1f5f9", fontWeight: 700, fontSize: 15, margin: 0 }}>Catalysis</p>
              <p style={{ color: "#475569", fontSize: 11, margin: 0 }}>Admin Panel</p>
            </div>
          </div>
        </div>

        {}
        <nav style={{ padding: "16px 12px", flex: 1 }}>
          <p style={{ color: "#334155", fontSize: 10, fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase", padding: "0 8px", marginBottom: 8 }}>
            MENU
          </p>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "10px 12px", borderRadius: 10,
                color: isActive(item) ? "#a5b4fc" : "#64748b",
                background: isActive(item) ? "rgba(99,102,241,0.12)" : "transparent",
                border: isActive(item) ? "1px solid rgba(99,102,241,0.2)" : "1px solid transparent",
                textDecoration: "none", fontSize: 14, fontWeight: isActive(item) ? 600 : 400,
                marginBottom: 4, transition: "all 0.15s",
              }}
            >
              <span style={{ color: isActive(item) ? "#818cf8" : "#475569" }}>{item.icon}</span>
              {item.label}
              {isActive(item) && (
                <span style={{
                  marginLeft: "auto", width: 6, height: 6, borderRadius: "50%",
                  background: "#6366f1",
                }} />
              )}
            </Link>
          ))}
        </nav>

        {}
        <div style={{ padding: "16px 12px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            style={{
              display: "flex", alignItems: "center", gap: 12,
              width: "100%", padding: "10px 12px", borderRadius: 10,
              color: loggingOut ? "#475569" : "#f87171",
              background: "transparent",
              border: "1px solid rgba(248,113,113,0.15)",
              fontSize: 14, fontWeight: 500, cursor: loggingOut ? "not-allowed" : "pointer",
              transition: "all 0.15s",
            }}
            onMouseEnter={(e) => { if (!loggingOut) e.currentTarget.style.background = "rgba(248,113,113,0.08)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            {loggingOut ? "Signing out…" : "Sign Out"}
          </button>
        </div>
      </aside>

      <style>{`
        @media (min-width: 768px) {
          .sidebar-hamburger { display: none !important; }
          .admin-sidebar { transform: translateX(0) !important; }
        }
        @media (max-width: 767px) {
          .admin-sidebar { transform: translateX(-100%); }
        }
      `}</style>
    </>
  );
}
