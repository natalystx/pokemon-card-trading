import { CartItemData } from "@/store/useCart";

export const getQuantityFromCartItem = (cart: CartItemData[], id: string) => {
  return cart?.find((item) => item.data.id === id)?.quantity || 0;
};
