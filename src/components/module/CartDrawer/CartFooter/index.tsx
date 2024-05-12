import Button from "@/components/base/Button";
import { cn } from "@/utils/cn";

type CartFooterProps = {
  onCheckout?: () => void;
  totalItems: number;
  totalPrice: string;
  className?: string;
  currency?: string;
};

const CartFooter = ({
  onCheckout,
  totalItems,
  totalPrice,
  className,
  currency = "$",
}: CartFooterProps) => {
  return (
    <div className={cn("py-6 space-y-4 w-full", className)}>
      <div className="w-full flex justify-center items-center">
        <p className="text-xs text-offWhite flex-1">Total card number</p>
        <p className="text-base">{totalItems}</p>
      </div>
      <div className="w-full flex justify-center items-center">
        <p className="text-xs text-offWhite flex-1">Total price</p>
        <p className="text-base">
          {currency} {totalPrice}
        </p>
      </div>
      <Button color="accent" size="lg" onClick={onCheckout} className="w-full">
        Checkout
      </Button>
    </div>
  );
};

export default CartFooter;
