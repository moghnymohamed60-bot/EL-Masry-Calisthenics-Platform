import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getDb, saveDb } from "@/lib/db";
import {
  AUTH_COOKIE_NAME,
  checkRateLimit,
  getServerSession,
  signSessionToken,
} from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ user: null });
  }
  const db = getDb();
  const user = db.users.find((u) => u.id === session.userId);
  if (!user) {
    return NextResponse.json({ user: null });
  }

  // Also fetch user's subscriptions and weekly plans
  const subscriptions = db.subscriptions.filter(
    (s) => s.userId === user.id || s.clientEmail.toLowerCase() === user.email.toLowerCase()
  );

  // Weekly plans assigned specifically to this user OR matching their level
  const weeklyPlans = db.weeklyPlans.filter(
    (wp) => wp.userId === user.id || (!wp.userId && wp.targetLevel === user.level)
  );

  return NextResponse.json({
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      role: user.role,
      forcePasswordChange: user.forcePasswordChange,
      level: user.level,
      goal: user.goal,
      quizScore: user.quizScore,
    },
    subscriptions,
    weeklyPlans,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, email, password, newPassword } = body;

    if (action === "LOGOUT") {
      const res = NextResponse.json({ success: true });
      res.cookies.delete(AUTH_COOKIE_NAME);
      return res;
    }

    if (action === "CHANGE_PASSWORD") {
      const session = await getServerSession();
      if (!session) {
        return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
      }
      if (!newPassword || newPassword.length < 6) {
        return NextResponse.json(
          { error: "Password must be at least 6 characters" },
          { status: 400 }
        );
      }

      const db = getDb();
      const user = db.users.find((u) => u.id === session.userId);
      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      user.passwordHash = bcrypt.hashSync(newPassword, 10);
      user.forcePasswordChange = false;
      saveDb(db);

      const newToken = await signSessionToken({
        userId: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        forcePasswordChange: false,
      });

      const res = NextResponse.json({
        success: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          forcePasswordChange: false,
        },
      });
      res.cookies.set(AUTH_COOKIE_NAME, newToken, {
        httpOnly: true,
        path: "/",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
      });
      return res;
    }

    // Default: LOGIN
    const normalizedEmail = (email || "").trim().toLowerCase();
    if (!checkRateLimit(normalizedEmail)) {
      return NextResponse.json(
        { error: "Too many login attempts. Please wait 1 minute." },
        { status: 429 }
      );
    }

    const db = getDb();
    const user = db.users.find((u) => u.email.toLowerCase() === normalizedEmail);
    if (!user || !bcrypt.compareSync(password || "", user.passwordHash)) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const token = await signSessionToken({
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      forcePasswordChange: user.forcePasswordChange,
    });

    const res = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        forcePasswordChange: user.forcePasswordChange,
        level: user.level,
      },
    });

    res.cookies.set(AUTH_COOKIE_NAME, token, {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;
  } catch (error) {
    return NextResponse.json(
      { error: "Authentication error", details: String(error) },
      { status: 500 }
    );
  }
}

