import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionTitle({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "text-center text-[25px] font-bold uppercase leading-[1.2] tracking-[1.5px] text-brand-navy lg:text-[30px]",
        className,
      )}
    >
      {children}
    </h2>
  );
}
