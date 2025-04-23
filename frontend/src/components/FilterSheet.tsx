import { useAtom } from "jotai";
import { useState } from "react";
import { filterSheetAtom } from "../store/sheetAtom";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

// City options type
type City = 'sangali' | 'kolhapur' | 'satara' | 'pune' | 'mumbai' | 'karad' | '';

// Component
const FilterSheet: React.FC = () => {
  const [filterState, setFilterState] = useAtom(filterSheetAtom);

  const [budget, setBudget] = useState<number>(filterState.budget);
  const [city, setCity] = useState<City>(filterState.city);

  const onClose = (): void => {
    setFilterState({
      ...filterState,
      isOpen: false,
    });
  };
  
  const applyFilter = (): void => {
    setFilterState({
      isOpen: false,
      budget,
      city,
    });
    // Optionally trigger data refresh or filtering logic here
  };

  return (
    <Sheet open={filterState.isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4 bg-white" side="right">
        <SheetHeader>
          <SheetTitle>Filter Properties</SheetTitle>
          <SheetDescription>
            Filter properties by budget and city.
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Budget (₹)</label>
            <Input
              type="number"
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              placeholder="Enter budget"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">City</label>
            <Select value={city} onValueChange={(val: City) => setCity(val)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select city" />
              </SelectTrigger>
              <SelectContent>
                {["sangali", "kolhapur", "satara", "pune", "mumbai", "karad"].map(
                  (cityName) => (
                    <SelectItem key={cityName} value={cityName}>
                      {cityName.charAt(0).toUpperCase() + cityName.slice(1)}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          </div>

          <Button onClick={applyFilter} className="w-full">
            Apply Filter
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default FilterSheet;
