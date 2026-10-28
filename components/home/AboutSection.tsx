import Image from "next/image";
import type { Locale } from "@/types";
import { homeContent, type AboutColumn } from "@/lib/content/home";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function AboutSection({ locale }: { locale: Locale }) {
  const content = homeContent[locale].about;
  const founder = content.founder;

  return (
    <section id="about" className="scroll-mt-24 pb-12 pt-16 lg:pb-[43px] lg:pt-[150px]">
      <Container>
        <SectionTitle className="mb-8 lg:mb-[35px]">{content.title}</SectionTitle>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-x-[70px] xl:gap-x-[100px]">
          {content.columns.map((column, columnIndex) => (
            <div
              key={columnIndex}
              className={
                columnIndex === 0
                  ? "lg:pt-4"
                  : "lg:pt-0"
              }
            >
              {column.imageFirst ? (
                <>
                  <ColumnImage column={column} priority={false} />
                  <div className="mt-6 space-y-3.5">
                    {column.paragraphs.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="text-[17px] leading-[1.5] text-brand-navy sm:text-[18px] lg:text-[19px] xl:text-[21px]"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-3.5">
                    {column.paragraphs.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="text-[17px] leading-[1.5] text-brand-navy sm:text-[18px] lg:text-[19px] xl:text-[21px]"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  <ColumnImage column={column} />
                </>
              )}
            </div>
          ))}
        </div>

        {/* Founder & Chairman of the Board Spotlight */}
        <div className="mt-14 overflow-hidden rounded-[8px] border border-brand/15 bg-white shadow-card lg:mt-20">
          <div className="flex flex-wrap items-center justify-between gap-2 bg-gradient-to-r from-brand-navy via-brand to-brand-navy px-6 py-4 text-white sm:px-8">
            <span className="text-[12px] font-bold uppercase tracking-[2px] text-gold">
              {founder.badge}
            </span>
            <span className="text-[13px] text-white/80">
              AdvenSystem SARL Luxembourg
            </span>
          </div>

          <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-12 lg:items-center lg:gap-10">
            {/* Left/Main Column: Info, Title, Quote, Contacts */}
            <div className="lg:col-span-7">
              <div>
                <h3 className="text-[24px] font-bold text-brand-navy sm:text-[28px]">
                  {founder.name}
                </h3>
                <p className="text-[13px] font-bold uppercase tracking-[1px] text-accent sm:text-[14px]">
                  {founder.role}
                </p>
              </div>

              <blockquote className="mt-5 border-l-4 border-gold pl-4 text-[16px] italic leading-[1.6] text-brand-navy/90 sm:text-[17px]">
                &ldquo;{founder.quote}&rdquo;
              </blockquote>

              <div className="mt-6 grid gap-3 text-[14px] text-brand-navy sm:grid-cols-2">
                <a
                  href={`tel:${founder.phone.replace(/\s+/g, "")}`}
                  className="flex items-center gap-2.5 transition hover:text-brand"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/theme/phone-orange.svg"
                    alt=""
                    width={18}
                    height={18}
                    className="h-4 w-4 shrink-0"
                  />
                  <span className="font-medium">{founder.phone}</span>
                </a>

                <a
                  href={`https://api.whatsapp.com/send?phone=${founder.whatsapp.replace(/[^\d]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 transition hover:text-brand"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/theme/WhatsApp.svg"
                    alt=""
                    width={18}
                    height={18}
                    className="h-4 w-4 shrink-0"
                  />
                  <span className="font-medium">{founder.whatsapp}</span>
                </a>

                <a
                  href={`mailto:${founder.email}`}
                  className="flex items-center gap-2.5 transition hover:text-brand"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/theme/mailing.svg"
                    alt=""
                    width={18}
                    height={18}
                    className="h-4 w-4 shrink-0"
                  />
                  <span className="font-medium">{founder.email}</span>
                </a>

                <div className="flex items-center gap-2.5">
                  <span className="text-[15px]" aria-hidden="true">
                    📍
                  </span>
                  <span className="font-medium">{founder.office}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Digital Business Card preview */}
            <div className="flex flex-col items-center justify-center lg:col-span-5">
              <div className="group relative w-full max-w-[420px] overflow-hidden rounded-[8px] border border-brand/20 shadow-panel transition hover:shadow-2xl">
                <Image
                  src={founder.cardImage}
                  alt={`${founder.name} – Business Card`}
                  width={1024}
                  height={616}
                  className="h-auto w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                />
              </div>
              <p className="mt-2 text-center text-[12px] text-brand-navy/60">
                {locale === "fr"
                  ? "Carte professionnelle officielle – Irvin Dulberg"
                  : "Official business card – Irvin Dulberg"}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function ColumnImage({
  column,
  priority,
}: {
  column: AboutColumn;
  priority?: boolean;
}) {
  const isSvg = column.image.src.endsWith(".svg");

  return (
    <div className="mt-8">
      {isSvg ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={column.image.src}
          alt={column.image.alt}
          width={column.image.width}
          height={column.image.height}
          loading="lazy"
          className="h-auto w-full max-w-[560px]"
        />
      ) : (
        <Image
          src={column.image.src}
          alt={column.image.alt}
          width={column.image.width}
          height={column.image.height}
          sizes="(min-width: 1024px) 45vw, 100vw"
          priority={priority}
          className="h-auto w-full max-w-[640px]"
        />
      )}
    </div>
  );
}
