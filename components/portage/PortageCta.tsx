import type { Locale } from "@/types";
import { portageContent } from "@/lib/content/portage";
import { company } from "@/lib/site";
import { btnAccent } from "@/lib/styles";
import { Container } from "@/components/ui/Container";
import { ContactButton } from "@/components/contact/ContactButton";

export function PortageCta({ locale }: { locale: Locale }) {
  const content = portageContent[locale].cta;

  return (
    <section className="bg-brand-dark pb-16 pt-16 lg:pb-20 lg:pt-20">
      <Container>
        <div className="flex flex-wrap items-center gap-12 lg:gap-[60px]">
          <div className="min-w-[260px] flex-1">
            <h2 className="text-[26px] font-bold leading-[1.3] text-white sm:text-[32px]">
              {content.title}
            </h2>
            <p className="mt-4 max-w-[560px] text-[16px] leading-[1.7] text-white/70">
              {content.text}
            </p>
            <div className="mt-7 flex flex-col gap-3">
              <a
                href={company.phoneHref}
                className="flex items-center gap-3.5 text-[16px] text-white hover:text-gold"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#FF8C00"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 013.1 5.18a2 2 0 012-2.18h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L9.91 10.91a16 16 0 006.09 6.09l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                </svg>
                {company.phone}
              </a>
              <a
                href={company.emailHref}
                className="flex items-center gap-3.5 text-[16px] text-white hover:text-gold"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#FF8C00"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                {company.email}
              </a>
            </div>
          </div>

          <div className="min-w-[260px] flex-1 rounded-[10px] border border-white/10 bg-white/5 p-8 text-center sm:p-10">
            <p className="mb-7 text-[15px] leading-[1.6] text-white/70">
              {content.boxText}
            </p>
            <ContactButton
              source={`${locale.toUpperCase()} portage CTA – simulation`}
              className={btnAccent}
            >
              {content.button}
            </ContactButton>
            <p className="mt-3.5 text-[12px] text-white/40">{content.note}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
