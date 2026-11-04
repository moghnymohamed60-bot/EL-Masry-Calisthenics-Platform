import { NextResponse } from "next/server";
import { getDb, saveDb, SubscriptionRecord, UserRecord } from "@/lib/db";
import { getServerSession } from "@/lib/auth";
import bcrypt from "bcryptjs";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getServerSession();
  if (!session || session.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const db = getDb();
  return NextResponse.json({
    subscriptions: db.subscriptions,
    users: db.users.map((u) => ({
      id: u.id,
      email: u.email,
      name: u.name,
      phone: u.phone,
      role: u.role,
      level: u.level,
      goal: u.goal,
      quizScore: u.quizScore,
      createdAt: u.createdAt,
    })),
    weeklyPlans: db.weeklyPlans,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const db = getDb();

    const {
      clientName,
      clientPhone,
      clientEmail,
      password,
      age,
      heightCm,
      weightKg,
      goal,
      injuries,
      assessedLevel,
      quizScore,
      quizAnswers,
      planId,
      currencyCode,
      exchangeRateUsed,
      displayedAmount,
      paymentMethod,
    } = body;

    if (!clientName || !clientPhone || !planId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const plan = db.pricingPlans.find((p) => p.id === planId || p.slug === planId) || db.pricingPlans[0];
    const now = new Date();
    const endDate = new Date(now.getTime() + plan.durationMonths * 30 * 24 * 60 * 60 * 1000);

    // Create or update client user account so they can log in to the Client Area immediately
    let user = db.users.find((u) => u.email.toLowerCase() === (clientEmail || "").toLowerCase());
    if (!user && clientEmail) {
      const passwordHash = bcrypt.hashSync(password || "Client@2026", 10);
      const newUser: UserRecord = {
        id: `client-${Date.now()}`,
        email: clientEmail.toLowerCase(),
        passwordHash,
        name: clientName,
        phone: clientPhone,
        role: "CLIENT",
        forcePasswordChange: false,
        age: age ? Number(age) : undefined,
        heightCm: heightCm ? Number(heightCm) : undefined,
        weightKg: weightKg ? Number(weightKg) : undefined,
        goal,
        injuries,
        level: assessedLevel || "BEGINNER",
        quizScore: Number(quizScore || 0),
        quizAnswers,
        createdAt: now.toISOString(),
      };
      db.users.push(newUser);
      user = newUser;
    } else if (user) {
      user.level = assessedLevel || user.level;
      user.quizScore = Number(quizScore || user.quizScore || 0);
      user.goal = goal || user.goal;
    }

    const newSub: SubscriptionRecord = {
      id: `sub-${Date.now()}`,
      userId: user?.id,
      clientName,
      clientPhone,
      clientEmail: clientEmail || "",
      age: age ? Number(age) : undefined,
      heightCm: heightCm ? Number(heightCm) : undefined,
      weightKg: weightKg ? Number(weightKg) : undefined,
      goal: goal || "",
      injuries: injuries || "",
      assessedLevel: assessedLevel || "BEGINNER",
      quizScore: Number(quizScore || 0),
      quizAnswers: quizAnswers || {},
      planId: plan.id,
      planLabelEn: plan.labelEn,
      planLabelAr: plan.labelAr,
      durationMonths: plan.durationMonths,
      basePriceEgp: plan.priceEgp,
      currencyCode: currencyCode || "EGP",
      exchangeRateUsed: Number(exchangeRateUsed || 1),
      displayedAmount: Number(displayedAmount || plan.priceEgp),
      paymentMethod: paymentMethod || "WHATSAPP",
      status: "PENDING",
      startDate: now.toISOString(),
      endDate: endDate.toISOString(),
      notes: "Submitted via website Quiz & Checkout flow",
      createdAt: now.toISOString(),
    };

    db.subscriptions.unshift(newSub);
    saveDb(db);

    return NextResponse.json({
      success: true,
      subscription: newSub,
      clientEmail: user?.email,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create subscription", details: String(error) }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const session = await getServerSession();
  if (!session || session.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, status, extendDays, notes, assessedLevel } = body;
    const db = getDb();
    const sub = db.subscriptions.find((s) => s.id === id);
    if (!sub) {
      return NextResponse.json({ error: "Subscription not found" }, { status: 404 });
    }

    if (status) sub.status = status;
    if (notes !== undefined) sub.notes = notes;
    if (assessedLevel) sub.assessedLevel = assessedLevel;
    if (extendDays && Number(extendDays) > 0) {
      const currentEnd = new Date(sub.endDate);
      const extended = new Date(currentEnd.getTime() + Number(extendDays) * 24 * 60 * 60 * 1000);
      sub.endDate = extended.toISOString();
    }

    saveDb(db);
    return NextResponse.json({ success: true, subscription: sub });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update subscription", details: String(error) }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  const session = await getServerSession();
  if (!session || session.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing ID" }, { status: 400 });
  }

  const db = getDb();
  db.subscriptions = db.subscriptions.filter((s) => s.id !== id);
  saveDb(db);
  return NextResponse.json({ success: true });
}

