import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

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
  if (name.length < 1 || name.length > 20) errors.push("name");
  if (surname.length < 1 || surname.length > 20) errors.push("surname");
  if (!PHONE_RE.test(phone) || phone.length > 22) errors.push("phone");
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

  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const port = Number(process.env.SMTP_PORT || 587);
  const secure = process.env.SMTP_SECURE === "true";
  const from = process.env.SMTP_FROM || user;
  const to = process.env.CONTACT_TO || "contact@advensystem.lu";

  if (!host || !user || !pass || !from) {
    return NextResponse.json(
      {
        ok: false,
        code: "not_configured",
        message:
          locale === "en"
            ? "The contact form is not connected to a mail service yet."
            : "Le formulaire de contact n’est pas encore connecté à une messagerie.",
      },
      { status: 503 },
    );
  }

  const subject =
    locale === "en"
      ? `Website contact – ${singleLine(name)} ${singleLine(surname)}`
      : `Contact site web – ${singleLine(name)} ${singleLine(surname)}`;

  const text = [
    `Name: ${name} ${surname}`,
    `E-mail: ${mail}`,
    `Phone: ${phone}`,
    `Company: ${companyname || "—"}`,
    `Language: ${locale.toUpperCase()}`,
    `Source: ${source}`,
    "",
    "Message:",
    msg,
  ].join("\n");

  const html = `
    <h2 style="font-family:Arial,sans-serif;color:#00226E;margin:0 0 16px">New contact request</h2>
    <table style="font-family:Arial,sans-serif;font-size:14px;color:#0B2349;border-collapse:collapse">
      <tr><td style="padding:4px 12px 4px 0"><strong>Name</strong></td><td>${escapeHtml(name)} ${escapeHtml(surname)}</td></tr>
      <tr><td style="padding:4px 12px 4px 0"><strong>E-mail</strong></td><td>${escapeHtml(mail)}</td></tr>
      <tr><td style="padding:4px 12px 4px 0"><strong>Phone</strong></td><td>${escapeHtml(phone)}</td></tr>
      <tr><td style="padding:4px 12px 4px 0"><strong>Company</strong></td><td>${escapeHtml(companyname || "—")}</td></tr>
      <tr><td style="padding:4px 12px 4px 0"><strong>Language</strong></td><td>${escapeHtml(locale.toUpperCase())}</td></tr>
      <tr><td style="padding:4px 12px 4px 0"><strong>Source</strong></td><td>${escapeHtml(source)}</td></tr>
    </table>
    <p style="font-family:Arial,sans-serif;font-size:14px;color:#0B2349;white-space:pre-wrap;margin-top:20px">${escapeHtml(msg)}</p>
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

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[contact] Failed to send contact e-mail", error);
    return NextResponse.json(
      {
        ok: false,
        code: "send_failed",
        message:
          locale === "en"
            ? "The message could not be delivered."
            : "Le message n’a pas pu être délivré.",
      },
      { status: 502 },
    );
  }
}
