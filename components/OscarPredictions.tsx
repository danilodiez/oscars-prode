"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { CategoryPrediction } from "./CategoryPrediction"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/hooks/use-toast"

export function OscarPredictions({ categories }) {
  const { data: session } = useSession()
  const [predictions, setPredictions] = useState({})
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    if (session?.user?.id) {
      fetchUserPredictions(session.user.id)
    }
  }, [session])

  const fetchUserPredictions = async (userId: string) => {
    const response = await fetch(`/api/predictions?userId=${userId}`)
    if (response.ok) {
      const data = await response.json()
      setPredictions(data.predictions)
    }
  }
  console.log(predictions);

  const updatePrediction = (categoryId: string, nomineeId: string) => {
    setPredictions((prev) => ({
      ...prev,
      [categoryId]: nomineeId,
    }))
  }

  const handleSubmit = async () => {
    if (!session?.user?.id) {
      toast({
        title: "Error",
        description: "You must be logged in to submit predictions.",
        variant: "destructive",
      })
      return
    }

    const predictionsData = Object.entries(predictions).map(([categoryId, nomineeId]) => ({
      categoryId,
      nomineeId,
    }))

    if (predictionsData.length === 0) {
      toast({
        title: "Error",
        description: "You haven't made any predictions yet.",
        variant: "destructive",
      })
      return
    }

    const response = await fetch("/api/predictions/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: session.user.id,
        predictions: predictionsData,
      }),
    })

    if (response.ok) {
      toast({
        title: "Success",
        description: "Your Oscar predictions have been submitted successfully.",
      })
    } else {
      const errorData = await response.json()
      toast({
        title: "Error",
        description: errorData.error || "Failed to submit predictions. Please try again.",
        variant: "destructive",
      })
    }
  }

  const categoryGroups = {
    all: categories,
    picture: categories.filter((c) =>
      [
        "best-picture",
        "best-animated-feature-film",
        "best-international-feature-film",
        "best-documentary-feature-film",
      ].includes(c.id),
    ),
    acting: categories.filter((c) =>
      ["best-actor", "best-actress", "best-supporting-actor", "best-supporting-actress"].includes(c.id),
    ),
    technical: categories.filter(
      (c) =>
        ![
          "best-picture",
          "best-animated-feature-film",
          "best-international-feature-film",
          "best-documentary-feature-film",
          "best-actor",
          "best-actress",
          "best-supporting-actor",
          "best-supporting-actress",
        ].includes(c.id),
    ),
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Oscar Predictions 2024</h1>
      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Categories</TabsTrigger>
          <TabsTrigger value="picture">Picture</TabsTrigger>
          <TabsTrigger value="acting">Acting</TabsTrigger>
          <TabsTrigger value="technical">Technical</TabsTrigger>
        </TabsList>
        {Object.entries(categoryGroups).map(([group, groupCategories]) => (
          <TabsContent key={group} value={group} className="mt-6">
            <ScrollArea className="h-[600px] pr-4">
              {groupCategories.map((category) => (
                <CategoryPrediction
                  key={category.id}
                  category={category}
                  selectedNomineeId={predictions[category.id]}
                  onSelect={(nomineeId) => updatePrediction(category.id, nomineeId)}
                />
              ))}
            </ScrollArea>
          </TabsContent>
        ))}
      </Tabs>
      <Button onClick={handleSubmit} className="mt-8 w-full">
        Submit Predictions
      </Button>
    </div>
  )
}


