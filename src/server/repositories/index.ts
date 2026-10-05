import type { Repository } from "./types";
import { memoryRepository } from "./memory";

/**
 * Uses PostgreSQL via Prisma when DATABASE_URL is set, otherwise the in-memory sample store.
 * The Prisma module is loaded lazily so local development works without a database.
 */
function load(): Repository {
  if (process.env.DATABASE_URL) {
    return (require("./prisma") as typeof import("./prisma")).prismaRepository;
  }
  return memoryRepository;
}

let cached: Repository | undefined;
export const getRepository = (): Repository => (cached ??= load());
