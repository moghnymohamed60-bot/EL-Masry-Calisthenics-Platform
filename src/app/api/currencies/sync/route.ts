import { NextResponse } from "next/server";
import { getDb, saveDb } from "@/lib/db";
import { getServerSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST() {
  const session = await getServerSession();
  if (!session || session.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const db = getDb();

  try {
    // Attempt live exchange rate fetch with 4-second timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);
    const res = await fetch("https://open.er-api.com/v6/latest/EGP", {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (data && data.rates) {
        db.currencies = db.currencies.map((curr) => {
          if (curr.code === "EGP") return curr;
          if (curr.isAutoRate && typeof data.rates[curr.code] === "number") {
            return {
              ...curr,
              rateFromEgp: Number(data.rates[curr.code].toFixed(6)),
            };
          }
          return curr;
        });
        db.lastRateSync = new Date().toISOString();
        saveDb(db);
        return NextResponse.json({
          success: true,
          source: "live_api",
          currencies: db.currencies,
          lastRateSync: db.lastRateSync,
        });
      }
    }
  } catch {
    // Fallback to cached rates seamlessly as required by spec
  }

  db.lastRateSync = new Date().toISOString();
  saveDb(db);
  return NextResponse.json({
    success: true,
    source: "cached_fallback",
    currencies: db.currencies,
    lastRateSync: db.lastRateSync,
  });
}

