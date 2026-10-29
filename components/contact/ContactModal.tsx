"use client";

import {
  forwardRef,
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type InputHTMLAttributes,
  type KeyboardEvent,
} from "react";
import type { Locale } from "@/types";
import { company } from "@/lib/site";
import { cn } from "@/lib/utils";

interface Copy {
  title: string;
  name: string;
  surname: string;
  phone: string;
  mail: string;
  companyname: string;
  message: string;
  consent: string;
  submit: string;
  sending: string;
  close: string;
  required: string;
  invalidEmail: string;
  invalidPhone: string;
  consentRequired: string;
  successTitle: string;
  successText: string;
  errorTitle: string;
  errorGeneric: string;
  errorNotConfigured: string;
  errorValidation: string;
  callAlternative: string;
}

const copy: Record<Locale, Copy> = {
  fr: {
    title: "Contacter",
    name: "Nom*",
    surname: "Prénom*",
    phone: "Numéro de téléphone*",
    mail: "E-mail*",
    companyname: "Nom de la société",
    message: "Message*",
    consent: "Je suis d’accord avec le traitement de mes données personnelles",
    submit: "Envoyer",
    sending: "Envoi…",
    close: "Fermer la fenêtre de contact",
    required: "Merci de compléter tous les champs obligatoires.",
    invalidEmail: "Merci de saisir une adresse e-mail valide.",
    invalidPhone: "Merci de saisir un numéro de téléphone valide.",
    consentRequired: "Merci d’accepter le traitement de vos données personnelles.",
    successTitle: "La demande a été envoyée avec succès",
    successText: "Nous prendrons contact avec vous bientôt, merci !",
    errorTitle: "L’envoi n’a pas abouti",
    errorGeneric:
      "Une erreur est survenue lors de l’envoi. Merci de réessayer ou de nous appeler.",
    errorNotConfigured:
      "Le formulaire n’est pas encore connecté à une messagerie sur cet environnement. Merci de nous appeler ou de nous écrire directement.",
    errorValidation:
      "Certaines informations sont incomplètes ou invalides. Merci de vérifier le formulaire.",
    callAlternative: "Ou appelez-nous au",
  },
  en: {
    title: "Contact",
    name: "Last name*",
    surname: "First name*",
    phone: "Phone number*",
    mail: "E-mail*",
    companyname: "Company name",
    message: "Message*",
    consent: "I agree to the processing of my personal data",
    submit: "Send",
    sending: "Sending…",
    close: "Close the contact window",
    required: "Please complete all required fields.",
    invalidEmail: "Please enter a valid e-mail address.",
    invalidPhone: "Please enter a valid phone number.",
    consentRequired: "Please accept the processing of your personal data.",
    successTitle: "The request was sent successfully",
    successText: "We will contact you soon, thank you!",
    errorTitle: "The message could not be sent",
    errorGeneric:
      "Something went wrong while sending. Please try again or give us a call.",
    errorNotConfigured:
      "The form is not yet connected to a mail service in this environment. Please call or e-mail us directly.",
    errorValidation:
      "Some information is missing or invalid. Please check the form.",
    callAlternative: "Or call us at",
  },
};

type Status = "idle" | "submitting" | "success" | "error";

interface ApiResponse {
  ok?: boolean;
  code?: string;
  message?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+()\d][\d\s().-]{5,21}$/;

