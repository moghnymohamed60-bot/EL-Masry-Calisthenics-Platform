import { NextResponse } from "next/server";
import { getDb, saveDb, WeeklyPlanRecord } from "@/lib/db";
import { getServerSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const db = getDb();
  return NextResponse.json({ weeklyPlans: db.weeklyPlans });
}

export async function POST(request: Request) {
  const session = await getServerSession();
  if (!session || session.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const db = getDb();

    if (body.id) {
      // Update existing plan
      const idx = db.weeklyPlans.findIndex((w) => w.id === body.id);
      if (idx !== -1) {
        db.weeklyPlans[idx] = {
          ...db.weeklyPlans[idx],
          ...body,
          updatedAt: new Date().toISOString(),
        };
        saveDb(db);
        return NextResponse.json({ success: true, weeklyPlan: db.weeklyPlans[idx] });
      }
    }

    const newPlan: WeeklyPlanRecord = {
      id: `wp-${Date.now()}`,
      titleAr: body.titleAr || "جدول تدريبي أسبوعي جديد",
      titleEn: body.titleEn || "New Weekly Training Plan",
      weekNumber: Number(body.weekNumber || 1),
      targetLevel: body.targetLevel || "BEGINNER",
      userId: body.userId || undefined,
      notesAr: body.notesAr || "",
      notesEn: body.notesEn || "",
      days: body.days || [],
      active: true,
      updatedAt: new Date().toISOString(),
    };

    db.weeklyPlans.unshift(newPlan);
    saveDb(db);
    return NextResponse.json({ success: true, weeklyPlan: newPlan });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save weekly plan", details: String(error) }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  const session = await getServerSession();
  if (!session || session.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const db = getDb();
  db.weeklyPlans = db.weeklyPlans.filter((w) => w.id !== id);
  saveDb(db);
  return NextResponse.json({ success: true });
}

