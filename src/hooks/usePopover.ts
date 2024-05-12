/* eslint-disable @typescript-eslint/no-explicit-any */
import { Placement } from "@popperjs/core";
import { useState } from "react";
import { usePopper } from "react-popper";
type UsePopoverConfig = {
  placement?: Placement;
  strategy?: "absolute" | "fixed";
  offset?: [number | null, number | null];
  preventOverflow?: boolean;
  fallbackPlacements?: Placement[];
};
export const usePopover = (config?: UsePopoverConfig) => {
  const { placement, strategy, offset } = config || {};
  const [refElement, setRefElement] = useState<any>(null);
  const [popperElement, setPopperElement] = useState<any>(null);
  const { styles, attributes } = usePopper(refElement, popperElement, {
    strategy: strategy || "absolute",
    placement: placement || "bottom-start",
    modifiers: [
      {
        name: "flip",
        options: {
          fallbackPlacements: config?.fallbackPlacements || ["top-start"],
        },
      },
      {
        name: "preventOverflow",
        enabled: config?.preventOverflow ?? false,
      },
      {
        name: "offset",
        options: {
          offset: offset || [null, 12],
        },
      },
    ],
  });
  const [isOpen, setIsOpen] = useState(false);

  return {
    setRefElement,
    setPopperElement,
    isOpen,
    setIsOpen,
    styles,
    attributes,
  };
};
