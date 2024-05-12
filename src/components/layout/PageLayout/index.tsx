import React from "react";

type PageLayoutProps = {
  children: React.ReactNode;
};

const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className="py-6 px-[29px] max-w-[1194px] mx-auto space-y-6">
      {children}
    </div>
  );
};

export default PageLayout;
