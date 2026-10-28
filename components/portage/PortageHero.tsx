import type { Locale } from "@/types";
import { portageContent } from "@/lib/content/portage";
import { btnNavy, btnOutlined } from "@/lib/styles";
import { Container } from "@/components/ui/Container";
import { ContactButton } from "@/components/contact/ContactButton";

export function PortageHero({ locale }: { locale: Locale }) {
  const content = portageContent[locale].hero;

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-dark to-brand pb-16 pt-[190px] sm:pb-20 sm:pt-[220px]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[url('/images/theme/BG5.svg')] bg-cover bg-center opacity-[0.08]"
      />
      <Container className="relative text-center">
        <p className="mb-6 inline-block rounded-[3px] bg-accent px-[18px] py-1.5 text-[11px] font-bold uppercase tracking-[2px] text-white">
          {content.badge}
        </p>
        <h1 className="mx-auto max-w-[900px] text-[34px] font-bold leading-[1.15] text-white sm:text-[44px] lg:text-[52px]">
          {content.titleLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h1>
        <p className="mx-auto mt-6 max-w-[600px] text-[17px] leading-[1.6] text-white/85 sm:text-[20px]">
          {content.text}
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <ContactButton
            source={`${locale.toUpperCase()} portage hero – contact`}
            className={btnNavy}
          >
            {content.primaryCta}
          </ContactButton>
          <ContactButton
            source={`${locale.toUpperCase()} portage hero – simulation`}
            className={btnOutlined}
          >
            {content.secondaryCta}
          </ContactButton>
        </div>
      </Container>
    </section>
  );
}
