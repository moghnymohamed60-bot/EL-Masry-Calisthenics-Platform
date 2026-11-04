import bcrypt from "bcryptjs";
import { databaseRepository } from "../storage/databaseRepository";
import { signToken } from "../middleware";
import {
  Subscription,
  User,
  WeeklyPlan,
  Exercise,
  CurrencyConfig,
} from "../../../shared/types";
import {
  calculateQuizTotalScore,
  classifyAthleteLevel,
} from "../../../shared/quiz";

export const authService = {
  async login(email: string, password: string) {
    const db = databaseRepository.readState();
    const normalized = email.trim().toLowerCase();
    const user = db.users.find((u) => u.email.toLowerCase() === normalized);
    if (!user || !user.passwordHash || !bcrypt.compareSync(password, user.passwordHash)) {
      return null;
    }
    const token = await signToken({
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      forcePasswordChange: user.forcePasswordChange,
    });
    return {
      token,
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
    };
  },

  async changePassword(userId: string, newPassword: string) {
    const db = databaseRepository.readState();
    const user = db.users.find((u) => u.id === userId);
    if (!user) return null;

    user.passwordHash = bcrypt.hashSync(newPassword, 10);
    user.forcePasswordChange = false;
    databaseRepository.writeState(db);

    const token = await signToken({
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      forcePasswordChange: false,
    });
    return { token, user };
  },

  getProfileWithPlans(userId: string) {
    const db = databaseRepository.readState();
    const user = db.users.find((u) => u.id === userId);
    if (!user) return null;

    const subscriptions = db.subscriptions.filter(
      (s) => s.userId === user.id || s.clientEmail.toLowerCase() === user.email.toLowerCase()
    );
    const weeklyPlans = db.weeklyPlans.filter(
      (wp) => wp.userId === user.id || (!wp.userId && wp.targetLevel === user.level)
    );
    return {
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
    };
  },
};

