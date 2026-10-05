import { PrismaClient, type HelpRequest as DbRequest, type SupportAction as DbSupport } from "@prisma/client";
import type { HelpRequest, SupportAction } from "@/lib/types";
import type { Repository } from "./types";

const globalForPrisma = globalThis as unknown as { __prisma?: PrismaClient };
export const prisma = (globalForPrisma.__prisma ??= new PrismaClient());

const toRequest = (r: DbRequest): HelpRequest => ({
  id: r.id,
  title: r.title,
  story: r.story,
  category: r.category,
  location: r.location,
  amountCents: r.amountCents,
  raisedCents: r.raisedCents,
  status: r.status,
  requesterName: r.requesterName,
  requesterEmail: r.requesterEmail,
  createdAt: r.createdAt,
  verifiedAt: r.verifiedAt,
});

const toSupport = (s: DbSupport): SupportAction => ({
  id: s.id,
  requestId: s.requestId,
  donorName: s.donorName,
  amountCents: s.amountCents,
  message: s.message,
  createdAt: s.createdAt,
});

export const prismaRepository: Repository = {
  async listRequests(filter = {}) {
    const rows = await prisma.helpRequest.findMany({
      where: {
        status: filter.status,
        category: filter.category,
        requesterEmail: filter.requesterEmail ? { equals: filter.requesterEmail, mode: "insensitive" } : undefined,
      },
      orderBy: { createdAt: "desc" },
    });
    return rows.map(toRequest);
  },
  async getRequest(id) {
    const row = await prisma.helpRequest.findUnique({ where: { id } });
    return row ? toRequest(row) : null;
  },
  async createRequest(data) {
    return toRequest(await prisma.helpRequest.create({ data }));
  },
  async reviewRequest({ requestId, decision, notes, reviewerId }) {
    const exists = await prisma.helpRequest.findUnique({ where: { id: requestId }, select: { id: true } });
    if (!exists) return null;
    const [row] = await prisma.$transaction([
      prisma.helpRequest.update({
        where: { id: requestId },
        data: { status: decision, verifiedAt: decision === "VERIFIED" ? new Date() : null },
      }),
      prisma.verificationReview.create({ data: { requestId, decision, notes, reviewerId } }),
    ]);
    return toRequest(row);
  },
  async createSupport(data) {
    const exists = await prisma.helpRequest.findUnique({ where: { id: data.requestId }, select: { id: true } });
    if (!exists) return null;
    const [action] = await prisma.$transaction([
      prisma.supportAction.create({ data }),
      prisma.helpRequest.update({ where: { id: data.requestId }, data: { raisedCents: { increment: data.amountCents } } }),
    ]);
    return toSupport(action);
  },
  async listSupport(requestId) {
    const rows = await prisma.supportAction.findMany({ where: { requestId }, orderBy: { createdAt: "desc" } });
    return rows.map(toSupport);
  },
};
