"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createRequestSchema, reviewSchema, supportSchema } from "@/lib/validation";
import { SESSION_COOKIE, isDevAuthEnabled, requireAdmin } from "./auth";
import { reviewRequest, submitRequest, supportRequest } from "./services/requests";

export interface FormState {
  ok: boolean;
  message?: string;
  errors?: Record<string, string[] | undefined>;
}

export async function submitRequestAction(_prev: FormState, formData: FormData): Promise<FormState> {
  const parsed = createRequestSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { ok: false, errors: parsed.error.flatten().fieldErrors };
  await submitRequest(parsed.data);
  revalidatePath("/admin");
  revalidatePath("/dashboard");
  return { ok: true, message: "Thank you. Your request was submitted and is now waiting for verification." };
}

export async function supportAction(_prev: FormState, formData: FormData): Promise<FormState> {
  const parsed = supportSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { ok: false, errors: parsed.error.flatten().fieldErrors };
  const result = await supportRequest(parsed.data);
  if (!result.ok) return { ok: false, message: result.error };
  revalidatePath("/needs");
  revalidatePath(`/needs/${parsed.data.requestId}`);
  return { ok: true, message: "Thank you for your generosity. Your support has been recorded." };
}

export async function reviewAction(formData: FormData): Promise<void> {
  const admin = await requireAdmin();
  if (!admin) throw new Error("Unauthorized");
  const parsed = reviewSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return;
  // Dev sessions have no User row, so reviewerId is left unset until real auth maps to User.id.
  await reviewRequest(parsed.data);
  revalidatePath("/admin");
  revalidatePath("/needs");
}

export async function devSignInAction(formData: FormData): Promise<void> {
  if (!isDevAuthEnabled()) return;
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  if (!/^\S+@\S+\.\S+$/.test(email)) return;
  (await cookies()).set(SESSION_COOKIE, email, { httpOnly: true, sameSite: "lax", path: "/" });
  redirect("/dashboard");
}

export async function signOutAction(): Promise<void> {
  (await cookies()).delete(SESSION_COOKIE);
  redirect("/");
}
