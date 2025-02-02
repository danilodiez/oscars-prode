import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import type { Nominee } from "../hooks/useVoting"

interface NomineeCardProps {
  nominee: Nominee
  onVote: (id: string) => void
}

export function NomineeCard({ nominee, onVote }: NomineeCardProps) {
  return (
    <Card className="w-full max-w-sm overflow-hidden">
      <CardHeader className="p-0">
        <Image
          src={nominee.image || "/placeholder.svg"}
          alt={nominee.title}
          width={384}
          height={216}
          className="w-full h-48 object-cover"
        />
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg mb-2">{nominee.title}</CardTitle>
        <p className="text-sm text-muted-foreground">Votes: {nominee.votes}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button onClick={() => onVote(nominee.id)} className="w-full">
          Vote
        </Button>
      </CardFooter>
    </Card>
  )
}

