import type { Locale } from "@/types";
import { homeContent } from "@/lib/content/home";
import { btnPrimary } from "@/lib/styles";
import { Container } from "@/components/ui/Container";
import { ContactButton } from "@/components/contact/ContactButton";

export function HomeHero({ locale }: { locale: Locale }) {
  const content = homeContent[locale];

  return (
    <section
      className="relative bg-[url('/images/theme/bg-intro.png')] bg-cover bg-bottom bg-no-repeat pb-[80px] pt-[230px] sm:pt-[280px] lg:pb-[120px] xl:pb-[150px] xl:pt-[322px]"
      aria-labelledby="home-hero-title"
    >
      <Container>
        <h1
          id="home-hero-title"
          className="page-gradient-text max-w-[1100px] text-[clamp(44px,7.2vw,96px)] font-bold leading-[1.195]"
        >
          {content.hero.title}
        </h1>
        <div className="mt-7 max-w-[580px] lg:mt-8 lg:pl-[130px]">
          <p className="text-[18px] leading-[1.45] text-brand-navy sm:text-[21px] lg:text-[24px] xl:text-[25px]">
            {content.hero.text}
          </p>
          <div className="mt-8">
            <ContactButton
              source={`${locale.toUpperCase()} home hero`}
              className={btnPrimary}
            >
              {content.hero.cta}
            </ContactButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
