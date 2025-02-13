import { getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/authOptions"
import { prisma } from "@/lib/db"
import { UserDashboard } from "@/components/UserDashboard"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function Home() {
  const session = await getServerSession(authOptions)
  const categories = await prisma.category.findMany({
    include: {
      nominees: true,
    },
  })

  if (!session) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-8">Welcome to Oscar Predictions 2024</h1>
        <p className="mb-4">Please sign in to view and make your predictions.</p>
        <div className="space-x-4">
          <Link href="/login">
            <Button>Sign In</Button>
          </Link>
          <Link href="/signup">
            <Button variant="outline">Sign Up</Button>
          </Link>
        </div>
      </div>
    )
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { isAdmin: true },
  })

  if (user?.isAdmin) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-8">Welcome, Admin</h1>
        <Link href="/admin">
          <Button>Go to Admin Panel</Button>
        </Link>
      </div>
    )
  }

  return <UserDashboard categories={categories} />
}


