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
    const sideEffect = await prisma.sideEffect.create({
      data: {
        userId: session.user.id,
        ...data,
      },
    });

    return NextResponse.json(sideEffect);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create side effect record" },
      { status: 500 }
    );
  }
}

