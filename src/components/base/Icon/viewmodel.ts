import { ReactComponent as XIcon } from "@/assets/icons/x.svg";
import { ReactComponent as DeleteIcon } from "@/assets/icons/delete.svg";
import { ReactComponent as ShoppingBagIcon } from "@/assets/icons/shopping-bag.svg";

export enum IconEnum {
  X = "X",
  DELETE = "Delete",
  SHOPPING_BAG = "ShoppingBag",
}

export const useViewModel = (icon: IconEnum) => {
  const Icons = {
    [IconEnum.X]: XIcon,
    [IconEnum.DELETE]: DeleteIcon,
    [IconEnum.SHOPPING_BAG]: ShoppingBagIcon,
  };

  return {
    Icon: Icons[icon],
  };
};
