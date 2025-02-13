"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CategoryEditor } from "./CategoryEditor"
import { WinnerSelector } from "./WinnerSelector"
import { ResultsCalculator } from "./ResultsCalculator"
import { RoomManager } from "./RoomManager"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"

//@ts-expect-error a a a
export function AdminPanel({ initialCategories }) {
  const [categories, setCategories] = useState(initialCategories)

  //@ts-expect-error a a a
  const updateCategory = (updatedCategory) => {
//@ts-expect-error a a a
    setCategories((prevCategories) =>
//@ts-expect-error a a a
      prevCategories.map((category) => (category.id === updatedCategory.id ? updatedCategory : category)),
    )
  }

  const handleSaveCategories = async () => {
    try {
      const response = await fetch("/api/admin/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ categories }),
      })

      if (response.ok) {
        toast({
          title: "Categories Saved",
          description: "All categories and nominees have been updated successfully.",
        })
      } else {
        throw new Error("Failed to save categories")
      }
    } catch (error) {
      console.error("Error saving categories:", error)
      toast({
        title: "Error",
        description: "Failed to save categories. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Oscar Predictions Admin</h1>
      <Tabs defaultValue="edit" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="edit">Edit Nominees</TabsTrigger>
          <TabsTrigger value="winners">Select Winners</TabsTrigger>
          <TabsTrigger value="results">Calculate Results</TabsTrigger>
          <TabsTrigger value="rooms">Manage Rooms</TabsTrigger>
        </TabsList>
        <TabsContent value="edit">
          <CategoryEditor categories={categories} updateCategory={updateCategory} />
        </TabsContent>
        <TabsContent value="winners">
          <WinnerSelector categories={categories} updateCategory={updateCategory} />
        </TabsContent>
        <TabsContent value="results">
          <ResultsCalculator categories={categories} />
        </TabsContent>
        <TabsContent value="rooms">
          <RoomManager />
        </TabsContent>
      </Tabs>
      <Button onClick={handleSaveCategories} className="mt-8 w-full">
        Save All Changes
      </Button>
    </div>
  )
}


