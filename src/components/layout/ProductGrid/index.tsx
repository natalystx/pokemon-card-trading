import React from "react";

type ProductGridProps = {
  children: React.ReactNode;
};

const ProductGrid = ({ children }: ProductGridProps) => {
  return (
    <div className="grid grid-cols-sm-product sm:grid-cols-md-product gap-x-4 gap-y-6 justify-items-center">
      {children}
    </div>
  );
};

export default ProductGrid;
