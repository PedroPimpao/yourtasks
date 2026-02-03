import { NextResponse } from "next/server";
import { getServerSession } from "../../_actions/_auth/get-server-session";

export async function GET() {
  const session = await getServerSession();
  return NextResponse.json(session);
}
