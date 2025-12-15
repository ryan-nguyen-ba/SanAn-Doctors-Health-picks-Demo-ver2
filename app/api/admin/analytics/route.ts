import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { getSession } from "@/lib/auth/session";

export async function GET() {
  try {
    const session = await getSession();
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Calculate analytics
    const totalUsers = await prisma.user.count();
    const activeUsers = await prisma.user.count({
      where: {
        challengeProgress: {
          some: {
            completedAt: null,
          },
        },
      },
    });

    const utilizationRate = totalUsers > 0 ? (activeUsers / totalUsers) * 100 : 0;

    const continuationData = await prisma.challengeProgress.groupBy({
      by: ["challengeId"],
      _count: true,
      where: {
        completedAt: null,
      },
    });

    return NextResponse.json({
      utilizationRate,
      continuationRate: continuationData.length,
      totalUsers,
      activeUsers,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}

