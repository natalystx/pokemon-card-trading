/* eslint-disable @typescript-eslint/no-explicit-any */
import { persist, shard, usePersistShard, useShard } from "shimmershards";
import { PokemonCard } from "../types";
import Counter from "@/utils/counter";
import { usePokemonCard } from "./usePokemonCard";

export type CartItemData = {
  data: PokemonCard;
  quantity: number;
};

const cartShard = persist<CartItemData[]>({
  key: "cart",
  initialValue: [] as CartItemData[],
});
const openCartShard = shard<boolean>(false);

export const useCart = () => {
  const { pokemonCards } = usePokemonCard();
  const [cart, setCart] = usePersistShard(cartShard);
  const [openCart, setOpenCart] = useShard(openCartShard);

  const totalPrice = cart?.reduce((acc: number, item): number => {
    return acc + item.data.convertedRetreatCost * item.quantity;
  }, 0);

  const addToCart = (id: string) => {
    const item = cart?.find((cartItem) => cartItem.data.id === id);
    if (item) {
      const newCart = [...cart];
      const index = newCart.findIndex((cartItem) => cartItem.data.id === id);
      newCart[index].quantity = Counter.incrementByOne(
        newCart[index].quantity,
        Infinity
      );
      setCart(newCart);
    } else {
      const newCart = [...cart];
      newCart.push({
        data:
          pokemonCards?.data.find((card) => card.id === id) ||
          ({} as PokemonCard),
        quantity: 1,
      });
      setCart(newCart);
    }
  };

  const removeFromCart = (id: string) => {
    const item = cart.find((cartItem) => cartItem.data.id === id);
    if (item) {
      let newCart = [...cart];
      const index = newCart.findIndex((cartItem) => cartItem.data.id === id);
      newCart[index].quantity = Counter.decrementByOne(
        newCart[index].quantity,
        0
      );

      if (!newCart[index].quantity) {
        newCart = newCart.filter((cartItem) => cartItem.data.id !== id);
      }
      setCart(newCart);
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  return {
    addToCart,
    removeFromCart,
    clearCart,
    totalPrice,
    setOpenCart,
    openCart,
    cart,
  };
};
