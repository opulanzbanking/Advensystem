import type { Locale } from "@/types";
import { portageContent } from "@/lib/content/portage";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";

export function PortageApproach({ locale }: { locale: Locale }) {
  const content = portageContent[locale].approach;

  return (
    <section className="bg-white pb-16 pt-16 lg:pb-[90px] lg:pt-[90px]">
      <Container>
        <div className="flex flex-wrap items-start gap-12 lg:gap-[60px]">
          <div className="w-full lg:max-w-[280px] lg:flex-[0_0_280px]">
            <h2 className="text-left text-[23px] font-bold uppercase leading-[1.5] tracking-[1px] text-brand-dark sm:text-[26px]">
              {content.title}
            </h2>
            <p className="mt-5 text-[16px] leading-[1.7] text-[#555]">
              {content.intro}
            </p>
            <ul className="mt-7 space-y-3.5">
              {content.bullets.map((bullet) => (
                <li key={bullet} className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="inline-block h-2.5 w-2.5 flex-shrink-0 rounded-full bg-accent"
                  />
                  <span className="text-[15px] font-medium text-[#333]">
                    {bullet}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-[280px] flex-1">
            <ol className="grid gap-5 sm:grid-cols-2">
              {content.steps.map((step) => (
                <li
                  key={step.label}
                  className={cn(
                    "rounded-[8px] p-7",
                    step.tone === "dark"
                      ? "bg-brand text-white"
                      : "bg-[#f5f7fc] text-brand-dark",
                  )}
                >
                  <p
                    className={cn(
                      "mb-2 text-[11px] font-bold uppercase tracking-[2px]",
                      step.tone === "dark" ? "text-white/50" : "text-[#999]",
                    )}
                  >
                    {step.label}
                  </p>
                  <h3
                    className={cn(
                      "mb-2.5 text-[18px] font-bold leading-[1.35]",
                      step.tone === "dark" ? "text-white" : "text-brand-dark",
                    )}
                  >
                    {step.title}
                  </h3>
                  <p
                    className={cn(
                      "text-[13px] leading-[1.6]",
                      step.tone === "dark" ? "text-white/70" : "text-[#666]",
                    )}
                  >
                    {step.text}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}
