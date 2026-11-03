import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Inquiries & Leads Dashboard – AdvenSystem",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LeadsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#07132B] text-slate-100">
      {children}
    </div>
  );
}

