"use client"

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react"
import type { Session } from "next-auth"
import type React from "react" // Added import for React

export function SessionProvider({
  children,
  session,
}: {
  children: React.ReactNode
  session: Session | null
}) {
  return <NextAuthSessionProvider session={session}>{children}</NextAuthSessionProvider>
}


