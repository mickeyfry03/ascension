import type { Category, HelpRequest, SupportAction } from "@/lib/types";
import type { CreateRequestInput, ReviewInput, SupportInput } from "@/lib/validation";
import { getRepository } from "../repositories";

/** Business rules live here; UI and route handlers only call these functions. */

export async function listVerifiedNeeds(category?: Category): Promise<HelpRequest[]> {
  return getRepository().listRequests({ status: "VERIFIED", category });
}

export async function getVerifiedNeed(id: string): Promise<HelpRequest | null> {
  const request = await getRepository().getRequest(id);
  return request?.status === "VERIFIED" ? request : null;
}

export async function listReviewQueue(): Promise<HelpRequest[]> {
  const repo = getRepository();
  const [pending, inReview] = await Promise.all([repo.listRequests({ status: "PENDING" }), repo.listRequests({ status: "IN_REVIEW" })]);
  return [...pending, ...inReview].sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
}

export async function listRequestsFor(email: string): Promise<HelpRequest[]> {
  return getRepository().listRequests({ requesterEmail: email });
}

export async function submitRequest(input: CreateRequestInput): Promise<HelpRequest> {
  return getRepository().createRequest({
    title: input.title,
    story: input.story,
    category: input.category,
    location: input.location,
    amountCents: input.amount * 100,
    requesterName: input.name,
    requesterEmail: input.email.toLowerCase(),
  });
}

export async function reviewRequest(input: ReviewInput, reviewerId?: string): Promise<HelpRequest | null> {
  return getRepository().reviewRequest({ ...input, reviewerId });
}

export type SupportResult = { ok: true; action: SupportAction } | { ok: false; error: string };

export async function supportRequest(input: SupportInput): Promise<SupportResult> {
  const need = await getVerifiedNeed(input.requestId);
  if (!need) return { ok: false, error: "This request is not open for support." };
  const remaining = need.amountCents - need.raisedCents;
  if (remaining <= 0) return { ok: false, error: "This request is already fully funded. Thank you!" };
  const cents = input.amount * 100;
  if (cents > remaining) return { ok: false, error: `Only ${remaining / 100} USD remains to be funded.` };
  // Payment processing (e.g. Stripe) plugs in here before the support action is recorded.
  const action = await getRepository().createSupport({
    requestId: input.requestId,
    donorName: input.donorName,
    amountCents: cents,
    message: input.message || undefined,
  });
  return action ? { ok: true, action } : { ok: false, error: "Request not found." };
}
