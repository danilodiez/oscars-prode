import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function WinnerSelector({ categories, updateCategory }) {
  const [selectedWinners, setSelectedWinners] = useState({})

  const handleWinnerSelect = (categoryId, winnerId) => {
    setSelectedWinners({ ...selectedWinners, [categoryId]: winnerId })
  }

  const handleSaveWinners = () => {
    Object.entries(selectedWinners).forEach(([categoryId, winnerId]) => {
      const category = categories.find((c) => c.id === categoryId)
      if (category) {
        const updatedCategory = {
          ...category,
          nominees: category.nominees.map((nominee) => ({
            ...nominee,
            isWinner: nominee.id === winnerId,
          })),
        }
        updateCategory(updatedCategory)
      }
    })
  }

  return (
    <div className="space-y-4">
      <Accordion type="single" collapsible className="w-full">
        {categories.map((category) => (
          <AccordionItem key={category.id} value={category.id}>
            <AccordionTrigger>{category.name}</AccordionTrigger>
            <AccordionContent>
              <Select
                onValueChange={(value) => handleWinnerSelect(category.id, value)}
                value={selectedWinners[category.id] || ""}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select winner" />
                </SelectTrigger>
                <SelectContent>
                  {category.nominees.map((nominee) => (
                    <SelectItem key={nominee.id} value={nominee.id}>
                      {nominee.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <Button onClick={handleSaveWinners} className="w-full">
        Save Winners
      </Button>
    </div>
  )
}

