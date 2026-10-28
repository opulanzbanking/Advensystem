import type { Locale, PortageIcon } from "@/types";
import { portageContent } from "@/lib/content/portage";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";

const cardStyles = [
  "border border-white/15 bg-white/[0.07] text-white",
  "border border-white/20 bg-brand-dark text-white",
  "border border-transparent bg-accent text-white",
  "border border-transparent bg-white/95 text-brand-dark",
];

const iconStyles = [
  "bg-white/10 text-white",
  "bg-white/10 text-white",
  "bg-white/15 text-white",
  "bg-brand text-white",
];

export function PortageWhy({ locale }: { locale: Locale }) {
  const content = portageContent[locale].why;

  return (
    <section id="why" className="scroll-mt-24 pt-16 lg:pt-20">
      <Container>
        <h2 className="text-center text-[23px] font-bold uppercase leading-[1.4] tracking-[1px] text-brand-dark sm:text-[26px]">
          {content.title}
        </h2>
        <p className="mx-auto mt-4 max-w-[600px] text-center text-[17px] leading-[1.6] text-[#555]">
          {content.intro}
        </p>
      </Container>

      <div className="mt-10 bg-[#003ABD] bg-[url('/images/theme/BG5.svg')] bg-cover bg-center shadow-panel">
        <Container>
          <div className="grid gap-6 py-12 sm:grid-cols-2 xl:grid-cols-4 xl:py-[60px]">
            {content.cards.map((card, index) => (
              <article
                key={card.title}
                className={cn(
                  "flex h-full flex-col rounded-[8px] p-7 lg:p-9",
                  cardStyles[index % cardStyles.length],
                )}
              >
                <div
                  className={cn(
                    "mb-[18px] flex h-11 w-11 items-center justify-center rounded-[8px]",
                    iconStyles[index % iconStyles.length],
                  )}
                >
                  <PortageGlyph icon={card.icon} />
                </div>
                <h3
                  className={cn(
                    "mb-2.5 text-[17px] font-bold leading-[1.35]",
                    index === 3 ? "text-brand" : "text-white",
                  )}
                >
                  {card.title}
                </h3>
                <p
                  className={cn(
                    "text-[14px] leading-[1.6]",
                    index === 3 ? "text-[#444]" : "text-white/75",
                  )}
                >
                  {card.text}
                </p>
                {card.tags ? (
                  <div
                    className={cn(
                      "mt-4 flex gap-2.5 text-[11px] font-bold tracking-[1px]",
                      index === 3 ? "text-brand/50" : "text-white/50",
                    )}
                  >
                    {card.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}

function PortageGlyph({ icon }: { icon: PortageIcon }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (icon === "shield") {
    return (
      <svg {...common}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    );
  }
  if (icon === "document") {
    return (
      <svg {...common}>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M7 8h10M7 12h10M7 16h6" />
      </svg>
    );
  }
  if (icon === "clock") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 3" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M17 1l4 4-4 4" />
      <path d="M3 11V9a4 4 0 014-4h14M7 23l-4-4 4-4" />
      <path d="M21 13v2a4 4 0 01-4 4H3" />
    </svg>
  );
}
