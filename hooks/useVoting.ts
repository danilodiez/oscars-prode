import { useState } from "react"

export interface Nominee {
  id: string
  title: string
  image: string
  votes: number
}

export function useVoting(initialNominees: Nominee[]) {
  const [nominees, setNominees] = useState(initialNominees)

  const vote = (id: string) => {
    setNominees((prev) =>
      prev.map((nominee) => (nominee.id === id ? { ...nominee, votes: nominee.votes + 1 } : nominee)),
    )
  }

  return { nominees, vote }
}

