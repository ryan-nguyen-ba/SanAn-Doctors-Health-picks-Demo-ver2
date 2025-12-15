import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { getSession } from "@/lib/auth/session";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const records = await prisma.healthRecord.findMany({
      where: { userId: session.user.id },
      orderBy: { recordedAt: "desc" },
      take: 30,
    });

    return NextResponse.json(records);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch health records" },
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
    const record = await prisma.healthRecord.create({
      data: {
        userId: session.user.id,
        ...data,
      },
    });

    return NextResponse.json(record);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create health record" },
      { status: 500 }
    );
  }
}

