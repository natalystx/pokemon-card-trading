import { usePopover } from "@/hooks/usePopover";
import { useSelect } from "downshift";
import type { Option } from ".";

type ViewModelParams = {
  items: Option[];
  initialSelectedItem?: Option;
  onChange: (item: Option) => void;
  placement?: "bottom-end" | "bottom-start" | "top-end" | "top-start";
};

export const useViewModel = ({
  items,
  initialSelectedItem,
  onChange,
  placement,
}: ViewModelParams) => {
  const {
    setRefElement,
    setPopperElement,
    styles,
    attributes,
    isOpen,
    setIsOpen,
  } = usePopover({
    placement: placement || "bottom-end",
    fallbackPlacements: ["bottom-start"],
    offset: [0, 5],
  });
  const {
    selectedItem,
    getItemProps,
    getLabelProps,
    getMenuProps,
    getToggleButtonProps,
    highlightedIndex,
  } = useSelect({
    items,
    isOpen: isOpen,
    initialSelectedItem,
    onIsOpenChange: ({ isOpen }) => {
      setIsOpen(isOpen);
    },
    onSelectedItemChange(changes) {
      if (changes.selectedItem) {
        onChange(changes.selectedItem);
        setIsOpen(false);
      }

      if (changes.type === useSelect.stateChangeTypes.ToggleButtonClick) {
        setIsOpen(!isOpen);
      }
    },
  });
  return {
    isOpen,
    setIsOpen,
    setRefElement,
    setPopperElement,
    styles,
    attributes,
    selectedItem,
    getItemProps,
    getLabelProps,
    getMenuProps,
    getToggleButtonProps,
    highlightedIndex,
  };
};
