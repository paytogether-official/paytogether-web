import React from "react";
import { Header } from "../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import { ToggleSwitch } from "../components/ToggleSwitch";

export const JourneyExpense = () => {
  const navigate = useNavigate();

  const { id, journeyExpenseId } = useParams<{
    id: string;
    journeyExpenseId: string;
  }>();

  return (
    <div className="journey-expense">
      <Header
        leftType="back"
        onClickLeft={() => {
          navigate(`/journey/${id}`); // 여정 페이지로 돌아가기
        }}
      />
      <div className="flex justify-between items-center mt-2">
        <div className="text-[18px] font-bold">여정제목</div>
        <ToggleSwitch
          options={[
            { label: "KRW", value: "KRW" },
            { label: "JPY", value: "JPY" }
          ]}
          value="JPY"
          onChange={() => {}}
        />
      </div>
      <div className="text-[12px] text-[#6D7582] mb-2">여정 생산자 외 3명</div>
      <div className="mb-3">
        <span className="text-[24px] font-bold text-[#2C7EFF] mr-1">
          321,212
        </span>
        <span className="text-[14px] font-bold text-[#343942]">KRW</span>
      </div>

      <div className="flex flex-col gap-2 mb-3">
        <div className="journey-add-expense__user">
          <div className="flex gap-2">
            <span className="journey-add-expense__user-name">가망이</span>
            <span className="journey-add-expense__calculate-badge">계산</span>
          </div>
          <div className="journey-add-expense__user-amount">3,423</div>
        </div>
        <div className="journey-add-expense__user">
          <div className="flex gap-2">
            <span className="journey-add-expense__user-name">나망이</span>
          </div>
          <div className="journey-add-expense__user-amount">3,423</div>
        </div>
        <div className="journey-add-expense__user">
          <div className="flex gap-2">
            <span className="journey-add-expense__user-name">다망이</span>
          </div>
          <div className="journey-add-expense__user-amount">3,423</div>
        </div>
        <div className="journey-add-expense__user">
          <div className="flex gap-2">
            <span className="journey-add-expense__user-name">라망이</span>
          </div>
          <div className="journey-add-expense__user-amount">3,423</div>
        </div>
      </div>

      <div className="rounded-2xl bg-[#FAFAFB] flex items-center p-5 text-[14px] text-[#343942] font-semibold mb-3">
        고기는 대철님이 먹기위해서 구매했음
      </div>

      <div className="rounded-2xl bg-[#FAFAFB] flex justify-center items-center p-5 text-[14px] text-[#B1B8C0] font-semibold mb-3">
        기록된 메모가 없습니다.
      </div>
    </div>
  );
};
