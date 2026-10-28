import Image from "next/image";
import type { Locale } from "@/types";
import { homeContent, type AboutColumn } from "@/lib/content/home";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function AboutSection({ locale }: { locale: Locale }) {
  const content = homeContent[locale].about;

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
