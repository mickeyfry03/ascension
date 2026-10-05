export const CATEGORIES = ["HOUSING", "FOOD", "MEDICAL", "TRANSPORT", "EDUCATION", "OTHER"] as const;
export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_LABELS: Record<Category, string> = {
  HOUSING: "Housing",
  FOOD: "Food",
  MEDICAL: "Medical",
  TRANSPORT: "Transportation",
  EDUCATION: "Education",
  OTHER: "Other",
};

export type VerificationStatus = "PENDING" | "IN_REVIEW" | "VERIFIED" | "REJECTED";
export type Role = "REQUESTER" | "SUPPORTER" | "ADMIN";

export interface HelpRequest {
  id: string;
  title: string;
  story: string;
  category: Category;
  location: string;
  amountCents: number;
  raisedCents: number;
  status: VerificationStatus;
  requesterName: string;
  requesterEmail: string;
  createdAt: Date;
  verifiedAt: Date | null;
}

export interface SupportAction {
  id: string;
  requestId: string;
  donorName: string;
  amountCents: number;
  message: string | null;
  createdAt: Date;
}

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  role: Role;
}