export const subscriptionService = {
  getAllSubscriptionsAndClients() {
    const db = databaseRepository.readState();
    return {
      subscriptions: db.subscriptions,
      users: db.users.map(({ passwordHash: _ph, ...rest }) => rest),
      weeklyPlans: db.weeklyPlans,
    };
  },

  createSubscription(payload: Record<string, unknown>) {
    const db = databaseRepository.readState();
    const plan =
      db.pricingPlans.find((p) => p.id === payload.planId || p.slug === payload.planId) ||
      db.pricingPlans[0];

    const now = new Date();
    const endDate = new Date(now.getTime() + plan.durationMonths * 30 * 24 * 60 * 60 * 1000);

    const quizAnswers = (payload.quizAnswers as Record<string, number>) || {};
    const computedScore =
      typeof payload.quizScore === "number"
        ? payload.quizScore
        : calculateQuizTotalScore(quizAnswers);
    const assessedLevel = classifyAthleteLevel(
      computedScore,
      db.quizConfig.intermediateThreshold,
      db.quizConfig.advancedThreshold
    );

    const clientEmail = String(
      payload.clientEmail || `${String(payload.clientPhone).replace(/\D/g, "")}@client.elmasry.com`
    ).toLowerCase();

    let user = db.users.find((u) => u.email.toLowerCase() === clientEmail);
    if (!user) {
      const newUser: User = {
        id: `client-${Date.now()}`,
        email: clientEmail,
        passwordHash: bcrypt.hashSync(String(payload.password || "Client@2026"), 10),
        name: String(payload.clientName),
        phone: String(payload.clientPhone),
        role: "CLIENT",
        forcePasswordChange: false,
        age: payload.age ? Number(payload.age) : undefined,
        heightCm: payload.heightCm ? Number(payload.heightCm) : undefined,
        weightKg: payload.weightKg ? Number(payload.weightKg) : undefined,
        goal: payload.goal ? String(payload.goal) : "",
        injuries: payload.injuries ? String(payload.injuries) : "",
        level: assessedLevel,
        quizScore: computedScore,
        quizAnswers,
        createdAt: now.toISOString(),
      };
      db.users.push(newUser);
      user = newUser;
    } else {
      user.level = assessedLevel;
      user.quizScore = computedScore;
    }

    const newSub: Subscription = {
      id: `sub-${Date.now()}`,
      userId: user.id,
      clientName: String(payload.clientName),
      clientPhone: String(payload.clientPhone),
      clientEmail,
      age: payload.age ? Number(payload.age) : undefined,
      heightCm: payload.heightCm ? Number(payload.heightCm) : undefined,
      weightKg: payload.weightKg ? Number(payload.weightKg) : undefined,
      goal: payload.goal ? String(payload.goal) : "",
      injuries: payload.injuries ? String(payload.injuries) : "",
      assessedLevel,
      quizScore: computedScore,
      quizAnswers,
      planId: plan.id,
      planLabelEn: plan.labelEn,
      planLabelAr: plan.labelAr,
      durationMonths: plan.durationMonths,
      basePriceEgp: plan.priceEgp,
      currencyCode: String(payload.currencyCode || "EGP"),
      exchangeRateUsed: Number(payload.exchangeRateUsed || 1),
      displayedAmount: Number(payload.displayedAmount || plan.priceEgp),
      paymentMethod: (payload.paymentMethod as Subscription["paymentMethod"]) || "WHATSAPP",
      status: "PENDING",
      startDate: now.toISOString(),
      endDate: endDate.toISOString(),
      notes: "Submitted via website Quiz & Checkout flow",
      createdAt: now.toISOString(),
    };

    db.subscriptions.unshift(newSub);
    databaseRepository.writeState(db);
    return { subscription: newSub, clientEmail: user.email };
  },

  updateSubscription(id: string, updates: Record<string, unknown>) {
    const db = databaseRepository.readState();
    const sub = db.subscriptions.find((s) => s.id === id);
    if (!sub) return null;

    if (updates.status) sub.status = updates.status as Subscription["status"];
    if (updates.notes !== undefined) sub.notes = String(updates.notes);
    if (updates.assessedLevel) {
      sub.assessedLevel = updates.assessedLevel as Subscription["assessedLevel"];
    }
    if (updates.extendDays && Number(updates.extendDays) > 0) {
      const currentEnd = new Date(sub.endDate);
      const extended = new Date(
        currentEnd.getTime() + Number(updates.extendDays) * 24 * 60 * 60 * 1000
      );
      sub.endDate = extended.toISOString();
    }

    databaseRepository.writeState(db);
    return sub;
  },

  deleteSubscription(id: string) {
    const db = databaseRepository.readState();
    db.subscriptions = db.subscriptions.filter((s) => s.id !== id);
    databaseRepository.writeState(db);
    return true;
  },

  exportSubscriptionsCsv(): string {
    const db = databaseRepository.readState();
    const headers = [
      "ID",
      "Client Name",
      "Phone",
      "Email",
      "Plan",
      "Level",
      "Quiz Score",
      "Goal",
      "Base Price EGP",
      "Currency",
      "Displayed Amount",
      "Status",
      "Start Date",
      "End Date",
    ];
    const rows = db.subscriptions.map((s) => [
      s.id,
      `"${s.clientName}"`,
      `"${s.clientPhone}"`,
      `"${s.clientEmail}"`,
      `"${s.planLabelEn}"`,
      s.assessedLevel,
      s.quizScore,
      `"${(s.goal || "").replace(/"/g, '""')}"`,
      s.basePriceEgp,
      s.currencyCode,
      s.displayedAmount,
      s.status,
      s.startDate.slice(0, 10),
      s.endDate.slice(0, 10),
    ]);
    return "\uFEFF" + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
  },
};

