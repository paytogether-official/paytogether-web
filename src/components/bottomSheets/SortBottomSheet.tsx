import { Form } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { BottomSheet } from "../BottomSheet";
import { FaCheckCircle } from "react-icons/fa";

interface Props {
  showModal: boolean;
  onClose: () => void;
  defaultSort: string;
  onChange: (sort: string) => void;
}

export const SortBottomSheet = (props: Props) => {
  const [sort, setSort] = useState<string>(props.defaultSort);

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
      <div
        className="text-[14px] font-semibold px-3 py-2 mb-2 flex justify-between items-center cursor-pointer"
        onClick={() => {
          props.onChange("oldest");
          props.onClose();
        }}
      >
        <span>오래된 순</span>{" "}
        <FaCheckCircle className="text-[22px] text-[#2C7EFF]" />
      </div>
      <div
        className="text-[14px] font-semibold px-3 py-2 mb-2 flex justify-between items-center cursor-pointer"
        onClick={() => {
          props.onChange("latest");
          props.onClose();
        }}
      >
        최신 순
      </div>
      <div
        className="text-[14px] font-semibold px-3 py-2 mb-2 flex justify-between items-center cursor-pointer"
        onClick={() => {
          props.onChange("highest");
          props.onClose();
        }}
      >
        가격 높은 순
      </div>
      <div
        className="text-[14px] font-semibold px-3 py-2 mb-2 flex justify-between items-center cursor-pointer"
        onClick={() => {
          props.onChange("lowest");
          props.onClose();
        }}
      >
        가격 낮은 순
      </div>
    </BottomSheet>
  );
};
