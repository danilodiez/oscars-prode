import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export function CategoryPrediction({
  category,
  selectedNomineeId,
  onSelect,
  seenMovies,
  onSeenChange,
}) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
      <RadioGroup value={selectedNomineeId} onValueChange={onSelect}>
        {category.nominees.map((nominee) => (
          <div key={nominee.id} className="flex items-center space-x-2 mb-2">
            <RadioGroupItem
              value={nominee.id}
              id={`${category.id}-${nominee.id}`}
            />
            <Label htmlFor={`${category.id}-${nominee.id}`}>
              {nominee.name}
            </Label>
            <Checkbox
              id={`seen-${nominee.id}`}
              checked={seenMovies.includes(nominee.id)}
              onCheckedChange={(checked) => onSeenChange(nominee.id, checked)}
            />
            <Label htmlFor={`seen-${nominee.id}`}>Seen</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
