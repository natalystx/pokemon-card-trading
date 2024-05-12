import Button from "@/components/base/Button";
import Icon from "@/components/base/Icon";
import { IconEnum } from "@/components/base/Icon/viewmodel";
import QuantityButton from "@/components/base/QuantityButton";
import { cn } from "@/utils/cn";
import { memo } from "react";

type ProductCardProps = {
  image: string;
  name: string;
  price: number;
  stock: number;
  onAddToCart: () => void;
  currency?: string;
  className?: string;
  count?: number;
  onDecrement: () => void;
};

const ProductCard = memo(
  ({
    image,
    name,
    price,
    currency = "$",
    stock,
    count,
    onAddToCart,
    onDecrement,
  }: ProductCardProps) => {
    return (
      <div
        className={cn(
          "w-full h-[407px] max-h-[407px] max-w-[336px] sm:h-70 flex flex-col items-center relative justify-end sm:min-w-[176px] sm:min-h-min"
        )}
      >
        <div className="w-full h-[77px] bg-primary relative flex justify-center rounded-t-2xl sm:h-10">
          <div className="h-[267px] w-[195px] rounded-lg absolute bottom-0 sm:h-35 sm:w-[102px]">
            <img
              src={image}
              alt={name}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
        <div className="px-4 py-[22px] flex flex-col gap-y-2 rounded-b-2xl bg-primary text-white text-center w-full items-center text-sm sm:text-xs sm:p-4">
          <p className="line-clamp-1 sm:h-9 sm:line-clamp-2 sm:w-36 leading-4.5">
            {name}
          </p>
          <div className="flex gap-x-2 items-center justify-center text-offWhite text-sm leading-[18.2px]">
            <p>
              {currency} {price}
            </p>
            <div className="size-1 bg-white/8 rounded" />
            <p>{stock} Cards</p>
          </div>
          {count ? (
            <QuantityButton
              disabled={stock === 0}
              buttonClassName="h-[41px]"
              count={count}
              onDecrement={onDecrement}
              onIncrement={onAddToCart}
            />
          ) : (
            <Button
              disabled={stock === 0}
              className="h-[41px] w-full"
              onClick={onAddToCart}
              icon={<Icon icon={IconEnum.SHOPPING_BAG} />}
            >
              Add to cart
            </Button>
          )}
        </div>
      </div>
    );
  }
);

export default ProductCard;
