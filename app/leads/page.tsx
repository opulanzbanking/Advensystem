"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { company } from "@/lib/site";

interface Lead {
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
  emailProvider?: "resend" | "smtp" | "none";
  emailStatusText?: string;
  emailError?: string;
  emailMessageId?: string;
  storageTarget?: string;
}

export default function LeadsDashboardPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [keyInput, setKeyInput] = useState("");

  async function fetchLeads(key = secretKey) {
    setLoading(true);
    setError(null);
    try {
      const url = key ? `/api/leads/?key=${encodeURIComponent(key)}` : "/api/leads/";
      const res = await fetch(url);
      if (res.status === 401) {
        setError("Unauthorized. Please enter your secret access key.");
        setLeads([]);
        return;
      }
      if (!res.ok) {
        throw new Error(`Failed to load leads (${res.status})`);
      }
      const data = await res.json();
      setLeads(data.leads || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error fetching leads");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchLeads();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secretKey]);

  const filteredLeads = useMemo(() => {
    if (!searchTerm.trim()) return leads;
    const q = searchTerm.toLowerCase();
    return leads.filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        l.surname.toLowerCase().includes(q) ||
        l.mail.toLowerCase().includes(q) ||
        l.phone.toLowerCase().includes(q) ||
        (l.companyname && l.companyname.toLowerCase().includes(q)) ||
        l.msg.toLowerCase().includes(q),
    );
  }, [leads, searchTerm]);

  const csvDownloadUrl = secretKey
    ? `/api/leads/?format=csv&key=${encodeURIComponent(secretKey)}`
    : "/api/leads/?format=csv";

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-white/10 pb-6 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-[13px] font-semibold text-accent hover:underline"
            >
              ← Back to {company.name}
            </Link>
            <span className="text-white/30">•</span>
            <span className="rounded bg-brand/20 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-brand">
              Admin Portal
            </span>
          </div>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Customer Inquiries & Email Log
          </h1>
          <p className="mt-1 text-sm text-white/60">
            Real-time tracking of inquiries saved to <code className="text-accent">leads.csv</code> and email delivery to <code className="text-accent">{company.email}</code>.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => fetchLeads()}
            className="rounded border border-white/20 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
          >
            ↻ Refresh
          </button>
          <a
            href={csvDownloadUrl}
            download="advensystem-leads.csv"
            className="inline-flex items-center gap-2 rounded bg-gradient-to-r from-brand to-accent px-4 py-2 text-sm font-semibold text-white shadow transition hover:brightness-110"
          >
            <span>📥</span> Download Excel CSV
          </a>
        </div>
      </div>

      {/* Secret Key Input if required */}
      {error?.includes("Unauthorized") && (
        <div className="mt-6 rounded-lg border border-gold/30 bg-gold/10 p-4">
          <h3 className="text-sm font-semibold text-gold">Access Protected</h3>
          <p className="mt-1 text-xs text-white/70">
            This endpoint is secured with a secret key. Enter your LEADS_SECRET key below to view inquiries:
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSecretKey(keyInput.trim());
            }}
            className="mt-3 flex gap-2"
          >
            <input
              type="password"
              placeholder="Enter secret key..."
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
              className="rounded border border-white/20 bg-black/40 px-3 py-1.5 text-sm text-white focus:border-brand focus:outline-none"
            />
            <button
              type="submit"
              className="rounded bg-brand px-3 py-1.5 text-sm font-medium text-white hover:bg-brand-navy"
            >
              Unlock
            </button>
          </form>
        </div>
      )}

      {/* Stats & Search Bar */}
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <div className="rounded-lg border border-white/10 bg-white/5 px-4 py-2">
            <span className="text-xs uppercase text-white/50">Total Inquiries</span>
            <div className="text-xl font-bold text-white">{leads.length}</div>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/5 px-4 py-2">
            <span className="text-xs uppercase text-white/50">Primary Storage</span>
            <div className="text-xs font-semibold text-green-400">leads.csv + JSON</div>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/5 px-4 py-2">
            <span className="text-xs uppercase text-white/50">Email Recipient</span>
            <div className="text-xs font-semibold text-accent">{company.email}</div>
          </div>
        </div>

        <div className="w-full sm:w-72">
          <input
            type="search"
            placeholder="Search name, email, company…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/40 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          />
        </div>
      </div>

      {/* Table Container */}
      <div className="mt-6 overflow-hidden rounded-lg border border-white/10 bg-black/20 shadow-xl">
        {loading ? (
          <div className="py-16 text-center text-sm text-white/50">
            Loading inquiries…
          </div>
        ) : error && !error.includes("Unauthorized") ? (
          <div className="py-16 text-center text-sm text-red-400">
            {error}
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="py-16 text-center">
            <div className="text-3xl">📭</div>
            <h3 className="mt-2 text-base font-semibold text-white">No inquiries found yet</h3>
            <p className="mt-1 text-xs text-white/60">
              When a visitor submits the contact form, their inquiry and email dispatch log will show here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-white/10 text-left text-sm">
              <thead className="bg-white/5 text-xs uppercase tracking-wider text-white/60">
                <tr>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Contact</th>
                  <th className="px-4 py-3">Company</th>
                  <th className="px-4 py-3">Details</th>
                  <th className="px-4 py-3">Message</th>
                  <th className="px-4 py-3">Email Delivery Log</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-normal text-white/90">
                {filteredLeads.map((lead) => {
                  const dateStr = new Date(lead.createdAt).toLocaleString("fr-FR", {
                    dateStyle: "short",
                    timeStyle: "short",
                  });
                  return (
                    <tr key={lead.id} className="transition hover:bg-white/5">
                      <td className="whitespace-nowrap px-4 py-3.5 text-xs text-white/60">
                        {dateStr}
                        <span className="ml-1.5 rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-bold text-gold">
                          {lead.locale?.toUpperCase()}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3.5 font-medium text-white">
                        {lead.name} {lead.surname}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3.5 text-white/80">
                        {lead.companyname || "—"}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3.5 text-xs">
                        <div>
                          <a
                            href={`mailto:${lead.mail}`}
                            className="font-medium text-blue-400 hover:underline"
                          >
                            {lead.mail}
                          </a>
                        </div>
                        <div className="mt-0.5">
                          <a
                            href={`tel:${lead.phone.replace(/\s+/g, "")}`}
                            className="text-white/70 hover:underline"
                          >
                            {lead.phone}
                          </a>
                        </div>
                      </td>
                      <td className="max-w-xs px-4 py-3.5 text-xs leading-relaxed text-white/80">
                        <p className="line-clamp-2 whitespace-pre-wrap">{lead.msg}</p>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3.5 text-xs">
                        {lead.emailSent ? (
                          lead.emailProvider === "resend" ? (
                            <span className="inline-flex items-center gap-1 rounded bg-green-500/20 px-2 py-0.5 font-medium text-green-300">
                              ✓ Sent (Resend)
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 rounded bg-blue-500/20 px-2 py-0.5 font-medium text-blue-300">
                              ✓ Sent (SMTP)
                            </span>
                          )
                        ) : lead.emailError ? (
                          <span
                            title={lead.emailError}
                            className="inline-flex cursor-help items-center gap-1 rounded bg-red-500/20 px-2 py-0.5 font-medium text-red-300"
                          >
                            ❌ {lead.emailStatusText || "Failed"}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded bg-yellow-500/20 px-2 py-0.5 font-medium text-yellow-300">
                            ⚠️ Not Configured
                          </span>
                        )}
                        {lead.emailMessageId && (
                          <div className="mt-0.5 font-mono text-[10px] text-white/40">
                            id: {lead.emailMessageId.slice(0, 16)}…
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

