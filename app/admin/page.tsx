import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/authOptions"
import { AdminPanel } from "@/components/AdminPanel"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function AdminPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return <div>Access denied. Please log in as an admin.</div>
  }

  // In a real application, you'd want to check if the user has admin rights here

  const categories = await prisma.category.findMany({
    include: {
      nominees: true,
    },
  })

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Oscar Predictions Admin</h1>
      <AdminPanel initialCategories={categories} />
    </main>
  )
}

