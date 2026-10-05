import { NextResponse } from "next/server";
import { supportSchema } from "@/lib/validation";
import { supportRequest } from "@/server/services/requests";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = supportSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ errors: parsed.error.flatten().fieldErrors }, { status: 400 });
  const result = await supportRequest(parsed.data);
  if (!result.ok) return NextResponse.json({ error: result.error }, { status: 422 });
  return NextResponse.json({ data: { id: result.action.id } }, { status: 201 });
}
