import Dropdown, { Option } from "@/components/base/Dropdown";

type ProductFilterProps = {
  onSelectSet: (set: string) => void;
  onSelectRarity: (rarity: string) => void;
  onSelectType: (type: string) => void;
  types: Option[];
  rarities: Option[];
  sets: Option[];
};

const ProductFilter = ({
  onSelectSet,
  onSelectRarity,
  onSelectType,
  sets,
  rarities,
  types,
}: ProductFilterProps) => {
  return (
    <div className="space-y-6 w-full sm:flex sm:justify-between">
      <p className="text-white text-lg font-medium">Choose Card</p>
      <div className="flex gap-x-4 items-center">
        <Dropdown
          placeholder="Set"
          onChange={(item) => onSelectSet(item.value)}
          items={sets}
        />
        <Dropdown
          placeholder="Rarity"
          onChange={(item) => onSelectRarity(item.value)}
          items={rarities}
        />
        <Dropdown
          placeholder="Type"
          onChange={(item) => onSelectType(item.value)}
          items={types}
        />
      </div>
    </div>
  );
};

export default ProductFilter;
