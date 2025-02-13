import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../auth/authOptions";
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
    const userRoom = await prisma.userRoom.findFirst({
      where: {
        userId: session.user.id,
        roomId: roomId,
      },
    });

    if (!userRoom) {
      return NextResponse.json(
        { error: "User is not in this room" },
        { status: 403 }
      );
    }

    const roomPredictions = await prisma.userRoom.findMany({
      where: { roomId: roomId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            predictions: {
              include: {
                category: true,
                nominee: true,
              },
            },
          },
        },
      },
    });

    const formattedPredictions = roomPredictions.reduce((acc, userRoom) => {
      const userId = userRoom.user.id;
      //@ts-expect-error a a a
      acc[userId] = {
        name: userRoom.user.name || userRoom.user.email,
        predictions: userRoom.user.predictions.reduce((predAcc, pred) => {
          //@ts-expect-error a a a
          predAcc[pred.category.id] = {
            categoryName: pred.category.name,
            nomineeId: pred.nominee.id,
            nomineeName: pred.nominee.name,
          };
          return predAcc;
        }, {}),
      };
      return acc;
    }, {});

    return NextResponse.json({ predictions: formattedPredictions });
  } catch (error) {
    console.error("Failed to fetch room predictions:", error);
    return NextResponse.json(
      { error: "Failed to fetch room predictions" },
      { status: 500 }
    );
  }
}
