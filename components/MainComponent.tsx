"use client"

import Link from "next/link"
import { OscarPredictions } from "./OscarPredictions"
import { Button } from "@/components/ui/button"
import type { Session } from "next-auth"
import { signOut, useSession } from "next-auth/react"

interface MainContentProps {
  categories: unknown[] // Replace 'any' with the correct type for your categories
}

export function MainContent({ categories }: MainContentProps) {
  const { data: session } = useSession() as { data: Session | null }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Oscar Predictions 2024</h1>
          <div>
            {session ? (
              <Button variant="outline" onClick={() => signOut()}>
                Sign Out
              </Button>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="outline">Sign In</Button>
                </Link>
                <Link href="/signup">
                  <Button variant="outline" className="ml-2">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
            <Link href="/admin">
              <Button variant="outline" className="ml-2">
                Admin Panel
              </Button>
            </Link>
          </div>
        </div>
        {session ? (
          <OscarPredictions categories={categories} />
        ) : (
          <div className="text-center">
            <p className="mb-4">Please sign in or sign up to make your Oscar predictions.</p>
            <div className="space-x-4">
              <Link href="/login">
                <Button>Sign In</Button>
              </Link>
              <Link href="/signup">
                <Button variant="outline">Sign Up</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}


