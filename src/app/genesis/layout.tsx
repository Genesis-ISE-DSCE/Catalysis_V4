import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Genesis — Catalysis 4.0",
  description:
    "The Genesis animation for Catalysis 4.0 — Club Genesis, ISE Dept, DSCE.",
};

/**
 * Standalone layout for /genesis.
 * No Navbar, Footer, AudioPlayer — clean full-screen canvas.
 */
export default function GenesisLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full m-0 p-0 overflow-hidden bg-black">
        {children}
      </body>
    </html>
  );
}
