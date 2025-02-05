import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../auth/[...nextauth]/route";
import { prisma } from "@/lib/db";

export async function POST(
  request: Request,
  { params }: { params: { roomId: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { isAdmin: true },
  });

  if (!user?.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { userIds } = await request.json();
  const { roomId } = params;

  if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
    return NextResponse.json(
      { error: "User IDs are required" },
      { status: 400 }
    );
  }

  try {
    const userRooms = await prisma.$transaction(
      userIds.map((userId) =>
        prisma.userRoom.upsert({
          where: {
            userId_roomId: {
              userId,
              roomId,
            },
          },
          update: {},
          create: {
            userId,
            roomId,
          },
        })
      )
    );

    return NextResponse.json({ userRooms });
  } catch (error) {
    console.error("Failed to assign users to room:", error);
    return NextResponse.json(
      { error: "Failed to assign users to room" },
      { status: 500 }
    );
  }
}

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
    const userRooms = await prisma.userRoom.findMany({
      where: { roomId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json({ userRooms });
  } catch (error) {
    console.error("Failed to fetch users in room:", error);
    return NextResponse.json(
      { error: "Failed to fetch users in room" },
      { status: 500 }
    );
  }
}
