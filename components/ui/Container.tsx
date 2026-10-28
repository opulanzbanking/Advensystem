import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-site px-5 sm:px-8 lg:px-10 min-[1621px]:px-0",
        className,
      )}
    >
      {children}
    </div>
  );
}
