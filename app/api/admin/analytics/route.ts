import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { getSession } from "@/lib/auth/session";

export async function GET() {
  try {
    const session = await getSession();
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Calculate analytics (using mock data for frontend demo)
    const totalUsers = 100; // Mock data
    const activeUsers = 75; // Mock data
    /*
    const totalUsers = await prisma.users.count();
    const activeUsers = await prisma.users.count({
      where: {
        challengeProgress: {
          some: {
            completedAt: null,
          },
        },
      },
    });
    */
    const utilizationRate = totalUsers > 0 ? (activeUsers / totalUsers) * 100 : 0;

    const continuationData: any[] = []; // Mock data
    /*
    const continuationData = await prisma.challengeProgress.groupBy({
      by: ["challengeId"],
      _count: true,
      where: {
        completedAt: null,
      },
    });
    */

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

