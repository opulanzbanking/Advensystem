import type { Locale } from "@/types";
import { portageContent } from "@/lib/content/portage";
import { Container } from "@/components/ui/Container";

export function PortageUnderstanding({ locale }: { locale: Locale }) {
  const content = portageContent[locale].understanding;

  return (
    <section className="bg-white pb-16 pt-16 lg:pb-[70px] lg:pt-[90px]">
      <Container>
        <div className="flex flex-wrap items-start gap-12 lg:gap-[60px]">
          <div className="min-w-[280px] flex-1">
            <h2 className="text-left text-[23px] font-bold uppercase leading-[1.5] tracking-[1px] text-brand-dark sm:text-[26px]">
              {content.title}
            </h2>
            <div className="mt-6 space-y-4">
              <p className="text-[17px] leading-[1.7] text-[#333]">
                {content.paragraphs[0]}
              </p>
              <p className="text-[16px] leading-[1.7] text-[#555]">
                {content.paragraphs[1]}
              </p>
            </div>
            <dl className="mt-9 flex flex-wrap gap-x-10 gap-y-6 border-t-[3px] border-brand pt-7">
              {content.stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="block text-[34px] font-bold leading-none text-brand sm:text-[40px]">
                      {stat.value}
                    </span>
                    <span className="mt-1 block text-[12px] uppercase tracking-[1.5px] text-[#666]">
                      {stat.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="flex min-h-[320px] min-w-[280px] flex-1 items-center justify-center rounded-[10px] bg-gradient-to-br from-brand to-brand-dark p-10 sm:min-h-[360px] sm:p-12">
            <div className="text-center text-white">
              <svg
                width="100"
                height="100"
                viewBox="0 0 84 93"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="mx-auto"
              >
                <circle cx="42" cy="16" r="10" fill="rgba(255,255,255,0.85)" />
                <path
                  d="M22 44C22 33.5 31 27 42 27C53 27 62 33.5 62 44V50H22V44Z"
                  fill="rgba(255,255,255,0.85)"
                />
                <rect x="22" y="50" width="40" height="26" rx="3" fill="rgba(255,255,255,0.7)" />
                <rect
                  x="31"
                  y="44"
                  width="22"
                  height="8"
                  rx="2"
                  stroke="rgba(255,255,255,0.85)"
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  d="M10 78C10 78 18 74 24 74H36L38 78H46L48 74H60C66 74 74 78 74 78"
                  stroke="rgba(255,255,255,0.9)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                />
                <rect x="36" y="75" width="12" height="10" rx="2" fill="rgba(255,255,255,0.9)" />
              </svg>
              <p className="mt-5 text-[15px] leading-[1.5] text-white/80">
                {content.visualTextLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
