/**
 * backend/src/routes/index.ts
 * HTTP Endpoints: auth, subscriptions, quiz, plans, exercises, content, media, currencies, dashboard.
 * Routes only define endpoints and delegate business logic to backend/src/services.
 */
import { Router, Request, Response } from "express";
import {
  AUTH_COOKIE_NAME,
  optionalAuth,
  requireAuth,
  requireAdmin,
  rateLimitMiddleware,
  validateBody,
} from "../middleware";
import {
  authService,
  subscriptionService,
  weeklyPlanService,
  currencyExchangeService,
  cmsContentService,
} from "../services";
import { mediaStorageAdapter } from "../storage/mediaStorageAdapter";
import { SignupSubscriptionSchema } from "../../../shared/schemas";

export const apiRouter = Router();

// 1. AUTH ROUTES (/api/auth)
apiRouter.get("/auth", optionalAuth, (req: Request, res: Response) => {
  if (!req.user) {
    return res.json({ user: null });
  }
  const profile = authService.getProfileWithPlans(req.user.userId);
  if (!profile) {
    return res.json({ user: null });
  }
  return res.json(profile);
});

apiRouter.post("/auth", rateLimitMiddleware(10, 60_000), async (req: Request, res: Response) => {
  const { action, email, password, newPassword } = req.body;

  if (action === "LOGOUT") {
    res.clearCookie(AUTH_COOKIE_NAME, { path: "/" });
    return res.json({ success: true });
  }

  if (action === "CHANGE_PASSWORD") {
    const authHeader = req.headers.authorization;
    const cookieHeader = req.headers.cookie;
    if (!authHeader && !cookieHeader) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    return optionalAuth(req, res, async () => {
      if (!req.user) {
        return res.status(401).json({ error: "Not authenticated" });
      }
      if (!newPassword || String(newPassword).length < 6) {
        return res.status(400).json({ error: "Password must be at least 6 characters" });
      }
      const updated = await authService.changePassword(req.user.userId, String(newPassword));
      if (!updated) {
        return res.status(404).json({ error: "User not found" });
      }
      res.cookie(AUTH_COOKIE_NAME, updated.token, {
        httpOnly: true,
        path: "/",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      return res.json({ success: true, token: updated.token, user: updated.user });
    });
  }

  const result = await authService.login(String(email || ""), String(password || ""));
  if (!result) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  res.cookie(AUTH_COOKIE_NAME, result.token, {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res.json({
    success: true,
    token: result.token,
    user: result.user,
  });
});

// 2. CONTENT & SITE BUNDLE ROUTES (/api/site & /api/content)
apiRouter.get("/site", (_req: Request, res: Response) => {
  return res.json(cmsContentService.getPublicSiteBundle());
});

apiRouter.put("/site", requireAuth, requireAdmin, (req: Request, res: Response) => {
  const db = cmsContentService.updateSiteBundle(req.body);
  return res.json({ success: true, db });
});

// 3. SUBSCRIPTIONS ROUTES (/api/subscriptions)
apiRouter.get("/subscriptions", requireAuth, requireAdmin, (_req: Request, res: Response) => {
  return res.json(subscriptionService.getAllSubscriptionsAndClients());
});

apiRouter.get("/subscriptions/export/csv", requireAuth, requireAdmin, (_req: Request, res: Response) => {
  const csv = subscriptionService.exportSubscriptionsCsv();
  res.setHeader("Content-Type", "text/csv; charset=utf-8");
  res.setHeader("Content-Disposition", 'attachment; filename="subscriptions.csv"');
  return res.send(csv);
});

apiRouter.post(
  "/subscriptions",
  validateBody(SignupSubscriptionSchema),
  (req: Request, res: Response) => {
    const created = subscriptionService.createSubscription(req.body);
    return res.json({
      success: true,
      subscription: created.subscription,
      clientEmail: created.clientEmail,
    });
  }
);

apiRouter.patch("/subscriptions", requireAuth, requireAdmin, (req: Request, res: Response) => {
  const updated = subscriptionService.updateSubscription(String(req.body.id), req.body);
  if (!updated) {
    return res.status(404).json({ error: "Subscription not found" });
  }
  return res.json({ success: true, subscription: updated });
});

apiRouter.delete("/subscriptions", requireAuth, requireAdmin, (req: Request, res: Response) => {
  const id = String(req.query.id || "");
  if (!id) {
    return res.status(400).json({ error: "Missing id parameter" });
  }
  subscriptionService.deleteSubscription(id);
  return res.json({ success: true });
});

// 4. WEEKLY WORKOUT PLANS ROUTES (/api/weekly-plans & /api/plans)
apiRouter.get("/weekly-plans", (_req: Request, res: Response) => {
  return res.json({ weeklyPlans: weeklyPlanService.getAllWeeklyPlans() });
});

apiRouter.post("/weekly-plans", requireAuth, requireAdmin, (req: Request, res: Response) => {
  const saved = weeklyPlanService.saveWeeklyPlan(req.body);
  return res.json({ success: true, weeklyPlan: saved });
});

apiRouter.delete("/weekly-plans", requireAuth, requireAdmin, (req: Request, res: Response) => {
  const id = String(req.query.id || "");
  if (!id) return res.status(400).json({ error: "Missing id" });
  weeklyPlanService.deleteWeeklyPlan(id);
  return res.json({ success: true });
});

// 5. CURRENCIES & EXCHANGE RATE SYNC (/api/currencies/sync)
apiRouter.post("/currencies/sync", requireAuth, requireAdmin, async (_req: Request, res: Response) => {
  const result = await currencyExchangeService.syncExchangeRates();
  return res.json({ success: true, ...result });
});

// 6. EXERCISES, QUIZ, MEDIA & DASHBOARD ANALYTICS ROUTES
apiRouter.get("/exercises", (_req: Request, res: Response) => {
  return res.json({ exercises: cmsContentService.getPublicSiteBundle().exercises });
});

apiRouter.get("/quiz", (_req: Request, res: Response) => {
  return res.json({ quizConfig: cmsContentService.getPublicSiteBundle().quizConfig });
});

apiRouter.post("/media/upload", requireAuth, requireAdmin, async (req: Request, res: Response) => {
  const { url, mimeType } = req.body;
  const stored = await mediaStorageAdapter.storeMediaReference(String(url || ""), mimeType);
  return res.json({ success: true, media: stored });
});

apiRouter.get("/dashboard", requireAuth, requireAdmin, (_req: Request, res: Response) => {
  return res.json(cmsContentService.getDashboardStats());
});

