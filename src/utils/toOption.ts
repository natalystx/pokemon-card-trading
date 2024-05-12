import { Option } from "@/components/base/Dropdown";

export const toOption = (value: string | number) =>
  ({
    value,
    label: value,
  } as Option);
