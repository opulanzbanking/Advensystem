import fs from "fs";
import path from "path";
import os from "os";

export interface StoredLead {
  id: string;
  createdAt: string;
  name: string;
  surname: string;
  phone: string;
  mail: string;
  companyname: string;
  msg: string;
  locale: "fr" | "en";
  source: string;
  ip: string;
  emailSent: boolean;
  emailProvider?: "resend" | "smtp" | "web3forms" | "none";
  emailStatusText?: string;
  emailError?: string;
  emailMessageId?: string;
  storageTarget?: "primary" | "fallback" | "memory";
}

export interface EmailStatusUpdate {
  sent: boolean;
  provider?: "resend" | "smtp" | "web3forms" | "none";
  statusText: string;
  error?: string;
  messageId?: string;
}

// In-memory cache ensures no lead is ever lost even if filesystem is read-only (e.g. Vercel)
const memoryLeads: StoredLead[] = [];

// Primary paths (local development / VPS / dedicated host)
const PRIMARY_DIR = path.join(process.cwd(), "data");
const PRIMARY_JSON = path.join(PRIMARY_DIR, "leads.json");
const PRIMARY_CSV = path.join(PRIMARY_DIR, "leads.csv");

// Secondary paths (Serverless / read-only filesystem environments such as Vercel / Netlify)
const FALLBACK_DIR = path.join(os.tmpdir(), "advensystem-leads");
const FALLBACK_JSON = path.join(FALLBACK_DIR, "leads.json");
const FALLBACK_CSV = path.join(FALLBACK_DIR, "leads.csv");

function safeEnsureDir(dir: string): boolean {
  try {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    return true;
  } catch {
    return false;
  }
}

