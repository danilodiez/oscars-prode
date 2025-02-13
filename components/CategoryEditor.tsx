import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

//@ts-expect-error a a a
export function CategoryEditor({ categories, updateCategory }) {
  const [editingCategory, setEditingCategory] = useState(null);

  //@ts-expect-error a a a
  const handleEditCategory = (category) => {
    setEditingCategory({ ...category });
  };

  const handleSaveCategory = () => {
    updateCategory(editingCategory);
    setEditingCategory(null);
  };

  //@ts-expect-error a a a
  const handleNomineeChange = (index, field, value) => {
    //@ts-expect-error a a a
    const updatedNominees = [...editingCategory.nominees];
    updatedNominees[index] = { ...updatedNominees[index], [field]: value };
    //@ts-expect-error a a a
    setEditingCategory({ ...editingCategory, nominees: updatedNominees });
  };

  const handleAddNominee = () => {
    setEditingCategory({
      //@ts-expect-error a a a
      ...editingCategory,
      nominees: [
        //@ts-expect-error a a a
        ...editingCategory.nominees,
        { id: Date.now().toString(), name: "" },
      ],
    });
  };

    //@ts-expect-error a a a
  const handleRemoveNominee = (index) => {
    //@ts-expect-error a a a
    const updatedNominees = editingCategory.nominees.filter(
    //@ts-expect-error a a a
      (_, i) => i !== index
    );
    //@ts-expect-error a a a
    setEditingCategory({ ...editingCategory, nominees: updatedNominees });
  };

  return (
    <Accordion type="single" collapsible className="w-full">
      {/*@ts-expect-error  a a a*/}
      {categories.map((category) => (
        <AccordionItem key={category.id} value={category.id}>
          <AccordionTrigger>{category.name}</AccordionTrigger>
          <AccordionContent>
      {/*@ts-expect-error  a a a*/}
            {editingCategory && editingCategory.id === category.id ? (
              <div className="space-y-4">
                <div>
                  <Label htmlFor={`category-name-${category.id}`}>
                    Category Name
                  </Label>
                  <Input
                    id={`category-name-${category.id}`}
                    value={editingCategory.name}
                    onChange={(e) =>
                      setEditingCategory({
                        ...editingCategory,
                        name: e.target.value,
                      })
                    }
                  />
                </div>
                {editingCategory.nominees.map((nominee, index) => (
                  <div key={nominee.id} className="space-y-2">
                    <Label htmlFor={`nominee-name-${nominee.id}`}>
                      Nominee Name
                    </Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id={`nominee-name-${nominee.id}`}
                        value={nominee.name}
                        onChange={(e) =>
                          handleNomineeChange(index, "name", e.target.value)
                        }
                      />
                      <Button
                        variant="destructive"
                        onClick={() => handleRemoveNominee(index)}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
                <Button onClick={handleAddNominee}>Add Nominee</Button>
                <Button onClick={handleSaveCategory}>Save Changes</Button>
              </div>
            ) : (
              <div>
                <ul className="list-disc pl-6 mb-4">
                  {category.nominees.map((nominee) => (
                    <li key={nominee.id}>{nominee.name}</li>
                  ))}
                </ul>
                <Button onClick={() => handleEditCategory(category)}>
                  Edit Category
                </Button>
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
