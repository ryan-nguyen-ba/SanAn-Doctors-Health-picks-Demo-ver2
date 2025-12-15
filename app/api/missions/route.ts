import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { getSession } from "@/lib/auth/session";

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();
    const { missionId, completed, ...healthData } = data;

    // Create mission record
    if (completed) {
      await prisma.missionRecord.create({
        data: {
          userId: session.user.id,
          missionId,
          score: 10,
        },
      });
    }

    // Create health record if provided
    if (healthData.temperature || healthData.weight !== undefined) {
      await prisma.healthRecord.create({
        data: {
          userId: session.user.id,
          ...healthData,
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to record mission" },
      { status: 500 }
    );
  }
}

