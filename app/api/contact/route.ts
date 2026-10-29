import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { saveLead, updateLeadEmailStatus } from "@/lib/db/leads";

export const runtime = "nodejs";

interface ContactPayload {
  name?: unknown;
  surname?: unknown;
  phone?: unknown;
  mail?: unknown;
  companyname?: unknown;
  msg?: unknown;
  polit?: unknown;
  website?: unknown;
  locale?: unknown;
  source?: unknown;
  formData?: unknown;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+()\d][\d\s().-]{5,21}$/;

const LIMIT_WINDOW_MS = 10 * 60 * 1000;
const LIMIT_MAX = 5;
const attempts = new Map<string, { count: number; resetAt: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = attempts.get(ip);
  if (!entry || entry.resetAt < now) {
    attempts.set(ip, { count: 1, resetAt: now + LIMIT_WINDOW_MS });
    return false;
  }
  entry.count += 1;
  if (attempts.size > 5000) {
    for (const [key, value] of attempts) {
      if (value.resetAt < now) attempts.delete(key);
    }
  }
  return entry.count > LIMIT_MAX;
}

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function singleLine(value: string): string {
  return value.replace(/[\r\n]+/g, " ");
}

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      { ok: false, code: "validation_error", message: "Invalid JSON body." },
      { status: 400 },
    );
  }

  // Honeypot: accept silently so bots cannot tell they were rejected.
  if (asString(payload.website)) {
    return NextResponse.json({ ok: true });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      {
        ok: false,
        code: "rate_limited",
        message: "Too many requests. Please try again later.",
      },
      { status: 429 },
    );
  }

  const name = asString(payload.name);
  const surname = asString(payload.surname);
  const phone = asString(payload.phone);
  const mail = asString(payload.mail).toLowerCase();
  const companyname = asString(payload.companyname);
  const msg = asString(payload.msg);
  const consent = payload.polit === true;
  const locale = payload.locale === "en" ? "en" : "fr";
  const source = asString(payload.source).slice(0, 200) || "AdvenSystem.lu";

  const errors: string[] = [];
  if (name.length < 1 || name.length > 30) errors.push("name");
  if (surname.length < 1 || surname.length > 30) errors.push("surname");
  if (!PHONE_RE.test(phone) || phone.length > 25) errors.push("phone");
  if (!EMAIL_RE.test(mail) || mail.length > 254) errors.push("mail");
  if (companyname.length > 80) errors.push("companyname");
  if (msg.length < 2 || msg.length > 4000) errors.push("msg");
  if (!consent) errors.push("polit");

  if (errors.length > 0) {
    return NextResponse.json(
      {
        ok: false,
        code: "validation_error",
        message:
          locale === "en"
            ? "Some information is missing or invalid."
            : "Certaines informations sont incomplètes ou invalides.",
        fields: errors,
      },
      { status: 400 },
    );
  }

  // 1. Immediately persist lead to database storage (leads.json & leads.csv)
  const stored = await saveLead({
    name,
    surname,
    phone,
    mail,
    companyname,
    msg,
    locale,
    source,
    ip,
    emailSent: false,
  });

  // 2. If SMTP is configured, send the notification email
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const port = Number(process.env.SMTP_PORT || 587);
  const secure = process.env.SMTP_SECURE === "true";
  const from = process.env.SMTP_FROM || user;
  const to = process.env.CONTACT_TO || "contact@advensystem.lu";

  if (host && user && pass && from) {
    const subject =
      locale === "en"
        ? `Website lead – ${singleLine(name)} ${singleLine(surname)}`
        : `Nouveau contact site web – ${singleLine(name)} ${singleLine(surname)}`;

    const text = [
      `Nom: ${name} ${surname}`,
      `E-mail: ${mail}`,
      `Téléphone: ${phone}`,
      `Société: ${companyname || "—"}`,
      `Langue: ${locale.toUpperCase()}`,
      `Source: ${source}`,
      `ID Lead: ${stored.id}`,
      "",
      "Message:",
      msg,
    ].join("\n");

    const html = `
      <h2 style="font-family:Arial,sans-serif;color:#00226E;margin:0 0 16px">Nouveau contact reçu depuis le site</h2>
      <table style="font-family:Arial,sans-serif;font-size:14px;color:#0B2349;border-collapse:collapse">
        <tr><td style="padding:4px 12px 4px 0"><strong>Nom</strong></td><td>${escapeHtml(name)} ${escapeHtml(surname)}</td></tr>
        <tr><td style="padding:4px 12px 4px 0"><strong>E-mail</strong></td><td><a href="mailto:${escapeHtml(mail)}">${escapeHtml(mail)}</a></td></tr>
        <tr><td style="padding:4px 12px 4px 0"><strong>Téléphone</strong></td><td><a href="tel:${escapeHtml(phone)}">${escapeHtml(phone)}</a></td></tr>
        <tr><td style="padding:4px 12px 4px 0"><strong>Société</strong></td><td>${escapeHtml(companyname || "—")}</td></tr>
        <tr><td style="padding:4px 12px 4px 0"><strong>Langue</strong></td><td>${escapeHtml(locale.toUpperCase())}</td></tr>
        <tr><td style="padding:4px 12px 4px 0"><strong>Source</strong></td><td>${escapeHtml(source)}</td></tr>
        <tr><td style="padding:4px 12px 4px 0"><strong>ID Suivi</strong></td><td><code>${escapeHtml(stored.id)}</code></td></tr>
      </table>
      <div style="font-family:Arial,sans-serif;font-size:14px;color:#0B2349;margin-top:20px;padding:12px;background:#f5f7fc;border-left:4px solid #003ABD">
        <strong>Message :</strong>
        <p style="white-space:pre-wrap;margin-top:8px">${escapeHtml(msg)}</p>
      </div>
    `;

    try {
      const transporter = nodemailer.createTransport({
        host,
        port: Number.isFinite(port) ? port : 587,
        secure,
        auth: { user, pass },
      });

      await transporter.sendMail({
        from,
        to,
        replyTo: mail,
        subject,
        text,
        html,
      });

      updateLeadEmailStatus(stored.id, true);
    } catch (error) {
      console.error("[contact] Failed to deliver notification email (lead is safely saved)", error);
      updateLeadEmailStatus(
        stored.id,
        false,
        error instanceof Error ? error.message : String(error),
      );
    }
  } else {
    console.info(
      `[contact] SMTP not configured. Lead ${stored.id} safely stored in database (data/leads.json & data/leads.csv).`,
    );
  }

  return NextResponse.json({
    ok: true,
    id: stored.id,
    message:
      locale === "en"
        ? "The request was sent successfully. We will contact you soon, thank you!"
        : "La demande a été envoyée avec succès. Nous prendrons contact avec vous bientôt, merci !",
  });
}
