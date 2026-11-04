import { Request, Response, NextFunction } from "express";
import { SignJWT, jwtVerify } from "jose";
import { ZodSchema } from "zod";

const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET || "el-masry-calisthenics-super-secret-jwt-key-2026-production"
);

export const AUTH_COOKIE_NAME = "elmasry_session";

export interface SessionPayload {
  userId: string;
  email: string;
  name: string;
  role: "ADMIN" | "CLIENT";
  forcePasswordChange: boolean;
}

declare global {
  namespace Express {
    interface Request {
      user?: SessionPayload;
    }
  }
}

export async function signToken(payload: SessionPayload): Promise<string> {
  return await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(SECRET_KEY);
}

export async function verifyToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

function extractToken(req: Request): string | null {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.slice(7);
  }
  const cookieHeader = req.headers.cookie;
  if (cookieHeader) {
    const match = cookieHeader
      .split(";")
      .map((c) => c.trim())
      .find((c) => c.startsWith(`${AUTH_COOKIE_NAME}=`));
    if (match) {
      return decodeURIComponent(match.split("=")[1]);
    }
  }
  return null;
}

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  const token = extractToken(req);
  if (!token) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  const session = await verifyToken(token);
  if (!session) {
    return res.status(401).json({ error: "Invalid or expired session" });
  }
  req.user = session;
  next();
}

export async function optionalAuth(req: Request, _res: Response, next: NextFunction) {
  const token = extractToken(req);
  if (token) {
    const session = await verifyToken(token);
    if (session) req.user = session;
  }
  next();
}

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (!req.user || req.user.role !== "ADMIN") {
    return res.status(403).json({ error: "Admin access required" });
  }
  next();
}

// Rate limiter middleware
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

export function rateLimitMiddleware(maxAttempts = 12, windowMs = 60_000) {
  return (req: Request, res: Response, next: NextFunction) => {
    const key = `${req.ip || "local"}:${req.body?.email || ""}`;
    const now = Date.now();
    const record = rateLimitMap.get(key);
    if (!record || now > record.resetAt) {
      rateLimitMap.set(key, { count: 1, resetAt: now + windowMs });
      return next();
    }
    if (record.count >= maxAttempts) {
      return res.status(429).json({ error: "Too many requests. Please wait 1 minute." });
    }
    record.count += 1;
    next();
  };
}

// Zod input validation middleware
export function validateBody(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        error: "Validation failed",
        details: parsed.error.flatten(),
      });
    }
    req.body = parsed.data;
    next();
  };
}

// Global error handler
export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction) {
  console.error("[Backend Error]:", err);
  res.status(500).json({
    error: "Internal server error",
    message: err.message,
  });
}

