import { ReactComponent as XIcon } from "@/assets/icons/svg/x.svg";
import { ReactComponent as DeleteIcon } from "@/assets/icons/svg/delete.svg";
import { ReactComponent as ShoppingBagIcon } from "@/assets/icons/svg/shopping-bag.svg";
import { ReactComponent as ArrowDownIcon } from "@/assets/icons/svg/down-arrow.svg";
import { ReactComponent as SearchIcon } from "@/assets/icons/svg/search.svg";

export enum IconEnum {
  X = "X",
  DELETE = "Delete",
  SHOPPING_BAG = "ShoppingBag",
  ARROW_DOWN = "ArrowDown",
  SEARCH = "Search",
}

export const useViewModel = (icon: IconEnum) => {
  const Icons = {
    [IconEnum.X]: XIcon,
    [IconEnum.DELETE]: DeleteIcon,
    [IconEnum.SHOPPING_BAG]: ShoppingBagIcon,
    [IconEnum.ARROW_DOWN]: ArrowDownIcon,
    [IconEnum.SEARCH]: SearchIcon,
  };

  return {
    Icon: Icons[icon],
  };
};
