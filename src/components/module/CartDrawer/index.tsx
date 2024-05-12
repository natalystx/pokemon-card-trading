import Drawer from "@/components/base/Drawer";
import CartHeader from "./CartHeader";
import CartFooter from "./CartFooter";
import CartItem from "./CartItem";
import { CartItemData } from "@/store/useCart";

type CartDrawerProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  items: CartItemData[];
  onDecrement: (id: string) => void;
  onIncrement: (id: string) => void;
  onClearAll: () => void;
  onCheckout?: () => void;
};

const CartDrawer = ({
  isOpen,
  setIsOpen,
  items,
  onDecrement,
  onIncrement,
  onClearAll,
  onCheckout,
}: CartDrawerProps) => {
  const totalItems = items?.reduce((acc, item) => acc + item.quantity, 0) || 0;
  const totalPrice =
    items?.reduce(
      (acc, item) =>
        acc + item.data.cardmarket.prices.averageSellPrice * item.quantity,
      0
    ) || 0;
  return (
    <Drawer
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      className="bg-dark h-svh w-screen sm:w-99 flex flex-col py-6 px-4 text-white"
    >
      <CartHeader onClearAll={onClearAll} onClose={() => setIsOpen(false)} />
      <div className="grow overflow-y-auto py-6 no-scrollbar space-y-6">
        {items?.map(({ data, quantity }) => (
          <CartItem
            onDecrement={() => onDecrement(data.id)}
            onIncrement={() => onIncrement(data.id)}
            key={data.id}
            name={data.name}
            basePrice={data.cardmarket.prices.averageSellPrice}
            totalPrice={data.cardmarket.prices.averageSellPrice * quantity}
            count={quantity}
            image={data.images.small}
          />
        ))}
      </div>
      <CartFooter
        onCheckout={onCheckout}
        totalItems={totalItems}
        totalPrice={totalPrice.toFixed(2)}
      />
    </Drawer>
  );
};

export default CartDrawer;
