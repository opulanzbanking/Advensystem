"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import { localeFromPath } from "@/lib/site";

interface ContactContextValue {
  openContact: (source?: string) => void;
}

const ContactContext = createContext<ContactContextValue | null>(null);

export function useContact(): ContactContextValue {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error("useContact must be used within ContactProvider");
  }
  return context;
}

export function ContactProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname() ?? "/";
  const locale = localeFromPath(pathname);

  const openContact = useCallback(
    () => {
      if (typeof window === "undefined") return;

      const contactSection = document.getElementById("contacts");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
        if (window.history?.pushState) {
          window.history.pushState(null, "", "#contacts");
        }
        const input = contactSection.querySelector<HTMLInputElement>(
          "#contact-name, input:not([type='hidden']), textarea",
        );
        if (input) {
          setTimeout(() => {
            input.focus({ preventScroll: true });
          }, 450);
        }
      } else {
        const target = locale === "en" ? "/en/#contacts" : "/#contacts";
        window.location.href = target;
      }
    },
    [locale],
  );

  const value = useMemo(() => ({ openContact }), [openContact]);

  return (
    <ContactContext.Provider value={value}>
      {children}
    </ContactContext.Provider>
  );
}