export function ContactModal({
  locale,
  source,
  onClose,
}: {
  locale: Locale;
  source: string;
  onClose: () => void;
}) {
  const t = copy[locale];
  const titleId = useId();
  const descriptionId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstFieldRef.current?.focus();

    function handleKeyDown(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
      previouslyFocused.current?.focus();
    };
  }, [onClose]);

  function handleTrapKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "Tab" || !dialogRef.current) return;
    const focusable = Array.from(
      dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([type="hidden"]):not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ),
    ).filter((element) => element.offsetParent !== null);

    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") ?? "").trim();
    const surname = String(data.get("surname") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const mail = String(data.get("mail") ?? "").trim();
    const companyname = String(data.get("companyname") ?? "").trim();
    const msg = String(data.get("msg") ?? "").trim();
    const polit = data.get("polit") === "on";

    if (!name || !surname || !phone || !mail || !msg) {
      setStatus("error");
      setError(t.required);
      return;
    }
    if (!EMAIL_RE.test(mail)) {
      setStatus("error");
      setError(t.invalidEmail);
      return;
    }
    if (!PHONE_RE.test(phone)) {
      setStatus("error");
      setError(t.invalidPhone);
      return;
    }
    if (!polit) {
      setStatus("error");
      setError(t.consentRequired);
      return;
    }

    setStatus("submitting");
    setError("");

    try {
      const response = await fetch("/api/contact/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          surname,
          phone,
          mail,
          companyname,
          msg,
          polit,
          website: String(data.get("website") ?? ""),
          locale,
          source,
          formData: "Call back AdvenSystem.lu",
        }),
      });

      const payload = (await response.json().catch(() => null)) as
        | ApiResponse
        | null;

      if (response.ok && payload?.ok) {
        setStatus("success");
        return;
      }

      setStatus("error");
      if (payload?.code === "not_configured") {
        setError(t.errorNotConfigured);
      } else if (payload?.code === "validation_error") {
        setError(payload.message || t.errorValidation);
      } else {
        setError(t.errorGeneric);
      }
    } catch {
      setStatus("error");
      setError(t.errorGeneric);
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-brand-navy/70 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={status === "success" ? descriptionId : undefined}
        onKeyDown={handleTrapKeyDown}
        className="relative my-auto w-full max-w-[440px] animate-slide-up bg-white bg-[url('/images/theme/bg-form.svg')] bg-cover bg-center shadow-panel"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={t.close}
          className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full text-brand-navy transition hover:bg-brand/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        {status === "success" ? (
          <div className="px-10 py-16 text-center">
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-gold to-coral">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <h2
              id={titleId}
              className="text-[24px] font-medium leading-tight text-brand-navy"
            >
              {t.successTitle}
            </h2>
            <p id={descriptionId} className="mt-4 text-[15px] text-brand-navy/75">
              {t.successText}
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-8 inline-flex min-w-[170px] items-center justify-center rounded-[2px] bg-gradient-to-br from-gold to-coral px-6 py-3 text-[17px] font-medium text-white shadow-card transition hover:brightness-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {t.close}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="px-6 py-10 sm:px-[60px]">
            <h2
              id={titleId}
              className="mb-7 text-center text-[28px] font-medium leading-[1.125] text-brand-navy"
            >
              {t.title}
            </h2>

            <div className="space-y-[15px]">
              <FormField
                ref={firstFieldRef}
                name="name"
                placeholder={t.name}
                autoComplete="family-name"
                minLength={1}
                maxLength={20}
                required
              />
              <FormField
                name="surname"
                placeholder={t.surname}
                autoComplete="given-name"
                minLength={1}
                maxLength={20}
                required
              />
              <FormField
                name="phone"
                type="tel"
                placeholder={t.phone}
                autoComplete="tel"
                minLength={4}
                maxLength={22}
                required
              />
              <FormField
                name="mail"
                type="email"
                placeholder={t.mail}
                autoComplete="email"
                required
              />
              <FormField
                name="companyname"
                placeholder={t.companyname}
                autoComplete="organization"
                maxLength={80}
              />
            </div>

            <label
              htmlFor="contact-msg"
              className="mt-5 block text-[14px] leading-[18px] text-brand"
            >
              {t.message}
            </label>
            <textarea
              id="contact-msg"
              name="msg"
              required
              className="mt-1 h-[110px] w-full resize-y border border-brand bg-transparent px-2.5 py-2 text-[14px] leading-[18px] text-brand outline-none transition placeholder:text-brand/60 focus:border-accent"
            />

            {/* Honeypot: hidden from users and assistive technology */}
            <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
              <label htmlFor="contact-website">Website</label>
              <input
                id="contact-website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div className="mt-4 text-center">
              <label className="relative inline-block cursor-pointer text-[13px] leading-[18px] text-brand-navy">
                <input
                  name="polit"
                  type="checkbox"
                  required
                  className="peer absolute left-0 top-[2px] h-[17px] w-[17px] cursor-pointer appearance-none rounded-[2px] border border-brand-navy/50 bg-white/60 checked:border-brand checked:bg-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                />
                <span className="block pl-[24px] text-left">{t.consent}</span>
              </label>
            </div>

            <div aria-live="polite" className="mt-4">
              {status === "error" && error ? (
                <div className="rounded-[3px] border border-red-200 bg-red-50 px-3 py-2.5 text-left text-[13px] leading-[18px] text-red-800">
                  <p className="font-semibold">{t.errorTitle}</p>
                  <p className="mt-1">{error}</p>
                  <p className="mt-2">
                    {t.callAlternative}{" "}
                    <a
                      href={company.phoneHref}
                      className="font-semibold underline underline-offset-2"
                    >
                      {company.phone}
                    </a>
                  </p>
                </div>
              ) : null}
            </div>

            <button
              type="submit"
              disabled={status === "submitting"}
              className={cn(
                "mx-auto mt-6 flex min-w-[170px] items-center justify-center rounded-[2px] bg-gradient-to-br from-gold to-coral px-6 py-3 text-[20px] font-normal text-white shadow-card transition hover:brightness-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
                status === "submitting" && "cursor-wait opacity-70",
              )}
            >
              {status === "submitting" ? t.sending : t.submit}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

const FormField = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(function FormField({ className, ...props }, ref) {
  return (
    <input
      ref={ref}
      className={cn(
        "block w-full border-0 border-b border-brand bg-transparent pb-[5px] pt-[13px] text-[14px] leading-[18px] text-brand outline-none transition placeholder:text-brand/70 focus:border-b-2 focus:border-accent",
        className,
      )}
      {...props}
    />
  );
});
