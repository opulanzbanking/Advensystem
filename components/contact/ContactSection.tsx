"use client";

import { useState, type FormEvent } from "react";
import type { Locale } from "@/types";
import { company } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";

interface ContactSectionProps {
  locale: Locale;
}

const copy = {
  fr: {
    badge: "PARLONS DE VOTRE PROJET",
    title: "CONTACTEZ NOTRE ÉQUIPE",
    subtitle:
      "Une question, un projet IT ou un besoin en portage salarial ? Nos experts locaux au Luxembourg vous répondent sous 24h ouvrées.",
    name: "Nom*",
    surname: "Prénom*",
    phone: "Numéro de téléphone*",
    mail: "E-mail*",
    companyname: "Nom de la société",
    message: "Message*",
    messagePlaceholder:
      "Décrivez brièvement votre projet, vos objectifs ou vos questions…",
    consent:
      "Je suis d’accord avec le traitement de mes données personnelles dans le cadre de ma demande.",
    submit: "Envoyer ma demande",
    sending: "Envoi en cours…",
    requiredFields: "Merci de renseigner tous les champs obligatoires marqués d'un *.",
    invalidEmail: "Merci de saisir une adresse e-mail valide.",
    invalidPhone: "Merci de saisir un numéro de téléphone valide.",
    consentRequired:
      "Merci d'accepter le traitement des données personnelles pour poursuivre.",
    successTitle: "Demande reçue avec succès !",
    successText:
      "Merci pour votre confiance. Nos experts ont bien reçu votre message et prendront contact avec vous très rapidement.",
    sendAnother: "Envoyer un autre message",
    directContact: "Coordonnées directes",
    offices: "Nos implantations au Luxembourg",
    guarantee: "Réponse sous 24h ouvrées",
    madeInLux: "Made in Luxembourg • Experts locaux",
  },
  en: {
    badge: "LET’S DISCUSS YOUR PROJECT",
    title: "CONTACT OUR TEAM",
    subtitle:
      "Have a question, an IT project, or payroll portage needs? Our local Luxembourg experts reply within 24 business hours.",
    name: "Last name*",
    surname: "First name*",
    phone: "Phone number*",
    mail: "E-mail*",
    companyname: "Company name",
    message: "Message*",
    messagePlaceholder:
      "Briefly describe your project, timeline, or requirements…",
    consent:
      "I agree to the processing of my personal data regarding this inquiry.",
    submit: "Send inquiry",
    sending: "Sending…",
    requiredFields: "Please fill out all mandatory fields marked with *.",
    invalidEmail: "Please provide a valid e-mail address.",
    invalidPhone: "Please provide a valid phone number.",
    consentRequired: "Please accept the data processing terms to proceed.",
    successTitle: "Inquiry received successfully!",
    successText:
      "Thank you for reaching out. Our team has received your message and will get back to you shortly.",
    sendAnother: "Send another inquiry",
    directContact: "Direct Contact",
    offices: "Our Luxembourg Offices",
    guarantee: "Response within 24 business hours",
    madeInLux: "Made in Luxembourg • Local Experts",
  },
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+()\d][\d\s().-]{5,25}$/;

