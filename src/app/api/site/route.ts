import { NextResponse } from "next/server";
import { getDb, saveDb } from "@/lib/db";
import { getServerSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const db = getDb();
  return NextResponse.json({
    siteConfig: db.siteConfig,
    pricingPlans: db.pricingPlans.sort((a, b) => a.sortOrder - b.sortOrder),
    currencies: db.currencies.sort((a, b) => a.sortOrder - b.sortOrder),
    exercises: db.exercises,
    quizConfig: db.quizConfig,
    transformations: db.transformations,
    lastRateSync: db.lastRateSync,
  });
}

export async function PUT(request: Request) {
  const session = await getServerSession();
  if (!session || session.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const db = getDb();

    if (body.siteConfig) db.siteConfig = body.siteConfig;
    if (body.pricingPlans) db.pricingPlans = body.pricingPlans;
    if (body.currencies) db.currencies = body.currencies;
    if (body.exercises) db.exercises = body.exercises;
    if (body.quizConfig) db.quizConfig = body.quizConfig;
    if (body.transformations) db.transformations = body.transformations;

    saveDb(db);
    return NextResponse.json({ success: true, db });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update site data", details: String(error) }, { status: 400 });
  }
}

