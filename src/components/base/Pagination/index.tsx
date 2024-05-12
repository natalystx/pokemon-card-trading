import Button from "../Button";
import Dropdown, { Option } from "../Dropdown";

type PaginationProps = {
  onNext: () => void;
  onPrevious: () => void;
  currentPage: number;
  totalPages: number;
  goToPage: (page: number) => void;
  disabled?: boolean;
};

const Pagination = ({
  onNext,
  onPrevious,
  currentPage,
  goToPage,
  totalPages,
  disabled,
}: PaginationProps) => {
  return (
    <div className="flex gap-x-4">
      <Button
        onClick={onPrevious}
        disabled={currentPage === 1 || disabled}
        className="w-[115px]"
      >
        Previous
      </Button>
      <Button
        onClick={onNext}
        disabled={currentPage === totalPages || disabled}
        className="w-[115px]"
      >
        Next
      </Button>
      <Dropdown
        disabled={disabled}
        placement="top-end"
        placeholder={String(currentPage)}
        items={new Array(totalPages).fill(0).map((_, i) => ({
          value: String(i + 1),
          label: String(i + 1),
        }))}
        initialSelectedItem={
          {
            value: String(currentPage),
            label: String(currentPage),
          } as Option
        }
        onChange={(value) => goToPage(Number(value.value))}
      />
    </div>
  );
};

export default Pagination;
