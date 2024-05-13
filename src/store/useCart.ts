/* eslint-disable @typescript-eslint/no-explicit-any */
import { persist, shard, usePersistShard, useShard } from "shimmershards";
import { PokemonCard } from "../types";
import Counter from "@/utils/counter";
import { usePokemonCard } from "./usePokemonCard";

export type CartItemData = {
  data: PokemonCard;
  quantity: number;
};

/**
 * @info shimmershards documentation
 * @link https://shimmershards.dev
 *
 */

// create a local storage persist for the cart and default it to an empty array
const cartShard = persist<CartItemData[]>({
  key: "cart",
  initialValue: [] as CartItemData[],
});

// create a state subscription for the cart and default it to false
const openCartShard = shard<boolean>(false);

export const useCart = () => {
  const { pokemonCards } = usePokemonCard();
  const [cart, setCart] = usePersistShard(cartShard);
  const [openCart, setOpenCart] = useShard(openCartShard);

  // calculate total price of the cart
  const totalPrice = cart?.reduce((acc: number, item): number => {
    return acc + item.data.convertedRetreatCost * item.quantity;
  }, 0);

  const addToCart = (id: string) => {
    // check if the item is already in the cart
    const item = cart?.find((cartItem) => cartItem.data.id === id);

    // create a new cart item array to prevent mutation
    const newCart = [...cart];

    if (item) {
      const index = newCart.findIndex((cartItem) => cartItem.data.id === id);
      // increment the quantity of the item
      newCart[index].quantity = Counter.incrementByOne(
        newCart[index].quantity,
        Infinity
      );
      setCart(newCart);
    } else {
      // add the item to the cart
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
    // check if the item is already in the cart
    const item = cart.find((cartItem) => cartItem.data.id === id);

    // create a new cart item array to prevent mutation
    let newCart = [...cart];

    if (item) {
      const index = newCart.findIndex((cartItem) => cartItem.data.id === id);
      newCart[index].quantity = Counter.decrementByOne(
        newCart[index].quantity,
        0
      );

      if (!newCart[index].quantity) {
        // remove the item from the cart if the quantity is 0
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
