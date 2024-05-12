type ProductSectionProps = {
  image: string;
  name: string;
  basePrice: number;
  totalPrice: string;
  currency: string;
};

const ProductSection = ({
  image,
  name,
  basePrice,
  totalPrice,
  currency,
}: ProductSectionProps) => {
  return (
    <div className="w-full flex justify-between">
      <div className="basis-1/2 overflow-hidden w-full gap-x-4 h-15 flex text-left">
        <div className="min-w-11 w-11 h-15 max-w-[60px] rounded overflow-hidden">
          <img src={image} alt={name} className="object-cover w-full h-full" />
        </div>
        <div className="space-y-1">
          <h3 className="text-xs text-white font-medium leading-4.5 line-clamp-1">
            {name}
          </h3>
          <p className="text-xs text-offWhite">
            {currency} {basePrice}
          </p>
        </div>
      </div>
      <p className="text-xs font-medium text-white leading-4.5 text-right">
        {currency} {totalPrice}
      </p>
    </div>
  );
};

export default ProductSection;
