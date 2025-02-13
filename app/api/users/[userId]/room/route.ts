import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../auth/authOptions";
import { prisma } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { userId } = params;

  // Ensure the user is requesting their own room or is an admin
  if (session.user.id !== userId) {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { isAdmin: true },
    });

    if (!user?.isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  try {
    const userRoom = await prisma.userRoom.findFirst({
      where: { userId },
      include: {
        room: true,
      },
    });

    if (!userRoom) {
      return NextResponse.json({ room: null });
    }

    return NextResponse.json({ room: userRoom.room });
  } catch (error) {
    console.error("Failed to fetch user's room:", error);
    return NextResponse.json(
      { error: "Failed to fetch user's room" },
      { status: 500 }
    );
  }
}
