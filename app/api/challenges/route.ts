import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { getSession } from "@/lib/auth/session";

export async function GET() {
  try {
    const challenges = await prisma.challenge.findMany({
      where: { isActive: true },
      include: {
        recipes: true,
      },
      orderBy: { priority: "asc" },
    });

    return NextResponse.json(challenges);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch challenges" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();
    const challenge = await prisma.challenge.create({
      data,
    });

    return NextResponse.json(challenge);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create challenge" },
      { status: 500 }
    );
  }
}

