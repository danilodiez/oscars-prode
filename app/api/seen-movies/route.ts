import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/authOptions";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { nomineeId, seen } = await request.json();

  if (!nomineeId) {
    return NextResponse.json(
      { error: "Nominee ID is required" },
      { status: 400 }
    );
  }

  try {
    if (seen) {
      await prisma.seenMovie.upsert({
        where: {
          userId_nomineeId: {
            userId: session.user.id,
            nomineeId,
          },
        },
        update: {},
        create: {
          userId: session.user.id,
          nomineeId,
        },
      });
    } else {
      await prisma.seenMovie.deleteMany({
        where: {
          userId: session.user.id,
          nomineeId,
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to update seen movie status:", error);
    return NextResponse.json(
      { error: "Failed to update seen movie status" },
      { status: 500 }
    );
  }
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const seenMovies = await prisma.seenMovie.findMany({
      where: {
        userId: session.user.id,
      },
      select: {
        nomineeId: true,
      },
    });

    const seenMovieIds = seenMovies.map((movie) => movie.nomineeId);

    return NextResponse.json({ seenMovieIds });
  } catch (error) {
    console.error("Failed to fetch seen movies:", error);
    return NextResponse.json(
      { error: "Failed to fetch seen movies" },
      { status: 500 }
    );
  }
}
