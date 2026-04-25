import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registration Closed — Catalysis 4.0",
  description:
    "Registrations for Catalysis 4.0 are now closed. Thank you for the overwhelming response! See u next year!",
};

export default function ClosedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
