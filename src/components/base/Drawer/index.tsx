import { cn } from "@/utils/cn";
import { Fragment } from "react";

import { Drawer as Vaul } from "vaul";

type DrawerProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children: React.ReactNode;
  direction?: "left" | "right";
  className?: string;
};

const Drawer = ({
  isOpen,
  setIsOpen,
  children,
  direction = "right",
  className,
}: DrawerProps) => {
  return (
    <Fragment>
      <Vaul.Root
        shouldScaleBackground
        direction={direction}
        open={isOpen}
        dismissible
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <Vaul.Portal>
          <Vaul.Trigger>
            <Vaul.Overlay
              className="fixed inset-0 bg-overlay z-[2]"
              onClick={() => {
                setIsOpen(false);
              }}
            />
          </Vaul.Trigger>
          <Vaul.Content
            className={cn(
              "fixed top-0 z-10",
              direction === "left" ? "left-0" : "right-0",
              className
            )}
          >
            {children}
          </Vaul.Content>
          <Vaul.Overlay />
        </Vaul.Portal>
      </Vaul.Root>
    </Fragment>
  );
};

export default Drawer;
