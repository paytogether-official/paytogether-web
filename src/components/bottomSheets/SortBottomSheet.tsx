import { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { BottomSheet } from "../BottomSheet";

export type SortOption = "oldest" | "latest" | "highest" | "lowest";
export const sortStringMap: Record<SortOption, string> = {
  oldest: "오래된 순",
  latest: "최신 순",
  highest: "가격 높은 순",
  lowest: "가격 낮은 순"
};

interface Props {
  showModal: boolean;
  onClose: () => void;
  defaultSort: SortOption;
  onChange: (sort: SortOption) => void;
}

export const SortBottomSheet = (props: Props) => {
  const [sort, setSort] = useState<SortOption>(props.defaultSort);

  useEffect(() => {
    if (props.showModal) {
      setSort(props.defaultSort);
    }
  }, [props.showModal]);

  return (
    <BottomSheet
      title="정렬 설정"
      isOpen={props.showModal}
      onClose={props.onClose}
    >
      {["oldest", "latest"].map(option => (
        <div
          key={option}
          className="text-[14px] font-semibold px-3 py-2 mb-2 flex justify-between items-center cursor-pointer"
          onClick={() => {
            props.onChange(option as SortOption);
            props.onClose();
          }}
        >
          <span>{sortStringMap[option as SortOption]}</span>
          {sort === option && (
            <FaCheckCircle className="text-[22px] text-[#2C7EFF]" />
          )}
        </div>
      ))}
    </BottomSheet>
  );
};
