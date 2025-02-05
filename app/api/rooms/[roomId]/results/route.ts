import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../auth/[...nextauth]/route";
import { prisma } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: { roomId: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { roomId } = params;

  try {
    const room = await prisma.room.findUnique({
      where: { id: roomId },
      include: {
        users: {
          include: {
            user: {
              include: {
                predictions: {
                  include: {
                    category: true,
                    nominee: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!room) {
      return NextResponse.json({ error: "Room not found" }, { status: 404 });
    }

    const results = room.users.map((userRoom) => {
      const user = userRoom.user;
      let score = 0;

      user.predictions.forEach((prediction) => {
        if (prediction.nominee.isWinner) {
          score += 1;
        }
      });

      return {
        userId: user.id,
        name: user.name || user.email,
        score,
      };
    });

    results.sort((a, b) => b.score - a.score);

    return NextResponse.json({ results });
  } catch (error) {
    console.error("Failed to calculate room results:", error);
    return NextResponse.json(
      { error: "Failed to calculate room results" },
      { status: 500 }
    );
  }
}