export const weeklyPlanService = {
  getAllWeeklyPlans(): WeeklyPlan[] {
    return databaseRepository.readState().weeklyPlans;
  },

  saveWeeklyPlan(payload: Partial<WeeklyPlan>): WeeklyPlan {
    const db = databaseRepository.readState();
    if (payload.id) {
      const idx = db.weeklyPlans.findIndex((w) => w.id === payload.id);
      if (idx !== -1) {
        db.weeklyPlans[idx] = {
          ...db.weeklyPlans[idx],
          ...payload,
          updatedAt: new Date().toISOString(),
        };
        databaseRepository.writeState(db);
        return db.weeklyPlans[idx];
      }
    }

    const created: WeeklyPlan = {
      id: `wp-${Date.now()}`,
      titleAr: payload.titleAr || "جدول تدريبي أسبوعي جديد",
      titleEn: payload.titleEn || "New Weekly Training Plan",
      weekNumber: Number(payload.weekNumber || 1),
      targetLevel: payload.targetLevel || "BEGINNER",
      userId: payload.userId,
      notesAr: payload.notesAr || "",
      notesEn: payload.notesEn || "",
      days: payload.days || [],
      active: true,
      updatedAt: new Date().toISOString(),
    };
    db.weeklyPlans.unshift(created);
    databaseRepository.writeState(db);
    return created;
  },

  deleteWeeklyPlan(id: string): boolean {
    const db = databaseRepository.readState();
    db.weeklyPlans = db.weeklyPlans.filter((w) => w.id !== id);
    databaseRepository.writeState(db);
    return true;
  },
};

export const currencyExchangeService = {
  async syncExchangeRates(): Promise<{
    source: "live_api" | "cached_fallback";
    currencies: CurrencyConfig[];
    lastRateSync: string;
  }> {
    const db = databaseRepository.readState();
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 4000);
      const res = await fetch("https://open.er-api.com/v6/latest/EGP", {
        signal: controller.signal,
      });
      clearTimeout(timeout);

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
          databaseRepository.writeState(db);
          return {
            source: "live_api",
            currencies: db.currencies,
            lastRateSync: db.lastRateSync,
          };
        }
      }
    } catch {
      // Fallback to last cached rates as required
    }

    db.lastRateSync = new Date().toISOString();
    databaseRepository.writeState(db);
    return {
      source: "cached_fallback",
      currencies: db.currencies,
      lastRateSync: db.lastRateSync,
    };
  },
};

export const cmsContentService = {
  getPublicSiteBundle() {
    const db = databaseRepository.readState();
    return {
      siteConfig: db.siteConfig,
      pricingPlans: db.pricingPlans.sort((a, b) => a.sortOrder - b.sortOrder),
      currencies: db.currencies.sort((a, b) => a.sortOrder - b.sortOrder),
      exercises: db.exercises,
      quizConfig: db.quizConfig,
      transformations: db.transformations,
      lastRateSync: db.lastRateSync,
    };
  },

  updateSiteBundle(updates: Record<string, unknown>) {
    const db = databaseRepository.readState();
    if (updates.siteConfig) db.siteConfig = updates.siteConfig as typeof db.siteConfig;
    if (updates.pricingPlans) db.pricingPlans = updates.pricingPlans as typeof db.pricingPlans;
    if (updates.currencies) db.currencies = updates.currencies as typeof db.currencies;
    if (updates.exercises) db.exercises = updates.exercises as Exercise[];
    if (updates.quizConfig) db.quizConfig = updates.quizConfig as typeof db.quizConfig;
    if (updates.transformations) {
      db.transformations = updates.transformations as typeof db.transformations;
    }
    databaseRepository.writeState(db);
    return db;
  },

  getDashboardStats() {
    const db = databaseRepository.readState();
    const activeSubs = db.subscriptions.filter(
      (s) => s.status === "ACTIVE" || s.status === "PAID"
    );
    const totalRevenueEgp = activeSubs.reduce((sum, s) => sum + s.basePriceEgp, 0);
    return {
      totalClients: db.users.filter((u) => u.role === "CLIENT").length,
      totalSubscriptions: db.subscriptions.length,
      activeSubscriptions: activeSubs.length,
      totalRevenueEgp,
      levelBreakdown: {
        BEGINNER: db.subscriptions.filter((s) => s.assessedLevel === "BEGINNER").length,
        INTERMEDIATE: db.subscriptions.filter((s) => s.assessedLevel === "INTERMEDIATE").length,
        ADVANCED: db.subscriptions.filter((s) => s.assessedLevel === "ADVANCED").length,
      },
    };
  },
};

