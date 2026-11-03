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
const PHONE_RE = /^[+()\d][\d\s().-]{5,25}$/;

const LIMIT_WINDOW_MS = 10 * 60 * 1000;
const LIMIT_MAX = 10;
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

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      Allow: "POST, OPTIONS",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

export async function POST(request: Request) {
  try {
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

    // 1. Persist lead safely across memory, primary disk and serverless fallback
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

    console.log(
      `[contact] 📋 [NEW INQUIRY SAVED] ID: ${stored.id} | From: ${name} ${surname} (${mail}, ${phone}) | Storage: ${stored.storageTarget}`,
    );

    // 2. Prepare email content
    const to = process.env.CONTACT_TO || "contact@advensystem.lu";
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

    let emailDelivered = false;
    let emailProvider: "resend" | "smtp" | "none" = "none";
    let emailStatusText = "Pending / Not Configured";
    let emailMessageId: string | undefined;

    // --- OPTION 1: Resend (Primary) ---
    const resendApiKey = process.env.RESEND_API_KEY;
    const resendFrom = process.env.RESEND_FROM || "AdvenSystem <onboarding@resend.dev>";

    if (resendApiKey) {
      console.log(
        `[contact] 📤 [RESEND] Sending email notification to ${to} (from: ${resendFrom})...`,
      );
      try {
        const resendRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendApiKey.trim()}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: resendFrom,
            to: [to],
            reply_to: mail,
            subject,
            text,
            html,
          }),
        });

        if (resendRes.ok) {
          const resData = (await resendRes.json().catch(() => ({}))) as {
            id?: string;
          };
          emailDelivered = true;
          emailProvider = "resend";
          emailMessageId = resData.id;
          emailStatusText = `Sent via Resend (${resData.id || "ok"})`;

          console.log(
            `[contact] ✅ [RESEND SUCCESS] Email delivered to ${to}! Message ID: ${resData.id || "N/A"}`,
          );

          updateLeadEmailStatus(stored.id, {
            sent: true,
            provider: "resend",
            statusText: emailStatusText,
            messageId: resData.id,
          });
        } else {
          const errText = await resendRes.text();
          console.error(
            `[contact] ❌ [RESEND FAILED] API returned status ${resendRes.status}: ${errText}`,
          );
          emailStatusText = `Resend Failed (${resendRes.status})`;
        }
      } catch (resendErr) {
        console.error("[contact] ❌ [RESEND EXCEPTION]", resendErr);
        emailStatusText = `Resend Exception: ${resendErr instanceof Error ? resendErr.message : String(resendErr)}`;
      }
    }

    // --- OPTION 2: SMTP (Fallback if Resend is not set or failed) ---
    const host = process.env.SMTP_HOST;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const port = Number(process.env.SMTP_PORT || 587);
    const secure = process.env.SMTP_SECURE === "true" || port === 465;
    const from = process.env.SMTP_FROM || user || "contact@advensystem.lu";

    if (!emailDelivered && host && user && pass) {
      console.log(
        `[contact] 📤 [SMTP] Sending email notification via ${host}:${port} to ${to}...`,
      );
      try {
        const transporter = nodemailer.createTransport({
          host,
          port: Number.isFinite(port) ? port : 587,
          secure,
          auth: { user, pass },
        });

        const info = await transporter.sendMail({
          from,
          to,
          replyTo: mail,
          subject,
          text,
          html,
        });

        emailDelivered = true;
        emailProvider = "smtp";
        emailMessageId = info.messageId;
        emailStatusText = `Sent via SMTP (${info.messageId || "ok"})`;

        console.log(
          `[contact] ✅ [SMTP SUCCESS] Email delivered to ${to}! Message ID: ${info.messageId || "N/A"}`,
        );

        updateLeadEmailStatus(stored.id, {
          sent: true,
          provider: "smtp",
          statusText: emailStatusText,
          messageId: info.messageId,
        });
      } catch (smtpErr) {
        console.error("[contact] ❌ [SMTP FAILED]", smtpErr);
        emailStatusText = `SMTP Failed: ${smtpErr instanceof Error ? smtpErr.message : String(smtpErr)}`;
        updateLeadEmailStatus(stored.id, {
          sent: false,
          provider: "smtp",
          statusText: emailStatusText,
          error: smtpErr instanceof Error ? smtpErr.message : String(smtpErr),
        });
      }
    }

    if (!emailDelivered) {
      if (!resendApiKey && !(host && user && pass)) {
        console.warn(
          `[contact] ⚠️ [EMAIL NOT CONFIGURED] Neither RESEND_API_KEY nor SMTP credentials found in environment. Lead ${stored.id} is safely stored in leads.csv and leads.json.`,
        );
        emailStatusText = "Pending (No email credentials set in env)";
        updateLeadEmailStatus(stored.id, {
          sent: false,
          provider: "none",
          statusText: emailStatusText,
        });
      }
    }

    return NextResponse.json({
      ok: true,
      id: stored.id,
      emailDelivered,
      emailProvider,
      emailStatus: emailStatusText,
      emailMessageId,
      message:
        locale === "en"
          ? "The request was sent successfully. We will contact you soon, thank you!"
          : "La demande a été envoyée avec succès. Nous prendrons contact avec vous bientôt, merci !",
    });
  } catch (error) {
    console.error("[contact] Unexpected error processing contact form", error);
    return NextResponse.json(
      {
        ok: false,
        code: "internal_error",
        message:
          "Une erreur inattendue est survenue. Veuillez nous contacter directement au +352 661 11 22 60 ou par e-mail à contact@advensystem.lu.",
      },
      { status: 500 },
    );
  }
}
