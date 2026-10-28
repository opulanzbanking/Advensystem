"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import { localeFromPath } from "@/lib/site";
import { ContactModal } from "./ContactModal";

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
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState("AdvenSystem.lu");

  const openContact = useCallback(
    (nextSource?: string) => {
      setSource(nextSource ?? pathname);
      setIsOpen(true);
    },
    [pathname],
  );

  const closeContact = useCallback(() => setIsOpen(false), []);

  const value = useMemo(() => ({ openContact }), [openContact]);

  return (
    <ContactContext.Provider value={value}>
      {children}
      {isOpen ? (
        <ContactModal
          locale={locale}
          source={source}
          onClose={closeContact}
        />
      ) : null}
    </ContactContext.Provider>
  );
}
