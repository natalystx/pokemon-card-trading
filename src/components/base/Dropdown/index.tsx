import { useViewModel } from "./viewmodel";
import Button from "../Button";
import { cn } from "@/utils/cn";
import Icon from "../Icon";
import { IconEnum } from "../Icon/viewmodel";

export type Option = {
  label: string;
  value: string;
};

type DropdownProps = {
  items: Option[];
  placeholder: string;
  initialSelectedItem?: Option;
  onChange: (item: Option) => void;
  disabled?: boolean;
  placement?: "bottom-end" | "bottom-start" | "top-end" | "top-start";
};

const Dropdown = ({
  items,
  initialSelectedItem,
  onChange,
  placeholder,
  placement,
  disabled,
}: DropdownProps) => {
  const {
    setRefElement,
    setPopperElement,
    styles,
    attributes,
    getItemProps,
    getLabelProps,
    selectedItem,
    getMenuProps,
    getToggleButtonProps,
    isOpen,
    highlightedIndex,
  } = useViewModel({
    items,
    initialSelectedItem,
    onChange,
    placement,
  });

  return (
    <div className="relative w-fit">
      <div {...getLabelProps()} />
      <div ref={setRefElement} className="w-fit">
        <Button
          {...getToggleButtonProps()}
          disabled={disabled}
          className="flex-row-reverse px-4"
          color="primary"
          icon={
            <Icon
              size="md"
              icon={IconEnum.ARROW_DOWN}
              className={cn(isOpen && "rotate-180")}
            />
          }
        >
          {selectedItem ? selectedItem?.label : placeholder}
        </Button>
      </div>
      <div
        ref={setPopperElement}
        className={cn(
          !isOpen && "invisible",
          "w-[155px] rounded-lg overflow-x-hidden max-h-[300px] z-10"
        )}
        style={{ ...styles.popper }}
        {...attributes.popper}
      >
        <ul
          className="w-full border rounded-lg overflow-hidden shadow-md z-10 border-darkGray"
          {...getMenuProps()}
        >
          {items.map((item, index) => (
            <li
              key={index}
              {...getItemProps({ item, index })}
              className={cn(
                "px-4 py-2 text-sm text-left text-white border-b border-darkGray cursor-pointer bg-primary hover:bg-gray-700",
                index === items.length - 1 && "border-b-0",
                highlightedIndex === index && "hover:bg-gray-700"
              )}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;
