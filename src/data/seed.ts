import type { HelpRequest } from "@/lib/types";

const daysAgo = (n: number) => new Date(Date.now() - n * 86_400_000);

export const seedRequests: HelpRequest[] = [
  {
    id: "seed-1",
    title: "Two months of rent to keep my family housed",
    story:
      "After my hours were cut at work, we fell behind on rent. Landlord documentation has been verified by our team. Support covers the remaining balance so my two kids can stay in their school.",
    category: "HOUSING",
    location: "Columbus, OH",
    amountCents: 240000,
    raisedCents: 156000,
    status: "VERIFIED",
    requesterName: "Maria G.",
    requesterEmail: "maria@example.com",
    createdAt: daysAgo(12),
    verifiedAt: daysAgo(10),
  },
  {
    id: "seed-2",
    title: "Groceries while I recover from surgery",
    story:
      "I'm recovering from a medical procedure and can't work for six weeks. Funds go directly toward grocery delivery for my household. Medical paperwork verified.",
    category: "FOOD",
    location: "Austin, TX",
    amountCents: 60000,
    raisedCents: 41500,
    status: "VERIFIED",
    requesterName: "James T.",
    requesterEmail: "james@example.com",
    createdAt: daysAgo(8),
    verifiedAt: daysAgo(6),
  },
  {
    id: "seed-3",
    title: "Car repair so I can get to my night shift",
    story:
      "My transmission failed and public transit does not run when my shift ends. A repair quote from a licensed shop has been verified; payment goes to the shop.",
    category: "TRANSPORT",
    location: "Atlanta, GA",
    amountCents: 95000,
    raisedCents: 22000,
    status: "VERIFIED",
    requesterName: "Devon R.",
    requesterEmail: "devon@example.com",
    createdAt: daysAgo(5),
    verifiedAt: daysAgo(3),
  },
  {
    id: "seed-4",
    title: "Textbooks and a laptop for community college",
    story:
      "I'm the first in my family to attend college. Enrollment verified; funds cover required textbooks and a refurbished laptop.",
    category: "EDUCATION",
    location: "Portland, OR",
    amountCents: 80000,
    raisedCents: 80000,
    status: "VERIFIED",
    requesterName: "Aisha K.",
    requesterEmail: "aisha@example.com",
    createdAt: daysAgo(20),
    verifiedAt: daysAgo(18),
  },
  {
    id: "seed-5",
    title: "Help with a utility shutoff notice",
    story:
      "I received a shutoff notice for my electric bill after an unexpected job loss. Awaiting bill verification from the utility.",
    category: "OTHER",
    location: "Denver, CO",
    amountCents: 32000,
    raisedCents: 0,
    status: "PENDING",
    requesterName: "Sam P.",
    requesterEmail: "sam@example.com",
    createdAt: daysAgo(1),
    verifiedAt: null,
  },
];
