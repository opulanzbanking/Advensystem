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
            {isFr ? "Contact & Informations" : "Contact & Information"}
          </h2>

          <div className="mt-10 flex flex-col gap-10 text-center lg:mt-[49px] lg:flex-row lg:items-start lg:gap-0 lg:text-left">
            {/* Logo and brief */}
            <div className="shrink-0 lg:mr-[30px] lg:mt-[10px] xl:mr-[45px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/theme/logo.svg"
                alt={company.name}
                width={279}
                height={53}
                className="mx-auto h-[40px] w-auto lg:mx-0"
              />
              <p className="mt-2 text-[14px] font-medium tracking-[0.5px] text-white/80">
                {isFr ? "19 ans d’activité • Services IT" : "19 years of business • IT services"}
              </p>
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 block text-[14px] text-gold hover:underline"
              >
                {company.websiteDisplay}
              </a>
            </div>

            {/* Addresses: Head office, Business center & Executive office */}
            <div className="text-[15px] leading-[1.5] lg:mr-[30px] lg:w-[250px] xl:mr-[45px] xl:w-[270px]">
              <p className="font-bold text-white">
                {company.legalName}
              </p>
              <div className="mt-2 text-white/90">
                <span className="block text-[12px] font-bold uppercase tracking-[1px] text-gold">
                  {isFr ? "Siège social :" : "Head office :"}
                </span>
                <span>{company.headOffice}</span>
              </div>
              <div className="mt-2.5 text-white/90">
                <span className="block text-[12px] font-bold uppercase tracking-[1px] text-gold">
                  {isFr ? "Centre d'affaires :" : "Business center :"}
                </span>
                <span>{company.businessCenter}</span>
              </div>
              <div className="mt-2.5 text-white/90">
                <span className="block text-[12px] font-bold uppercase tracking-[1px] text-gold">
                  {isFr ? "Direction / Bureau Luxembourg :" : "Executive office :"}
                </span>
                <span>{company.executiveOffice}</span>
              </div>
            </div>

            {/* Legal / Licensing / Registration */}
            <div className="text-[15px] leading-[1.5] lg:mr-[30px] lg:w-[230px] xl:mr-[45px] xl:w-[250px]">
              <div className="text-white/90">
                <span className="block text-[12px] font-bold uppercase tracking-[1px] text-gold">
                  {isFr ? "Autorisation d’établissement :" : "License number :"}
                </span>
                <span>{company.authorization}</span>
              </div>
              <div className="mt-3 text-white/90">
                <span className="block text-[12px] font-bold uppercase tracking-[1px] text-gold">
                  {isFr ? "Registre de commerce Luxembourg :" : "Register of commerce Luxembourg :"}
                </span>
                <span>{company.registry}</span>
              </div>
              <div className="mt-3 text-[13px] text-white/70">
                <p>
                  {isFr
                    ? "Service de portage salarial for professional companies"
                    : "Wage portage service for professional companies"}
                </p>
              </div>
            </div>

            {/* Direct contact and Socials */}
            <div className="text-[15px] leading-[1.5]">
              <div className="mb-2.5">
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
                    className="inline-flex items-center gap-2 pl-7 text-[14px] text-white/80 hover:text-gold"
                  >
                    {company.phoneSecondary}
                  </a>
                </div>
              </div>

              <div className="mb-3 space-y-1">
                <div>
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
                <div className="pl-7">
                  <a
                    href={company.founder.emailHref}
                    className="text-[13px] text-white/80 hover:text-gold"
                  >
                    {company.founder.name} : {company.founder.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center justify-center gap-4 lg:justify-start lg:pl-7">
                <a
                  href={company.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[13px] text-white transition hover:bg-white/20"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/theme/WhatsApp-white.svg"
                    alt=""
                    width={20}
                    height={20}
                    className="h-5 w-5"
                  />
                  <span>WhatsApp</span>
                </a>
                <a
                  href={company.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[13px] text-white transition hover:bg-white/20"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/theme/Facebook-white.svg"
                    alt=""
                    width={20}
                    height={20}
                    className="h-5 w-5"
                  />
                  <span>Facebook</span>
                </a>
              </div>
            </div>

            {/* Back to top */}
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