export function ContactSection({ locale }: ContactSectionProps) {
  const t = copy[locale];

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [mail, setMail] = useState("");
  const [companyname, setCompanyname] = useState("");
  const [msg, setMsg] = useState("");
  const [polit, setPolit] = useState(false);
  const [website, setWebsite] = useState(""); // Honeypot bot protection

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);

    // Validation
    if (!name.trim() || !surname.trim() || !phone.trim() || !mail.trim() || !msg.trim()) {
      setErrorMessage(t.requiredFields);
      return;
    }
    if (!EMAIL_RE.test(mail.trim())) {
      setErrorMessage(t.invalidEmail);
      return;
    }
    if (!PHONE_RE.test(phone.trim())) {
      setErrorMessage(t.invalidPhone);
      return;
    }
    if (!polit) {
      setErrorMessage(t.consentRequired);
      return;
    }

    setStatus("submitting");

    try {
      const res = await fetch("/api/contact/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          surname: surname.trim(),
          phone: phone.trim(),
          mail: mail.trim(),
          companyname: companyname.trim(),
          msg: msg.trim(),
          polit: true,
          website: website.trim(), // bot check
          locale,
          source: `${locale.toUpperCase()} In-page contact section`,
        }),
      });

      const data = await res.json().catch(() => null);

      if (res.ok && data?.ok) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage(
          data?.message ||
            (locale === "fr"
              ? "Une erreur est survenue lors de l'enregistrement. Merci de nous contacter directement par téléphone."
              : "An error occurred while saving your message. Please reach out via phone."),
        );
      }
    } catch {
      setStatus("error");
      setErrorMessage(
        locale === "fr"
          ? "Impossible de contacter le serveur pour le moment. Merci de nous appeler au " + company.phone
          : "Unable to reach server right now. Please call us at " + company.phone,
      );
    }
  }

  function handleReset() {
    setName("");
    setSurname("");
    setPhone("");
    setMail("");
    setCompanyname("");
    setMsg("");
    setPolit(false);
    setStatus("idle");
    setErrorMessage(null);
  }

  return (
    <section
      id="contacts"
      className="scroll-mt-20 bg-gradient-to-b from-white via-[#f7f9fd] to-white py-16 lg:py-24"
    >
      <Container>
        <div className="text-center">
          <span className="inline-block rounded-full border border-brand/20 bg-brand/5 px-4 py-1 text-[12px] font-bold uppercase tracking-[2px] text-brand">
            {t.badge}
          </span>
          <SectionTitle className="mt-3.5">{t.title}</SectionTitle>
          <p className="mx-auto mt-4 max-w-[800px] text-[18px] leading-[1.5] text-brand-navy sm:text-[20px]">
            {t.subtitle}
          </p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-12">
          {/* Left Column: Direct Contact & Locations */}
          <div className="lg:col-span-5">
            <div className="rounded-[8px] border border-brand/15 bg-white p-6 shadow-card sm:p-8">
              <h3 className="text-[20px] font-bold text-brand-navy sm:text-[22px]">
                {t.directContact}
              </h3>

              <div className="mt-6 space-y-4">
                <a
                  href={company.phoneHref}
                  className="flex items-center gap-3.5 rounded-[6px] border border-brand/10 p-3.5 transition hover:border-brand hover:bg-brand/5"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-white">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/theme/phone-white.svg"
                      alt=""
                      width={18}
                      height={18}
                      className="h-4 w-4"
                    />
                  </span>
                  <div>
                    <span className="block text-[12px] font-bold uppercase tracking-[0.5px] text-brand-navy/60">
                      {locale === "fr" ? "Ligne principale" : "Main line"}
                    </span>
                    <span className="text-[17px] font-bold text-brand-navy">
                      {company.phone}
                    </span>
                  </div>
                </a>

                <a
                  href={company.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 rounded-[6px] border border-brand/10 p-3.5 transition hover:border-green-600 hover:bg-green-50/50"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-600 text-white">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/theme/WhatsApp-white.svg"
                      alt=""
                      width={20}
                      height={20}
                      className="h-5 w-5"
                    />
                  </span>
                  <div>
                    <span className="block text-[12px] font-bold uppercase tracking-[0.5px] text-brand-navy/60">
                      WhatsApp direct
                    </span>
                    <span className="text-[17px] font-bold text-brand-navy">
                      {company.founder.whatsapp}
                    </span>
                  </div>
                </a>

                <a
                  href={company.emailHref}
                  className="flex items-center gap-3.5 rounded-[6px] border border-brand/10 p-3.5 transition hover:border-brand hover:bg-brand/5"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand text-white">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/theme/mailing.svg"
                      alt=""
                      width={18}
                      height={18}
                      className="h-4 w-4"
                    />
                  </span>
                  <div>
                    <span className="block text-[12px] font-bold uppercase tracking-[0.5px] text-brand-navy/60">
                      E-mail général
                    </span>
                    <span className="text-[16px] font-bold text-brand-navy">
                      {company.email}
                    </span>
                  </div>
                </a>
              </div>

              {/* Offices */}
              <div className="mt-8 border-t border-brand/10 pt-6">
                <h4 className="text-[14px] font-bold uppercase tracking-[1px] text-accent">
                  {t.offices}
                </h4>
                <div className="mt-3 space-y-3 text-[14px] leading-[1.5] text-brand-navy">
                  <div>
                    <strong className="block text-brand-navy font-semibold">
                      {locale === "fr" ? "Siège social :" : "Head office :"}
                    </strong>
                    <span className="text-brand-navy/80">{company.headOffice}</span>
                  </div>
                  <div>
                    <strong className="block text-brand-navy font-semibold">
                      {locale === "fr" ? "Centre d'affaires :" : "Business center :"}
                    </strong>
                    <span className="text-brand-navy/80">{company.businessCenter}</span>
                  </div>
                  <div>
                    <strong className="block text-brand-navy font-semibold">
                      {locale === "fr" ? "Bureau exécutif :" : "Executive office :"}
                    </strong>
                    <span className="text-brand-navy/80">{company.executiveOffice}</span>
                  </div>
                </div>
              </div>

              {/* Trust badge */}
              <div className="mt-6 rounded-[6px] bg-brand/5 p-4 text-[13px] text-brand-navy/80">
                <span className="font-bold text-brand">✓ {t.madeInLux}</span>
                <span className="block mt-1">{t.guarantee}</span>
              </div>
            </div>
          </div>

          {/* Right Column: In-page Contact Form */}
          <div className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-[8px] border border-brand/15 bg-white p-7 shadow-card sm:p-10">
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-gold via-accent to-brand"
              />

              {status === "success" ? (
                <div className="py-8 text-center animate-fade-in">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <svg
                      className="h-8 w-8"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="mt-5 text-[24px] font-bold text-brand-navy">
                    {t.successTitle}
                  </h3>
                  <p className="mx-auto mt-3 max-w-[500px] text-[16px] leading-[1.6] text-brand-navy/80">
                    {t.successText}
                  </p>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="mt-8 inline-flex items-center justify-center rounded-[4px] border border-brand px-6 py-2.5 text-[15px] font-semibold text-brand transition hover:bg-brand hover:text-white"
                  >
                    {t.sendAnother}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-[14px] font-semibold text-brand-navy"
                      >
                        {t.name}
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Dupont"
                        className="mt-1.5 w-full rounded-[4px] border border-brand/20 bg-white px-3.5 py-2.5 text-[15px] text-brand-navy placeholder-gray-400 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-surname"
                        className="block text-[14px] font-semibold text-brand-navy"
                      >
                        {t.surname}
                      </label>
                      <input
                        id="contact-surname"
                        type="text"
                        required
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                        placeholder="Jean"
                        className="mt-1.5 w-full rounded-[4px] border border-brand/20 bg-white px-3.5 py-2.5 text-[15px] text-brand-navy placeholder-gray-400 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                      />
                    </div>
                  </div>

                  <div className="mt-5 grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-[14px] font-semibold text-brand-navy"
                      >
                        {t.mail}
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={mail}
                        onChange={(e) => setMail(e.target.value)}
                        placeholder="jean.dupont@entreprise.lu"
                        className="mt-1.5 w-full rounded-[4px] border border-brand/20 bg-white px-3.5 py-2.5 text-[15px] text-brand-navy placeholder-gray-400 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-phone"
                        className="block text-[14px] font-semibold text-brand-navy"
                      >
                        {t.phone}
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+352 ..."
                        className="mt-1.5 w-full rounded-[4px] border border-brand/20 bg-white px-3.5 py-2.5 text-[15px] text-brand-navy placeholder-gray-400 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                      />
                    </div>
                  </div>

                  <div className="mt-5">
                    <label
                      htmlFor="contact-company"
                      className="block text-[14px] font-semibold text-brand-navy"
                    >
                      {t.companyname}
                    </label>
                    <input
                      id="contact-company"
                      type="text"
                      value={companyname}
                      onChange={(e) => setCompanyname(e.target.value)}
                      placeholder="Nom de votre société (optionnel)"
                      className="mt-1.5 w-full rounded-[4px] border border-brand/20 bg-white px-3.5 py-2.5 text-[15px] text-brand-navy placeholder-gray-400 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                    />
                  </div>

                  <div className="mt-5">
                    <label
                      htmlFor="contact-message"
                      className="block text-[14px] font-semibold text-brand-navy"
                    >
                      {t.message}
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={4}
                      value={msg}
                      onChange={(e) => setMsg(e.target.value)}
                      placeholder={t.messagePlaceholder}
                      className="mt-1.5 w-full rounded-[4px] border border-brand/20 bg-white px-3.5 py-2.5 text-[15px] text-brand-navy placeholder-gray-400 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                    />
                  </div>

                  {/* Honeypot field for bot protection */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="contact-website">Website</label>
                    <input
                      id="contact-website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                    />
                  </div>

                  <div className="mt-5 flex items-start gap-3">
                    <input
                      id="contact-consent"
                      type="checkbox"
                      required
                      checked={polit}
                      onChange={(e) => setPolit(e.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-brand/30 text-brand focus:ring-brand"
                    />
                    <label
                      htmlFor="contact-consent"
                      className="text-[13px] leading-[1.5] text-brand-navy/80"
                    >
                      {t.consent}
                    </label>
                  </div>

                  {errorMessage ? (
                    <div className="mt-4 rounded-[4px] bg-red-50 p-3 text-[14px] text-red-700">
                      {errorMessage}
                    </div>
                  ) : null}

                  <div className="mt-6">
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="inline-flex w-full items-center justify-center rounded-[4px] bg-gradient-to-br from-gold to-coral px-8 py-3.5 text-center text-[18px] font-bold text-white shadow-card transition hover:opacity-95 disabled:opacity-50"
                    >
                      {status === "submitting" ? t.sending : t.submit}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

