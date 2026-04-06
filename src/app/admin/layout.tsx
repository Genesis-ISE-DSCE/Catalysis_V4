import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Panel - Catalysis",
  description: "Catalysis event admin panel",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-root" style={{ fontFamily: "var(--font-geist-sans, system-ui)" }}>
      {children}
    </div>
  );
}
