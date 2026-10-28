import type { Locale } from "@/types";
import { homeContent } from "@/lib/content/home";
import { btnPrimary } from "@/lib/styles";
import { Container } from "@/components/ui/Container";
import { ContactButton } from "@/components/contact/ContactButton";

export function HomeHero({ locale }: { locale: Locale }) {
  const hero = homeContent[locale].hero;

  return (
    <section
      className="relative bg-[url('/images/theme/bg-intro.png')] bg-cover bg-bottom bg-no-repeat pb-[80px] pt-[220px] sm:pt-[260px] lg:pb-[120px] xl:pb-[150px] xl:pt-[300px]"
      aria-labelledby="home-hero-title"
    >
      <Container>
        <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-white/70 px-4 py-1.5 backdrop-blur-sm">
          <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
          <span className="text-[12px] font-bold tracking-[1.5px] uppercase text-brand sm:text-[13px]">
            {hero.badge}
          </span>
        </div>

        <h1
          id="home-hero-title"
          className="page-gradient-text mt-5 max-w-[1100px] text-[clamp(44px,7.2vw,96px)] font-bold leading-[1.1]"
        >
          {hero.title}
        </h1>

        <div className="mt-5 max-w-[720px] lg:mt-7 lg:pl-[60px] xl:pl-[120px]">
          <h2 className="text-[20px] font-bold uppercase tracking-[1px] text-accent sm:text-[23px] lg:text-[26px]">
            {hero.subtitle}
          </h2>

          <p className="mt-4 text-[18px] leading-[1.5] text-brand-navy sm:text-[21px] lg:text-[23px]">
            {hero.text}
          </p>

          <p className="mt-4 inline-block rounded-[3px] bg-brand/5 px-3.5 py-1.5 text-[16px] font-bold tracking-[0.5px] text-brand sm:text-[18px] lg:text-[20px]">
            {hero.tagline}
          </p>

          <div className="mt-8">
            <ContactButton
              source={`${locale.toUpperCase()} home hero`}
              className={btnPrimary}
            >
              {hero.cta}
            </ContactButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
