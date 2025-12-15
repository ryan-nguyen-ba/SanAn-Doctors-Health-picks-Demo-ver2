import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { getSession } from "@/lib/auth/session";

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { supplementId, scheduleId } = await request.json();

    const record = await prisma.supplementRecord.create({
      data: {
        userId: session.user.id,
        supplementId,
        scheduleId,
        score: 10,
      },
    });

    return NextResponse.json(record);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to record supplement intake" },
      { status: 500 }
    );
  }
}

