import { useVoting, type Nominee } from "../hooks/useVoting"
import { NomineeCard } from "./NomineeCard"

const initialNominees: Nominee[] = [
  { id: "1", title: "The Power of the Dog", image: "/placeholder.svg?height=216&width=384", votes: 0 },
  { id: "2", title: "Dune", image: "/placeholder.svg?height=216&width=384", votes: 0 },
  { id: "3", title: "Belfast", image: "/placeholder.svg?height=216&width=384", votes: 0 },
  { id: "4", title: "CODA", image: "/placeholder.svg?height=216&width=384", votes: 0 },
  { id: "5", title: "Don't Look Up", image: "/placeholder.svg?height=216&width=384", votes: 0 },
]

export function OscarsNominations() {
  const { nominees, vote } = useVoting(initialNominees)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Oscar Nominations: Best Picture</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {nominees.map((nominee) => (
          <NomineeCard key={nominee.id} nominee={nominee} onVote={vote} />
        ))}
      </div>
    </div>
  )
}

