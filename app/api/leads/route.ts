import { NextResponse } from "next/server";
import { getAllLeads, getLeadsCsv } from "@/lib/db/leads";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const format = searchParams.get("format");
  const key = searchParams.get("key");

  // Optional security token check
  const secret = process.env.LEADS_SECRET;
  if (secret && key !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (format === "csv") {
    const csv = getLeadsCsv();
    if (!csv) {
      return new NextResponse(
        "Date,Nom,Prénom,Email,Téléphone,Société,Langue,Source,Message\n",
        {
          headers: {
            "Content-Type": "text/csv; charset=utf-8",
            "Content-Disposition":
              'attachment; filename="advensystem-leads.csv"',
          },
        },
      );
    }
    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition":
          'attachment; filename="advensystem-leads.csv"',
      },
    });
  }

  const leads = getAllLeads();
  return NextResponse.json({ total: leads.length, leads });
}

