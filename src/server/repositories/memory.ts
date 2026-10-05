import { randomUUID } from "node:crypto";
import { seedRequests } from "@/data/seed";
import type { HelpRequest, SupportAction } from "@/lib/types";
import type { ListFilter, NewRequestData, NewSupportData, Repository, ReviewData } from "./types";

interface Store {
  requests: HelpRequest[];
  support: SupportAction[];
}

const globalStore = globalThis as unknown as { __ascensionStore?: Store };
const store: Store = (globalStore.__ascensionStore ??= {
  requests: seedRequests.map((r) => ({ ...r })),
  support: [],
});

export const memoryRepository: Repository = {
  async listRequests(filter = {}) {
    return store.requests
      .filter((r) => (!filter.status || r.status === filter.status) && (!filter.category || r.category === filter.category))
      .filter((r) => !filter.requesterEmail || r.requesterEmail.toLowerCase() === filter.requesterEmail.toLowerCase())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  },
  async getRequest(id) {
    return store.requests.find((r) => r.id === id) ?? null;
  },
  async createRequest(data: NewRequestData) {
    const request: HelpRequest = {
      id: randomUUID(),
      ...data,
      raisedCents: 0,
      status: "PENDING",
      createdAt: new Date(),
      verifiedAt: null,
    };
    store.requests.push(request);
    return request;
  },
  async reviewRequest({ requestId, decision }: ReviewData) {
    const request = store.requests.find((r) => r.id === requestId);
    if (!request) return null;
    request.status = decision;
    request.verifiedAt = decision === "VERIFIED" ? new Date() : null;
    return request;
  },
  async createSupport(data: NewSupportData) {
    const request = store.requests.find((r) => r.id === data.requestId);
    if (!request) return null;
    const action: SupportAction = {
      id: randomUUID(),
      requestId: data.requestId,
      donorName: data.donorName,
      amountCents: data.amountCents,
      message: data.message ?? null,
      createdAt: new Date(),
    };
    store.support.push(action);
    request.raisedCents += data.amountCents;
    return action;
  },
  async listSupport(requestId) {
    return store.support.filter((s) => s.requestId === requestId).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  },
};
