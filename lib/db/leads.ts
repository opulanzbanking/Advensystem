import fs from "fs";
import path from "path";

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
  emailError?: string;
}

const DATA_DIR = path.join(process.cwd(), "data");
const LEADS_JSON = path.join(DATA_DIR, "leads.json");
const LEADS_CSV = path.join(DATA_DIR, "leads.csv");

function ensureDirectory() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function escapeCsvCell(val: string): string {
  const clean = (val || "").replace(/"/g, '""');
  return `"${clean}"`;
}

export async function saveLead(
  leadData: Omit<StoredLead, "id" | "createdAt">,
): Promise<StoredLead> {
  ensureDirectory();

  const id = `lead_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
  const createdAt = new Date().toISOString();

  const newLead: StoredLead = {
    id,
    createdAt,
    ...leadData,
  };

  // 1. Save to leads.json (structured database)
  let allLeads: StoredLead[] = [];
  try {
    if (fs.existsSync(LEADS_JSON)) {
      const content = fs.readFileSync(LEADS_JSON, "utf8");
      allLeads = JSON.parse(content);
    }
  } catch {
    allLeads = [];
  }

  allLeads.unshift(newLead);
  fs.writeFileSync(LEADS_JSON, JSON.stringify(allLeads, null, 2), "utf8");

  // 2. Append to leads.csv (Excel & spreadsheet compatible)
  try {
    const csvExists = fs.existsSync(LEADS_CSV);
    const row =
      [
        escapeCsvCell(createdAt),
        escapeCsvCell(newLead.name),
        escapeCsvCell(newLead.surname),
        escapeCsvCell(newLead.mail),
        escapeCsvCell(newLead.phone),
        escapeCsvCell(newLead.companyname || "—"),
        escapeCsvCell(newLead.locale.toUpperCase()),
        escapeCsvCell(newLead.source),
        escapeCsvCell(newLead.msg.replace(/[\r\n]+/g, " ")),
      ].join(",") + "\n";

    if (!csvExists) {
      const header =
        "Date,Nom,Prénom,Email,Téléphone,Société,Langue,Source,Message\n";
      // UTF-8 BOM so Excel opens European characters correctly
      fs.writeFileSync(LEADS_CSV, "\uFEFF" + header + row, "utf8");
    } else {
      fs.appendFileSync(LEADS_CSV, row, "utf8");
    }
  } catch (err) {
    console.error("[leads] Failed to append lead to CSV", err);
  }

  return newLead;
}

export function updateLeadEmailStatus(
  id: string,
  sent: boolean,
  error?: string,
) {
  try {
    if (!fs.existsSync(LEADS_JSON)) return;
    const allLeads: StoredLead[] = JSON.parse(
      fs.readFileSync(LEADS_JSON, "utf8"),
    );
    const lead = allLeads.find((l) => l.id === id);
    if (lead) {
      lead.emailSent = sent;
      if (error) lead.emailError = error;
      fs.writeFileSync(LEADS_JSON, JSON.stringify(allLeads, null, 2), "utf8");
    }
  } catch (err) {
    console.error("[leads] Failed to update lead email status", err);
  }
}

export function getAllLeads(): StoredLead[] {
  try {
    if (!fs.existsSync(LEADS_JSON)) return [];
    return JSON.parse(fs.readFileSync(LEADS_JSON, "utf8"));
  } catch {
    return [];
  }
}

export function getLeadsCsv(): string | null {
  try {
    if (!fs.existsSync(LEADS_CSV)) return null;
    return fs.readFileSync(LEADS_CSV, "utf8");
  } catch {
    return null;
  }
}