function escapeCsvCell(val: string): string {
  const clean = (val || "").replace(/"/g, '""');
  return `"${clean}"`;
}

function buildCsvRow(lead: StoredLead): string {
  const emailStatus = lead.emailStatusText || (lead.emailSent ? "Email Sent" : "Pending / Not Configured");
  return (
    [
      escapeCsvCell(lead.createdAt),
      escapeCsvCell(lead.name),
      escapeCsvCell(lead.surname),
      escapeCsvCell(lead.mail),
      escapeCsvCell(lead.phone),
      escapeCsvCell(lead.companyname || "—"),
      escapeCsvCell(lead.locale.toUpperCase()),
      escapeCsvCell(lead.source),
      escapeCsvCell(lead.msg.replace(/[\r\n]+/g, " ")),
      escapeCsvCell(emailStatus),
    ].join(",") + "\n"
  );
}

const CSV_HEADER =
  "\uFEFFDate,Nom,Prénom,Email,Téléphone,Société,Langue,Source,Message,Statut_Email\n";

export async function saveLead(
  leadData: Omit<StoredLead, "id" | "createdAt">,
): Promise<StoredLead> {
  const id = `lead_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
  const createdAt = new Date().toISOString();

  const newLead: StoredLead = {
    id,
    createdAt,
    ...leadData,
    emailStatusText: leadData.emailStatusText || "Processing...",
    storageTarget: "memory",
  };

  // Always keep in memory so it's instantly retrievable
  memoryLeads.unshift(newLead);

  // Attempt 1: Save to primary workspace directory (leads.json & leads.csv)
  let savedToDisk = false;
  if (safeEnsureDir(PRIMARY_DIR)) {
    try {
      let allLeads: StoredLead[] = [];
      if (fs.existsSync(PRIMARY_JSON)) {
        try {
          const content = fs.readFileSync(PRIMARY_JSON, "utf8");
          allLeads = JSON.parse(content);
        } catch {
          allLeads = [];
        }
      }
      allLeads.unshift(newLead);
      fs.writeFileSync(PRIMARY_JSON, JSON.stringify(allLeads, null, 2), "utf8");

      // Append to CSV
      const csvRow = buildCsvRow(newLead);
      if (!fs.existsSync(PRIMARY_CSV)) {
        fs.writeFileSync(PRIMARY_CSV, CSV_HEADER + csvRow, "utf8");
      } else {
        fs.appendFileSync(PRIMARY_CSV, csvRow, "utf8");
      }

      newLead.storageTarget = "primary";
      savedToDisk = true;
    } catch (primaryErr) {
      console.warn(
        "[leads] Primary disk write failed (locked or read-only), trying fallback /tmp path...",
        primaryErr instanceof Error ? primaryErr.message : primaryErr,
      );
    }
  }

  // Attempt 2: Fallback to /tmp if primary failed (e.g. read-only filesystem on Vercel)
  if (!savedToDisk && safeEnsureDir(FALLBACK_DIR)) {
    try {
      let allFallback: StoredLead[] = [];
      if (fs.existsSync(FALLBACK_JSON)) {
        try {
          allFallback = JSON.parse(fs.readFileSync(FALLBACK_JSON, "utf8"));
        } catch {
          allFallback = [];
        }
      }
      allFallback.unshift(newLead);
      fs.writeFileSync(FALLBACK_JSON, JSON.stringify(allFallback, null, 2), "utf8");

      const csvRow = buildCsvRow(newLead);
      if (!fs.existsSync(FALLBACK_CSV)) {
        fs.writeFileSync(FALLBACK_CSV, CSV_HEADER + csvRow, "utf8");
      } else {
        fs.appendFileSync(FALLBACK_CSV, csvRow, "utf8");
      }

      newLead.storageTarget = "fallback";
      savedToDisk = true;
    } catch (fallbackErr) {
      console.warn(
        "[leads] Fallback disk write also unavailable, lead kept safely in memory.",
        fallbackErr instanceof Error ? fallbackErr.message : fallbackErr,
      );
    }
  }

  return newLead;
}

export function updateLeadEmailStatus(
  id: string,
  update: EmailStatusUpdate | boolean,
  legacyError?: string,
) {
  const normUpdate: EmailStatusUpdate =
    typeof update === "boolean"
      ? {
          sent: update,
          statusText: update ? "Email Sent" : legacyError || "Failed",
          error: legacyError,
        }
      : update;

  // 1. Update memory
  const mem = memoryLeads.find((l) => l.id === id);
  if (mem) {
    mem.emailSent = normUpdate.sent;
    mem.emailProvider = normUpdate.provider;
    mem.emailStatusText = normUpdate.statusText;
    mem.emailError = normUpdate.error;
    mem.emailMessageId = normUpdate.messageId;
  }

  // Helper to re-write CSV from leads array
  function rewriteCsvFile(filePath: string, leads: StoredLead[]) {
    try {
      let csv = CSV_HEADER;
      for (const l of leads) {
        csv += buildCsvRow(l);
      }
      fs.writeFileSync(filePath, csv, "utf8");
    } catch {
      // Ignore write errors on CSV update
    }
  }

  // 2. Update primary files if possible
  try {
    if (fs.existsSync(PRIMARY_JSON)) {
      const all: StoredLead[] = JSON.parse(fs.readFileSync(PRIMARY_JSON, "utf8"));
      const target = all.find((l) => l.id === id);
      if (target) {
        target.emailSent = normUpdate.sent;
        target.emailProvider = normUpdate.provider;
        target.emailStatusText = normUpdate.statusText;
        target.emailError = normUpdate.error;
        target.emailMessageId = normUpdate.messageId;
        fs.writeFileSync(PRIMARY_JSON, JSON.stringify(all, null, 2), "utf8");
        rewriteCsvFile(PRIMARY_CSV, all);
      }
    }
  } catch {
    // Ignore lock errors on status update
  }

  // 3. Update fallback files if possible
  try {
    if (fs.existsSync(FALLBACK_JSON)) {
      const all: StoredLead[] = JSON.parse(fs.readFileSync(FALLBACK_JSON, "utf8"));
      const target = all.find((l) => l.id === id);
      if (target) {
        target.emailSent = normUpdate.sent;
        target.emailProvider = normUpdate.provider;
        target.emailStatusText = normUpdate.statusText;
        target.emailError = normUpdate.error;
        target.emailMessageId = normUpdate.messageId;
        fs.writeFileSync(FALLBACK_JSON, JSON.stringify(all, null, 2), "utf8");
        rewriteCsvFile(FALLBACK_CSV, all);
      }
    }
  } catch {
    // Ignore lock errors
  }
}

export function getAllLeads(): StoredLead[] {
  const mergedMap = new Map<string, StoredLead>();

  // Add memory leads first
  for (const l of memoryLeads) {
    mergedMap.set(l.id, l);
  }

  // Add fallback leads if any
  try {
    if (fs.existsSync(FALLBACK_JSON)) {
      const fromFallback: StoredLead[] = JSON.parse(
        fs.readFileSync(FALLBACK_JSON, "utf8"),
      );
      for (const l of fromFallback) {
        if (!mergedMap.has(l.id)) mergedMap.set(l.id, l);
      }
    }
  } catch {
    // Ignore read errors
  }

  // Add primary leads
  try {
    if (fs.existsSync(PRIMARY_JSON)) {
      const fromPrimary: StoredLead[] = JSON.parse(
        fs.readFileSync(PRIMARY_JSON, "utf8"),
      );
      for (const l of fromPrimary) {
        if (!mergedMap.has(l.id)) mergedMap.set(l.id, l);
      }
    }
  } catch {
    // Ignore read errors
  }

  return Array.from(mergedMap.values()).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export function getLeadsCsv(): string | null {
  // Reconstruct dynamically from all stored leads to ensure latest email status is included
  const all = getAllLeads();
  if (all.length === 0) {
    // If files exist directly on disk, try reading them
    try {
      if (fs.existsSync(PRIMARY_CSV)) return fs.readFileSync(PRIMARY_CSV, "utf8");
      if (fs.existsSync(FALLBACK_CSV)) return fs.readFileSync(FALLBACK_CSV, "utf8");
    } catch {
      // Ignore
    }
    return null;
  }

  let csv = CSV_HEADER;
  for (const lead of all) {
    csv += buildCsvRow(lead);
  }
  return csv;
}
