import type { Locale } from "@/types";
import { homeContent } from "@/lib/content/home";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function FeedbacksSection({ locale }: { locale: Locale }) {
  const content = homeContent[locale].feedbacks;

  return (
    <section
      id="feedbacks"
      className="scroll-mt-24 bg-gradient-to-b from-white to-brand/5 pb-16 pt-16 lg:pb-[80px] lg:pt-[100px]"
    >
      <Container>
        <div className="text-center">
          <span className="inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-1 text-[12px] font-bold uppercase tracking-[2px] text-accent">
            {content.badge}
          </span>
          <SectionTitle className="mt-3.5">{content.title}</SectionTitle>
          <p className="mx-auto mt-4 max-w-[850px] text-[18px] leading-[1.4] text-brand-navy sm:text-[20px]">
            {content.intro}
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:gap-8">
          {content.items.map((item) => (
            <article
              key={item.author}
              className="relative flex flex-col justify-between overflow-hidden rounded-[4px] bg-white p-7 shadow-card transition-shadow hover:shadow-panel sm:p-8"
            >
              <div>
                <div className="flex items-center justify-between gap-4">
                  {/* 5-star rating */}
                  <div
                    className="flex items-center gap-1 text-gold"
                    aria-label={`${item.rating} sur 5 étoiles`}
                  >
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <svg
                        key={i}
                        className="h-5 w-5 fill-current"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  <span className="rounded-full bg-brand/10 px-3 py-1 text-[11px] font-semibold text-brand">
                    {item.sector}
                  </span>
                </div>

                <blockquote className="mt-5 text-[16px] leading-[1.65] text-brand-navy/90 sm:text-[17px]">
                  &ldquo;{item.content}&rdquo;
                </blockquote>
              </div>

              <div className="mt-6 border-t border-brand/10 pt-4">
                <p className="font-bold text-brand-navy">{item.author}</p>
                <p className="text-[13px] text-brand-navy/70">
                  {item.role} • {item.company}
                </p>
              </div>

              <span
                aria-hidden="true"
                className="absolute inset-y-0 right-0 w-[3px] bg-gradient-to-br from-gold to-coral"
              />
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

