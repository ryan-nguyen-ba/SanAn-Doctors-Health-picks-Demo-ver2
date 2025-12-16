import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Mock data for frontend demo
    const challenge = {
      id: params.id,
      title: "睡眠の質改善チャレンジ",
      description: "睡眠の質を向上させるためのチャレンジです",
      recipes: [
        {
          id: "1",
          title: "夜を取り戻す、スマホ断ちレシピ",
          missions: [
            { id: "1", title: "スマホを別の部屋に置く", day: 1 },
          ],
        },
      ],
      progress: [],
    };

    return NextResponse.json(challenge);
    /*
    const challenge = await prisma.challenge.findUnique({
      where: { id: params.id },
      include: {
        recipes: {
          include: {
            missions: true,
          },
        },
        progress: true,
      },
    });

    if (!challenge) {
      return NextResponse.json({ error: "Challenge not found" }, { status: 404 });
    }

    return NextResponse.json(challenge);
    */
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch challenge" },
      { status: 500 }
    );
  }
}

