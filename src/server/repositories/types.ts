import type { Category, HelpRequest, SupportAction, VerificationStatus } from "@/lib/types";

export interface NewRequestData {
  title: string;
  story: string;
  category: Category;
  location: string;
  amountCents: number;
  requesterName: string;
  requesterEmail: string;
}

export interface NewSupportData {
  requestId: string;
  donorName: string;
  amountCents: number;
  message?: string;
}

export interface ReviewData {
  requestId: string;
  decision: Exclude<VerificationStatus, "PENDING">;
  notes?: string;
  reviewerId?: string;
}

export interface ListFilter {
  status?: VerificationStatus;
  category?: Category;
  requesterEmail?: string;
}

/** Storage boundary: services depend on this, never on Prisma or the in-memory store directly. */
export interface Repository {
  listRequests(filter?: ListFilter): Promise<HelpRequest[]>;
  getRequest(id: string): Promise<HelpRequest | null>;
  createRequest(data: NewRequestData): Promise<HelpRequest>;
  reviewRequest(data: ReviewData): Promise<HelpRequest | null>;
  createSupport(data: NewSupportData): Promise<SupportAction | null>;
  listSupport(requestId: string): Promise<SupportAction[]>;
}
