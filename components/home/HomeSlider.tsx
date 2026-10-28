"use client";

import Image from "next/image";
import { useId, useState, type KeyboardEvent } from "react";
import type { Locale } from "@/types";
import { homeContent } from "@/lib/content/home";
import { btnPrimary } from "@/lib/styles";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { ContactButton } from "@/components/contact/ContactButton";

export function HomeSlider({ locale }: { locale: Locale }) {
  const content = homeContent[locale].slider;
  const [active, setActive] = useState(0);
  const slides = content.slides;
  const current = slides[active];
  const baseId = useId();

  function handleTabKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const next =
      event.key === "ArrowRight"
        ? (active + 1) % slides.length
        : (active - 1 + slides.length) % slides.length;
    setActive(next);
    document.getElementById(`${baseId}-tab-${next}`)?.focus();
  }

  return (
    <section
      className="slider-pattern relative py-[62px] text-white shadow-panel lg:py-[88px] lg:pb-[100px] xl:pb-[119px]"
      aria-labelledby="home-slider-title"
    >
      <Container>
        <h2
          id="home-slider-title"
          className="mx-auto max-w-[1040px] text-center text-[20px] font-normal leading-[1.35] text-white sm:text-[23px] lg:text-[25px] xl:text-[30px]"
        >
          <b className="font-bold">AdvenSystem</b>
          {content.title.replace("AdvenSystem", "")}
        </h2>

        <div className="mt-10 grid items-start gap-8 lg:mt-[52px] lg:grid-cols-2 lg:gap-10">
          <div className="relative h-[260px] w-full overflow-hidden rounded-r-[2px] bg-brand shadow-card sm:h-[340px] lg:h-[460px]">
            <Image
              key={current.image}
              src={current.image}
              alt={current.alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="animate-fade-in object-cover"
              priority={active === 0}
            />
            <div className="absolute inset-0 bg-brand-navy/70" aria-hidden="true" />
            <div
              className="absolute inset-y-0 right-0 w-[3px] bg-gradient-to-br from-gold to-coral"
              aria-hidden="true"
            />
          </div>

          <div
            id={`${baseId}-panel`}
            role="tabpanel"
            aria-labelledby={`${baseId}-tab-${active}`}
            tabIndex={0}
            className="flex flex-col justify-center lg:min-h-[460px] lg:pl-[41px]"
          >
            <p
              key={`caption-${active}`}
              className="min-h-[60px] animate-fade-in text-[20px] leading-[1.35] text-white sm:text-[23px] lg:min-h-[80px] lg:text-[25px] xl:text-[30px]"
            >
              {current.caption}
            </p>

            <div
              role="tablist"
              aria-label={locale === "fr" ? "Diapositives" : "Slides"}
              onKeyDown={handleTabKeyDown}
              className="relative mt-8 flex items-center gap-6 sm:gap-10 lg:mt-[72px] lg:gap-[74px]"
            >
              <div
                className="absolute left-[6px] right-[6px] top-1/2 h-[2px] -translate-y-1/2 bg-white/80"
                aria-hidden="true"
              />
              {slides.map((slide, index) => (
                <button
                  key={slide.image}
                  id={`${baseId}-tab-${index}`}
                  type="button"
                  role="tab"
                  aria-selected={index === active}
                  aria-controls={`${baseId}-panel`}
                  tabIndex={index === active ? 0 : -1}
                  onClick={() => setActive(index)}
                  className={cn(
                    "relative z-10 shrink-0 rounded-full bg-gradient-to-br from-gold to-coral shadow-card transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white",
                    index === active ? "h-[30px] w-[30px]" : "h-[15px] w-[15px]",
                  )}
                >
                  <span className="sr-only">
                    {locale === "fr"
                      ? `Diapositive ${index + 1} : ${slide.caption}`
                      : `Slide ${index + 1}: ${slide.caption}`}
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-9 lg:mt-[54px]">
              <ContactButton
                source={`${locale.toUpperCase()} home slider`}
                className={btnPrimary}
              >
                {content.cta}
              </ContactButton>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
