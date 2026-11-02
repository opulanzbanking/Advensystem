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
  emailError?: string;
  storageTarget?: "github" | "primary" | "fallback" | "memory";
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
    ].join(",") + "\n"
  );
}

const CSV_HEADER = "\uFEFFDate,Nom,Prénom,Email,Téléphone,Société,Langue,Source,Message\n";

// GitHub storage: each lead is committed to a CSV file in a PRIVATE repository.
// Never point this at the public website repository, the file contains personal data.
// LEADS_GITHUB_TOKEN needs "Contents: read and write" on LEADS_GITHUB_REPO only.
interface GitHubConfig {
  token: string;
  repo: string;
  branch: string;
  filePath: string;
}

function getGitHubConfig(): GitHubConfig | null {
  const token = process.env.LEADS_GITHUB_TOKEN;
  const repo = process.env.LEADS_GITHUB_REPO;
  if (!token || !repo) return null;
  return {
    token,
    repo,
    branch: process.env.LEADS_GITHUB_BRANCH || "main",
    filePath: process.env.LEADS_GITHUB_PATH || "leads.csv",
  };
}

function githubContentsUrl(config: GitHubConfig): string {
  return `https://api.github.com/repos/${config.repo}/contents/${config.filePath}`;
}

function githubHeaders(config: GitHubConfig): HeadersInit {
  return {
    Authorization: `Bearer ${config.token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "advensystem-leads",
  };
}

async function readGitHubCsv(
  config: GitHubConfig,
): Promise<{ content: string; sha?: string }> {
  const res = await fetch(
    `${githubContentsUrl(config)}?ref=${encodeURIComponent(config.branch)}`,
    { headers: githubHeaders(config), cache: "no-store" },
  );
  if (res.status === 404) return { content: "" };
  if (!res.ok) throw new Error(`GitHub read failed: ${res.status}`);
  const file = (await res.json()) as { content: string; sha: string };
  return {
    content: Buffer.from(file.content, "base64").toString("utf8"),
    sha: file.sha,
  };
}

async function appendLeadToGitHub(
  config: GitHubConfig,
  lead: StoredLead,
): Promise<void> {
  // Retry when another submission committed in between (sha mismatch).
  for (let attempt = 0; attempt < 4; attempt++) {
    const { content, sha } = await readGitHubCsv(config);
    const next = (content || CSV_HEADER) + buildCsvRow(lead);
    const res = await fetch(githubContentsUrl(config), {
      method: "PUT",
      headers: githubHeaders(config),
      body: JSON.stringify({
        message: `lead: ${lead.createdAt} (${lead.locale.toUpperCase()})`,
        content: Buffer.from(next, "utf8").toString("base64"),
        branch: config.branch,
        ...(sha ? { sha } : {}),
      }),
    });
    if (res.ok) return;
    if (res.status !== 409 && res.status !== 422) {
      throw new Error(`GitHub write failed: ${res.status} ${await res.text()}`);
    }
    await new Promise((r) => setTimeout(r, 250 * (attempt + 1)));
  }
  throw new Error("GitHub write failed: too many concurrent updates");
}

export async function getGitHubLeadsCsv(): Promise<string | null> {
  const config = getGitHubConfig();
  if (!config) return null;
  const { content } = await readGitHubCsv(config);
  return content || null;
}

export async function saveLead(
  leadData: Omit<StoredLead, "id" | "createdAt">,
): Promise<StoredLead> {
  const id = `lead_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
  const createdAt = new Date().toISOString();

  const newLead: StoredLead = {
    id,
    createdAt,
    ...leadData,
    storageTarget: "memory",
  };

  // Always keep in memory so it's instantly retrievable
  memoryLeads.unshift(newLead);

  // Attempt 0: commit to the private GitHub leads repository (durable on Vercel)
  const github = getGitHubConfig();
  if (github) {
    try {
      await appendLeadToGitHub(github, newLead);
      newLead.storageTarget = "github";
      return newLead;
    } catch (githubErr) {
      console.error(
        "[leads] GitHub write failed, falling back to local storage.",
        githubErr instanceof Error ? githubErr.message : githubErr,
      );
    }
  }

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
  sent: boolean,
  error?: string,
) {
  // Update memory
  const mem = memoryLeads.find((l) => l.id === id);
  if (mem) {
    mem.emailSent = sent;
    if (error) mem.emailError = error;
  }

  // Update primary if possible
  try {
    if (fs.existsSync(PRIMARY_JSON)) {
      const all: StoredLead[] = JSON.parse(fs.readFileSync(PRIMARY_JSON, "utf8"));
      const target = all.find((l) => l.id === id);
      if (target) {
        target.emailSent = sent;
        if (error) target.emailError = error;
        fs.writeFileSync(PRIMARY_JSON, JSON.stringify(all, null, 2), "utf8");
      }
    }
  } catch {
    // Ignore lock errors on status update
  }

  // Update fallback if possible
  try {
    if (fs.existsSync(FALLBACK_JSON)) {
      const all: StoredLead[] = JSON.parse(fs.readFileSync(FALLBACK_JSON, "utf8"));
      const target = all.find((l) => l.id === id);
      if (target) {
        target.emailSent = sent;
        if (error) target.emailError = error;
        fs.writeFileSync(FALLBACK_JSON, JSON.stringify(all, null, 2), "utf8");
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
  // If primary CSV exists and is readable, return it
  try {
    if (fs.existsSync(PRIMARY_CSV)) {
      return fs.readFileSync(PRIMARY_CSV, "utf8");
    }
  } catch {
    // Ignore
  }

  // Try fallback CSV
  try {
    if (fs.existsSync(FALLBACK_CSV)) {
      return fs.readFileSync(FALLBACK_CSV, "utf8");
    }
  } catch {
    // Ignore
  }

  // Reconstruct from all stored leads in memory
  const all = getAllLeads();
  if (all.length === 0) return null;

  let csv = CSV_HEADER;
  for (const lead of all) {
    csv += buildCsvRow(lead);
  }
  return csv;
}
