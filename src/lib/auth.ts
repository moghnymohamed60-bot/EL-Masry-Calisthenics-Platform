import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

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

// Simple in-memory rate limiter for login attempts
const loginAttempts = new Map<string, { count: number; resetAt: number }>();

export function checkRateLimit(ipOrEmail: string, maxAttempts = 8, windowMs = 60_000): boolean {
  const now = Date.now();
  const entry = loginAttempts.get(ipOrEmail);
  if (!entry || now > entry.resetAt) {
    loginAttempts.set(ipOrEmail, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (entry.count >= maxAttempts) {
    return false;
  }
  entry.count += 1;
  return true;
}

export async function signSessionToken(payload: SessionPayload): Promise<string> {
  return await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(SECRET_KEY);
}

export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

export async function getServerSession(): Promise<SessionPayload | null> {
  const cookieStore = cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  if (!token) return null;
  return await verifySessionToken(token);
}

