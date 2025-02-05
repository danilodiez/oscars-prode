import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { userId, predictions } = await request.json();

  if (!userId || !predictions || !Array.isArray(predictions)) {
    return NextResponse.json({ error: "Invalid data format" }, { status: 400 });
  }

  console.log("Received predictions:", JSON.stringify(predictions, null, 2));

  try {
    // Use a transaction to ensure all predictions are saved or none are
    const result = await prisma.$transaction(async (prisma) => {
      for (const prediction of predictions) {
        if (
          typeof prediction.categoryId !== "string" ||
          typeof prediction.nomineeId !== "string"
        ) {
          console.error("Invalid prediction data:", prediction);
          continue; // Skip invalid predictions
        }

        await prisma.prediction.upsert({
          where: {
            userId_categoryId: {
              userId,
              categoryId: prediction.categoryId,
            },
          },
          update: {
            nomineeId: prediction.nomineeId,
          },
          create: {
            userId,
            categoryId: prediction.categoryId,
            nomineeId: prediction.nomineeId,
          },
        });
      }
    });

    return NextResponse.json({
      message: "Predictions submitted successfully",
      result,
    });
  } catch (error) {
    console.error("Failed to submit predictions:", error);
    return NextResponse.json(
      { error: "Failed to submit predictions" },
      { status: 500 }
    );
  }
}
