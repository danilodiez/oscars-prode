import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export function CategoryPrediction({ category, selectedNomineeId, onSelect }) {
  const defaultNomineeId = category.predictions?.[0]?.nomineeId || null;

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
      <RadioGroup value={selectedNomineeId ?? defaultNomineeId} onValueChange={onSelect}>
        {category.nominees.map((nominee) => (
          <div key={nominee.id} className="flex items-center space-x-2">
            <RadioGroupItem value={nominee.id} id={`${category.id}-${nominee.id}`} 
              defaultChecked={category.predictions[0]?.nomineeId === nominee.id}
            />
            <Label htmlFor={`${category.id}-${nominee.id}`}>{nominee.name}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}


