import { cookies } from "next/headers";
import type { Role, SessionUser } from "@/lib/types";

/**
 * Auth seam. Everything in the app calls getSessionUser() / requireAdmin(); swap the body of
 * getSessionUser() for Auth.js (`auth()`) or Clerk (`currentUser()`) and nothing else changes.
 *
 * The placeholder below is a DEVELOPMENT-ONLY (NODE_ENV=development) cookie session so the dashboard and admin flows can
 * be exercised locally. It is disabled in production, where no one is signed in until a real
 * provider is wired up.
 */
export const SESSION_COOKIE = "ascension_dev_session";

export function isDevAuthEnabled(): boolean {
  return process.env.NODE_ENV === "development";
}

function roleFor(email: string): Role {
  const admins = (process.env.ADMIN_EMAILS ?? "").split(",").map((e) => e.trim().toLowerCase()).filter(Boolean);
  return admins.includes(email.toLowerCase()) ? "ADMIN" : "REQUESTER";
}

export async function getSessionUser(): Promise<SessionUser | null> {
  if (!isDevAuthEnabled()) return null;
  const email = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!email) return null;
  return { id: email, email, name: email.split("@")[0], role: roleFor(email) };
}

export async function requireAdmin(): Promise<SessionUser | null> {
  const user = await getSessionUser();
  return user?.role === "ADMIN" ? user : null;
}
