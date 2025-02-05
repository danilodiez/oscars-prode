import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export function CategoryPrediction({ category, selectedNomineeId, onSelect }) {


  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
      <RadioGroup value={selectedNomineeId} onValueChange={onSelect}>
        {category.nominees.map((nominee) => (
          <div key={nominee.id} className="flex items-center space-x-2">
            <RadioGroupItem value={nominee.id} id={`${category.id}-${nominee.id}`} 
            />
            <Label htmlFor={`${category.id}-${nominee.id}`}>{nominee.name}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}


