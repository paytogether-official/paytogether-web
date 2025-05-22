import React from "react";
import { ToggleSwitch } from "../components/ToggleSwitch";
import { HiChevronDown } from "react-icons/hi2";

export const JourneyExpenseList = () => {
  return (
    <div className="journey-expense-list">
      <div className="flex justify-between items-center">
        <div className="text-[16px] font-bold">여정제목</div>
        <ToggleSwitch
          options={[
            { label: "KRW", value: "KRW" },
            { label: "JPY", value: "JPY" }
          ]}
          value="JPY"
          onChange={() => {}}
        />
      </div>
      <div className="text-[12px] font-semibold mb-2">여정 생산자 외 3명</div>
      <div className="text-[24px] font-bold flex items-center gap-1">
        총 123,432 <HiChevronDown />
      </div>
      <div className="text-[12px] mb-3">24년 4월 13일 - 4월 17일</div>
      <div className="bg-[#F3F4F8] h-[4px] absolute left-0 right-0" />
      {/* Add your content here */}
    </div>
  );
};
