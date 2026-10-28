"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  company,
  isPortagePath,
  localeFromPath,
  navItems,
  routes,
} from "@/lib/site";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";

export function Header() {
  const pathname = usePathname() ?? "/";
  const locale = localeFromPath(pathname);
  const portage = isPortagePath(pathname);
  const items = navItems(locale);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const isActive = (href: string) => {
    if (href === routes.home[locale]) return !portage;
    if (href === routes.portage[locale]) return portage;
    return false;
  };

  return (
    <header
      id="top"
      className={cn(
        "absolute inset-x-0 top-0 z-50",
        portage
          ? "bg-white shadow-[0_2px_16px_rgba(0,0,0,0.10)]"
          : "bg-transparent",
        open && "max-xl:bg-white max-xl:shadow-[0_2px_16px_rgba(0,0,0,0.10)]",
      )}
    >
      <Container>
        <div className="flex items-center justify-between gap-4 py-5 sm:py-7 xl:py-[26px]">
          <Link
            href={routes.home[locale]}
            aria-label={`${company.name} – ${locale === "fr" ? "Accueil" : "Home"}`}
            className="relative z-10 block shrink-0"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/theme/logo.svg"
              alt={company.name}
              width={278}
              height={53}
              className="h-[38px] w-auto sm:h-[44px] 2xl:h-[46px]"
            />
          </Link>

          <nav
            aria-label={locale === "fr" ? "Navigation principale" : "Main navigation"}
            className="hidden flex-1 items-center justify-center gap-4 xl:flex 2xl:gap-5"
          >
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "whitespace-nowrap text-[14px] font-normal leading-6 transition hover:font-semibold 2xl:text-[16px]",
                  portage
                    ? isActive(item.href)
                      ? "font-semibold text-brand"
                      : "text-brand-navy hover:text-brand"
                    : isActive(item.href)
                      ? "font-semibold text-brand"
                      : "text-brand-navy hover:text-brand",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3 sm:gap-4 xl:gap-5">
            <a
              href={company.phoneHref}
              className="group hidden text-right min-[1440px]:block"
              aria-label={`${locale === "fr" ? "Appelez-nous" : "Call us"} ${company.phone}`}
            >
              <span className="relative block pl-6 text-[16px] font-medium leading-6 text-brand-navy transition group-hover:text-brand 2xl:text-[18px]">
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-1/2 h-[17px] w-[17px] -translate-y-1/2 bg-[url('/images/theme/phone-orange.svg')] bg-contain bg-center bg-no-repeat"
                />
                {company.phone}
              </span>
              <span className="mt-0.5 block text-[11px] font-medium uppercase tracking-[1px] text-brand-navy/40">
                {locale === "fr" ? "Rappelez-moi" : "Call me back"}
              </span>
            </a>

            <div className="flex items-center gap-1.5" aria-label="Langue / Language">
              {(["fr", "en"] as const).map((target) => (
                <Link
                  key={target}
                  href={
                    portage ? routes.portage[target] : routes.home[target]
                  }
                  hrefLang={target}
                  lang={target}
                  aria-current={locale === target ? "true" : undefined}
                  className={cn(
                    "flex h-[28px] w-[28px] items-center justify-center rounded-full border text-[12px] font-bold uppercase tracking-[0.5px] transition sm:h-[30px] sm:w-[30px] sm:text-[13px]",
                    locale === target
                      ? "border-transparent bg-gradient-to-br from-gold to-coral text-white"
                      : portage
                        ? "border-accent text-accent hover:border-transparent hover:bg-gradient-to-br hover:from-gold hover:to-coral hover:text-white"
                        : "border-brand/25 text-brand hover:border-transparent hover:bg-gradient-to-br hover:from-gold hover:to-coral hover:text-white",
                  )}
                >
                  {target.toUpperCase()}
                </Link>
              ))}
            </div>

            <div className="hidden items-center gap-3 2xl:flex">
              <a
                href={company.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="block h-[26px] w-[26px] transition hover:opacity-75"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/theme/WhatsApp.svg"
                  alt=""
                  width={30}
                  height={30}
                  className="h-full w-full"
                />
              </a>
              <a
                href={company.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="block h-[26px] w-[26px] transition hover:opacity-75"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/theme/Facebook.svg"
                  alt=""
                  width={30}
                  height={30}
                  className="h-full w-full"
                />
              </a>
            </div>

            <button
              type="button"
              aria-expanded={open}
              aria-controls="mobile-navigation"
              aria-label={
                open
                  ? locale === "fr"
                    ? "Fermer le menu"
                    : "Close menu"
                  : locale === "fr"
                    ? "Ouvrir le menu"
                    : "Open menu"
              }
              onClick={() => setOpen((value) => !value)}
              className="flex h-[42px] w-[42px] flex-col items-center justify-center gap-[5px] rounded-full bg-brand text-white transition hover:bg-brand-navy xl:hidden"
            >
              <span
                className={cn(
                  "block h-[2px] w-[20px] bg-white transition",
                  open && "translate-y-[7px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "block h-[2px] w-[20px] bg-white transition",
                  open && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "block h-[2px] w-[20px] bg-white transition",
                  open && "-translate-y-[7px] -rotate-45",
                )}
              />
            </button>
          </div>
        </div>
      </Container>

      <div
        id="mobile-navigation"
        hidden={!open}
        className="border-t border-brand/10 bg-brand-navy text-white xl:hidden"
      >
        <Container>
          <nav
            aria-label={
              locale === "fr" ? "Navigation mobile" : "Mobile navigation"
            }
            className="py-4"
          >
            <ul className="divide-y divide-white/10">
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "block py-3 text-[18px] text-white/90 transition hover:text-white",
                      isActive(item.href) && "font-semibold text-white",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 py-5">
            <a
              href={company.phoneHref}
              className="flex items-center gap-2 text-[17px] font-medium text-white"
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
            <div className="flex items-center gap-3">
              <a
                href={company.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="block h-6 w-6"
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
                className="block h-6 w-6"
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
        </Container>
      </div>
    </header>
  );
}
