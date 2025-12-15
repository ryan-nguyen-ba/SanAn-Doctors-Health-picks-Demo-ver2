import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { getSession } from "@/lib/auth/session";

export async function GET() {
  try {
    const supplements = await prisma.supplement.findMany({
      orderBy: { name: "asc" },
    });

    return NextResponse.json(supplements);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch supplements" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();
    const { supplementId, time, channels } = data;

    const schedule = await prisma.supplementSchedule.create({
      data: {
        userId: session.user.id,
        supplementId,
        time,
        notificationChannels: channels,
        days: ["daily"],
      },
    });

    return NextResponse.json(schedule);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create schedule" },
      { status: 500 }
    );
  }
}

