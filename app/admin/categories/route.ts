import { NextResponse } from "next/server";
import { Nominee, PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/authOptions";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // In a real application, you'd want to check if the user has admin rights here

  const { categories } = await request.json();

  try {
    for (const category of categories) {
      await prisma.category.update({
        where: { id: category.id },
        data: {
          name: category.name,
          nominees: {
            upsert: category.nominees.map((nominee: Nominee) => ({
              where: { id: nominee.id },
              update: { name: nominee.name },
              create: { name: nominee.name },
            })),
          },
        },
      });
    }

    return NextResponse.json({ message: "Categories updated successfully" });
  } catch (error) {
    console.error("Failed to update categories:", error);
    return NextResponse.json(
      { error: "Failed to update categories" },
      { status: 500 }
    );
  }
}
