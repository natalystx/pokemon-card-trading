import ProductSection from "./ProductSection";
import QuantityButton from "@/components/base/QuantityButton";

type CartItemProps = {
  image: string;
  name: string;
  basePrice: number;
  totalPrice: number;
  onIncrement: () => void;
  onDecrement: () => void;
  count: number;
  currency?: string;
};

const CartItem = ({
  image,
  name,
  basePrice,
  totalPrice,
  onIncrement,
  onDecrement,
  count,
  currency = "$",
}: CartItemProps) => {
  return (
    <div className="w-full space-y-2.5 h-fit">
      <ProductSection
        currency={currency}
        image={image}
        name={name}
        basePrice={basePrice}
        totalPrice={totalPrice.toFixed(2)}
      />
      <QuantityButton
        onDecrement={onDecrement}
        onIncrement={onIncrement}
        count={count}
      />
    </div>
  );
};

export default CartItem;
