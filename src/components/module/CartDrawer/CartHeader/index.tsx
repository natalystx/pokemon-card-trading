import Button from "@/components/base/Button";
import Icon from "@/components/base/Icon";
import { IconEnum } from "@/components/base/Icon/viewmodel";

type CartHeaderProps = {
  onClose: () => void;
  onClearAll: () => void;
};

const CartHeader = ({ onClose, onClearAll }: CartHeaderProps) => {
  return (
    <div className="w-full space-y-5">
      <div className="flex justify-center items-center w-full">
        <div className="space-y-1 flex-1">
          <p className="text-2xl font-semibold">Cart</p>
          <button
            className="text-offWhite underline text-xs hover:text-gray-500"
            onClick={onClearAll}
          >
            Clear all
          </button>
        </div>
        <Button color="accent" square size="xl" onClick={onClose}>
          <Icon icon={IconEnum.X} size="lg" />
        </Button>
      </div>
      <div className="flex justify-between items-center h-[25px] text-sm border-b border-white/8 pb-[1px]">
        <div className="flex gap-x-4">
          <p className="w-14">Item</p>
          <p>Qty</p>
        </div>
        <p>Price</p>
      </div>
    </div>
  );
};

export default CartHeader;
