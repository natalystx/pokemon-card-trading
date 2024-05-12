import Button from "@/components/base/Button";
import Dropdown, { Option } from "@/components/base/Dropdown";
import { useState } from "react";

type ProductFilterProps = {
  onSelectSet: (set: string) => void;
  onSelectRarity: (rarity: string) => void;
  onSelectType: (type: string) => void;
  types: Option[];
  rarities: Option[];
  sets: Option[];
  disabled?: boolean;
  onClearAll: () => void;
};

const ProductFilter = ({
  onSelectSet,
  onSelectRarity,
  onSelectType,
  sets,
  rarities,
  types,
  disabled,
  onClearAll,
}: ProductFilterProps) => {
  const [key, setKey] = useState(0);
  const reset = () => {
    setKey(Math.random() * 1000);
  };

  return (
    <div
      className="space-y-6 w-full sm:flex sm:justify-between items-center"
      key={key}
    >
      <p className="text-white text-lg font-medium">Choose Card</p>
      <div className="flex gap-x-4 items-center">
        <Dropdown
          placeholder="Set"
          onChange={(item) => onSelectSet(item.value)}
          items={sets}
          disabled={disabled}
        />
        <Dropdown
          placeholder="Rarity"
          onChange={(item) => onSelectRarity(item.value)}
          items={rarities}
          disabled={disabled}
        />
        <Dropdown
          placeholder="Type"
          onChange={(item) => onSelectType(item.value)}
          items={types}
          disabled={disabled}
        />
        <Button
          className="w-[115px]"
          onClick={() => {
            reset();
            onClearAll();
          }}
          disabled={disabled}
        >
          Clear all
        </Button>
      </div>
    </div>
  );
};

export default ProductFilter;
