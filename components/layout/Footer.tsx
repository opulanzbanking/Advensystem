import type { Locale } from "@/types";
import { company } from "@/lib/site";
import { Container } from "@/components/ui/Container";

export function Footer({ locale }: { locale: Locale }) {
  const isFr = locale === "fr";

  return (
    <footer id="contacts" className="footer-pattern text-white shadow-panel">
      <Container>
        <div className="pb-14 pt-16 lg:pb-[70px] lg:pt-[70px]">
          <h2 className="section-title text-white">
            {isFr ? "Contact" : "Contact"}
          </h2>

          <div className="mt-10 flex flex-col gap-10 text-center lg:mt-[49px] lg:flex-row lg:items-start lg:gap-0 lg:text-left">
            <div className="shrink-0 lg:mt-[22px] lg:pr-[30px] lg:mr-[60px] xl:mr-[107px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/theme/logo.svg"
                alt={company.name}
                width={279}
                height={53}
                className="mx-auto h-[40px] w-auto lg:mx-0"
              />
            </div>

            <div className="text-[17px] leading-[1.5] lg:mr-[70px] lg:w-[200px] xl:mr-[90px] xl:w-[156px]">
              <p>
                {company.legalName} ({isFr ? "succursale" : "branch"})
                <br />
                {company.address[0]}
                <br />
                {company.address[1]}
              </p>
            </div>

            <div className="text-[17px] leading-[1.5] lg:mr-[70px] lg:w-[380px] xl:mr-[90px]">
              <p>{company.registry}</p>
              <p>{company.authorization}</p>
              <p>
                {isFr
                  ? company.branch
                  : "AdvenSystem SARL is the branch of Advensys Conseil LTD"}
              </p>
            </div>

            <div className="text-[17px] leading-[1.5]">
              <div className="mb-2">
                <div className="flex flex-col items-center gap-1 lg:items-start">
                  <a
                    href={company.phoneHref}
                    className="inline-flex items-center gap-2 text-white hover:text-gold"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/theme/phone-white.svg"
                      alt=""
                      width={20}
                      height={20}
                      className="h-5 w-5"
                    />
                    {company.phone}
                  </a>
                  <a
                    href={company.phoneSecondaryHref}
                    className="inline-flex items-center gap-2 pl-7 text-white hover:text-gold"
                  >
                    {company.phoneSecondary}
                  </a>
                </div>
              </div>
              <div className="mb-4">
                <a
                  href={company.emailHref}
                  className="inline-flex items-center gap-2 text-white hover:text-gold"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/theme/mailing.svg"
                    alt=""
                    width={20}
                    height={20}
                    className="h-5 w-5"
                  />
                  {company.email}
                </a>
              </div>
              <div className="flex items-center justify-center gap-6 lg:justify-start lg:pl-7">
                <a
                  href={company.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="block h-[25px] w-[25px] transition hover:opacity-75"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/theme/WhatsApp-white.svg"
                    alt=""
                    width={25}
                    height={25}
                    className="h-full w-full"
                  />
                </a>
                <a
                  href={company.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="block h-[25px] w-[25px] transition hover:opacity-75"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/theme/Facebook-white.svg"
                    alt=""
                    width={25}
                    height={25}
                    className="h-full w-full"
                  />
                </a>
              </div>
            </div>

            <a
              href="#top"
              aria-label={isFr ? "Revenir en haut" : "Back to top"}
              className="mx-auto block h-[65px] w-[70px] transition hover:-translate-y-1 lg:ml-auto lg:mr-0"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/theme/up.svg"
                alt=""
                width={70}
                height={65}
                className="h-full w-full"
              />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
