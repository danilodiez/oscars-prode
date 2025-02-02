import { getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"
import { MainContent } from "@/components/MainComponent"

export default async function Home() {
  const session = await getServerSession(authOptions)
  const categories = await prisma.category.findMany({
    include: {
      nominees: true,
      predictions: true,
    },
  })

  return <MainContent session={session} categories={categories} />
}


