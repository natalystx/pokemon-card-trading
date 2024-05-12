import Button from "@/components/base/Button";
import Icon from "@/components/base/Icon";
import { IconEnum } from "@/components/base/Icon/viewmodel";
import Input from "@/components/base/Input";
import { cn } from "@/utils/cn";

type NavbarProps = {
  onSearch: (search: string) => void;
  onCartClick: () => void;
};

const Navbar = ({ onSearch, onCartClick }: NavbarProps) => {
  return (
    <div className="space-y-6">
      <div
        className={cn(
          "flex flex-col sm:flex-row justify-between items-center sm:h-12 w-full gap-y-6"
        )}
      >
        <div className="flex w-full justify-between items-center">
          <p className="text-white text-2xl font-semibold">Pokemon market</p>
          <Button
            color="accent"
            size="xl"
            square
            onClick={onCartClick}
            className="sm:hidden"
          >
            <Icon icon={IconEnum.SHOPPING_BAG} size="lg" />
          </Button>
        </div>
        <div className="flex gap-x-4 items-center w-full sm:justify-end">
          <Input
            wrapperClassName="w-full sm:w-[173px]"
            startIcon={<Icon icon={IconEnum.SEARCH} size="md" />}
            placeholder="Search by name"
            onChange={(e) => onSearch(e.target.value)}
          />
          <Button
            color="accent"
            size="xl"
            square
            onClick={onCartClick}
            className="hidden sm:flex"
          >
            <Icon icon={IconEnum.SHOPPING_BAG} size="lg" />
          </Button>
        </div>
      </div>
      <hr className="border-b w-full border-white/8" />
    </div>
  );
};

export default Navbar;
