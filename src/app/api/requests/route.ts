import { NextResponse } from "next/server";
import { createRequestSchema } from "@/lib/validation";
import { listVerifiedNeeds, submitRequest } from "@/server/services/requests";

export async function GET() {
  const needs = await listVerifiedNeeds();
  return NextResponse.json({ data: needs });
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = createRequestSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ errors: parsed.error.flatten().fieldErrors }, { status: 400 });
  const created = await submitRequest(parsed.data);
  return NextResponse.json({ data: { id: created.id, status: created.status } }, { status: 201 });
}
