import type { ReactNode } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function EnglishLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer locale="en" />
    </>
  );
}
