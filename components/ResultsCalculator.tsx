import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// This would typically come from a database
const mockParticipants = [
  { id: "1", name: "Alice", predictions: {} },
  { id: "2", name: "Bob", predictions: {} },
  { id: "3", name: "Charlie", predictions: {} },
]

export function ResultsCalculator({ categories }) {
  const [results, setResults] = useState([])

  const calculateResults = () => {
    const calculatedResults = mockParticipants.map((participant) => {
      let score = 0
      categories.forEach((category) => {
        const winnerNominee = category.nominees.find((nominee) => nominee.isWinner)
        if (winnerNominee && participant.predictions[category.id] === winnerNominee.id) {
          score += 1
        }
      })
      return { ...participant, score }
    })

    setResults(calculatedResults.sort((a, b) => b.score - a.score))
  }

  return (
    <div className="space-y-4">
      <Button onClick={calculateResults} className="w-full">
        Calculate Results
      </Button>
      {results.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Rank</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {results.map((result, index) => (
              <TableRow key={result.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{result.name}</TableCell>
                <TableCell>{result.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}

