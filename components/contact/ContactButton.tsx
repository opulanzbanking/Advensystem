"use client";

import type { ReactNode } from "react";
import { useContact } from "./ContactProvider";

export function ContactButton({
  children,
  className,
  source,
  ariaLabel,
}: {
  children: ReactNode;
  className?: string;
  source?: string;
  ariaLabel?: string;
}) {
  const { openContact } = useContact();

  return (
    <button
      type="button"
      className={className}
      aria-label={ariaLabel}
      onClick={() => openContact(source)}
    >
      {children}
    </button>
  );
}
